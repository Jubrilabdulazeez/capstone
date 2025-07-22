import crypto from 'crypto'

export class PasswordGenerator {
  private static readonly LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
  private static readonly UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  private static readonly NUMBERS = '0123456789'
  private static readonly SPECIAL = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  static generateSecurePassword(length: number = 12): string {
    if (length < 8) {
      throw new Error('Password length must be at least 8 characters')
    }

    const allChars = this.LOWERCASE + this.UPPERCASE + this.NUMBERS + this.SPECIAL
    
    let password = ''
    
    // Ensure at least one character from each category
    password += this.getRandomChar(this.LOWERCASE)
    password += this.getRandomChar(this.UPPERCASE)
    password += this.getRandomChar(this.NUMBERS)
    password += this.getRandomChar(this.SPECIAL)
    
    // Fill remaining length with random characters
    for (let i = 4; i < length; i++) {
      password += this.getRandomChar(allChars)
    }
    
    // Shuffle the password to avoid predictable patterns
    return this.shuffleString(password)
  }

  private static getRandomChar(chars: string): string {
    const randomIndex = crypto.randomInt(0, chars.length)
    return chars[randomIndex]
  }

  private static shuffleString(str: string): string {
    const arr = str.split('')
    for (let i = arr.length - 1; i > 0; i--) {
      const j = crypto.randomInt(0, i + 1)
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr.join('')
  }

  static generateTemporaryPassword(): string {
    return this.generateSecurePassword(12)
  }

  static generateStrongPassword(): string {
    return this.generateSecurePassword(16)
  }
}