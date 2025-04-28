//bigPromise.js is a middleware that wraps the async functions in a promise and catches 
//any errors that may occur in the async function.

//either use try-catch with async-await 
module.exports =func=>(req,res,next)=>
    Promise.resolve(func(req,res,next))
    .catch(next);






