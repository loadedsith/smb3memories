import React, {PureComponent, PropTypes} from 'react';
import Card from './Card';

class CardRow extends PureComponent {
  render() {
    const {row, rowIndex, actions} = this.props;

    return (
      <div className="row">
        {row.map((card, columnIndex) => {
          const {side, id, emoji, title, image, shown} = card;
          return (
            <Card
              address={[rowIndex, columnIndex]}
              emoji={emoji}
              id={id}
              image={'images/faces/' + image}
              key={id + side}
              name={name}
              shown={shown}
              side={side}
              title={title}
              {...actions}
              />
          );
        })}
      </div>
    );
  }
}

CardRow.propTypes = {
  row: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

export default CardRow;