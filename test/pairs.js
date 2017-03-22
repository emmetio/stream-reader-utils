'use strict';

const assert = require('assert');
const StreamReader = require('@emmetio/stream-reader');
require('babel-register');
const eatPair = require('../lib/pairs').default;

describe('Pairs', () => {
	const code = ch => ch.charCodeAt(0);

	it('eat', () => {
		const stream = new StreamReader('[foo] (bar (baz) bam)');

		assert(eatPair(stream, code('['), code(']')));
		assert.equal(stream.start, 0);
		assert.equal(stream.pos, 5);
		assert.equal(stream.current(), '[foo]');

		// No pair here
		assert(!eatPair(stream, code('('), code(')'), { throws: true }));
		stream.eatWhile(code(' '));

		assert(eatPair(stream, code('('), code(')'), { throws: true }));
		assert.equal(stream.start, 6);
		assert.equal(stream.pos, 21);
		assert.equal(stream.current(), '(bar (baz) bam)');
	});

	it('eat with quotes', () => {
		const stream = new StreamReader('[foo "bar]" ]');
		assert(eatPair(stream, code('['), code(']')));
		assert.equal(stream.start, 0);
		assert.equal(stream.pos, 13);
		assert.equal(stream.current(), '[foo "bar]" ]');
	});

	it('handle invalid', () => {
		const stream = new StreamReader('[foo');
		assert(!eatPair(stream, code('['), code(']')));
		assert.equal(stream.start, 0);
		assert.equal(stream.pos, 0);

		assert.throws(() => assert(!eatPair(stream, code('['), code(']'), { throws: true })),
			/Unable to find matching pair/);
	});
});
