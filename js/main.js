angular.module('RegexpTester', ['LocalStorageModule'])
    .controller('MainController', ['$scope', 'localStorageService', function ($scope, localStorageService) {
        var currTestCases = $scope.currTestCases = [];
        localStorageService.bind($scope, 'regexp', $scope.regexp);
        localStorageService.bind($scope, 'currTestCases', $scope.currTestCases);

        $scope.addTestCase = function () {
            var text = $scope.newTestCaseText.trim();
            if (text == '') return;
            currTestCases.push({text: text, status: ''});
            $scope.newTestCaseText = '';
            this.testAll();
        };

        $scope.testAll = function () {
            var re = new RegExp($scope.regexp, 'g');

            _.each(currTestCases, function (testCase) {
                re.lastIndex = 0;
                if (re.test(testCase.text)) {
                    testCase.status = 'success';
                } else {
                    testCase.status = 'fail';
                }
            });
        };

        $scope.onTestCaseChange = function (testCase) {
            if (testCase.text === '') {
                this.removeTestCase(testCase);
            }
        };

        $scope.removeTestCase = function (testCase) {
            currTestCases.splice(currTestCases.indexOf(testCase), 1);
        };
    }]);