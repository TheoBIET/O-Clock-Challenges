const http = require('http');

let currentMax = 100;
let currentMin = 0;

const getNewProposition = (min, max) => {
    return Math.floor((max + min) / 2);
};

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html;charset=utf-8");

    const nb = getNewProposition(currentMin, currentMax)

    switch(req.url) {
        case '/plus':
            res.write(`Ce nombre est-il ${nb}?<br>`);
            res.write('<a href="/plus">Plus!</a>');
            res.write('<a href="/moins">Moins!</a>');
            res.write('<a href="/win">Win!</a><br>');
            currentMin = nb
            break;
        case '/moins':
            res.write(`Ce nombre est-il ${nb}?<br>`);
            res.write('<a href="/plus">Plus!</a>');
            res.write('<a href="/moins">Moins!</a>');
            res.write('<a href="/win">Win!</a><br>');
            currentMax = nb
            break;
        case '/win':
            currentMax = 100;
            currentMin = 0;
            res.write(`Hourra!`);
            res.write(`<a href="/">Recommencer!</a>`);
            break;
        default:
            res.write(`Pensez à un nombre entre ${currentMin} et ${currentMax}.Je vais le deviner!<br>`);
            res.write(`Ce nombre est-il ${nb}?<br>`);
            res.write('<a href="/plus">GO!</a>');
    }

    res.end();
})

server.listen(30144);