import React from 'react';

class Filter extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className='container'>
				<div id='filterContent'>
					<div className='row' id='filterText'>
						<h1>Filter Settings</h1>
						<hr />
					</div>
					<div className='row' id='filter1'>
						<label className='col-md-4' id='buildingSelect'>
							Building:
							<select>
								<option value='T1'>T1</option>
								<option value='T2'>T2</option>							
							</select>
						</label>
						<label className='col-md-4' id='itemSelect'>
							Item:
							<select>
								<option value='item1'>Item1</option>
								<option value='item2'>Item2</option>
								<option value='item3'>Item3</option>
								<option value='item4'>Item4</option>
							</select> 
						</label>
						<label className='col-md-4' id='conditionSelect'>
							Condition:
							<select>
								<option value='good'>Good</option>
								<option value='missing'>Missing</option>
								<option value='damaged'>Damaged</option>							
							</select>
						</label>
					</div>
					<div className='row' id='btnFilter'>
						{/* Add onClick for button */}
						<button type='button' className='btn btn-primary btn-block'>Search</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Filter