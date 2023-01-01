package com.jm.clinica_puertas_jg_api.door_lock;

import lombok.*;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;

import com.jm.clinica_puertas_jg_api.door_lock.enums.Side;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class DoorLock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String brand;

    @Enumerated(EnumType.STRING)
    private Side side;

    private Integer stock;

    private BigDecimal price;
}
