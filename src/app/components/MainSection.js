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
