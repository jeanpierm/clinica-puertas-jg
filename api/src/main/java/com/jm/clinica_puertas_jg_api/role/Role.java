package com.jm.clinica_puertas_jg_api.role;

import com.jm.clinica_puertas_jg_api.common.model.BaseEntity;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import jakarta.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Role extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column
    private RoleName name;

    public Role(RoleName name) {
        this.name = name;
    }
}
