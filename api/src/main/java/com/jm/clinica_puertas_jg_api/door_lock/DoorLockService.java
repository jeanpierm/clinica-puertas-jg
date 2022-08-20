package com.jm.clinica_puertas_jg_api.door_lock;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DoorLockService {

    private final DoorLockRepository doorLockRepository;

    List<DoorLock> find() {
        return doorLockRepository.findAll();
    }

    DoorLock create(Map<String, Object> doorLockData) {
        DoorLock doorLock = new DoorLock();
        doorLock.setName(doorLockData.get("name").toString());
        doorLock.setPrice(new BigDecimal(doorLockData.get("price").toString()));
        return doorLockRepository.save(doorLock);
    }

}
