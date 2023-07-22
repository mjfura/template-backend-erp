export interface EncrypterRepository{
    encrypt(textToEncrypt:string):Promise<string|null>,
    compare(textToCompare:string,encryptedText:string):Promise<boolean>
}