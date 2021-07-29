import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map((s) => (
      <div className="card" key={s._id}>
        <div className="card-content">
          <span className="card-title">{s.title}</span>
          <p>{s.body}</p>
          <p className="right">Sent On: {new Date(s.dateSent).toLocaleDateString()}</p>
        </div>
        <div className="card-action">
          <a href="#!">Yes: {s.yes}</a>
          <a href="#!">No: {s.no}</a>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div>{this.renderSurveys()}</div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);