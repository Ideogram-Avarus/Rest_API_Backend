import { CustomError } from "./Common";

export const UserNotFound = new CustomError(404, 'User not found')
    
export const UsernameAlreadyExists = new CustomError(400, 'Username already exists')
    
export const EmpresaNotFound = new CustomError(404, 'Empresa not found')

export const InvalidPassword = new CustomError(401, 'Invalid password')
    
export const UserAlreadyExists = new CustomError(400, 'User already exists')
    
export const UserExistsInRoles = new CustomError(400, 'User already exists in roles')

export const UserNotConfirmed = new CustomError(401, 'User not confirmed')
    
export const InvalidToken = new CustomError(403, 'Invalid token')

export const PermissionNotFound = new CustomError(401, 'Permission not found')
        
export const RoleNotFound = new CustomError(404, 'Role not found')

export const ReceiverHasNoOtherRoles = new CustomError(400, 'Receiver has no other roles')

export const ReceiverHasNoOtherPermissions = new CustomError(400, 'Receiver has no other permissions')
