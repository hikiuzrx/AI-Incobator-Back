import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { EnvMissingException, TokenGenerationException } from '../types';

configDotenv();

// Function to generate an access token
const generateAcessToken = (id: number): string | undefined => {
  const secret: string | undefined = process.env.ACESS_TOKEN_SECRET;

  if (!secret) {
    throw new EnvMissingException('Access Token Secret');
  }

  try {
    const token = jwt.sign({ id }, secret, { expiresIn: '10m' });
    return token;
  } catch (error: any) {
    throw new TokenGenerationException('Error generating access token', error);
  }
};

// Function to generate a refresh token
const generateRefreshToken = (id: number): string | undefined => {
  const secret: string | undefined = process.env.REFRESH_TOKEN_SECRET;

  if (!secret) {
    throw new EnvMissingException('Refresh Token Secret');
  }

  try {
    const token = jwt.sign({ id }, secret, { expiresIn: '24h' });
    return token;
  } catch (error: any) {
    throw new TokenGenerationException('Error generating refresh token', error);
  }
};
export {generateAcessToken,generateRefreshToken}