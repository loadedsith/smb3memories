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

class Card extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shown: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('card');
    this.props.chooseCard(this.props.address);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.cards[nextProps.address[0]][nextProps.address[1]] !== this.props.cards[this.props.address[0]][this.props.address[1]];
  }

  render() {
    const {image, id, title, name, side, emoji} = this.props;
    const shown = this.props.cards[this.props.address[0]][this.props.address[1]].shown;
    console.log('image', image, shown);
    const cardFaceStyle = {
      backgroundImage: `url("${image}")`
    };

    const visibility = shown ? 'face-up' : 'face-down';

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
  emoji: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  side: PropTypes.string.isRequired,
  title: PropTypes.string,
  chooseCard: PropTypes.func.isRequired
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
