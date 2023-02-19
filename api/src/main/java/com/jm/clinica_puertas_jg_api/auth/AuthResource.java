package com.jm.clinica_puertas_jg_api.auth;

import com.jm.clinica_puertas_jg_api.auth.dto.RefreshResponseDto;
import com.jm.clinica_puertas_jg_api.auth.dto.SignInRequestDto;
import com.jm.clinica_puertas_jg_api.auth.dto.SignInResponseDto;
import com.jm.clinica_puertas_jg_api.auth.dto.SignUpRequestDto;
import com.jm.clinica_puertas_jg_api.auth.dto.SignUpResponseDto;
import com.jm.clinica_puertas_jg_api.user.User;
import lombok.RequiredArgsConstructor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("auth")
public class AuthResource {
    private final AuthService authService;
    private final ModelMapper modelMapper;

    @PostMapping("sign-in")
    public SignInResponseDto signIn(@Valid @RequestBody SignInRequestDto requestDto) {
        return authService.signIn(requestDto.getUsername(), requestDto.getPassword());
    }

    @PostMapping("sign-up")
    public SignUpResponseDto signUp(@Valid @RequestBody SignUpRequestDto requestDto) {
        User userToCreate = modelMapper.map(requestDto, User.class);
        return authService.signUp(userToCreate);
    }

    @PostMapping("refresh")
    public RefreshResponseDto refresh(HttpServletRequest req) {
        return authService.refresh(req.getRemoteUser());
    }
}
