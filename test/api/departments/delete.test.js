const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/departments.model.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {

    before(async () => {
        const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDepOne.save();
      });
    
    it('/:id should remove chosen document and return success', async () => {
        const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
        const department = await Department.find();
        expect(res.status).to.be.equal(200);
        expect(res.body).to.not.be.null;
        expect(department.length).to.be.equal(0);
    });
})