angular.module('RegexpTester', ['LocalStorageModule'])
    .controller('MainController', ['$scope', 'localStorageService', function ($scope, localStorageService) {
        $scope.testCases = [];
        localStorageService.bind($scope, 'testCases', $scope.testCases);

        $scope.addTestCase = function () {
            var text = $scope.testCaseText.trim();
            if (text == '') return;
            $scope.testCases.push({text: text, status: ''});
            $scope.testCaseText = '';
            this.testAll();
        };

        $scope.testAll = function () {
            var re = new RegExp($scope.regexp, 'g');

            _.each($scope.testCases, function (testCase) {
                re.lastIndex = 0;
                if (re.test(testCase.text)) {
                    testCase.status = 'success';
                } else {
                    testCase.status = 'fail';
                }
            });
        };
    }]);