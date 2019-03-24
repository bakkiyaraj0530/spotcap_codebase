import React from 'react';
import { Link } from 'react-router-dom';


export default class AddRule extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groupCateg: '', matchvalue: '', matchtype: '', matchflag: '', matchcategory: '', errors: {} };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postData = this.postData.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  postData(url = ``, data = {}) {
    return fetch(url, {
      method: "POST",
      mode: "cors", 
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(response => response.json()); // parses JSON response into native Javascript objects 
  }
  handleValidation() {
    let errors = {};
    let formIsValid = true;

    if (!this.state.matchvalue) {
      formIsValid = false;
      errors["matchvalue"] = "Match value cannot be empty";
    }
    if (!this.state.matchtype) {
      formIsValid = false;
      errors["matchtype"] = "Match type cannot be empty";
    }
    if (!this.state.matchflag) {
      formIsValid = false;
      errors["matchflag"] = "Match flag cannot be empty";
    }
    if (!this.state.matchcategory) {
      formIsValid = false;
      errors["matchcategory"] = "Match category cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }


  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.matchtype);

    event.preventDefault();
    if (!this.handleValidation()) {
      alert("Form has errors.");
      return false;
    }
    const newruleData = {
      ruleMatchValue: this.state.matchvalue,
      ruleMatchType: this.state.matchtype,
      ruleFlag: this.state.matchflag,
      ruleCategory: this.state.matchcategory
    };

    const response = this.postData(`/updateRule`, newruleData)
      .then(data => console.log(JSON.stringify(data)))
      .catch(error => console.error(error));
    alert('RULES ADDED SUCCESSFULLY!!');
    this.setState({
      matchvalue: '',
      matchtype: '',
      matchflag: '',
      matchcategory: '',
    });

    this.gotoHome();
  }

  gotoHome() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="add-rule-main">
        <header>
          <h1>ADD RULE FORM </h1>
        </header>
        <nav>
          <a href="javascript:void(0)" onClick={() => this.gotoHome()}>CATEGORY VIEW </a>
        </nav>
        <main>
          <form onSubmit={this.handleSubmit}>
            <div className="wrapper rule-element">
              <label>
                rule Match Value:
                <input type="text" name="matchvalue" onChange={this.handleChange} />
              </label>
              <span style={{ color: "red" }}>{this.state.errors["matchvalue"]}</span>
            </div>
            <div className="wrapper rule-element">
              <label>
                rule Match Type:
                <select name="matchtype" onChange={this.handleChange}>
                  <option selected>Select Match Type</option>
                  <option value="exact">Exact</option>
                  <option value="contains">Contains</option>
                  <option value="startsWith">Starts with</option>
                  <option value="endsWith">End With</option>
                  <option value="regex">Regex</option>
                </select>
              </label>
              <span style={{ color: "red" }}>{this.state.errors["matchtype"]}</span>
            </div>
            <div className="wrapper rule-element">
              <label> rule Flag:
              <select name="matchflag" onChange={this.handleChange}>
                  <option selected>Select Flag</option>
                  <option value="Red">Red</option>
                  <option value="Yellow">Yellow</option>
                </select>
              </label>
              <span style={{ color: "red" }}>{this.state.errors["matchflag"]}</span>
            </div>
            <div className="wrapper rule-element">
              <label>
                rule Category:
                <input type="text" name="matchcategory" onChange={this.handleChange} />
              </label>
              <span style={{ color: "red" }}>{this.state.errors["matchcategory"]}</span>
            </div>

            <div className="wrapper"><input type="submit" value="Submit" className="button" /></div>
          </form>
        </main>
        <footer>
          <p> SPOTCAP.com</p>
        </footer>
      </div>
    );
  }
}

