import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    showProfileModal: false,
    showChatInviteModal: false
  },
  reducers: {
    closeProfileModal(state, action) {
      return {
        ...state,
        showProfileModal: false
      }
    },
    openProfileModal(state, action) {
      return {
        ...state,
        showProfileModal: true
      }
    },
    closeChatInviteModal(state, action) {
      return {
        ...state,
        showChatInviteModal: false
      }
    },
    openChatInviteModal(state, action) {
      return {
        ...state,
        showChatInviteModal: true
      }
    }
  }
});

const { actions, reducer } = layoutSlice;

export const {
  openProfileModal,
  closeProfileModal,
  openChatInviteModal,
  closeChatInviteModal,
} = actions;

export default reducer;

