package com.authentication.authservice.controller;


import com.authentication.authservice.model.User;
import com.authentication.authservice.service.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.POST,
        RequestMethod.GET, RequestMethod.DELETE, RequestMethod.OPTIONS,
        RequestMethod.PATCH, RequestMethod.PUT})
@RequestMapping("/user")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void initRolesAndUsers() {
        userService.initRolesAndUser();
    }

    @GetMapping
    @PreAuthorize("hasRole('Admin')")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/addUser")
//    @PreAuthorize("hasRole('Admin')")
    public User addUser(@RequestBody User user) {

        return userService.addUser(user);
    }

    @GetMapping("/{name}")
    @PreAuthorize("hasAnyRole('Admin','User')")
    public User getUserById(@PathVariable String name) {
        return userService.getUserById(name);
    }

    @DeleteMapping("/delete/{name}")
    @PreAuthorize("hasRole('Admin')")
    public String deleteUser(@PathVariable String name) {
        return userService.deleteUserById(name);
    }

    @PutMapping("/update/{name}")
    @PreAuthorize("hasRole('Admin')")
    User updateUser(@RequestBody User newUser, @PathVariable("name") String name) {
        return userService.updateUser(newUser, name);
    }

    @GetMapping("/forAdmin")
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin() {
        return "This URL is only accessible to admin.";
    }


    @GetMapping("/forUser")
    @PreAuthorize("hasRole('User')")
//    @PreAuthorize("hasAnyRole('User','Admin')") for multiple roles
    public String forUser() {
        return "This URL is only accessible to user.";
    }

}