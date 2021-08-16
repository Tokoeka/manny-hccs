(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/libram/dist/combat.js":
/*!********************************************!*\
  !*** ./node_modules/libram/dist/combat.js ***!
  \********************************************/
/*! namespace exports */
/*! export Macro [provided] [no usage info] [missing usage info prevents renaming] */
/*! export adventureMacro [provided] [no usage info] [missing usage info prevents renaming] */
/*! export adventureMacroAuto [provided] [no usage info] [missing usage info prevents renaming] */
/*! export banishedMonsters [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMacroId [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMacroId": () => /* binding */ getMacroId,
/* harmony export */   "Macro": () => /* binding */ Macro,
/* harmony export */   "banishedMonsters": () => /* binding */ banishedMonsters,
/* harmony export */   "adventureMacro": () => /* binding */ adventureMacro,
/* harmony export */   "adventureMacroAuto": () => /* binding */ adventureMacroAuto
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./property */ "./node_modules/libram/dist/property.js");
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-string */ "./node_modules/libram/dist/template-string.js");
var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
};

var __spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};




var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name Script Autoattack Macro.
 * @returns {number} The macro ID.
 */

function getMacroId() {
  var macroMatches = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"" + MACRO_NAME + "\"]/@value");

  if (macroMatches.length === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=0&name=" + MACRO_NAME + "&macrotext=abort&action=save");
    return parseInt((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)(newMacroText, "//input[@name=macroid]/@value")[0], 10);
  } else {
    return parseInt(macroMatches[0], 10);
  }
}

function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? Item.get(itemOrName) : itemOrName;
}

function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return item.name;
  }
}

function itemOrItemsBallsMacroPredicate(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(" && ");
  } else {
    return "hascombatitem " + itemOrItems;
  }
}

function skillOrNameToSkill(skillOrName) {
  if (typeof skillOrName === "string") {
    return Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) ? skill.name : (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(skill);
}
/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */


var Macro =
/** @class */
function () {
  function Macro() {
    this.components = [];
  }
  /**
   * Convert macro to string.
   */


  Macro.prototype.toString = function () {
    return this.components.join(";");
  };
  /**
   * Save a macro to a Mafia property for use in a consult script.
   */


  Macro.prototype.save = function () {
    (0,_property__WEBPACK_IMPORTED_MODULE_1__.set)(Macro.SAVED_MACRO_PROPERTY, this.toString());
  };
  /**
   * Load a saved macro from the Mafia property.
   */


  Macro.load = function () {
    var _a;

    return (_a = new this()).step.apply(_a, (0,_property__WEBPACK_IMPORTED_MODULE_1__.get)(Macro.SAVED_MACRO_PROPERTY).split(";"));
  };
  /**
   * Clear the saved macro in the Mafia property.
   */


  Macro.clearSaved = function () {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.removeProperty)(Macro.SAVED_MACRO_PROPERTY);
  };
  /**
   * Statefully add one or several steps to a macro.
   * @param nextSteps The steps to add to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.step = function () {
    var _a;

    var nextSteps = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      nextSteps[_i] = arguments[_i];
    }

    var nextStepsStrings = (_a = []).concat.apply(_a, nextSteps.map(function (x) {
      return x instanceof Macro ? x.components : [x];
    }));

    this.components = __spreadArrays(this.components, nextStepsStrings.filter(function (s) {
      return s.length > 0;
    }));
    return this;
  };
  /**
   * Statefully add one or several steps to a macro.
   * @param nextSteps The steps to add to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.step = function () {
    var _a;

    var nextSteps = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      nextSteps[_i] = arguments[_i];
    }

    return (_a = new this()).step.apply(_a, nextSteps);
  };
  /**
   * Submit the built macro to KoL. Only works inside combat.
   */


  Macro.prototype.submit = function () {
    var _final = this.toString();

    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("fight.php?action=macro&macrotext=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(_final), true, true);
  };
  /**
   * Set this macro as a KoL native autoattack.
   */


  Macro.prototype.setAutoAttack = function () {
    if (Macro.cachedMacroId === null) Macro.cachedMacroId = getMacroId();

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getAutoAttack)() === 99000000 + Macro.cachedMacroId && this.toString() === Macro.cachedAutoAttack) {
      // This macro is already set. Don"t make the server request.
      return;
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=" + Macro.cachedMacroId + "&name=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(MACRO_NAME) + "&macrotext=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(this.toString()) + "&action=save", true, true);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account.php?am=1&action=autoattack&value=" + (99000000 + Macro.cachedMacroId) + "&ajax=1");
    Macro.cachedAutoAttack = this.toString();
  };
  /**
   * Add an "abort" step to this macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.abort = function () {
    return this.step("abort");
  };
  /**
   * Create a new macro with an "abort" step.
   * @returns {Macro} This object itself.
   */


  Macro.abort = function () {
    return new this().abort();
  };
  /**
   * Add an "if" statement to this macro.
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.if_ = function (condition, ifTrue) {
    return this.step("if " + condition).step(ifTrue).step("endif");
  };
  /**
   * Create a new macro with an "if" statement.
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.if_ = function (condition, ifTrue) {
    return new this().if_(condition, ifTrue);
  };
  /**
   * Add a "while" statement to this macro.
   * @param condition The BALLS condition for the if statement.
   * @param contents Loop to repeat while the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.while_ = function (condition, contents) {
    return this.step("while " + condition).step(contents).step("endwhile");
  };
  /**
   * Create a new macro with a "while" statement.
   * @param condition The BALLS condition for the if statement.
   * @param contents Loop to repeat while the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.while_ = function (condition, contents) {
    return new this().while_(condition, contents);
  };
  /**
   * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
   * @param condition The JS condition.
   * @param ifTrue Continuation to add if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.externalIf = function (condition, ifTrue) {
    return condition ? this.step(ifTrue) : this;
  };
  /**
   * Create a new macro with a condition evaluated at the time of building the macro.
   * @param condition The JS condition.
   * @param ifTrue Continuation to add if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.externalIf = function (condition, ifTrue) {
    return new this().externalIf(condition, ifTrue);
  };
  /**
   * Add a repeat step to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.repeat = function () {
    return this.step("repeat");
  };
  /**
   * Add one or more skill cast steps to the macro.
   * @param skills Skills to cast.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.skill = function () {
    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return this.step.apply(this, skills.map(function (skill) {
      return "skill " + skillBallsMacroName(skill);
    }));
  };
  /**
   * Create a new macro with one or more skill cast steps.
   * @param skills Skills to cast.
   * @returns {Macro} This object itself.
   */


  Macro.skill = function () {
    var _a;

    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return (_a = new this()).skill.apply(_a, skills);
  };
  /**
   * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
   * @param skills Skills to try casting.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.trySkill = function () {
    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return this.step.apply(this, skills.map(function (skill) {
      return Macro.if_("hasskill " + skillBallsMacroName(skill), Macro.skill(skill));
    }));
  };
  /**
   * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
   * @param skills Skills to try casting.
   * @returns {Macro} This object itself.
   */


  Macro.trySkill = function () {
    var _a;

    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return (_a = new this()).trySkill.apply(_a, skills);
  };
  /**
   * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
   * @param skills Skills to try repeatedly casting.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.trySkillRepeat = function () {
    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return this.step.apply(this, skills.map(function (skill) {
      return Macro.if_("hasskill " + skillBallsMacroName(skill), Macro.skill(skill).repeat());
    }));
  };
  /**
   * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
   * @param skills Skills to try repeatedly casting.
   * @returns {Macro} This object itself.
   */


  Macro.trySkillRepeat = function () {
    var _a;

    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return (_a = new this()).trySkillRepeat.apply(_a, skills);
  };
  /**
   * Add one or more item steps to the macro.
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.item = function () {
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return this.step.apply(this, items.map(function (itemOrItems) {
      return "use " + itemOrItemsBallsMacroName(itemOrItems);
    }));
  };
  /**
   * Create a new macro with one or more item steps.
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.item = function () {
    var _a;

    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return (_a = new this()).item.apply(_a, items);
  };
  /**
   * Add one or more item steps to the macro, where each step checks to see if you have the item first.
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.tryItem = function () {
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return this.step.apply(this, items.map(function (item) {
      return Macro.if_("hascombatitem " + itemOrItemsBallsMacroPredicate(item), "use " + itemOrItemsBallsMacroName(item));
    }));
  };
  /**
   * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.tryItem = function () {
    var _a;

    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return (_a = new this()).tryItem.apply(_a, items);
  };
  /**
   * Add an attack step to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.attack = function () {
    return this.step("attack");
  };
  /**
   * Create a new macro with an attack step.
   * @returns {Macro} This object itself.
   */


  Macro.attack = function () {
    return new this().attack();
  };

  Macro.SAVED_MACRO_PROPERTY = "libram_savedMacro";
  Macro.cachedMacroId = null;
  Macro.cachedAutoAttack = null;
  return Macro;
}();


function banishedMonsters() {
  var banishedstring = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("banishedMonsters");
  var banishedComponents = banishedstring.split(":");
  var result = new Map();
  if (banishedComponents.length < 3) return result;

  for (var idx = 0; idx < banishedComponents.length / 3 - 1; idx++) {
    var foe = Monster.get(banishedComponents[idx * 3]);
    var banisher = banishedComponents[idx * 3 + 1]; // toItem doesn"t error if the item doesn"t exist, so we have to use that.

    var banisherItem = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)(banisher);
    var banisherObject = [(0,_template_string__WEBPACK_IMPORTED_MODULE_2__.$item)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["none"], ["none"]))), null].includes(banisherItem) ? Skill.get(banisher) : banisherItem;
    result.set(banisherObject, foe);
  }

  return result;
}
/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */

function adventureMacro(loc, macro) {
  macro.save();

  try {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)(loc, 0, "");

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inMultiFight)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runCombat)();
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.choiceFollowsFight)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */

function adventureMacroAuto(loc, autoMacro, nextMacro) {
  if (nextMacro === void 0) {
    nextMacro = null;
  }

  nextMacro = nextMacro !== null && nextMacro !== void 0 ? nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  adventureMacro(loc, nextMacro);
}
var templateObject_1;

/***/ }),

/***/ "./node_modules/libram/dist/console.js":
/*!*********************************************!*\
  !*** ./node_modules/libram/dist/console.js ***!
  \*********************************************/
/*! namespace exports */
/*! export error [provided] [no usage info] [missing usage info prevents renaming] */
/*! export info [provided] [no usage info] [missing usage info prevents renaming] */
/*! export log [provided] [no usage info] [missing usage info prevents renaming] */
/*! export warn [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "log": () => /* binding */ log,
/* harmony export */   "info": () => /* binding */ info,
/* harmony export */   "warn": () => /* binding */ warn,
/* harmony export */   "error": () => /* binding */ error
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
 // eslint-disable-next-line @typescript-eslint/no-explicit-any

var logColor = function logColor(color) {
  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var output = args.map(function (x) {
      return x.toString();
    }).join(" ");

    if (color) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(output, color);
    } else {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(output);
    }
  };
};

var log = logColor();
var info = logColor("blue");
var warn = logColor("red");
var error = logColor("red");

/***/ }),

/***/ "./node_modules/libram/dist/property.js":
/*!**********************************************!*\
  !*** ./node_modules/libram/dist/property.js ***!
  \**********************************************/
/*! namespace exports */
/*! export createMafiaClassPropertyGetter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createPropertyGetter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export get [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getBoolean [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getBounty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getClass [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getCoinmaster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getCommaSeparated [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFamiliar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getLocation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMonster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getNumber [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getPhylum [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getServant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getSkill [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getSlot [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getStat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getString [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getThrall [provided] [no usage info] [missing usage info prevents renaming] */
/*! export set [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPropertyGetter": () => /* binding */ createPropertyGetter,
/* harmony export */   "createMafiaClassPropertyGetter": () => /* binding */ createMafiaClassPropertyGetter,
/* harmony export */   "getString": () => /* binding */ getString,
/* harmony export */   "getCommaSeparated": () => /* binding */ getCommaSeparated,
/* harmony export */   "getBoolean": () => /* binding */ getBoolean,
/* harmony export */   "getNumber": () => /* binding */ getNumber,
/* harmony export */   "getBounty": () => /* binding */ getBounty,
/* harmony export */   "getClass": () => /* binding */ getClass,
/* harmony export */   "getCoinmaster": () => /* binding */ getCoinmaster,
/* harmony export */   "getEffect": () => /* binding */ getEffect,
/* harmony export */   "getElement": () => /* binding */ getElement,
/* harmony export */   "getFamiliar": () => /* binding */ getFamiliar,
/* harmony export */   "getItem": () => /* binding */ getItem,
/* harmony export */   "getLocation": () => /* binding */ getLocation,
/* harmony export */   "getMonster": () => /* binding */ getMonster,
/* harmony export */   "getPhylum": () => /* binding */ getPhylum,
/* harmony export */   "getServant": () => /* binding */ getServant,
/* harmony export */   "getSkill": () => /* binding */ getSkill,
/* harmony export */   "getSlot": () => /* binding */ getSlot,
/* harmony export */   "getStat": () => /* binding */ getStat,
/* harmony export */   "getThrall": () => /* binding */ getThrall,
/* harmony export */   "get": () => /* binding */ get,
/* harmony export */   "set": () => /* binding */ set
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _propertyTyping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./propertyTyping */ "./node_modules/libram/dist/propertyTyping.js");


var createPropertyGetter = function createPropertyGetter(transform) {
  return function (property, default_) {
    var value = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(property);

    if (default_ !== undefined && value === "") {
      return default_;
    }

    return transform(value, property);
  };
};
var createMafiaClassPropertyGetter = function createMafiaClassPropertyGetter(Type) {
  return createPropertyGetter(function (value) {
    var v = Type.get(value);
    return v === Type.get("none") ? null : v;
  });
};
var getString = createPropertyGetter(function (value) {
  return value;
});
var getCommaSeparated = createPropertyGetter(function (value) {
  return value.split(/, ?/);
});
var getBoolean = createPropertyGetter(function (value) {
  return value === "true";
});
var getNumber = createPropertyGetter(function (value) {
  return Number(value);
});
var getBounty = createMafiaClassPropertyGetter(Bounty);
var getClass = createMafiaClassPropertyGetter(Class);
var getCoinmaster = createMafiaClassPropertyGetter(Coinmaster);
var getEffect = createMafiaClassPropertyGetter(Effect);
var getElement = createMafiaClassPropertyGetter(Element);
var getFamiliar = createMafiaClassPropertyGetter(Familiar);
var getItem = createMafiaClassPropertyGetter(Item);
var getLocation = createMafiaClassPropertyGetter(Location);
var getMonster = createMafiaClassPropertyGetter(Monster);
var getPhylum = createMafiaClassPropertyGetter(Phylum);
var getServant = createMafiaClassPropertyGetter(Servant);
var getSkill = createMafiaClassPropertyGetter(Skill);
var getSlot = createMafiaClassPropertyGetter(Slot);
var getStat = createMafiaClassPropertyGetter(Stat);
var getThrall = createMafiaClassPropertyGetter(Thrall);
function get(property, _default) {
  var value = getString(property);

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isMonsterProperty)(property)) {
    return getMonster(property, _default);
  }

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isLocationProperty)(property)) {
    return getLocation(property, _default);
  }

  if (value === "") {
    return _default === undefined ? "" : _default;
  }

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isBooleanProperty)(property, value)) {
    return getBoolean(property, _default);
  }

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isNumericProperty)(property, value)) {
    return getNumber(property, _default);
  }

  return value;
}
function set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(property, stringValue);
}

/***/ }),

/***/ "./node_modules/libram/dist/propertyTyping.js":
/*!****************************************************!*\
  !*** ./node_modules/libram/dist/propertyTyping.js ***!
  \****************************************************/
/*! namespace exports */
/*! export isBooleanProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isLocationProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isMonsterProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isNumericProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNumericProperty": () => /* binding */ isNumericProperty,
/* harmony export */   "isBooleanProperty": () => /* binding */ isBooleanProperty,
/* harmony export */   "isLocationProperty": () => /* binding */ isLocationProperty,
/* harmony export */   "isMonsterProperty": () => /* binding */ isMonsterProperty
/* harmony export */ });
function isNumericProperty(property, value) {
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
}
var fakeBooleans = ["trackVoteMonster", "_jickJarAvailable"];
function isBooleanProperty(property, value) {
  if (fakeBooleans.includes(property)) return false;
  return ["true", "false"].includes(value);
}
var otherLocations = ["nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom"];
function isLocationProperty(property) {
  return otherLocations.includes(property) || property.endsWith("Location");
}
var otherMonsters = ["romanticTarget"];
function isMonsterProperty(property) {
  if (otherMonsters.includes(property)) return true;
  return property.endsWith("Monster");
}

/***/ }),

/***/ "./node_modules/libram/dist/template-string.js":
/*!*****************************************************!*\
  !*** ./node_modules/libram/dist/template-string.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export $bounties [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $bounty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $class [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $classes [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $coinmaster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $coinmasters [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $effect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $effects [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $element [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $elements [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $familiar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $familiars [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $item [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $items [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $location [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $locations [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $monster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $monsters [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $phyla [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $phylum [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $servant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $servants [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $skill [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $skills [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $slot [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $slots [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $stat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $stats [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $thrall [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $thralls [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$bounty": () => /* binding */ $bounty,
/* harmony export */   "$bounties": () => /* binding */ $bounties,
/* harmony export */   "$class": () => /* binding */ $class,
/* harmony export */   "$classes": () => /* binding */ $classes,
/* harmony export */   "$coinmaster": () => /* binding */ $coinmaster,
/* harmony export */   "$coinmasters": () => /* binding */ $coinmasters,
/* harmony export */   "$effect": () => /* binding */ $effect,
/* harmony export */   "$effects": () => /* binding */ $effects,
/* harmony export */   "$element": () => /* binding */ $element,
/* harmony export */   "$elements": () => /* binding */ $elements,
/* harmony export */   "$familiar": () => /* binding */ $familiar,
/* harmony export */   "$familiars": () => /* binding */ $familiars,
/* harmony export */   "$item": () => /* binding */ $item,
/* harmony export */   "$items": () => /* binding */ $items,
/* harmony export */   "$location": () => /* binding */ $location,
/* harmony export */   "$locations": () => /* binding */ $locations,
/* harmony export */   "$monster": () => /* binding */ $monster,
/* harmony export */   "$monsters": () => /* binding */ $monsters,
/* harmony export */   "$phylum": () => /* binding */ $phylum,
/* harmony export */   "$phyla": () => /* binding */ $phyla,
/* harmony export */   "$servant": () => /* binding */ $servant,
/* harmony export */   "$servants": () => /* binding */ $servants,
/* harmony export */   "$skill": () => /* binding */ $skill,
/* harmony export */   "$skills": () => /* binding */ $skills,
/* harmony export */   "$slot": () => /* binding */ $slot,
/* harmony export */   "$slots": () => /* binding */ $slots,
/* harmony export */   "$stat": () => /* binding */ $stat,
/* harmony export */   "$stats": () => /* binding */ $stats,
/* harmony export */   "$thrall": () => /* binding */ $thrall,
/* harmony export */   "$thralls": () => /* binding */ $thralls
/* harmony export */ });
var __spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var concatTemplateString = function concatTemplateString(literals) {
  var placeholders = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    placeholders[_i - 1] = arguments[_i];
  }

  return literals.reduce(function (acc, literal, i) {
    return acc + literal + (placeholders[i] || "");
  }, "");
};

var createSingleConstant = function createSingleConstant(Type) {
  return function (literals) {
    var placeholders = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      placeholders[_i - 1] = arguments[_i];
    }

    var input = concatTemplateString.apply(void 0, __spreadArrays([literals], placeholders));
    return Type.get(input);
  };
};

var createPluralConstant = function createPluralConstant(Type) {
  return function (literals) {
    var placeholders = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      placeholders[_i - 1] = arguments[_i];
    }

    var input = concatTemplateString.apply(void 0, __spreadArrays([literals], placeholders));

    if (input === "") {
      return Type.all();
    }

    return Type.get(input.split(","));
  };
};
/**
 * A Bounty specified by name.
 */


var $bounty = createSingleConstant(Bounty);
/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 */

var $bounties = createPluralConstant(Bounty);
/**
 * A Class specified by name.
 */

var $class = createSingleConstant(Class);
/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 */

var $classes = createPluralConstant(Class);
/**
 * A Coinmaster specified by name.
 */

var $coinmaster = createSingleConstant(Coinmaster);
/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 */

var $coinmasters = createPluralConstant(Coinmaster);
/**
 * An Effect specified by name.
 */

var $effect = createSingleConstant(Effect);
/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 */

var $effects = createPluralConstant(Effect);
/**
 * An Element specified by name.
 */

var $element = createSingleConstant(Element);
/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 */

var $elements = createPluralConstant(Element);
/**
 * A Familiar specified by name.
 */

var $familiar = createSingleConstant(Familiar);
/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 */

var $familiars = createPluralConstant(Familiar);
/**
 * An Item specified by name.
 */

var $item = createSingleConstant(Item);
/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 */

var $items = createPluralConstant(Item);
/**
 * A Location specified by name.
 */

var $location = createSingleConstant(Location);
/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 */

var $locations = createPluralConstant(Location);
/**
 * A Monster specified by name.
 */

var $monster = createSingleConstant(Monster);
/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 */

var $monsters = createPluralConstant(Monster);
/**
 * A Phylum specified by name.
 */

var $phylum = createSingleConstant(Phylum);
/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 */

var $phyla = createPluralConstant(Phylum);
/**
 * A Servant specified by name.
 */

var $servant = createSingleConstant(Servant);
/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 */

var $servants = createPluralConstant(Servant);
/**
 * A Skill specified by name.
 */

var $skill = createSingleConstant(Skill);
/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 */

var $skills = createPluralConstant(Skill);
/**
 * A Slot specified by name.
 */

var $slot = createSingleConstant(Slot);
/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 */

var $slots = createPluralConstant(Slot);
/**
 * A Stat specified by name.
 */

var $stat = createSingleConstant(Stat);
/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 */

var $stats = createPluralConstant(Stat);
/**
 * A Thrall specified by name.
 */

var $thrall = createSingleConstant(Thrall);
/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 */

var $thralls = createPluralConstant(Thrall);

/***/ }),

/***/ "./src/hccs.ts":
/*!*********************!*\
  !*** ./src/hccs.ts ***!
  \*********************/
/*! namespace exports */
/*! export testDone [provided] [maybe used in hccs (runtime-defined)] [usage prevents renaming] */
/*! export withMacro [provided] [maybe used in hccs (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in hccs (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "testDone": () => /* binding */ testDone,
/* harmony export */   "withMacro": () => /* binding */ withMacro
/* harmony export */ });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/combat.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var libram_dist_console__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libram/dist/console */ "./node_modules/libram/dist/console.js");
function _templateObject555() {
  var data = _taggedTemplateLiteral(["astral pilsner"]);

  _templateObject555 = function _templateObject555() {
    return data;
  };

  return data;
}

function _templateObject554() {
  var data = _taggedTemplateLiteral(["9140"]);

  _templateObject554 = function _templateObject554() {
    return data;
  };

  return data;
}

function _templateObject553() {
  var data = _taggedTemplateLiteral(["Trick-or-Treating Tot"]);

  _templateObject553 = function _templateObject553() {
    return data;
  };

  return data;
}

