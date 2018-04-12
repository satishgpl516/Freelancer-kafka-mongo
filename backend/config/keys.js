module.exports = {
   googleAuth: {
       googleClientID: '354763745073-kjq4ijg27lndk18ip8c7hhkpmcv3lqp7.apps.googleusercontent.com',
       googleClientSecret: 'CVH8eikrS1Wa6JUa_EtMMMfF',
       // mongoURI : 'mongodb+srv://satishkumar:satish123@freelancer-aijjq.mongodb.net/freelancer'
       // 'mongodb://satishkumar:satish123@freelancer-shard-00-00-aijjq.mongodb.net:27017,' +
       // 'freelancer-shard-00-01-aijjq.mongodb.net:27017,' +
       // 'freelancer-shard-00-02-aijjq.mongodb.net:27017/freelancer' +
       // '?ssl=true&replicaSet=freelancer-shard-0&authSource=admin'
      // mongoURI : 'mongodb://localhost/freelancer'
       mongoURI :   'mongodb://test:pass@ds014388.mlab.com:14388/freelancer'
   },
    facebookAuth: {
        clientID: '1925142617796864',
        clientSecret: 'bf966658e5b17887eafcab6ad3eec662',
        callbackURL: 'http://localhost:3000/users/auth/facebook/callback',
    }

}