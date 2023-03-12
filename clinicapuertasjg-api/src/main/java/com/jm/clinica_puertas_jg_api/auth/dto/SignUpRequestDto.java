package com.jm.clinica_puertas_jg_api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequestDto {
    @Size(max = 255)
    private String username;

    @Size(max = 255)
    @Email
    private String email;

    @Size(min = 8, max = 255, message = "Minimum password length: 8 characters")
    private String password;
}
