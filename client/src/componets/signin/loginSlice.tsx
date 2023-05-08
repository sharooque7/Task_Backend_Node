import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import { router } from "../../app/router/route";
import { User } from "../../app/model/user";
import agent from "../../app/api/agent";
import { useNavigate } from "react-router-dom";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FormData>(
  "signInUser",
  async (data, thunkAPI) => {
    try {
      const userdata = {
        email: data.get("email"),
        password: data.get("password"),
      };
      const graphqlQuery = {
        query: `
mutation {
  login(input:{email:"${userdata.email}",password:"${userdata.password}"}) {
    message
    token
    user {
      emailid
      id
    }
    statusCode
    error {
      statusCode
      message
    }
  }
}`,
      };
      const user: any = await agent.singlepoint.api(graphqlQuery);
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      return user;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      //   router.navigate("/");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(signInUser.fulfilled), (state, action: any) => {
      console.log(action.payload.data.login);
      state.user = action.payload.data.login;
    });
    builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
      throw action.payload;
    });
  },
});
export const { signOut, setUser } = loginSlice.actions;
