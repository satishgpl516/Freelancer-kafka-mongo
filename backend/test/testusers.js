var chai = require('chai');
var expect = require('chai').expect;
var should = chai.should();
var supertest = require('supertest');
var api = supertest("http://localhost:5000");


describe('signup',function(){
    it('should enable users to create new account',function(done){
      api.post('/users/signup')
          .set('Accept','application/json')
          .set('Content-Type','application/json')
          .send({
              username: 'kevin',
              email: "kevin@gmail.com",
              password: 'kevin'
          })
          .expect(201)
          .end(function(err,res){
          expect(res.body.message).to.equal("User Details Saved successfully");
          done();
        });
    });

});

describe('login',function(){
    it('should enable users to login to existing account',function(done){
        api.post('/users/login')
            .set('Accept','application/json')
            .set('Content-Type','application/json')
            .send({
                username: 'kevin',
                password: 'kevin'
            })
            .expect(201)
            .end(function(err,res){
                expect(res.body.username).to.equal("kevin");
                done();
            });
    });

});



describe('updateuser',function(){
    it('should help the users to update their profile details',function(done){
        api.post('/users/updateUserProfile')
            .set('Accept','application/json')
            .set('Content-Type','application/json')
            .send({
                firstname: 'kevin',
                lastname: 'patao',
                mobile: '6697723124',
                skills: 'nodejs, react, fullstack'
            })
            .expect(201)
            .end(function(err,res){
                expect(res.body.message).to.equal("update query successful");
                done();
            });
    });

});

describe('getprojects',function(){
    it('should show users list of projects available',function(done){
        api.get('/users/getprojects')
            .set('Accept','application/json')
            .expect(201)
            .end(function(err,res){
                expect(res.body.projects[0].projectname).to.equal("projectnamenew");
                done();
            });
    });

});

describe('logout',function(){
    it('should enable users to logout from existing account',function(done){
        api.post('/users/logout')
            .set('Accept','application/json')
            .set('Content-Type','application/json')
            .send()
            .expect(201)
            .end(function(err,res){
                expect(res.body.status).to.equal("Success");
                done();
            });
    });

});







