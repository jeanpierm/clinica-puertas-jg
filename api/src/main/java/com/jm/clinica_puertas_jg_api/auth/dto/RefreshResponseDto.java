package com.jm.clinica_puertas_jg_api.auth.dto;

import com.jm.clinica_puertas_jg_api.user.User;

public class RefreshResponseDto extends SignInResponseDto {

    public RefreshResponseDto(String accessToken, User userData) {
        super(accessToken, userData);
    }
}
