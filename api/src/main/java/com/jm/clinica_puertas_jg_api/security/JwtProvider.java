package com.jm.clinica_puertas_jg_api.security;

import com.jm.clinica_puertas_jg_api.role.RoleName;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtProvider {

    private Key key;

    @Value("${security.jwt.token.expire-length:3600000}")
    private long validityInMilliseconds = 3600000; // 1h

    private final UserDetailsServiceImpl userDetailsService;
    private final Environment environment;

    @PostConstruct
    protected void init() {
        String secretKey = environment.getProperty("security.jwt.token.secret-key");
        if (secretKey == null) throw new RuntimeException("Secret key is not defined");
        String base64EncodedSecretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(String username, List<RoleName> roleNames) {
        Claims claims = Jwts.claims().setSubject(username);
        Set<SimpleGrantedAuthority> grantedAuthorities = roleNames
                .stream()
                .map(s -> new SimpleGrantedAuthority(s.getAuthority()))
                .collect(Collectors.toSet());
        claims.put("auth", grantedAuthorities);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key)
                .compact();
    }

    public UsernamePasswordAuthenticationToken getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(getSubject(token));
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    public String getSubject(String token) {
        return getClaims(token).getSubject();
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    public Boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.error("Invalid JWT: {}", e.getMessage());
            return false;
        }
    }
}
