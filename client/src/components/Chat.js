import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import socketIOClient from "socket.io-client";
import ChatTable from './ChatTable';

const ENDPOINT = "http://127.0.0.1:3001";

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");
  
  useEffect( () => {

  })

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);

  //   socket.on('chat message', message => {
  //     setMessages([...messages, {message: message.message, name: message.name, timestamp: message.timestamp}]);
  //   })

  //   return () => {
  //     socket.disconnect();
  //   }

  // }, []);


  const handleChatSubmit = (e) => {
    const socket = socketIOClient(ENDPOINT);
    e.preventDefault();
    let nameInput = e.target[0];
    let input = e.target[1];
    if (nameInput.value && input.value) {
      let message = {
        name: nameInput.value,
        message: input.value,
        timestamp: new Date().toISOString(),
      }
      socket.emit('chat message', message);
      input.value = '';
      return () => {
        socket.disconnect();
      }
    }
  }
  

  return (
    <ChatContainer>
      <Bar></Bar>
      <MessageList id="messages">
        <ChatTable messages={messages}/>
        </MessageList>
      <ChatInputForm onSubmit={handleChatSubmit}>
        <SenderInput placeholder="name" id="sender-input" onChange={e => setName(e.target.value)}/>
        {name ? <TextInput placeholder="message" id="input"/> : null}
        <br />
        <br />
        <button>{name ? 'send' : 'start chatting'}</button>
      </ChatInputForm>
    </ChatContainer>
    
  )



}

export default Chat;

const ChatContainer = styled.div`
  height: 30%;
  width: 100%;
  margin: 0 auto;
  border: 1px solid black;
  background-color: white;


`

const Bar = styled.div`
  height: 10%;
  width: 100%;
  background: pink;
  border-bottom: 1px solid black;
`

const ChatInputForm = styled.form`
  margin: 0 auto;
  text-align: center;
`

const SenderInput = styled.input`

`

const TextInput = styled.input`
margin: 0 auto;
`

const MessageList = styled.ul`
  // width: 100%;
  // height: 100%;
  // color: green;
  // list-style: none;
  // margin-top: 1em;
  // text-align: left;
`