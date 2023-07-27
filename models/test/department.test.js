const mongoose = require('mongoose');
const Department = require('../departments.model');
const { describe, it } = require('mocha');
const expect = require('chai').expect;



describe('Department', () => {

    it('should throw an error if no "name" arg', () => {
        const dep = new Department({});

        dep.validate(err => {
            expect(err.errors.name).to.exist;
          });
        after(() => {
            mongoose.models = {};
        });
    });
    it('should throw an error if "name" is not a string', () => {

        const cases = [{}, []];
        for(let name of cases) {
            const dep = new Department({ name });

            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });
    it('should throw an error if "name" is shorter than 5 or longer than 20', () => {

        const cases = ['Mix', 'WakaMakaWakaMakaDumDumxxxxx'];
        for(let name of cases) {
            const dep = new Department({ name });
        
            dep.validate(err => {
              expect(err.errors.name).to.exist;
            });
        }
    });
    it('should not throw an error if "name" is okay', () => {

        const cases = ['Marketing', 'Testing'];
        for(let name of cases) {
            const dep = new Department({ name });

            dep.validate(err => {
                expect(err).to.not.exist;
            });
        }
    });
  });