import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user state based on your MongoDB user schema
interface UserState {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin"; // Enum for 'user' or 'admin'
  profilePicture: string;
  loggedIn: boolean;
}

// Define the initial state of the user
const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  role: "user", // Default role is 'user'
  profilePicture: "",
  loggedIn: false,
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to log in the user
    login: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        role: "user" | "admin";
        profilePicture: string;
      }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.profilePicture = action.payload.profilePicture;
      state.loggedIn = true;
    },
    // Action to log out the user
    logout: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.role = "user";
      state.profilePicture = "";
      state.loggedIn = false;
    },
    // Action to update the profile picture
    updateProfilePicture: (state, action: PayloadAction<string>) => {
      state.profilePicture = action.payload;
    },
  },
});

// Export the actions
export const { login, logout, updateProfilePicture } = userSlice.actions;

// Export the reducer
const userReducer = userSlice.reducer;
export default userReducer;
