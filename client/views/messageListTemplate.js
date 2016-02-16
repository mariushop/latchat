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
    // Meteor.subscribe('allMessages', $(e.currentTarget).text());
  }
});


Template.messageListTemplate.onCreated(function () {
  var self = this;
  var i = 1;

  // Use self.subscribe with the data context reactively
  self.autorun(function () {
    self.subscribe("allMessages", Session.get('subscribedChannelName'));
    console.log(i + ' happened');
    i++;
  });
});