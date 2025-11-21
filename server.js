import EventEmitter from 'events'
// Create an instance
const event = new EventEmitter();

event.on('greet', () => {
    
    console.log('Hello! Event has been triggered.');

});

event.on("welcome",(data)=>{
        console.log(data);
        ShowGreet()

});


event.emit('greet');
event.emit("welcome",{firstName:'Akhilesh Kumar'});

function ShowGreet(){
        console.log('Welcome to NodeJS Program.');
}

