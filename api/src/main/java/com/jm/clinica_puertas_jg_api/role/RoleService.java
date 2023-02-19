package com.jm.clinica_puertas_jg_api.role;

import com.jm.clinica_puertas_jg_api.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    public Role findByName(RoleName name) {
        return roleRepository.findByName(name)
                .orElseThrow(() -> new NotFoundException("Role with name '" + name + "' does not exist"));
    }

    public Role create(Role role) {
        return roleRepository.save(role);
    }

    public List<Role> findByRoleNames(List<RoleName> roleNames) {
        return roleNames.stream()
                .map(this::findByName)
                .toList();
    }
}
