import './App.css';
import io from "socket.io-client";
import { useEffect, useState } from 'react';

function App() {
  const socket = io.connect('http://localhost:5000')
  const [message, setMessage] = useState('');
  const [getMessage, setGetMessage] = useState('');   
  const [room, setRoom] = useState('');   

  const handleSend = () =>{
    socket.emit("chatEvent", {message,room});
  };

  useEffect(()=>{
    socket.on("showChat", (data)=>{
      console.log(data)
      setGetMessage(data.message);
    });
  },[socket]);

  const handleRoom = () =>{
    socket.emit("joinRoom", room);
  }

  return (
    <div className="w-full">
      <h1>hello react and socket.io-client</h1>
      <div>
        <h1 className="text-3xl text-green-700 text-left">{message}</h1>
        <h1 className="text-3xl text-blue-700 text-right mr-4">{getMessage}</h1>
      </div>

      <div className="flex flex-col mx-auto justify-center items-center">
      <div>
      <input 
      onBlur={(e) => setRoom(e.target.value)} 
      type="text"
      placeholder="rome..." 
      className='py-2 border border-gray-200' /> 
      <button onClick={handleRoom}
       className="p-2 
       bg-gray-300">join room</button> 
      </div>

      <input onBlur={(e) => setMessage(e.target.value)} 
      type="text"
      placeholder="message..." 
      className='py-2 border border-gray-200' />
      <button onClick={handleSend}
       className="p-2 
       bg-gray-300">send</button>
      </div>
    </div>
  );
}

export default App;
