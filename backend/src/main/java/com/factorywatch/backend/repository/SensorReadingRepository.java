package com.factorywatch.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.factorywatch.backend.model.SensorReading;

@Repository
public interface SensorReadingRepository extends JpaRepository<SensorReading, Long> {

}
