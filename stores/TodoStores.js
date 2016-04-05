import Reflux from 'reflux'
import TodoActions from '../actions/TodoActions'

export default Reflux.createStore({
    items: [{'name':'11111'}, {'name':'22222'}],

    listenables: [TodoActions],

    onAddItem(model) {
      console.log(3);
      this.items.unshift(model);
      this.trigger(this.items);
    },

    onDeleteItem(model,index) {
        console.log(6);
        this.items.splice(index, 1);
        this.trigger(this.items);
    },

    onUpdata(model,index) {
        console.log(8);
        this.trigger(this.items);
    },

    onGetAll() {
      console.log(4);
      this.trigger(this.items);
    }

});