export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      DATABASE_URL: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
