import React from 'react';

export default class Message extends React.Component {
  render() {
    if(this.props.messageInfo.type === 'incomingMessage') {
      let style = {
        color: this.props.messageInfo.color
      }
      return (
        <div className="message">
          <span className="message-username" style={style}>{this.props.messageInfo.username}</span>
          <span className="message-content">{this.props.messageInfo.content}</span>
        </div>
      )
    } else if(this.props.messageInfo.type === 'incomingNotification' || this.props.messageInfo.type === 'incomingUserCount') {
      return (
        <div className="message system">
          {this.props.messageInfo.content}
        </div>
      )
    }
  }
}
