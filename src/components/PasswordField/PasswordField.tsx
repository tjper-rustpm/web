import { useState } from 'react';
import styled from 'styled-components';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MaterialInput, { InputProps as MaterialInputProps } from '@material-ui/core/Input';

// import { StyledIconBase } from '@styled-icons/styled-icon';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const StyledFormControl = styled(FormControl)`
  & .MuiFormLabel-root {
    font-family: 'Oxanium', 'sans-serif';
    font-size: 1.2rem;
  }
  & .MuiInputBase-input {
    font-size: 1.6rem;
  }
  & .MuiSvgIcon-root {
    font-size: 2.2rem;
  }
`;

type State = {
  showPassword: boolean;
};

type PasswordFieldProps = MaterialInputProps & {
  label: string;
  className?: string;
  helperText?: string | false;
};

const PasswordField = ({ className, label, helperText, ...rest }: PasswordFieldProps): JSX.Element => {
  const [values, setValues] = useState<State>({
    showPassword: false,
  });

  const handleClick = (): void => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };
  const helperTextComponent = helperText ? <FormHelperText>{helperText}</FormHelperText> : null;

  return (
    <StyledFormControl className={className} fullWidth>
      <InputLabel>{label}</InputLabel>
      <MaterialInput
        {...rest}
        type={values.showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClick} onMouseDown={handleMouseDown}>
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {helperTextComponent}
    </StyledFormControl>
  );
};

export default PasswordField;
