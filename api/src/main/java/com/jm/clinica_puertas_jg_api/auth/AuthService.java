package com.jm.clinica_puertas_jg_api.auth;

import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.jm.clinica_puertas_jg_api.auth.dto.RefreshResponseDto;
import com.jm.clinica_puertas_jg_api.auth.dto.SignInResponseDto;
import com.jm.clinica_puertas_jg_api.auth.dto.SignUpResponseDto;
import com.jm.clinica_puertas_jg_api.exception.UnauthorizedException;
import com.jm.clinica_puertas_jg_api.role.Role;
import com.jm.clinica_puertas_jg_api.role.RoleName;
import com.jm.clinica_puertas_jg_api.role.RoleService;
import com.jm.clinica_puertas_jg_api.config.jwt.JwtProvider;
import com.jm.clinica_puertas_jg_api.user.User;
import com.jm.clinica_puertas_jg_api.user.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserService userService;
    private final RoleService roleService;
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;

    private final List<RoleName> DEFAULT_SIGN_UP_ROLE_NAMES = List.of(RoleName.ROLE_CLIENT);

    public SignInResponseDto signIn(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            User authenticatedUser = userService.findByUsername(username);
            String token = jwtProvider.generateToken(authenticatedUser,
                    Map.of(JwtProvider.CLAIM_KEY_ROLES, authenticatedUser.getGrantedAuthorities()));
            return new SignInResponseDto(token, authenticatedUser);
        } catch (AuthenticationException e) {
            log.info("Invalid credentials");
            throw new UnauthorizedException("Invalid username/password supplied");
        }
    }

    public SignUpResponseDto signUp(User user) {
        List<Role> roles = DEFAULT_SIGN_UP_ROLE_NAMES.stream()
                .map(roleService::findByName)
                .toList();
        user.setRoles(roles);
        User createdUser = userService.create(user);

        String jwt = jwtProvider.generateToken(createdUser,
                Map.of(JwtProvider.CLAIM_KEY_ROLES, createdUser.getGrantedAuthorities()));
        return new SignUpResponseDto(jwt, createdUser);
    }

    public RefreshResponseDto refresh(String username) {
        User authenticatedUser = userService.findByUsername(username);
        String jwt = jwtProvider.generateToken(authenticatedUser,
                Map.of(JwtProvider.CLAIM_KEY_ROLES, authenticatedUser.getGrantedAuthorities()));
        return new RefreshResponseDto(jwt, authenticatedUser);
    }
}
