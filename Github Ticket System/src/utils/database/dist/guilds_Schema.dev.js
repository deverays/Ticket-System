"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _mongoose["default"].model("guilds", new _mongoose["default"].Schema({
  guild_id: {
    type: String,
    unique: true,
    required: true
  },
  test: {
    type: String,
    "default": "test"
  }
}));

exports["default"] = _default;