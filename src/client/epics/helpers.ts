import { Observable } from 'rxjs/Observable';
//Webpack doesn't bundle correctly without this. TODO: figure out why & fix.
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/observable/bindCallback';

export interface SocketOptions {
  event: string;
  payload?: any;
}

const emit = Observable.bindNodeCallback((options: SocketOptions, callback: (err: Error, data: any) => void) => {
  window.socket.emit(options.event, options.payload || {}, callback);
});

const on = Observable.bindCallback((options: SocketOptions, callback: (data: any) => void) => {
  window.socket.on(options.event, callback);
});

export const Socket = {
  emit,
  on
};