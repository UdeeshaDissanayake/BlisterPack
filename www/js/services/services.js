angular.module('homepi.services', ['ngResource'])

.factory('Socket', function($rootScope) {

    var service = {};
    var client = {};
    var isConnected=false;

    service.connect = function(host, port, orgId,deviceType,deviceId, password) {

        console.log("Try to connect to MQTT Broker " + host );
        clientId = "d:"+orgId+":"+deviceType+":"+deviceId;


       // client =mqttws31.Client(orgId+".messaging.internetofthings.ibmcloud.com", 1883, clientId);
        /*creating mqtt client for creating connection*/
       client=mqtt.createClient(1883,orgId+".messaging.internetofthings.ibmcloud.com",  {
           "clientId" : clientId,
           "keepalive" : 30,
           "username" : "use-token-auth",
           "password" : password
       });
        //if disconnect the connection
        client.on('disconnect', function () {
            isConnected=false;
            console.log('DisConnected');
        });
        //if connected
        client.on('connect', function () {
            isConnected=true;
            console.log('Connected');
        });
        //if there are errors
        client.on('error', function(err) {
            console.log('error!', err);
            client.stream.end();
        });

        client.on('message', function (topic, message) {
            service.callback(topic,message);
        });
    }
   //publishing mqtt messages
    service.publish = function(topic, payload) {
        client.publish(topic,payload, {retain: true});
        console.log('publish-Event sent '+ payload + ' with topic: ' + topic + ' ' + client);
    }
    //disconnecting
    service.disconnect=function(){
        client.end(true);
    }

    //check wheter connect or not
    service.isConnected = function() {
        console.log(isConnected);
        return isConnected;
    }
    /*
    service.connect = function(host, port, user, password) {
        var options = {
          username: user,
          password: password
        };
        console.log("Try to connect to MQTT Broker " + host + " with user " + user);
        client = mqtt.createClient(parseInt(port),host,options);


        client.subscribe(user+"/#"); 

        client.on('error', function(err) {
            console.log('error!', err);
            client.stream.end();
        });

        client.on('message', function (topic, message) {
          service.callback(topic,message);
        });
    }

    service.publish = function(topic, payload) {
        client.publish(topic,payload, {retain: true});
        console.log('publish-Event sent '+ payload + ' with topic: ' + topic + ' ' + client);
    }
    */
    service.onMessage = function(callback) {
        service.callback = callback;
    }


    return service;
});
