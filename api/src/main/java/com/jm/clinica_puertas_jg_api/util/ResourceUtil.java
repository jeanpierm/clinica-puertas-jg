package com.jm.clinica_puertas_jg_api.util;

import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UncheckedIOException;

public class ResourceUtil {

    /**
     * Get a resource as string
     *
     * @param resource the resource
     * @return the string
     */
    public static String getResourceAsString(Resource resource) {
        try (Reader reader = new InputStreamReader(resource.getInputStream())) {
            return FileCopyUtils.copyToString(reader);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    /**
     * Get a resource as string
     *
     * @param resourcePath the classpath of resource
     * @return the string
     */
    public static String getResourceAsString(String resourcePath) {
        return getResourceAsString("500.json");
    }

}