function _templateObject552() {
  var data = _taggedTemplateLiteral(["Steely-Eyed Squint"]);

  _templateObject552 = function _templateObject552() {
    return data;
  };

  return data;
}

function _templateObject551() {
  var data = _taggedTemplateLiteral(["Feeling Lost"]);

  _templateObject551 = function _templateObject551() {
    return data;
  };

  return data;
}

function _templateObject550() {
  var data = _taggedTemplateLiteral(["7323"]);

  _templateObject550 = function _templateObject550() {
    return data;
  };

  return data;
}

function _templateObject549() {
  var data = _taggedTemplateLiteral(["sauceror"]);

  _templateObject549 = function _templateObject549() {
    return data;
  };

  return data;
}

function _templateObject548() {
  var data = _taggedTemplateLiteral(["pastamancer"]);

  _templateObject548 = function _templateObject548() {
    return data;
  };

  return data;
}

function _templateObject547() {
  var data = _taggedTemplateLiteral(["peppermint twist"]);

  _templateObject547 = function _templateObject547() {
    return data;
  };

  return data;
}

function _templateObject546() {
  var data = _taggedTemplateLiteral(["peppermint sprout"]);

  _templateObject546 = function _templateObject546() {
    return data;
  };

  return data;
}

function _templateObject545() {
  var data = _taggedTemplateLiteral(["peppermint sprout"]);

  _templateObject545 = function _templateObject545() {
    return data;
  };

  return data;
}

function _templateObject544() {
  var data = _taggedTemplateLiteral(["Synthesis: Collection"]);

  _templateObject544 = function _templateObject544() {
    return data;
  };

  return data;
}

function _templateObject543() {
  var data = _taggedTemplateLiteral(["items.enh"]);

  _templateObject543 = function _templateObject543() {
    return data;
  };

  return data;
}

function _templateObject542() {
  var data = _taggedTemplateLiteral(["The Spirit of Taking"]);

  _templateObject542 = function _templateObject542() {
    return data;
  };

  return data;
}

function _templateObject541() {
  var data = _taggedTemplateLiteral(["Singer's Faithful Ocelot"], ["Singer\\'s Faithful Ocelot"]);

  _templateObject541 = function _templateObject541() {
    return data;
  };

  return data;
}

function _templateObject540() {
  var data = _taggedTemplateLiteral(["Fat Leon's Phat Loot Lyric"], ["Fat Leon\\'s Phat Loot Lyric"]);

  _templateObject540 = function _templateObject540() {
    return data;
  };

  return data;
}

function _templateObject539() {
  var data = _taggedTemplateLiteral(["There's No N In Love"], ["There\\'s No N In Love"]);

  _templateObject539 = function _templateObject539() {
    return data;
  };

  return data;
}

function _templateObject538() {
  var data = _taggedTemplateLiteral(["Reflex Hammer"]);

  _templateObject538 = function _templateObject538() {
    return data;
  };

  return data;
}

function _templateObject537() {
  var data = _taggedTemplateLiteral(["Become a Bat"]);

  _templateObject537 = function _templateObject537() {
    return data;
  };

  return data;
}

function _templateObject536() {
  var data = _taggedTemplateLiteral(["The Neverending Party"]);

  _templateObject536 = function _templateObject536() {
    return data;
  };

  return data;
}

function _templateObject535() {
  var data = _taggedTemplateLiteral(["vampyric cloake"]);

  _templateObject535 = function _templateObject535() {
    return data;
  };

  return data;
}

function _templateObject534() {
  var data = _taggedTemplateLiteral(["Lil' Doctor&trade; Bag"], ["Lil\\' Doctor&trade; Bag"]);

  _templateObject534 = function _templateObject534() {
    return data;
  };

  return data;
}

function _templateObject533() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject533 = function _templateObject533() {
    return data;
  };

  return data;
}

function _templateObject532() {
  var data = _taggedTemplateLiteral(["Bat-Adjacent Form"]);

  _templateObject532 = function _templateObject532() {
    return data;
  };

  return data;
}

function _templateObject531() {
  var data = _taggedTemplateLiteral(["Human-Pirate Hybrid"]);

  _templateObject531 = function _templateObject531() {
    return data;
  };

  return data;
}

function _templateObject530() {
  var data = _taggedTemplateLiteral(["KGB tranquilizer dart"]);

  _templateObject530 = function _templateObject530() {
    return data;
  };

  return data;
}

function _templateObject529() {
  var data = _taggedTemplateLiteral(["DNA extraction syringe"]);

  _templateObject529 = function _templateObject529() {
    return data;
  };

  return data;
}

function _templateObject528() {
  var data = _taggedTemplateLiteral(["Pirates of the Garbage Barges"]);

  _templateObject528 = function _templateObject528() {
    return data;
  };

  return data;
}

function _templateObject527() {
  var data = _taggedTemplateLiteral(["Pirates of the Garbage Barges"]);

  _templateObject527 = function _templateObject527() {
    return data;
  };

  return data;
}

function _templateObject526() {
  var data = _taggedTemplateLiteral(["Pirates of the Garbage Barges"]);

  _templateObject526 = function _templateObject526() {
    return data;
  };

  return data;
}

function _templateObject525() {
  var data = _taggedTemplateLiteral(["Pirates of the Garbage Barges"]);

  _templateObject525 = function _templateObject525() {
    return data;
  };

  return data;
}

function _templateObject524() {
  var data = _taggedTemplateLiteral(["Pirates of the Garbage Barges"]);

  _templateObject524 = function _templateObject524() {
    return data;
  };

  return data;
}

function _templateObject523() {
  var data = _taggedTemplateLiteral(["familiar scrapbook"]);

  _templateObject523 = function _templateObject523() {
    return data;
  };

  return data;
}

function _templateObject522() {
  var data = _taggedTemplateLiteral(["offhand"]);

  _templateObject522 = function _templateObject522() {
    return data;
  };

  return data;
}

function _templateObject521() {
  var data = _taggedTemplateLiteral(["Kremlin's Greatest Briefcase"], ["Kremlin\\'s Greatest Briefcase"]);

  _templateObject521 = function _templateObject521() {
    return data;
  };

  return data;
}

function _templateObject520() {
  var data = _taggedTemplateLiteral(["acc1"]);

  _templateObject520 = function _templateObject520() {
    return data;
  };

  return data;
}

function _templateObject519() {
  var data = _taggedTemplateLiteral(["Human-Pirate Hybrid"]);

  _templateObject519 = function _templateObject519() {
    return data;
  };

  return data;
}

function _templateObject518() {
  var data = _taggedTemplateLiteral(["baby bugged bugbear"]);

  _templateObject518 = function _templateObject518() {
    return data;
  };

  return data;
}

function _templateObject517() {
  var data = _taggedTemplateLiteral(["bugged beanie"]);

  _templateObject517 = function _templateObject517() {
    return data;
  };

  return data;
}

function _templateObject516() {
  var data = _taggedTemplateLiteral(["exotic parrot"]);

  _templateObject516 = function _templateObject516() {
    return data;
  };

  return data;
}

function _templateObject515() {
  var data = _taggedTemplateLiteral(["cracker"]);

  _templateObject515 = function _templateObject515() {
    return data;
  };

  return data;
}

function _templateObject514() {
  var data = _taggedTemplateLiteral(["burning paper crane"]);

  _templateObject514 = function _templateObject514() {
    return data;
  };

  return data;
}

function _templateObject513() {
  var data = _taggedTemplateLiteral(["burning newspaper"]);

  _templateObject513 = function _templateObject513() {
    return data;
  };

  return data;
}

function _templateObject512() {
  var data = _taggedTemplateLiteral(["Use the Force"]);

  _templateObject512 = function _templateObject512() {
    return data;
  };

  return data;
}

function _templateObject511() {
  var data = _taggedTemplateLiteral(["Meteor Shower"]);

  _templateObject511 = function _templateObject511() {
    return data;
  };

  return data;
}

function _templateObject510() {
  var data = _taggedTemplateLiteral(["The Neverending Party"]);

  _templateObject510 = function _templateObject510() {
    return data;
  };

  return data;
}

function _templateObject509() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject509 = function _templateObject509() {
    return data;
  };

  return data;
}

function _templateObject508() {
  var data = _taggedTemplateLiteral(["Meteor Showered"]);

  _templateObject508 = function _templateObject508() {
    return data;
  };

  return data;
}

function _templateObject507() {
  var data = _taggedTemplateLiteral(["shortly stacked"]);

  _templateObject507 = function _templateObject507() {
    return data;
  };

  return data;
}

function _templateObject506() {
  var data = _taggedTemplateLiteral(["human-machine hybrid"]);

  _templateObject506 = function _templateObject506() {
    return data;
  };

  return data;
}

function _templateObject505() {
  var data = _taggedTemplateLiteral(["robot friends"]);

  _templateObject505 = function _templateObject505() {
    return data;
  };

  return data;
}

function _templateObject504() {
  var data = _taggedTemplateLiteral(["Empathy"]);

  _templateObject504 = function _templateObject504() {
    return data;
  };

  return data;
}

function _templateObject503() {
  var data = _taggedTemplateLiteral(["Leash of Linguini"]);

  _templateObject503 = function _templateObject503() {
    return data;
  };

  return data;
}

function _templateObject502() {
  var data = _taggedTemplateLiteral(["Blood Bond"]);

  _templateObject502 = function _templateObject502() {
    return data;
  };

  return data;
}

function _templateObject501() {
  var data = _taggedTemplateLiteral(["Cannelloni Cocoon"]);

  _templateObject501 = function _templateObject501() {
    return data;
  };

  return data;
}

function _templateObject500() {
  var data = _taggedTemplateLiteral(["Billiards Belligerence"]);

  _templateObject500 = function _templateObject500() {
    return data;
  };

  return data;
}

function _templateObject499() {
  var data = _taggedTemplateLiteral(["Do I Know You From Somewhere?"]);

  _templateObject499 = function _templateObject499() {
    return data;
  };

  return data;
}

function _templateObject498() {
  var data = _taggedTemplateLiteral(["Fidoxene"]);

  _templateObject498 = function _templateObject498() {
    return data;
  };

  return data;
}

function _templateObject497() {
  var data = _taggedTemplateLiteral(["Blessing of the Bird"]);

  _templateObject497 = function _templateObject497() {
    return data;
  };

  return data;
}

function _templateObject496() {
  var data = _taggedTemplateLiteral(["pastamancer"]);

  _templateObject496 = function _templateObject496() {
    return data;
  };

  return data;
}

function _templateObject495() {
  var data = _taggedTemplateLiteral(["Disgeist"]);

  _templateObject495 = function _templateObject495() {
    return data;
  };

  return data;
}

function _templateObject494() {
  var data = _taggedTemplateLiteral(["Throwing Some Shade"]);

  _templateObject494 = function _templateObject494() {
    return data;
  };

  return data;
}

function _templateObject493() {
  var data = _taggedTemplateLiteral(["Feeling Lonely"]);

  _templateObject493 = function _templateObject493() {
    return data;
  };

  return data;
}

function _templateObject492() {
  var data = _taggedTemplateLiteral(["Silent Running"]);

  _templateObject492 = function _templateObject492() {
    return data;
  };

  return data;
}

function _templateObject491() {
  var data = _taggedTemplateLiteral(["Invisible Avatar"]);

  _templateObject491 = function _templateObject491() {
    return data;
  };

  return data;
}

function _templateObject490() {
  var data = _taggedTemplateLiteral(["Smooth Movements"]);

  _templateObject490 = function _templateObject490() {
    return data;
  };

  return data;
}

function _templateObject489() {
  var data = _taggedTemplateLiteral(["The Sonata of Sneakiness"]);

  _templateObject489 = function _templateObject489() {
    return data;
  };

  return data;
}

function _templateObject488() {
  var data = _taggedTemplateLiteral(["gummed shoes"]);

  _templateObject488 = function _templateObject488() {
    return data;
  };

  return data;
}

function _templateObject487() {
  var data = _taggedTemplateLiteral(["Powerful Glove"]);

  _templateObject487 = function _templateObject487() {
    return data;
  };

  return data;
}

function _templateObject486() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject486 = function _templateObject486() {
    return data;
  };

  return data;
}

function _templateObject485() {
  var data = _taggedTemplateLiteral(["Billiards Belligerence"]);

  _templateObject485 = function _templateObject485() {
    return data;
  };

  return data;
}

function _templateObject484() {
  var data = _taggedTemplateLiteral(["saucegeyser"]);

  _templateObject484 = function _templateObject484() {
    return data;
  };

  return data;
}

function _templateObject483() {
  var data = _taggedTemplateLiteral(["God Lobster's Ring"], ["God Lobster\\'s Ring"]);

  _templateObject483 = function _templateObject483() {
    return data;
  };

  return data;
}

function _templateObject482() {
  var data = _taggedTemplateLiteral(["God Lobster"]);

  _templateObject482 = function _templateObject482() {
    return data;
  };

  return data;
}

function _templateObject481() {
  var data = _taggedTemplateLiteral(["Cannelloni Cocoon"]);

  _templateObject481 = function _templateObject481() {
    return data;
  };

  return data;
}

function _templateObject480() {
  var data = _taggedTemplateLiteral(["Empathy"]);

  _templateObject480 = function _templateObject480() {
    return data;
  };

  return data;
}

function _templateObject479() {
  var data = _taggedTemplateLiteral(["Leash of Linguini"]);

  _templateObject479 = function _templateObject479() {
    return data;
  };

  return data;
}

function _templateObject478() {
  var data = _taggedTemplateLiteral(["Blood Bond"]);

  _templateObject478 = function _templateObject478() {
    return data;
  };

  return data;
}

function _templateObject477() {
  var data = _taggedTemplateLiteral(["Cannelloni Cocoon"]);

  _templateObject477 = function _templateObject477() {
    return data;
  };

  return data;
}

function _templateObject476() {
  var data = _taggedTemplateLiteral(["cracker"]);

  _templateObject476 = function _templateObject476() {
    return data;
  };

  return data;
}

function _templateObject475() {
  var data = _taggedTemplateLiteral(["box of Familiar Jacks"]);

  _templateObject475 = function _templateObject475() {
    return data;
  };

  return data;
}

function _templateObject474() {
  var data = _taggedTemplateLiteral(["box of Familiar jacks"]);

  _templateObject474 = function _templateObject474() {
    return data;
  };

  return data;
}

function _templateObject473() {
  var data = _taggedTemplateLiteral(["cracker"]);

  _templateObject473 = function _templateObject473() {
    return data;
  };

  return data;
}

function _templateObject472() {
  var data = _taggedTemplateLiteral(["Exotic Parrot"]);

  _templateObject472 = function _templateObject472() {
    return data;
  };

  return data;
}

function _templateObject471() {
  var data = _taggedTemplateLiteral(["Amazing"]);

  _templateObject471 = function _templateObject471() {
    return data;
  };

  return data;
}

function _templateObject470() {
  var data = _taggedTemplateLiteral(["pocket maze"]);

  _templateObject470 = function _templateObject470() {
    return data;
  };

  return data;
}

function _templateObject469() {
  var data = _taggedTemplateLiteral(["Hot-Headed"]);

  _templateObject469 = function _templateObject469() {
    return data;
  };

  return data;
}

function _templateObject468() {
  var data = _taggedTemplateLiteral(["lotion of sleaziness"]);

  _templateObject468 = function _templateObject468() {
    return data;
  };

  return data;
}

function _templateObject467() {
  var data = _taggedTemplateLiteral(["Sleazy Hands"]);

  _templateObject467 = function _templateObject467() {
    return data;
  };

  return data;
}

function _templateObject466() {
  var data = _taggedTemplateLiteral(["lotion of sleaziness"]);

  _templateObject466 = function _templateObject466() {
    return data;
  };

  return data;
}

function _templateObject465() {
  var data = _taggedTemplateLiteral(["sleaze powder"]);

  _templateObject465 = function _templateObject465() {
    return data;
  };

  return data;
}

function _templateObject464() {
  var data = _taggedTemplateLiteral(["Flame-Retardant Trousers"]);

  _templateObject464 = function _templateObject464() {
    return data;
  };

  return data;
}

function _templateObject463() {
  var data = _taggedTemplateLiteral(["hot powder"]);

  _templateObject463 = function _templateObject463() {
    return data;
  };

  return data;
}

function _templateObject462() {
  var data = _taggedTemplateLiteral(["twinkly powder"]);

  _templateObject462 = function _templateObject462() {
    return data;
  };

  return data;
}

function _templateObject461() {
  var data = _taggedTemplateLiteral(["hot nuggets"]);

  _templateObject461 = function _templateObject461() {
    return data;
  };

  return data;
}

function _templateObject460() {
  var data = _taggedTemplateLiteral(["tenderizing hammer"]);

  _templateObject460 = function _templateObject460() {
    return data;
  };

  return data;
}

function _templateObject459() {
  var data = _taggedTemplateLiteral(["meteorite guard"]);

  _templateObject459 = function _templateObject459() {
    return data;
  };

  return data;
}

function _templateObject458() {
  var data = _taggedTemplateLiteral(["metal meteoroid"]);

  _templateObject458 = function _templateObject458() {
    return data;
  };

  return data;
}

function _templateObject457() {
  var data = _taggedTemplateLiteral(["Billiards Belligerence"]);

  _templateObject457 = function _templateObject457() {
    return data;
  };

  return data;
}

function _templateObject456() {
  var data = _taggedTemplateLiteral(["feeling peaceful"]);

  _templateObject456 = function _templateObject456() {
    return data;
  };

  return data;
}

function _templateObject455() {
  var data = _taggedTemplateLiteral(["Empathy"]);

  _templateObject455 = function _templateObject455() {
    return data;
  };

  return data;
}

function _templateObject454() {
  var data = _taggedTemplateLiteral(["Leash of Linguini"]);

  _templateObject454 = function _templateObject454() {
    return data;
  };

  return data;
}

function _templateObject453() {
  var data = _taggedTemplateLiteral(["Blood Bond"]);

  _templateObject453 = function _templateObject453() {
    return data;
  };

  return data;
}

function _templateObject452() {
  var data = _taggedTemplateLiteral(["puzzle champ"]);

  _templateObject452 = function _templateObject452() {
    return data;
  };

  return data;
}

function _templateObject451() {
  var data = _taggedTemplateLiteral(["Synthesis: Hot"]);

  _templateObject451 = function _templateObject451() {
    return data;
  };

  return data;
}

function _templateObject450() {
  var data = _taggedTemplateLiteral(["use the force"]);

  _templateObject450 = function _templateObject450() {
    return data;
  };

  return data;
}

function _templateObject449() {
  var data = _taggedTemplateLiteral(["meteor shower"]);

  _templateObject449 = function _templateObject449() {
    return data;
  };

  return data;
}

function _templateObject448() {
  var data = _taggedTemplateLiteral(["become a cloud of mist"]);

  _templateObject448 = function _templateObject448() {
    return data;
  };

  return data;
}

function _templateObject447() {
  var data = _taggedTemplateLiteral(["Factory worker (female)"]);

  _templateObject447 = function _templateObject447() {
    return data;
  };

  return data;
}

function _templateObject446() {
  var data = _taggedTemplateLiteral(["LavaCo&trade; Lamp Factory"]);

  _templateObject446 = function _templateObject446() {
    return data;
  };

  return data;
}

function _templateObject445() {
  var data = _taggedTemplateLiteral(["familiar scrapbook"]);

  _templateObject445 = function _templateObject445() {
    return data;
  };

  return data;
}

function _templateObject444() {
  var data = _taggedTemplateLiteral(["offhand"]);

  _templateObject444 = function _templateObject444() {
    return data;
  };

  return data;
}

function _templateObject443() {
  var data = _taggedTemplateLiteral(["vampyric cloake"]);

  _templateObject443 = function _templateObject443() {
    return data;
  };

  return data;
}

function _templateObject442() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject442 = function _templateObject442() {
    return data;
  };

  return data;
}

function _templateObject441() {
  var data = _taggedTemplateLiteral(["LavaCo&trade; Lamp Factory"]);

  _templateObject441 = function _templateObject441() {
    return data;
  };

  return data;
}

function _templateObject440() {
  var data = _taggedTemplateLiteral(["LavaCo&trade; Lamp Factory"]);

  _templateObject440 = function _templateObject440() {
    return data;
  };

  return data;
}

function _templateObject439() {
  var data = _taggedTemplateLiteral(["heat-resistant gloves"]);

  _templateObject439 = function _templateObject439() {
    return data;
  };

  return data;
}

function _templateObject438() {
  var data = _taggedTemplateLiteral(["Lil' Doctor&trade; Bag"], ["Lil\\' Doctor&trade; Bag"]);

  _templateObject438 = function _templateObject438() {
    return data;
  };

  return data;
}

function _templateObject437() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject437 = function _templateObject437() {
    return data;
  };

  return data;
}

function _templateObject436() {
  var data = _taggedTemplateLiteral(["Powerful Glove"]);

  _templateObject436 = function _templateObject436() {
    return data;
  };

  return data;
}

function _templateObject435() {
  var data = _taggedTemplateLiteral(["acc2"]);

  _templateObject435 = function _templateObject435() {
    return data;
  };

  return data;
}

function _templateObject434() {
  var data = _taggedTemplateLiteral(["Eight Days a Week Pill Keeper"]);

  _templateObject434 = function _templateObject434() {
    return data;
  };

  return data;
}

function _templateObject433() {
  var data = _taggedTemplateLiteral(["acc1"]);

  _templateObject433 = function _templateObject433() {
    return data;
  };

  return data;
}

function _templateObject432() {
  var data = _taggedTemplateLiteral(["magical sausage"]);

  _templateObject432 = function _templateObject432() {
    return data;
  };

  return data;
}

function _templateObject431() {
  var data = _taggedTemplateLiteral(["left-hand man"]);

  _templateObject431 = function _templateObject431() {
    return data;
  };

  return data;
}

function _templateObject430() {
  var data = _taggedTemplateLiteral(["cordial of concentration"]);

  _templateObject430 = function _templateObject430() {
    return data;
  };

  return data;
}

function _templateObject429() {
  var data = _taggedTemplateLiteral(["Concentration"]);

  _templateObject429 = function _templateObject429() {
    return data;
  };

  return data;
}

function _templateObject428() {
  var data = _taggedTemplateLiteral(["soda water"]);

  _templateObject428 = function _templateObject428() {
    return data;
  };

  return data;
}

function _templateObject427() {
  var data = _taggedTemplateLiteral(["Sigils of Yeg"]);

  _templateObject427 = function _templateObject427() {
    return data;
  };

  return data;
}

function _templateObject426() {
  var data = _taggedTemplateLiteral(["Yeg's Motel hand soap"], ["Yeg\\'s Motel hand soap"]);

  _templateObject426 = function _templateObject426() {
    return data;
  };

  return data;
}

function _templateObject425() {
  var data = _taggedTemplateLiteral(["Sigils of Yeg"]);

  _templateObject425 = function _templateObject425() {
    return data;
  };

  return data;
}

function _templateObject424() {
  var data = _taggedTemplateLiteral(["sauceror"]);

  _templateObject424 = function _templateObject424() {
    return data;
  };

  return data;
}

function _templateObject423() {
  var data = _taggedTemplateLiteral(["use the force"]);

  _templateObject423 = function _templateObject423() {
    return data;
  };

  return data;
}

