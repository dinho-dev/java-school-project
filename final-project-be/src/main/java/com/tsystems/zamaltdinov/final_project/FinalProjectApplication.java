package com.tsystems.zamaltdinov.final_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.UUID;

@SpringBootApplication
public class FinalProjectApplication {

	public static void main(String[] args) {
		UUID.randomUUID();
		SpringApplication.run(FinalProjectApplication.class, args);
	}
}
