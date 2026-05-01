import type { ZodIssue } from "zod";

type ValidationErrors = { [key: string]: string[] };

function mapValidationErrors(errors: ZodIssue[]): ValidationErrors {
  const validationErrors: ValidationErrors = {};

  errors.forEach((error) => {
    const field = error.path[0]; // Assuming the path has only one element (field name)
    if (!validationErrors[field]) {
      validationErrors[field] = [];
    }
    validationErrors[field].push(error.message);
  });

  return validationErrors;
}


export default mapValidationErrors
