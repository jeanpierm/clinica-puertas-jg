package com.jm.clinica_puertas_jg_api.auth.dto;

import com.jm.clinica_puertas_jg_api.user.User;

public class SignUpResponseDto extends SignInResponseDto {
    public SignUpResponseDto(String accessToken, User userData) {
        super(accessToken, userData);
    }
}
