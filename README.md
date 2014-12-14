meteor-accounts-ok
==================

Login service for Odnoklassniki.ru accounts (https://ok.ru).

Usage
-----

1. Add the package to your project using meteorite:
```sh
$ meteor add mikepol:accounts-ok
```

2. Configure Ok login service. You can do mannually or using GUI.

    **Manually**: Just add next code to your config file.
    ```js
        if (Meteor.isServer) {
            ServiceConfiguration.configurations.remove({
                service: 'ok'
            });

            ServiceConfiguration.configurations.insert({
                service: 'ok',
                appId:   '1234567',       // Your app id
                secret:  'someappsecret', // Your app secret
                public:  'someapppublic', // Your app public code
                scope:   'scopes'         // Scopes split by ";"
            });
        }
    ```

    **GUI**: 
    * Add `accounts-ui` package to your project:

        ```sh
        $ meteor add accounts-ui
        ```
    * Set `{{> loginButtons}}` into your template
    * Go to your browser, open page with `{{> loginButtons}}`
    * Click on "configure Ok login" button
    * Fill "App Id", "App Secret" and "App Public" fields in popup window following by instructions

3. Use `Meteor.loginWithOk(options, callback)` for user authentication (you can omit `options` argument).

4. For customization of new user creation you must set 'createUser' event handler:
```js
    if (Meteor.isServer) {
        Accounts.onCreateUser(function(options, user) {
            user.custom_field = "custom value";
            // ...
            return user;
        });
    }
```

Dependencies
------------

1. **accounts-base**
2. **accounts-oauth**
3. **jparker:crypto-md5**
4. **accounts-ui** (if you want to use GUI)
