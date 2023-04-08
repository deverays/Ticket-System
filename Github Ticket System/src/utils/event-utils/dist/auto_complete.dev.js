"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(interaction) {
  if (interaction.commandName == "yardım") {
    var focusedValue = interaction.options.getFocused();
    var choices = Array.from(interaction.client.commands.keys());
    var filtered = choices.filter(function (choice) {
      return choice.startsWith(focusedValue);
    });
    var result = filtered.map(function (choice) {
      return {
        name: choice,
        value: choice
      };
    });
    interaction.respond(result);
  }
};

exports["default"] = _default;