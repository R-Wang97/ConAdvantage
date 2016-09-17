import React from 'react';

class InfoPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemInfo: [],
			roomId: ""
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			itemInfo: nextProps.details,
			roomId: nextProps.roomId
		});
	}

	onSaveClick = () => {
		//Endpoint is "/api/{id}/update" 
		$.ajax({
			url: "/api/" + roomId + "/update",
			cache: false,
			success: (data) => {
				
			},
			error: (status) => {
				console.error(status.status, "Couldn't get room info for id " + roomId)
			} 
		});
		this.props.unselectDot();
	}

	onClearClick = () => {

	}

	onCancelClick = () => {
		this.props.unselectDot();
	}

	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export default InfoPanel