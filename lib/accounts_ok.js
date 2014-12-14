Accounts.oauth.registerService('ok');

if (Meteor.isClient) {
    Meteor.loginWithOk = function(options, callback) {
        // support a callback without options
        if (! callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        OK.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.ok'],
        forOtherUsers: [
            'services.ok.id',
            'services.ok.nickname',
            'services.ok.gender'
        ]
    });
}
