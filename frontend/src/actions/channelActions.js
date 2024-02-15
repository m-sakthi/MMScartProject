import axios from 'axios';
import {
  channelsCreateRequest,
  channelsCreateSuccess,
  channelsCreateFail,
  channelsListRequest,
  channelsListSuccess,
  channelsListFail,
  loadAcceptInvite,
  setAcceptInvite,
  errorAcceptInvite,
} from '../slices/channelSlice';

import { saveSocketID, addNewMessage } from '../slices/messageSlice';
import { closeChatInviteModal } from '../slices/layoutSlice';

// import 

export const getChannels = async (dispatch) => {
  try {
    dispatch(channelsListRequest())
    const { data } = await axios.get(`/api/v1/channels`)
    dispatch(channelsListSuccess(data))
  } catch (error) {
    dispatch(channelsListFail(error.response.data.message))
  }
}


export const findOrCreateChannel = params => async (dispatch) => {
  try {
    dispatch(channelsCreateRequest())
    const { data } = await axios.put(`/api/v1/channels/findOrCreate`, params)
    dispatch(channelsCreateSuccess(data))
    dispatch(getChannels)
    dispatch(closeChatInviteModal())
  } catch (error) {
    dispatch(channelsCreateFail(error.response.data.message))
  }
}

export const acceptInvite = id => async (dispatch) => {

  console.log('****** acceptInvite :', id);
  try {
    dispatch(loadAcceptInvite())
    const { data } = await axios.put(`/api/v1/channels/${id}/accept`);
    dispatch(setAcceptInvite(data.channel))
  } catch (error) {
    console.log('********* error', error);
    dispatch(errorAcceptInvite())
  }
}

// export const findOrCreateAdminChannel = async (dispatch) => {
//   try {
//     dispatch(channelsRequest())
//     const { data } = await axios.put(`/api/v1/channels/adminFindOrCreate`)
//     dispatch(channelsSuccess(data))
//     console.log('*******  channelsSuccess data', data);
//     // Get all the messages once channel is fetched
//     dispatch(getMessages(data.channel._id));
//   } catch (error) {
//     dispatch(channelsFail(error.response.data.message))
//   }
// }

export const newMessageReceived = params => async (dispatch) => {
  if (params.data) {
    dispatch(addNewMessage(params.data));
  }
}

export const saveSocketDetail = socketID => async (dispatch) => {
  dispatch(saveSocketID(socketID));
};
