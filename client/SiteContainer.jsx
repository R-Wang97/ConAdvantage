import React from 'react';

import Welcome from './Welcome.jsx';

class SiteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWelcomeScreen: true
        }
    }

    changeAppState = (input) => {
        this.setState({showWelcomeScreen: input});
    }

	render() {
        if (this.state.showWelcomeScreen === true) {
            return (
                <div>
                    <Welcome/>
                </div>
            );
        }
        else {
            return (
                <p>Don't show Welcome Screen</p>
            );
        }
	}
}

export default SiteContainer;