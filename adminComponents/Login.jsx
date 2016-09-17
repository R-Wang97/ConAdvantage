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
				<div className='row' id='loginContent'>
                    <form onSubmit={this.login}>
	                    <div className='loginText'>
							<h1>Administrator Login</h1>
							<hr />
						</div>
						<div className='form-group' id='loginUsername'>
							<label className='txtUsername'>Username</label>
							<input type='username' className='form-control' id='lblUsername' placeholder="Enter Username" required/>
						</div>
						<div className='form-group' id='loginPassword'>
							<label className='txtPassword'>Password</label>
							<input type='password' className='form-control' id='lblPassword' placeholder="Enter Password" required/>
						</div>
						<div className='btnLogin'>
							<button type='submit' className='btn btn-primary btn-lg btn-block'>Login</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Login


// onClick={this.props.changeAppState('filter')}