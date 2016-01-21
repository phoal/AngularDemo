'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
        .service('menuFactory',['$resource', 'baseURL', function($resource,baseURL) {

            this.getDishes = function(){
               return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
            };

            // this.getPromotion not necessary - use getPromotions().get({id:@id})
            // OPTIONAL 'update' NOT necessary for this assignment for promotions
            // since the web page just retrieves this data and does not change it.
            this.getPromotions = function() {
              return $resource(baseURL+"promotions/:id",null);
            };
          }])

        .factory('corporateFactory', ['$resource', 'baseURL',function($resource,baseURL) {

            var corpfac = {};

            // this.getLeader not necessary - use getLeaders().get({id:@id})
            // OPTIONAL 'update' NOT necessary for this assignment for leaders
            // since the web pages just retrieve this info and do not change it.
            corpfac.getLeaders = function() {
              return $resource(baseURL+"leadership/:id",null);
            };

            return corpfac;
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL',function($resource,baseURL) {

            var feedbackfac = {};

            // {'save':{method:'Post' }} already configured in library for $resource -
            // NOT necessary to explicitly configure it.
            // The following is all the configuration necessary to enable 'save'.
            feedbackfac.getFeedback = function() {
              return $resource(baseURL+"feedback/:id",null);
            };

            return feedbackfac;
        }])

;
