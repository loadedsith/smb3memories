import React, {Component, PropTypes} from 'react';
import TodoItem from './TodoItem';
import Card from './Card';
import Footer from './Footer';
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {filter: SHOW_ALL};
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleCompleteAll = this.handleCompleteAll.bind(this);
  }

  handleClearCompleted() {
    this.props.actions.clearCompleted();
  }

  handleCompleteAll() {
    this.props.actions.completeAll();
  }

  handleShow(filter) {
    this.setState({filter});
  }

  renderToggleAll(completedCount) {
    const {todos} = this.props;
    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={this.handleCompleteAll}
          />
      );
    }
  }

  renderFooter(completedCount) {
    const {todos} = this.props;
    const {filter} = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
          />
      );
    }
  }

  render() {
    const {todos, actions, cards} = this.props;
    const {filter} = this.state;

    // const grid = getGrid(5, 6);
    // console.log('grid', grid);
    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    );
    const cardsOut = JSON.stringify(cards[0].grid);

    return (
      <section className="main">
        {cardsOut}
        {this.renderToggleAll(completedCount)}
        {cards[0].grid.map(row => {
          console.log('row', row);

          return (
            <div className="row" key={JSON.stringify(row)}>
              {row.map(card => {
                return (
                  <Card
                    id={card}
                    key={JSON.stringify(card)}
                    image="/emoji/bacon.png"
                    />
                );
              })}
            </div>);
        })}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
              {...actions}
              />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}

MainSection.propTypes = {
  cards: PropTypes.array.isRequired,
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
