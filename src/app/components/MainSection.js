import React, {Component, PropTypes} from 'react';
import Card from './Card';

class MainSection extends Component {

  render() {
    const {cards, actions} = this.props;

    return (
      <section className="main">
        <div className="cards">
          {cards.map((row, rowIndex) => {
            return (
              <div className="row" key={JSON.stringify(row)}>
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
              </div>);
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

export default MainSection;
