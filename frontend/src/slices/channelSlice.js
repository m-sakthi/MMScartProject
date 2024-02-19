import { createSlice } from "@reduxjs/toolkit";

const channelLoading = Array(4).fill({ isLoading: true });
const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    loading: false,
    adminChannel: null,
    loadingChannels: false,
    loadingCreate: false,
    loadingAcceptInvite: false,
    channels: channelLoading,
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
    channelsListRequest(state, action) {
      return {
        ...state,
        loadingChannels: true,
        channels: channelLoading
      }
    },
    channelsListSuccess(state, action) {
      return {
        ...state,
        loadingChannels: false,
        channels: action.payload.channels,
        selectedChannel: action.payload.channels[0]
      }
    },
    channelsListFail(state, action) {
      return {
        ...state,
        loadingChannels: false,
        channelsError: action.payload
      }
    },
    channelsCreateRequest(state, action) {
      return {
        ...state,
        loadingCreate: true,
      }
    },
    channelsCreateSuccess(state, action) {
      return {
        ...state,
        loadingCreate: false,
        channelCreateError: null
      }
    },
    channelsCreateFail(state, action) {
      return {
        ...state,
        loadingCreate: false,
        channelCreateError: action.payload
      }
    },
    setSelectedChannel(state, action) {
      return {
        ...state,
        selectedChannel: action.payload
      }
    },
    loadAcceptInvite(state, action) {
      return {
        ...state,
        loadingAcceptInvite: true,
      }
    },
    setAcceptInvite(state, action) {
      const channels = state.channels.map(c => c._id === action.payload._id ? { ...c, status: 'active' } : c)
      return {
        ...state,
        loadingAcceptInvite: false,
        selectedChannel: channels.find(c => c._id === action.payload._id),
        channels
      }
    },
    updateChannelLastMessage(state, action) {
      const channels = state.channels.map(c => c._id === action.payload.channel ? { ...c, status: 'active', latestMessage: action.payload } : c)
      const selectedChannel = state.selectedChannel._id === action.payload.channel ? channels.find(c => c._id === action.payload.channel) : state.selectedChannel
      return {
        ...state,
        loadingAcceptInvite: false,
        selectedChannel,
        channels
      }
    },
    errorAcceptInvite(state, action) {
      return {
        ...state,
        loadingAcceptInvite: false,
      }
    }
  }
});

const { actions, reducer } = channelSlice;

export const {
  channelsRequest,
  channelsSuccess,
  channelsFail,
  channelsListRequest,
  channelsListSuccess,
  channelsListFail,
  channelsCreateRequest,
  channelsCreateSuccess,
  channelsCreateFail,
  setSelectedChannel,
  loadAcceptInvite,
  setAcceptInvite,
  errorAcceptInvite,
  updateChannelLastMessage,
} = actions;

export default reducer;

