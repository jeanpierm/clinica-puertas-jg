package com.jm.clinica_puertas_jg_api.user.dto;

import com.jm.clinica_puertas_jg_api.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class FindUsersResponseDto {

    private List<User> users = new ArrayList<>();
}
