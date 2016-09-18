import React from 'react';

class FloorPlanImage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='col-md-6' id='floorPlan'>
				<h2>Floor Plan</h2>
				<img></img>
			</div>
		);
	}
}

export default FloorPlanImage