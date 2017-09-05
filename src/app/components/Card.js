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

const getCardFromDeck = function (cards, address) {
  return cards[address[0]][address[1]];
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
    console.log('debugger');
    this.props.actions.chooseCard(this.props.address);
  }

  shouldComponentUpdate(nextProps) {
    return getCardFromDeck(nextProps.cards, nextProps.address) !==
      getCardFromDeck(this.props.cards, this.props.address);
  }

  render() {
    const card = getCardFromDeck(this.props.cards, this.props.address);
    const {image, id, title, name, side, emoji, shown} = card;
    const cardFaceStyle = {
      backgroundImage: `url("images/faces/${image}")`
    };
    const visibility = shown ? 'face-up' : 'face-down';
    console.log('card', card);
    return (
      <div
        className={['card', visibility].join(' ')}
        style={cardShadowStyle}
        onClick={this.handleClick}
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
  address: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  actions: PropTypes.func.isRequired
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
