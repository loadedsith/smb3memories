import React, {PureComponent, PropTypes} from 'react';
import CardRow from './CardRow';

class MainSection extends PureComponent {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {cards, actions} = this.props;

    return (
      <section className="main">
        <div className="cards">
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

export default MainSection;
