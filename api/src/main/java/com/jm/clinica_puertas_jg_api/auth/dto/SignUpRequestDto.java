package com.jm.clinica_puertas_jg_api.auth.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Data
public class SignUpRequestDto {
    @Size(max = 255)
    private final String username;

    @Size(max = 255)
    @Email
    private final String email;

    @Size(min = 8, max = 255, message = "Minimum password length: 8 characters")
    private final String password;
}
