var app = angular.module('app', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'homeController'
    }).state('register', {
        url: '/register',
        templateUrl: 'partials/register.html',
        controller: 'registerController'
    }).state('login', {
        url: '/login',
        templateUrl: 'partials/login.html'
    }).state('terms', {
        url: '/terms',
        templateUrl: 'partials/terms.html'
    }).state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile.html'
    }).state('play', {
        url: '/play',
        templateUrl: 'partials/play.html'
    });

    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });

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
    $scope.codeClicked = false;
    $scope.clickCode = function() {
        $scope.codeClicked = true;
    }

}).controller('loginController', function ($scope) {

});

