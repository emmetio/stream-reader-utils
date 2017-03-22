'use strict';

import eatQuoted, { isQuote } from './lib/quotes';
import { isAlpha, isNumber, isAlphaNumeric } from './lib/alphanumeric';
import { isSpace, isWhiteSpace } from './lib/space';
import eatPair from './lib/pairs';

export {
	eatQuoted, isQuote,
	isAlpha, isNumber, isAlphaNumeric,
	isSpace, isWhiteSpace,
	eatPair
};
