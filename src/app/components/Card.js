import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/index';

const cardBackStyle = {
  backgroundImage: 'url("images/card-back.png")'
};
const cardFrontStyle = {
  backgroundImage: 'url("images/card-front.png")'
};
const cardShadowStyle = {
  backgroundImage: 'url("images/card-shadow.png")'
};

const getCardFromDeck = function (cards, row, column) {
  return cards[row][column];
};

class Card extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shown: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.actions.chooseCard(this.props.row, this.props.column);

    // This allows enough time for the card to have flipped before the matching
    // state is checked.
    if (document.timeout) {
      clearTimeout(document.timeout);
    }

    document.timeout = setTimeout(() => {
      this.props.actions.checkMatches();
    }, 500);

    // create and dispatch the event
    const event = new CustomEvent('cardClick', {
      detail: {
        now: Number(new Date())
      }
    });

    document.dispatchEvent(event);
  }

  shouldComponentUpdate(nextProps) {
    const thisCard = getCardFromDeck(this.props.cards, this.props.row,
      this.props.column);
    const newCard = getCardFromDeck(nextProps.cards, nextProps.row,
      nextProps.column);

    return thisCard !== newCard;
  }

  render() {
    const card = getCardFromDeck(this.props.cards, this.props.row, this.props.column);
    const {image, title, name, emoji, shown, matched} = card;
    const cardFaceStyle = {
      backgroundImage: `url("images/faces/${image}")`
    };

    const classes = ['card'];

    // Matched should imply face up.
    if (matched) {
      classes.push('matched');
    } else {
      classes.push(shown ? 'face-up' : 'face-down');
    }

    if (new URLSearchParams(window.location.search).get('cheat')) {
      classes.push('cheater');
    }

    return (
      <div
        className={classes.join(' ')}
        style={cardShadowStyle}
        onClick={this.handleClick}
        >
        <div
          className="card-side card-front"
          style={cardFrontStyle}
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
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
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
)(Card);
