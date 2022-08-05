import jwt from "jwt-decode";

export const LOGOUT = "LOGOUT";
export const LOGGED_IN = "LOGGED_IN";
export const FETCH_DATA = "FETCH_DATA";
export const POST_DATA = "POST_DATA";
export const DELETE_DATA = "DELETE_DATA";
export const PATCH_DATA = "PATCH_DATA";

const BASE_URL = "http://192.168.1.8:5000/";

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};

export const login = (data) => {
  console.log(data);
  return (dispatch) => {
    fetch(BASE_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          const user = jwt(res.returnedToken);
          console.log("token decoded", user);
          localStorage.setItem("bearer", res.returnedToken);

          dispatch({
            type: LOGGED_IN,
            payload: { userId: user.id, loggedIn: res.success },
          });
        }
      });
  };
};

export const postTodo = (value, id) => {
  console.log("post called", value);
  return (dispatch) => {
    fetch(BASE_URL + "taskAssignment/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: POST_DATA, payload: data });
      });
  };
};
export const deleteTodo = (id) => {
  console.log("delete called", id);
  return (dispatch) => {
    fetch(BASE_URL + "taskDel/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch({ type: DELETE_DATA, payload: id });
        }
      });
  };
};
export const patchTodo = (value) => {
  console.log("patch called", value);
  return (dispatch) => {
    fetch(BASE_URL + "taskDone/" + value._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ done: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("patch response", data);
        dispatch({ type: PATCH_DATA, payload: data });
      });
  };
};
export const fetchTodo = (id) => {
  console.log("fetch called");
  return (dispatch) => {
    fetch(BASE_URL + "userSpecificTasks/" + id)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: FETCH_DATA, payload: data });
        console.log(data);
      });
  };
};
