var mock, notify;

define([
    'angular',
    'lodash'
], function(angular, _) {

    describe('Testing lodash', function() {
        expect(_.size[1, 2, 3]).toEqual(3);
    });
});
