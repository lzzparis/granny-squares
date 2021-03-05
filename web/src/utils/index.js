import PasswordValidator from 'password-validator';

// Password Validator schema
export const passwordSchema = new PasswordValidator();
passwordSchema
  .is().min(6)
  .is().max(32);

export default { passwordSchema };
