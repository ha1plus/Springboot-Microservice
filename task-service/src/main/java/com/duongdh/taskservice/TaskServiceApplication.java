package com.duongdh.taskservice;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
@SpringBootApplication
@EnableFeignClients
@EnableDiscoveryClient
public class TaskServiceApplication {

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	};

	public static void main(String[] args) {
		SpringApplication.run(TaskServiceApplication.class, args);
	}

}
