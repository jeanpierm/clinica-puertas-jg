package com.jm.clinica_puertas_jg_api.exceptions;

import java.util.Map;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    // @Bean
    // public ErrorAttributes errorAttributes() {
    //     // Hide trace field in the return object
    //     return new DefaultErrorAttributes() {
    //         @Override
    //         public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
    //             Map<String, Object> errorAttributes = super.getErrorAttributes(webRequest, options);
    //             errorAttributes.remove("trace");
    //             return errorAttributes;
    //         }
    //     };
    // }
}
