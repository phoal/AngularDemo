'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            $scope.dishes= menuFactory.getDishes().query(
              function(response) {
                   $scope.dishes = response;
                   $scope.showMenu = true;
               },
               function(response) {
                   $scope.message = "Error: "+response.status + " " + response.statusText;
             });

            $scope.select = function(setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory',
          function($scope, feedbackFactory) {

            $scope.sendFeedback = function() {

                console.log($scope.feedback);

                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    // Use save function of resource to Post feedback to server.
                    feedbackFactory.getFeedback().save($scope.feedback);
                    // Reset the form.
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
          };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

          $scope.showDish = false;
          $scope.message="Loading ...";
          $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id,10)})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.mycomment = {rating:5, comment:"", author:"", date:""};

            $scope.submitComment = function () {

                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);

                $scope.dish.comments.push($scope.mycomment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);

                $scope.commentForm.$setPristine();

                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory',
            function($scope, menuFactory, corporateFactory) {

                  $scope.showDish = false;
                  $scope.message="Loading ...";
                  $scope.showPromotion = false;
                  $scope.msgPromotion="Loading ...";
                  $scope.showLeader = false;
                  $scope.msgLeader="Loading ...";

                  $scope.dish = menuFactory.getDishes().get({id:0})
                  .$promise.then(
                     function(response){
                         $scope.dish = response;
                         $scope.showDish = true;
                     },
                     function(response) {
                         $scope.message = "Error: "+response.status + " " + response.statusText;
                     });

                  // This requests the promotion data from the resource and
                  // updates the home page by attaching it to $scope.promotion
                   $scope.promotion = menuFactory.getPromotions().get({id:0})
                   .$promise.then(
                     function(response) {
                       $scope.promotion = response;
                       $scope.showPromotion = true;
                     },
                     function(response) {
                         $scope.msgPromotion = "Error: "+response.status + " " + response.statusText;
                     }
                   );

                   // This requests the leader data from the resource and
                   // updates the home page by attaching it to $scope.leader
                  $scope.leader = corporateFactory.getLeaders().get({id:3})
                  .$promise.then(
                     function(response){
                         $scope.leader = response;
                         $scope.showLeader = true;
                     },
                     function(response) {
                         $scope.msgLeader = "Error: "+response.status + " " + response.statusText;
                     });

        }])

        .controller('AboutController', ['$scope', 'corporateFactory',
          function($scope, corporateFactory) {

            $scope.showLeaders = false;
            $scope.msgLeaders="Loading ...";

            // This requests the leaders data from the resource and updates
            // the aboutus page by attaching it to $scope.leaders
            $scope.leaders = corporateFactory.getLeaders().query(
              function(response) {
                   $scope.leaders = response;
                   $scope.showLeaders = true;
               },
               function(response) {
                   $scope.msgLeaders = "Error: "+response.status + " " + response.statusText;
             });

        }])

;
