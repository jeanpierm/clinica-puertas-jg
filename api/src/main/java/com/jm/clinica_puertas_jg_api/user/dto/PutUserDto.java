package com.jm.clinica_puertas_jg_api.user.dto;

import com.jm.clinica_puertas_jg_api.role.RoleName;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Data
public class PutUserDto {
    @Size(min = 4, max = 255, message = "Minimum username length: 4 characters")
    @NotEmpty
    private String username;

    @Size(max = 255)
    @NotEmpty
    private String name;

    @Size(max = 255)
    @NotEmpty
    private String surname;

    @Size(max = 255)
    @Email
    @NotEmpty
    private String email;

    @Size(min = 8, max = 255, message = "Minimum password length: 8 characters")
    @NotEmpty
    private String password;

    @NotEmpty
    private List<RoleName> roleNames = new ArrayList<>();
}
