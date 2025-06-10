import { CustomError } from "@/infra/errors/Common";

export const UserNotFound = new CustomError(400, 'User not found');

export const UserNotConfirmed = new CustomError(400, 'User not confirmed')

export const InvalidPassword = new CustomError(404, 'Invalid password')

export const UsernameAlreadyExists = new CustomError(400, 'Username already exists')