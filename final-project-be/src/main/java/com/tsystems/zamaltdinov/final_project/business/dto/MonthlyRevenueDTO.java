package com.tsystems.zamaltdinov.final_project.business.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyRevenueDTO {
    private String month;
    private BigDecimal revenue;

}