function _templateObject422() {
  var data = _taggedTemplateLiteral(["meteor shower"]);

  _templateObject422 = function _templateObject422() {
    return data;
  };

  return data;
}

function _templateObject421() {
  var data = _taggedTemplateLiteral(["mine worker (female)"]);

  _templateObject421 = function _templateObject421() {
    return data;
  };

  return data;
}

function _templateObject420() {
  var data = _taggedTemplateLiteral(["the velvet / gold mine"], ["the velvet \\/ gold mine"]);

  _templateObject420 = function _templateObject420() {
    return data;
  };

  return data;
}

function _templateObject419() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject419 = function _templateObject419() {
    return data;
  };

  return data;
}

function _templateObject418() {
  var data = _taggedTemplateLiteral(["the velvet / gold mine"], ["the velvet \\/ gold mine"]);

  _templateObject418 = function _templateObject418() {
    return data;
  };

  return data;
}

function _templateObject417() {
  var data = _taggedTemplateLiteral(["the velvet / gold mine"], ["the velvet \\/ gold mine"]);

  _templateObject417 = function _templateObject417() {
    return data;
  };

  return data;
}

function _templateObject416() {
  var data = _taggedTemplateLiteral(["Meteor Showered"]);

  _templateObject416 = function _templateObject416() {
    return data;
  };

  return data;
}

function _templateObject415() {
  var data = _taggedTemplateLiteral(["snokebomb"]);

  _templateObject415 = function _templateObject415() {
    return data;
  };

  return data;
}

function _templateObject414() {
  var data = _taggedTemplateLiteral(["The Slime Tube"]);

  _templateObject414 = function _templateObject414() {
    return data;
  };

  return data;
}

function _templateObject413() {
  var data = _taggedTemplateLiteral(["machine elf"]);

  _templateObject413 = function _templateObject413() {
    return data;
  };

  return data;
}

function _templateObject412() {
  var data = _taggedTemplateLiteral(["blood bubble"]);

  _templateObject412 = function _templateObject412() {
    return data;
  };

  return data;
}

function _templateObject411() {
  var data = _taggedTemplateLiteral(["inner elf"]);

  _templateObject411 = function _templateObject411() {
    return data;
  };

  return data;
}

function _templateObject410() {
  var data = _taggedTemplateLiteral(["Spirit of Cayenne"]);

  _templateObject410 = function _templateObject410() {
    return data;
  };

  return data;
}

function _templateObject409() {
  var data = _taggedTemplateLiteral(["mariachi hat"]);

  _templateObject409 = function _templateObject409() {
    return data;
  };

  return data;
}

function _templateObject408() {
  var data = _taggedTemplateLiteral(["Deep Dark Visions"]);

  _templateObject408 = function _templateObject408() {
    return data;
  };

  return data;
}

function _templateObject407() {
  var data = _taggedTemplateLiteral(["Does It Have a Skull In There??"]);

  _templateObject407 = function _templateObject407() {
    return data;
  };

  return data;
}

function _templateObject406() {
  var data = _taggedTemplateLiteral(["magical sausage"]);

  _templateObject406 = function _templateObject406() {
    return data;
  };

  return data;
}

function _templateObject405() {
  var data = _taggedTemplateLiteral(["magical sausage"]);

  _templateObject405 = function _templateObject405() {
    return data;
  };

  return data;
}

function _templateObject404() {
  var data = _taggedTemplateLiteral(["Cannelloni Cocoon"]);

  _templateObject404 = function _templateObject404() {
    return data;
  };

  return data;
}

function _templateObject403() {
  var data = _taggedTemplateLiteral(["magical sausage"]);

  _templateObject403 = function _templateObject403() {
    return data;
  };

  return data;
}

function _templateObject402() {
  var data = _taggedTemplateLiteral(["magical sausage"]);

  _templateObject402 = function _templateObject402() {
    return data;
  };

  return data;
}

function _templateObject401() {
  var data = _taggedTemplateLiteral(["Visions of the Deep Dark Deeps"]);

  _templateObject401 = function _templateObject401() {
    return data;
  };

  return data;
}

function _templateObject400() {
  var data = _taggedTemplateLiteral(["Deep Dark Visions"]);

  _templateObject400 = function _templateObject400() {
    return data;
  };

  return data;
}

function _templateObject399() {
  var data = _taggedTemplateLiteral(["Astral Shell"]);

  _templateObject399 = function _templateObject399() {
    return data;
  };

  return data;
}

function _templateObject398() {
  var data = _taggedTemplateLiteral(["Elemental Saucesphere"]);

  _templateObject398 = function _templateObject398() {
    return data;
  };

  return data;
}

function _templateObject397() {
  var data = _taggedTemplateLiteral(["Mental A-cue-ity"]);

  _templateObject397 = function _templateObject397() {
    return data;
  };

  return data;
}

function _templateObject396() {
  var data = _taggedTemplateLiteral(["The Magic of LOV"]);

  _templateObject396 = function _templateObject396() {
    return data;
  };

  return data;
}

function _templateObject395() {
  var data = _taggedTemplateLiteral(["lov elixir #6"], ["lov elixir \\#6"]);

  _templateObject395 = function _templateObject395() {
    return data;
  };

  return data;
}

function _templateObject394() {
  var data = _taggedTemplateLiteral(["Jackasses' Symphony of Destruction"], ["Jackasses\\' Symphony of Destruction"]);

  _templateObject394 = function _templateObject394() {
    return data;
  };

  return data;
}

function _templateObject393() {
  var data = _taggedTemplateLiteral(["Arched Eyebrow of the Archmage"]);

  _templateObject393 = function _templateObject393() {
    return data;
  };

  return data;
}

function _templateObject392() {
  var data = _taggedTemplateLiteral(["Carol of the Hells"]);

  _templateObject392 = function _templateObject392() {
    return data;
  };

  return data;
}

function _templateObject391() {
  var data = _taggedTemplateLiteral(["Song of Sauce"]);

  _templateObject391 = function _templateObject391() {
    return data;
  };

  return data;
}

function _templateObject390() {
  var data = _taggedTemplateLiteral(["Simmering"]);

  _templateObject390 = function _templateObject390() {
    return data;
  };

  return data;
}

function _templateObject389() {
  var data = _taggedTemplateLiteral(["disembodied hand"]);

  _templateObject389 = function _templateObject389() {
    return data;
  };

  return data;
}

function _templateObject388() {
  var data = _taggedTemplateLiteral(["Bow-Legged Swagger"]);

  _templateObject388 = function _templateObject388() {
    return data;
  };

  return data;
}

function _templateObject387() {
  var data = _taggedTemplateLiteral(["Meleegra&trade; pills"]);

  _templateObject387 = function _templateObject387() {
    return data;
  };

  return data;
}

function _templateObject386() {
  var data = _taggedTemplateLiteral(["Engorged Weapon"]);

  _templateObject386 = function _templateObject386() {
    return data;
  };

  return data;
}

function _templateObject385() {
  var data = _taggedTemplateLiteral(["Blessing of the Bird"]);

  _templateObject385 = function _templateObject385() {
    return data;
  };

  return data;
}

function _templateObject384() {
  var data = _taggedTemplateLiteral(["Blessing of your Favorite Bird"]);

  _templateObject384 = function _templateObject384() {
    return data;
  };

  return data;
}

function _templateObject383() {
  var data = _taggedTemplateLiteral(["Cowrruption"]);

  _templateObject383 = function _templateObject383() {
    return data;
  };

  return data;
}

function _templateObject382() {
  var data = _taggedTemplateLiteral(["Billiards Belligerence"]);

  _templateObject382 = function _templateObject382() {
    return data;
  };

  return data;
}

function _templateObject381() {
  var data = _taggedTemplateLiteral(["Lack of Body-Building"]);

  _templateObject381 = function _templateObject381() {
    return data;
  };

  return data;
}

function _templateObject380() {
  var data = _taggedTemplateLiteral(["Ham-Fisted"]);

  _templateObject380 = function _templateObject380() {
    return data;
  };

  return data;
}

function _templateObject379() {
  var data = _taggedTemplateLiteral(["vial of hamethyst juice"]);

  _templateObject379 = function _templateObject379() {
    return data;
  };

  return data;
}

function _templateObject378() {
  var data = _taggedTemplateLiteral(["The Power of LOV"]);

  _templateObject378 = function _templateObject378() {
    return data;
  };

  return data;
}

function _templateObject377() {
  var data = _taggedTemplateLiteral(["lov elixir #3"], ["lov elixir \\#3"]);

  _templateObject377 = function _templateObject377() {
    return data;
  };

  return data;
}

function _templateObject376() {
  var data = _taggedTemplateLiteral(["Jackasses' Symphony of Destruction"], ["Jackasses\\' Symphony of Destruction"]);

  _templateObject376 = function _templateObject376() {
    return data;
  };

  return data;
}

function _templateObject375() {
  var data = _taggedTemplateLiteral(["Tenacity of the Snapper"]);

  _templateObject375 = function _templateObject375() {
    return data;
  };

  return data;
}

function _templateObject374() {
  var data = _taggedTemplateLiteral(["Disdain of the War Snapper"]);

  _templateObject374 = function _templateObject374() {
    return data;
  };

  return data;
}

function _templateObject373() {
  var data = _taggedTemplateLiteral(["Scowl of the Auk"]);

  _templateObject373 = function _templateObject373() {
    return data;
  };

  return data;
}

function _templateObject372() {
  var data = _taggedTemplateLiteral(["Frenzied, Bloody"]);

  _templateObject372 = function _templateObject372() {
    return data;
  };

  return data;
}

function _templateObject371() {
  var data = _taggedTemplateLiteral(["Rage of the Reindeer"]);

  _templateObject371 = function _templateObject371() {
    return data;
  };

  return data;
}

function _templateObject370() {
  var data = _taggedTemplateLiteral(["Song of the North"]);

  _templateObject370 = function _templateObject370() {
    return data;
  };

  return data;
}

function _templateObject369() {
  var data = _taggedTemplateLiteral(["Carol of the Bulls"]);

  _templateObject369 = function _templateObject369() {
    return data;
  };

  return data;
}

function _templateObject368() {
  var data = _taggedTemplateLiteral(["Twinkly Weapon"]);

  _templateObject368 = function _templateObject368() {
    return data;
  };

  return data;
}

function _templateObject367() {
  var data = _taggedTemplateLiteral(["twinkly nuggets"]);

  _templateObject367 = function _templateObject367() {
    return data;
  };

  return data;
}

function _templateObject366() {
  var data = _taggedTemplateLiteral(["photocopied monster"]);

  _templateObject366 = function _templateObject366() {
    return data;
  };

  return data;
}

function _templateObject365() {
  var data = _taggedTemplateLiteral(["use the force"]);

  _templateObject365 = function _templateObject365() {
    return data;
  };

  return data;
}

function _templateObject364() {
  var data = _taggedTemplateLiteral(["meteor shower"]);

  _templateObject364 = function _templateObject364() {
    return data;
  };

  return data;
}

function _templateObject363() {
  var data = _taggedTemplateLiteral(["Spit Upon"]);

  _templateObject363 = function _templateObject363() {
    return data;
  };

  return data;
}

function _templateObject362() {
  var data = _taggedTemplateLiteral(["photocopied monster"]);

  _templateObject362 = function _templateObject362() {
    return data;
  };

  return data;
}

function _templateObject361() {
  var data = _taggedTemplateLiteral(["use the force"]);

  _templateObject361 = function _templateObject361() {
    return data;
  };

  return data;
}

function _templateObject360() {
  var data = _taggedTemplateLiteral(["7340"]);

  _templateObject360 = function _templateObject360() {
    return data;
  };

  return data;
}

function _templateObject359() {
  var data = _taggedTemplateLiteral(["meteor shower"]);

  _templateObject359 = function _templateObject359() {
    return data;
  };

  return data;
}

function _templateObject358() {
  var data = _taggedTemplateLiteral(["melodramedary"]);

  _templateObject358 = function _templateObject358() {
    return data;
  };

  return data;
}

function _templateObject357() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject357 = function _templateObject357() {
    return data;
  };

  return data;
}

function _templateObject356() {
  var data = _taggedTemplateLiteral(["photocopied monster"]);

  _templateObject356 = function _templateObject356() {
    return data;
  };

  return data;
}

function _templateObject355() {
  var data = _taggedTemplateLiteral(["ungulith"]);

  _templateObject355 = function _templateObject355() {
    return data;
  };

  return data;
}

function _templateObject354() {
  var data = _taggedTemplateLiteral(["photocopied monster"]);

  _templateObject354 = function _templateObject354() {
    return data;
  };

  return data;
}

function _templateObject353() {
  var data = _taggedTemplateLiteral(["cowrruption"]);

  _templateObject353 = function _templateObject353() {
    return data;
  };

  return data;
}

function _templateObject352() {
  var data = _taggedTemplateLiteral(["corrupted marrow"]);

  _templateObject352 = function _templateObject352() {
    return data;
  };

  return data;
}

function _templateObject351() {
  var data = _taggedTemplateLiteral(["human-elf hybrid"]);

  _templateObject351 = function _templateObject351() {
    return data;
  };

  return data;
}

function _templateObject350() {
  var data = _taggedTemplateLiteral(["DNA extraction syringe"]);

  _templateObject350 = function _templateObject350() {
    return data;
  };

  return data;
}

function _templateObject349() {
  var data = _taggedTemplateLiteral(["Lil' Doctor&trade; Bag"], ["Lil\\' Doctor&trade; Bag"]);

  _templateObject349 = function _templateObject349() {
    return data;
  };

  return data;
}

function _templateObject348() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject348 = function _templateObject348() {
    return data;
  };

  return data;
}

function _templateObject347() {
  var data = _taggedTemplateLiteral(["ghost of crimbo carols"]);

  _templateObject347 = function _templateObject347() {
    return data;
  };

  return data;
}

function _templateObject346() {
  var data = _taggedTemplateLiteral(["snokebomb"]);

  _templateObject346 = function _templateObject346() {
    return data;
  };

  return data;
}

function _templateObject345() {
  var data = _taggedTemplateLiteral(["The Slime Tube"]);

  _templateObject345 = function _templateObject345() {
    return data;
  };

  return data;
}

function _templateObject344() {
  var data = _taggedTemplateLiteral(["machine elf"]);

  _templateObject344 = function _templateObject344() {
    return data;
  };

  return data;
}

function _templateObject343() {
  var data = _taggedTemplateLiteral(["blood bubble"]);

  _templateObject343 = function _templateObject343() {
    return data;
  };

  return data;
}

function _templateObject342() {
  var data = _taggedTemplateLiteral(["inner elf"]);

  _templateObject342 = function _templateObject342() {
    return data;
  };

  return data;
}

function _templateObject341() {
  var data = _taggedTemplateLiteral(["moxie"]);

  _templateObject341 = function _templateObject341() {
    return data;
  };

  return data;
}

function _templateObject340() {
  var data = _taggedTemplateLiteral(["moxie"]);

  _templateObject340 = function _templateObject340() {
    return data;
  };

  return data;
}

function _templateObject339() {
  var data = _taggedTemplateLiteral(["mysticality"]);

  _templateObject339 = function _templateObject339() {
    return data;
  };

  return data;
}

function _templateObject338() {
  var data = _taggedTemplateLiteral(["moxie"]);

  _templateObject338 = function _templateObject338() {
    return data;
  };

  return data;
}

function _templateObject337() {
  var data = _taggedTemplateLiteral(["Pastamancer"]);

  _templateObject337 = function _templateObject337() {
    return data;
  };

  return data;
}

function _templateObject336() {
  var data = _taggedTemplateLiteral(["runproof mascara"]);

  _templateObject336 = function _templateObject336() {
    return data;
  };

  return data;
}

function _templateObject335() {
  var data = _taggedTemplateLiteral(["Unrunnable Face"]);

  _templateObject335 = function _templateObject335() {
    return data;
  };

  return data;
}

function _templateObject334() {
  var data = _taggedTemplateLiteral(["rhinestone"]);

  _templateObject334 = function _templateObject334() {
    return data;
  };

  return data;
}

function _templateObject333() {
  var data = _taggedTemplateLiteral(["rhinestone"]);

  _templateObject333 = function _templateObject333() {
    return data;
  };

  return data;
}

function _templateObject332() {
  var data = _taggedTemplateLiteral(["handsomeness potion"]);

  _templateObject332 = function _templateObject332() {
    return data;
  };

  return data;
}

function _templateObject331() {
  var data = _taggedTemplateLiteral(["Mysteriously Handsome"]);

  _templateObject331 = function _templateObject331() {
    return data;
  };

  return data;
}

function _templateObject330() {
  var data = _taggedTemplateLiteral(["hair spray"]);

  _templateObject330 = function _templateObject330() {
    return data;
  };

  return data;
}

function _templateObject329() {
  var data = _taggedTemplateLiteral(["Butt-Rock Hair"]);

  _templateObject329 = function _templateObject329() {
    return data;
  };

  return data;
}

function _templateObject328() {
  var data = _taggedTemplateLiteral(["Disco Fever"]);

  _templateObject328 = function _templateObject328() {
    return data;
  };

  return data;
}

function _templateObject327() {
  var data = _taggedTemplateLiteral(["Quiet Desperation"]);

  _templateObject327 = function _templateObject327() {
    return data;
  };

  return data;
}

function _templateObject326() {
  var data = _taggedTemplateLiteral(["Stevedave's Shanty of Superiority"], ["Stevedave\\'s Shanty of Superiority"]);

  _templateObject326 = function _templateObject326() {
    return data;
  };

  return data;
}

function _templateObject325() {
  var data = _taggedTemplateLiteral(["Song of Bravado"]);

  _templateObject325 = function _templateObject325() {
    return data;
  };

  return data;
}

function _templateObject324() {
  var data = _taggedTemplateLiteral(["Big"]);

  _templateObject324 = function _templateObject324() {
    return data;
  };

  return data;
}

function _templateObject323() {
  var data = _taggedTemplateLiteral(["Blessing of the Bird"]);

  _templateObject323 = function _templateObject323() {
    return data;
  };

  return data;
}

function _templateObject322() {
  var data = _taggedTemplateLiteral(["Bird-a-Day Calendar"]);

  _templateObject322 = function _templateObject322() {
    return data;
  };

  return data;
}

function _templateObject321() {
  var data = _taggedTemplateLiteral(["Pomp & Circumsands"]);

  _templateObject321 = function _templateObject321() {
    return data;
  };

  return data;
}

function _templateObject320() {
  var data = _taggedTemplateLiteral(["oil of expertise"]);

  _templateObject320 = function _templateObject320() {
    return data;
  };

  return data;
}

function _templateObject319() {
  var data = _taggedTemplateLiteral(["Expert Oiliness"]);

  _templateObject319 = function _templateObject319() {
    return data;
  };

  return data;
}

function _templateObject318() {
  var data = _taggedTemplateLiteral(["Bind Penne Dreadful"]);

  _templateObject318 = function _templateObject318() {
    return data;
  };

  return data;
}

function _templateObject317() {
  var data = _taggedTemplateLiteral(["Pastamancer"]);

  _templateObject317 = function _templateObject317() {
    return data;
  };

  return data;
}

function _templateObject316() {
  var data = _taggedTemplateLiteral(["mysticality"]);

  _templateObject316 = function _templateObject316() {
    return data;
  };

  return data;
}

function _templateObject315() {
  var data = _taggedTemplateLiteral(["mysticality"]);

  _templateObject315 = function _templateObject315() {
    return data;
  };

  return data;
}

function _templateObject314() {
  var data = _taggedTemplateLiteral(["glittery mascara"]);

  _templateObject314 = function _templateObject314() {
    return data;
  };

  return data;
}

function _templateObject313() {
  var data = _taggedTemplateLiteral(["Glittering Eyelashes"]);

  _templateObject313 = function _templateObject313() {
    return data;
  };

  return data;
}

function _templateObject312() {
  var data = _taggedTemplateLiteral(["Mystically Oiled"]);

  _templateObject312 = function _templateObject312() {
    return data;
  };

  return data;
}

function _templateObject311() {
  var data = _taggedTemplateLiteral(["Quiet Judgement"]);

  _templateObject311 = function _templateObject311() {
    return data;
  };

  return data;
}

function _templateObject310() {
  var data = _taggedTemplateLiteral(["The Magical Mojomuscular Melody"]);

  _templateObject310 = function _templateObject310() {
    return data;
  };

  return data;
}

function _templateObject309() {
  var data = _taggedTemplateLiteral(["Stevedave's Shanty of Superiority"], ["Stevedave\\'s Shanty of Superiority"]);

  _templateObject309 = function _templateObject309() {
    return data;
  };

  return data;
}

function _templateObject308() {
  var data = _taggedTemplateLiteral(["Song of Bravado"]);

  _templateObject308 = function _templateObject308() {
    return data;
  };

  return data;
}

function _templateObject307() {
  var data = _taggedTemplateLiteral(["Big"]);

  _templateObject307 = function _templateObject307() {
    return data;
  };

  return data;
}

function _templateObject306() {
  var data = _taggedTemplateLiteral(["muscle"]);

  _templateObject306 = function _templateObject306() {
    return data;
  };

  return data;
}

function _templateObject305() {
  var data = _taggedTemplateLiteral(["muscle"]);

  _templateObject305 = function _templateObject305() {
    return data;
  };

  return data;
}

function _templateObject304() {
  var data = _taggedTemplateLiteral(["mysticality"]);

  _templateObject304 = function _templateObject304() {
    return data;
  };

  return data;
}

function _templateObject303() {
  var data = _taggedTemplateLiteral(["muscle"]);

  _templateObject303 = function _templateObject303() {
    return data;
  };

  return data;
}

function _templateObject302() {
  var data = _taggedTemplateLiteral(["Pastamancer"]);

  _templateObject302 = function _templateObject302() {
    return data;
  };

  return data;
}

function _templateObject301() {
  var data = _taggedTemplateLiteral(["The Power of LOV"]);

  _templateObject301 = function _templateObject301() {
    return data;
  };

  return data;
}

function _templateObject300() {
  var data = _taggedTemplateLiteral(["lov elixir #3"], ["lov elixir \\#3"]);

  _templateObject300 = function _templateObject300() {
    return data;
  };

  return data;
}

function _templateObject299() {
  var data = _taggedTemplateLiteral(["Lack of Body-Building"]);

  _templateObject299 = function _templateObject299() {
    return data;
  };

  return data;
}

function _templateObject298() {
  var data = _taggedTemplateLiteral(["Ben-Gal&trade; balm"]);

  _templateObject298 = function _templateObject298() {
    return data;
  };

  return data;
}

function _templateObject297() {
  var data = _taggedTemplateLiteral(["Go Get 'Em, Tiger!"], ["Go Get \\'Em, Tiger!"]);

  _templateObject297 = function _templateObject297() {
    return data;
  };

  return data;
}

function _templateObject296() {
  var data = _taggedTemplateLiteral(["Disdain of the War Snapper"]);

  _templateObject296 = function _templateObject296() {
    return data;
  };

  return data;
}

function _templateObject295() {
  var data = _taggedTemplateLiteral(["Quiet Determination"]);

  _templateObject295 = function _templateObject295() {
    return data;
  };

  return data;
}

function _templateObject294() {
  var data = _taggedTemplateLiteral(["Rage of the Reindeer"]);

  _templateObject294 = function _templateObject294() {
    return data;
  };

  return data;
}

