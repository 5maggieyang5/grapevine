import React, { Component } from 'react';
import { DateRangePicker }  from 'react-dates';
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css';


class UserDateRangePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
    }
  }

  handleOnClick = evt => {
    console.log("Start Date current user choose: ", this.state.startDate);
    console.log("End Date current user choose: ", this.state.endDate);
    evt.preventDefault();
    if (this.state.startDate && this.state.endDate) {
      this.props.updateDate(this.state.startDate, this.state.endDate);
      this.setState ({
        startDate: null,
        endDate: null
      })
    } else {
      console.log("No Date Provided!")//Later this should be a Error msg for client
    }
  }

  render() {
    return (
      <div>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          minimumNights = {0}
        />
          <input id="dateSubmit" type="submit" value="Submit" onClick={this.handleOnClick}/>
      </div>
    );
  }
}

export default UserDateRangePicker;
