package com.jm.clinica_puertas_jg_api.role;

import org.springframework.security.core.GrantedAuthority;

public enum RoleName implements GrantedAuthority {
    ROLE_ADMIN,
    ROLE_CLIENT;

    public String getAuthority() {
        return name();
    }
}
