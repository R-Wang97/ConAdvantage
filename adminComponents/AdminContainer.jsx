import React from 'react';
import ReactDOM from 'react-dom';

import Login from './Login.jsx';
import Filter from './Filter.jsx';
import Report from './Report.jsx';

class AdminContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showScreenState: 'login'
		} 
	}

	getReportInfo = (filter) => {
		//ajax stuff
	}

	changeAppState = (stateNum) => {
	    this.setState({showWelcomeScreen: stateNum});
	}

	render() {
		if (this.state.showScreenState === 'login') {
			return (
				<div>
					<Login changeAppState={this.changeAppState} />
				</div>
			);
		}

		else if (this.state.showScreenState === 'filter') {
			return (
				<div>
					<Filter changeAppState={this.changeAppState} />
				</div>
			);
		}
		return (
			<div>
				<Report changeAppState={this.changeAppState} />
			</div>
		);
	}
}

ReactDOM.render(<AdminContainer/>, document.getElementById('app'));
