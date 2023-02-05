package com.jm.clinica_puertas_jg_api;

import com.jm.clinica_puertas_jg_api.role.Role;
import com.jm.clinica_puertas_jg_api.role.RoleName;
import com.jm.clinica_puertas_jg_api.role.RoleService;
import com.jm.clinica_puertas_jg_api.user.User;
import com.jm.clinica_puertas_jg_api.user.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class ClinicaPuertasJgApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClinicaPuertasJgApiApplication.class, args);
    }

    @Bean
    ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    CommandLineRunner run(UserService userService, RoleService roleService) {
        return args -> {
            if (roleService.findAll().isEmpty()) {
                roleService.create(new Role(RoleName.ROLE_ADMIN));
                roleService.create(new Role(RoleName.ROLE_CLIENT));
            }

            if (userService.findAll().isEmpty()) {
                userService.create(new User(
                        "jeanpi3rm@gmail.com",
                        "Jeanpier",
                        "Mendoza",
                        "jeanpi3rm@gmail.com",
                        "12345678",
                        List.of(roleService.findByName(RoleName.ROLE_ADMIN)))
                );
            }
        };
    }
}