function _templateObject293() {
  var data = _taggedTemplateLiteral(["Stevedave's Shanty of Superiority"], ["Stevedave\\'s Shanty of Superiority"]);

  _templateObject293 = function _templateObject293() {
    return data;
  };

  return data;
}

function _templateObject292() {
  var data = _taggedTemplateLiteral(["Song of Bravado"]);

  _templateObject292 = function _templateObject292() {
    return data;
  };

  return data;
}

function _templateObject291() {
  var data = _taggedTemplateLiteral(["Big"]);

  _templateObject291 = function _templateObject291() {
    return data;
  };

  return data;
}

function _templateObject290() {
  var data = _taggedTemplateLiteral(["The X-32-F Combat Training Snowman"]);

  _templateObject290 = function _templateObject290() {
    return data;
  };

  return data;
}

function _templateObject289() {
  var data = _taggedTemplateLiteral(["7340"]);

  _templateObject289 = function _templateObject289() {
    return data;
  };

  return data;
}

function _templateObject288() {
  var data = _taggedTemplateLiteral(["melodramedary"]);

  _templateObject288 = function _templateObject288() {
    return data;
  };

  return data;
}

function _templateObject287() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject287 = function _templateObject287() {
    return data;
  };

  return data;
}

function _templateObject286() {
  var data = _taggedTemplateLiteral(["astral pilsner"]);

  _templateObject286 = function _templateObject286() {
    return data;
  };

  return data;
}

function _templateObject285() {
  var data = _taggedTemplateLiteral(["astral six-pack"]);

  _templateObject285 = function _templateObject285() {
    return data;
  };

  return data;
}

function _templateObject284() {
  var data = _taggedTemplateLiteral(["oil of expertise"]);

  _templateObject284 = function _templateObject284() {
    return data;
  };

  return data;
}

function _templateObject283() {
  var data = _taggedTemplateLiteral(["Expert Oiliness"]);

  _templateObject283 = function _templateObject283() {
    return data;
  };

  return data;
}

function _templateObject282() {
  var data = _taggedTemplateLiteral(["Bind Undead Elbow Macaroni"]);

  _templateObject282 = function _templateObject282() {
    return data;
  };

  return data;
}

function _templateObject281() {
  var data = _taggedTemplateLiteral(["Pastamancer"]);

  _templateObject281 = function _templateObject281() {
    return data;
  };

  return data;
}

function _templateObject280() {
  var data = _taggedTemplateLiteral(["muscle"]);

  _templateObject280 = function _templateObject280() {
    return data;
  };

  return data;
}

function _templateObject279() {
  var data = _taggedTemplateLiteral(["disembodied hand"]);

  _templateObject279 = function _templateObject279() {
    return data;
  };

  return data;
}

function _templateObject278() {
  var data = _taggedTemplateLiteral(["Ben-Gal&trade; balm"]);

  _templateObject278 = function _templateObject278() {
    return data;
  };

  return data;
}

function _templateObject277() {
  var data = _taggedTemplateLiteral(["Go Get 'Em, Tiger!"], ["Go Get \\'Em, Tiger!"]);

  _templateObject277 = function _templateObject277() {
    return data;
  };

  return data;
}

function _templateObject276() {
  var data = _taggedTemplateLiteral(["Disdain of the War Snapper"]);

  _templateObject276 = function _templateObject276() {
    return data;
  };

  return data;
}

function _templateObject275() {
  var data = _taggedTemplateLiteral(["Quiet Determination"]);

  _templateObject275 = function _templateObject275() {
    return data;
  };

  return data;
}

function _templateObject274() {
  var data = _taggedTemplateLiteral(["Rage of the Reindeer"]);

  _templateObject274 = function _templateObject274() {
    return data;
  };

  return data;
}

function _templateObject273() {
  var data = _taggedTemplateLiteral(["Big"]);

  _templateObject273 = function _templateObject273() {
    return data;
  };

  return data;
}

function _templateObject272() {
  var data = _taggedTemplateLiteral(["Song of Starch"]);

  _templateObject272 = function _templateObject272() {
    return data;
  };

  return data;
}

function _templateObject271() {
  var data = _taggedTemplateLiteral(["oil of expertise"]);

  _templateObject271 = function _templateObject271() {
    return data;
  };

  return data;
}

function _templateObject270() {
  var data = _taggedTemplateLiteral(["Expert Oiliness"]);

  _templateObject270 = function _templateObject270() {
    return data;
  };

  return data;
}

function _templateObject269() {
  var data = _taggedTemplateLiteral(["Bind Undead Elbow Macaroni"]);

  _templateObject269 = function _templateObject269() {
    return data;
  };

  return data;
}

function _templateObject268() {
  var data = _taggedTemplateLiteral(["Pastamancer"]);

  _templateObject268 = function _templateObject268() {
    return data;
  };

  return data;
}

function _templateObject267() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject267 = function _templateObject267() {
    return data;
  };

  return data;
}

function _templateObject266() {
  var data = _taggedTemplateLiteral(["The Neverending Party"]);

  _templateObject266 = function _templateObject266() {
    return data;
  };

  return data;
}

function _templateObject265() {
  var data = _taggedTemplateLiteral(["feel pride"]);

  _templateObject265 = function _templateObject265() {
    return data;
  };

  return data;
}

function _templateObject264() {
  var data = _taggedTemplateLiteral(["The Neverending Party"]);

  _templateObject264 = function _templateObject264() {
    return data;
  };

  return data;
}

function _templateObject263() {
  var data = _taggedTemplateLiteral(["Feeling Excited"]);

  _templateObject263 = function _templateObject263() {
    return data;
  };

  return data;
}

function _templateObject262() {
  var data = _taggedTemplateLiteral(["ur-kel's aria of annoyance"], ["ur-kel\\'s aria of annoyance"]);

  _templateObject262 = function _templateObject262() {
    return data;
  };

  return data;
}

function _templateObject261() {
  var data = _taggedTemplateLiteral(["drescher's annoying noise"], ["drescher\\'s annoying noise"]);

  _templateObject261 = function _templateObject261() {
    return data;
  };

  return data;
}

function _templateObject260() {
  var data = _taggedTemplateLiteral(["pride of the puffin"]);

  _templateObject260 = function _templateObject260() {
    return data;
  };

  return data;
}

function _templateObject259() {
  var data = _taggedTemplateLiteral(["inscrutable gaze"]);

  _templateObject259 = function _templateObject259() {
    return data;
  };

  return data;
}

function _templateObject258() {
  var data = _taggedTemplateLiteral(["Polka of Plenty"]);

  _templateObject258 = function _templateObject258() {
    return data;
  };

  return data;
}

function _templateObject257() {
  var data = _taggedTemplateLiteral(["The Magical Mojomuscular Melody"]);

  _templateObject257 = function _templateObject257() {
    return data;
  };

  return data;
}

function _templateObject256() {
  var data = _taggedTemplateLiteral(["glittery mascara"]);

  _templateObject256 = function _templateObject256() {
    return data;
  };

  return data;
}

function _templateObject255() {
  var data = _taggedTemplateLiteral(["Glittering Eyelashes"]);

  _templateObject255 = function _templateObject255() {
    return data;
  };

  return data;
}

function _templateObject254() {
  var data = _taggedTemplateLiteral(["song of the north"]);

  _templateObject254 = function _templateObject254() {
    return data;
  };

  return data;
}

function _templateObject253() {
  var data = _taggedTemplateLiteral(["carol of the bulls"]);

  _templateObject253 = function _templateObject253() {
    return data;
  };

  return data;
}

function _templateObject252() {
  var data = _taggedTemplateLiteral(["saucegeyser"]);

  _templateObject252 = function _templateObject252() {
    return data;
  };

  return data;
}

function _templateObject251() {
  var data = _taggedTemplateLiteral(["God Lobster's Scepter"], ["God Lobster\\'s Scepter"]);

  _templateObject251 = function _templateObject251() {
    return data;
  };

  return data;
}

function _templateObject250() {
  var data = _taggedTemplateLiteral(["God Lobster"]);

  _templateObject250 = function _templateObject250() {
    return data;
  };

  return data;
}

function _templateObject249() {
  var data = _taggedTemplateLiteral(["Carlweather's Cantata of Confrontation"], ["Carlweather\\'s Cantata of Confrontation"]);

  _templateObject249 = function _templateObject249() {
    return data;
  };

  return data;
}

function _templateObject248() {
  var data = _taggedTemplateLiteral(["razor-sharp can lid"]);

  _templateObject248 = function _templateObject248() {
    return data;
  };

  return data;
}

function _templateObject247() {
  var data = _taggedTemplateLiteral(["back-up to your last enemy"]);

  _templateObject247 = function _templateObject247() {
    return data;
  };

  return data;
}

function _templateObject246() {
  var data = _taggedTemplateLiteral(["Noob Cave"]);

  _templateObject246 = function _templateObject246() {
    return data;
  };

  return data;
}

function _templateObject245() {
  var data = _taggedTemplateLiteral(["backup camera"]);

  _templateObject245 = function _templateObject245() {
    return data;
  };

  return data;
}

function _templateObject244() {
  var data = _taggedTemplateLiteral(["acc2"]);

  _templateObject244 = function _templateObject244() {
    return data;
  };

  return data;
}

function _templateObject243() {
  var data = _taggedTemplateLiteral(["The Deep Machine Tunnels"]);

  _templateObject243 = function _templateObject243() {
    return data;
  };

  return data;
}

function _templateObject242() {
  var data = _taggedTemplateLiteral(["machine elf"]);

  _templateObject242 = function _templateObject242() {
    return data;
  };

  return data;
}

function _templateObject241() {
  var data = _taggedTemplateLiteral(["LOV epaulettes"]);

  _templateObject241 = function _templateObject241() {
    return data;
  };

  return data;
}

function _templateObject240() {
  var data = _taggedTemplateLiteral(["hewn moon-rune spoon"]);

  _templateObject240 = function _templateObject240() {
    return data;
  };

  return data;
}

function _templateObject239() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject239 = function _templateObject239() {
    return data;
  };

  return data;
}

function _templateObject238() {
  var data = _taggedTemplateLiteral(["Brutal brogues"]);

  _templateObject238 = function _templateObject238() {
    return data;
  };

  return data;
}

function _templateObject237() {
  var data = _taggedTemplateLiteral(["acc2"]);

  _templateObject237 = function _templateObject237() {
    return data;
  };

  return data;
}

function _templateObject236() {
  var data = _taggedTemplateLiteral(["Eight Days a Week Pill Keeper"]);

  _templateObject236 = function _templateObject236() {
    return data;
  };

  return data;
}

function _templateObject235() {
  var data = _taggedTemplateLiteral(["acc1"]);

  _templateObject235 = function _templateObject235() {
    return data;
  };

  return data;
}

function _templateObject234() {
  var data = _taggedTemplateLiteral(["familiar scrapbook"]);

  _templateObject234 = function _templateObject234() {
    return data;
  };

  return data;
}

function _templateObject233() {
  var data = _taggedTemplateLiteral(["off-hand"]);

  _templateObject233 = function _templateObject233() {
    return data;
  };

  return data;
}

function _templateObject232() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject232 = function _templateObject232() {
    return data;
  };

  return data;
}

function _templateObject231() {
  var data = _taggedTemplateLiteral(["makeshift garbage shirt"]);

  _templateObject231 = function _templateObject231() {
    return data;
  };

  return data;
}

function _templateObject230() {
  var data = _taggedTemplateLiteral(["feel hatred"]);

  _templateObject230 = function _templateObject230() {
    return data;
  };

  return data;
}

function _templateObject229() {
  var data = _taggedTemplateLiteral(["DNA Extraction Syringe"]);

  _templateObject229 = function _templateObject229() {
    return data;
  };

  return data;
}

function _templateObject228() {
  var data = _taggedTemplateLiteral(["extract"]);

  _templateObject228 = function _templateObject228() {
    return data;
  };

  return data;
}

function _templateObject227() {
  var data = _taggedTemplateLiteral(["macrometeorite"]);

  _templateObject227 = function _templateObject227() {
    return data;
  };

  return data;
}

function _templateObject226() {
  var data = _taggedTemplateLiteral(["extract"]);

  _templateObject226 = function _templateObject226() {
    return data;
  };

  return data;
}

function _templateObject225() {
  var data = _taggedTemplateLiteral(["The Bubblin' Caldera"], ["The Bubblin\\' Caldera"]);

  _templateObject225 = function _templateObject225() {
    return data;
  };

  return data;
}

function _templateObject224() {
  var data = _taggedTemplateLiteral(["the bubblin' caldera"], ["the bubblin\\' caldera"]);

  _templateObject224 = function _templateObject224() {
    return data;
  };

  return data;
}

function _templateObject223() {
  var data = _taggedTemplateLiteral(["the bubblin' caldera"], ["the bubblin\\' caldera"]);

  _templateObject223 = function _templateObject223() {
    return data;
  };

  return data;
}

function _templateObject222() {
  var data = _taggedTemplateLiteral(["The Bubblin' Caldera"], ["The Bubblin\\' Caldera"]);

  _templateObject222 = function _templateObject222() {
    return data;
  };

  return data;
}

function _templateObject221() {
  var data = _taggedTemplateLiteral(["The Bubblin' Caldera"], ["The Bubblin\\' Caldera"]);

  _templateObject221 = function _templateObject221() {
    return data;
  };

  return data;
}

function _templateObject220() {
  var data = _taggedTemplateLiteral(["the bubblin' caldera"], ["the bubblin\\' caldera"]);

  _templateObject220 = function _templateObject220() {
    return data;
  };

  return data;
}

function _templateObject219() {
  var data = _taggedTemplateLiteral(["The Neverending Party"]);

  _templateObject219 = function _templateObject219() {
    return data;
  };

  return data;
}

function _templateObject218() {
  var data = _taggedTemplateLiteral(["The Neverending Party"]);

  _templateObject218 = function _templateObject218() {
    return data;
  };

  return data;
}

function _templateObject217() {
  var data = _taggedTemplateLiteral(["Pocket Professor"]);

  _templateObject217 = function _templateObject217() {
    return data;
  };

  return data;
}

function _templateObject216() {
  var data = _taggedTemplateLiteral(["makeshift garbage shirt"]);

  _templateObject216 = function _templateObject216() {
    return data;
  };

  return data;
}

function _templateObject215() {
  var data = _taggedTemplateLiteral(["shirt"]);

  _templateObject215 = function _templateObject215() {
    return data;
  };

  return data;
}

function _templateObject214() {
  var data = _taggedTemplateLiteral(["battle broom"]);

  _templateObject214 = function _templateObject214() {
    return data;
  };

  return data;
}

function _templateObject213() {
  var data = _taggedTemplateLiteral(["acc1"]);

  _templateObject213 = function _templateObject213() {
    return data;
  };

  return data;
}

function _templateObject212() {
  var data = _taggedTemplateLiteral(["carol of the bulls"]);

  _templateObject212 = function _templateObject212() {
    return data;
  };

  return data;
}

function _templateObject211() {
  var data = _taggedTemplateLiteral(["carol of the bulls"]);

  _templateObject211 = function _templateObject211() {
    return data;
  };

  return data;
}

function _templateObject210() {
  var data = _taggedTemplateLiteral(["fourth of may cosplay saber"]);

  _templateObject210 = function _templateObject210() {
    return data;
  };

  return data;
}

function _templateObject209() {
  var data = _taggedTemplateLiteral(["saucepan"]);

  _templateObject209 = function _templateObject209() {
    return data;
  };

  return data;
}

function _templateObject208() {
  var data = _taggedTemplateLiteral(["turtle totem"]);

  _templateObject208 = function _templateObject208() {
    return data;
  };

  return data;
}

function _templateObject207() {
  var data = _taggedTemplateLiteral(["Song of Bravado"]);

  _templateObject207 = function _templateObject207() {
    return data;
  };

  return data;
}

function _templateObject206() {
  var data = _taggedTemplateLiteral(["The X-32-F Combat Training Snowman"]);

  _templateObject206 = function _templateObject206() {
    return data;
  };

  return data;
}

function _templateObject205() {
  var data = _taggedTemplateLiteral(["saucestorm"]);

  _templateObject205 = function _templateObject205() {
    return data;
  };

  return data;
}

function _templateObject204() {
  var data = _taggedTemplateLiteral(["DNA extraction syringe"]);

  _templateObject204 = function _templateObject204() {
    return data;
  };

  return data;
}

function _templateObject203() {
  var data = _taggedTemplateLiteral(["The X-32-F Combat Training Snowman"]);

  _templateObject203 = function _templateObject203() {
    return data;
  };

  return data;
}

function _templateObject202() {
  var data = _taggedTemplateLiteral(["gene tonic: construct"]);

  _templateObject202 = function _templateObject202() {
    return data;
  };

  return data;
}

function _templateObject201() {
  var data = _taggedTemplateLiteral(["none"]);

  _templateObject201 = function _templateObject201() {
    return data;
  };

  return data;
}

function _templateObject200() {
  var data = _taggedTemplateLiteral(["shirt"]);

  _templateObject200 = function _templateObject200() {
    return data;
  };

  return data;
}

function _templateObject199() {
  var data = _taggedTemplateLiteral(["familiar scrapbook"]);

  _templateObject199 = function _templateObject199() {
    return data;
  };

  return data;
}

function _templateObject198() {
  var data = _taggedTemplateLiteral(["offhand"]);

  _templateObject198 = function _templateObject198() {
    return data;
  };

  return data;
}

function _templateObject197() {
  var data = _taggedTemplateLiteral(["The Magic of LOV"]);

  _templateObject197 = function _templateObject197() {
    return data;
  };

  return data;
}

function _templateObject196() {
  var data = _taggedTemplateLiteral(["lov elixir #6"], ["lov elixir \\#6"]);

  _templateObject196 = function _templateObject196() {
    return data;
  };

  return data;
}

function _templateObject195() {
  var data = _taggedTemplateLiteral(["little paper umbrella"]);

  _templateObject195 = function _templateObject195() {
    return data;
  };

  return data;
}

function _templateObject194() {
  var data = _taggedTemplateLiteral(["magical ice cubes"]);

  _templateObject194 = function _templateObject194() {
    return data;
  };

  return data;
}

function _templateObject193() {
  var data = _taggedTemplateLiteral(["coconut shell"]);

  _templateObject193 = function _templateObject193() {
    return data;
  };

  return data;
}

function _templateObject192() {
  var data = _taggedTemplateLiteral(["Perfect Freeze"]);

  _templateObject192 = function _templateObject192() {
    return data;
  };

  return data;
}

function _templateObject191() {
  var data = _taggedTemplateLiteral(["Acquire Rhinestones"]);

  _templateObject191 = function _templateObject191() {
    return data;
  };

  return data;
}

function _templateObject190() {
  var data = _taggedTemplateLiteral(["Grab a Cold One"]);

  _templateObject190 = function _templateObject190() {
    return data;
  };

  return data;
}

function _templateObject189() {
  var data = _taggedTemplateLiteral(["Spaghetti Breakfast"]);

  _templateObject189 = function _templateObject189() {
    return data;
  };

  return data;
}

function _templateObject188() {
  var data = _taggedTemplateLiteral(["Pastamastery"]);

  _templateObject188 = function _templateObject188() {
    return data;
  };

  return data;
}

function _templateObject187() {
  var data = _taggedTemplateLiteral(["Advanced Cocktailcrafting"]);

  _templateObject187 = function _templateObject187() {
    return data;
  };

  return data;
}

function _templateObject186() {
  var data = _taggedTemplateLiteral(["a ten-percent bonus"]);

  _templateObject186 = function _templateObject186() {
    return data;
  };

  return data;
}

function _templateObject185() {
  var data = _taggedTemplateLiteral(["LOV Epaulettes"]);

  _templateObject185 = function _templateObject185() {
    return data;
  };

  return data;
}

function _templateObject184() {
  var data = _taggedTemplateLiteral(["The Tunnel of L.O.V.E."]);

  _templateObject184 = function _templateObject184() {
    return data;
  };

  return data;
}

function _templateObject183() {
  var data = _taggedTemplateLiteral(["saucegeyser"]);

  _templateObject183 = function _templateObject183() {
    return data;
  };

  return data;
}

function _templateObject182() {
  var data = _taggedTemplateLiteral(["carol of the hells"]);

  _templateObject182 = function _templateObject182() {
    return data;
  };

  return data;
}

function _templateObject181() {
  var data = _taggedTemplateLiteral(["carol of the bulls"]);

  _templateObject181 = function _templateObject181() {
    return data;
  };

  return data;
}

function _templateObject180() {
  var data = _taggedTemplateLiteral(["ointment of the occult"]);

  _templateObject180 = function _templateObject180() {
    return data;
  };

  return data;
}

function _templateObject179() {
  var data = _taggedTemplateLiteral(["Mystically Oiled"]);

  _templateObject179 = function _templateObject179() {
    return data;
  };

  return data;
}

function _templateObject178() {
  var data = _taggedTemplateLiteral(["Dramatic&trade; range"]);

  _templateObject178 = function _templateObject178() {
    return data;
  };

  return data;
}

function _templateObject177() {
  var data = _taggedTemplateLiteral(["Dramatic&trade; range"]);

  _templateObject177 = function _templateObject177() {
    return data;
  };

  return data;
}

function _templateObject176() {
  var data = _taggedTemplateLiteral(["Song of Bravado"]);

  _templateObject176 = function _templateObject176() {
    return data;
  };

  return data;
}

function _templateObject175() {
  var data = _taggedTemplateLiteral(["Blessing of your favorite Bird"]);

  _templateObject175 = function _templateObject175() {
    return data;
  };

  return data;
}

function _templateObject174() {
  var data = _taggedTemplateLiteral(["We're All Made of Starfish"], ["We\\'re All Made of Starfish"]);

  _templateObject174 = function _templateObject174() {
    return data;
  };

  return data;
}

function _templateObject173() {
  var data = _taggedTemplateLiteral(["Do I Know You From Somewhere?"]);

  _templateObject173 = function _templateObject173() {
    return data;
  };

  return data;
}

function _templateObject172() {
  var data = _taggedTemplateLiteral(["Fidoxene"]);

  _templateObject172 = function _templateObject172() {
    return data;
  };

  return data;
}

function _templateObject171() {
  var data = _taggedTemplateLiteral(["Big"]);

  _templateObject171 = function _templateObject171() {
    return data;
  };

  return data;
}

function _templateObject170() {
  var data = _taggedTemplateLiteral(["glittery mascara"]);

  _templateObject170 = function _templateObject170() {
    return data;
  };

  return data;
}

function _templateObject169() {
  var data = _taggedTemplateLiteral(["Glittering Eyelashes"]);

  _templateObject169 = function _templateObject169() {
    return data;
  };

  return data;
}

function _templateObject168() {
  var data = _taggedTemplateLiteral(["The Magical Mojomuscular Melody"]);

  _templateObject168 = function _templateObject168() {
    return data;
  };

  return data;
}

function _templateObject167() {
  var data = _taggedTemplateLiteral(["Feeling Excited"]);

  _templateObject167 = function _templateObject167() {
    return data;
  };

  return data;
}

function _templateObject166() {
  var data = _taggedTemplateLiteral(["Triple-Sized"]);

  _templateObject166 = function _templateObject166() {
    return data;
  };

  return data;
}

function _templateObject165() {
  var data = _taggedTemplateLiteral(["Starry-Eyed"]);

  _templateObject165 = function _templateObject165() {
    return data;
  };

  return data;
}

