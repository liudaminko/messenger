package com.messenger.back.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

@Data
@Accessors(chain = true)
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class NewUserDTO {
    int id;
    @NotBlank String phoneNumber;
    String firstName;
    String lastName;
    String profilePicture;
}
