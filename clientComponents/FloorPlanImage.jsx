import React from 'react';

class FloorPlanImage extends React.Component {
	constructor(props) {
		super(props);
	}

	mapClickList = (e) => {
		const coords = e.target.coords.split(',');
		console.log(coords[0], coords[1]);
		this.props.dotClicked(coords[0], coords[1]);
	}

	render() {
		return (
			<div className='col-md-6' id='floorPlan'>
				<h2>Floor Plan</h2>
				<img src='resources/images/Bond.png' height='386.4px' width='285.6' useMap='bondMap' />

				<map name='bondMap'>
				  <area shape="circle" id="bed" coords="246,80,7" onClick={this.mapClickList} />
				  <area shape="circle" id="shower" coords="254,166,7" onClick={this.mapClickList} />
				  <area shape="circle" id="counter" coords="41,217,7" onClick={this.mapClickList} />
				  <area shape="circle" id="couch" coords="32,324,7" onClick={this.mapClickList} />
				  <area shape="circle" id="coffeeTable" coords="82,325,7" onClick={this.mapClickList} />
				</map>
			</div>
		);
	}
}

export default FloorPlanImage