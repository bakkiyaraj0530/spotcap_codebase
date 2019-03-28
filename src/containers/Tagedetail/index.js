import React from 'react'
import { TagCloud } from "react-tagcloud"
import { filter, curry, propSatisfies } from 'ramda'
const transactions = require('../../json/transactions.json');
const backarrow = require('./../../img/images.png');

const customRenderer = (tag, size, color) => {
  return (
    <span key={tag.value} title={tag.value}
      style={{
        animation: 'blinker 3s linear infinite',
        fontSize: '1em',
        backgroundColor: color,
        margin: '3px',
        padding: '0px 0px ' + size + 'px 87px',
        display: 'inline-block',
        cursor: 'pointer',
      }}></span>
  )
};
export default class Tagedetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gmatch: '', displaycount: false, count: '', highlitedItem: '' };
    this.viewCount = this.viewCount.bind(this);
  }

  componentWillMount() {
    const eqInsensitive = curry((a, b) => {
      return String(b).toLowerCase().indexOf(String(a).toLowerCase()) > -1 ? true : false;
    });

    var groupbymatch = [];

    if (this.props.location.state && this.props.location.state.match && this.props.location.state.match.length > 0) {
      this.props.location.state.match.map((item, key) => {
        let filteredObject = {
          'value': item,
          'count': filter(propSatisfies(eqInsensitive(item), 'transactionDescription'), transactions).length,
          'details': filter(propSatisfies(eqInsensitive(item), 'transactionDescription'), transactions),
          'color': this.props.location.state.color,
        }
        return groupbymatch.push(filteredObject);
      })
    } else {
      groupbymatch[0] = {
        'value': this.props.location.state.match[0],
        'count': filter(propSatisfies(eqInsensitive(this.props.location.state.match[0]), 'transactionDescription'), transactions).length,
        'details': filter(propSatisfies(eqInsensitive(this.props.location.state.match[0]), 'transactionDescription'), transactions)
      };
    }
    this.setState({ gmatch: groupbymatch });
  }

  /*
  * @To display the count on while hover on Rule Match Value.
  */
  viewCount(countItem) {
    this.setState({ displaycount: true, count: countItem.count });
  }

  /*
  * @To display highlited transaction details, like Transanction Id, Transaction Description.
  */
  viewHighlitedtransaction(trxItem, selectedItem) {
    const name = document.querySelector(".tag-cloud");
    const nameitems = name.children;
    const array = Array.from(nameitems);
    let borderappend;
    array.forEach(el => {
      if (el.getAttribute('style').indexOf('border') > -1) {
        el.setAttribute('style', el.getAttribute('style').replace('border: 1px solid #ec5d0a', ''));
        el.setAttribute('style', el.getAttribute('style').replace('border: 1px solid #161615', ''));
      }
      if (el.getAttribute('title') === selectedItem) {
         if(el.getAttribute('style').indexOf('red') > -1) {
           borderappend = el.getAttribute('style') + 'border: 1px solid #161615';
         } else {
          borderappend = el.getAttribute('style') + 'border: 1px solid #ec5d0a';
         }
        el.setAttribute('style', borderappend);
      };
    });
    this.setState({ displaycount: false, highlitedItem: trxItem });
  }

  /*
   * Return back to category page
   */
  goback() {
    this.props.history.push('/');
  }
  /*
  * Render method to display the content.
  */
  render() {
    const txhiglitedDetails = this.state.highlitedItem && this.state.highlitedItem.map((txItem, key) => {
      return (
        <span key={key} className="innercontent">[ {txItem.transactionId} ] {`< ${txItem.transactionDescription} >`}</span>
      );
    });
    return (
      <div className="detail-element">
        <header><h1>TRANSACTIONS HISTORY - BY MATCH </h1>
        </header>
        <div className="outter-slade">
          <div className="first-level" >
            <p>  <a href="javascript:void(0)" onClick={() => this.goback()}><img src={backarrow} width={'20px'} /></a>&nbsp; &nbsp;&nbsp;&nbsp;RETURN</p>
            <TagCloud minSize={12}
              maxSize={35}
              tags={this.state.gmatch}
              renderer={customRenderer}
              // className="simple-cloud"
              onClick={tag => this.viewHighlitedtransaction(tag.details, tag.value)}
              onMouseMove={tag => this.viewCount(tag)}
            />
          </div>
          <div className="second-level">
            {this.state.displaycount && !this.state.highlitedItem && <div className="sidebartitle"> <span> DETAILS </span><span> TOTAL MATCHES {this.state.count} </span></div>}
            <div className="sidebartitle"><span>{this.state.highlitedItem && 'TRANSACTIONS'} </span>
              {txhiglitedDetails}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