function _templateObject164() {
  var data = _taggedTemplateLiteral(["Favored by Lyle"]);

  _templateObject164 = function _templateObject164() {
    return data;
  };

  return data;
}

function _templateObject163() {
  var data = _taggedTemplateLiteral(["chubby and plump bar"]);

  _templateObject163 = function _templateObject163() {
    return data;
  };

  return data;
}

function _templateObject162() {
  var data = _taggedTemplateLiteral(["bag of many confections"]);

  _templateObject162 = function _templateObject162() {
    return data;
  };

  return data;
}

function _templateObject161() {
  var data = _taggedTemplateLiteral(["Synthesis: Smart"]);

  _templateObject161 = function _templateObject161() {
    return data;
  };

  return data;
}

function _templateObject160() {
  var data = _taggedTemplateLiteral(["peppermint sprout"]);

  _templateObject160 = function _templateObject160() {
    return data;
  };

  return data;
}

function _templateObject159() {
  var data = _taggedTemplateLiteral(["crimbo peppermint bark"]);

  _templateObject159 = function _templateObject159() {
    return data;
  };

  return data;
}

function _templateObject158() {
  var data = _taggedTemplateLiteral(["Synthesis: Learning"]);

  _templateObject158 = function _templateObject158() {
    return data;
  };

  return data;
}

function _templateObject157() {
  var data = _taggedTemplateLiteral(["crimbo peppermint bark"]);

  _templateObject157 = function _templateObject157() {
    return data;
  };

  return data;
}

function _templateObject156() {
  var data = _taggedTemplateLiteral(["crimbo fudge"]);

  _templateObject156 = function _templateObject156() {
    return data;
  };

  return data;
}

function _templateObject155() {
  var data = _taggedTemplateLiteral(["crimbo fudge"]);

  _templateObject155 = function _templateObject155() {
    return data;
  };

  return data;
}

function _templateObject154() {
  var data = _taggedTemplateLiteral(["Synthesis: Learning"]);

  _templateObject154 = function _templateObject154() {
    return data;
  };

  return data;
}

function _templateObject153() {
  var data = _taggedTemplateLiteral(["crimbo fudge"]);

  _templateObject153 = function _templateObject153() {
    return data;
  };

  return data;
}

function _templateObject152() {
  var data = _taggedTemplateLiteral(["baby bugged bugbear"]);

  _templateObject152 = function _templateObject152() {
    return data;
  };

  return data;
}

function _templateObject151() {
  var data = _taggedTemplateLiteral(["crimbo candied pecan"]);

  _templateObject151 = function _templateObject151() {
    return data;
  };

  return data;
}

function _templateObject150() {
  var data = _taggedTemplateLiteral(["sugar shotgun"]);

  _templateObject150 = function _templateObject150() {
    return data;
  };

  return data;
}

function _templateObject149() {
  var data = _taggedTemplateLiteral(["summon sugar sheets"]);

  _templateObject149 = function _templateObject149() {
    return data;
  };

  return data;
}

function _templateObject148() {
  var data = _taggedTemplateLiteral(["Synthesis: Learning"]);

  _templateObject148 = function _templateObject148() {
    return data;
  };

  return data;
}

function _templateObject147() {
  var data = _taggedTemplateLiteral(["crimbo peppermint bark"]);

  _templateObject147 = function _templateObject147() {
    return data;
  };

  return data;
}

function _templateObject146() {
  var data = _taggedTemplateLiteral(["crimbo candied pecan"]);

  _templateObject146 = function _templateObject146() {
    return data;
  };

  return data;
}

function _templateObject145() {
  var data = _taggedTemplateLiteral(["Chubby and Plump"]);

  _templateObject145 = function _templateObject145() {
    return data;
  };

  return data;
}

function _templateObject144() {
  var data = _taggedTemplateLiteral(["Summon Crimbo Candy"]);

  _templateObject144 = function _templateObject144() {
    return data;
  };

  return data;
}

function _templateObject143() {
  var data = _taggedTemplateLiteral(["hewn moon-rune spoon"]);

  _templateObject143 = function _templateObject143() {
    return data;
  };

  return data;
}

function _templateObject142() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject142 = function _templateObject142() {
    return data;
  };

  return data;
}

function _templateObject141() {
  var data = _taggedTemplateLiteral(["brutal brogues"]);

  _templateObject141 = function _templateObject141() {
    return data;
  };

  return data;
}

function _templateObject140() {
  var data = _taggedTemplateLiteral(["acc2"]);

  _templateObject140 = function _templateObject140() {
    return data;
  };

  return data;
}

function _templateObject139() {
  var data = _taggedTemplateLiteral(["Eight Days a Week Pill Keeper"]);

  _templateObject139 = function _templateObject139() {
    return data;
  };

  return data;
}

function _templateObject138() {
  var data = _taggedTemplateLiteral(["acc1"]);

  _templateObject138 = function _templateObject138() {
    return data;
  };

  return data;
}

function _templateObject137() {
  var data = _taggedTemplateLiteral(["Cargo Cultist Shorts"]);

  _templateObject137 = function _templateObject137() {
    return data;
  };

  return data;
}

function _templateObject136() {
  var data = _taggedTemplateLiteral(["weeping willow wand"]);

  _templateObject136 = function _templateObject136() {
    return data;
  };

  return data;
}

function _templateObject135() {
  var data = _taggedTemplateLiteral(["offhand"]);

  _templateObject135 = function _templateObject135() {
    return data;
  };

  return data;
}

function _templateObject134() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject134 = function _templateObject134() {
    return data;
  };

  return data;
}

function _templateObject133() {
  var data = _taggedTemplateLiteral(["10647"]);

  _templateObject133 = function _templateObject133() {
    return data;
  };

  return data;
}

function _templateObject132() {
  var data = _taggedTemplateLiteral(["makeshift garbage shirt"]);

  _templateObject132 = function _templateObject132() {
    return data;
  };

  return data;
}

function _templateObject131() {
  var data = _taggedTemplateLiteral(["shirt"]);

  _templateObject131 = function _templateObject131() {
    return data;
  };

  return data;
}

function _templateObject130() {
  var data = _taggedTemplateLiteral(["Iunion Crown"]);

  _templateObject130 = function _templateObject130() {
    return data;
  };

  return data;
}

function _templateObject129() {
  var data = _taggedTemplateLiteral(["Lil' Doctor&trade; Bag"], ["Lil\\' Doctor&trade; Bag"]);

  _templateObject129 = function _templateObject129() {
    return data;
  };

  return data;
}

function _templateObject128() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject128 = function _templateObject128() {
    return data;
  };

  return data;
}

function _templateObject127() {
  var data = _taggedTemplateLiteral(["Powerful Glove"]);

  _templateObject127 = function _templateObject127() {
    return data;
  };

  return data;
}

function _templateObject126() {
  var data = _taggedTemplateLiteral(["acc2"]);

  _templateObject126 = function _templateObject126() {
    return data;
  };

  return data;
}

function _templateObject125() {
  var data = _taggedTemplateLiteral(["Eight Days a Week Pill Keeper"]);

  _templateObject125 = function _templateObject125() {
    return data;
  };

  return data;
}

function _templateObject124() {
  var data = _taggedTemplateLiteral(["acc1"]);

  _templateObject124 = function _templateObject124() {
    return data;
  };

  return data;
}

function _templateObject123() {
  var data = _taggedTemplateLiteral(["familiar scrapbook"]);

  _templateObject123 = function _templateObject123() {
    return data;
  };

  return data;
}

function _templateObject122() {
  var data = _taggedTemplateLiteral(["bitchin' meatcar"], ["bitchin\\' meatcar"]);

  _templateObject122 = function _templateObject122() {
    return data;
  };

  return data;
}

function _templateObject121() {
  var data = _taggedTemplateLiteral(["tires"]);

  _templateObject121 = function _templateObject121() {
    return data;
  };

  return data;
}

function _templateObject120() {
  var data = _taggedTemplateLiteral(["sweet rims"]);

  _templateObject120 = function _templateObject120() {
    return data;
  };

  return data;
}

function _templateObject119() {
  var data = _taggedTemplateLiteral(["empty meat tank"]);

  _templateObject119 = function _templateObject119() {
    return data;
  };

  return data;
}

function _templateObject118() {
  var data = _taggedTemplateLiteral(["spring"]);

  _templateObject118 = function _templateObject118() {
    return data;
  };

  return data;
}

function _templateObject117() {
  var data = _taggedTemplateLiteral(["sprocket"]);

  _templateObject117 = function _templateObject117() {
    return data;
  };

  return data;
}

function _templateObject116() {
  var data = _taggedTemplateLiteral(["cog"]);

  _templateObject116 = function _templateObject116() {
    return data;
  };

  return data;
}

function _templateObject115() {
  var data = _taggedTemplateLiteral(["bitchin' meatcar"], ["bitchin\\' meatcar"]);

  _templateObject115 = function _templateObject115() {
    return data;
  };

  return data;
}

function _templateObject114() {
  var data = _taggedTemplateLiteral(["You Learned Something Maybe!"]);

  _templateObject114 = function _templateObject114() {
    return data;
  };

  return data;
}

function _templateObject113() {
  var data = _taggedTemplateLiteral(["Thaumodynamic"]);

  _templateObject113 = function _templateObject113() {
    return data;
  };

  return data;
}

function _templateObject112() {
  var data = _taggedTemplateLiteral(["Inscrutable Gaze"]);

  _templateObject112 = function _templateObject112() {
    return data;
  };

  return data;
}

function _templateObject111() {
  var data = _taggedTemplateLiteral(["Uncucumbered"]);

  _templateObject111 = function _templateObject111() {
    return data;
  };

  return data;
}

function _templateObject110() {
  var data = _taggedTemplateLiteral(["Love Mixology"]);

  _templateObject110 = function _templateObject110() {
    return data;
  };

  return data;
}

function _templateObject109() {
  var data = _taggedTemplateLiteral(["Tainted Love Potion"]);

  _templateObject109 = function _templateObject109() {
    return data;
  };

  return data;
}

function _templateObject108() {
  var data = _taggedTemplateLiteral(["Love Potion #0"]);

  _templateObject108 = function _templateObject108() {
    return data;
  };

  return data;
}

function _templateObject107() {
  var data = _taggedTemplateLiteral(["shoe gum"]);

  _templateObject107 = function _templateObject107() {
    return data;
  };

  return data;
}

function _templateObject106() {
  var data = _taggedTemplateLiteral(["fish hatchet"]);

  _templateObject106 = function _templateObject106() {
    return data;
  };

  return data;
}

function _templateObject105() {
  var data = _taggedTemplateLiteral(["That's Just Cloud-Talk, Man"], ["That\\'s Just Cloud-Talk, Man"]);

  _templateObject105 = function _templateObject105() {
    return data;
  };

  return data;
}

function _templateObject104() {
  var data = _taggedTemplateLiteral(["none"]);

  _templateObject104 = function _templateObject104() {
    return data;
  };

  return data;
}

function _templateObject103() {
  var data = _taggedTemplateLiteral(["Amateur ninja"]);

  _templateObject103 = function _templateObject103() {
    return data;
  };

  return data;
}

function _templateObject102() {
  var data = _taggedTemplateLiteral(["The Haiku Dungeon"]);

  _templateObject102 = function _templateObject102() {
    return data;
  };

  return data;
}

function _templateObject101() {
  var data = _taggedTemplateLiteral(["shattering punch"]);

  _templateObject101 = function _templateObject101() {
    return data;
  };

  return data;
}

function _templateObject100() {
  var data = _taggedTemplateLiteral(["9140"]);

  _templateObject100 = function _templateObject100() {
    return data;
  };

  return data;
}

function _templateObject99() {
  var data = _taggedTemplateLiteral(["familiar scrapbook"]);

  _templateObject99 = function _templateObject99() {
    return data;
  };

  return data;
}

function _templateObject98() {
  var data = _taggedTemplateLiteral(["off-hand"]);

  _templateObject98 = function _templateObject98() {
    return data;
  };

  return data;
}

function _templateObject97() {
  var data = _taggedTemplateLiteral(["The Haunted Kitchen"]);

  _templateObject97 = function _templateObject97() {
    return data;
  };

  return data;
}

function _templateObject96() {
  var data = _taggedTemplateLiteral(["digitize"]);

  _templateObject96 = function _templateObject96() {
    return data;
  };

  return data;
}

function _templateObject95() {
  var data = _taggedTemplateLiteral(["10647"]);

  _templateObject95 = function _templateObject95() {
    return data;
  };

  return data;
}

function _templateObject94() {
  var data = _taggedTemplateLiteral(["Kramco Sausage-o-Matic&trade;"]);

  _templateObject94 = function _templateObject94() {
    return data;
  };

  return data;
}

function _templateObject93() {
  var data = _taggedTemplateLiteral(["The Haunted Kitchen"]);

  _templateObject93 = function _templateObject93() {
    return data;
  };

  return data;
}

function _templateObject92() {
  var data = _taggedTemplateLiteral(["shoot ghost"]);

  _templateObject92 = function _templateObject92() {
    return data;
  };

  return data;
}

function _templateObject91() {
  var data = _taggedTemplateLiteral(["shoot ghost"]);

  _templateObject91 = function _templateObject91() {
    return data;
  };

  return data;
}

function _templateObject90() {
  var data = _taggedTemplateLiteral(["shoot ghost"]);

  _templateObject90 = function _templateObject90() {
    return data;
  };

  return data;
}

function _templateObject89() {
  var data = _taggedTemplateLiteral(["stocking mimic"]);

  _templateObject89 = function _templateObject89() {
    return data;
  };

  return data;
}

function _templateObject88() {
  var data = _taggedTemplateLiteral(["familiar scrapbook"]);

  _templateObject88 = function _templateObject88() {
    return data;
  };

  return data;
}

function _templateObject87() {
  var data = _taggedTemplateLiteral(["off-hand"]);

  _templateObject87 = function _templateObject87() {
    return data;
  };

  return data;
}

function _templateObject86() {
  var data = _taggedTemplateLiteral(["Prevent Scurvy and Sobriety"]);

  _templateObject86 = function _templateObject86() {
    return data;
  };

  return data;
}

function _templateObject85() {
  var data = _taggedTemplateLiteral(["Advanced Saucecrafting"]);

  _templateObject85 = function _templateObject85() {
    return data;
  };

  return data;
}

function _templateObject84() {
  var data = _taggedTemplateLiteral(["borrowed time"]);

  _templateObject84 = function _templateObject84() {
    return data;
  };

  return data;
}

function _templateObject83() {
  var data = _taggedTemplateLiteral(["borrowed time"]);

  _templateObject83 = function _templateObject83() {
    return data;
  };

  return data;
}

function _templateObject82() {
  var data = _taggedTemplateLiteral(["gulp latte"]);

  _templateObject82 = function _templateObject82() {
    return data;
  };

  return data;
}

function _templateObject81() {
  var data = _taggedTemplateLiteral(["dromedary drinking helmet"]);

  _templateObject81 = function _templateObject81() {
    return data;
  };

  return data;
}

function _templateObject80() {
  var data = _taggedTemplateLiteral(["box of familiar jacks"]);

  _templateObject80 = function _templateObject80() {
    return data;
  };

  return data;
}

function _templateObject79() {
  var data = _taggedTemplateLiteral(["melodramedary"]);

  _templateObject79 = function _templateObject79() {
    return data;
  };

  return data;
}

function _templateObject78() {
  var data = _taggedTemplateLiteral(["10580"]);

  _templateObject78 = function _templateObject78() {
    return data;
  };

  return data;
}

function _templateObject77() {
  var data = _taggedTemplateLiteral(["Beach Comb"]);

  _templateObject77 = function _templateObject77() {
    return data;
  };

  return data;
}

function _templateObject76() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject76 = function _templateObject76() {
    return data;
  };

  return data;
}

function _templateObject75() {
  var data = _taggedTemplateLiteral(["hewn moon-rune spoon"]);

  _templateObject75 = function _templateObject75() {
    return data;
  };

  return data;
}

function _templateObject74() {
  var data = _taggedTemplateLiteral(["acc2"]);

  _templateObject74 = function _templateObject74() {
    return data;
  };

  return data;
}

function _templateObject73() {
  var data = _taggedTemplateLiteral(["Eight Days a Week Pill Keeper"]);

  _templateObject73 = function _templateObject73() {
    return data;
  };

  return data;
}

function _templateObject72() {
  var data = _taggedTemplateLiteral(["acc1"]);

  _templateObject72 = function _templateObject72() {
    return data;
  };

  return data;
}

function _templateObject71() {
  var data = _taggedTemplateLiteral(["Cargo Cultist Shorts"]);

  _templateObject71 = function _templateObject71() {
    return data;
  };

  return data;
}

function _templateObject70() {
  var data = _taggedTemplateLiteral(["protonic accelerator pack"]);

  _templateObject70 = function _templateObject70() {
    return data;
  };

  return data;
}

function _templateObject69() {
  var data = _taggedTemplateLiteral(["9987"]);

  _templateObject69 = function _templateObject69() {
    return data;
  };

  return data;
}

function _templateObject68() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject68 = function _templateObject68() {
    return data;
  };

  return data;
}

function _templateObject67() {
  var data = _taggedTemplateLiteral(["makeshift garbage shirt"]);

  _templateObject67 = function _templateObject67() {
    return data;
  };

  return data;
}

function _templateObject66() {
  var data = _taggedTemplateLiteral(["shirt"]);

  _templateObject66 = function _templateObject66() {
    return data;
  };

  return data;
}

function _templateObject65() {
  var data = _taggedTemplateLiteral(["Iunion Crown"]);

  _templateObject65 = function _templateObject65() {
    return data;
  };

  return data;
}

function _templateObject64() {
  var data = _taggedTemplateLiteral(["That's Just Cloud-Talk, Man"], ["That\\'s Just Cloud-Talk, Man"]);

  _templateObject64 = function _templateObject64() {
    return data;
  };

  return data;
}

function _templateObject63() {
  var data = _taggedTemplateLiteral(["Inscrutable Gaze"]);

  _templateObject63 = function _templateObject63() {
    return data;
  };

  return data;
}

function _templateObject62() {
  var data = _taggedTemplateLiteral(["Inscrutable Gaze"]);

  _templateObject62 = function _templateObject62() {
    return data;
  };

  return data;
}

function _templateObject61() {
  var data = _taggedTemplateLiteral(["The Magical Mojomuscular Melody"]);

  _templateObject61 = function _templateObject61() {
    return data;
  };

  return data;
}

function _templateObject60() {
  var data = _taggedTemplateLiteral(["pantogram pants"]);

  _templateObject60 = function _templateObject60() {
    return data;
  };

  return data;
}

function _templateObject59() {
  var data = _taggedTemplateLiteral(["toy accordion"]);

  _templateObject59 = function _templateObject59() {
    return data;
  };

  return data;
}

function _templateObject58() {
  var data = _taggedTemplateLiteral(["hamethyst"]);

  _templateObject58 = function _templateObject58() {
    return data;
  };

  return data;
}

function _templateObject57() {
  var data = _taggedTemplateLiteral(["porquoise"]);

  _templateObject57 = function _templateObject57() {
    return data;
  };

  return data;
}

function _templateObject56() {
  var data = _taggedTemplateLiteral(["baconstone"]);

  _templateObject56 = function _templateObject56() {
    return data;
  };

  return data;
}

function _templateObject55() {
  var data = _taggedTemplateLiteral(["pork elf goodies sack"]);

  _templateObject55 = function _templateObject55() {
    return data;
  };

  return data;
}

function _templateObject54() {
  var data = _taggedTemplateLiteral(["letter from King Ralph XI"]);

  _templateObject54 = function _templateObject54() {
    return data;
  };

  return data;
}

function _templateObject53() {
  var data = _taggedTemplateLiteral(["weeping willow wand"]);

  _templateObject53 = function _templateObject53() {
    return data;
  };

  return data;
}

function _templateObject52() {
  var data = _taggedTemplateLiteral(["flimsy hardwood scraps"]);

  _templateObject52 = function _templateObject52() {
    return data;
  };

  return data;
}

function _templateObject51() {
  var data = _taggedTemplateLiteral(["Lil' Doctor&trade; Bag"], ["Lil\\' Doctor&trade; Bag"]);

  _templateObject51 = function _templateObject51() {
    return data;
  };

  return data;
}

function _templateObject50() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject50 = function _templateObject50() {
    return data;
  };

  return data;
}

function _templateObject49() {
  var data = _taggedTemplateLiteral(["Powerful Glove"]);

  _templateObject49 = function _templateObject49() {
    return data;
  };

  return data;
}

function _templateObject48() {
  var data = _taggedTemplateLiteral(["acc2"]);

  _templateObject48 = function _templateObject48() {
    return data;
  };

  return data;
}

function _templateObject47() {
  var data = _taggedTemplateLiteral(["Eight Days a Week Pill Keeper"]);

  _templateObject47 = function _templateObject47() {
    return data;
  };

  return data;
}

function _templateObject46() {
  var data = _taggedTemplateLiteral(["acc1"]);

  _templateObject46 = function _templateObject46() {
    return data;
  };

  return data;
}

function _templateObject45() {
  var data = _taggedTemplateLiteral(["Cargo Cultist Shorts"]);

  _templateObject45 = function _templateObject45() {
    return data;
  };

  return data;
}

function _templateObject44() {
  var data = _taggedTemplateLiteral(["familiar scrapbook"]);

  _templateObject44 = function _templateObject44() {
    return data;
  };

  return data;
}

function _templateObject43() {
  var data = _taggedTemplateLiteral(["offhand"]);

  _templateObject43 = function _templateObject43() {
    return data;
  };

  return data;
}

function _templateObject42() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject42 = function _templateObject42() {
    return data;
  };

  return data;
}

function _templateObject41() {
  var data = _taggedTemplateLiteral(["vampyric cloake"]);

  _templateObject41 = function _templateObject41() {
    return data;
  };

  return data;
}

function _templateObject40() {
  var data = _taggedTemplateLiteral(["none"]);

  _templateObject40 = function _templateObject40() {
    return data;
  };

  return data;
}

function _templateObject39() {
  var data = _taggedTemplateLiteral(["shirt"]);

  _templateObject39 = function _templateObject39() {
    return data;
  };

  return data;
}

function _templateObject38() {
  var data = _taggedTemplateLiteral(["Iunion Crown"]);

  _templateObject38 = function _templateObject38() {
    return data;
  };

  return data;
}

function _templateObject37() {
  var data = _taggedTemplateLiteral(["The Neverending Party"]);

  _templateObject37 = function _templateObject37() {
    return data;
  };

  return data;
}

function _templateObject36() {
  var data = _taggedTemplateLiteral(["battle broom"]);

  _templateObject36 = function _templateObject36() {
    return data;
  };

  return data;
}

function _templateObject35() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject35 = function _templateObject35() {
    return data;
  };

  return data;
}

function _templateObject34() {
  var data = _taggedTemplateLiteral(["Beach Comb"]);

  _templateObject34 = function _templateObject34() {
    return data;
  };

  return data;
}

function _templateObject33() {
  var data = _taggedTemplateLiteral(["acc2"]);

  _templateObject33 = function _templateObject33() {
    return data;
  };

  return data;
}

