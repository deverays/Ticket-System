"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _suggestion = _interopRequireDefault(require("../modals/suggestion.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(interaction) {
  if (interaction.customId == "suggestion") (0, _suggestion["default"])(interaction);
};

exports["default"] = _default;