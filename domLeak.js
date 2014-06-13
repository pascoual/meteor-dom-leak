DOMLeak = {};
DOMLeak.blocs = new Meteor.Collection("blocs");

if (Meteor.isClient) {
  Meteor.startup(function () {Session.set("color", "blue");});
  Template.masterLayout.events({
    'click .blue': function () {
      Session.set("color", "blue");
    },
    'click .red': function () {
      Session.set("color", "red");
    }
  });

  Template.domLeak.getBlocs = function () {
    return DOMLeak.blocs.find();
  }

  /*Template.blue.destroyed =
  Template.red.destroyed = function () {
    console.log("destroyed");
  }*/

  Template.masterLayout.isBlue = function () {
    return Session.equals("color", "blue");
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (DOMLeak.blocs.find().count() === 0)
      for (var i = 0; i < 1000; i++)
        DOMLeak.blocs.insert({value: i});
  });
}
