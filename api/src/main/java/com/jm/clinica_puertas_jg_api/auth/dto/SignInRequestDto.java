package com.jm.clinica_puertas_jg_api.auth.dto;

import lombok.Data;

@Data
public class SignInRequestDto {
    private final String username;
    private final String password;
}
