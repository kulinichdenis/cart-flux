var Dispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var localStore = require('./localStore.js');
var storeProduct = require('./storeProduct.js');

var CHANGE_EVENT = 'change';
var _cartStore = [];

var TodoStore = assign({}, EventEmitter.prototype, {

    getAll: function () {
        return _cartStore;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

})
Dispatcher.register(function (payload) {

    switch (payload.eventName) {
        case 'add':
                var ids = '';
                var instance = payload.product;
                instance['quantity'] = 1; //add quantity
                var code = instance['code'];

                var flag = _cartStore.some(function (elem) {
                    if(elem['code'] === code) {
                        ids = elem['id'];
                        return true;
                    }
                })

                if (!flag) {
                    //add to store
                    var id = localStore.add(instance); //add
                    _cartStore.push({code:code, id:id});

                } else {
                    //update
                    var inst = localStore.get(ids);
                    var value = inst.quantity;
                    inst.quantity += 1;
                    localStore.update(ids, inst);
                }
            TodoStore.emitChange();
            break;

        case 'delete':
                _cartStore = _cartStore.filter(function (elem) {
                    if(elem['code'] === payload.code){
                        localStore.remove(elem['id']);
                        return false;
                    }else{
                        return true;
                    }
                })
            TodoStore.emitChange();
            break;
        case 'update':
            _cartStore.forEach(function (element) {
                    if (element['code'] === payload.code) {
                        var inst = localStore.get(element['id'])
                        inst['quantity'] = payload.value;
                        localStore.update(element['id'],inst)
                    }
                })
            TodoStore.emitChange();
            break;
    }
    return true;
})

module.exports = TodoStore;