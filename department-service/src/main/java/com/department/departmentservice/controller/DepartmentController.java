package com.department.departmentservice.controller;


import com.department.departmentservice.model.Department;
import com.department.departmentservice.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.POST,
        RequestMethod.GET, RequestMethod.DELETE, RequestMethod.OPTIONS,
        RequestMethod.PATCH, RequestMethod.PUT})
@RestController
@RequestMapping("/department")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;


    @PostMapping
    public Department addDepartment(@RequestBody Department department){
        return departmentService.addDepartment(department);
    }

    @PutMapping("/update")
//    @PreAuthorize("hasRole('Admin')")
    public Department updateDepartment(@RequestBody Department department){
        return departmentService.updateDepartment(department);
    }

    @GetMapping("/{id}")
    public Department getDepartmentById(@PathVariable Long id){
        return departmentService.getDepartmentById(id);
    }

    @GetMapping
//    @PreAuthorize("hasRole('User')")
    public List<Department> getAllDepartments(){
        return departmentService.getAllDepartments();
    }

    @DeleteMapping("/{id}")
    public void deleteDepartmentById(@PathVariable Long id){
        departmentService.deleteDepartmentById(id);
    }

}
