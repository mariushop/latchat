if (Meteor.isClient) {
  //configure signup options
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });

  //code related to messagesTemplate
  Template.messagesTemplate.helpers({
    messages: function(){
      return Messages.find().fetch();
    },
    isTyping: function(){
      return Channels.find({name:"general"}).fetch()[0];
    }
  });

  //code related to inputTemplate
  Template.inputTemplate.events({
    "submit #messageForm": function(event){
      event.preventDefault();
      var message = $("#messageInput").val();
      if (message.trim() == "") {
        return;
      };
      var newMessage = {
        from: Meteor.user().username,
        timestamp: Date.now(),
        message:message
      }
      Messages.insert(newMessage);
      $("#messageInput").val("")
    },
    "keydown #messageInput": function() {
      var timeout;
      var generalChannel = Channels.find({name:"general"}).fetch();
      var generalChannelId = generalChannel[0]._id;
      var usersTyping = generalChannel[0].isTyping;
      var username = Meteor.user().username;
      if (usersTyping.indexOf(username) < 0) {          
          Channels.update({_id: generalChannelId}, {$push:{
            isTyping: username
          }});
        }
      if (timeout){
        clearTimeout(timeout);
      }
      timeout = setTimeout(function(){
        if (usersTyping.indexOf(username) > -1) {          
          Channels.update({_id: generalChannelId}, {$pull:{
            isTyping: username
          }});
        }
      },1000);
    } 
  });
}

//define Mongo Collections
Messages = new Mongo.Collection("messages");
Channels = new Mongo.Collection("channels");

//code that runs on server
if (Meteor.isServer) {
  // code to run on server at startup
  Meteor.startup(function () {
    if (Channels.find().count() == 0) {
      var newChannel = {
          name: "general",
          isTyping:[]
      }
      Channels.insert(newChannel);
    };
  });
}
