const mongoose = require('mongoose');
const Employee = require('../employees.model');
const { describe, it } = require('mocha');
const expect = require('chai').expect;

describe('Employee', () => {

    it('should throw an error if no any arg', () => {
        const emp = new Employee({});

        emp.validate(err => {
            expect(err).to.exist;
        });
        after(() => {
            mongoose.models = {};
        });
    });
    it('should throw an error if no "firstName" arg', () => {
        const emp = new Employee({ lastName: 'Truman', department: 'Marketing'});

        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
        });
        after(() => {
            mongoose.models = {};
        });
    });
    it('should throw an error if no "lastName" arg', () => {
        const emp = new Employee({ firstName: 'Jack', department: 'Testing'});

        emp.validate(err => {
            expect(err.errors.lastName).to.exist;
        });
        after(() => {
            mongoose.models = {};
        });
    });
    it('should throw an error if no "department" arg', () => {
        const emp = new Employee({ firstName: 'Marco', lastName: 'Polo'});

        emp.validate(err => {
            expect(err.errors.department).to.exist;
        });
        after(() => {
            mongoose.models = {};
        });
    });
    it('should throw an error if "firstName" is not a string', () => {
        const emp = new Employee({ firstName: {}, lastName: 'xxs', department: 'Testing'});

        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
        });
        after(() => {
            mongoose.models = {};
        });
    });
    it('should throw an error if "lastName" is not a string', () => {
        const emp = new Employee({ firstName: 'Johny', lastName: {}, department: 'Testing'});

        emp.validate(err => {
            expect(err.errors.lastName).to.exist;
        });
        after(() => {
            mongoose.models = {};
        });
    });
    it('should throw an error if "department" is not a string', () => {
        const emp = new Employee({ firstName: 'Lisa', lastName: 'Scully', department: {}});

        emp.validate(err => {
            expect(err.errors.department).to.exist;
        });
        after(() => {
            mongoose.models = {};
        });
    });
    it('should not throw an error if all args are okay', () => {

        const emp = new Employee({ firstName: 'Nick', lastName: 'Mulder', department: 'Xfiles'});

        emp.validate(err => {
            expect(err).to.not.exist;
        });
        after(() => {
            mongoose.models = {};
        });
    });
});