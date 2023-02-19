package com.jm.clinica_puertas_jg_api.exception;

import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {MalformedJwtException.class})
    public ResponseEntity<Map<String, String>> handleMalformedJwtException(MalformedJwtException exception) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Invalid JWT: " + exception.getMessage());
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(response);
    }
}
