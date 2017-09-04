import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as Actions from '../actions/index';

class App extends Component {
  render() {
    const {actions, cards} = this.props;
    return (
      <div>
        <Header/>
        <MainSection
          actions={actions}
          cards={cards}
          />
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    cards: state.cards
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
