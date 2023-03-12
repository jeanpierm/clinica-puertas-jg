package com.jm.clinica_puertas_jg_api.config.jwt;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jm.clinica_puertas_jg_api.config.UserDetailsServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// We should use OncePerRequestFilter since we are doing a database call, there is no point in doing this more than once
@RequiredArgsConstructor
@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;

    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String jwt = getJwtFromRequest(request);
        String username = jwtProvider.extractUsername(jwt);
        if (!StringUtils.hasText(username) || SecurityContextHolder.getContext().getAuthentication() != null) {
            log.info("JWT has not subject/username or the security context has already an authentication... JWT is not valid");
            filterChain.doFilter(request, response);
            return;
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (!jwtProvider.isJwtValid(jwt, userDetails)) {
            log.info("Unsuccessful authentication with JWT... JWT is not valid");
            // this is very important, since it guarantees the user is not authenticated at all
            SecurityContextHolder.clearContext();
            filterChain.doFilter(request, response);
            return;
        }
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities());
        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(auth);
        log.info("Successful authentication with JWT");

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        String jwt = getJwtFromRequest(request);
        boolean shouldNot = path.equals("/auth/login")
                || path.equals("/auth/register")
                || !StringUtils.hasText(jwt);
        log.debug("Path '{}' should not filter: {}", path, shouldNot);
        return shouldNot;
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring("Bearer ".length());
        }
        return null;
    }

    private void sendInvalidTokenResponse(HttpServletResponse response) throws IOException {
        sendInvalidTokenResponse(response, null);
    }

    private void sendInvalidTokenResponse(HttpServletResponse response, Exception exception) throws IOException {
        String errorMessage = "Expired or invalid access token";
        errorMessage += exception != null ? ": " + exception.getMessage() : "";
        response.setStatus(HttpStatus.FORBIDDEN.value());
        Map<String, String> payload = Map.of("message", errorMessage);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), payload);
    }
}
