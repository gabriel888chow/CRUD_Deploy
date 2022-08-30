import logger from '../utilities/logger';
import * as config from '../utilities/config';
import { ApiError } from '../models/error';

const winstonLogLevels = ['error', 'warn', 'info', 'verbose', 'debug'];

const clientConfig = {
    auth: {
        clientId: config.MSAL_CLIENT_ID,
        authority: config.MSAL_AUTHORITY,
        clientSecret: config.MSAL_SECRETS,
        knownAuthorities: [config.MSAL_AUTHORITY]
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {logger.log(winstonLogLevels[level],message);},
            logLevel:  config.LOGGING_LEVEL === 'debug' ? msal.LogLevel.Trace : msal.LogLevel.Warning,
        }
    }
};

const baseAuthUrlRequest = {
    authority: config.MSAL_AUTHORITY,
    scopes: [config.MSAL_SCOPES],
    redirectUri: config.MSAL_REDIRECT_URI
};

const baseAuthCodeRequest = {
    authority: config.MSAL_AUTHORITY,
    scopes: [config.MSAL_SCOPES],
    redirectUri: config.MSAL_REDIRECT_URI,
    code: ''
};

// interface  {
//     netId
//   }

async function getAuthCodeUrl(originalUrl) {
    const pca = new msal.ConfidentialClientApplication(clientConfig);

    const authUrlRequest = {
        ...baseAuthUrlRequest,
        state: originalUrl,
    }

    return await pca.getAuthCodeUrl(authUrlRequest);
}

// Accept authorization code from IdP, try to login and return sessionId
async function getAuthenticationResult(code) {
    const pca = new msal.ConfidentialClientApplication(clientConfig);

    const authCodeRequest = {
        ...baseAuthCodeRequest,
        code
    };

    // exchange auth code for tokens
    const tokenResponse = await pca.acquireTokenByCode(authCodeRequest);
    const netId = (tokenResponse?.account?.idTokenClaims)?.cn;

    if(!netId) {
      throw new ApiError('Error validating login credential.');
    }

    return {
      netId
    }
}


export { getAuthCodeUrl, getAuthenticationResult };


