package com.adc.commonlibrary.utils;

import com.adc.commonlibrary.constants.ApiConstant;
import com.adc.commonlibrary.exception.AccessDeniedException;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

public class AuthenticationUtils    {
    private AuthenticationUtils() {

    }

    @SneakyThrows
    public static String extractUserId()  {
        Authentication authentication = getAuthentication();

        if(authentication instanceof AnonymousAuthenticationToken) {
            throw new AccessDeniedException(ApiConstant.ACCESS_DENIED);
        }
        JwtAuthenticationToken token = (JwtAuthenticationToken) authentication;
        return token.getToken().getSubject();
    }

    public static String extractJwt()  {
        return ((Jwt) getAuthentication().getPrincipal()).getTokenValue();
    }

    private static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
