import React from 'react';

class InfoPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemInfo: [],
            roomId: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            itemInfo: nextProps.details,
            roomId: nextProps.roomId
        });
    }

    onSaveClick = (e) => {
        //Endpoint is '/api/{id}/update' 
        e.preventDefault();
        $.ajax({
            url: '/api/' + roomId + '/update',
            cache: false,
            success: (data) => {
                
            },
            error: (status) => {
                console.error(status.status, 'Couldn\'t get room info for id ' + roomId);
            } 
        });
        this.props.unselectDot();
    }

    onClearClick = () => {

    }

    onCancelClick = () => {
        this.props.unselectDot();
    }

    render() {
        return (
            <div className='col-md-6' id='infoForm'>
                <h2>Details Panel</h2>
                <form onSubmit={this.onSaveClick} action="">
                    <label>Item</label>
                    <input className="form-control" placeholder="Enter item name"/>
                    <label className="radio-inline">
                        <input type="checkbox" value="good"/> Good 
                    </label>
                    <label className="radio-inline">
                        <input type="checkbox" value="missing"/> Missing
                    </label>
                    <label className="radio-inline">
                        <input type="checkbox" value="damaged"/> Damaged
                    </label> 
                    <div className="form-group" id='descriptionDiv'>
                        <label>Description</label>
                        <textarea className="form-control" rows="3"></textarea>
                    </div>
                    <label className="btn btn-default btn-file">
                        Browse <input type="file" style={{display: 'none'}}/>
                    </label>
                    <div className='btnInfoPanel' id='btnInfoPanel'>
                        <button type='submit' className='btn btn-primary btn-md'>Save</button>
                        <button type='button' className='btn btn-default btn-md'>Clear</button>
                        <button type='button' className='btn btn-default btn-md'>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default InfoPanel