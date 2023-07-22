import { EncrypterRepository } from "../../../domain/encrypter"
import bcrypt from 'bcryptjs'
export class BcryptRepository implements EncrypterRepository{
    async encrypt(textToEncrypt: string): Promise<string | null> {
        try{
            const hash = await bcrypt.hash(textToEncrypt, 10)
            return hash
        }catch(e){
            console.log('error en bcrypt',e)
            return null
        }
    }
    async compare(textToCompare: string, encryptedText: string): Promise<boolean> {
        try {
          const res = await bcrypt.compare(textToCompare, encryptedText)
          return res
        } catch (err) {
            return false
        }
    }
}