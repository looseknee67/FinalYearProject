var chai = require ('chai')
var chaiHttp = require('chai-http')
var server = ('../server.js')
var expect = require('chai').expect;

chai.use(chaiHttp)

describe('Tests', function(){

it('testing the server end point', function(done){

    chai.request(server)
    .get('/')
    .end(function(err,res){
    expect(200);
    done(); 
    })
    })
    it('testing the models end point', function(done){

        chai.request(server)
        .get('/models')
        .end(function(err,res){
        expect(200);
        done(); 
        })
        })

        it('testing the posts end point', function(done){

            chai.request(server)
            .get('/posts')
            .end(function(err,res){
            expect(200);
            done(); 
            })
             }) 

             it('testing the swaps end point', function(done){

                chai.request(server)
                .get('/swaps')
                .end(function(err,res){
                expect(200);
                done(); 
                 })
                }) 

                it('testing the routes end point', function(done){

                    chai.request(server)
                    .get('/routes')
                    .end(function(err,res){
                     expect(200);
                    done(); 
                    })
                    }) 

                    it('testing the views end point', function(done){

                        chai.request(server)
                        .get('/views')
                        .end(function(err,res){
                        expect(200);
                        done(); 
                        })
                        })

                        it('testing the public end point', function(done){

                            chai.request(server)
                            .get('/public')
                            .end(function(err,res){
                            expect(200);
                            done(); 
                            })
                            }) 

                            it('testing the utils end point', function(done){

                                chai.request(server)
                                .get('/utils')
                                .end(function(err,res){
                                expect(200);
                                done(); 
                                })
                                }) 
                   
    })