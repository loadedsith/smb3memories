import React, {PureComponent, PropTypes} from 'react';
import Card from './Card';

const cardNames = function (card, cards) {
  return `${cards}${card.side}${card.image}`;
};

class CardRow extends PureComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.row.reduce(cardNames, '') !== this.props.row.reduce(cardNames, '');
  }

  render() {
    const {row, rowIndex} = this.props;

    return (
      <div className="row">
        {row.map((column, columnIndex) => {
          return (
            <Card
              address={[rowIndex, columnIndex]}
              key={[rowIndex, columnIndex].join(',')}
              />
          );
        })}
      </div>
    );
  }
}

CardRow.propTypes = {
  row: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

export default CardRow;
