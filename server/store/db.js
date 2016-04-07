import mongoose from 'mongoose';
import { mongoConfig } from '../config/config.js';

const {
  server,
  databaseName,
  connectionOptions
} = mongoConfig;

function connectWithRetry() {
  return mongoose.connect(server + databaseName, connectionOptions, error => {
    if (error) {
      console.error('Failed to connect to MongoDB on startup - retrying in 5 sec', error);
      setTimeout(connectWithRetry, connectionOptions.server.reconnectInterval);
    }
  });
};

export default {
  /**
   * Connect to mongodb
   *
   */
  connect() {
    let isConnectedBefore = false;

    // connect to Mongo and retry  if fails.
    connectWithRetry();

    // connection events
    mongoose.connection.on('error', error => {
      console.error('Failed to connect to MongoDB.', error);
    });

    mongoose.connection.once('connected', () => {
      console.log('Connected to MongoDB!');
      isConnectedBefore = true;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('Reconnected to MongoDB!');
    });

    mongoose.connection.on('timeout', () => {
      console.log('MongoDB server timeout!');
    });

    mongoose.connection.on('disconnected', () => {
      if (isConnectedBefore) {
        console.log('MongoDB connection lost, trying to reconnect...');
      }
    });
  }
}
