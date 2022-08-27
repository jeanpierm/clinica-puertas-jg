package com.jm.clinica_puertas_jg_api.role;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(RoleController.PATH)
@RequiredArgsConstructor
public class RoleController {
    public static final String PATH = "roles";
    private final RoleService roleService;

    @GetMapping
    public ResponseEntity<List<Role>> findAll() {
        final List<Role> roles = roleService.findAll();
        return ResponseEntity.ok(roles);
    }
}
