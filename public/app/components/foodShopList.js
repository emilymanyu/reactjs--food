var ReactDOM = require('react-dom');
var React = require('react');
var api =  require ('./stubAPI').api; 
var buttons = require('./buttonsConfig' ).buttons ;

    var FoodShopListForm = React.createClass({
       getInitialState : function() {
               return {
                addname: "",
                add_address: "",
                add_phone_number: ""
               } ;
            },
        handlerAdd: function(e){
          e.preventDefault();
          var name = this.state.addname.trim();
          var address = this.state.add_address.trim();
          var phone_number = this.state.add_phone_number.trim();
          if (!name || !address || !phone_number) {
                  return;
          }
          this.props.addHandler(name,address,phone_number);
          this.setState({addname: "",add_address: "",add_phone_number: ""});
        },
        handleNameChange: function(e) {
                this.setState({addname: e.target.value});
        },
        handleAddressChange: function(e) {
           this.setState({add_address: e.target.value});
        },
        handlePhoneNumChange: function(e) {
           this.setState({add_phone_number: e.target.value});
        },
        render: function(){
          return (
            <tr>
              <td key={'addname'}>
              <input type="text" className="form-control" onChange={this.handleNameChange} value={this.state.addname} />
              </td>
              <td key={'add_address'}>
              <input type="text" className="form-control" onChange={this.handleAddressChange} value={this.state.add_address} />
              </td>
              <td key={'add_phone_number'}>
              <input type="text" className="form-control" onChange={this.handlePhoneNumChange} value={this.state.add_phone_number}/>
              </td>
              <td>
              <input type="button" className="btn btn-primary" value="Add" onClick={this.handlerAdd}/>
              </td>
            </tr>
            )
        }
      });

    var FoodShopList = React.createClass({
      getInitialState : function() {
               return {
                status : '',
                name: this.props.foodShopLists.name,
                address: this.props.foodShopLists.address,
                phone_number: this.props.foodShopLists.phone_number
               } ;
            },
             handleEdit : function() {
                 this.setState({ status : 'edit'} )
            },    
            handleCancel : function() {
                 this.setState({ status : '', 
                         name: this.props.foodShopLists.name,
                         address: this.props.foodShopLists.address,
                         phone_number: this.props.foodShopLists.phone_number} ) ;
            }, 
            handleDelete :function(e) {
              e.preventDefault();
              this.props.deleteHandler(this.props.foodShopLists.phone_number)
              this.setState({status : ''} )
            },
           handleSave : function(e) {
                e.preventDefault();
                var name = this.state.name.trim();
                var address = this.state.address.trim();
                var phone_number = this.state.phone_number.trim();
                if (!name || !address || !phone_number) {
                  return;
                }
                this.props.updateHandler(this.props.foodShopLists.phone_number,
                         name,address,phone_number);
                this.setState({status : ''} )
            }, 
            handleNameChange: function(e) {
                this.setState({name: e.target.value});
            },
            handleAddressChange: function(e) {
               this.setState({address: e.target.value});
            },
            handlePhoneNumChange: function(e) {
               this.setState({phone_number: e.target.value});
            },
          render: function(){
               var activeButtons = buttons.normal ;
               var leftButtonHandler = this.handleEdit ;
               var rightButtonHandler = this.handleDelete ;
               var fields = [
                     <td key={'name'} >{this.props.foodShopLists.name}</td>,
                      <td key={'address'}>{this.props.foodShopLists.address}</td>,
                      <td key={'phone_number'}>{this.props.foodShopLists.phone_number}</td>
                   ] ;
              if (this.state.status == 'edit' ) {
                 activeButtons = buttons.edit ;
                 leftButtonHandler = this.handleSave;
                 rightButtonHandler = this.handleCancel ;
                 fields = [
                    <td key={'name'}><input type="text" className="form-control"
                       value={this.state.name}
                       onChange={this.handleNameChange} /> </td>,
                    <td key={'address'}><input type="text" className="form-control"
                       value={this.state.address}
                       onChange={this.handleAddressChange} /> </td>,
                    <td key={'phone_number'}><input type="text" className="form-control"
                       value={this.state.phone_number}
                       onChange={this.handlePhoneNumChange} /> </td>,
                 ] ;
              }
              return (
                    <tr >
                      {fields}
                      <td>
                          <input type="button" className={'btn ' + activeButtons.leftButtonColor} 
                                 value={activeButtons.leftButtonVal}
                                 onClick={leftButtonHandler} />
                      </td>
                      <td>
                         <input type="button" className={'btn ' + activeButtons.rightButtonColor} 
                               value={activeButtons.rightButtonVal} 
                               onClick={rightButtonHandler} />
                      </td>
                      </tr>
                   ) ;
                }
          });

    var FoodShopListList = React.createClass({
          render: function(){
               var foodShopListRows = this.props.foodShopLists.map(function(foodShopList){
                    return (
                     <FoodShopList key={foodShopList.phone_number}  foodShopLists={foodShopList} 
                        updateHandler={this.props.updateHandler } deleteHandler={this.props.deleteHandler} />
                      ) ;
                  }.bind(this) );
              return (
                  <tbody >
                      {foodShopListRows}
                      <FoodShopListForm addHandler={this.props.addHandler} />
                  </tbody>
                ) ;
            }
          });

    var FoodShopListsTable = React.createClass({
          render: function(){
              return (
                <table className="table table-bordered">
                      <thead>
                        <tr>
                        <th>Shop Name</th>
                        <th>Shop Address</th>
                        <th>Shop Manager Number</th>
                        <th></th>
                        <th></th>
                        </tr>
                      </thead>
                      <FoodShopListList foodShopLists={this.props.foodShopLists} 
                            updateHandler={this.props.updateHandler}  deleteHandler={this.props.deleteHandler} addHandler={this.props.addHandler}/>
                </table>
                );
          }
      });

       var FoodShopListsApp = React.createClass({
          updateFoodShopList : function(key,n,a,p) {
                   api.update(key,n,a,p) ;
                   this.setState({});               
          }, 
          deleteFoodShopList : function(key){
                api.delete(key) ;
                this.setState({});
          },
          addFoodShopList : function(n,a,p){
                api.add(n,a,p) ;
                this.setState({});
          },
	      	render: function(){
            var foodShopLists = api.getAll() ;
	          return (
	                <div>
	                   <div id = "foodshoplist">
                          <br />
                          <h1>Food Shop List</h1>
                          <br />
                          <br />
                        </div>
	                   <FoodShopListsTable foodShopLists={foodShopLists} 
                        updateHandler={this.updateFoodShopList} deleteHandler={this.deleteFoodShopList} addHandler={this.addFoodShopList} /> 
	                </div>
	          );
	      }
	  });

exports.FoodShopListsApp = FoodShopListsApp ;