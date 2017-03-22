'use strict'

/**
 * Check if given code is a number
 * @param  {Number}  code
 * @return {Boolean}
 */
export function isNumber(code) {
	return code > 47 && code < 58;
}

/**
 * Check if given character code is alpha code (letter through A to Z)
 * @param  {Number}  code
 * @param  {Number}  [from]
 * @param  {Number}  [to]
 * @return {Boolean}
 */
export function isAlpha(code, from, to) {
	from = from || 65; // A
	to   = to   || 90; // Z
	code &= ~32; // quick hack to convert any char code to uppercase char code

	return code >= from && code <= to;
}

/**
 * Check if given character code is alpha-numeric (letter through A to Z or number)
 * @param  {Number}  code
 * @return {Boolean}
 */
export function isAlphaNumeric(code) {
	return isNumber(code) || isAlpha(code);
}
