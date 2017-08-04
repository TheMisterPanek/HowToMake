import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPage } from '../../actions/actions.js';
import React, { Component } from 'react';
import DefaultButton from './DefaultButton.js';

class AddPage extends Component {
  render() {
    return (
        <DefaultButton text = "Add Page" onClick = {this.props.onAddPage} />
    );
  }
}

AddPage.PropTypes = {
  manual_id: PropTypes.number.isRequired,
  onAddPage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    manual_id: state.getIn(["manual", "manual_id"]),
  };

};

const mapDispatchToProps = (dispatch)=>{
  return {
     onAddPage: ({manual_id}) => {
        const title = prompt("Please enter title", "");
        if (title ) {
            dispatch(createPage(manual_id, title));
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AddPage);