function _templateObject32() {
  var data = _taggedTemplateLiteral(["Eight Days a Week Pill Keeper"]);

  _templateObject32 = function _templateObject32() {
    return data;
  };

  return data;
}

function _templateObject31() {
  var data = _taggedTemplateLiteral(["acc1"]);

  _templateObject31 = function _templateObject31() {
    return data;
  };

  return data;
}

function _templateObject30() {
  var data = _taggedTemplateLiteral(["Cargo Cultist Shorts"]);

  _templateObject30 = function _templateObject30() {
    return data;
  };

  return data;
}

function _templateObject29() {
  var data = _taggedTemplateLiteral(["Kramco Sausage-o-Matic&trade;"]);

  _templateObject29 = function _templateObject29() {
    return data;
  };

  return data;
}

function _templateObject28() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject28 = function _templateObject28() {
    return data;
  };

  return data;
}

function _templateObject27() {
  var data = _taggedTemplateLiteral(["Iunion Crown"]);

  _templateObject27 = function _templateObject27() {
    return data;
  };

  return data;
}

function _templateObject26() {
  var data = _taggedTemplateLiteral(["BRICKO brick"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = _taggedTemplateLiteral(["Summon BRICKOs"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = _taggedTemplateLiteral(["BRICKO brick"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = _taggedTemplateLiteral(["BRICKO eye brick"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _taggedTemplateLiteral(["BRICKO oyster"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = _taggedTemplateLiteral(["Gene Tonic: ", ""]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _taggedTemplateLiteral(["Gene Tonic: ", ""]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["Human-", " Hybrid"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["Gene Tonic: ", ""]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["Gene Tonic: Construct"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["Human-Machine Hybrid"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["machine elf"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["shorter-order cook"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["shortly stacked"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["short stack of pancakes"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["Garbage Fire"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["burning paper crane"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["burning newspaper"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["rope"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["dromedary drinking helmet"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["melodramedary"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["candyblast"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Stuffed Mortar Shell"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["Sing Along"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Micrometeorite"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Curse of Weaksauce"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




 // rewrite all combats
// create a defaultFamiliar function that chooses somewhat dynamically
// make a better geneTonic() function
// rewrite map uses to not use the c2t thing
// figure out synth

var TEST_HP = 1;
var TEST_MUS = 2;
var TEST_MYS = 3;
var TEST_MOX = 4;
var TEST_FAMILIAR = 5;
var TEST_WEAPON = 6;
var TEST_SPELL = 7;
var TEST_NONCOMBAT = 8;
var TEST_ITEM = 9;
var TEST_HOT_RES = 10;
var TEST_COIL_WIRE = 11;
var HP_TURNS = 0;
var MUS_TURNS = 0;
var MYS_TURNS = 0;
var MOX_TURNS = 0;
var FAMILIAR_TURNS = 0;
var WEAPON_TURNS = 0;
var SPELL_TURNS = 0;
var NONCOMBAT_TURNS = 0;
var ITEM_TURNS = 0;
var HOT_RES_TURNS = 0;
var TEMP_TURNS = 0; // test order will be stats, hot, item, NC, Fam, weapon, spell

var START_TIME = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.gametimeToInt)();
var justKillTheThing = libram__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject())).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject2())).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject3())).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject4())).skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject5())).attack().step("repeat");
/*
const defaultFamiliar = $familiar`melodramedary`;
const defaultFamiliarEquipment = $item`dromedary drinking helmet`;
*/

function useDefaultFamiliar() {
  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("camelSpit") < 100 && !testDone(TEST_WEAPON)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject6()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject7()));
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject8())) < 1 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject9())) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject10())) < 1) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject11()));
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject12())) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject13())) === 0 && !testDone(TEST_FAMILIAR)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject14()));
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject15()));
  }
}

function tryUse(quantity, it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)(it) > 0) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(quantity, it);
  } else {
    return false;
  }
}

function useAll(it) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)(it), it);
}

function tryEquip(it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)(it) > 0) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)(it);
  } else {
    return false;
  }
}

function assertMeat(meat) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMeat)() < meat) (0,libram_dist_console__WEBPACK_IMPORTED_MODULE_5__.error)("Not enough meat.");
}

function autosellAll(it) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)(it), it);
}

function wishEffect(ef) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(ef) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("genie effect " + ef.name);
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Already have effect " + ef.name + ".");
  }
} // Checks that you don't already have the tonic or effect and if your syringe has the right phylum and if so, makes the appropriate tonic.


function geneTonic(ph) {
  if (ph === "dude" || ph === "weird") {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("This function doesn't work for dudes or weirds.", "red");
  } else if (ph === "construct") {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject16())) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject17())) === 0 && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("dnaSyringe") === "construct") {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("camp dnapotion 1");

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject18(), ph)) === 0) {
        throw "something went wrong getting your gene tonic";
      } else {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("successfully created gene tonic: construct");
      }
    } else {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("You already have construct DNA");
    }
  } else {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject19(), ph)) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject20(), ph)) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("dnaSyringe") === ph) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("camp dnapotion 1");

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject21(), ph)) === 0) {
        throw "something went wrong getting your gene tonic";
      } else {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("successfully created gene tonic: " + ph);
      }
    } else {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("You already have " + ph + " DNA");
    }
  }
}
/*
// rewrite this to be better
function geneTonic1(ph: string) {
  switch (toString(ph)) {
    case "elf":
      if ((haveEffect($effect`1601`) === 0) && (availableAmount($item`7399`) === 0) && (getProperty("dnaSyringe") === "elf")) {
        cliExecute("camp dnapotion 1");
        if (availableAmount($item`7399`) === 0) {
          error("something went wrong getting your gene tonic");
        } else {
          print("successfully created gene tonic: elf");
        }
      } else {
        print("You already have elf DNA");
      }
    case "construct":
      if ((haveEffect($effect`1588`) === 0) && (availableAmount($item`7386`) === 0) && (getProperty("dnaSyringe") === "construct")) {
        cliExecute("camp dnapotion 1");
        if (availableAmount($item`7386`) === 0) {
          error("something went wrong getting your gene tonic");
        } else {
          print("successfully created gene tonic: construct");
        }
      } else {
        print("You already have construct DNA");
      }
    case "pirate":
      if ((haveEffect($effect`1598`) === 0) && (availableAmount($item`7396`) === 0) && (getProperty("dnaSyringe") === "pirate")) {
        cliExecute("camp dnapotion 1");
        if (availableAmount($item`7396`) === 0) {
          error("something went wrong getting your gene tonic");
        } else {
          print("successfully created gene tonic: pirate");
        }
      } else {
        print("You already have pirate DNA");
      }
  }
}
*/


function shrug(ef) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(ef) > 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("shrug " + ef.name);
  }
}

function summonBrickoOyster(maxSummons) {
  if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_brickoFights") >= 3) return false;
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject22())) > 0) return true;

  while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("libramSummons") < maxSummons && ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject23())) < 1 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject24())) < 8)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject25()));
  }

  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(8, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject26()));
}

function fightSausageIfGuaranteed() {
  if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.sausageFightGuaranteed)()) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject27())); //equip($slot`shirt`, $item`makeshift garbage shirt`);

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject28()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject29()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject30()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject31()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject32()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject33()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject34()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject35()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject36()));
    useDefaultFamiliar();
    (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject37()), (0,_lib__WEBPACK_IMPORTED_MODULE_0__.kill)());
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
  }
}

function testDone(testNum) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Checking test " + testNum + "...");
  var text = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("council.php");
  return !(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.containsText)(text, "<input type=hidden name=option value=" + testNum + ">");
}

function doTest(testNum) {
  if (!testDone(testNum)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?whichchoice=1089&option=" + testNum);

    if (!testDone(testNum)) {
      throw "Failed to do test " + testNum + ". Maybe we are out of turns.";
    }
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Test " + testNum + " already completed.");
  }
}

function withMacro(macro, action) {
  macro.save();

  try {
    return action();
  } finally {
    libram__WEBPACK_IMPORTED_MODULE_2__.Macro.clearSaved();
  }
} // Don't buy stuff from NPC stores.
//setProperty("_saved_autoSatisfyWithNPCs", getProperty("autoSatisfyWithNPCs"));
//setProperty("autoSatisfyWithNPCs", "false");
// Do buy stuff from coinmasters (hermit).
//setProperty("_saved_autoSatisfyWithCoinmasters", getProperty("autoSatisfyWithCoinmasters"));
//setProperty("autoSatisfyWithCoinmasters", "true");
// Initialize council.

(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("council.php");

if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("backupCameraReverserEnabled") === false) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("backupcamera reverser on");
} // All combat handled by our consult script (hccs_combat.ash).


(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("ccs libramMacro"); // Turn off Lil' Doctor quests.

(0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1340, 3); // in case you're re-running it

(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0); // Default equipment.

(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject38()));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject39()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject40()));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject41()));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject42()));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject43()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject44())); // equip($item[Kramco Sausage-o-Matic&trade;]);

(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject45()));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject46()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject47()));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject48()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject49()));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject50()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject51()));

if (!testDone(TEST_COIL_WIRE)) {
  /*setClan("Ferengi Commerce Authority");
  if (getPropertyInt("_clanFortuneConsultUses") < 3) {
    while (getPropertyInt("_clanFortuneConsultUses") < 3) {
      cliExecute("fortune chatplanet");
      cliExecute("wait 5");
    }
  }*/
  // Get flimsy hardwood scraps.
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("shop.php?whichshop=lathe");

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject52())) > 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject53()));
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myLevel)() === 1 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mySpleenUse)() === 0) {
    while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_universeCalculated") < (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("skillLevel144")) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("numberology 69");
    }
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=town_right&action=town_horsery");

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)('_horsery') == "" && (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_horseryCrazyMys") > -5) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)('horsery crazy');
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)('horsery meat');
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("boomBoxSong") !== "Total Eclipse of Your Meat") {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("boombox meat");
  } // retrieve_item(1, $item[fish hatchet]);
  // get cowboy boots
  //visitUrl("place.php?whichplace=town_right&action=townright_ltt");
  // Chateau piggy bank


  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=chateau&action=chateau_desk1"); // autosell(1, $item[gremlin juice]);
  // autosell(1, $item[ectoplasm <i>au jus</i>]);
  // autosell(1, $item[clove-flavored lip balm]);
  // Sell pork gems + tent

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("tutorial.php?action=toot");
  tryUse(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject54()));
  tryUse(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject55()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(5, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject56()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(4, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject57()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(5, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject58())); // Buy toy accordion

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject59())); // make pantogram pants for hilarity and spell damage

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject60())) === 0) {
    // retrieveItem(1, $item`ten-leaf clover`);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("pantogram hot|-combat|spell|silent");
  }

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject61()));

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject62())) === 0) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureMpTonic)(10);
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject63()));
  } // Campsite


  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject64())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=campaway&action=campaway_sky");
  } // Depends on Ez's Bastille script.


  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("bastille myst brutalist"); // Upgrade saber for fam wt

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("main.php?action=may4");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(4);
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("fold make garb"); // Put on some regen gear

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject65()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject66()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject67()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject68()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject69()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject70())); //equip($item[Kramco Sausage-o-Matic&trade;]);

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject71()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject72()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject73()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject74()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject75()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject76()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject77())); // NOTE: No turn 0 sausage fight!
  // uses familiar jacks to get camel equipment

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject78())) === 0 && (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("tomeSummons") < 3) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("create 1 box of familiar jacks");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject79()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject80()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject81()));
  } // should probably fight, digitize, wink a bishop or something here
  //useFamiliar($familiar`reanimated reanimator`);


  useDefaultFamiliar();

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_witchessFights")) < 1) {
    libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject82())).step(justKillTheThing).setAutoAttack();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("campground.php?action=witchess");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?option=1&pwd=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHash)() + "&whichchoice=1182&piece=1942", false);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myAdventures)() < 60) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureCreateItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject83()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject84()));
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject85()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject86()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject87()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject88()));

  if (!(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_bagOfCandy")) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject89()));
    libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject90())).skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject91())).skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject92())).skill("trap ghost").setAutoAttack();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject93()), -1, "");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject94()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject95())); //retrocape

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("retrocape mysticality thrill");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("terminal educate digitize");
  libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject96())).step(justKillTheThing).setAutoAttack();
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject97()), -1, "");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0); // kramco messes up maps

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject98()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject99())); //getting a lil ninja costume for the tot

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject100())) === 0 && (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_shatteringPunchUsed") < 3) {
    libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject101())).setAutoAttack();
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.mapMonster)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject102()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject103()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setLocation)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject104()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
  } // QUEST - Coil Wire


  doTest(TEST_COIL_WIRE);
}

if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() < 60) throw "Something went wrong coiling wire.";

if (!testDone(TEST_HP)) {
  // just in case?
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject105())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=campaway&action=campaway_sky");
  } // Grab fish hatchett here, for fam wt, -combat, and muscle tests


  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setClan)("Alliance From Heck");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject106())); // pulls wrench from deck

  if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_deckCardsDrawn") === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("cheat wrench; cheat rope");
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("call Detective Solver.ash");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.buy)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject107())); // learn extract and digitize
  //cliExecute("terminal educate extract");
  //cliExecute("terminal educate digitize");

  var lovePotion = (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject108());
  var loveEffect = (0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject109());

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(loveEffect) === 0) {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)(lovePotion) === 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject110()));
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("desc_effect.php?whicheffect=" + loveEffect.descid);

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)(loveEffect, "mysticality") > 10 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)(loveEffect, "muscle") > -30 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)(loveEffect, "moxie") > -30 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)(loveEffect, "maximum hp percent") > -0.001) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(1, lovePotion);
    }
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("breakfast"); // Boxing Daycare

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject111())); // Cast inscrutable gaze

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject112())); // Shower lukewarm

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject113())); // Beach Comb

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject114())); // Get beach access.

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject115())) === 0) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject116()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject117()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject118()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject119()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject120()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject121()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.create)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject122()));
  } // scrapbook for +exp


  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject123())); // Depends on Ez's Bastille script.
  //cliExecute("bastille myst brutalist");
  // if (get_property('_horsery') != 'crazy horse') cli_execute('horsery crazy');
  // Tune moon sign to Blender. Have to do this now to get chewing gum.

  if (!(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("moonTuned")) {
    if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_campAwaySmileBuffs") === 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=campaway&action=campaway_sky");
    } // Unequip spoon.


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject124()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject125()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject126()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject127()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject128()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject129())); // Actually tune the moon.

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("inv_use.php?whichitem=10254&doit=96&whichsign=8");
  } //cliExecute("retrocape mysticality thrill");
  // cross streams for a stat boost


  if (!(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_streamsCrossed")) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("crossstreams");
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject130()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject131()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject132()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject133())); //retrocape

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject134()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject135()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject136())); // equip($item[Kramco Sausage-o-Matic&trade;]);

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject137()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject138()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject139()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject140()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject141()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject142()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject143()));
  /*if (
    getPropertyInt("_brickoFights") === 0 &&
    summonBrickoOyster(7) &&
    availableAmount($item`BRICKO oyster`) > 0
  ) {
    if (availableAmount($item`bag of many confections`) > 0) throw "We should not have a bag yet.";
    useFamiliar($familiar`Stocking Mimic`);
    equip($slot`familiar`, $item`none`);
    if (myHp() < 0.8 * myMaxhp()) {
      visitUrl("clan_viplounge.php?where=hottub");
    }
    ensureMpTonic(32);
    Macro.trySkill($skill`otoscope`)
      .trySkill($skill`curse of weaksauce`)
      .trySkillRepeat($skill`saucegeyser`)
      .setAutoAttack();
    use(1, $item`BRICKO oyster`);
    autosell(1, $item`BRICKO pearl`);
    setAutoAttack(0);
  }*/
  // Prep Sweet Synthesis.

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myGardenType)() === "peppermint") {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("garden pick");
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("WARNING: This script is built for peppermint garden. Switch gardens or find other candy.");
  }

  if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_candySummons") === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject144()));
  }

  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_chubbyAndPlumpUsed") === false) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject145()));
  } // Depending on crimbo candy summons, gets synth learning, possibly getting bugged beanie if it needs a tome summon


  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject146())) > 1 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject147())) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject148())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject149()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("create 1 sugar shotgun");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.sweetSynthesis)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject150()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject151()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject152()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("arena.php");
    useDefaultFamiliar();
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject153())) >= 2 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject154())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.sweetSynthesis)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject155()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject156()));
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject157())) !== 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject158())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.sweetSynthesis)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject159()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject160()));
  } // synthesis: smart


  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject161())) == 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.sweetSynthesis)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject162()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject163()));
  } // This is the sequence of synthesis effects; synthesis_plan will, if possible, come up with a plan for allocating candy to each of these.
  // SynthesisPlanner.synthesize($effect`Synthesis: Learning`);
  // SynthesisPlanner.synthesize($effect`Synthesis: Smart`);


  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("mysticality experience percent")) < 100) {
    throw "Insufficient +stat%.";
  } // ensure_effect($effect[hulkien]);


  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject164()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject165()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject166()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject167()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject168()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject169()), 5, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject170()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject171()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject172()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject173()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject174()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject175()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject176()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("spacegate vaccine 2");

  if (!(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("hasRange")) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject177()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject178()));
  }

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject179()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject180())); // LOV tunnel for elixirs, epaulettes, and heart surgery

  if (!(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_loveTunnelUsed")) {
    useDefaultFamiliar();
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject181()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject182()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1222, 1); // Entrance

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1223, 1); // Fight LOV Enforcer

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1224, 2); // LOV Epaulettes

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1225, 1); // Fight LOV Engineer

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1226, 2); // Open Heart Surgery

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1227, 1); // Fight LOV Equivocator

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1228, 3); // Take chocolate

    libram__WEBPACK_IMPORTED_MODULE_2__.Macro.if_('monstername "LOV enforcer"', libram__WEBPACK_IMPORTED_MODULE_2__.Macro.attack().repeat()).if_('monstername "lov engineer"', libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject183())).repeat()).step(justKillTheThing).setAutoAttack(); // setAutoAttack("HCCS_LOV_tunnel");

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject184()), -1, "");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject185())); // Use ten-percent bonus

  tryUse(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject186()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject187()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject188()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject189()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject190()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject191()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject192()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(3, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject193()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(3, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject194()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(3, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject195())); // Scavenge for gym equipment

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_daycareGymScavenges")) < 1) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("/place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
    var pg = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(3);
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.containsText)(pg, "[free]")) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(2);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(5);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(4);
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject196())) > 0) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject197()));
  } // Plan is for Beach Comb + PK buffs to fall all the way through to item -> hot res -> fam weight.


  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject198()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject199())); // 10 snojo fights to while +stat is on, also getting ice rice

  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_snojoFreeFights") < 9) {
    useDefaultFamiliar();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject200()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject201()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("choiceAdventure1310", "3"); // myst for ice rice, because it sells for more

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=snojo&action=snojo_controller");

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject202())) === 0 && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("dnaSyringe") !== "construct") {
      //useFamiliar($familiar`ghost of crimbo carols`);
      (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject203()), libram__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject204())).trySkillRepeat((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject205())));
      geneTonic("construct");
    }

    while ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_snojoFreeFights") < 9) {
      useDefaultFamiliar();
      (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject206()), (0,_lib__WEBPACK_IMPORTED_MODULE_0__.kill)());
    }
  } // Don't use Kramco here.

  /*equip($slot`off-hand`, $item`none`);
    if (haveEffect($effect`holiday yoked`) === 0 && getPropertyInt("_kgbTranquilizerDartUses") < 3) {
    equip($slot`acc1`, $item`kremlin\'s greatest briefcase`);
    useFamiliar($familiar`ghost of crimbo carols`);
    adventureMacroAuto($location`noob cave`, Macro.trySkill($skill`KGB tranquilizer dart`));
    setAutoAttack(0);
  }*/
  // Chateau rest


  while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("timesRested") < (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.totalFreeRests)()) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=chateau&action=chateau_restbox");
  }
  /*while (summonBrickoOyster(11) && availableAmount($item`BRICKO oyster`) > 0) {
    useDefaultFamiliar();
    if (myHp() < 0.8 * myMaxhp()) {
      visitUrl("clan_viplounge.php?where=hottub");
    }
    ensureMpTonic(32);
    Macro.trySkill($skill`otoscope`)
      .trySkill($skill`curse of weaksauce`)
      .trySkillRepeat($skill`saucegeyser`)
      .setAutoAttack();
    use(1, $item`BRICKO oyster`);
    autosell(1, $item`BRICKO pearl`);
    setAutoAttack(0);
  }*/


  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject207())); // Get buff things

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSewerItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject208()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSewerItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject209())); // Don't use Kramco here.
  //equip($slot`off-hand`, $item`none`);
  // Fruits in skeleton store (Saber YR) - Not Needed for ZOOM as will be doing as Pastamancer

  /*const missingOintment =
    availableAmount($item`ointment of the occult`) === 0 &&
    availableAmount($item`grapefruit`) === 0 &&
    haveEffect($effect`Mystically Oiled`) === 0;
  const missingOil =
    availableAmount($item`oil of expertise`) === 0 &&
    availableAmount($item`cherry`) === 0 &&
    haveEffect($effect`Expert Oiliness`) === 0;
  if (myClass() !== $class`Pastamancer` && (missingOil || missingOintment)) {
    cliExecute("mood apathetic");
      if (get("questM23Meatsmith") === "unstarted") {
      visitUrl("shop.php?whichshop=meatsmith&action=talk");
      runChoice(1);
    }
    // if (!canAdv($location`The Skeleton Store`, false)) error("Cannot open skeleton store!");
    adv1($location`The Skeleton Store`, -1, "");
    if (!containsText($location`The Skeleton Store`.noncombatQueue, "Skeletons In Store")) {
      throw "Something went wrong at skeleton store.";
    }
    setProperty("choiceAdventure1387", "3");
    mapMonster($location`The Skeleton Store`, $monster`novelty tropical skeleton`);
    withMacro(Macro.skill($skill`use the force`), runCombat);
    if (handlingChoice()) runChoice(3);
    // setProperty("mappingMonsters", "false");
  }*/

  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_witchessFights") < 5) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject210()));
    useDefaultFamiliar();

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_witchessFights")) < 2) {
      libram__WEBPACK_IMPORTED_MODULE_2__.Macro.step(justKillTheThing).setAutoAttack();
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("campground.php?action=witchess");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?option=1&pwd=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHash)() + "&whichchoice=1182&piece=1942", false);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
    }

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_witchessFights")) === 2) {
      useDefaultFamiliar();
      libram__WEBPACK_IMPORTED_MODULE_2__.Macro.attack().repeat().setAutoAttack();
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject211()));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("campground.php?action=witchess");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?option=1&pwd=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHash)() + "&whichchoice=1182&piece=1940", false);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
    }

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_witchessFights")) === 3) {
      useDefaultFamiliar();
      libram__WEBPACK_IMPORTED_MODULE_2__.Macro.attack().repeat().setAutoAttack();
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject212()));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("campground.php?action=witchess");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?option=1&pwd=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHash)() + "&whichchoice=1182&piece=1941", false);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
    }
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject213()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject214()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject215()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject216())); // Professor 9x free sausage fight @ NEP

  if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_pocketProfessorLectures") === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject217())); //tryEquip($item`Pocket Professor memory chip`);
    //equip($item`Kramco Sausage-o-Matic&trade;`);
    //equip($slot`acc2`, $item`Brutal brogues`);
    //($slot`acc3`, $item`Beach Comb`);
    // Checking if it's gerald(ine) and accepting the quest if it is, otherwise just here to party.

    if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_questPartyFairQuest") == "") {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1322, 6); // Leave

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject218()), -1, "");
    }

    if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_questPartyFairQuest") === "food" || (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_questPartyFairQuest") === "booze") {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1322, 1); // accept quest
    } else {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1322, 2); // just here to party
    }

    while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_pocketProfessorLectures") < 9) {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHp)() < 0.8 * (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMaxhp)()) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("clan_viplounge.php?where=hottub");
      } // setChoice(1322, 2);


      (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject219()), libram__WEBPACK_IMPORTED_MODULE_2__.Macro.if_('!monstername "sausage goblin"', new libram__WEBPACK_IMPORTED_MODULE_2__.Macro().step("abort")).trySkill(Skill.get("Lecture on Relativity")).trySkill(Skill.get("Feel Pride")).step(justKillTheThing));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
    }
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("YOU FUCKED UP THE KRAMCO CHAIN AGAIN, YOU DUMBASS! Go kill crayon elves instead.");
  }

  useDefaultFamiliar();
  /*Macro.step(justKillTheThing).setAutoAttack();
  adv1($location`The Neverending Party`, -1, "");
  setAutoAttack(0);*/
  // become a human fish hybrid

  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_dnaHybrid") === false && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("dnaSyringe") !== "fish") {
    // tryEquip($item`powerful glove`);
    // useFamiliar($familiar`frumious bandersnatch`);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject220()).noncombatQueue);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject221()), -1, "");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject222()), -1, "");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject223()).noncombatQueue);

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.containsText)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject224()).noncombatQueue, "Caldera Air; Aaaaah!  Aaaaaaaah!")) {
      (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject225()), libram__WEBPACK_IMPORTED_MODULE_2__.Macro.while_("!monstername lava lamprey", libram__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject226())).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject227()))).if_("monstername lava lamprey", libram__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject228())).item((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject229())).skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject230()))));
      useDefaultFamiliar();
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("hottub"); // removing lava effect

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
    } else throw "Something went wrong getting fish DNA.";
  }

  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_dnaHybrid") === false && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("dnaSyringe") === "fish") {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("camp dnainject");
  } // Maximize familiar weight
  //cliExecute("fold makeshift garbage shirt");


  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject231()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject232()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject233()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject234()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject235()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject236()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject237()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject238()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject239()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject240()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("mood hccs");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject241())); // spend 5 turns in DMT, skipping joy and cert, just get stats

  while ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_machineTunnelsAdv") < 5) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject242()));
    (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject243()), (0,_lib__WEBPACK_IMPORTED_MODULE_0__.kill)());
    /* if ((availableAmount($item`abstraction: thought`) === 0) && (availableAmount($item`abstraction: certainty`) === 0) && (getProperty("_machineTunnelsAdv") < 5)) {
      setAutoAttack("melfgetthought");
      adv1($location`the deep machine tunnels`, -1, "");
      setAutoAttack(0);
    } else if ((availableAmount($item`abstraction: thought`) >= 1) && (availableAmount($item`abstraction: certainty`) === 0) && (getProperty("_machineTunnelsAdv") < 5)) {
      setAutoAttack("melfgetcertainty");
      adv1($location`the deep machine tunnels`, -1, "");
      setAutoAttack(0);
    } else { 
      adventureKill($location`the deep machine tunnels`);
    } */
  }

  fightSausageIfGuaranteed(); //witchess fights TODO: Use libram's witchess handling
  // get witchess buff, this should fall all the way through to fam wt

  /*if (haveEffect($effect`puzzle champ`) === 0) {
    cliExecute("witchess");
  }*/

  useDefaultFamiliar();
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject244()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject245())); //equip($slot`shirt`, $item`makeshift garbage shirt`);

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("lastCopyableMonster") === "sausage goblin" && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_backUpUses") < 11) {
    useDefaultFamiliar();
    (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject246()), libram__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject247())).step(justKillTheThing));
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0); // Breakfast
  // Visiting Looking Glass in clan VIP lounge

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("clan_viplounge.php?action=lookingglass&whichfloor=2"); //cliExecute("swim item");

  while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_genieWishesUsed") < 3) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("genie wish for more wishes");
  } // Visiting the Ruined House
  //  visit_url('place.php?whichplace=desertbeach&action=db_nukehouse');
  // Autosell stuff
  // autosell(1, $item[strawberry]);
  // autosell(1, $item[orange]);


  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject248())); // autosell(5, $item[red pixel]);
  //autosell(5, $item`green pixel`);
  //autosell(5, $item`blue pixel`);
  //autosell(5, $item`white pixel`);

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject249())) > 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("shrug Carlweather's Cantata of Confrontation");
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("mood hccs"); //equip($item`makeshift garbage shirt`);

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject250()));

  while ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_godLobsterFights") < 2) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("choiceAdventure1310", "1");
    tryEquip((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject251()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("main.php?fightgodlobster=1");
    withMacro(libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject252())), kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php");
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.handlingChoice)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
  } // fight a witchess queen for pointy crown, getting a couple weapon damage effects just in case


  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_witchessFights")) === 4) {
    useDefaultFamiliar();
    libram__WEBPACK_IMPORTED_MODULE_2__.Macro.attack().repeat().setAutoAttack();
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject253()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject254()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("campground.php?action=witchess");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?option=1&pwd=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHash)() + "&whichchoice=1182&piece=1939", false);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
  }

  useDefaultFamiliar(); //equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);
  // 14 free NEP fights, using mob hit and xray

  while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_neverendingPartyFreeTurns") < 10 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_questPartyFair") != "finished"
  /*||
  (haveSkill($skill`Chest X-Ray`) && getPropertyInt("_chestXRayUsed") < 3) ||
  (haveSkill($skill`Gingerbread Mob Hit`) && !getPropertyBoolean("_gingerbreadMobHitUsed"))*/
  ) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject255()), 5, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject256()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject257()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject258()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject259()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject260()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject261()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject262()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject263()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("mood execute"); // Otherwise fight.

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1324, 5); // }

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureMpSausage)(100);

    if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_feelPrideUsed") < 3) {
      useDefaultFamiliar();
      (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject264()), libram__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject265())).step(justKillTheThing));
    } else {
      useDefaultFamiliar();
      (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject266()), libram__WEBPACK_IMPORTED_MODULE_2__.Macro.step(justKillTheThing));
    }
    /*else {
    useDefaultFamiliar();
    adventureMacroAuto(
      $location`The Neverending Party`,
      Macro.trySkill($skill`chest x-ray`).trySkill($skill`gingerbread mob hit`)
    );
    }*/

  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject267())); //cliExecute("fold makeshift garbage shirt");
  //equip($item`makeshift garbage shirt`);

  useDefaultFamiliar();

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("boomBoxSong") !== "These Fists Were Made for Punchin'") {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("boombox damage");
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject268())) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject269()));else (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject270()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject271())); // synthesis_plan($effect[Synthesis: Strong], tail(tail(subsequent)));
  // ensure_effect($effect[Gr8ness]);
  // ensure_effect($effect[Tomato Power]);

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject272()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject273())); //ensureSong($effect`Power Ballad of the Arrowsmith`);

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject274()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject275()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject276()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject277()), 5, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject278()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject279()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("hp", false); // QUEST - Donate Blood (HP)

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMaxhp)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$stat)(_templateObject280())) - 3 < 1770) {
    throw "Not enough HP to cap.";
  }

  TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
  doTest(TEST_HP);
  HP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsHpTurns", HP_TURNS.toString());
}

