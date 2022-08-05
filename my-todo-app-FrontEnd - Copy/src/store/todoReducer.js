import * as actions from "../actions/action";

const initialState = {
  todos: [],
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_DATA: {
      return { todos: action.payload };
    }
    case actions.POST_DATA: {
      const newTodo = [...state.todos, action.payload];
      return { todos: newTodo };
    }
    case actions.DELETE_DATA: {
      const Todos = [...state.todos];
      const newTodos = Todos.filter((data) => data._id !== action.payload);
      return { todos: newTodos };
    }
    case actions.PATCH_DATA: {
      // const doneObject = {
      //   id: action.payload.id,
      //   text: action.payload.text,
      //   done: true,
      // };
      console.log("patch payload", action.payload);
      const newTodo = state.todos.map((item) => {
        console.log("ids", item._id, action.payload._id);
        return item._id === action.payload._id ? action.payload : item;
      });
      return { todos: newTodo };
    }

    default:
      return state;
  }
};

export default todoReducer;
