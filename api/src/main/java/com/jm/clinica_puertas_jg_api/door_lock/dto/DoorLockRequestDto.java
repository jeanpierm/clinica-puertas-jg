package com.jm.clinica_puertas_jg_api.door_lock.dto;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DoorLockRequestDto {

    private String name;

    private String brand;

    private String side;

    @Min(value = 0L)
    private Integer stock;

    private Integer price;
}
