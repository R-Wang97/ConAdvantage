import React from 'react'

import FloorPlanImage from './FloorPlanImage.jsx';
import InfoPanel from './InfoPanel.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dotIsClicked: false,
			selectedDotObject: {
				item: "",
				condition: "", 
				description: ""
			},
			roomInfo: {}	
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({roomInfo: nextProps.roomInfo})
	} 

	setDotIsClicked = (input) => {
		this.setState({
			dotIsClicked: input,
			selectedDotObject: []
		});
	}

	render() {
		if (this.state.dotIsClicked === false) {
			return (
				<div>
					<h1>App Goes Here</h1>
					<FloorPlanImage />
				</div>
			);
		}
		else if (this.state.dotIsClicked === true) {
			return (
				<div>
					<h1>App Goes Here</h1>
					<FloorPlanImage />
					<InfoPanel details={this.state.selectedDotObject} roomId={this.state.roomInfo.Id}/>
				</div>
			);
		}
	}
}

export default App