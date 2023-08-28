declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      MONGO_SECRET_URI: string;
      retryWrites: string;
      w: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      SESSION_SECRET: string;
      VITE_SERVER_LINK: string;
    }
  }
}

export {};
