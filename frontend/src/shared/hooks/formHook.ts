import { useReducer, useCallback } from "react";

interface FormState {
  form: {
    [name: string]: {
      value: string;
      isValid: boolean;
    };
  };
  formIsValid: boolean;
}

interface FormChangeAction {
  type: "CHANGE";
  name: string;
  value: string;
  isValid: boolean;
}

interface FormSetDataAction {
  type: "SET_DATA";
  newState: FormState;
}

type FormAction = FormChangeAction | FormSetDataAction;

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "CHANGE":
      let formIsValid = true;
      for (const name in state.form) {
        if (name === action.name) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.form[name].isValid;
        }
      }
      return {
        ...state,
        form: {
          ...state.form,
          [action.name]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        formIsValid: formIsValid,
      };
    case "SET_DATA":
      return {
        ...action.newState,
      };
    default:
      return state;
  }
}

function useForm(
  initialState: FormState
): [
  FormState,
  (id: string, value: string, isValid: boolean) => void,
  (newState: FormState) => void
] {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const changeHandler = useCallback(
    (id: string, value: string, isValid: boolean): void => {
      dispatch({
        type: "CHANGE",
        value: value,
        name: id,
        isValid: isValid,
      });
    },
    []
  );

  const setData = useCallback((newState: FormState) => {}, []);
  return [formState, changeHandler, setData];
}

export default useForm;
