package ru.mkim.backend.controller.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import ru.mkim.backend.annotation.RequireJwtParam;
import ru.mkim.backend.service.JwtService;
import ru.mkim.backend.util.StringUtil;

@Component
public class JwtInterceptor implements HandlerInterceptor {
    private final JwtService jwtService;

    @Autowired
    public JwtInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, // TODO: Nullable problems......
                             Object handler) throws Exception {
        if (handler instanceof HandlerMethod handlerMethod) {
            RequireJwtParam methodAnnotation = AnnotationUtils.findAnnotation(
                    handlerMethod.getMethod(), RequireJwtParam.class);

            if (methodAnnotation != null) {
                String jwtToken = request.getParameter("jwt");

                if (StringUtil.isNullOrEmpty(jwtToken) || jwtService.findUserByJWT(jwtToken) == null) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token.");
                    return false;
                }
            }

            return true;
        }

        return false;
    }
}
