import { FC, ChangeEvent, FocusEvent, useReducer, useEffect } from "react";
import { TextField } from "@material-ui/core";

import { validate, ValidatorTypes } from "../../../util/validator";

interface Props {
  id: string;
  label?: string;
  errorText: string;
  validators: ValidatorTypes[];
  onChanged(id: string, value: string, isValid: boolean): void;
  isValid?: boolean;
  value?: string;
  autoFocus?: boolean;
  type?: string;
  rows?: number;
  className?: string;
}

interface FormState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

type FormAction =
  | { type: "CHANGE"; value: string; validators: ValidatorTypes[] }
  | { type: "TOUCH" };

const inputReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input: FC<Props> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isValid: props.isValid || false,
    isTouched: false,
  });

  const { value, isValid } = inputState;
  const { id, onChanged } = props;
  useEffect(() => {
    onChanged(id, value, isValid);
  }, [id, value, isValid, onChanged]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: "CHANGE",
      value: e.target.value,
      validators: props.validators,
    });
  };
  const onBlurHandler = (e: FocusEvent<HTMLInputElement>): void => {
    dispatch({ type: "TOUCH" });
  };
  return (
    <TextField
      id={props.id}
      label={props.label}
      name={props.id}
      type={props.type}
      value={inputState.value}
      autoFocus={props.autoFocus}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      error={!!props.errorText && !inputState.isValid && inputState.isTouched}
      helperText={
        !inputState.isValid &&
        inputState.isTouched &&
        !!props.errorText &&
        props.errorText
      }
      variant="outlined"
      margin="normal"
      fullWidth
      className={props.className}
      rowsMax={props.rows}
      multiline={!!props.rows}
    />
  );
};

export default Input;
