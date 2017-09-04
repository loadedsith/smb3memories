import React, {PureComponent, PropTypes} from 'react';

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
    this.props.chooseCard(this.props.address);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.shown !== this.props.shown;
  }

  render() {
    const {image, id, title, name, side, emoji, shown} = this.props;

    const cardFaceStyle = {
      backgroundImage: `url("${image}")`
    };

    const visibility = shown ? 'face-up' : '';

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
  emoji: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  side: PropTypes.string.isRequired,
  title: PropTypes.string,
  chooseCard: PropTypes.func.isRequired,
  shown: PropTypes.bool.isRequired
};

export default Card;
