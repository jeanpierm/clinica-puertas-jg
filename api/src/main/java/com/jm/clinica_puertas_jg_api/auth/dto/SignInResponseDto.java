package com.jm.clinica_puertas_jg_api.auth.dto;

import com.jm.clinica_puertas_jg_api.user.User;
import lombok.Data;

@Data
public class SignInResponseDto {
    private final String accessToken;
    private final User userData;
}
