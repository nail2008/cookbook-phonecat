'use strict';

/* jasmine specs for filters go here */

describe('filter', function () {
    beforeEach(module('phonecatFilters'));

    //第一种写法
    describe('checkmark', function () {
        var filter;

        beforeEach(inject(function ($filter) {
            filter = $filter('checkmark');
        }));

        it('should convert boolean values to unicode checkmark or cross', function () {
            expect(filter(true)).toBe('\u2713');
            expect(filter(false)).toBe('\u2718');
        });
    });

    //第二种写法
    describe('checkmark', function () {
        it('should convert boolean values to unicode checkmark or cross', inject(function (checkmarkFilter) {
            expect(checkmarkFilter(true)).toBe('\u2713');
            expect(checkmarkFilter(false)).toBe('\u2718');
        }));
    });

});
