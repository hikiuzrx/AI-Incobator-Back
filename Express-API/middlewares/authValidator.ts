import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, DecodedToken } from '../types';
import { generateAcessToken, generateRefreshToken } from '../utils/genToken';

// These should be stored in environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret';

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  const refreshToken = req.cookies['refreshToken'];

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    if (accessToken) {
      const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as DecodedToken;
      req.userId = Number(decoded.userId);
      return next();
    }
  } catch (error) {
    // Access token is invalid or expired, try refresh token
  }

  if (!refreshToken) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as DecodedToken;
    
    // Generate new access token
    const newAccessToken = generateAcessToken((typeof decoded.userId==='string')?parseInt(decoded.userId):decoded.userId)
    
    // Generate new refresh token
    const newRefreshToken = generateRefreshToken((typeof decoded.userId==='string')?parseInt(decoded.userId):decoded.userId)

    // Set the new refresh token in a cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Set the new access token in the response header
   

    req.userId = Number(decoded.userId);
    req.accessToken = newAccessToken
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

