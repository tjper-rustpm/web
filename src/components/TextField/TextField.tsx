import styled from 'styled-components';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MaterialInput, { InputProps as MaterialInputProps } from '@material-ui/core/Input';

type TextFieldProps = MaterialInputProps & {
  label: string;
  className?: string;
  helperText?: string | false;
};

const TextField = ({ label, className, helperText, ...rest }: TextFieldProps): JSX.Element => {
  const helperTextComponent = helperText ? <FormHelperText>{helperText}</FormHelperText> : null;
  return (
    <StyledFormControl className={className} fullWidth>
      <InputLabel>{label}</InputLabel>
      <MaterialInput {...rest} />
      {helperTextComponent}
    </StyledFormControl>
  );
};

export default TextField;

const StyledFormControl = styled(FormControl)`
  & .MuiFormLabel-root {
    font-family: 'Oxanium', 'sans-serif';
    font-size: 1.2rem;
  }
  & .MuiInputBase-input {
    font-size: 1.6rem;
  }
`;
