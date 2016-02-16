Template.inputTemplate.events({
  "submit .addMessageForm": function(e) {
    e.preventDefault();

    var channelID = Channels.findOne({name: Session.get('subscribedChannelName')})._id;
    console.log(channelID);

    var message = {
      user: Meteor.user().username,
      time: new Date(),
      message: $('#msg').val(),
      channel: channelID
    }

    Messages.insert(message);

    $('#msg').val("");
  }
});