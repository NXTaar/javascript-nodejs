const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('config');
const path = require('path');
const assert = require('assert');
const _ = require('lodash');
const mongooseTimestamp = require('lib/mongooseTimestamp');

const schema = new Schema({
  title:      {
    type:      String,
    required:  true,
    trim:      true,
    minlength: 10
  },
  content:    {
    type:     String,
    required: true,
    trim:     true
  },
  // how to count views?
  // we need no google/yandex/etc bots
  viewsCount: {
    type:     Number,
    required: true,
    default: 0
  },
  slug:       { // makeAnchor.js
    type:     String,
    required: true,
    unique:   true
  },
  user:       {
    type: Schema.ObjectId,
    ref:  'User',
    required: true
  },
  created:    {
    type:     Date,
    required: true,
    default:  Date.now
  },
  tags:       [{
    type: Schema.ObjectId,
    ref:  'QaTag'
  }]
});

schema.plugin(mongooseTimestamp, {useVirtual: false});

module.exports = mongoose.model('QaQuestion', schema);
