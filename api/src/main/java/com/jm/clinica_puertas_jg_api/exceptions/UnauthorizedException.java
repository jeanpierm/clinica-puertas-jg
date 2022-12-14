package com.jm.clinica_puertas_jg_api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException {

	private static final long serialVersionUID = 7058685880317779918L;

	public UnauthorizedException(String message) {
        super(message);
    }
}
