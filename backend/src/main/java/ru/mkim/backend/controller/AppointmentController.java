package ru.mkim.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mkim.backend.model.Appointment;
import ru.mkim.backend.model.Company;
import ru.mkim.backend.model.User;
import ru.mkim.backend.service.AppointmentService;
import ru.mkim.backend.service.JwtService;
import ru.mkim.backend.util.StringUtil;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        appointmentService.removeById(id);
    }

    @PostMapping("/all")
    public ResponseEntity<List<Appointment>> getAll() {
        return new ResponseEntity<>(appointmentService.findAll(), HttpStatusCode.valueOf(200));
    }

    @PostMapping("/update")
    public void update(@RequestBody Map<String, Object> requestBody) {
        String id = requestBody.keySet().iterator().next();
        Appointment appointment = appointmentService.findById(Long.parseLong(id));
        if (appointment != null) {
            @SuppressWarnings("unchecked") Map<String, String> timeMap = (Map<String, String>) requestBody.get(id);
            String newStartTime = timeMap.get("startDate");
            String newEndTime = timeMap.get("endDate");

            appointment.setStartTime(LocalDateTime.parse(newStartTime.substring(0, newStartTime.length() - 1)));
            appointment.setEndTime(LocalDateTime.parse(newEndTime.substring(0, newEndTime.length() - 1)));

            appointmentService.update(appointment);
        }
    }
}
