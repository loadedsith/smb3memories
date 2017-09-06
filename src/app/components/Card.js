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
    console.log('handleClick');
    this.props.actions.chooseCard(this.props.row, this.props.column);

    setTimeout(() => {
      this.props.actions.checkMatches();
      console.log('this.props.actions.checkMatches');
    }, 1000);
  }

  shouldComponentUpdate(nextProps) {
    return getCardFromDeck(nextProps.cards, nextProps.row, nextProps.column) !==
      getCardFromDeck(this.props.cards, this.props.row, this.props.column);
  }

  render() {
    const card = getCardFromDeck(this.props.cards, this.props.row, this.props.column);
    const {image, title, name, emoji, shown, matched} = card;
    const cardFaceStyle = {
      backgroundImage: `url("images/faces/${image}")`
    };

    let classes = ['card'];

    if (matched) {
      // Matched should imply face up.
      classes.push('matched');
    } else {
      classes.push(shown ? 'face-up' : 'face-down');
    }

    if (new URLSearchParams(window.location.search).get('cheat')) {
      classes.push('cheater');
    }

    classes = classes.join(' ');
    return (
      <div
        className={classes}
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
