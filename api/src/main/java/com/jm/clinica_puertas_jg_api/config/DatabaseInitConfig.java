package com.jm.clinica_puertas_jg_api.config;

import com.jm.clinica_puertas_jg_api.door_lock.DoorLock;
import com.jm.clinica_puertas_jg_api.door_lock.DoorLockService;
import com.jm.clinica_puertas_jg_api.door_lock.enums.Side;
import com.jm.clinica_puertas_jg_api.role.Role;
import com.jm.clinica_puertas_jg_api.role.RoleName;
import com.jm.clinica_puertas_jg_api.role.RoleService;
import com.jm.clinica_puertas_jg_api.user.User;
import com.jm.clinica_puertas_jg_api.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@Slf4j
public class DatabaseInitConfig {

    @Bean
    CommandLineRunner run(UserService userService, RoleService roleService,
                          DoorLockService doorLockService) {
        return args -> {
            if (roleService.findAll().isEmpty()) {
                roleService.create(new Role(RoleName.ROLE_ADMIN));
                roleService.create(new Role(RoleName.ROLE_CLIENT));
                log.info("Initials roles created");
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
                log.info("Initials users created");
            }

            if (doorLockService.findAll().isEmpty()) {
                List<DoorLock> doorLocks = List.of(
                        DoorLock.builder()
                                .brand("CHEVROLET")
                                .stock(10)
                                .price(new BigDecimal("30.30"))
                                .side(Side.RIGHT)
                                .name("SEGURO DE PUERTA CHEVROLET")
                                .build(),
                        DoorLock.builder()
                                .brand("TOYOTA")
                                .stock(6)
                                .price(new BigDecimal("37.35"))
                                .side(Side.RIGHT)
                                .name("SEGURO DE PUERTA TOYOTA")
                                .build(),
                        DoorLock.builder()
                                .brand("NISSAN")
                                .stock(1)
                                .price(new BigDecimal("28.30"))
                                .side(Side.LEFT)
                                .name("SEGURO DE PUERTA NISSAN")
                                .build()
                        );
                doorLockService.createAll(doorLocks);
                log.info("Initials door locks created");
            }
        };
    }
}
