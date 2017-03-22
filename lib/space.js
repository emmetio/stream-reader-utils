'use strict';

export function isWhiteSpace(code) {
	return code === 32   /* space */
		|| code === 9    /* tab */
		|| code === 160; /* non-breaking space */
}

/**
 * Check if given character code is a space
 * @param  {Number}  code
 * @return {Boolean}
 */
export function isSpace(code) {
	return isWhiteSpace(code)
		|| code === 10  /* LF */
		|| code === 13; /* CR */
}