if (!testDone(TEST_MUS)) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject281())) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject282()));else (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject283()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject284()));

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myInebriety)() === 0) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureOde)(5);
    tryUse(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject285()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.drink)(5, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject286()));
  }

  if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("camelSpit") === 100 && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_snojoFreeFights") < 10) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Your camel spit level is " + (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("camelSpit"), "green"); //cliExecute("mood apathetic");

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject287()));

    if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("camelSpit") === 100) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject288()));
      libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject289())).step(justKillTheThing).setAutoAttack();
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject290()), -1, "");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
      useDefaultFamiliar();
    } else {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("your camel is not full enough", "red");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.abort)();
    }
  }

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject291()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject292()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject293())); //ensureSong($effect`Power Ballad of the Arrowsmith`);

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject294()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject295()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject296())); // ensure_effect($effect[Tomato Power]);

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject297()), 5, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject298()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject299()));

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject300())) > 0) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject301()));
  } // ensure_effect($effect[Ham-Fisted]);
  //create(1, $item`philter of phorce`);
  //ensureEffect($effect`Phorcefullness`);


  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("muscle", false);

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject302()) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$stat)(_templateObject303())) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBasestat)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$stat)(_templateObject304())) < 1770) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Not enough muscle to cap.");
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$stat)(_templateObject305())) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBasestat)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$stat)(_templateObject306())) < 1770) {
    throw "Not enough muscle to cap.";
  } // cli_execute('modtrace mus');
  // abort();


  TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
  doTest(TEST_MUS);
  MUS_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsMusTurns", MUS_TURNS.toString());
}

if (!testDone(TEST_MYS)) {
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject307()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject308()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject309()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject310()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject311())); // ensure_effect($effect[Tomato Power]);

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject312()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject313()), 5, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject314()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("mysticality", false);

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$stat)(_templateObject315())) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBasestat)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$stat)(_templateObject316())) < 1770) {
    throw "Not enough mysticality to cap.";
  }

  TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
  doTest(TEST_MYS);
  MYS_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsMysTurns", MYS_TURNS.toString());
}

if (!testDone(TEST_MOX)) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject317())) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject318()));else (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject319()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject320())); // Beach Comb

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject321()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject322()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject323())); // Should be 11% NC and 50% moxie, will fall through to NC test
  // ensureEffect($effect`Blessing of your favorite Bird`);

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject324()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject325()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject326())); //ensureSong($effect`The Moxious Madrigal`);

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject327()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject328())); // ensure_effect($effect[Tomato Power]);

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject329()), 5, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject330()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject331()), 1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject332()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject333())), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject334()));

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject335())) === 0) {
    tryUse(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject336()));
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("moxie", false);

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject337()) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$stat)(_templateObject338())) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBasestat)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$stat)(_templateObject339())) < 1770) {
    throw "Not enough moxie to cap.";
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$stat)(_templateObject340())) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBasestat)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$stat)(_templateObject341())) < 1770) {
    throw "Not enough moxie to cap.";
  }

  TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
  doTest(TEST_MOX);
  MOX_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsMoxTurns", MOX_TURNS.toString());
}

if (!testDone(TEST_WEAPON)) {
  var weaponTurns = function weaponTurns() {
    return 60 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("weapon damage") / 25 + 0.001) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("weapon damage percent") / 25 + 0.001);
  };

  fightSausageIfGuaranteed(); // Get inner elf for weapon damage

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject342())) === 0 && (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_snokebombUsed") < 3) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("/whitelist hobopolis vacation home");
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject343()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject344()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("choiceAdventure326", "1");
    (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject345()), libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject346())));
    useDefaultFamiliar();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("/whitelist alliance from heck");
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Something went wrong with getting inner elf");
  } // Paint crayon elf for DNA and ghost buff (Saber YR)

  /*
  if (!getPropertyBoolean("_chateauMonsterFought")) {
    const chateauText = visitUrl("place.php?whichplace=chateau", false);
    const m = createMatcher("alt="Painting of a? ([^(]*) .1."", chateauText);
    if (find(m) && group(m, 1) === "Black Crayon Crimbo Elf") {
      cliExecute("mood apathetic");
      useFamiliar($familiar`ghost of crimbo carols`);
      equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);
      if (getPropertyInt("_reflexHammerUsed") === 3) {
        error("You do not have any banishes left");
      }
      setHccsCombatMode(MODE_CUSTOM, mSkill(mItem(mNew(), $item`DNA extraction syringe`), $skill`Reflex Hammer`));
      visitUrl("place.php?whichplace=chateau&action=chateau_painting", false);
      runCombat();
      useDefaultFamiliar();
    } else {
      error("Wrong painting.");
    }
  } */


  if (!(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_chateauMonsterFought")) {
    // const chateauText = visitUrl("place.php?whichplace=chateau", false);
    // const match = chateauText.match(/alt="Painting of an? ([^(]*) .1."/);
    // if (getPropertyInt("camelSpit") === 100) useFamiliar($familiar`Melodramedary`);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject347()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject348()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject349()));
    libram__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject350())).step(justKillTheThing).setAutoAttack();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=chateau&action=chateau_painting", false);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
    useDefaultFamiliar();
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("You already fought your painting");
  }

  geneTonic("elf");
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject351())); // maybe try just setting autoattack to HCCS_Spit
  // fax an ungulith to get corrupted marrow, meteor showered, and spit upon (if applicable)

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject352())) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject353())) === 0) {
    //print("Your camel spit level is " + get("camelSpit"), "green");
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject354())) === 0) {
      if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_photocopyUsed")) throw "Already used fax for the day.";
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("/whitelist alliance from heck");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.chatPrivate)("cheesefax", "ungulith");

      for (var i = 0; i < 2; i++) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.wait)(10);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("fax receive");
        if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("photocopyMonster") === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject355())) break; // otherwise got the wrong monster, put it back.

        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("fax send");
      }

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject356())) === 0) throw "Failed to fax in ungulith.";
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("mood apathetic");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject357()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("choiceAdventure1387", "3");

    if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("camelSpit") === 100) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject358()));
      libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject359())).skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject360())).skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject361())).setAutoAttack();
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject362()));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("set camelSpit = 0");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("camelSpit", "0");
      useDefaultFamiliar();
    } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject363()))) {
      useDefaultFamiliar();
      libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject364())).skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject365())).setAutoAttack();
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject366()));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("set camelSpit = 0");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("camelSpit", "0");
    } else {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("your camel is not full enough", "red");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.abort)();
    }
  }
  /*
  if (haveEffect($effect`In a Lather`) === 0) {
    if (myInebriety() > inebrietyLimit() - 2) {
      error("Something went wrong. We are too drunk.");
    }
    assertMeat(500);
    ensureOde(2);
    cliExecute("drink Sockdollager");
  }
  */


  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject367())) > 0) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject368()));
  }

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject369()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject370()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject371()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject372()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject373()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject374()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject375()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject376()));

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject377())) > 0) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject378()));
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject379())) > 0) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject380()));
  } // make KGB set to weapon
  //cliExecute("briefcase e weapon");
  // Hatter buff
  // Beach Comb


  if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.containsText)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_beachHeadsUsed"), "6")) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject381()));
  } // Boombox potion - did we get one?

  /*if (availableAmount($item`Punching Potion`) > 0) {
    ensureEffect($effect`Feeling Punchy`);
  }*/
  // Pool buff. Should have fallen through.


  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject382())); // Corrupted marrow

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject383())); // Pastamancer d1 is weapon damage.

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject384()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject385()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject386()), 1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject387())); // wish_effect($effect[Outer Wolf&trade;]);
  // this is just an assert, effectively.
  // ensureEffect($effect`Meteor Showered`);

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject388()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject389()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("weapon damage", false);

  if (weaponTurns() > 2) {
    throw "Something went wrong with weapon damage.";
  } // cli_execute('modtrace weapon damage');
  // abort();


  TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
  doTest(TEST_WEAPON);
  WEAPON_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsWeaponTurns", WEAPON_TURNS.toString());
}

if (!testDone(TEST_SPELL)) {
  var spellTurns = function spellTurns() {
    return 60 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("spell damage") / 50 + 0.001) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("spell damage percent") / 50 + 0.001);
  };

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject390()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject391()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject392()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject393()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject394()));

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject395())) > 0) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject396()));
  } // Pool buff


  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject397()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject398()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject399())); // Build up 100 turns of Deep Dark Visions for spell damage later.

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveSkill)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject400())) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject401())) < 10) {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMp)() < 20) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureCreateItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject402()));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.eat)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject403()));
    }

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHp)() < (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMaxhp)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject404()));
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMp)() < 100) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureCreateItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject405()));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.eat)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject406()));
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("spooky resistance")) < 10) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject407()));

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("spooky resistance")) < 10) {
        throw "Not enough spooky res for Deep Dark Visions.";
      }
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject408()));
  } // Beach Comb
  // Tea party


  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSewerItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject409())); // ensure_effect($effect[Full Bottle in front of Me]);

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject410())); // TODO: switch to buying an astral statuette in hccsAscend.js, and using lefty instead of hand
  //ensureItem(1, $item`obsidian nutcracker`);

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("briefcase e spell"); // Get inner elf for spell damage

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject411())) === 0 && (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_snokebombUsed") < 3) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("/whitelist hobopolis vacation home");
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject412()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject413()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("choiceAdventure326", "1");
    (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject414()), libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject415())));
    useDefaultFamiliar();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("/whitelist alliance from heck");
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Something went wrong with getting inner elf");
  } // Meteor showered

  /*if (haveEffect($effect`Meteor Showered`) === 0) {
    equip($item`Fourth of May Cosplay Saber`);
    adventureMacroAuto(
      $location`Noob Cave`,
      Macro.skill($skill`Meteor Shower`).skill($skill`Use the Force`)
    );
  }*/


  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject416())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject417()), -1, "");

    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.containsText)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject418()).noncombatQueue, "The Least Cool Zone")) {
      throw "Something went wrong at Velvet Mine";
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject419()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("choiceAdventure1387", "3");
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.mapMonster)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject420()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject421()));
    withMacro(libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject422())).skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject423())), kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat);

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.lastChoice)() === 1387 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.handlingChoice)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(3);
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("mappingMonsters", "false");
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject424())) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("barrelprayer buff");
  } // Sigils of Yeg = 200% SD


  if (!(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_cargoPocketEmptied") && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject425())) === 0) {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject426())) === 0) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("cargo 177");
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject427()));
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("spell damage percent")) % 50 >= 40) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject428()));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject429()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject430()));
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject431()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("spell damage", false);

  while (spellTurns() > (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myAdventures)()) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.eat)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject432()));
  } // cli_execute('modtrace spell damage');
  // abort();


  TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
  doTest(TEST_SPELL);
  SPELL_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsSpellTurns", SPELL_TURNS.toString());
}

if (!testDone(TEST_HOT_RES)) {
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureMpSausage)(500);
  useDefaultFamiliar();
  fightSausageIfGuaranteed(); // Make sure no moon spoon.

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject433()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject434()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject435()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject436()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject437()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject438()));

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject439())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject440()), -1, "");

    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.containsText)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject441()).noncombatQueue, "LavaCo&trade; Welcomes You")) {
      throw "Something went wrong at LavaCo.";
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject442()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject443()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject444()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject445()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("choiceAdventure1387", "3");
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.mapMonster)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject446()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject447()));
    withMacro(libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject448())).skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject449())).skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject450())), kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat);

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.lastChoice)() === 1387 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.handlingChoice)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(3);
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("mappingMonsters", "false");
  } // synth hot TODO: check for the right candyblast candies and summon candy hearts if not


  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject451())) == 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("synthesize hot");
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject452())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("witchess");
  }
  /*
  if (haveEffect($effect`Synthesis: Hot`) == 0) {
    setProperty("autoSatisfyWithNPCs", "true");
    buy($item`tamarind-flavored chewing gum`, 1);
    buy($item`lime-and-chile-flavored chewing gum`, 1);
    // cliExecute("synthesize hot");
    sweetSynthesis(
      $item`tamarind-flavored chewing gum`,
      $item`lime-and-chile-flavored chewing gum`
    );
    setProperty("autoSatisfyWithNPCs", "false");
  } */
  // add +5 hot res to KGB, relies on Ezandora's script, naturally


  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("briefcase e hot"); // set retrocape to elemental resistance

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("retrocape mus hold");
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject453()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject454()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject455()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject456())); // Pool buff. This will fall through to fam weight.

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject457()));

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject458())) > 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject459())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("create 1 meteorite guard");
  }

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject460()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("smash * ratty knitted cap");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("smash * red-hot sausage fork");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(10, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject461()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(10, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject462()));

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject463())) > 0) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject464()));
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject465())) > 0 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject466())) > 0) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject467()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject468()));
  } // wish for healthy green glow, should fall through
  // wish_effect($effect[healthy green glow]);
  // drink hot socks here if you're a tryhard
  // Beach comb buff.


  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject469())); // Use pocket maze

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject470())) > 0) (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject471()));
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)('_horsery') != 'pale horse') (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)('horsery pale');
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject472()));

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject473())) === 0 && (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("tomeSummons") < 3) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject474()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject475()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject476()));
  } // Mafia sometimes can't figure out that multiple +weight things would get us to next tier.


  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("hot res, 0.01 familiar weight", false);

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("hot resistance")) < 59) {
    throw "Something went wrong building hot res.";
  } // cli_execute('modtrace Hot Resistance');
  // abort();
  //logprint(cliExecuteOutput("modtrace hot resistance"));


  TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
  doTest(TEST_HOT_RES);
  HOT_RES_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsHotResTurns", HOT_RES_TURNS.toString());
}

if (!testDone(TEST_NONCOMBAT)) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHp)() < 30) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject477()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject478()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject479()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject480()));

  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_godLobsterFights") < 3) {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHp)() < 0.8 * (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMaxhp)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject481()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject482())); // Get -combat buff.

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("choiceAdventure1310", "2");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject483()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("main.php?fightgodlobster=1");
    withMacro(libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject484())), kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php");
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.handlingChoice)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(2);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
  } // setting KGB to NC, relies on Ezandora's script


  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("briefcase e -combat"); // Pool buff. Should fall through to weapon damage.

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject485()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject486()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject487()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject488()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject489()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject490()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject491()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject492()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject493()));
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)('_horsery') != 'dark horse') (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)('horsery dark'); // Rewards

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject494())); // ensure_effect($effect[A Rose by Any Other Material]);
  // wish for disquiet riot because shades are hilariously expensive
  // wishEffect($effect`disquiet riot`);

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject495())); // Pastamancer d1 is -combat.

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject496())) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject497()));
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("-combat, 0.01 familiar weight", false);

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("combat rate")) > -40) {
    throw "Not enough -combat to cap.";
  } // cli_execute('modtrace combat rate');
  // abort();


  TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
  doTest(TEST_NONCOMBAT);
  NONCOMBAT_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsNoncombatTurns", NONCOMBAT_TURNS.toString());
}

