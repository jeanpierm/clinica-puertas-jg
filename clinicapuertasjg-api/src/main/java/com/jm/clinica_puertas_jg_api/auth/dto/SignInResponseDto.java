package com.jm.clinica_puertas_jg_api.auth.dto;

import com.jm.clinica_puertas_jg_api.user.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInResponseDto {
    private String accessToken;
    private User userData;
}
