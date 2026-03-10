const Employee = require('../employee.model');
const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();

      const testEmpOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: testDepOne._id,
      });
      await testEmpOne.save();

      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();

      const testEmpTwo = new Employee({
        firstName: 'Amanda',
        lastName: 'Doe',
        department: testDepTwo._id,
      });
      await testEmpTwo.save();
    });

    after(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const employee = await Employee.find();
      expect(employee.length).to.be.equal(2);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      expect(employee.firstName).to.be.equal('John');
    });
  });

  describe('Creating data', () => {
    let testDepOne;
    before(async () => {
      testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();
    });

    after(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: testDepOne._id,
      });
      await employee.save();
      const foundEmployee = await Employee.findOne({ firstName: 'John' });
      expect(foundEmployee).to.not.be.null;
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();

      const testEmpOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: testDepOne._id,
      });
      await testEmpOne.save();

      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();

      const testEmpTwo = new Employee({
        firstName: 'Amanda',
        lastName: 'Doe',
        department: testDepTwo._id,
      });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Department.deleteMany();
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne(
        { firstName: 'John', lastName: 'Doe' },
        { $set: { firstName: 'Jacob' } },
      );
      const updatedEmployee = await Employee.findOne({
        firstName: 'Jacob',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      employee.firstName = 'Jacob';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: 'Jacob' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Jacob' } });
      const employees = await Employee.find();
      expect(employees[0].firstName).to.be.equal('Jacob');
      expect(employees[1].firstName).to.be.equal('Jacob');
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();

      const testEmpOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: testDepOne._id,
      });
      await testEmpOne.save();

      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();

      const testEmpTwo = new Employee({
        firstName: 'Amanda',
        lastName: 'Doe',
        department: testDepTwo._id,
      });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Department.deleteMany();
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const removeEmployee = await Employee.findOne({ firstName: 'John' });
      expect(removeEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });
  });
});
