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
                username: 'kevin@gmail.com',
                password: 'kevin'
            })
            .expect(201)
            .end(function(err,res){
                expect(res.body.username.username).to.equal("kevin");
                done();
            });
    });

});



describe('updateuser',function(){
    it('should help the users to update their profile details',function(done){
        api.post('/users/userProfile')
            .set('Accept','application/json')
            .set('Content-Type','application/json')
            .send({
                firstname: 'kevin',
                lastname: 'patao',
                mobile: '6697723124',
                skills: ['nodejs, react, fullstack'],
                aboutme: "I am professional web developer"
            })
            .expect(201)
            .end(function(err,res){
                expect(res.body.message).to.equal("profile update failed");
                done();
            });
    });

});




describe('getrelaventprojects',function(){
    it('should show users list of projects available',function(done){
        api.get(`/users/projects?skip=2&take=5`)
            .set('Accept','application/json')
            .expect(201)
            .end(function(err,res){
                expect(res.body.projects.length).to.equal("5");
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
                expect(res.body.message).to.equal("Success");
                done();
            });
    });

});







