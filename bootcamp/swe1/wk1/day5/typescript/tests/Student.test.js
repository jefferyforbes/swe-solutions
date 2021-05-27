const Student = require('../built/Student');

describe('Student', function () {

    test('getName', function () {
        const student = new Student('bob', 't', 'builder');
        expect(student.getName()).toBe('bob t builder');
    })

});