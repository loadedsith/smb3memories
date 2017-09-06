import React from 'react';
import TestUtils from 'react-addons-test-utils';
import MainSection from './MainSection';
import TodoItem from './TodoItem';
import {SHOW_ALL, SHOW_COMPLETED} from '../constants/TodoFilters';

function setup(propOverrides) {
  const props = Object.assign({
    todos: [
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        completed: true,
        id: 1
      }
    ],
    actions: {
      editTodo: jasmine.createSpy(),
      deleteTodo: jasmine.createSpy(),
      completeTodo: jasmine.createSpy(),
      completeAll: jasmine.createSpy(),
      clearCompleted: jasmine.createSpy()
    }
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<MainSection {...props}/>);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('MainSection', () => {
    it('should render container', () => {
      const {output} = setup();
      expect(output.type).toBe('section');
      expect(output.props.className).toBe('main');
    });

    describe('toggle all input', () => {
      it('should render', () => {
        const {output} = setup();
        const [toggle] = output.props.children;
        expect(toggle.type).toBe('input');
        expect(toggle.props.type).toBe('checkbox');
        expect(toggle.props.checked).toBe(false);
      });

      it('should be checked if all todos completed', () => {
        const {output} = setup({
          todos: [
            {
              text: 'Use Redux',
              completed: true,
              id: 0
            }
          ]
        });
        const [toggle] = output.props.children;
        expect(toggle.props.checked).toBe(true);
      });

      it('should call completeAll on change', () => {
        const {output, props} = setup();
        const [toggle] = output.props.children;
        toggle.props.onChange({});
        expect(props.actions.completeAll).toHaveBeenCalled();
      });
    });

    describe('todo list', () => {
      it('should render', () => {
        const {output, props} = setup();
        const [, list] = output.props.children;
        expect(list.type).toBe('ul');
        expect(list.props.children.length).toBe(2);
        list.props.children.forEach((item, i) => { // eslint-disable-line max-nested-callbacks
          expect(item.type).toBe(TodoItem);
          expect(item.props.todo).toBe(props.todos[i]);
        });
      });
    });
  });
});
