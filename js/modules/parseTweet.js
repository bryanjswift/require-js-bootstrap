/*
 * twitter-entities.js
 * This function converts a tweet with "entity" metadata 
 * from plain text to linkified HTML.
 *
 * See the documentation here: http://dev.twitter.com/pages/tweet_entities
 * Basically, add ?include_entities=true to your timeline call
 *
 * Copyright 2010, Wade Simmons
 * Licensed under the MIT license
 * http://wades.im/mons
 *
 * Modified by Bryan J Swift to define as AMD module and use underscore.js
 */
define(['underscore'], function(_) {

  function linkify_entities(tweet) {
    if (!(tweet.entities)) { return _.escape(tweet.text); }
    
    // This is very naive, should find a better way to parse this
    var index_map = {};
    
    _.each(tweet.entities.urls, function(entry, i) {
      index_map[entry.indices[0]] = [
        entry.indices[1],
        function(text) {
          var url = _.escape(entry.url);
          var t = _.escape(text);
          return "<a href='" + url + "'>" + t + "</a>";
        }
      ];
    });
    
    _.each(tweet.entities.hashtags, function(entry, i) {
      index_map[entry.indices[0]] = [
        entry.indices[1],
        function(text) {
          var et = escape("#"+entry.text);
          return "<a href='http://twitter.com/search?q=" + et + "'>" + _.escape(text) + "</a>";
        }
      ];
    });
    
    _.each(tweet.entities.user_mentions, function(entry, i) {
      index_map[entry.indices[0]] = [
        entry.indices[1],
        function(text) {
          var name = _.escape(entry.name);
          var sn = _.escape(entry.screen_name);
          var t = _.escape(text);
          return "<a title='" + name + "' href='http://twitter.com/" + sn + "'>" + t + "</a>";
        }
      ];
    });
    
    var result = "";
    var last_i = 0;
    var i = 0;
    
    // iterate through the string looking for matches in the index_map
    for (i=0; i < tweet.text.length; ++i) {
      var ind = index_map[i];
      if (ind) {
        var end = ind[0];
        var func = ind[1];
        if (i > last_i) {
          result += _.escape(tweet.text.substring(last_i, i));
        }
        result += func(tweet.text.substring(i, end));
        i = end - 1;
        last_i = end;
      }
    }
    
    if (i > last_i) {
      result += _.escape(tweet.text.substring(last_i, i));
    }
    
    return result;
  }

  return linkify_entities;

});
