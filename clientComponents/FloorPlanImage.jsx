import React from 'react';

class FloorPlanImage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='row'>
				<div className='col-md-6'>
					<h2>Floor Plan</h2>
					<img></img>
				</div>
			</div>
		);
	}
}

export default FloorPlanImage