package com.jm.clinica_puertas_jg_api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {
	
	private static final long serialVersionUID = -2512752028060764069L;

	public NotFoundException(String message) {
        super(message);
    }
}