package com.jm.clinica_puertas_jg_api.user.dto;

import com.jm.clinica_puertas_jg_api.role.RoleName;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDto {
    @Size(min = 4, max = 255, message = "Minimum username length: 4 characters")
    private String username;

    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String surname;

    @Size(max = 255)
    @Email
    private String email;

    @Size(min = 8, max = 255, message = "Minimum password length: 8 characters")
    private String password;

    private List<RoleName> roleNames = new ArrayList<>();
}
