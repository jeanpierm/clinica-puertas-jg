package com.jm.clinica_puertas_jg_api.door_lock;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jm.clinica_puertas_jg_api.door_lock.dto.DoorLockRequestDto;
import com.jm.clinica_puertas_jg_api.door_lock.enums.Side;
import com.jm.clinica_puertas_jg_api.util.CurrencyUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DoorLockService {

    private final DoorLockRepository doorLockRepository;

    List<DoorLock> find() {
        return doorLockRepository.findAll();
    }

    public DoorLock create(DoorLockRequestDto doorLockData) {
        DoorLock doorLock = new DoorLock();
        doorLock.setName(doorLockData.getName());
        doorLock.setBrand(doorLockData.getBrand());
        doorLock.setSide(Side.valueOf(doorLockData.getSide()));
        doorLock.setStock(doorLockData.getStock());
        doorLock.setPrice(CurrencyUtil.integerToBigDecimal(doorLockData.getPrice()));
        var createdDoorLock = doorLockRepository.save(doorLock);
        log.info("Created door lock {}", createdDoorLock.getId());
        return createdDoorLock;
    }

}
