var records = require('./../app/records.js')

describe('records operations', function() {

	describe('when inserting records', function() {

		it("creates the record on the filesystem", function() {
			records.insert('2347231212', {
				name: 'zxczcxzxc',
				location: 'ward A'
			});
		})
	})
})
