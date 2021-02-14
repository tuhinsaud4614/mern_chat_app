interface ValidatorRequired {
  type: "REQUIRED";
}

interface ValidatorMinLength {
  type: "MIN_LENGTH";
  val: number;
}

interface ValidatorMaxLength {
  type: "MAX_LENGTH";
  val: number;
}

interface ValidatorIsEmail {
  type: "IS_EMAIL";
}

export type ValidatorTypes =
  | ValidatorRequired
  | ValidatorMinLength
  | ValidatorMaxLength
  | ValidatorIsEmail;

export function validate(value: string, validators: ValidatorTypes[]): boolean {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === "REQUIRED") {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === "MIN_LENGTH") {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === "MAX_LENGTH") {
      isValid = isValid && value.trim().length < validator.val;
    }

    if (validator.type === "IS_EMAIL") {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
}
