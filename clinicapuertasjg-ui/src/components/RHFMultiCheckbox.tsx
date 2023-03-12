import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Option } from '../models/option';

type Props = {
  label: string;
  name: string;
  required?: boolean;
  options: Option[];
} & CheckboxProps;

const RHFMultiCheckbox: React.FC<Props> = ({ label, name, required, options, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onSelected = (option: string) =>
          field.value.includes(option)
            ? field.value.filter((value: string) => value !== option)
            : [...field.value, option];

        return (
          <FormControl error={!!error} required={required} component='fieldset' variant='standard'>
            <FormLabel component='legend'>{label}</FormLabel>
            <FormGroup>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={field.value.includes(option.value)}
                      onChange={() => field.onChange(onSelected(option.value))}
                      {...other}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default RHFMultiCheckbox;
