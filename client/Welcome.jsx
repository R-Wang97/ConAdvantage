import React from 'react';

class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Test',
			roomNum: 'Test123',
			roomType: 'TestBond'
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			name: nextProps.roomData.name,
			roomNum: nextProps.roomData.roomNum,
			roomType: nextProps.roomData.roomType
		});
	}

	render() {
		return (
			<div className='container-fluid'>
				<div className='contents'>
					<div className='row' id='welcomePageName'>
						<div className='col-md-10'>
							<h1>Room Condition Form</h1>
							<hr />
						</div>
					</div>
					<div className='row' id='welcomeTenantInfo'>
						<div className='col-md-10'>
							<h3>Hello {this.state.name}</h3>
							<h3>Your Room Number is: {this.state.roomNum}</h3>
							<h3>Your Room Type: {this.state.roomType}</h3>
						</div>
					</div>
					<div className='row' id='welcomeConfirmInfo'>
						<div className='col-md-10'>
							<h5>If this information is correct please proceed to the next page.
							If this is not you please contact ~~~~~~~~~~</h5> 
						</div>
					</div>
					<div className='row' id='welcomeButton'>
						<div className='col-md-6 text-centered'>
							<button type='button' className='btn btn-primary btn-lg btn-block' onClick={this.props.changeAppState}>Continue to Form</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Welcome