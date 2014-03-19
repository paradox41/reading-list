'use strict';

define([
    'lodash'
], function(_) {

    describe('Testing lodash', function() {
        expect(_.size([1, 2, 3])).toEqual(3);
    });
});
