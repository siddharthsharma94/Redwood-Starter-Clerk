export interface RootJWTPayloadType {
  id: string
  passwordEnabled: boolean
  twoFactorEnabled: boolean
  createdAt: number
  updatedAt: number
  profileImageUrl: string
  gender: string
  birthday: string
  primaryEmailAddressId: string
  primaryPhoneNumberId: string
  primaryWeb3WalletId: any
  lastSignInAt: number
  externalId: any
  username: string
  firstName: string
  lastName: string
  publicMetadata: PublicMetadata
  privateMetadata: PrivateMetadata
  unsafeMetadata: UnsafeMetadata
  emailAddresses: EmailAddress[]
  phoneNumbers: PhoneNumber[]
  web3Wallets: any[]
  externalAccounts: ExternalAccount[]
  roles: any[]
}

export interface PublicMetadata {}

export interface PrivateMetadata {}

export interface UnsafeMetadata {}

export interface EmailAddress {
  id: string
  emailAddress: string
  verification: Verification
  linkedTo: LinkedTo[]
}

export interface Verification {
  status: string
  strategy: string
  externalVerificationRedirectURL: any
  attempts: any
  expireAt: any
  nonce: any
}

export interface LinkedTo {
  id: string
  type: string
}

export interface PhoneNumber {
  id: string
  phoneNumber: string
  reservedForSecondFactor: boolean
  defaultSecondFactor: boolean
  verification: Verification2
  linkedTo: any[]
}

export interface Verification2 {
  status: string
  strategy: string
  externalVerificationRedirectURL: any
  attempts: number
  expireAt: number
  nonce: any
}

export interface ExternalAccount {
  id: string
  approvedScopes: string
  emailAddress: string
  username: any
  publicMetadata: PublicMetadata2
  label: any
  verification: Verification3
}

export interface PublicMetadata2 {}

export interface Verification3 {
  status: string
  strategy: string
  externalVerificationRedirectURL: any
  attempts: any
  expireAt: number
  nonce: any
}
