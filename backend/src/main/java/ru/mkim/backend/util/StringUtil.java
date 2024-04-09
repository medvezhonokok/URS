package ru.mkim.backend.util;

public final class StringUtil {
    private StringUtil() {
        // No operations.
    }

    public static boolean isNullOrEmpty(String s) {
        return s == null || s.isBlank();
    }

    public static boolean isNotNullOrEmpty(String s) {
        return !isNullOrEmpty(s);
    }
}
