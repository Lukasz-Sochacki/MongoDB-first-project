const Employee = require('../employee.model');
const expect = require('chai').expect;

describe('Employee', () => {
  it('should throw an error if no args', () => {
    const emp = new Employee({});

    emp.validateSync((err) => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });

  it('should throw an error if args are not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const emp = new Employee({ firstName: name, lastName: name });

      emp.validateSync((err) => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it('should not throw an error if args are okay', () => {
    const cases = ['Johnson', 'Alfred', 'IT'];
    for (let name of cases) {
      const emp = new Employee({
        firstName: name,
        lastName: name,
        department: name,
      });

      emp.validateSync((err) => {
        expect(err.errors.firstName).to.not.exist;
        expect(err.errors.lastName).to.not.exist;
        expect(err.errors.department).to.not.exist;
      });
    }
  });
});
