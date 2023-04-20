package com.tsystems.zamaltdinov.final_project.rest.controller;

import com.tsystems.zamaltdinov.final_project.business.dto.ProductSalesDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.TopCustomerDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.WeeklyRevenueDTO;
import com.tsystems.zamaltdinov.final_project.business.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sales")
public class SalesController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/top-products")
    public List<ProductSalesDTO> getTop10Products() {
        return statisticsService.getTop10Products();
    }

    @GetMapping("/top-customers")
    public List<TopCustomerDTO> getTopCustomers() {
        return statisticsService.getTopCustomers();
    }


    @GetMapping("/weekly-revenue")
    public ResponseEntity<List<WeeklyRevenueDTO>> getWeeklyRevenue() {
        List<WeeklyRevenueDTO> weeklyRevenueDTOs = statisticsService.getWeeklyRevenue();
        return ResponseEntity.ok().body(weeklyRevenueDTOs);
    }
}