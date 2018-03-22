import React from 'react';
import ChatBar from './Elements/ChatBar.jsx'
import MessageList from './Elements/MessageList.jsx'
import NavBar from './Elements/NavBar.jsx'
import ReactDOM from 'react-dom'

// sets the default state for username, usercount and messages as blank
const defaultState = {
  defaultValue: {name: 'Anonymous'},
  messages: [],
  userCount:0
};

class App extends React.Component{
  constructor(props) {
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.socket = new WebSocket("ws:localhost:3001");
    this.state = defaultState;
  }

  //sends a stringified json as message
  sendMessage(message) {
    this.socket.send(JSON.stringify(message));
  }

  //checks if username === default username and if its been changed then send a notification
  addMessage(message) {
    const newMessage = {type: 'postMessage', username: message.username, content: message.inputValue}
    if(this.state.defaultValue.name !== newMessage.username) {
      const newNotification = {type: 'postNotification', content:`${this.state.defaultValue.name} has changed their name to ${newMessage.username}`}
      this.sendMessage(newNotification);
      this.setState({defaultValue: {name: newMessage.username}, messages: this.state.messages});
    }
      this.sendMessage(newMessage);
  }

  componentDidMount() {

    //gets the new message, the old messages and concats them together
    this.socket.onmessage = (event) => {
      let newMessage = JSON.parse(event.data);
      const oldMessages = this.state.messages;
      const allMessages = oldMessages.concat(newMessage);
      console.log(newMessage.usersOnline)
      //checks message type vs new user type
      if(newMessage.type === 'incomingUserCount') {
        this.setState({messages: allMessages, userCount: newMessage.usersOnline})
      } else {
        this.setState({messages: allMessages});
      }
    }
  }
  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount} />
        <MessageList messages={this.state.messages}/>
        <ChatBar defaultValue={this.state.defaultValue.name} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
