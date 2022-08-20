package com.jm.clinica_puertas_jg_api.door_lock;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RequestMapping("door-locks")
@RestController
@RequiredArgsConstructor
public class DoorLockController {

    private final DoorLockService doorLockService;

    @GetMapping
    public List<DoorLock> get() {
        return doorLockService.find();
    }

    @PostMapping
    public ResponseEntity<DoorLock> create(@RequestBody Map<String, Object> doorLock) {
        System.out.println(doorLock.toString());
        final URI uri = URI.create("");
        final DoorLock createdDoorLock = doorLockService.create(doorLock);
        return ResponseEntity.created(uri).body(createdDoorLock);
    }
}
