var React = require("react");
//Component
var CartComponent = require("./CartComponent");
var ShopComponent = require("./ShopComponent");
//STORE
var shopeProduct = require('../stores/storeProduct');
var cartStore = require('../stores/cartStore');
var localStore = require('../stores/localStore');

function getProduct(){
    return shopeProduct.getAll();
}
function getCartAll(){
    return cartStore.getAll().map(function(element){
        return localStore.get(element['id']);
    })
}

var AppComponent = React.createClass({

    getInitialState: function () {
        return {
            item: getCartAll(),       //[]
            products: getProduct()
        };
    },

    componentDidMount:function(){
        cartStore.addChangeListener(this._onChange);
    },

    componentWillUnmount:function(){
        cartStore.removeChangeListener(this._onChange);
    },

    render: function () {
        return (
            <div>
                <div className='shop'>
                    <ShopComponent products={this.state.products} />
                </div>
                <div className='cart'>
                    <CartComponent cart={this.state.item} />
                </div>
            </div>
        )
    },
    _onChange: function() {
        this.setState({item:getCartAll(), products: this.state.products});
    }

})


module.exports = AppComponent;
