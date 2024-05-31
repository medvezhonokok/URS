package ru.mkim.backend.controller;

import org.springframework.web.bind.annotation.*;
import ru.mkim.backend.model.Appointment;
import ru.mkim.backend.service.AppointmentService;

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
    public List<Appointment> getAll() {
        return appointmentService.findAll();
    }

    // TODO:
    //
    //  startTime -> startDate и endTime -> endDate
    //  просто переименовать поля класса Appointment, поля в бд и где вообще они используются
    //
    // тогда наверное в этом методе можно просто принимать @RequestBody Appointment app
    // и обновлять его (appointService.update)
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
