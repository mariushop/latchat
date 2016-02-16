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