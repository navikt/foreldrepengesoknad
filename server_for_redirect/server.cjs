'use strict';
const http = require('http')

const PRODUKTSIDE = 'https://www.nav.no/foreldrepenger#hvor-lenge';

function log(message, extra) {
    console.log(JSON.stringify({
        message,
        ...extra
    }));
}

const requestListener = function (req, res) {
    if (req.url.startsWith('/health')) {
        res.writeHead(200)
        res.end()
        return
    }

    log("Redirecter fra foreldrepengeplanlegger til produktsider", { target: PRODUKTSIDE });
    res.writeHead(302, {
        'Location': PRODUKTSIDE,
    })
    res.end()
}

const server = http.createServer(requestListener)
server.listen(8080)
log("Startup complete." )
