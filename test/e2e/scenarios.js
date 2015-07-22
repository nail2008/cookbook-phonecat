'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function () {
    it('访问index.html应该跳转到url：index.html#/phones', function () {
        browser.get('app/index.html');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/phones');
        });
    })

    describe('Phone list view', function () {
        beforeEach(function () {
            browser.get('app/index.html#/phones');
        });
        it('查询过滤框可以正常过滤', function () {
            var phoneList = element.all(by.repeater('phone in phones'));
            var query = element(by.model('query'));

            expect(phoneList.count()).toBe(20);

            query.sendKeys('nexus');
            expect(phoneList.count()).toBe(1);

            query.clear();
            query.sendKeys('motorola');
            expect(phoneList.count()).toBe(8);
        });

        it('orderProp可以正常改变查询结果的排列顺序', function () {
            var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'));
            var query = element(by.model('query'));

            function getNames() {
                return phoneNameColumn.map(function (elm) {
                    return elm.getText();
                });
            }

            query.sendKeys('tablet');

            expect(getNames()).toEqual(["Motorola XOOM\u2122 with Wi-Fi",
                "MOTOROLA XOOM\u2122"]);

            element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

            expect(getNames()).toEqual(["MOTOROLA XOOM\u2122", "Motorola XOOM\u2122 with Wi-Fi"
            ]);

        });

        it('点击手机链接，可以调转到正确的url（详情页面）', function () {
            var query = element(by.model('query'));
            query.sendKeys('nexus');
            element.all(by.css('.phones li a')).first().click();
            browser.getLocationAbsUrl().then(function (url) {
                expect(url).toEqual('/phones/nexus-s');
            });
        });
    });

    describe('Phone detail view', function () {
        beforeEach(function () {
            browser.get('app/index.html#/phones/nexus-s');
        });

        it('名称正确', function () {
            expect(element(by.binding('phone.name')).getText()).toBe('Nexus S');
        });

        it('图片src正确', function () {
            expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });

        it('点击缩略图，大图激活正确', function () {
            element(by.css('.phone-thumbs li:nth-child(3) img')).click();
            expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);

            element(by.css('.phone-thumbs li:nth-child(1) img')).click();
            expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });
    });

});
