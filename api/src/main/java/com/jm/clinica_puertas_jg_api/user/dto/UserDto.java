package com.jm.clinica_puertas_jg_api.user.dto;

import com.jm.clinica_puertas_jg_api.role.RoleName;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class UserDto {

    @NotBlank
    @Size(min = 4, max = 255, message = "Minimum username length: 4 characters")
    private String username;

    @NotBlank
    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String surname;

    @NotBlank
    @Size(max = 255)
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 255, message = "Minimum password length: 8 characters")
    private String password;

    private List<RoleName> roleNames = new ArrayList<>();
}
