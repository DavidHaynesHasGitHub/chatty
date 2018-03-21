import React from 'react';

export default class ChatBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {inputValue: '', username: props.defaultValue}
  }

   messageOnChange = (event) => {
    this.setState({inputValue: event.target.value, username: this.state.username})
  }
   nameOnChange = (event) => {
    this.setState({inputValue: this.state.inputValue, username: event.target.value})
  }
   onSubmit = (event) =>{
    if(event.key === 'Enter'){
      this.props.addMessage(this.state);
      this.setState({inputValue:'', username: this.state.username})
    }
  }
  render(){
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onChange={this.nameOnChange} value={this.state.userName}/>
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onChange={this.messageOnChange}
          value={this.state.inputValue}
          onKeyPress={this.onSubmit}/>
      </footer>
    );
  }
}
