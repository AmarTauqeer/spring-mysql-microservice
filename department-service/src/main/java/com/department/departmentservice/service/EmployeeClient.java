package com.department.departmentservice.service;

import com.department.departmentservice.model.Employee;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

//@FeignClient(url = "http://localhost:8082", value = "Employee-Client")
@FeignClient(name = "EMPLOYEE-SERVICE")
public interface EmployeeClient {

    @GetMapping("/employee/department/{departmentId}")
    List<Employee> getEmployeesOfDepartment(@PathVariable Long departmentId);
}
