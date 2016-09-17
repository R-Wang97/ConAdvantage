import React from 'react';

import Welcome from './Welcome.jsx';
import App from './App.jsx'

const idLength = 8;

class SiteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idEntered: false,
            showWelcomeScreen: true,
            roomInfo: {},
            id: ""
        }
    }

    componentDidMount() {
        this.getRoomInfo();
    }

    getRoomInfo = () => {   
        // const url = window.location.href
        // const id = url.substr(url.length - 8);
        $.ajax({
            url: "/api/" + this.state.id,
            cache: false,
            success: (data) => {
                this.setState({roomInfo: data, idEntered: true});
            },
            error: (status) => {
                console.error(status.status, "Couldn't get room info for id " + id); 
            }
        });
    }

    changeAppState = () => {
        this.setState({showWelcomeScreen: !this.state.showWelcomeScreen});
    }

    onChange = (e) => {
        this.setState({id: e.target.value});
    }

	render() {
        if (this.state.idEntered === false) {
            return (
                <div className="input-group">
                    <input type="text" onChange={this.onChange} value={this.state.id} className="form-control" placeholder="Enter ID"></input>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.getRoomInfo}>Search</button>
                    </span>
                </div>
            );
        }
        else {
            if (this.state.showWelcomeScreen === true) {
                if (this.state.roomInfo.submitted === 1) {
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
}

export default SiteContainer;