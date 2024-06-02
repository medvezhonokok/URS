package ru.mkim.backend.service;

import org.springframework.stereotype.Service;
import ru.mkim.backend.model.Appointment;
import ru.mkim.backend.repository.AppointmentRepository;

import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public void save(Appointment appointment) {
        appointmentRepository.save(appointment);
    }

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public void update(Appointment appointment) {
        appointmentRepository.save(appointment);
    }

    public Appointment findById(long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    public void removeById(Long id) {
        appointmentRepository.deleteById(id);
    }
}
