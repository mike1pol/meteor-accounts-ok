OK = {};

OK.requestCredential = function (options, credentialRequestCompleteCallback) {

    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'ok'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
        return;
    }

    var credentialToken = Random.id();
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    var display = mobile ? 'm' : 'w';
    var scope = '';

    if (config.scope) {
        scope = config.scope;
        if (options && options.requestPermissions) {
            scope = scope + ';';
        }
    }

    if (options && options.requestPermissions) {
        scope = scope + options.requestPermissions.join(';');
    }

    var loginUrl =
        'http://www.odnoklassniki.ru/oauth/authorize' +
            '?client_id=' + config.appId +
            '&scope='     + scope +
            '&redirect_uri=' + Meteor.absoluteUrl('_oauth/ok?close=close') +
            '&response_type=code' +
            '&layout=' + display +
            '&state=' + credentialToken;
    Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback);
};
