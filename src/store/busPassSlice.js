import { createSlice } from "@reduxjs/toolkit";

const getStoredApplication = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user?.empId) return null;
  const stored = localStorage.getItem(`busPass_${user.empId}`);
  return stored ? JSON.parse(stored) : null;
};

const initialState = {
  application: getStoredApplication(),
};

const busPassSlice = createSlice({
  name: "busPass",
  initialState,
  reducers: {
    saveApplication(state, action) {
      state.application = action.payload;
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.empId) {
        localStorage.setItem(`busPass_${user.empId}`, JSON.stringify(action.payload));
      }
    },
    loadApplication(state, action) {
      state.application = action.payload;
    },
  },
});


export const { saveApplication, loadApplication } = busPassSlice.actions;
export default busPassSlice.reducer;
