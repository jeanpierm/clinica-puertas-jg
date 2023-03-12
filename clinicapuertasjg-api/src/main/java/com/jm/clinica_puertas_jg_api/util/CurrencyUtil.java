package com.jm.clinica_puertas_jg_api.util;

import java.math.BigDecimal;

public class CurrencyUtil {

    public static BigDecimal integerToBigDecimal(Integer value) {
        String s = String.valueOf(Double.parseDouble(String.valueOf(value)) / 100);
        return new BigDecimal(s).setScale(2);
    }
}
