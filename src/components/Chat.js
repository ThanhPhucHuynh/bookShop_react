import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from 'styled-components';
import imgBot from './images/aa.jpg'
import imgUser from './images/bb.jpg'
import CartPet from './DataChat/cartPet'
import Covid from './DataChat/vovid'
function CustomChatbot(props) {
    // console.log(props.imgBot)
  const config = {
    width: "400px",
    height: "600px",
    floating: true
  };
  const avatarStyle = {
    userAvatar: props.imgBot
  }
  const steps = [
    {
      id: "Greet",
      message: "Hello, Welcome to our shop",
      trigger: "1"
    },
    {
        id: '1',
        message: 'What is your name?',
        trigger: '2',
    },
    {
        id: '2',
        user: true,
        trigger: '3',
      },
    {
        id: '3',
        message: 'Hi {previousValue}, nice to meet you!',
        trigger: '1a',
    },
    {
        id: '1a',
        message: 'What do you know ?',
        trigger: '2a',
      },
      {
        id: '2a',
        options: [
          { value: 1, label: 'favorite pet', trigger: '4a' },
          { value: 2, label: 'Covid 19', trigger: '3a' },
          { value: 3, label: 'Number 3', trigger: '3a' },
        ],
      },
      {
        id: '3a',
        component: (
            <div>
                
                <Covid />
            </div>
          ),
          trigger: '1a',
      },
      {
        id: '4a',
        // message: 'Awesome! You are a telepath!',
        options: [
            { value: 1, label: 'Pug Dog', trigger: '5' },
            { value: 2, label: 'Exotic Cat', trigger: '6' },
            { value: 3, label: 'British Shorthair', trigger: '7' },
          ],
       
      },
      {
        id: '5',
        component: (
            <div>
                <div className="cho"> This is Pug Dog </div>
                <CartPet pet='pug'/>
            </div>
          ),
        // end: true,
        trigger: '1a',
      },
      {
        id: '6',
        component: (
            <div>
                <div className="cho"> This is Exotic Cat </div>
                <CartPet pet='exotic'/>
            </div>
          ),
        // end: true,
        trigger: '1a',
      }, {
        id: '7',
        component: (
            <div>
                <div className="cho"> This is British Cat </div>
                <CartPet pet='british'/>
            </div>
          ),
        // end: true,
        trigger: '1a',
      },




  ];

  return <ChatBot 
  previousStep = {[]}
  steps={steps} {...config} 
  botAvatar = {imgBot}
  userAvatar={imgUser} 
  hideUserAvatar='true'
  />;
}
export default CustomChatbot;
