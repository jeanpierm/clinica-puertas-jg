package com.jm.clinica_puertas_jg_api.role;

import com.jm.clinica_puertas_jg_api.common.model.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import jakarta.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Role extends BaseEntity {

    @Schema(
            description = "The role id",
            example = "1"
    )
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(
            description = "The role name",
            example = "ROLE_ADMIN"
    )
    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column
    private RoleName name;

    public Role(RoleName name) {
        this.name = name;
    }
}
