package com.employee.employeeservice.service;

import com.employee.employeeservice.model.Employee;
import com.employee.employeeservice.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee addEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public Employee getEmployee(Long employeeId){
        return employeeRepository.findById(employeeId).orElseThrow(()->new RuntimeException("No record found."));
    }

    public List<Employee> getAllEmployee(){
        return employeeRepository.findAll();
    }

    public void deleteEmployee(Long employeeId){
        employeeRepository.deleteById(employeeId);
    }

    public Employee updateEmployee(Employee employee){
        Employee existingEmployee = employeeRepository.findById(employee.getEmployeeId()).orElseThrow(null);
        existingEmployee.setName(employee.getName());
        existingEmployee.setAge(employee.getAge());
        existingEmployee.setAddress(employee.getAddress());
        existingEmployee.setDepartmentId(employee.getDepartmentId());
        return employeeRepository.save(existingEmployee);
    }

    public List<Employee> findByDepartmentId(Long departmentId){
        return employeeRepository.findByDepartmentId(departmentId);
    }
}
