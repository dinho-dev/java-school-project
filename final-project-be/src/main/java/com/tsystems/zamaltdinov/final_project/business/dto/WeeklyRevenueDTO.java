package com.tsystems.zamaltdinov.final_project.business.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeeklyRevenueDTO {
    private LocalDate weekStartDate;
    private LocalDate weekEndDate;
    private BigDecimal revenue;
}

