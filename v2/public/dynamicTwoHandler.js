//import {dynamicTwo } from '../algorithms/dynamicTwo.js';

function dynamicTwoHandler () {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        let seconds = e.data;
        postMessage(seconds + 6)
    })
}