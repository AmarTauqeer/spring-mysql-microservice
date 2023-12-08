package com.department.departmentservice.service;

import com.department.departmentservice.model.Department;
import com.department.departmentservice.repository.DepartmentRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    private DepartmentRepository departmentRepository;

    private EmployeeClient employeeClient;

    public DepartmentService(DepartmentRepository departmentRepository, EmployeeClient employeeClient) {
        this.departmentRepository = departmentRepository;
        this.employeeClient = employeeClient;
    }

    public Department addDepartment(Department department){
        return departmentRepository.save(department);
    }

    public List<Department> getAllDepartments(){

        List<Department> departments = departmentRepository.findAll();
        List<Department> newDepartmentList = departments.stream().map(department-> {
            department.setEmployees(employeeClient.getEmployeesOfDepartment(department.getId()));
            return department;
        }).collect(Collectors.toList());

        return newDepartmentList ;
    }

    public Department getDepartmentById(Long id){
        Department department =departmentRepository.findById(id).orElseThrow(()-> new RuntimeException("Record not found."));
        department.setEmployees(employeeClient.getEmployeesOfDepartment(department.getId()));

        return department;
    }

    public void deleteDepartmentById(Long id){
        departmentRepository.deleteById(id);
    }

    public Department updateDepartment(Department department){
        Department existingDepartment = departmentRepository.findById(department.getId()).orElse(null);
        existingDepartment.setDepartmentName(department.getDepartmentName());
        return departmentRepository.save(existingDepartment);
    }


}
