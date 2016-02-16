/**
 * Created by usdissanayake on 2/16/2016.
 */
'use strict';
angular.module('homepi.loginController', [])

    .controller('LoginCtrl', function($state, $scope, $rootScope, $http , $ionicPopup, Socket,$filter) {

        //making loader
        $scope.setLoading = function(loading) {
            $scope.isLoading = loading;
        }

        $scope.layoutDone = function() {
            $scope.setLoading(false);
            $timeout(function() { $('a[data-toggle="tooltip"]').tooltip(); }, 0); // wait...
        }
        $scope.loginData = {};
        //var client1 = new Paho.MQTT.Client(".messaging.internetofthings.ibmcloud.com", 1883, "fdsf");
        $scope.showAlert = function() {
            $ionicPopup.alert({
                title: 'Error',
                content: 'User and/or password wrong!'
            }).then(function(res) {
                console.log('Alert showed...');
            });
        };

        $scope.tryLogin = function() {
            console.log('Try to log in ' + $scope.loginData.user);
            var date=Date.now();
            var time=$filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss Z');
            console.log(time);
            //check if username and passwors is not null
            if($scope.loginData.user && $scope.loginData.password ){
                console.log("in  in");
                //window.localStorage.setItem('host',$scope.loginData.host);
                //window.localStorage.setItem('port',$scope.loginData.port);
                var host ='6x53kd.internetofthings.ibmcloud.com'; //window.localStorage['host'];
                window.localStorage.setItem('host',host);
                var port ='1883';//window.localStorage['port'];
                window.localStorage.setItem('port',port);
                var orgId='6x53kd',deviceType='',deviceId='', password='';
                window.localStorage.setItem('orgId',orgId);
                var result,result2;
                var token;
                var patientId;
                window.localStorage.setItem('user',$scope.loginData.user);
                window.localStorage.setItem('password',$scope.loginData.password);
                //Socket.connect($scope.loginData.host,$scope.loginData.port,$scope.loginData.user,$scope.loginData.password);

                //$state.go('devices');

                //   console.log('Successfully Connected ' + $scope.loginData.user);
                $scope.setLoading(true);
                var loginRequest = {
                    method: 'POST',
                    url: 'https://hector-api-services-dev.mybluemix.net/api/auth',
                    headers: {
                        'Authorization': 'Basic aGVjdG9yUG9ydGFsOns0YWI4NDQwZC01YjVmLTQyZTktYTY4Ni0xNjM4ODYwZDA5ZDR9',
                        'x-app-id': 'hectorPortal',
                    },
                    data: { 'email':$scope.loginData.user,'password':$scope.loginData.password,'usertype':'patient'
                    }
                }

                $http(loginRequest).then(function(successResponse){
                    //go to next page

                    console.log('Successfully logged in ' + $scope.loginData.user);
                    // alert(successResponse);
                    result = angular.fromJson(successResponse.data);
                    console.log(successResponse);
                    token=result.token;
                    patientId=result.patientId;

                    window.localStorage.setItem('token',result.token);
                    window.localStorage.setItem('patientId',result.patientId);
                    /*Getting device details*/
                    $http.get('https://hector-api-services-dev.mybluemix.net/api/patients/'+window.localStorage['patientId']+'/devices',
                        {
                            headers: {
                                'Authorization': 'Basic aGVjdG9yUG9ydGFsOns0YWI4NDQwZC01YjVmLTQyZTktYTY4Ni0xNjM4ODYwZDA5ZDR9',
                                'x-user-token':token,
                                'x-app-id': 'hectorPortal',

                            }
                        }
                        )
                        .then(function(response) {

                            console.log(response);
                            result2 = angular.fromJson(response.data);
                            var i;
                            $scope.setLoading(false);
                            console.log(result2.devices.length);
                            for(i=0;i<result2.devices.length;i++){
                                console.log(result2.devices[i].type+' type'+i);
                                if(result2.devices[i].type==='smart-connector'){
                                    console.log(result2.devices[i].type);
                                    break;
                                }

                            }
                            if(result2.devices[i].type==='smart-connector'){
                                console.log(i+' device num');
                                window.localStorage.setItem('deviceType',result2.devices[i].type);
                                window.localStorage.setItem('deviceID',result2.devices[i].deviceId);
                                window.localStorage.setItem('password',result2.devices[i].mqttConfig.securityToken);

                                deviceType=window.localStorage['deviceType'];
                                deviceId=window.localStorage['deviceID'];
                                password=window.localStorage['password'];
                                console.log(deviceId);
                                console.log(deviceType);
                                console.log(orgId);
                                Socket.connect(host,port,orgId,deviceType,deviceId,password);

                                if(Socket.isConnected()){
                                    $state.go('devices');
                                }else{
                                    alert('Connection Error');
                                    $state.go('login');
                                }

                                // $state.go('devices');
                            }else{
                                alert('No device has been Assigned to User');
                                $state.go('login');
                            }

                            console.log(response);
                        }, function(x) {
                            $scope.setLoading(false);
                            console.log(x);
                        });
                    console.log('kkkkkk');

                    //redirect




                }, function(res){
                    //show error message
                    $scope.setLoading(false);
                    alert("Authentication Error :" );
                    console.log(res);
                    //console.res(res);
                });
                ///

                console.log('kkkkkk');
                /*
                 var deviceRequest = {
                 method: 'GET',
                 url: 'https://hector-api-services-dev.mybluemix.net/api/patient/X0001/devices',
                 headers: {
                 'Authorization': 'Basic aGVjdG9yUG9ydGFsOns0YWI4NDQwZC01YjVmLTQyZTktYTY4Ni0xNjM4ODYwZDA5ZDR9',
                 'x-user-token':window.localStorage['token'],
                 'x-app-id': 'hectorPortal',
                 'patientId':window.localStorage['patientId'],
                 },
                 isArray: false

                 }

                 $http(deviceRequest).then(function(successResponse){
                 //go to next page
                 alert(successResponse);
                 console.log('GET success');
                 console.log(successResponse);
                 //console.res(successResponse);

                 //redirect
                 $state.go('devices');



                 }, function(res){
                 //show error message
                 alert("Authentification Error" + res);
                 console.log(res);
                 //console.res(res);
                 });

                 */
            }else {
                $scope.showAlert();
            }

        };

        $scope.logout = function() {
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
            Socket.disconnect();
            $state.go('login');
        };
    });
