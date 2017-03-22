'use strict';

const assert = require('assert');
const StreamReader = require('@emmetio/stream-reader');
require('babel-register');
const eatQuoted = require('../lib/quotes').default;

describe('Quoted', () => {
	it('eat quoted', () => {
		const data = '"foo"   \'bar\'';
		const stream = new StreamReader(data);

		assert(eatQuoted(stream));
		assert.equal(stream.start, 0);
		assert.equal(stream.pos, 5);
		assert.equal(stream.current(), '"foo"');

		// no double-quoted value ahead
		assert(!eatQuoted(stream, { throws: true }));

		// eat space
		assert(stream.eatWhile(' '.charCodeAt(0)));
		assert.equal(stream.pos, 8);

		assert(eatQuoted(stream));
		assert.equal(stream.start, 8);
		assert.equal(stream.pos, 13);
		assert.equal(stream.current(), "'bar'");
		assert(stream.eof());
	});

	it('handle broken strings', () => {
		const stream = new StreamReader('"foo');
		assert(!eatQuoted(stream));
		assert.equal(stream.pos, 0);

		assert.throws(() => eatQuoted(stream, { throws: true }), /Unable to consume quoted string/);
	});

	it('handle escapes', () => {
		const stream = new StreamReader('"foo\\"bar" baz');
		assert(eatQuoted(stream));
		assert.equal(stream.start, 0);
		assert.equal(stream.pos, 10);
		assert.equal(stream.current(), '"foo\\"bar"');
	});
});
