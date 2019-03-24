import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
// import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TagCloud } from "react-tagcloud";
import { filter, groupBy, prop, curry, pipe, zipObj, map, pluck, flatten, uniq, toPairs, propSatisfies } from 'ramda'
import {
  rulesaction,
  transactionsaction,
} from '../../modules/counter'

/*
* making custom style on each Cloud tag, ie .. Transaction category
*/

const customRenderer = (tag, size, color) => {

  const colors = (tag.value === 'Loans' || tag.value === 'Interest' || tag.value === 'Consumer Loan') ? 'Yellow' : 'Red';
  // console.log('tag value', tag.value, 'size', size);
  return (
    <span key={tag.value} title={tag.value}
      style={{
        animation: 'blinker 3s linear infinite',
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `1em`,
        border: `2px solid ${colors}`,
        backgroundColor: colors,
        margin: '3px',
        padding: `0px 0px ${size}px 87px`,
        display: 'inline-block',
        // padding: '0px 0px 35px 87px',
        cursor: 'pointer',
      }}></span>
  )
};


class CategoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groupCateg: '' };
  }
  componentWillMount() {
    this.props.transactionsaction();
    this.props.rulesaction();
  }

  gotoRule() {
    this.props.history.push('/new-rule');
  }
  render() {
    if (this.props && this.props.rules && this.props.transactions.length > 0) {
      var groupbycategory = [];
      const rulevalue = pipe(
        groupBy(prop('ruleCategory')),
        map(pluck('ruleMatchValue')),
        map(flatten),
        map(uniq),
        toPairs,
        map(zipObj(['ruleCategory', 'ruleMatchValue']))
      )(this.props.rules);
      const eqInsensitive = curry((a, b) => {
        return String(b).toLowerCase().indexOf(String(a).toLowerCase()) > -1 ? true : false;
      });

      if (rulevalue && rulevalue.length > 0) {
        rulevalue.map((item, key) => {
          const ctegvalue = {
            'value': item.ruleCategory,
            'count': filter(propSatisfies(eqInsensitive(item.ruleCategory), 'transactionDescription'), this.props.transactions).length,
            'match': item.ruleMatchValue
          }
          return groupbycategory.push(ctegvalue);
        })
      }
    } else {
      return 'Loading'
    }
    return (
      <div class="container">
        <header>
          <h1>TRANSACTION HISTORY BY CATEGORY </h1>
        </header>
        <nav>
          <a href="javascript:void(0)" onClick={() => this.gotoRule()}>Add New Rule </a>
        </nav>
        <main>
          <TagCloud minSize={12}
            maxSize={35}
            tags={groupbycategory}
            renderer={customRenderer}
            onClick={tag => this.props.changePage(tag.value, tag.match)}
          />
        </main>
        <footer>
          <p> SPOTCAP.com</p>
        </footer>
      </div>
    );
  }
}

CategoryView.propTypes = {
  transactions: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
}

CategoryView.defaultProps = {
  transactions: {},
  rules: {}
}

const mapStateToProps = ({ counter }) => ({
  transactions: counter.transactionsdata,
  rules: counter.rulesdata,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      transactionsaction,
      rulesaction,
      changePage: (tag, match) => push({
        pathname: '/tagdetail-view',
        state: { detail: tag, match: match }
      }),
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryView)
