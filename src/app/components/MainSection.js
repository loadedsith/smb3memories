import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/index';
import CardRow from './CardRow';

const countUnmatchedCards = function (cards) {
  const count = cards.map(
    // For each row.
    row => row.reduce(
      // For each colum return the cards that are shown.
      (sum, value) => sum + (value.matched ? 0 : 1), 0))
      // Reduce from rows and columns to just a flat array.
      .reduce((a, b) => a + b, 0);
  return count;
};

class MainSection extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.firstCardClick = 0;
    this.lastCardClick = 0;

    document.addEventListener('cardClick', e => {
      this.lastCardClick = e.detail.now;

      if (this.firstCardClick === 0) {
        this.firstCardClick = e.detail.now;
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    return countUnmatchedCards(nextProps.cards) === 0 || countUnmatchedCards(this.props.cards) === 0;
  }

  handleClick() {
    this.props.actions.newGame();
  }

  render() {
    const {cards, actions} = this.props;
    const unmatchedCards = countUnmatchedCards(cards);
    let gameDisplay;

    if (unmatchedCards === 0) {
      const time = this.lastCardClick - this.firstCardClick;
      this.firstCardClick = 0;
      gameDisplay = (
        <div className="winner">
          <h3>
            Winner!
          </h3>
          <h4>
            {(time / 1000).toFixed(2)} seconds!
          </h4>
          <button onClick={this.handleClick}>👉 New Game</button>
        </div>
      );
    }

    return (
      <section className="main">
        <header className="header">
          <h1>memory</h1>
          <h4>
            by <a href="mailto:graham.p.heath@gmail.com" title="Send me an email">Graham P Heath</a>
            <a href="https://github.com/loadedsith/smb3memories" title="View On GitHub">
              <img src="images/github_white.png" alt="" height="40" width="40"/>
            </a>
          </h4>
        </header>
        <div className="cards">
          {gameDisplay}
          {cards.map((row, rowIndex) => {
            return (
              <CardRow
                key={JSON.stringify(row)}
                row={row}
                rowIndex={rowIndex}
                actions={actions}
                />
            );
          })}
        </div>
      </section>
    );
  }
}

MainSection.propTypes = {
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    cards: state.cards
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection);
