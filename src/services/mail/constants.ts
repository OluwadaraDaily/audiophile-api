import * as dotenv from 'dotenv';
dotenv.config();

export const authConfig = {
  user: "oloyedara@gmail.com",
  refreshToken: process.env.SMTP_REFRESH_TOKEN,
  accessToken: process.env.SMTP_ACCESS_TOKEN,
  expires: 1484314697598,
}