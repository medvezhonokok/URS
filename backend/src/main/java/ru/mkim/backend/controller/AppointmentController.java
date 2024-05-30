package ru.mkim.backend.controller;

import org.springframework.web.bind.annotation.*;
import ru.mkim.backend.model.Appointment;
import ru.mkim.backend.service.AppointmentService;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/add")
    public void add(@RequestBody Appointment appointment) {
        appointmentService.save(appointment);
    }
}
