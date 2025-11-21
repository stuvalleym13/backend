// class based example


import EventEmitter from 'events';

class MyLogger extends EventEmitter {

    log(message) {

        console.log("Log:", message);
        this.emit('messageLogged', { message, time: new Date() });

    }

}

const logger = new MyLogger();

logger.on("messageLogged", (data) => {
    console.log('Event received:', data);

})

// Trigger
logger.log("This is an event example");