async function logRequests(req, res, next) {
    console.log(`${req.method} ${req.path}`);
    next();
}

function handle404(req, res) {
    res.status(404).json({ message: 'Not Found' });
}

function handleError(err, req, res, next) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
}

module.exports = { logRequests, handle404, handleError };
