OK = {};

Oauth.registerService('ok', 2, null, function(query) {
    var response    = getTokenResponse(query);
    var accessToken = response.accessToken;
    var identity    = getIdentity(accessToken);

    var serviceData = {
        accessToken: accessToken,
        refreshToken: response.refreshToken,
        expiresAt: (+new Date) + (1000 * 30)
    };

    _.extend(serviceData, identity);

    serviceData.id = serviceData.uid;

    delete serviceData.uid;

    return {
        serviceData: serviceData,
        options: {
            profile: {
                name: identity.name
            }
        }
    };
});

// returns an object containing:
// - accessToken
var getTokenResponse = function (query) {
    var config = ServiceConfiguration.configurations.findOne({service: 'ok'});
    if (!config) {
        throw new ServiceConfiguration.ConfigError("Service not configured");
    }

    var responseContent;

    try {
        // Request an access token
        responseContent = HTTP.post(
            "https://api.odnoklassniki.ru/oauth/token.do", {
                params: {
                    client_id:     config.appId,
                    client_secret: config.secret,
                    code:          query.code,
                    redirect_uri:  Meteor.absoluteUrl('_oauth/ok?close=close'),
                    grant_type:    'authorization_code'
                }
            }).content;

    } catch (err) {
        throw _.extend(new Error("Failed to complete OAuth handshake with Ok. " + err.message),
            {response: err.response});
    }
    // Success!  Extract the ok access token and expiration
    // time from the response
    var parsedResponse = JSON.parse(responseContent);


    if (!parsedResponse.access_token) {
        throw new Error("Failed to complete OAuth handshake with Ok " +
            "-- can't find access token in HTTP response. " + responseContent);
    }
    return {
        accessToken: parsedResponse.access_token,
        refreshToken: parsedResponse.refresh_token
    };
};

var getIdentity = function (accessToken) {
    var config = ServiceConfiguration.configurations.findOne({service: 'ok'});
    if (!config) {
        throw new ServiceConfiguration.ConfigError("Service not configured");
    }
    var sig = CryptoJS.MD5('application_key=' + config.public + 'method=users.getCurrentUser' + CryptoJS.MD5(accessToken + config.secret).toString()).toString();

    var result = HTTP.get(
        "http://api.odnoklassniki.ru/fb.do", {params: {
            method: 'users.getCurrentUser',
            access_token: accessToken,
            application_key: config.public,
            sig: sig
        }});

    if (result.error) // if the http response was an error
        throw result.error;
    return result.data;
};

OK.retrieveCredential = function(credentialToken) {
    return Oauth.retrieveCredential(credentialToken);
};
