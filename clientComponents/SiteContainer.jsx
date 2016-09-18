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
            id: "",
            error: ""
        }
    }

    getRoomInfo = () => {   
        $.ajax({
            url: "/api/" + this.state.id,
            cache: false,
            success: (data) => {
                this.setState({roomInfo: data, idEntered: true});
            },
            error: (status) => {
                this.setState({error: "Couldn't get room info for id " + this.state.id});
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
                <div className="input-error">
                    <p className="error">{this.state.error}</p>
                </div>
           );
        }
        else {
            if (this.state.showWelcomeScreen === true) {
                if (this.state.roomInfo.submitted.data[0] === 1) {
                    return (
                        <h4>You have submitted your room condition form.</h4>
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
