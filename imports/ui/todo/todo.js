import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../../api/tasks';

import './todo.html';
import '../task/task';

Template.todo.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.todo.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ completed: { $ne: true } });
    }

    if (instance.state.get('showCurrentUserTasks')) {
      // Hide tasks from other users
      return Tasks.find({ owner: { $eq: Meteor.userId() } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find();
  },

  completedCount() {
    return Tasks.find({ completed: { $eq: true } }).count();
  },

  totalCount() {
    return Tasks.find().count();
  },
});

Template.todo.events({
  'click .todo__btn'(e) {
    // Prevent default browser form submit
    e.preventDefault();

    // // Get value from form element
    const button = e.target;
    const form = button.previousElementSibling;

    // // Insert a task into the collection
    Meteor.call('tasks.insert', form.firstElementChild.value);

    // // Clear form
    form.reset();
  },

  'click .todo__btn'(e) {
    // Prevent default browser form submit
    e.preventDefault();

    // // Get value from form element
    const button = e.target;
    const form = button.previousElementSibling;

    // // Insert a task into the collection
    Meteor.call('tasks.insert', form.firstElementChild.value);

    // // Clear form
    form.reset();
  },

  'change .todo__input--completed'(e, instance) {
    instance.state.set('hideCompleted', e.target.checked);
  },

  'change .todo__input--yours'(e, instance) {
    instance.state.set('showCurrentUserTasks', e.target.checked);
  },
});