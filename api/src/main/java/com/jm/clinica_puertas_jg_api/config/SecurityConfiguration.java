package com.jm.clinica_puertas_jg_api.config;

import com.jm.clinica_puertas_jg_api.config.jwt.JwtFilter;
import com.jm.clinica_puertas_jg_api.role.RoleName;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtFilter jwtFilter;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable CSRF (cross site request forgery)
        http.csrf().disable();

        // No session will be created or used by spring security
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Entry points
        http.authorizeHttpRequests()
                .requestMatchers("/auth/sign-in", "/auth/sign-up").permitAll()
                .requestMatchers("/auth/refresh").hasAnyAuthority(RoleName.ROLE_ADMIN.getAuthority(), RoleName.ROLE_CLIENT.getAuthority())
                .requestMatchers("/users/**").hasAnyAuthority(RoleName.ROLE_ADMIN.getAuthority())
                // Disallow everything else..
                .anyRequest().authenticated();

        // Apply JWT
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
