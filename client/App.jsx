import React from 'react'

import FloorPlanImage from './FloorPlanImage.jsx';
import InfoPanel from './InfoPanel.jsx';

//Import JSON file for floor plan dot objects
//import ...

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dotIsClicked: true,
			selectedDotObject: {
				item: '',
				condition: '', 
				description: ''
			},
			roomInfo: {},
			creatingCustom: false	
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({roomInfo: nextProps.roomInfo})
	} 

	dotClicked = (input) => {
		this.setState({
			dotIsClicked: true,
			selectedDotObject: input
		});
	}

	unselectDot = () => {
		this.setState({dotIsClicked: false})
	}

	render() {
		if (this.state.dotIsClicked === false) {
			return (
				<div className='container-fluid'>
					<FloorPlanImage />
				</div>
			);
		}
		else if (this.state.dotIsClicked === true) {
			return (
				<div className='container-fluid'>
					<FloorPlanImage />
					<InfoPanel details={this.state.selectedDotObject} roomId={this.state.roomInfo.Id} unselectDot={this.unselectDot}/>
				</div>
			);
		}
	}
}

export default App