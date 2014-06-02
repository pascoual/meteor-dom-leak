DOMLeak = {};
DOMLeak.blocs = new Meteor.Collection("blocs");

Router.map(function() {
  this.route('blue', {path: '/', layoutTemplate: 'masterLayout'})
  this.route('red', {layoutTemplate: 'masterLayout'});
});

if (Meteor.isClient) {
  Template.masterLayout.events({
    'click .blue': function () {
      Router.go('blue');
    },
    'click .red': function () {
      Router.go('red');
    }
  });

  Template.domLeak.getBlocs = function () {
    return DOMLeak.blocs.find();
  }

  /*Template.bloc.events({
    'click .bloc': function () {
      alert('U Can\'t Touch This: http://en.wikipedia.org/wiki/U_Can\'t_Touch_This');
    }
  });*/
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (DOMLeak.blocs.find().count() === 0)
      for (var i = 0; i < 1000; i++)
        DOMLeak.blocs.insert({value: i});
  });
}
