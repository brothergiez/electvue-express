const electron = require('electron');
const http = require('http');
const debug = require('debug');
const App = require('./server/server');
const url = require('url');
const path = require('path');
require('dotenv').config();

class Main {
  static main(app, browserWindow) {
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on('ready', Main.onReady);
    Main.application.on('activate', Main.onActivate);
    Main.bootServer();
  }

  static onReady() {
    Main.mainWindow = new Main.BrowserWindow({ width: 800, height: 600 });
    Main.mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file',
        slashes: true
      })
    );
    Main.mainWindow.webContents.openDevTools();
    Main.mainWindow.on('closed', Main.onClose);
  }

  static onActivate() {
    if (Main.mainWindow === null) {
      Main.onReady();
    }
  }
  static onClose() {
    // Dereference the window object.
    Main.mainWindow = null;
  }
  static bootServer() {
    Main.port = Main.normalizePort(process.env.PORT || 3000);
    App.default.set('port', Main.port);
    Main.server = http.createServer(App.default);
    Main.server.listen(Main.port);
    Main.server.on('error', Main.onError);
    Main.server.on('listening', Main.onListening);
  }

  static normalizePort(val) {
    let port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }

  static onError(error) {
    if (error.syscall !== 'listen') throw error;
    let bind = typeof Main.port === 'string' ? 'Pipe ' + Main.port : 'Port ' + Main.port;
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  static onListening() {
    let addr = Main.server.address();
    let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }
}
exports.default = Main;
Main.main(electron.app, electron.BrowserWindow);
