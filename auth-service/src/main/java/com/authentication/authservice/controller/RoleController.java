package com.authentication.authservice.controller;


import com.authentication.authservice.model.Role;
import com.authentication.authservice.model.User;
import com.authentication.authservice.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/role")
@RestController
@CrossOrigin("*")
public class RoleController {
    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/")
    public String welcome(){
        return "hi from welcome page";
    }

    @PostMapping("/addRole")
    public Role addRole(@RequestBody Role role){
        return roleService.addRole(role);
    }

    @GetMapping
    public List<Role> getRole() {
        return roleService.getRoles();
    }

}
