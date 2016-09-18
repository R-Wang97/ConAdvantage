import React from 'react'

import FloorPlanImage from './FloorPlanImage.jsx';
import InfoPanel from './InfoPanel.jsx';
import ControlPanel from './ControlPanel.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dotIsClicked: false,
			selectedDotObject: {},
			roomInfo: props.roomData,
			creatingCustom: false,
			items: []	
		}
	}

	componentDidMount() {
		const itemIds = this.state.roomInfo.default_items.split(";").concat(this.state.roomInfo.custom_items.split(";"));
		for (let i = 0; i < itemIds.length; i++) {
			if (itemIds[i] !== "") {
				$.ajax({
					url: "/api/landlord/item/" + itemIds[i],
					cache: false,
					success: (data) => {
						const itemArray = this.state.items;
						itemArray.push(data);
						this.setState({items: itemArray});
					},
					error: (status) => {
						console.error(status.status, "Couldn't get item info for id " + itemIds[i]); 
					}	
				});
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({roomInfo: nextProps.roomData})
	} 

	dotClicked = (x, y) => {
		for (let i = 0; i < this.state.items.length; i++) {
			if ((this.state.items[i].x == x) && (this.state.items[i].y == y)) {
				this.setState({
					dotIsClicked: true,
					selectedDotObject: this.state.items[i]
				});
			}
		}
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
						<FloorPlanImage clickDot={this.dotClicked}/>
					</div>
					<div className='row'>
						<ControlPanel roomId={this.state.roomInfo.id}/>
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
						<FloorPlanImage clickDot={this.dotClicked} />
						<InfoPanel details={this.state.selectedDotObject} roomId={this.state.roomInfo.id} unselectDot={this.unselectDot}/>
					</div>
					<div className='row'>
						<ControlPanel roomId={this.state.roomInfo.id}/>			
					</div>
				</div>
			);
		}
	}
}

export default App