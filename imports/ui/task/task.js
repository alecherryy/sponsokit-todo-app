import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './task.html';

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.task.events({
  'change .task__done'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.completed);
  },

  'click .task__delete'() {
    Meteor.call('tasks.remove', this._id);
  },

  'click .task__private'() {
    // e.target.dataset.private = 'false';
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
});