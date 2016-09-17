import React from 'react';

class loginScreen extends React.component {
	constructor(props) {
		super(props);
	}

	onClick = () => {
	//more backend stuff
	//authentication stuff
	}

	render() {
		return(
			<div className='container'>
				<div className='row'>
				{/* change on onSubmit later, based on backend*/}
                    <form onSubmit='authenticate'>
						<h1 className='loginText'>Administrator Login</h1>
						<div className='form-group'>
							<label className='txtUsername'>Username</label>
							<input type='username' class='form-control' id='lblUsername' placeholder="Enter Username" required/>
						</div>
						<div className='form-group'>
							<label for='pwd' className='txtPassword'>Password</label>
							<input type='password' class='form-control' id='lblPassword' placeholder="Enter Password" required/>
						</div>
						<button type='button' className='btn btn-primary btn-lg btn-block' onClick={this.props.changeAppState('filter')}>Login >></button>
					</form>
				</div>
			</div>
		);
	}
}

export default loginScreen