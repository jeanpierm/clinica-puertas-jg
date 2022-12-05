package com.jm.clinica_puertas_jg_api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ConflictException extends RuntimeException {

	private static final long serialVersionUID = 1327014774301615870L;

	public ConflictException(String message) {
        super(message);
    }
}