import { SessionData } from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    userId?: {
      id: number;
      email: string;
      [key: string]: any;
    };
  }
}
