import React from 'react';

export default class AddRule extends React.Component {
  constructor(props) {
    super(props);
    this.state = { success: false, groupCateg: '', matchvalue: '', matchtype: '', matchflag: '', matchcategory: '', errors: {} };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postData = this.postData.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  postData(url = ``, data = {}) {
    return 
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
    event.preventDefault();
    if (!this.handleValidation()) {
      return false;
    }
    const newruleData = {
      ruleMatchValue: this.state.matchvalue,
      ruleMatchType: this.state.matchtype,
      ruleFlag: this.state.matchflag,
      ruleCategory: this.state.matchcategory
    };

     /*
     * Making Server post api call to update the rules
     */
    const response = fetch(`/updateRule`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(newruleData), // body data type must match "Content-Type" header
    })
      .then(response => response.json()); // parses JSON response into native Javascript objects 
    console.log('response', response);

    this.setState({
      matchvalue: '',
      matchtype: '',
      matchflag: '',
      matchcategory: '',
      success: true,
    });

    this.gotoHome();
  }

   /*
   * Redirecting page to cateogory view page - pushing history to home.
   */
   
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
            {this.state.success && <div> RULES SUBMITTED SUCCESSFULLY</div>}
            <div className="wrapper rule-element">
              <label>
                rule Match Value:
                <input ref="matchvalue" type="text"  name="matchvalue" onChange={this.handleChange} />
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

