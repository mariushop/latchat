Channels = new Mongo.Collection("channels");
Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
  Session.set('subscribedChannelName', 'general');

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });

  Template.messageListTemplate.helpers({
    messages: function(){
      return Messages.find().fetch();
    },
    channels: function(){
      return Channels.find().fetch();
    }
  });

  Template.messageListTemplate.events({
    'click .channel-name': function(e){
      console.log($(e.currentTarget).text());

      Session.set('subscribedChannelName', $(e.currentTarget).text());
      Meteor.subscribe('allMessages', $(e.currentTarget).text());
    }
  });

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

  Meteor.subscribe('allChannels');
  Meteor.subscribe('allMessages', Session.get('subscribedChannelName'));
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Channels.find().count() == 0) {
      var newChannelGeneral = {
          name: "general",
          usersTyping:[]
      }

      var newChannelPrivate = {
          name: "private",
          usersTyping:[]
      }

      Channels.insert(newChannelGeneral);
      Channels.insert(newChannelPrivate);
    };
  });

  Meteor.publish('allChannels', function(){
    return Channels.find();
  });

  Meteor.publish('allMessages', function(subscribedChannelName){
    var channelID = Channels.findOne({name: subscribedChannelName})._id;
    console.log(channelID);
    return Messages.find({channel: channelID});
  });
}
