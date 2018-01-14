const jsonServer = require('json-server')
const rawPrivateKey = '278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f'
var TokenSigner = require('jwt-js').TokenSigner
var decodeToken = require('jwt-js').decodeToken
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const isAuthorized = function(req){
	console.log(req.body)
	if(req.body.username === 'mock' && req.body.password === 'mockpass'){
		return true;
	}
	return false;
};

server.use(jsonServer.bodyParser)
server.use(middlewares)
server.post('/login', (req, res) => {
 	if (!isAuthorized(req)) {
   		res.sendStatus(401)	
 	}else{
 		var tokenPayload = {"username" : "mock"}
 		var token = new TokenSigner('ES256K', rawPrivateKey).sign(tokenPayload)
 		res.status(200).jsonp({
 			body: token
 		})
 		console.log(decodeToken(token))
 	}
})


server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})