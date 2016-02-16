Template.userListTemplate.helpers({
  onlineUsers: function(){
    return Presences.find().fetch();
  },
  getUserById: function(userId) {
    return Meteor.users.findOne({_id: userId}).username;
  }
});

Template.userListTemplate.onCreated(function () {
  var self = this;

  // Use self.subscribe with the data context reactively
  self.autorun(function () {
    self.subscribe("userPresence");
    self.subscribe("allUsers");
  });
});
