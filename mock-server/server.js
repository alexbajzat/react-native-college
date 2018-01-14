const jsonServer = require('json-server')
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
 		res.sendStatus(200)
 	}
})


server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})