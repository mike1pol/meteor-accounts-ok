Package.describe({
    summary: "Login service for Odnoklassniki.ru accounts (https://ok.ru)",
    version: "0.1.0",
    git: "https://github.com/mikepol/meteor-accounts-ok",
    name: "mikepol:accounts-ok"
});

Package.on_use(function(api) {
    api.versionsFrom('METEOR@0.9.0');
    api.use('accounts-base', ['client', 'server']);
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);
    api.imply('accounts-oauth', ['client', 'server']);

    api.use('jparker:crypto-md5@0.1.1', ['server']);

    api.use('oauth2', ['client', 'server']);
    api.use('oauth', ['client', 'server']);
    api.use('http', ['server']);
    api.use('underscore', 'server');
    api.use('random', 'client');
    api.use('service-configuration', ['client', 'server']);
    api.use('templating', 'client');

    api.add_files("lib/accounts_ok.js");
    api.add_files('lib/ok_client.js', 'client');
    api.add_files('lib/ok_server.js', 'server');

    api.export('OK');

    api.add_files(['lib/ok_configure.html', 'lib/ok_configure.js', 'lib/ok_styles.css'], 'client');

});
