var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function() {
        if (!this.kafkaConsumerConnection) {

            this.client = new kafka.Client('ec2-54-183-18-85.us-west-1.compute.amazonaws.com:2181');
            this.kafkaConsumerConnection = new kafka.Consumer(this.client,[
                { topic: 'login',partition: 0 },
                 { topic: 'signup', partition: 0 },
                { topic: 'updateuser', partition: 0 },
                 { topic: 'postproject', partition: 0 },
                {topic:'getprojects',partition: 0},
                 {topic:'projectdetails',partition: 0},
                {topic:'postedprojects', partition:0},
                { topic: 'postbid', partition: 0 },
                { topic: 'searchprojects', partition: 0 }
                // { topic: 'sharefile', partition: 0 },
                // { topic: 'starfile', partition: 0 },
                // { topic: 'getgroups', partition: 0 },
                // { topic: 'deletegroup', partition: 0 },
                // { topic: 'addgroup', partition: 0 },
                // { topic: 'getmembers', partition: 0 },
                // { topic: 'deletemember', partition: 0 },
                // { topic: 'sharefileingroup', partition: 0 },
                // { topic: 'downloadfile', partition: 0 },
                // { topic: 'addmember', partition: 0 }
                ]);

            this.client.on('ready', function () { console.log('client ready!') })
        }
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function() {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.Client('ec2-54-183-18-85.us-west-1.compute.amazonaws.com:2181');
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log('producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;