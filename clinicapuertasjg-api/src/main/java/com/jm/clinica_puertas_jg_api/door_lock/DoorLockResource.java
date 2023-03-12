package com.jm.clinica_puertas_jg_api.door_lock;

import java.net.URI;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.jm.clinica_puertas_jg_api.door_lock.dto.DoorLockRequestDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequestMapping(path = DoorLockResource.PATH)
@RestController
@RequiredArgsConstructor
public class DoorLockResource {

    public static final String PATH = "/door-locks";

    private final DoorLockService doorLockService;
    private final ModelMapper modelMapper;

    @GetMapping
    public List<DoorLock> get() {
        return doorLockService.findAll();
    }

    @PostMapping
    public ResponseEntity<DoorLock> create(@Valid @RequestBody DoorLockRequestDto doorLockRequest) {
        DoorLock doorLock = modelMapper.map(doorLockRequest, DoorLock.class);
        DoorLock createdDoorLock = doorLockService.create(doorLock);
        final URI uri = getDoorLockLocation(createdDoorLock);
        return ResponseEntity.created(uri).body(createdDoorLock);
    }

    private URI getDoorLockLocation(DoorLock doorLock) {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(DoorLockResource.PATH + "/doorLockId")
                .buildAndExpand(doorLock.getId()).toUri();
    }
}
