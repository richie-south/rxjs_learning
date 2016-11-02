'use strict';
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();


const Rx = require('rxjs/Rx');


// from Event
const emitterStream = Rx.Observable.fromEvent(myEmitter, 'data');

emitterStream.subscribe(
  (data) => {
    console.log('data', data);
  },
  (e) => {
    console.log('error', e);
  },
  (completed) => {
    console.log(completed);
  });


myEmitter.emit('data', { message: 'hello world'});
