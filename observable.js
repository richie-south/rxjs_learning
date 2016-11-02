'use strict';
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();


const Rx = require('rxjs/Rx');


// from Event
const emitterStream = Rx.Observable.fromEvent(myEmitter, 'data')
  .map(a => a.message);

emitterStream.subscribe(
  data => {
    console.log('data', data);
  },
  e => {
    console.log('error', e);
  },
  complete => {
    console.log('completed');
  });

myEmitter.emit('data', { message: 'hello world'});


// from array like

const numbers = [1, 20, 343, 32, 22, 9];

const numbers$ = Rx.Observable.from(numbers);

numbers$.subscribe(
  data => {
    console.log(data);
  },
  e => {
    console.log('error', e);
  },
  complete => {
    console.log('completed');
  });
