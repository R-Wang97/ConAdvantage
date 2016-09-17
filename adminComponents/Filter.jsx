import React from 'react';

class Filter extends React.component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className='container'>
				<div className='row' id='filter1'>
					<label className='col-md-4' id='itemSelect'>
						<select>
							<option value='item1'>Item1</option>
							<option value='item2'>Item2</option>
							<option value='item3'>Item3</option>
							<option value='item4'>Item4</option>
						</select>
					</label>
					<label className='col-md-4' id='conditionSelect'>
						<select>
							<option value='good'>Good</option>
							<option value='missing'>Missing</option>
							<option value='damaged'>Damaged</option>							
						</select>
					</label>
				</div>
				<div className='row' id='buttonBar'>
					{/* Add onClick for these two buttons. */}
					<button type='button' className='btn btn-primary btn-md'>Search</button>
                    <button type='button' className='btn btn-default btn-md'>Clear</button>
				</div>
			</div>
		);
	}
}

export default Filter