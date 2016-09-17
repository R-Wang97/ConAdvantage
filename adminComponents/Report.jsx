import React from 'react'

class Report extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className='container'>
				<div className='reportContent'>
					<div className='reportText'>
						<h1>Condition Results</h1>
						<hr />
					</div>
					<table>
						<tr>
							<th>Room #</th>
							<th>Room Type</th>
							<th>Item</th>
							<th>Condition</th>
							<th>Description</th>
						</tr>
						<tr>
							<td>123</td>
							<td>Bond</td>
							<td>Couch</td>
							<td>Missing</td>
							<td>Couch is no where to be seen.</td>
						</tr>
					</table>
				</div>
			</div>
		);
	}
	
}

export default Report