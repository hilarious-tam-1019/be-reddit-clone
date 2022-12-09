import { SessionData } from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    userId?: {
      email: string;
      [key: string]: any;
    };
  }
}
