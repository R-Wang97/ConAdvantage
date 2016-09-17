import React from 'react';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	onClick = () => {
	//more backend stuff
	//authentication stuff
	}

	login = () => {

	}

	render() {
		return(
			<div className='container'>
				<div className='row'>
                    <form onSubmit={this.login}>
						<h1 className='loginText'>Administrator Login</h1>
						<div className='form-group'>
							<label className='txtUsername'>Username</label>
							<input type='username' className='form-control' id='lblUsername' placeholder="Enter Username" required/>
						</div>
						<div className='form-group'>
							<label className='txtPassword'>Password</label>
							<input type='password' className='form-control' id='lblPassword' placeholder="Enter Password" required/>
						</div>
						<button type='button' className='btn btn-primary btn-lg btn-block'>Login</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Login


// onClick={this.props.changeAppState('filter')}