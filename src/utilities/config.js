import dotenv from 'dotenv';
dotenv.config({ path: process.env.DOTENV_CONFIG_PATH });
process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

const MSAL_CLIENT_ID = process.env.MSAL_CLIENT_ID;
const MSAL_AUTHORITY = process.env.MSAL_AUTHORITY;
const MSAL_SECRETS = process.env.MSAL_SECRETS;
const MSAL_SCOPES = process.env.MSAL_SCOPES;
const MSAL_REDIRECT_URI = process.env.MSAL_REDIRECT_URI;
const MSAL_LOGOUT_URI = process.env.MSAL_LOGOUT_URI || '/';