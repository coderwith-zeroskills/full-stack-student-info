/* event diven archtecture:
emitter,listner-fires callback,handler
ex: const server=http.createServer();
server.listen(8000,()=>{"listening"}'
server.on('request',()=>{});
here server is event emitter, on is the listner and handler is the callback
you can create your custom event alike on event usng new event.EventEmitter();
on event on u recieve params in functions, is passed whle emtting the event
*/

/* STREAMS:a imp topic
readFile() and writeFile() does operateion at once.
using stream we does it piece by piece.
types:Readable,Writable,Duplex,Transform stream.
reading: const rs=fs.createReadStream("filepath");
rs.on('data',(chunk)=>{})
we use pipe method for handling backpressure--when write is slow than read.
*/

/*
nodeJS: LIBUV->event-driven and thread pool
every process has a thread and in other language has multi-thread, hread where code is executed.
*/

/* nodeJS running process:
top level code are first runned in main-thread.
all code with callback are sent to thread pool
callback are called after some task , and when task done that callback goes to event looping and  does not call immediately.
now when main thread is empty, callback are pushed to main thread for execution.
after coming to main thread if the task is heavy like file reading, they are sent back to thread-pol and executed, alike crytographic,compresson realted,dns lookup,

EVENT LOPPING:4 phase and each has it own callback;
--------phase 1:expired timers----------
--------phase 1:IO task and polling----------
--------phase 1:setImmediate calback----------
--------phase 1:closed callback----------
it run in sequence.
MICROtask queue-> only for reloved promise. and NEXTTICK queue->any callback and had to use process.nexttick: this will auto starts if any of the four phase completed.

WHAT NOT TO DO:
#)do not perform complex cal inside callback, careful with large JSON insde callback, not use complex regX inside callback all this will block main thread.
*/

// express is nodeJS framework-which also help design MVC.here it create request-response cycle.In between we can use middleware and can modify the both request and response.

/*
REST apis: REpresentational State Transfe:a architecture for providing standards between computer systems on the webs, making it easier for system to communicate betweem them.
put:entire updation
patch:particuar key updation
post:new resource
APIS: must be stateless->server should not remenber previous request,all info should be sotored client side and must request accordingly.ex:next page example OR is use logged in.
*/


/*  app.use(express.json())->middleware that attach coming data to request body during post method else res.body will be undefined.
Object.assign({id:1},{name:"yurName"})->this will merge both object into single.
*/


/* STATUS CODE:
200:success,201:created,
401:not-found

*/

/*ROUTE parameter:are named URL segments that are used to capture the values spceifiec at their position.
example:
GET:api/v1/movies/id
app.get('/api/v1/movies/:id/:optional?',(req,res)=>{console.log(req.params)})

*/

/* UPDATE Resources: PUT(entire object),PATCH(only updated object)
DELETE:
*/

/*MIDDLEWARE:
middleware has req,res,next.
custom-middleware:in code
mounting routes:already doing.



*/