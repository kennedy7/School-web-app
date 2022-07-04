var { expect } = require('chai');
let chai = require ('chai');
let chaiHttp = require ('chai-http');
let app = require ('../app')
var request = require('supertest');
chai.use(chaiHttp);

const userCredentials = {
    email: 'chibe@gmail.com',   
    password: 'kennedy'
}


//login the user before we run any tests
const authenticatedUser = request.agent(app);

before((done)=> {
        authenticatedUser
        .post('/login')
        .send(userCredentials)
        .end(function(err, response){
            console.log(response.statusCode)
            expect(response.statusCode).to.equal(302);
            expect('Location', '/admin/dashboard');
            done();  
    }); 
 });   
      

describe('GET /admin/dashboard', function () {
    //if the user is logged in, should get a 200 status code
    it('should return (admin page) a 200 response if the user is logged in', function (done) {
        authenticatedUser.get('/admin/dashboard')
            // .expect(200, done);
            .end(function(err, response){
                response.should.have.status(200);
                done()
            })
    });

    //if the user is not logged in, it should get a 302 response code and be directed to the /login page
    it('should (not return admin page) return a 302 response and redirect to /login', function (done) {
        request(app).get('/admin/dashboard')
            .expect('Location', '/login')
            .end(function(err, response){
                response.should.have.status(302);
              done()
            })
    });
});


//Assertion style
chai.should();


describe('user API', () => {
    /**
     * Test the GET route
     */
    describe("GET /login", () => {
        it("it should get the login page", (done) => {
           request(app)
                .get('/login')
                .end((err, response) => {
                    response.should.have.status(200);
                    done()
                });
        });
        it("should not get the login page", (done) => {
            request(app)
                .get('/loginn')
                .end((err, response) => {
                    response.should.have.status(404);
                    done()
                });
        });
    });


})

describe("GET /users/projectlist", function(){
    it("it should get all projects", (done)=>{
       authenticatedUser.get('/users/projectlist')
            .end(function(err, response){
                response.should.have.status(200);
                done()
            })
    })

    //if the user is not logged in, it should get a 302 response code and be directed to the /login page
    it('should (not return list) return a 302 response and redirect to /login', (done)=>{
        request(app)
           .get('/users/projectlist')
           .expect('Location', '/login')
           .end((err, response) => {
                response.should.have.status(302);
                done();
            });
    });
});
