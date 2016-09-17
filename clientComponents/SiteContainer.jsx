import React from 'react';

import Welcome from './Welcome.jsx';
import App from './App.jsx'

class SiteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWelcomeScreen: false,
            roomInfo: {},
            responseSubmitted: false
        }
    }

    componentDidMount() {
        this.getRoomInfo();
    }

    getRoomInfo = () => {   
        //get {id} from window.location.href
        const id = "";
        $.ajax({
            url: "/api/" + id,
            cache: false,
            success: (data) => {
                this.setState({roomInfo: data, responseSubmitted: false});
            },
            error: (status) => {
                console.error(status.status, "Couldn't get room info for id " + id); 
            }
        });
    }

    changeAppState = () => {
        this.setState({showWelcomeScreen: !this.state.showWelcomeScreen});
    }

	render() {
        if (this.state.showWelcomeScreen === true) {
            if (this.state.responseSubmitted === true) {
                return (
                    <h4>You have already submitted your room condition form.</h4>
                );
            }
            return (
                <div>
                    <Welcome changeAppState={this.changeAppState} roomData={this.state.roomInfo}/>
                </div>
            );
        }
        return (
            <div>
                <App roomData={this.state.roomInfo} />
            </div>
        );
	}
}

export default SiteContainer;