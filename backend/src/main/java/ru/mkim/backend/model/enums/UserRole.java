package ru.mkim.backend.model.enums;

public enum UserRole {
    CEO, WORKER, ADMIN, SCHEME_MANAGER, SCHEDULE_MANAGER
}

// 1.
// SCHEME_MANAGER
// SCHEDULE_MANAGER
//
// 2.
// Также enum для каждой заявки -- 'В работе', 'Одобрена'
//
// 3.
// Хотим научиться планировать аудит сразу из заявки, если она одобрена