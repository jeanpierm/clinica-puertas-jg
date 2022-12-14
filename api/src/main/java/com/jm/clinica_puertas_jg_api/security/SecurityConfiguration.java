package com.jm.clinica_puertas_jg_api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.jm.clinica_puertas_jg_api.role.RoleName;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtProvider jwtProvider;

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable CSRF (cross site request forgery)
        http.csrf().disable();

        // No session will be created or used by spring security
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Entry points
        http.authorizeHttpRequests()//
                .requestMatchers("/auth/sign-in", "/auth/sign-up").permitAll()
                .requestMatchers("/auth/refresh")
                .hasAnyAuthority(RoleName.ROLE_ADMIN.getAuthority(), RoleName.ROLE_CLIENT.getAuthority())
                .requestMatchers("/users/**").hasAnyAuthority(RoleName.ROLE_ADMIN.getAuthority())
                // Disallow everything else..
                .anyRequest().authenticated();

        // Apply JWT
        http.apply(new JwtFilterConfigurer(jwtProvider));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
