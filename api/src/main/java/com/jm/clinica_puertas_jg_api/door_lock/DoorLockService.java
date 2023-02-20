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

    public List<DoorLock> findAll() {
        return doorLockRepository.findAll();
    }

    public DoorLock create(DoorLock doorLock) {
        var createdDoorLock = doorLockRepository.save(doorLock);
        log.info("Created door lock with id: {}", createdDoorLock.getId());
        return createdDoorLock;
    }

    public void createAll(List<DoorLock> doorLocks) {
        var createdDoorLocks = doorLockRepository.saveAll(doorLocks);
        log.info("Created door locks count: {}", createdDoorLocks.size());
    }
}
