package com.jm.clinica_puertas_jg_api.user;

import com.jm.clinica_puertas_jg_api.common.dto.CanonicalResponse;
import com.jm.clinica_puertas_jg_api.role.Role;
import com.jm.clinica_puertas_jg_api.role.RoleService;
import com.jm.clinica_puertas_jg_api.user.dto.FindUsersResponseDto;
import com.jm.clinica_puertas_jg_api.user.dto.PutUserDto;
import com.jm.clinica_puertas_jg_api.user.dto.UserDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = UserResource.PATH)
@RequiredArgsConstructor
@Tag(name = "user", description = "the user API")
public class UserResource {

    public static final String PATH = "/users";
    public static final String NOT_FOUND_EXAMPLE = """
            {
                "timestamp": "2023-02-20T21:08:30.597+00:00",
                "status": 404,
                "error": "Not Found",
                "message": "User with id '5' not found",
                "path": "/clinica-puertas-jg/api/users/5"
            }
            """;
    private final UserService userService;
    private final RoleService roleService;
    private final ModelMapper modelMapper;

    @Operation(security = {
            @SecurityRequirement(name = "bearer-key")}, summary = "Find users", description = "Find users")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CanonicalResponse<FindUsersResponseDto>> findAll() {
        var response = CanonicalResponse.successTransaction(
                FindUsersResponseDto.builder()
                        .users(userService.findAll())
                        .build());
        return ResponseEntity.ok(response);
    }

    @Operation(security = {@SecurityRequirement(name = "bearer-key")}, summary = "Find user by id", description = "Find user by id")
    @GetMapping(path = "{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = {
                            @Content(examples = @ExampleObject(summary = "not found error", value = NOT_FOUND_EXAMPLE),
                                    mediaType = MediaType.APPLICATION_JSON_VALUE),
                    }
            )
    })
    public ResponseEntity<User> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @Operation(security = {
            @SecurityRequirement(name = "bearer-key")}, summary = "Create user", description = "Create user")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> create(@Valid @RequestBody UserDto user) {
        User userToCreate = modelMapper.map(user, User.class);
        List<Role> roles = user.getRoleNames().stream()
                .map(roleService::findByName)
                .toList();
        userToCreate.setRoles(roles);

        User createdUser = userService.create(userToCreate);
        URI location = getUserLocation(createdUser);

        return ResponseEntity.created(location).body(createdUser);
    }

    @Operation(security = {
            @SecurityRequirement(name = "bearer-key")}, summary = "Partially update user by id", description = "Partially update user by id")
    @PatchMapping(path = "{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> patch(@PathVariable Long id, @Valid @RequestBody UserDto user) {
        User userToUpdate = modelMapper.map(user, User.class);
        List<Role> roles = roleService.findByRoleNames(user.getRoleNames());
        userToUpdate.setRoles(roles);

        userService.updateById(id, userToUpdate);

        return ResponseEntity.noContent().build();
    }

    @Operation(security = {
            @SecurityRequirement(name = "bearer-key")}, summary = "Update user by id", description = "Update user by id")
    @PutMapping(path = "{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> put(@PathVariable Long id, @Valid @RequestBody PutUserDto user) {
        User userToUpdate = modelMapper.map(user, User.class);
        List<Role> roles = roleService.findByRoleNames(user.getRoleNames());
        userToUpdate.setRoles(roles);

        userService.updateById(id, userToUpdate);

        return ResponseEntity.noContent().build();
    }

    @Operation(security = {
            @SecurityRequirement(name = "bearer-key")}, summary = "Delete user by id", description = "Delete user by id")
    @DeleteMapping(path = "{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private URI getUserLocation(User user) {
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(UserResource.PATH + "/{userId}").buildAndExpand(user.getId()).toUri();
    }
}
