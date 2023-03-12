package com.jm.clinica_puertas_jg_api.user;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.jm.clinica_puertas_jg_api.common.model.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jm.clinica_puertas_jg_api.role.Role;
import com.jm.clinica_puertas_jg_api.role.RoleName;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "app_user")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(
            description = "The user id",
            example = "1"
    )
    private Long id;

    @Schema(
            description = "The username",
            example = "jeanpiermendoza"
    )
    @Column(unique = true, nullable = false)
    private String username;

    @Column
    @Schema(
            description = "The name or names of user",
            example = "Jeanpier"
    )
    private String name;

    @Schema(
            description = "The user lastname or surname",
            example = "Mendoza"
    )
    @Column
    private String surname;

    @Schema(
            description = "The user email",
            example = "jeanpiermendoza@outlook.com"
    )
    @Column(unique = true, nullable = false)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Schema(
            description = "The user roles"
    )
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "app_user_role", joinColumns = @JoinColumn(name = "app_user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private List<Role> roles;

    public User(String username, String name, String surname, String email, String password, List<Role> roles) {
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    @Schema(
            description = "The role names of user",
            example = "[\"ROLE_ADMIN\"]"
    )
    public List<RoleName> getRoleNames() {
        return this.roles.stream().map(Role::getName).toList();
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        return getRoleNames()
                .stream()
                .map(s -> new SimpleGrantedAuthority(s.getAuthority()))
                .collect(Collectors.toSet());
    }

    @Schema(
            description = "The display name of user, it is the result of name + surname",
            example = "Jeanpier Mendoza"
    )
    public String getDisplayName() {
        return this.name + " " + this.surname;
    }
}
