Meteor.publish('allChannels', function(){
  return Channels.find();
});

Meteor.publish('allMessages', function(subscribedChannelName){
  var channelID = Channels.findOne({name: subscribedChannelName})._id;
  console.log(channelID);
  return Messages.find({channel: channelID});
});