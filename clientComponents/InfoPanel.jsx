import React from 'react';

class InfoPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemInfo: props.details,
            roomId: props.roomId,
            selectedCondition: "good",
            description: props.details.description,
            title: props.details.name
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            itemInfo: nextProps.details,
            roomId: nextProps.roomId
        });
    }

    selectCondition = (e) => {
        this.setState({selectedCondition: e.target.value});
    }

    onSaveClick = (e) => {
        //Endpoint is '/api/{id}/update' 
        e.preventDefault();

        let formData = this.state.itemInfo;
        formData.is_default = 1;
        formData.fixable = 0;
        formData.name = this.state.title;
        formData.state = this.state.selectedCondition;
        formData.description = this.state.description;

        $.ajax({
            url: '/api/landlord/item/' + this.state.itemInfo.id + '/update',
            type: 'POST',
            data: JSON.stringify(formData),
			contentType: 'application/json',
            success: (data) => {
                window.alert("sucesss");
            },
            error: (status) => {
                console.error(status.status, 'Couldn\'t get room info for id ' + this.state.roomId);
            } 
        });
        this.props.unselectDot();
    }

    onClearClick = () => {
        this.refs.itemName.value = "";
        this.refs.textarea.value = ""; 
    }

    onCancelClick = () => {
        this.onClearClick();
        this.props.unselectDot();
    }

    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
    }

    updateDescription =(e) => {
        this.setState({description: e.target.value});
    }

    render() {
        return (
            <div className='col-md-6' id='infoForm'>
                <h2>Details Panel</h2>
                <form onSubmit={this.onSaveClick} action="">
                    <label>Item</label>
                    <input className="form-control" ref="itemName" 
                    placeholder="Enter item name" onChange={this.handleTitleChange} 
                    value={this.state.itemInfo.name}/>

                    <label>Item Condition</label>
                    <select className="form-control" onChange={this.selectCondition}>
                        <option ref="good" value="good">Good</option>
                        <option ref="missing" value="missing">Missing</option>
                        <option ref="damaged" value="damaged">Damaged</option>
                    </select>
                  
                    <div className="form-group" id='descriptionDiv'>
                        <label>Description</label>
                        <textarea ref="textarea" className="form-control" rows="3" 
                        value={this.state.description} onChange={this.updateDescription} />
                    </div>
                    <div className='btnInfoPanel' id='btnInfoPanel'>
                        <button type='submit' className='btn btn-primary btn-md'>Save</button>
                        <button type='button' className='btn btn-default btn-md' onClick={this.onClearClick}>Clear</button>
                        <button type='button' className='btn btn-default btn-md' onClick={this.onCancelClick}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default InfoPanel