package com.tsystems.zamaltdinov.final_project.business.service;

import com.tsystems.zamaltdinov.final_project.business.dto.MonthlyRevenueDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.ProductSalesDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.TopCustomerDTO;
import com.tsystems.zamaltdinov.final_project.business.dto.WeeklyRevenueDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

import java.time.LocalDate;
import java.util.List;

@Service
public class StatisticsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<ProductSalesDTO> getTop10Products() {
        String sql = "SELECT p.title, SUM(op.quantity) AS total_quantity " +
                "FROM store.product p " +
                "JOIN store.order_product op ON p.id = op.product_id " +
                "GROUP BY p.id, p.title " +
                "ORDER BY total_quantity DESC " +
                "LIMIT 10";

        List<ProductSalesDTO> products = jdbcTemplate.query(sql, (rs, rowNum) ->
                new ProductSalesDTO(
                        rs.getString("title"),
                        rs.getInt("total_quantity")
                )
        );

        return products;
    }

    public List<TopCustomerDTO> getTopCustomers() {
        String sql = "SELECT u.firstname, u.lastname, SUM(p.price * op.quantity) AS total_purchase " +
                "FROM store.user u " +
                "JOIN store.order o ON u.id = o.user_id " +
                "JOIN store.order_product op ON o.id = op.order_id " +
                "JOIN store.product p ON op.product_id = p.id " +
                "WHERE o.order_status = 'completed' " +
                "GROUP BY u.id " +
                "ORDER BY total_purchase DESC " +
                "LIMIT 10";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            String firstname = rs.getString("firstname");
            String lastname = rs.getString("lastname");
            BigDecimal totalPurchase = rs.getBigDecimal("total_purchase");

            return new TopCustomerDTO(firstname, lastname, totalPurchase);
        });
    }

    public List<MonthlyRevenueDTO> getMonthlyRevenue() {
        String sql = "SELECT to_char(o.order_date, 'YYYY-MM') as month, SUM(p.price * op.quantity) as revenue " +
                "FROM store.order o " +
                "JOIN store.order_product op ON o.id = op.order_id " +
                "JOIN store.product p ON op.product_id = p.id " +
                "WHERE o.order_status = 'completed' " +
                "GROUP BY month " +
                "ORDER BY month ASC";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            String month = rs.getString("month");
            BigDecimal revenue = rs.getBigDecimal("revenue");

            return new MonthlyRevenueDTO(month, revenue);
        });
    }

    public List<WeeklyRevenueDTO> getWeeklyRevenue() {
        String sql = "SELECT date_trunc('week', o.order_date)::DATE AS week_start_date, " +
                "(date_trunc('week', o.order_date) + INTERVAL '6 days')::DATE AS week_end_date, " +
                "SUM(p.price * op.quantity) AS revenue " +
                "FROM store.order o " +
                "JOIN store.order_product op ON o.id = op.order_id " +
                "JOIN store.product p ON op.product_id = p.id " +
                "WHERE o.order_status = 'delivered' " +
                "GROUP BY week_start_date, week_end_date, o.order_date " +
                "ORDER BY week_start_date";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            LocalDate weekStartDate = rs.getDate("week_start_date").toLocalDate();
            LocalDate weekEndDate = rs.getDate("week_end_date").toLocalDate();
            BigDecimal revenue = rs.getBigDecimal("revenue");

            return new WeeklyRevenueDTO(weekStartDate, weekEndDate, revenue);
        });
    }
}
