'use strict';

angular.module('homepi.controllers', [])

.controller('AppCtrl', function($scope) {
  // Main app controller, empty for the example
})

.controller('DeviceListCtrl', function($scope,$filter,$timeout, $state, $http , $rootScope, Socket) {
    $scope.started = false;$scope.started1 = false;$scope.started2 = false;$scope.started3 = false;$scope.started4 = false;$scope.started5 = false;
    $scope.started6 = false;$scope.started7 = false;$scope.started8 = false;$scope.started9 = false;$scope.started10 = false;$scope.started11 = false;
    $scope.started12 = false;$scope.started13 = false;$scope.started14 = false;$scope.started15 = false;$scope.started16 = false;$scope.started17 = false;
    $scope.started18 = false;$scope.started19 = false;$scope.started20 = false;$scope.started21 = false;$scope.started22 = false;$scope.started23 = false;
    $scope.started24 = false;$scope.started25 = false;$scope.started26 = false;$scope.started27 = false;
    $scope.setLoading = function(loading) {
        $scope.isLoading = loading;
    }

    $scope.layoutDone = function() {
        $scope.setLoading(false);
        $timeout(function() { $('a[data-toggle="tooltip"]').tooltip(); }, 0); // wait...
    }
 // $scope.devices = {};
  var topic='iot-2/evt/blister-health/fmt/json';
    $scope.medications={};
    /*log out from app and disconnecting IBM iotf connection*/
    $scope.logout = function() {
        $state.go('login');
        Socket.disconnect();
        var logoutRequest = {
            method: 'POST',
            url: 'https://hector-api-services-dev.mybluemix.net/api/auth/logout',
            headers: {
                'Authorization': 'Basic aGVjdG9yUG9ydGFsOns0YWI4NDQwZC01YjVmLTQyZTktYTY4Ni0xNjM4ODYwZDA5ZDR9',
                'x-user-token':window.localStorage['token'],
                'x-app-id': 'hectorPortal',
            }

        }
        $http(logoutRequest).then(function(successResponse){
            console.log('log out');
        }, function(res){
            //show error message
            alert("Error" + res);
            console.log(res);
            //console.res(res);
        });
        console.log('Successfully logged out ' + window.localStorage['user']);
        window.localStorage.clear();


    };
  
/*
  $scope.logout = function() {
    console.log("logout");
    console.log('Successfully logged out ' + window.localStorage['user']);
    window.localStorage.clear();
    $state.go('login');
  };*/
  var communicatorId='1';
  var messageId='1';
  var fsblId='1';
  var messageType='2';
    var result1;
    $scope.setLoading(true);//making loader
    /*getting medication schedule from API*/
    $http.get('https://hector-api-services-dev.mybluemix.net/api/patients/'+window.localStorage['patientId']+'/adherence',
        {
            headers: {
                'Authorization': 'Basic aGVjdG9yUG9ydGFsOns0YWI4NDQwZC01YjVmLTQyZTktYTY4Ni0xNjM4ODYwZDA5ZDR9',
                'x-user-token':window.localStorage['token'],
                'x-app-id': 'hectorPortal',

            }
        }
        )
        .then(function(response) {
            console.log(response);
            result1=angular.fromJson(response.data);
            console.log(result1.adherence.length);
            $scope.setLoading(false);//finishing loader
        }, function(x) {
            console.log(x);
            $scope.setLoading(false);//finishing loader
        });

   // result1=window.localStorage['result1'];
   //$scope.medications=result1.adherence[0].dailyAdherence[0].medications;
    //each button send mqtt message once after touch
  $scope.myFunction1=function(){
    if($scope.started==false){
        console.log("publish");
        var date=Date.now();
        var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
        var slot='1';
        var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
        Socket.publish(topic ,payload);
        $scope.medications=result1.adherence[0].dailyAdherence[0].medications;//get medication for each slot
    }
      $scope.started = true;//change button color
  };
    $scope.myFunction2=function(){
       if($scope.started1 ==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='2';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications={'piriton':'1','zetercine':1};
           $scope.medications=result1.adherence[0].dailyAdherence[1].medications;
       }
        $scope.started1 = true;
  };
    $scope.myFunction3=function(){
       if($scope.started2==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='3';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications={'piriton':'2','zetercine':1};
           $scope.medications=result1.adherence[0].dailyAdherence[2].medications;
       }
        $scope.started2 = true;
  };
    $scope.myFunction4=function(){
       if($scope.started3==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='4';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[0].dailyAdherence[3].medications;
       }
        $scope.started3 = true;
  };
    $scope.myFunction5=function(){
      if($scope.started4 ==false){
          var date=Date.now();
          var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
          var slot='5';
          var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
          Socket.publish(topic ,payload);
          $scope.medications=result1.adherence[1].dailyAdherence[0].medications;
      }
        $scope.started4 = true;
  };

    $scope.myFunction6=function(){
      if($scope.started5==false){
          var date=Date.now();
          var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
          var slot='6';
          var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
          Socket.publish(topic ,payload);
          $scope.medications=result1.adherence[1].dailyAdherence[1].medications;
      }

        $scope.started5 = true;
  };
    $scope.myFunction7=function(){
       if($scope.started6==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='7';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[1].dailyAdherence[2].medications;
       }
        $scope.started6 = true;
  };
    $scope.myFunction8=function(){
      if($scope.started7==false){
          var date=Date.now();
          var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
          var slot='8';
          var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
          Socket.publish(topic ,payload);
          $scope.medications=result1.adherence[1].dailyAdherence[3].medications;
      }
        $scope.started7 = true;
  };
    $scope.myFunction9=function(){
      if($scope.started8==false){
          var date=Date.now();
          var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
          var slot='9';
          var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
          Socket.publish(topic ,payload);
          $scope.medications=result1.adherence[2].dailyAdherence[0].medications;
      }
        $scope.started8 = true;
  };
    $scope.myFunction10=function(){
       if($scope.started9==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='10';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[2].dailyAdherence[1].medications;
       }
        $scope.started9 = true;
  };
    $scope.myFunction11=function(){
      if($scope.started10==false){
          var date=Date.now();
          var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
          var slot='11';
          var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
          Socket.publish(topic ,payload);
          $scope.medications=result1.adherence[2].dailyAdherence[2].medications;
      }
        $scope.started10 = true;
  };
    $scope.myFunction12=function(){
       if($scope.started11==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='12';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[2].dailyAdherence[3].medications;
       }
        $scope.started11 = true;
  };
    $scope.myFunction13=function(){
      if($scope.started12==false){
          var date=Date.now();
          var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
          var slot='13';
          var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
          Socket.publish(topic ,payload);
          $scope.medications=result1.adherence[3].dailyAdherence[0].medications;
      }
        $scope.started12 = true;
  };
    $scope.myFunction14=function(){
       if($scope.started13==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='14';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[3].dailyAdherence[1].medications;
       }
        $scope.started13 = true;
  };
    $scope.myFunction15=function(){
      if($scope.started14==false){
          var date=Date.now();
          var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
          var slot='15';
          var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
          Socket.publish(topic ,payload);
          $scope.medications=result1.adherence[3].dailyAdherence[2].medications;
      }
        $scope.started14 = true;
  };
    $scope.myFunction16=function(){
       if($scope.started15==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='16';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[3].dailyAdherence[3].medications;
       }
        $scope.started15 = true;
  };
    $scope.myFunction17=function(){
       if($scope.started16==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='17';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[4].dailyAdherence[0].medications;
       }
        $scope.started16 = true;
  };
    $scope.myFunction18=function(){
       if($scope.started17==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='18';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[4].dailyAdherence[1].medications;
       }
        $scope.started17 = true;
  };
    $scope.myFunction19=function(){
       if($scope.started18==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='19';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[4].dailyAdherence[2].medications;
       }
        $scope.started18 = true;
  };
    $scope.myFunction20=function(){
       if($scope.started19==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='20';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[4].dailyAdherence[3].medications;
       }
        $scope.started19 = true;
  };
    $scope.myFunction21=function(){
      if($scope.started20==false){
          var date=Date.now();
          var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
          var slot='21';
          var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
          Socket.publish(topic ,payload);
          $scope.medications=result1.adherence[5].dailyAdherence[0].medications;
      }
        $scope.started20 = true;
  };
    $scope.myFunction22=function(){
      if($scope.started21==false){
          var date=Date.now();
          var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
          var slot='22';
          var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
          Socket.publish(topic ,payload);
          $scope.medications=result1.adherence[5].dailyAdherence[1].medications;
      }
        $scope.started21 = true;
  };
    $scope.myFunction23=function(){
       if($scope.started22==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='23';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[5].dailyAdherence[2].medications;
       }
        $scope.started22 = true;
  };
    $scope.myFunction24=function(){
      if( $scope.started23==false){
          var date=Date.now();
          var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
          var slot='24';
          var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
          Socket.publish(topic ,payload);
          $scope.medications=result1.adherence[5].dailyAdherence[3].medications;
      }
        $scope.started23 = true;
  };
    $scope.myFunction25=function(){
       if($scope.started24==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='25';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[6].dailyAdherence[0].medications;
       }
        $scope.started24 = true;
    };
    $scope.myFunction26=function(){
       if($scope.started25==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='26';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[6].dailyAdherence[1].medications;
       }
        $scope.started25 = true;
  };
    $scope.myFunction27=function(){
       if($scope.started26==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='27';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[6].dailyAdherence[2].medications;
       }
        $scope.started26 = true;
  };
    $scope.myFunction28=function(){
       if($scope.started27==false){
           var date=Date.now();
           var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
           var slot='28';
           var payload = "{\"d\":{\"messageId\":\""+messageId+"\",\"communicatorId\":\""+communicatorId+"\",\"fsblId\":\""+fsblId+"\",\"messageType\":\""+messageType+"\",\"time\":\""+time+"\",\"slotNumber\":\""+slot+"\"}}";
           Socket.publish(topic ,payload);
           $scope.medications=result1.adherence[6].dailyAdherence[3].medications;
       }
        $scope.started27 = true;
  };

/*
  $scope.change = function (device) {
    console.log('changed: ' + device.id + ' value: ' + device.value);
    var payload = device.value;
    if(device.type == 'on_off' && (device.value == true || device.value == false)){
        payload = JSON.stringify(device.value);
    }
    Socket.publish(device.topic + '/set',payload);
  };
*/
  /*
  Socket.onMessage(function(topic, payload) {
    console.log('incoming topic: ' + topic + ' and payload: ' + payload);

    var splitTopic = topic.split("/");
    if(splitTopic[2] == 'config'){
        console.log('Load device configuration from MQTT...' + payload);
        $scope.devices = JSON.parse(payload);
    }
    
    angular.forEach($scope.devices, function(device) {
        //Search for corresponding device and update the value
        if(device.topic == topic){
          var isTrueSet = (payload === 'true');
          var isFalseSet = (payload === 'false');
          if(isTrueSet){
            device.value = true;
          }else if(isFalseSet){
            device.value = false;
          }else{
            device.value = payload;
          }
        }
    });

    $scope.$apply();
  });
*/
});



