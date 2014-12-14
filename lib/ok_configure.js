Template.configureLoginServiceDialogForOk.siteUrl = function () {
    return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForOk.fields = function () {
    return [
        {property: 'appId',  label: 'App Id'},
        {property: 'secret', label: 'App Secret'},
        {property: 'public', label: 'App Public'}
    ];
};