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
        it('testing the models comments end point', function(done){

            chai.request(server)
            .get('/models/comments')
            .end(function(err,res){
            expect(200);
            done(); 
            })
            })
            it('testing the models contact end point', function(done){

                chai.request(server)
                .get('/models/contact')
                .end(function(err,res){
                expect(200);
                done(); 
                })
                })
                it('testing the models postcode end point', function(done){

                    chai.request(server)
                    .get('/models/Postcode')
                    .end(function(err,res){
                    expect(200);
                    done(); 
                    })
                    })
                    it('testing the models posts end point', function(done){

                        chai.request(server)
                        .get('/models/posts')
                        .end(function(err,res){
                        expect(200);
                        done(); 
                        })
                        })
                        it('testing the models swaps end point', function(done){

                            chai.request(server)
                            .get('/models/swaps')
                            .end(function(err,res){
                            expect(200);
                            done(); 
                            })
                            })
                            it('testing the models user end point', function(done){

                                chai.request(server)
                                .get('/models/user')
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
                                                    it('testing the public css end point', function(done){

                                                            chai.request(server)
                                                            .get('/public/css')
                                                            .end(function(err,res){
                                                            expect(200);
                                                            done(); 
                                                            })
                                                            })
                                                            it('testing the public images end point', function(done){

                                                                    chai.request(server)
                                                                    .get('/public/images')
                                                                    .end(function(err,res){
                                                                    expect(200);
                                                                    done(); 
                                                                    })
                                                                    })
                                                                    it('testing the public js end point', function(done){

                                                                            chai.request(server)
                                                                            .get('/public/js')
                                                                            .end(function(err,res){
                                                                            expect(200);
                                                                            done(); 
                                                                            })
                                                                            }) 
                                                                            
                   
    })