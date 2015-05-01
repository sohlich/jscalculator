'use strict';

angular.module('myApp.calculator', ['ngRoute'])
        .controller('CalculatorController', ['$scope', '$log', function ($scope, $log) {

                $log.info("Initializing CalculatorController");

                $scope.history = [];
                $scope.operationSign = true;
                $scope.lastNumber = new BigDecimal('0');
                $scope.lastOpeartion = '+';
                $scope.currentInput = "";



                /**
                 *  Operation button listener
                 * @param {type} operation
                 * @returns {undefined}
                 */
                $scope.operationClicked = function (operation) {
                    $log.info("Operation button click op: " + operation.toString());


                    //Block multiple operation on same number
                    if (!$scope.operationSign || $scope.lastOpeartion === '=') {
                        //Append number to history
                        $scope.history.push($scope.currentInput);

                        $log.info("Executing last operation: " + $scope.lastOpeartion.toString());

                        var curNumber = new BigDecimal($scope.currentInput);

                        //Execute last operation  
                        switch ($scope.lastOpeartion) {
                            case '+':
                                $scope.lastNumber = $scope.lastNumber.add(curNumber);
                                break;
                            case '-':
                                $scope.lastNumber = $scope.lastNumber.subtract(curNumber);
                                break;
                            case 'x':
                                $scope.lastNumber = $scope.lastNumber.multiply(curNumber);
                                break;
                            case '÷':
                                //Covers division by zero
                                if (curNumber.equals(BigDecimal.ZERO)) {
                                    $scope.currentInput = 'ERROR';
                                    $scope.lastOpeartion = '=';
                                    $scope.lastNumber = 0;
                                    $scope.operationSign = true;
                                    return;
                                } else {
                                    //Bypas decimal library bug
                                    $scope.lastNumber = $scope.lastNumber.multiply(new BigDecimal('1000'))
                                            .divide(curNumber)
                                            .multiply(new BigDecimal('0.001'));
                                }
                                break;
                            case '=':
                                $scope.history = [$scope.lastNumber.toString()];
                                break;
                        }
                    }

                    $scope.currentInput = $scope.lastNumber.toString();
                    $scope.lastOpeartion = operation;
                    $scope.operationSign = true;
                };


                /**
                 * Number button listener 
                 * @param {type} number clicked
                 */
                $scope.numberClicked = function (number) {
                    $log.info("Number button click number: " + number.toString());

                    //First number after operation pushed
                    if ($scope.operationSign) {
                        $log.info("Entering section after operation pushed");


                        $scope.currentInput = number.toString();
                        $scope.operationSign = false;

                        if ($scope.history.length > 0 && $scope.lastOpeartion !== '=') {
                            //Covers the initial state
                            $log.info("Initial state");
                            $scope.history.push($scope.lastOpeartion);
                        } else if ($scope.lastOpeartion === '=') {
                            $log.info("Last operation was '='");
                            //Covers state when last operation equals, 
                            //but no operation pushed to do something with last result
                            $scope.lastNumber = new BigDecimal('0');
                            $scope.lastOpeartion = '+';
                            $scope.history = [];
                        }
                    } else {
                        $log.info("Adding aditional numbers");
                        
                        //Cosmetics
                        if ( (number === '0' || number === '00') && $scope.currentInput === '0') return;
                        
                        //Other numbers
                        $scope.currentInput = $scope.currentInput + number.toString();
                    }
                };

                /**
                 * Adding decimal point to number
                 */
                $scope.dotClicked = function () {
                    $log.info("Dot clicked");

                    $scope.currentInput = $scope.currentInput.indexOf('.') > -1 ? $scope.currentInput : $scope.currentInput + '.';
                };

                /**
                 * Removes last number from input
                 */
                $scope.removeClicked = function () {
                    $log.info("Remove clicked");
                    $scope.currentInput = $scope.currentInput.slice(0, $scope.currentInput.length - 1);
                };
                
                
                /**
                 * Removes last number from input
                 */
                $scope.isButtonDisabled = function (name) {
                    $log.info("IsButtonDisabled called");
                    var result = false;
                    
                    if($scope.currentInput === "ERROR") result = true;
                    
                    return result;
                };



                /**
                 * Reset all values to initial state
                 */
                $scope.resetClicked = function () {
                    $log.info("Remove clicked");

                    $scope.operationSign = true;
                    $scope.lastNumber = new BigDecimal('0');
                    $scope.lastOpeartion = '+';
                    $scope.currentInput = "";
                    $scope.history = [];
                };

            }]);