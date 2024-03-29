package com.jm.clinica_puertas_jg_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException {

	@Serial
    private static final long serialVersionUID = 7058685880317779918L;

	public UnauthorizedException(String message) {
        super(message);
    }
}
