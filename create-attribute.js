var escape = require('escape-html');
var propConfig = require('./property-config');
var types = propConfig.attributeTypes;
var properties = propConfig.properties;
var attributeNames = propConfig.attributeNames;

var prefixAttribute = memoizeString(function (name) {
	return escape(name) + '="';
});

module.exports = createAttribute;

/**
* Create attribute string.
*
* @param {String} name The name of the property or attribute
* @param {*} value The value
* @param {Boolean} [isAttribute] Denotes whether `name` is an attribute.
* @return {?String} Attribute string || null if not a valid property or custom attribute.
*/

function createAttribute(name, value, isAttribute) {
	name = (attributeNames[name] || name).toLowerCase();
	return prefixAttribute(name) + escape(value) + '"';
}

/**
* Should skip false boolean attributes.
*/

function shouldSkip(name, value) {
	var attrType = properties[name];
	return value == null ||
	(attrType === types.BOOLEAN && !value) ||
	(attrType === types.OVERLOADED_BOOLEAN && value === false);
}

/**
* Memoizes the return value of a function that accepts one string argument.
*
* @param {function} callback
* @return {function}
*/

function memoizeString(callback) {
	var cache = {};
	return function(string) {
		if (cache.hasOwnProperty(string)) {
			return cache[string];
		} else {
			return cache[string] = callback.call(this, string);
		}
	};
}
