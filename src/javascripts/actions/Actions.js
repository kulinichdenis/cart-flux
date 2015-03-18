var Dispatcher = require('../dispatcher/AppDispatcher.js');

var Actions = {
    update:function(code, value){
        Dispatcher.dispatch({
            eventName: 'update',
            code: code, //this.props.product.code, // example data
            value: parseInt(value, 10)
        });
    },

    delete:function(code){
        Dispatcher.dispatch({
            eventName: 'delete',
            code: code //this.props.product.code // example data
        });
    },

    addClick:function(product){
        Dispatcher.dispatch({
            eventName: 'add',
            product: product // example data
        });
    }

}

module.exports = Actions;
