/** Home */
angular
    .module('eCommerce')
    .controller('homeController', function ($scope, productService, orderService, auth) {
        console.log("Home View");
        productService.getProduct().then(function (result) {
            console.log(result);
            // we're setting the result that came back from the product service to $scope.products (the ng-repeat)
            $scope.products = result;
        })
        
        //did they already have an open order, how would we check?
        orderService.getUnfinishedOrder(auth.getCurrentUser()).then(function (resultOrder) {
            console.log(resultOrder);
            if (resultOrder.length === 0) {
                orderService.createOrder(auth.getCurrentUser()).then(function (newOrder) {
                    console.log(newOrder)
                    $scope.orderId = newOrder._id;
                    // this holds the new id that came back                    
                })
            } else {
                $scope.orderId = resultOrder[0]._id;
            }
        });
        $scope.addToOrder = function (id) {

        }
    });
       
/** Login */
angular
    .module('eCommerce')
    .controller('loginController', ['$scope', '$state', 'auth', function ($scope, $state, auth) {
        console.log("Login View");
        
        $scope.user = {};
        
        //remove when real
        $scope.user = {
            username: 'phillippuckett88',
            password: 'phillippuckett88'
        }
       
      
        $scope.login = function () {
            auth.login($scope.user).then(function () {
                $state.go('home');
            }).catch(function (err) {
                if (err.status === 401) {
                    alert('Invalid Login');
                } else {
                    console.error(err);
                }
            });
        };
    }]);
    
/** Order */
angular
    .module('eCommerce')
    .controller('orderController', function ($scope, user, auth) {
        console.log('Order View');
        $scope.user = user;  
        // console.log(auth);
        console.log(user);
        auth.getCurrentUser().then(function (result) {
            $scope.user = result.data; // connects data with the orderView
            console.log($scope.user);
        });

    });  
    
/** Product Hunter */
angular
    .module('eCommerce')
    .controller('productHunter', function ($scope, productService) {
        $scope.productSearch = function (productName) {
            console.log(productName);
            productService.searchProduct(productName);
        }
    });

/** Registration */
angular
    .module('eCommerce')
    .controller('registrationController', ['$scope', '$state', '$window', 'auth', function ($scope, $state, $window, auth) {
        console.log('Registration View');
        $scope.user = {};
        console.log($scope.user);
        $scope.register = function () {
            auth.register($scope.user)
                .catch(function (err) {
                    console.error('Registration Error', err);
                    if (err.data.code === 11000) {
                        alert('User May Already Exist');
                    }
                    $scope.error = err;
                })
        };
    }]);