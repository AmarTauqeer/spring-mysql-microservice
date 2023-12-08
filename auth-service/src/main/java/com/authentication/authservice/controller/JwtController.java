package com.authentication.authservice.controller;

import com.authentication.authservice.model.JwtRequest;
import com.authentication.authservice.model.JwtResponse;
import com.authentication.authservice.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:5009",methods = {RequestMethod.POST})
public class JwtController {

    @Autowired
    private JwtService jwtService;


    @PostMapping("/authenticate")
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        return jwtService.createJwtToken(jwtRequest);
    }


}