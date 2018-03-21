import React from 'react';

export default class Message extends React.Component {
  render() {
    return (
      <div>
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      </div>
    );
  }
}
