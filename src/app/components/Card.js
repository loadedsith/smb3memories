import React, {Component, PropTypes} from 'react';

class Card extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange() {
    // this.props.completeTodo(this.props.todo.id);
  }

  handleClick() {
    // this.props.deleteTodo(this.props.todo.id);
  }

  handleDoubleClick() {
    this.setState({editing: true});
  }

  handleSave(text) {
    if (text.length === 0) {
      // this.props.deleteTodo(this.props.todo.id);
    } else {
      // this.props.editTodo(this.props.todo.id, text);
    }
    this.setState({editing: false});
  }

  render() {
    const {image, id, title, name, side, emoji} = this.props;
    const cardBackStyle = {
      backgroundImage: 'url("images/card-back.png")'
    };
    const cardFrontStyle = {
      backgroundImage: 'url("images/card-front.png")'
    };
    const cardShadowStyle = {
      backgroundImage: 'url("images/card-shadow.png")'
    };
    const cardFaceStyle = {
      backgroundImage: `url("${image}")`
    };

    return (
      <div
        className="card"
        style={cardShadowStyle}
        >
        <div
          className="card-side card-front"
          style={cardFrontStyle}
          id={id}
          side={side}
          >
          <div
            className="card-face"
            style={cardFaceStyle}
            >
            <p className="name">{title || name}</p>
            <p className="emoji">:{emoji}:</p>
          </div>
        </div>
        <div
          className="card-side card-back"
          style={cardBackStyle}
          >
          ♠️
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  emoji: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  side: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default Card;
