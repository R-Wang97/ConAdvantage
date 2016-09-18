import React from 'react'

import FloorPlanImage from './FloorPlanImage.jsx';
import InfoPanel from './InfoPanel.jsx';
import ControlPanel from './ControlPanel.jsx';

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
			roomInfo: props.roomData,
			creatingCustom: false,
			items: []	
		}
	}

	componentDidMount() {
		const itemIds = this.state.roomInfo.split(";");
		for (let i = 0; i < itemIds.length; i++) {
			$.ajax({
				url: "/api/landlord/item/" + itemIds[i],
				cache: false,
				success: (data) => {
					const itemArray = this.state.items;
					itemArray.push(data);
					this.setState({items: itemArray});
				},
				error: (status) => {
					console.error(status.status, "Couldn't get item info for id " + this.state.id); 
				}	
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({roomInfo: nextProps.roomData})
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
					<div className='formText'>
						<h2>Room Condition Form</h2>
						<hr />
					</div>
					<div className='formPanels'>
						<FloorPlanImage />
					</div>
					<div className='row'>
						<ControlPanel />
					</div>
				</div>
			);
		}
		else if (this.state.dotIsClicked === true) {
			return (
				<div className='container-fluid'>
					<div className='formText'>
						<h2>Room Condition Form</h2>
						<hr />
					</div>
					<div className='row' id='formPanels'>
						<FloorPlanImage />
						<InfoPanel details={this.state.selectedDotObject} roomId={this.state.roomInfo.id} unselectDot={this.unselectDot}/>
					</div>
					<div className='row'>
						<ControlPanel />			
					</div>
				</div>
			);
		}
	}
}

export default App