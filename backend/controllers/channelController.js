const Channel = require('../models/channelModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');

//Get Channels - /api/v1/channels
exports.getChannels = catchAsyncError(async (req, res, next) => {

  let channels = await Channel.find({
    members: { $in: [req.user.id] }
  }).populate('members')
    .populate('messages')
    .lean({ virtuals: true }).exec();

  for (let i = 0; i < channels.length; i++) {
    channels[i].recepient = channels[i].members.find(m => m.id !== req.user.id)
    channels[i].latestMessage = await Message
      .findOne({ channel: channels[i]._id })
      .sort({ createdAt: 'desc' })
      .limit(1)
      .lean({ virtuals: true });
  }

  res.status(200).json({
    success: true,
    channels
  })
})

//Create Channel - /api/v1/channels/findOrCreate
exports.findOrCreate = catchAsyncError(async (req, res, next) => {
  const { recepientId, recepientEmail } = req.body;
  let recepient;

  if (recepientEmail) {
    recepient = await User.findOne({ email: recepientEmail });
  }

  if (!recepient && recepientId) {
    recepient = await User.findOne({ _id: recepientId });
  }

  if (recepient) {
    req.body.members = [req.user.id, recepient._id];

    if (req.user.id === recepient._id.toString()) {
      return res.status(400).json({
        error: { message: 'Cannot create a chat channel for yourself..! ' }
      });
    }

    let channel = await Channel.findOne({
      $or: [{ members: [req.user.id, recepient._id] }, { members: [recepient._id, req.user.id] }]
    });

    if (!channel) {
      channel = await Channel.create({ ...req.body, createdBy: req.user.id });

      return res.status(201).json({
        success: true,
        channel
      });
    } else {
      return res.status(200).json({
        success: true,
        channel: channel
      });
    }
  } else {
    return res.status(200).json({
      success: true,
    });
  }
});

exports.acceptInvite = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let channel = await Channel.findById(id);

  if (!channel)
    return res.status(404).json({
      success: false,
      message: 'Record not found!'
    });

  channel.status = 'active';
  await channel.save();

  return res.status(200).json({
    success: true,
    channel: channel
  });
});

// Create chat channel with Admin
exports.adminFindOrCreate = catchAsyncError(async (req, res, next) => {
  const adminUser = await User.findOne({
    role: 'admin'
  });

  if (!adminUser) {
    return res.status(400).json({
      message: 'Admin user not found..!'
    });
  }

  if (req.user.id === adminUser.id) {
    return res.status(400).json({
      success: false,
      error: { message: 'Cannot create members with same id' }
    });
  }

  req.body.members = [req.user.id, adminUser.id];

  let channel = await Channel.findOne({
    members: [req.user.id, adminUser.id]
  });

  if (!channel) {
    channel = await Channel.create(req.body);

    return res.status(201).json({
      success: true,
      channel
    });
  } else {
    return res.status(200).json({
      success: true,
      channel: channel
    });
  }
});


// //Get Single Channel - api/v1/Channel/:id
// exports.getSingleChannel = catchAsyncError(async (req, res, next) => {
//   const Channel = await Channel.findById(req.params.id).populate('reviews.user', 'name email');

//   if (!Channel) {
//     return next(new ErrorHandler('Channel not found', 400));
//   }

//   res.status(201).json({
//     success: true,
//     Channel
//   })
// })

// //Update Channel - api/v1/Channel/:id
// exports.updateChannel = catchAsyncError(async (req, res, next) => {
//   let Channel = await Channel.findById(req.params.id);

//   //uploading images
//   let images = []

//   //if images not cleared we keep existing images
//   if (req.body.imagesCleared === 'false') {
//     images = Channel.images;
//   }
//   let BASE_URL = process.env.BACKEND_URL;
//   if (process.env.NODE_ENV === "channelion") {
//     BASE_URL = `${req.protocol}://${req.get('host')}`
//   }

//   if (req.files.length > 0) {
//     req.files.forEach(file => {
//       let url = `${BASE_URL}/uploads/Channel/${file.originalname}`;
//       images.push({ image: url })
//     })
//   }


//   req.body.images = images;

//   if (!Channel) {
//     return res.status(404).json({
//       success: false,
//       channel: "Channel not found"
//     });
//   }

//   Channel = await Channel.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   })

//   res.status(200).json({
//     success: true,
//     Channel
//   })

// })

// //Delete Channel - api/v1/Channel/:id
// exports.deleteChannel = catchAsyncError(async (req, res, next) => {
//   const Channel = await Channel.findById(req.params.id);

//   if (!Channel) {
//     return res.status(404).json({
//       success: false,
//       channel: "Channel not found"
//     });
//   }

//   await Channel.remove();

//   res.status(200).json({
//     success: true,
//     channel: "Channel Deleted!"
//   })

// })
