import React from 'react';

import Welcome from './Welcome.jsx';
import App from './App.jsx'

class SiteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWelcomeScreen: true,
            roomInfo: [],
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
                this.setState({roomInfo: data});
            },
            error: (status) => {
                console.error(status.status, "Couldn't get room info for id " + id); 
            }
        });
    }

    changeAppState = (input) => {
        this.setState({showWelcomeScreen: input});
    }

	render() {
        if (this.state.showWelcomeScreen === true) {
            return (
                <div>
                    <Welcome changeAppState={this.changeAppState} roomData={this.state.roomInfo}/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <p>Don't show Welcome Screen</p>
                    <App roomData={this.state.roomInfo} />
                </div>
            );
        }
	}
}

export default SiteContainer;