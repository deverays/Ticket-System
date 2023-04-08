"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteOne = exports.update = exports.fetchAll = exports.fetch = void 0;

var _guilds_Schema = _interopRequireDefault(require("./guilds_Schema.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetch = function fetch(guild_id) {
  var guild_db;
  return regeneratorRuntime.async(function fetch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_guilds_Schema["default"].findOne({
            guild_id: guild_id
          }));

        case 2:
          guild_db = _context.sent;

          if (!guild_db) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", guild_db);

        case 7:
          guild_db = new _guilds_Schema["default"]({
            guild_id: guild_id
          });
          _context.next = 10;
          return regeneratorRuntime.awrap(guild_db.save());

        case 10:
          return _context.abrupt("return", guild_db);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.fetch = fetch;

var fetchAll = function fetchAll() {
  var filter,
      guild_db,
      _args2 = arguments;
  return regeneratorRuntime.async(function fetchAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          filter = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          _context2.next = 3;
          return regeneratorRuntime.awrap(_guilds_Schema["default"].find(filter));

        case 3:
          guild_db = _context2.sent;
          return _context2.abrupt("return", guild_db);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.fetchAll = fetchAll;

var update = function update(guild_id, update_value) {
  return regeneratorRuntime.async(function update$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_guilds_Schema["default"].updateOne({
            guild_id: guild_id
          }, update_value, {
            upsert: true
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.update = update;

var deleteOne = function deleteOne(guild_id) {
  return regeneratorRuntime.async(function deleteOne$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _guilds_Schema["default"].deleteOne({
            guild_id: guild_id
          });

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deleteOne = deleteOne;