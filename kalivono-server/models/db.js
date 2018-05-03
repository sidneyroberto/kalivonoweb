import mongoose from 'mongoose';
import Termo from './termo';

var dbURI = 'mongodb://localhost/kalivonoweb';
mongoose.Promise = global.Promise;

mongoose.connect(dbURI);
mongoose.connection.on('connected', () => console.log('Mongoose connected to ' + dbURI));
mongoose.connection.on('error', (err) => console.log('Mongoose connected error: ' + err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

var gracefullShutdown = (msg, callback) =>
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });


process.once('SIGUSR2', () =>
    gracefullShutdown('nodemon restart', () => process.kill(process.pid, 'SIGUSR2'))
);

process.on('SIGINT', () =>
    gracefullShutdown('app termination', () => process.exit(0))
);

process.on('SIGTERM', () =>
    gracefullShutdown('Heroku app shutdown', () => process.exit(0))
);
