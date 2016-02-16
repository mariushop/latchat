Meteor.publish('allChannels', function(){
  return Channels.find();
});

Meteor.publish('allMessages', function(subscribedChannelName){
  var channelID = Channels.findOne({name: subscribedChannelName})._id;
  console.log(channelID);
  return Messages.find({channel: channelID});
});

Meteor.publish('userPresence', function() {
  // Setup some filter to find the users your user
  // cares about. It's unlikely that you want to publish the
  // presences of _all_ the users in the system.

  // If for example we wanted to publish only logged in users we could apply:
  // filter = { userId: { $exists: true }};
  var filter = { userId: { $exists: true }};

  return Presences.find(filter, { fields: { state: true, userId: true }});
});

Meteor.publish('allUsers', function() {
  return Meteor.users.find({}, {
    fields: {
      _id: 1,
      username: 1
    }
  });
});
