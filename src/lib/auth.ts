import { jwtVerify } from 'jose';
import { env } from '~/env.js';

export interface UserJWTPayload {
  jti: string;
  iat: number;
  exp: number;
  userId?: string;
}

export const verifyJWT = async (token: string) => {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(env.SECRET_KEY));
    return verified.payload as UserJWTPayload;
  } catch (error) {
    throw new Error('token has expired')
  } 
}