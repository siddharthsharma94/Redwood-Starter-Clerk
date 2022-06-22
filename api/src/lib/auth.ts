import { parseJWT } from '@redwoodjs/api'
import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'
import { logger } from 'src/lib/logger'
import { RootJWTPayloadType } from './clerkTypes'
import { db } from './db'

/**
 * getCurrentUser returns the user information together with
 * an optional collection of roles used by requireAuth() to check
 * if the user is authenticated or has role-based access
 *
 * @param decoded - The decoded access token containing user info and JWT claims like `sub`. Note could be null.
 * @param { token, SupportedAuthTypes type } - The access token itself as well as the auth provider type
 * @param { APIGatewayEvent event, Context context } - An object which contains information from the invoker
 * such as headers and cookies, and the context information about the invocation such as IP Address
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const getCurrentUser = async (
  decoded: RootJWTPayloadType,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  { token, type },
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  { event, context }
) => {
  if (!decoded) {
    logger.warn('Missing decoded user')
    return null
  }

  //@ts-ignore
  const { roles } = parseJWT({ decoded })

  const {
    id,
    profileImageUrl,
    primaryEmailAddressId,
    primaryPhoneNumberId,
    firstName,
    lastName,
  } = decoded

  const emailAddress = decoded.emailAddresses?.find(
    (email) => email.id === primaryEmailAddressId
  ).emailAddress

  const phoneNumber = decoded.phoneNumbers?.find(
    (phone) => phone.id === primaryPhoneNumberId
  ).phoneNumber

  const user = await db.user.upsert({
    where: {
      id,
    },
    create: {
      id,
      name: firstName + ' ' + lastName,
      email: emailAddress,
      image: profileImageUrl,
      phoneNumber,
    },
    update: {
      // name: firstName + ' ' + lastName,
      // email: emailAddress,
      // image: profileImageUrl,
      // phoneNumber,
    },
  })

  // if (roles) {
  //   console.log('here')
  //   return { ...decoded, roles: roles }
  // }

  console.log({ user })
  return user
}

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = () => {
  return !!context.currentUser
}

/**
 * When checking role membership, roles can be a single value, a list, or none.
 * You can use Prisma enums too (if you're using them for roles), just import your enum type from `@prisma/client`
 */
type AllowedRoles = string | string[] | undefined

/**
 * When checking role membership, roles can be a single value, a list, or none.
 * You can use Prisma enums too (if you're using them for roles), just import your enum type from `@prisma/client`
 */

/**
 * Checks if the currentUser is authenticated (and assigned one of the given roles)
 *
 * @param roles: AllowedRoles - Checks if the currentUser is assigned one of these roles
 *
 * @returns {boolean} - Returns true if the currentUser is logged in and assigned one of the given roles,
 * or when no roles are provided to check against. Otherwise returns false.
 */
export const hasRole = (roles: AllowedRoles): boolean => {
  if (!isAuthenticated()) {
    return false
  }

  const currentUserRoles = context.currentUser?.roles

  if (typeof roles === 'string') {
    if (typeof currentUserRoles === 'string') {
      // roles to check is a string, currentUser.roles is a string
      return currentUserRoles === roles
    } else if (Array.isArray(currentUserRoles)) {
      // roles to check is a string, currentUser.roles is an array
      return currentUserRoles?.some((allowedRole) => roles === allowedRole)
    }
  }

  if (Array.isArray(roles)) {
    if (Array.isArray(currentUserRoles)) {
      // roles to check is an array, currentUser.roles is an array
      return currentUserRoles?.some((allowedRole) =>
        roles.includes(allowedRole)
      )
    } else if (typeof context.currentUser.roles === 'string') {
      // roles to check is an array, currentUser.roles is a string
      return roles.some(
        (allowedRole) => context.currentUser?.roles === allowedRole
      )
    }
  }

  // roles not found
  return false
}

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param roles: AllowedRoles - When checking role membership, these roles grant access.
 *
 * @returns - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {AuthenticationError} - If the currentUser is not authenticated
 * @throws {ForbiddenError} If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = ({ roles }) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (roles && !hasRole(roles)) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