if (!testDone(TEST_FAMILIAR)) {
  fightSausageIfGuaranteed(); // These should have fallen through all the way from leveling.

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject498()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject499())); // Pool buff.

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject500()));
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHp)() < 30) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject501()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject502()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject503()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject504()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject505()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject506()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject507()));
  /*
  if (availableAmount($item`cracker`) > 0 && getPropertyInt("tomeSummons") < 3) {
    useFamiliar($familiar`Exotic Parrot`);
    equip($item`cracker`);
  }
  */
  // this is going to be all the gingerbread stuff, it is a work in progress

  /*if (
    haveEffect($effect`whole latte love`) === 0 &&
    availableAmount($item`gingerbread spice latte`) === 0
  ) {
    useFamiliar($familiar`chocolate lab`);
    maximize("sprinkle drop", false);
    if (!get("_gingerbreadClockAdvanced")) {
      visitUrl("adventure.php?snarfblat=477");
      runChoice(1);
    }
    if (availableAmount($item`sprinkles`) < 50) {
      adventureMacroAuto(
        $location`Gingerbread Upscale Retail District`,
        Macro.if_("monstername gingerbread gentrifier", Macro.skill($skill`macrometeorite`)).skill(
          $skill`shattering punch`
        )
      );
      setAutoAttack(0);
    }
    if (availableAmount($item`sprinkles`) >= 50) {
      // equip($slot`acc3`, $item`kremlin's greatest briefcase`);
      useFamiliar($familiar`frumious bandersnatch`);
      ensureEffect($effect`ode to booze`);
      setChoice(1208, 3);
      while (
        availableAmount($item`gingerbread spice latte`) === 0 &&
        haveEffect($effect`whole latte love`) === 0
      ) {
        adventureMacro($location`Gingerbread Upscale Retail District`, Macro.step("runaway"));
      }
    } else {
      throw "Something went wrong getting sprinkles";
    }
    use($item`gingerbread spice latte`);
    useDefaultFamiliar();
  }*/

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject508())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject509()));
    (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject510()), libram__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject511())).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject512())));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject513())) > 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject514())) < 1) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("create 1 burning paper crane");
  } // checking here to see if we had a tome summon for a cracker or if we should use BBB


  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject515())) > 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject516()));
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject517())) === 1) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject518()));
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("familiar weight", false); // cli_execute('modtrace familiar weight');
  // abort();

  TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
  doTest(TEST_FAMILIAR);
  FAMILIAR_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsFamiliarTurns", FAMILIAR_TURNS.toString());
}

if (!testDone(TEST_ITEM)) {
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureMpSausage)(500);
  fightSausageIfGuaranteed(); // use abstraction: certainty if you have it
  // ensureEffect($effect`certainty`);
  // pulls wheel of fortune from deck, gets rope and wrench for later

  if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_deckCardsDrawn") === 5) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("cheat buff items");
  } // get pirate DNA and make a gene tonic


  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("dnaSyringe") !== "pirate" && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject519())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject520()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject521()));

    if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_kgbTranquilizerDartUses") >= 3) {
      throw "Out of KGB banishes";
    } // adv once for the opening free NC, should check NC queue here


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject522()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject523()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject524()).noncombatQueue);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject525()), -1, "");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject526()).noncombatQueue);

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.containsText)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject527()).noncombatQueue, "Dead Men Smell No Tales")) {
      (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject528()), libram__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject529())).skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject530())));
      geneTonic("pirate");
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject531()));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
    } else throw "Something went wrong getting pirate DNA.";
  }

  useDefaultFamiliar();

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject532())) === 0) {
    if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_reflexHammerUsed") >= 3) throw "Out of reflex hammers!";
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject533()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject534()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject535()));
    (0,libram__WEBPACK_IMPORTED_MODULE_2__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject536()), libram__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject537())).skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject538())));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
  }

  if (!(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_clanFortuneBuffUsed")) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject539()));
  }

  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject540()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject541()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject542()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject543())); // synthesis: collection
  // cliExecute("create 1 peppermint twist");

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject544())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject545()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.sweetSynthesis)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject546()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject547()));
  } // SynthesisPlanner.synthesize($effect`Synthesis: Collection`);
  // see what class we are, maybe a couple other buffs


  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject548())) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("barrelprayer buff");
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject549())) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject550())); // seek out a bird
  } // Use bag of grain.
  //    ensure_effect($effect[Nearly All-Natural]);


  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject551()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject552())); // get big smile of the blender if available, someday use this to replace something?

  if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_campAwaySmileBuffs") === 1) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=campaway&action=campaway_sky");
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject553()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject554())); // ninja costume for 150% item

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("item, 2 booze drop, -equip broken champagne bottle, -equip surprisingly capacious handbag", false); // cli_execute('modtrace item');
  // abort();

  TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
  doTest(TEST_ITEM);
  ITEM_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsItemTurns", ITEM_TURNS.toString());
} //useSkill(1, $skill`spirit of nothing`);
//setProperty("autoSatisfyWithNPCs", "true");
//setProperty("autoSatisfyWithCoinmasters", getProperty("_saved_autoSatisfyWithCoinmasters"));


(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("hpAutoRecovery", "0.8");
/*visitUrl("peevpee.php?action=smashstone&confirm=on");
print("Stone smashed. Get your PVP on!", "green");
// spar for 6 fights
if (get("_daycareRecruits") === 0 && hippyStoneBroken() === true) {
  visitUrl("place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
  runChoice(3);
  runChoice(1);
  runChoice(4);
  runChoice(5);
  runChoice(4);
}

cliExecute("pvp fame select");*/

(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("This loop took " + ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.gametimeToInt)() - START_TIME) / 1000 + " seconds, for a 1 day, " + ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - 1) + " turn HCCS run. Organ use was " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myFullness)() + "/" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myInebriety)() + "/" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mySpleenUse)() + ". I drank " + (6 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject555()))) + " Astral Pilsners.", "green");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("HP test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsHpTurns"), "green");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Muscle test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsHpTurns"), "green");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Moxie test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsMoxTurns"), "green");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Myst test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsMysTurns"), "green");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Weapon Damage test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsWeaponTurns"), "green");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Spell Damage Test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsSpellTurns"), "green");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Hot Res test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsHotResTurns"), "green");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Noncombat test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsNoncombatTurns"), "green");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Fam Weight test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsFamiliarTurns"), "green");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Item Drop test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsItemTurns"), "green");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("mood default");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("ccs default");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("boombox meat");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("/whitelist alliance from heck");

if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_questPartyFairQuest") === "food") {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Hey, go talk to Geraldine!", "blue");
} else if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_questPartyFairQuest") === "booze") {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Hey, go talk to Gerald!", "blue");
}

/***/ }),

/***/ "./src/hccsLibrams.ts":
/*!****************************!*\
  !*** ./src/hccsLibrams.ts ***!
  \****************************/
/*! namespace exports */
/*! exports [not provided] [maybe used in hccsLibrams (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var _hccs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hccs */ "./src/hccs.ts");
function _templateObject10() {
  var data = _taggedTemplateLiteral(["summon divine favor"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["summon love song"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["love song of icy revenge"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["summon candy heart"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["lavendar candy heart"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["summon love song"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["love song of icy revenge"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["summon candy heart"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["green candy heart"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Summon BRICKOs"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function nextLibramCost() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mpCost)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject()));
}

function castBestLibram() {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject2())) < 1 && !(0,_hccs__WEBPACK_IMPORTED_MODULE_1__.testDone)(5)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject3()));
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject4())) < 2 && !(0,_hccs__WEBPACK_IMPORTED_MODULE_1__.testDone)(5)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject5()));
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject6())) < 1 && !(0,_hccs__WEBPACK_IMPORTED_MODULE_1__.testDone)(9)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject7()));
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject8())) < 3 && !(0,_hccs__WEBPACK_IMPORTED_MODULE_1__.testDone)(5)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject9()));
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject10()));
  }
}

while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() / (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMaxmp)() > 0.2 && nextLibramCost() <= (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)()) {
  castBestLibram();
}

/***/ }),

/***/ "./src/lib.ts":
/*!********************!*\
  !*** ./src/lib.ts ***!
  \********************/
/*! namespace exports */
/*! export ensureAsdonEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureCreateItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureDough [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureHermitItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureMpSausage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureMpTonic [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureNpcEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureOde [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensurePotionEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensurePullEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureSewerItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureSong [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fuelAsdon [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getPropertyBoolean [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getPropertyInt [provided] [no usage info] [missing usage info prevents renaming] */
/*! export incrementProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export itemPriority [provided] [no usage info] [missing usage info prevents renaming] */
/*! export kill [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mapMonster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export myFamiliarWeight [provided] [no usage info] [missing usage info prevents renaming] */
/*! export openSongSlot [provided] [no usage info] [missing usage info prevents renaming] */
/*! export pullIfPossible [provided] [no usage info] [missing usage info prevents renaming] */
/*! export sausageFightGuaranteed [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setChoice [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setClan [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setPropertyInt [provided] [no usage info] [missing usage info prevents renaming] */
/*! export shrug [provided] [no usage info] [missing usage info prevents renaming] */
/*! export tryEquip [provided] [no usage info] [missing usage info prevents renaming] */
/*! export tryUse [provided] [no usage info] [missing usage info prevents renaming] */
/*! export wishEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPropertyInt": () => /* binding */ getPropertyInt,
/* harmony export */   "setPropertyInt": () => /* binding */ setPropertyInt,
/* harmony export */   "incrementProperty": () => /* binding */ incrementProperty,
/* harmony export */   "getPropertyBoolean": () => /* binding */ getPropertyBoolean,
/* harmony export */   "setChoice": () => /* binding */ setChoice,
/* harmony export */   "myFamiliarWeight": () => /* binding */ myFamiliarWeight,
/* harmony export */   "ensureItem": () => /* binding */ ensureItem,
/* harmony export */   "ensureCreateItem": () => /* binding */ ensureCreateItem,
/* harmony export */   "ensureSewerItem": () => /* binding */ ensureSewerItem,
/* harmony export */   "ensureHermitItem": () => /* binding */ ensureHermitItem,
/* harmony export */   "ensureNpcEffect": () => /* binding */ ensureNpcEffect,
/* harmony export */   "ensurePotionEffect": () => /* binding */ ensurePotionEffect,
/* harmony export */   "ensureEffect": () => /* binding */ ensureEffect,
/* harmony export */   "ensureMpTonic": () => /* binding */ ensureMpTonic,
/* harmony export */   "ensureMpSausage": () => /* binding */ ensureMpSausage,
/* harmony export */   "sausageFightGuaranteed": () => /* binding */ sausageFightGuaranteed,
/* harmony export */   "itemPriority": () => /* binding */ itemPriority,
/* harmony export */   "setClan": () => /* binding */ setClan,
/* harmony export */   "ensureDough": () => /* binding */ ensureDough,
/* harmony export */   "fuelAsdon": () => /* binding */ fuelAsdon,
/* harmony export */   "ensureAsdonEffect": () => /* binding */ ensureAsdonEffect,
/* harmony export */   "mapMonster": () => /* binding */ mapMonster,
/* harmony export */   "tryUse": () => /* binding */ tryUse,
/* harmony export */   "tryEquip": () => /* binding */ tryEquip,
/* harmony export */   "wishEffect": () => /* binding */ wishEffect,
/* harmony export */   "pullIfPossible": () => /* binding */ pullIfPossible,
/* harmony export */   "ensurePullEffect": () => /* binding */ ensurePullEffect,
/* harmony export */   "shrug": () => /* binding */ shrug,
/* harmony export */   "openSongSlot": () => /* binding */ openSongSlot,
/* harmony export */   "ensureSong": () => /* binding */ ensureSong,
/* harmony export */   "ensureOde": () => /* binding */ ensureOde,
/* harmony export */   "kill": () => /* binding */ kill
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/combat.js");
var _ref;

function _templateObject36() {
  var data = _taggedTemplateLiteral(["Saucegeyser"]);

  _templateObject36 = function _templateObject36() {
    return data;
  };

  return data;
}

function _templateObject35() {
  var data = _taggedTemplateLiteral(["Saucestorm"]);

  _templateObject35 = function _templateObject35() {
    return data;
  };

  return data;
}

function _templateObject34() {
  var data = _taggedTemplateLiteral(["Stuffed Mortar Shell"]);

  _templateObject34 = function _templateObject34() {
    return data;
  };

  return data;
}

function _templateObject33() {
  var data = _taggedTemplateLiteral(["Sing Along"]);

  _templateObject33 = function _templateObject33() {
    return data;
  };

  return data;
}

function _templateObject32() {
  var data = _taggedTemplateLiteral(["Micrometeorite"]);

  _templateObject32 = function _templateObject32() {
    return data;
  };

  return data;
}

function _templateObject31() {
  var data = _taggedTemplateLiteral(["Curse of Weaksauce"]);

  _templateObject31 = function _templateObject31() {
    return data;
  };

  return data;
}

function _templateObject30() {
  var data = _taggedTemplateLiteral(["The Ode to Booze"]);

  _templateObject30 = function _templateObject30() {
    return data;
  };

  return data;
}

function _templateObject29() {
  var data = _taggedTemplateLiteral(["Ode to Booze"]);

  _templateObject29 = function _templateObject29() {
    return data;
  };

  return data;
}

function _templateObject28() {
  var data = _taggedTemplateLiteral(["Ode to Booze"]);

  _templateObject28 = function _templateObject28() {
    return data;
  };

  return data;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _templateObject27() {
  var data = _taggedTemplateLiteral(["Carlweather's Cantata of Confrontation, The Sonata of Sneakiness, Fat Leon's Phat Loot Lyric, Polka of Plenty"]);

  _templateObject27 = function _templateObject27() {
    return data;
  };

  return data;
}

function _templateObject26() {
  var data = _taggedTemplateLiteral(["Power Ballad of the Arrowsmith, The Magical Mojomuscular Melody, The Moxious Madrigal, Ode to Booze, Jackasses' Symphony of Destruction"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = _taggedTemplateLiteral(["Ur-Kel's Aria of Annoyance"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = _taggedTemplateLiteral(["Stevedave's Shanty of Superiority"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = _taggedTemplateLiteral(["the haiku dungeon"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _taggedTemplateLiteral(["Map the Monsters"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = _taggedTemplateLiteral(["Map the Monsters"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _taggedTemplateLiteral(["loaf of soda bread"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["soda water"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["loaf of soda bread"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["soda water"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["loaf of soda bread"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["all-purpose flower"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["all-purpose flower"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["wad of dough"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["magical sausage"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["magical sausage"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["Doc Galaktik's Invigorating Tonic"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["Doc Galaktik's Invigorating Tonic"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["hermit permit"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["chewing gum on a string"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["chewing gum on a string"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["worthless knick-knack"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["worthless gewgaw"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["worthless trinket"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["chewing gum on a string"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["chewing gum on a string"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



function getPropertyInt(name) {
  var str = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(name);

  if (str === "") {
    throw "Unknown property ".concat(name, ".");
  }

  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(str);
}
function setPropertyInt(name, value) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(name, "".concat(value));
}
function incrementProperty(name) {
  setPropertyInt(name, getPropertyInt(name) + 1);
}
function getPropertyBoolean(name) {
  var str = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(name);

  if (str === "") {
    throw "Unknown property ".concat(name, ".");
  }

  return str === "true";
}
function setChoice(adv, choice) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)("choiceAdventure".concat(adv), "".concat(choice));
}
function myFamiliarWeight() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.familiarWeight)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)()) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weightAdjustment)();
}
function ensureItem(quantity, it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) < quantity) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)(quantity - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it), it);
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) < quantity) {
    throw "Could not buy ".concat(quantity, " of item ").concat(it.name, ": only ").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it), ".");
  }
}
function ensureCreateItem(quantity, it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) < quantity) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.create)(quantity - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it), it);
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) < quantity) {
    throw "Could not create item.";
  }
}
function ensureSewerItem(quantity, it) {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) < quantity) {
    ensureItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject2()));
  }
}
function ensureHermitItem(quantity, it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) >= quantity) {
    return;
  }

  var count = quantity - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it);

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject3())) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject4())) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject5())) < count) {
    ensureItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject6()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject7()));
  }

  ensureItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject8()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(count, it);
}
function ensureNpcEffect(ef, quantity, potion) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
    ensureItem(quantity, potion);

    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)(ef["default"]) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
      throw "Failed to get effect ".concat(ef.name);
    }
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Already have effect ".concat(ef.name, "."));
  }
}
function ensurePotionEffect(ef, potion) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(potion) === 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.create)(1, potion);
    }

    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)(ef["default"]) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
      throw 'Failed to get effect " + ef.name + ".';
    }
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Already have effect ".concat(ef.name, "."));
  }
}
function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) < turns) {
    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)(ef["default"]) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
      throw 'Failed to get effect " + ef.name + ".';
    }
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Already have effect ".concat(ef.name, "."));
  }
}
function ensureMpTonic(mp) {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() < mp) {
    ensureItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject9()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject10()));
  }
}
function ensureMpSausage(mp) {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() < Math.min(mp, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMaxmp)())) {
    ensureCreateItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject11()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.eat)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject12()));
  }
}
function sausageFightGuaranteed() {
  var goblinsFought = getPropertyInt("_sausageFights");
  var nextGuaranteed = getPropertyInt("_lastSausageMonsterTurn") + 4 + goblinsFought * 3 + Math.pow(Math.max(0, goblinsFought - 5), 3);
  return goblinsFought === 0 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.totalTurnsPlayed)() >= nextGuaranteed;
}
function itemPriority() {
  var _items$find;

  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return (_items$find = items.find(function (item) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(item) > 0;
  })) !== null && _items$find !== void 0 ? _items$find : items[items.length - 1];
}
function setClan(target) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)() !== target) {
    var clanCache = JSON.parse((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("hccs_clanCache") || "{}");

    if (clanCache.target === undefined) {
      var recruiter = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_signup.php");
      var clanRe = /<option value=([0-9]+)>([^<]+)<\/option>/g;
      var match;

      while ((match = clanRe.exec(recruiter)) !== null) {
        clanCache[match[2]] = match[1];
      }
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)("hccs_clanCache", JSON.stringify(clanCache));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("showclan.php?whichclan=".concat(clanCache[target], "&action=joinclan&confirm=on&pwd"));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)() !== target) {
      throw "failed to switch clans to ".concat(target, ". Did you spell it correctly? Are you whitelisted?");
    }
  }

  return true;
}
function ensureDough(goal) {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject13())) < goal) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject14()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject15()));
  }
}
function fuelAsdon(goal) {
  var startingFuel = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getFuel)();
  if (startingFuel > goal) return startingFuel;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Fueling asdon. Currently ".concat(startingFuel, " litres."));
  var estimated = Math.floor((goal - startingFuel) / 5);
  var bread = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject16()));
  ensureDough(estimated - bread);
  ensureItem(estimated - bread, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject17()));
  ensureCreateItem(estimated, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject18()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("asdonmartin fuel ".concat(estimated, " loaf of soda bread"));

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getFuel)() < goal) {
    ensureDough(1);
    ensureItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject19()));
    ensureCreateItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject20()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("asdonmartin fuel 1 loaf of soda bread");
  }

  var endingFuel = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getFuel)();
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Done fueling. Now ".concat(endingFuel, " litres."));
  return endingFuel;
}
function ensureAsdonEffect(ef) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
    fuelAsdon(37);
  }

  ensureEffect(ef);
}
function mapMonster(location, monster) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveSkill)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject21())) && !getPropertyBoolean("mappingMonsters") && getPropertyInt("_monstersMapped") < 3) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject22()));
  }

  if (!getPropertyBoolean("mappingMonsters")) throw "Failed to setup Map the Monsters.";
  var mapPage = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toUrl)(location), false, true);
  if (!mapPage.includes("Leading Yourself Right to Them")) throw "Something went wrong mapping.";
  var fightPage = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("choice.php?pwd&whichchoice=1435&option=1&heyscriptswhatsupwinkwink=".concat(monster.id));
  if (!fightPage.includes("You're fighting") && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myLocation)() !== (0,libram__WEBPACK_IMPORTED_MODULE_1__.$location)(_templateObject23())) throw "Something went wrong starting the fight.";
}
function tryUse(quantity, it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) > 0) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(quantity, it);
  } else {
    return false;
  }
}
function tryEquip(it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) > 0) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)(it);
  } else {
    return false;
  }
}
function wishEffect(ef) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("genie effect ".concat(ef.name));
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Already have effect ".concat(ef.name, "."));
  }
}
function pullIfPossible(quantity, it, maxPrice) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.pullsRemaining)() > 0) {
    var quantityPull = Math.max(0, quantity - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.shopAmount)(it) > 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeShop)(Math.min((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.shopAmount)(it), quantityPull), it);
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.storageAmount)(it) < quantityPull) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buyUsingStorage)(quantityPull - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.storageAmount)(it), it, maxPrice);
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("pull ".concat(quantityPull, " ").concat(it.name));
    return true;
  } else return false;
}
function ensurePullEffect(ef, it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) > 0 || pullIfPossible(1, it, 50000)) ensureEffect(ef);
  }
}
function shrug(ef) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) > 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("shrug ".concat(ef.name));
  }
} // We have Stevedave's, Ur-Kel's on at all times during leveling (managed via mood); third and fourth slots are variable.

var songSlots = [(0,libram__WEBPACK_IMPORTED_MODULE_1__.$effects)(_templateObject24()), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$effects)(_templateObject25()), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$effects)(_templateObject26()), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$effects)(_templateObject27())];

var allKnownSongs = (_ref = []).concat.apply(_ref, songSlots);

var allSongs = Skill.all().filter(function (skill) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toString)(skill["class"]) === "Accordion Thief" && skill.buff;
}).map(function (skill) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toEffect)(skill);
});
function openSongSlot(song) {
  var _iterator = _createForOfIteratorHelper(songSlots),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var songSlot = _step.value;

      if (songSlot.includes(song)) {
        var _iterator3 = _createForOfIteratorHelper(songSlot),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var shruggable = _step3.value;
            shrug(shruggable);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(allSongs),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var badSong = _step2.value;

      if (!allKnownSongs.includes(badSong)) {
        shrug(badSong);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
function ensureSong(ef) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
    openSongSlot(ef);

    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)(ef["default"]) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
      throw "Failed to get effect ".concat(ef.name);
    }
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Already have effect ".concat(ef.name, "."));
  }
}
function ensureOde(turns) {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject28())) < turns) {
    ensureMpTonic(50);
    openSongSlot((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject29()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject30()));
  }
}
function kill() {
  return libram__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject31())).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject32())).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject33())).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject34())).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject35())).trySkillRepeat((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject36())).attack();
}

/***/ }),

/***/ "kolmafia":
/*!***************************!*\
  !*** external "kolmafia" ***!
  \***************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = require("kolmafia");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/hccsLibrams.ts");
/******/ })()

));