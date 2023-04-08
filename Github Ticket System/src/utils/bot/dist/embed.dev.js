"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _discord = require("discord.js");

var _default = function _default(description) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#5f7fcf";
  var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  if (color == "RED") color = "#e64c4c";else if (color == "GREEN") color = "#67eb74";else if (color == "INFO") color = "#dbd160";
  var response = new _discord.MessageEmbed().setDescription(description).setColor(color).setTitle(title);
  return response;
};

exports["default"] = _default;