import React from 'react';
import Message from './Message.jsx';


export default class MessageList extends React.Component {
  render() {
    const messages = this.props.messages.map((message) => {
          return (
              <Message messageInfo={message} key={message.id}/>
            )
        })
    return (
        <main className='messages'>
            {messages}
        </main>
    );
  }
}
