package com.jm.clinica_puertas_jg_api.door_lock;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoorLockRepository extends JpaRepository<DoorLock, Long> {
}
