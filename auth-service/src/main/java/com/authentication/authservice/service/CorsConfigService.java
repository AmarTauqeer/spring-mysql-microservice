package com.authentication.authservice.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CorsConfigService implements CorsConfigurationSource {
    @Override
    public CorsConfiguration getCorsConfiguration(HttpServletRequest args0){
        List<String> listOfOrigin = List.of("*");
        List<String> listOfHttpMethod = List.of("GET","POST");


        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(listOfOrigin);
        configuration.setAllowedMethods(listOfHttpMethod);
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowedOriginPatterns(List.of("*"));

        return configuration;
    }
}
