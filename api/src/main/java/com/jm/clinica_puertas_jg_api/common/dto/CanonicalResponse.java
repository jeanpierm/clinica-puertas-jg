package com.jm.clinica_puertas_jg_api.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class CanonicalResponse<T> {
    public static final String SUCCESS_TRANSACTION = "Success transaction";

    private String message;
    private T result;

    public static <T> CanonicalResponse<T> successTransaction() {
        return new CanonicalResponse<>(SUCCESS_TRANSACTION, null);
    }
    public static <T> CanonicalResponse<T> successTransaction(T result) {
        return new CanonicalResponse<>(SUCCESS_TRANSACTION, result);
    }
}
