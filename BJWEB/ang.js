var app = angular.module('app', ['ui.router', 'schemaForm']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'home.html',
        controller: 'homeController'
    }).state('register', {
        url: '/register',
        templateUrl: 'register.html',
        controller: 'registerController'
    }).state('login', {
        url: '/login',
        templateUrl: 'login.html'
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});

app.controller('homeController', function ($scope) {
    $scope.visible = false;
    $scope.show = function () {
        if ($scope.visible) {
            $scope.visible = false;
        } else {
            $scope.visible = true;
        }
    }

}).controller('registerController', function ($scope) {
    $scope.registerSchema = {
        "type": "object",
        "title": "Register",
        "properties": {
            "username": {
                "title": "Username",
                "type": "string"
            },
            "password": {
                "title": "Password",
                "type": "password"
            },
            "name": {
                "title": "Name",
                "type": "string",
                "pattern": "\S.*\s\S.*"
            },
            "email": {
                "title": "Email",
                "type": "string",
                "pattern": "^\\S+@\\S+.com+$"
            },
            "country": {
                "title": "Country",
                "type": ""
            }

        }
    };
    $scope.registerForm = [
        "username",
        "password",
        "name",
        "email",
        "country",
        {
            type: "submit",
            title: "Submit"
        }
    ];

    $scope.model = [];

}).controller('loginController', function ($scope) {

});

