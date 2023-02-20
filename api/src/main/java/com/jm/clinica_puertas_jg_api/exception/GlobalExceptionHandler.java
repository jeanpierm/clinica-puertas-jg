package com.jm.clinica_puertas_jg_api.exception;

import com.jm.clinica_puertas_jg_api.common.dto.ApiResponse;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {MalformedJwtException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<ApiResponse<Void>> handleMalformedJwtException(MalformedJwtException exception) {
        var response = ApiResponse.<Void>builder()
                .message("Invalid JWT: " + exception.getMessage())
                .build();
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(response);
    }
}
