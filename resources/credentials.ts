export const credentials: Credential[] = [{ username: 'standard_user', password: 'secret_sauce', isValid: true },
{ username: 'secret_sauce', password: 'standard_user', isValid: false }];

export type Credential = {
  isValid: boolean
  username: string,
  password: string,
}