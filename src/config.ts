import {config} from "dotenv"
config();
export const PORT=process.env.PORT || 5000
export const NODE_ENV=process.env.NODE_ENV
export const DB_NAME=process.env.DB_NAME || "db_default"
export const DB_USER=process.env.DB_USER || "user_default"
export const DB_PASSWORD=process.env.DB_PASSWORD || "password_default"
export const DB_HOST=process.env.DB_HOST || "db_dev"
export const JWT_SECRET=process.env.JWT_SECRET || ''