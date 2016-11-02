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

const numbers$ = Rx.Observable.from(numbers); // add map, filter..

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


// own Observer
const source$ = new Rx.Observable(observer => {
  observer.next('First value');

  //  observer.error(new Error('fooooo')); // error out put

  setTimeout(() => {
    observer.next('Last value');
    observer.complete();
  }, 0);
});

source$
  // .catch(e => Rx.Observable.of(e)) // do completed on error
  .subscribe(
    data => {
      console.log(data);
    },
    e => {
      console.log('error', e);
    },
    complete => {
      console.log('completed');
    });


// from promise

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('myPromise');
  }, 0);
});

const promiseSource$ = Rx.Observable.fromPromise(myPromise);

promiseSource$
  .subscribe(
    data => {
      console.log(data);
    },
    e => {
      console.log('error', e);
    },
    complete => {
      console.log('completed');
    });
