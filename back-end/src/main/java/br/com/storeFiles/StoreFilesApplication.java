package br.com.storeFiles;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class StoreFilesApplication {

	public static void main(String[] args) {
		SpringApplication.run(StoreFilesApplication.class, args);
	}

}
