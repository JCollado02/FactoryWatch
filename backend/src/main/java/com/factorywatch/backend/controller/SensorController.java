package com.factorywatch.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.factorywatch.backend.model.SensorData;
import com.factorywatch.backend.model.SensorReading;
import com.factorywatch.backend.repository.SensorReadingRepository;

@RestController // tells us this class handles web requests
@RequestMapping("/api") // everyhthing here comes after /api
public class SensorController {

    @Autowired
    private SensorReadingRepository repository;

    // GET api status
    @GetMapping("/health") // when get a GET here, do this
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("FactoryWatch API is running");
    }

    // POST new sensor data
    @PostMapping("/sensor-data") // when we get a POST request at this url, do the following:
    public ResponseEntity<String> recieveSensorData(@RequestBody SensorData data) {

        SensorReading reading = new SensorReading(data.getTemperature(), data.getHumidity(), data.getDeviceId());
        repository.save(reading);

        return ResponseEntity.ok("Success");
    }

    // GET all readings
    @GetMapping("/sensor-data") // get data
    public List<SensorReading> getData() {
        return repository.findAll();
    }

    // GET reading from ID
    @GetMapping("/sensor-data/{id}") // get data
    public ResponseEntity<?> getReadingByID(@PathVariable Long id) {
        Optional<SensorReading> result = repository.findById(id);

        // Check if it exists
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            // 404
            return ResponseEntity.notFound().build();
        }
    }

}
