const { Token, IdentityServiceToken, errors: { NetworkError } } = require('@sap/xssec');

/**
 * Sets up a middleware that exchanges the IAS token for an XSUAA token if the request contains an IAS token.
 * The XSUAA token replaces the IAS token in req.headers.authorization. * 
 * The original IAS token is stored in req.originalToken.
 * It must NOT be trusted until either the XSUAA token or the IAS token has been successfully validated.
 * @param {import('@sap/xssec').IdentityService} iasService IdentityService whose incoming tokens should exchanged
 * @param {import('@sap/xssec').XsuaaService} xsuaaService XsuaaService from which the new token should be fetched
 * @param {import('@sap/xssec').Types.XsuaaTokenFetchOptions} [options] the token fetch options to be passed to xsuaaService.fetchJwtBearerToken
 */
function iasXsuaaTokenExchange(iasService, xsuaaService, options = {}) {
    return async (req, res, next) => {
        try {
            const originalJwt = req.headers?.authorization?.split(' ')[1];
            if (!originalJwt) { 
                return next();
            }

            let originalToken = new Token(originalJwt);
            if (!xsuaaService.acceptsTokenAudience(originalToken) && iasService.acceptsTokenAudience(originalToken)) {
                originalToken = new IdentityServiceToken(originalJwt, { header: originalToken.header, payload: originalToken.payload });
                const xsuaaJwt = (await xsuaaService.fetchJwtBearerToken(originalJwt, { zid: originalToken.appTid, ...options })).access_token;
                req.headers.authorization = req.headers.authorization.replace(originalJwt, xsuaaJwt);
                req.originalToken = originalToken;
            }
        } catch (err) {
            if(err instanceof NetworkError) {
                // handle failed token exchange request
            } else {
                // handle other errors in token exchange middleware
            }
        }

        return next();
    };
}

module.exports = iasXsuaaTokenExchange;