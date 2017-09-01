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
    const {image, id} = this.props;

    return (
      <div className="card">
        {id}
        <img src={image}/>
      </div>
    );
  }
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Card;
