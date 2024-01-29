import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    loading: false,
    adminChannel: null
  },
  reducers: {
    channelsRequest(state, action) {
      return {
        ...state,
        loading: true
      }
    },
    channelsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        adminChannel: action.payload.channel,
      }
    },
    channelsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },
  }
});

const { actions, reducer } = channelSlice;

export const {
  channelsRequest,
  channelsSuccess,
  channelsFail,
} = actions;

export default reducer;

