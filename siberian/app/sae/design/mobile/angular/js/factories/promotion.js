
App.factory('Promotion', function($rootScope, $http, httpCache, Url, CACHE_EVENTS, Customer) {

    var factory = {};

    factory.value_id = null;

    factory.findAll = function() {

        if(!this.value_id) return;

        return $http({
            method: 'GET',
            url: Url.get("promotion/mobile_list/findall", {value_id: this.value_id}),
            cache: !$rootScope.isOverview,
            responseType:'json'
        }).success(function() {

            var url =  Url.get("promotion/mobile_list/findall", {value_id: factory.value_id});

            Customer.onStatusChange("promotion", [url]);

            $rootScope.$on(CACHE_EVENTS.clearDiscount, function() {
                httpCache.remove(url);
            });
        });
    };

    factory.find = function(promotion_id) {

        if(!this.value_id) return;
        console.log(promotion_id);
        return $http({
            method: 'GET',
            url: Url.get("promotion/mobile_view/find", {value_id: this.value_id, promotion_id: promotion_id}),
            cache: !$rootScope.isOverview,
            responseType:'json'
        });
    };

    factory.use = function(promotion_id) {

        if(!this.value_id) return;

        var data = {
            promotion_id: promotion_id
        }
        var url = Url.get("promotion/mobile_list/use", {value_id: this.value_id});

        return $http.post(url, data);
    };

    factory.unlockByQRCode = function(qrcode) {

        var url = Url.get("promotion/mobile_list/unlockByQRCode");
        var data = {
            qrcode: qrcode,
            value_id: this.value_id
        };

        return $http.post(url, data);
    };

    return factory;
});
