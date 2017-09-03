import React, {Component, PropTypes} from 'react';
// import TodoItem from './TodoItem';
import Card from './Card';
// import Footer from './Footer';
// import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/TodoFilters';

// const TODO_FILTERS = {
//   [SHOW_ALL]: () => true,
//   [SHOW_ACTIVE]: todo => !todo.completed,
//   [SHOW_COMPLETED]: todo => todo.completed
// };

class MainSection extends Component {
  // constructor(props, context) {
  //   super(props, context);
    // this.state = {filter: SHOW_ALL};
    // this.handleClearCompleted = this.handleClearCompleted.bind(this);
    // this.handleShow = this.handleShow.bind(this);
    // this.handleCompleteAll = this.handleCompleteAll.bind(this);
  // }

  // handleClearCompleted() {
  //   this.props.actions.clearCompleted();
  // }
  //
  // handleCompleteAll() {
  //   this.props.actions.completeAll();
  // }
  //
  // handleShow(filter) {
  //   this.setState({filter});
  // }

  // renderToggleAll(completedCount) {
  //   const {todos} = this.props;
  //   if (todos.length > 0) {
  //     return (
  //       <input
  //         className="toggle-all"
  //         type="checkbox"
  //         checked={completedCount === todos.length}
  //         onChange={this.handleCompleteAll}
  //         />
  //     );
  //   }
  // }

  // renderFooter(completedCount) {
    // const {todos} = this.props;
    // const {filter} = this.state;
    // const activeCount = todos.length - completedCount;
          // completedCount={completedCount}
          // activeCount={activeCount}
          // filter={filter}
          // onClearCompleted={this.handleClearCompleted}
          // onShow={this.handleShow}

    // if (todos.length) {
      // return (
      //   <Footer/>
      // );
    // }
  // }

  render() {
    // const {todos, actions, cards} = this.props;
    const {cards} = this.props;
    // const {filter} = this.state;

    // const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    // const completedCount = todos.reduce((count, todo) =>
    //   to_do.completed ? count + 1 : count,
    //   0
    // );

          // {this.renderToggleAll(completedCount)}
    return (
      <section className="main">
        <div className="cards">
          {cards[0].grid.map(row => {
            return (
              <div className="row" key={JSON.stringify(row)}>
                {row.map(card => {
                  const {side, id, emoji, title, image} = card;

                  return (
                    <Card
                      side={side}
                      id={id}
                      key={id + side}
                      name={name}
                      title={title}
                      emoji={emoji}
                      image={'images/faces/' + image}
                      />
                  );
                })}
              </div>);
          })}
        </div>
      </section>
    );
          // {this.renderFooter(completedCount)}
  }
}

//           <ul className="todo-list">
          //   {filteredTodos.map(todo =>
          //     <TodoItem
          //       key={todo.id}
          //       to_do={todo}
          //       {...actions}
          //       />
          //   )}
          // </ul>

MainSection.propTypes = {
  cards: PropTypes.array.isRequired
  // ,
  // todos: PropTypes.array.isRequired,
  // actions: PropTypes.object.isRequired
};

export default MainSection;
