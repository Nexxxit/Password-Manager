export type PasswordOptions = {
    length: number;
    letters?: boolean;
    lower?: boolean;
    upper?: boolean;
    randomReg?:boolean;
    digits?: boolean;
    symbols?: boolean;
    customCharset?: string;
}