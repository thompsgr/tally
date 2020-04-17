var assert = require('assert');
var tally = require('../index.js');
describe('tally()', function() {

		beforeEach(function() {
				mytally = tally();
		});

		describe('constructor', function() {
				it('should return tally object with necessary methods', function() {
						assert.equal(typeof mytally, 'object');
						assert.equal(typeof mytally.up, 'function');
						assert.equal(typeof mytally.length, 'function');
						assert.equal(typeof mytally.items, 'function');
						assert.equal(typeof mytally.total, 'function');
						assert.equal(typeof mytally.percent, 'function');
						assert.equal(typeof mytally.map, 'function');
						assert.equal(typeof mytally.log, 'function');
				});
		});
		describe('up', function() {
				it('should initialize new item to 1', function() {
						mytally.up('A');
						assert.equal(mytally.length(),1);
						assert.equal(mytally.items()['A'], 1);
				});
				it('should return new tally for an item', function() {
						mytally.up('A');
						assert.equal(mytally.up('A'), 2);
				})
		});
		describe('items', function () {
				it('should return object with properties/counts', function() {
						mytally.up('C');
						mytally.up('A');
						mytally.up('D');
						mytally.up('B');
						mytally.up('C');
						mytally.up('A');
						assert.equal(mytally.length(),4);
						assert.equal(mytally.items()['A'],2);
						assert.equal(mytally.items()['B'],1);
						assert.equal(mytally.items()['C'],2);
						assert.equal(mytally.items()['D'],1);
				});
				it('should return object with indexes/counts', function() {
						mytally.up(0);
						mytally.up(3);
						mytally.up(13);
						mytally.up(14);
						mytally.up(2);
						mytally.up(3);
						assert.equal(mytally.length(),5);
						assert.equal(mytally.items()[0],1);
						assert.equal(mytally.items()[2],1);
						assert.equal(mytally.items()[3],2);
						assert.equal(mytally.items()[13],1);
						assert.equal(mytally.items()[14],1);
				});
				it('should return cols/counts when cols provided', function() {
						var myCols = ['A','B','C','D','E','F'];
						mytally.up(1);
						mytally.up(3);
						mytally.up(1);
						mytally.up(5);
						mytally.up(5);
						mytally.up(5);
						assert.equal(mytally.length(),3);
						mytally.map(myCols);
						assert.equal(mytally.length(),6);
						var items = mytally.items();
						assert.equal(items['00-A'],0);
						assert.equal(items['01-B'],2);
						assert.equal(items['05-F'],3);
				});
		});
		describe('total', function() {
				it('should return total of all items', function() {
						mytally.up(3);
						mytally.up(1);
						mytally.up(2);
						mytally.up(1);
						mytally.up(0);
						assert.equal(mytally.total(),5);
				});
		});
});
