import dataUrl from '../../assets/data/data.json';

// var url = { url: dataUrl.url };
// var port = { port: dataUrl.port };
// var station = { station: dataUrl.staton };

var url = { url: localStorage.getItem('url') };
var port = { port: localStorage.getItem('port') };
var station = { station: localStorage.getItem('station') };

function urls(user: any) {
    url.url = user
    // return url
}

function ports(user: any) {
    port.port = user
    // return port
}

function stations(user: any) {
    station.station = user
    // return station
}

export { urls, ports, stations, url, port, station };