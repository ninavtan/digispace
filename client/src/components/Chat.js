import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import socketIOClient from "socket.io-client";
import ChatTable from './ChatTable';

// const ENDPOINT = 'https://calm-basin-65498.herokuapp.com';

const ENDPOINT = "http://127.0.0.1:3001";

const socket = socketIOClient(ENDPOINT);


const Chat = (props) => {
  const [name, setName] = useState('null');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');
  
  useEffect(() => {
    // This is running upon initial render and after name changes.

    const room = props.room;
    if (name !== 'null') {
      socket.emit('join', {name, room }, (error) => {
      if(error) {
        setName('null');
        alert(error);
      }
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }

  }, [name]);

 useEffect(() => {
    socket.on('message', message => {
      console.log('From the server!', message);
      setMessages(messages => [ ...messages, message ]);
  });

 }, []);
    
  

  const handleChatSubmit = (e) => {
    e.preventDefault();
    let messageInput = e.target[0];
    if (name && messageInput.value) {
      let message = {
        user: name,
        text: messageInput.value,
        timestamp: new Date().toISOString(),
      }
      socket.emit('sendMessage', message, (response) => {
        setMessages([...messages, message]);
        console.log(response.status);
        messageInput.value = '';
      });
      
      
    }
  }
  
  const handlenameSubmit = (e) => {
    e.preventDefault();
    // let name = (e.target[0].value);
    setName(e.target[0].value);
    // let room = props.room;


  }

  return (
    <ChatContainer>
      <Bar>{name === 'null' ? null : `welcome, ${name}!` }</Bar>
      <MessageList id="messages">
        <ChatTable messages={messages}/>
        </MessageList>

      {!name === 'null' ? null : 
      <SetnameForm onSubmit={handlenameSubmit}>
        <SenderInput placeholder="name" id="sender-input" />
        <br />
        <button type="submit">start chatting</button>
      </SetnameForm>
      }
        

      {name === 'null' ? null : 
      <ChatInputForm onSubmit={handleChatSubmit}>
        {/* <WelcomeUser>welcome, {name}!</WelcomeUser> */}
        <TextInput placeholder="message" id="input"/>
        <br />
        <br />
        <button>send</button>
      </ChatInputForm>
      }
    </ChatContainer>
    
  )



}

export default Chat;

const ChatContainer = styled.div`
  height: 400px;
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

const MessageList = styled.div`
height: 100%;
overflow-y: auto;
  
`

const SetnameForm = styled.form`
  margin: 0 auto;
  text-align: center;
`

const WelcomeUser = styled.span`
  
`