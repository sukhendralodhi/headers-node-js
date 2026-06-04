// Express js middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. Middleware functions can perform various tasks such as executing code, modifying the request and response objects, ending the request-response cycle, or calling the next middleware function.

// Middleware functions are executed in the order they are defined in the application. They can be used for tasks such as logging, authentication, error handling, and more. Express provides built-in middleware functions, and you can also create your own custom middleware functions to suit your application's needs.

// Example of a simple middleware function that logs the request method and URL:
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next(); // Call the next middleware function in the stack
}

// Middleware functions can perform the following tasks:
// 1. Execute any code.
// 2. Make changes to the request and response objects.
// 3. End the request-response cycle.
// 4. Call the next middleware function in the stack.