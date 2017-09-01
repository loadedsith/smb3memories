import React, {PropTypes, Component} from 'react';
import TodoTextInput from './TodoTextInput';
import Card from './Card';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className="header">
        <h1>memory</h1>
        <h4>by <a href="mailto:graham.p.heath@gmail.com">Graham P Heath</a></h4>
        <Card/>

        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="What needs to be done?"
          />
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default Header;
