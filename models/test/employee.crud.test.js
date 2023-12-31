const mongoose = require('mongoose');
const Employee = require('../employees.model');
const expect = require('chai').expect;
const { describe, it } = require('mocha');


describe('Employee', () => {
    before(async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
            console.error(err);
        }
    });

    describe('Reading data', () => {
        before(async () => {
            const testEmpOne = new Employee({ firstName: 'Mariusz', lastName: 'Bambo', department: 'Marketing' });
            await testEmpOne.save();
            const testEmpTwo = new Employee({ firstName: 'Syriusz', lastName: 'Black', department: 'Testing' });
            await testEmpTwo.save();
        });
        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });
        it('should return proper document by various params with findOne method', async () => {
            const employeeOne = await Employee.findOne({ firstName: 'Syriusz' });
            const employeeTwo = await Employee.findOne({ lastName: 'Bambo' });
            const employeeThree = await Employee.findOne({ department: 'Marketing'});
            expect(employeeOne.lastName).to.be.equal('Black');
            expect(employeeTwo.firstName).to.be.equal('Mariusz');
            expect(employeeThree.lastName).to.be.equal('Bambo');
        });
        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Creating data', () => {
        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ firstName: 'Mariusz', lastName: 'Bambo', department: 'Marketing' });
            await employee.save();
            expect(employee.isNew).to.be.false;
        });
        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Updating data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'Mariusz', lastName: 'Bambo', department: 'Marketing' });
            await testEmpOne.save();
            const testEmpTwo = new Employee({ firstName: 'Syriusz', lastName: 'Black', department: 'Testing' });
            await testEmpTwo.save();
        });
        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'Mariusz' }, { $set: { firstName: '=Mariusz=' }});
            const updatedEmployee = await Employee.findOne({ firstName: '=Mariusz=' });
            expect(updatedEmployee).to.not.be.null;
        });
        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'Syriusz' });
            employee.lastName = 'MakaMaka';
            await employee.save();

            const updatedEmployee = await Employee.findOne({ lastName: 'MakaMaka' });
            expect(updatedEmployee).to.not.be.null;
        });
        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { department: 'Updated!' }});
             const employees = await Employee.find({ department: 'Updated!' });
            expect(employees.length).to.be.equal(2);
        });
        afterEach(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Removing data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'Mariusz', lastName: 'Bambo', department: 'Marketing' });
            await testEmpOne.save();
            const testEmpTwo = new Employee({ firstName: 'Syriusz', lastName: 'Black', department: 'Testing' });
            await testEmpTwo.save();
        });
        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'Mariusz' });
            const employee = await Employee.findOne({ firstName: 'Mariusz' });
            expect(employee).to.be.null;
        });
        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({ lastName: 'Black' });
            await employee.remove();
            const removedEmployee = await Employee.findOne({ lastName: 'Black' });
            expect(removedEmployee).to.be.null;
        });
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employees = await Employee.find();
            expect(employees.length).to.be.equal(0);
        });
        afterEach(async () => {
            await Employee.deleteMany();
        });
    });
});