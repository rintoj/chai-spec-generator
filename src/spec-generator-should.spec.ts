import { expect, should } from 'chai'

import { generateSpec } from './spec-generator'

should()

describe('generateSpec in should style', () => {

  it('should generate spec if given true', () => {
    let result = generateSpec(true, { style: 'should' })
    result.should.be.a('array');
    result.should.be.length(1);
    result[0].should.be.equal('result.should.be.equal(true);');
  })

  it('should generate spec if given false', () => {
    let result = generateSpec(false, { style: 'should' })
    result.should.be.a('array');
    result.should.be.length(1);
    result[0].should.be.equal('result.should.be.equal(false);');
  })

  it('should generate spec if given defined', () => {
    let result = generateSpec('defined', { special: true, style: 'should' })
    result.should.be.a('array');
    result.should.be.length(1);
    result[0].should.be.equal('result.should.be.exist;');
  })

  it('should generate spec for throw in es6 style and without semicolon', () => {
    let result = generateSpec('throw calc(1, true)', { style: 'should', special: true })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('(() => calc(1, true)).should.to.throw();');
  })

  it('should generate spec for throw in es5 style and without semicolon', () => {
    let result = generateSpec('throw calc(1, true)', { style: 'should', special: true, es6: false })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('(function() { calc(1, true); }).should.to.throw();');
  })

  it('should generate spec if given undefined', () => {
    let result = generateSpec(undefined, { style: 'should' })
    result.should.be.a('array');
    result.should.be.length(1);
    result[0].should.be.equal('result.should.be.undefined;');
  })

  it('should generate spec if given empty object', () => {
    let result = generateSpec({}, { style: 'should' })
    result.should.be.a('array');
    result.should.be.length(1);
    result[0].should.be.equal('result.should.be.a(\'object\');');
  })

  it('should generate spec if given empty array', () => {
    let result = generateSpec([], { style: 'should' })
    result.should.be.a('array');
    result.should.be.length(3);
    result[0].should.be.equal('result.should.be.a(\'array\');');
    result[1].should.be.equal('result.should.be.empty;');
  })

  it('should generate spec if given array of strings', () => {
    let result = generateSpec(['a', 'b', 'c'], { style: 'should' })
    result.should.be.a('array');
    result.should.be.length(6);
    result[0].should.be.equal('result.should.be.a(\'array\');');
    result[1].should.be.equal('result.should.be.length(3);');
    result[2].should.be.equal('result[0].should.be.equal(\'a\');');
    result[3].should.be.equal('result[1].should.be.equal(\'b\');');
    result[4].should.be.equal('result[2].should.be.equal(\'c\');');
  })

  it('should generate spec if given an object', () => {
    let result = generateSpec({ firstName: 'John', lastName: 'Doe' }, { style: 'should' })
    result.should.be.a('array');
    result.should.be.length(7);
    result[0].should.be.equal('result.should.be.a(\'object\');');
    result[1].should.be.equal('result.should.have.property(\'firstName\');');
    result[2].should.be.equal('result.firstName.should.be.equal(\'John\');');
    result[3].should.be.equal('');
    result[4].should.be.equal('result.should.have.property(\'lastName\');');
    result[5].should.be.equal('result.lastName.should.be.equal(\'Doe\');');
    result[6].should.be.equal('');
  })

  it('should generate spec if given an array of objects', () => {
    let result = generateSpec([
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'John', lastName: 'Doe' }
    ], { style: 'should' })

    result.should.be.a('array');
    result.should.be.length(16);
    result[0].should.be.equal('result.should.be.a(\'array\');');
    result[1].should.be.equal('result.should.be.length(2);');
    result[2].should.be.equal('result[0].should.be.a(\'object\');');
    result[3].should.be.equal('result[0].should.have.property(\'firstName\');');
    result[4].should.be.equal('result[0].firstName.should.be.equal(\'John\');');
    result[5].should.be.equal('');
    result[6].should.be.equal('result[0].should.have.property(\'lastName\');');
    result[7].should.be.equal('result[0].lastName.should.be.equal(\'Doe\');');
    result[8].should.be.equal('');
    result[9].should.be.equal('result[1].should.be.a(\'object\');');
    result[10].should.be.equal('result[1].should.have.property(\'firstName\');');
    result[11].should.be.equal('result[1].firstName.should.be.equal(\'John\');');
    result[12].should.be.equal('');
    result[13].should.be.equal('result[1].should.have.property(\'lastName\');');
    result[14].should.be.equal('result[1].lastName.should.be.equal(\'Doe\');');
    result[15].should.be.equal('');
  })

  it('should generate spec if object with inner objects is given', () => {
    let result = generateSpec({
      firstName: 'John',
      lastName: 'Doe',
      manager: { firstName: 'John', lastName: 'Doe' }
    }, { style: 'should' })
    result.should.be.a('array');
    result.should.be.length(15);
    result[0].should.be.equal('result.should.be.a(\'object\');');
    result[1].should.be.equal('result.should.have.property(\'firstName\');');
    result[2].should.be.equal('result.firstName.should.be.equal(\'John\');');
    result[3].should.be.equal('');
    result[4].should.be.equal('result.should.have.property(\'lastName\');');
    result[5].should.be.equal('result.lastName.should.be.equal(\'Doe\');');
    result[6].should.be.equal('');
    result[7].should.be.equal('result.should.have.property(\'manager\');');
    result[8].should.be.equal('result.manager.should.be.a(\'object\');');
    result[9].should.be.equal('result.manager.should.have.property(\'firstName\');');
    result[10].should.be.equal('result.manager.firstName.should.be.equal(\'John\');');
    result[11].should.be.equal('');
    result[12].should.be.equal('result.manager.should.have.property(\'lastName\');');
    result[13].should.be.equal('result.manager.lastName.should.be.equal(\'Doe\');');
    result[14].should.be.equal('');
  })

  it('should return an empty array if an invalid special string is given', () => {
    let result = generateSpec('invalid-string', {
      special: true, style: 'should'
    })
    result.should.be.a('array');
    result.should.be.length(0);
  })

  it('should quote property name if it contains special character', () => {
    let result = generateSpec({ 'Content-Type': 'application/json' }, { style: 'should' })
    result.should.be.a('array');
    result.should.be.length(4);
    result[0].should.be.equal('result.should.be.a(\'object\');');
    result[1].should.be.equal('result.should.have.property(\'Content-Type\');');
    result[2].should.be.equal('result[\'Content-Type\'].should.be.equal(\'application/json\');');
    result[3].should.be.equal('');
  })

  it('should generate spec if an object with one of the property array is given', () => {
    let result = generateSpec({ names: ['John', 'Doe'] }, { style: 'should' })
    result.should.be.a('array');
    result.should.be.length(7);
    result[0].should.be.equal('result.should.be.a(\'object\');');
    result[1].should.be.equal('result.should.have.property(\'names\');');
    result[2].should.be.equal('result.names.should.be.a(\'array\');');
    result[3].should.be.equal('result.names.should.be.length(2);');
    result[4].should.be.equal('result.names[0].should.be.equal(\'John\');');
    result[5].should.be.equal('result.names[1].should.be.equal(\'Doe\');');
    result[6].should.be.equal('');
  })

  it('should not quote the property value if it is not string', () => {
    let result = generateSpec({ age: 20, active: false }, { style: 'should' })
    result.should.be.a('array');
    result.should.be.length(7);
    result[0].should.be.equal('result.should.be.a(\'object\');');
    result[1].should.be.equal('result.should.have.property(\'age\');');
    result[2].should.be.equal('result.age.should.be.equal(20);');
    result[3].should.be.equal('');
    result[4].should.be.equal('result.should.have.property(\'active\');');
    result[5].should.be.equal('result.active.should.be.equal(false);');
    result[6].should.be.equal('');
  })

})

describe('generateSpec in should style with double quote', () => {

  it('should generate spec with double quote if given empty object', () => {
    let result = generateSpec({}, { quote: '"', style: 'should' })
    result.should.be.a('array');
    result.should.be.length(1);
    result[0].should.be.equal('result.should.be.a("object");');
  })

  it('should generate spec with double quote if given empty array', () => {
    let result = generateSpec([], { quote: '"', style: 'should' })
    result.should.be.a('array');
    result.should.be.length(3);
    result[0].should.be.equal('result.should.be.a("array");');
    result[1].should.be.equal('result.should.be.empty;');
  })

  it('should generate spec with double quote if given array of strings', () => {
    let result = generateSpec(['a', 'b', 'c'], { quote: '"', style: 'should' })
    result.should.be.a('array');
    result.should.be.length(6);
    result[0].should.be.equal('result.should.be.a("array");');
    result[1].should.be.equal('result.should.be.length(3);');
    result[2].should.be.equal('result[0].should.be.equal("a");');
    result[3].should.be.equal('result[1].should.be.equal("b");');
    result[4].should.be.equal('result[2].should.be.equal("c");');
  })

  it('should generate spec with double quote if given an object', () => {
    let result = generateSpec({ firstName: 'John', lastName: 'Doe' }, { quote: '"', style: 'should' })
    result.should.be.a('array');
    result.should.be.length(7);
    result[0].should.be.equal('result.should.be.a("object");');
    result[1].should.be.equal('result.should.have.property("firstName");');
    result[2].should.be.equal('result.firstName.should.be.equal("John");');
    result[3].should.be.equal('');
    result[4].should.be.equal('result.should.have.property("lastName");');
    result[5].should.be.equal('result.lastName.should.be.equal("Doe");');
    result[6].should.be.equal('');
  })

  it('should generate spec with double quote if given an array of objects', () => {
    let result = generateSpec([
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'John', lastName: 'Doe' }
    ], { quote: '"', style: 'should' })

    result.should.be.a('array');
    result.should.be.length(16);
    result[0].should.be.equal('result.should.be.a("array");');
    result[1].should.be.equal('result.should.be.length(2);');
    result[2].should.be.equal('result[0].should.be.a("object");');
    result[3].should.be.equal('result[0].should.have.property("firstName");');
    result[4].should.be.equal('result[0].firstName.should.be.equal("John");');
    result[5].should.be.equal('');
    result[6].should.be.equal('result[0].should.have.property("lastName");');
    result[7].should.be.equal('result[0].lastName.should.be.equal("Doe");');
    result[8].should.be.equal('');
    result[9].should.be.equal('result[1].should.be.a("object");');
    result[10].should.be.equal('result[1].should.have.property("firstName");');
    result[11].should.be.equal('result[1].firstName.should.be.equal("John");');
    result[12].should.be.equal('');
    result[13].should.be.equal('result[1].should.have.property("lastName");');
    result[14].should.be.equal('result[1].lastName.should.be.equal("Doe");');
    result[15].should.be.equal('');
  })

  it('should generate spec with double quote if object with inner objects is given', () => {
    let result = generateSpec({
      firstName: 'John',
      lastName: 'Doe',
      manager: { firstName: 'John', lastName: 'Doe' }
    }, { quote: '"', style: 'should' })
    result.should.be.a('array');
    result.should.be.length(15);
    result[0].should.be.equal('result.should.be.a("object");');
    result[1].should.be.equal('result.should.have.property("firstName");');
    result[2].should.be.equal('result.firstName.should.be.equal("John");');
    result[3].should.be.equal('');
    result[4].should.be.equal('result.should.have.property("lastName");');
    result[5].should.be.equal('result.lastName.should.be.equal("Doe");');
    result[6].should.be.equal('');
    result[7].should.be.equal('result.should.have.property("manager");');
    result[8].should.be.equal('result.manager.should.be.a("object");');
    result[9].should.be.equal('result.manager.should.have.property("firstName");');
    result[10].should.be.equal('result.manager.firstName.should.be.equal("John");');
    result[11].should.be.equal('');
    result[12].should.be.equal('result.manager.should.have.property("lastName");');
    result[13].should.be.equal('result.manager.lastName.should.be.equal("Doe");');
    result[14].should.be.equal('');
  })

  it('should quote property name with double quote if it contains special character', () => {
    let result = generateSpec({ 'Content-Type': 'application/json' }, { quote: '"', style: 'should' })
    result.should.be.a('array');
    result.should.be.length(4);
    result[0].should.be.equal('result.should.be.a("object");');
    result[1].should.be.equal('result.should.have.property("Content-Type");');
    result[2].should.be.equal('result["Content-Type"].should.be.equal("application/json");');
    result[3].should.be.equal('');
  })

  it('should generate spec with double quote if an object with one of the property array is given', () => {
    let result = generateSpec({ names: ['John', 'Doe'] }, { quote: '"', style: 'should' })
    result.should.be.a('array');
    result.should.be.length(7);
    result[0].should.be.equal('result.should.be.a("object");');
    result[1].should.be.equal('result.should.have.property("names");');
    result[2].should.be.equal('result.names.should.be.a("array");');
    result[3].should.be.equal('result.names.should.be.length(2);');
    result[4].should.be.equal('result.names[0].should.be.equal("John");');
    result[5].should.be.equal('result.names[1].should.be.equal("Doe");');
    result[6].should.be.equal('');
  })

  it('should not quote the property value if it is not string', () => {
    let result = generateSpec({ age: 20, active: false }, { quote: '"', style: 'should' })
    result.should.be.a('array');
    result.should.be.length(7);
    result[0].should.be.equal('result.should.be.a("object");');
    result[1].should.be.equal('result.should.have.property("age");');
    result[2].should.be.equal('result.age.should.be.equal(20);');
    result[3].should.be.equal('');
    result[4].should.be.equal('result.should.have.property("active");');
    result[5].should.be.equal('result.active.should.be.equal(false);');
    result[6].should.be.equal('');
  })
})

describe('generateSpec in should style with semicolon false', () => {

  it('should generate spec without semicolon if given true', () => {
    let result = generateSpec(true, { semicolon: false, style: 'should' })
    result.should.be.a('array');
    result.should.be.length(1);
    result[0].should.be.equal('result.should.be.equal(true)');
  })

  it('should generate spec without semicolon if given false', () => {
    let result = generateSpec(false, { semicolon: false, style: 'should' })
    result.should.be.a('array');
    result.should.be.length(1);
    result[0].should.be.equal('result.should.be.equal(false)');
  })

  it('should generate spec without semicolon if given defined', () => {
    let result = generateSpec('defined', { special: true, semicolon: false, style: 'should' })
    result.should.be.a('array');
    result.should.be.length(1);
    result[0].should.be.equal('result.should.be.exist');
  })

  it('should generate spec for throw in es6 style and without semicolon', () => {
    let result = generateSpec('throw calc(1, true)', { style: 'should', special: true, semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('(() => calc(1, true)).should.to.throw()');
  })

  it('should generate spec for throw in es5 style and without semicolon', () => {
    let result = generateSpec('throw calc(1, true)', { style: 'should', special: true, es6: false, semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('(function() { calc(1, true) }).should.to.throw()');
  })

  it('should generate spec without semicolon if given undefined', () => {
    let result = generateSpec(undefined, { semicolon: false, style: 'should' })
    result.should.be.a('array');
    result.should.be.length(1);
    result[0].should.be.equal('result.should.be.undefined');
  })

  it('should generate spec without semicolon if given empty object', () => {
    let result = generateSpec({}, { semicolon: false, style: 'should' })
    result.should.be.a('array');
    result.should.be.length(1);
    result[0].should.be.equal('result.should.be.a(\'object\')');
  })

  it('should generate spec without semicolon if given empty array', () => {
    let result = generateSpec([], { semicolon: false, style: 'should' })
    result.should.be.a('array');
    result.should.be.length(3);
    result[0].should.be.equal('result.should.be.a(\'array\')');
    result[1].should.be.equal('result.should.be.empty');
  })

  it('should generate spec without semicolon if given array of strings', () => {
    let result = generateSpec(['a', 'b', 'c'], { semicolon: false, style: 'should' })
    result.should.be.a('array');
    result.should.be.length(6);
    result[0].should.be.equal('result.should.be.a(\'array\')');
    result[1].should.be.equal('result.should.be.length(3)');
    result[2].should.be.equal('result[0].should.be.equal(\'a\')');
    result[3].should.be.equal('result[1].should.be.equal(\'b\')');
    result[4].should.be.equal('result[2].should.be.equal(\'c\')');
  })

  it('should generate spec without semicolon if given an object', () => {
    let result = generateSpec({ firstName: 'John', lastName: 'Doe' }, { semicolon: false, style: 'should' })
    result.should.be.a('array');
    result.should.be.length(7);
    result[0].should.be.equal('result.should.be.a(\'object\')');
    result[1].should.be.equal('result.should.have.property(\'firstName\')');
    result[2].should.be.equal('result.firstName.should.be.equal(\'John\')');
    result[3].should.be.equal('');
    result[4].should.be.equal('result.should.have.property(\'lastName\')');
    result[5].should.be.equal('result.lastName.should.be.equal(\'Doe\')');
    result[6].should.be.equal('');
  })

  it('should generate spec without semicolon if given an array of objects', () => {
    let result = generateSpec([
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'John', lastName: 'Doe' }
    ], { semicolon: false, style: 'should' })

    result.should.be.a('array');
    result.should.be.length(16);
    result[0].should.be.equal('result.should.be.a(\'array\')');
    result[1].should.be.equal('result.should.be.length(2)');
    result[2].should.be.equal('result[0].should.be.a(\'object\')');
    result[3].should.be.equal('result[0].should.have.property(\'firstName\')');
    result[4].should.be.equal('result[0].firstName.should.be.equal(\'John\')');
    result[5].should.be.equal('');
    result[6].should.be.equal('result[0].should.have.property(\'lastName\')');
    result[7].should.be.equal('result[0].lastName.should.be.equal(\'Doe\')');
    result[8].should.be.equal('');
    result[9].should.be.equal('result[1].should.be.a(\'object\')');
    result[10].should.be.equal('result[1].should.have.property(\'firstName\')');
    result[11].should.be.equal('result[1].firstName.should.be.equal(\'John\')');
    result[12].should.be.equal('');
    result[13].should.be.equal('result[1].should.have.property(\'lastName\')');
    result[14].should.be.equal('result[1].lastName.should.be.equal(\'Doe\')');
    result[15].should.be.equal('');
  })

  it('should generate spec without semicolon if object with inner objects is given', () => {
    let result = generateSpec({
      firstName: 'John',
      lastName: 'Doe',
      manager: { firstName: 'John', lastName: 'Doe' }
    }, { semicolon: false, style: 'should' })
    result.should.be.a('array');
    result.should.be.length(15);
    result[0].should.be.equal('result.should.be.a(\'object\')');
    result[1].should.be.equal('result.should.have.property(\'firstName\')');
    result[2].should.be.equal('result.firstName.should.be.equal(\'John\')');
    result[3].should.be.equal('');
    result[4].should.be.equal('result.should.have.property(\'lastName\')');
    result[5].should.be.equal('result.lastName.should.be.equal(\'Doe\')');
    result[6].should.be.equal('');
    result[7].should.be.equal('result.should.have.property(\'manager\')');
    result[8].should.be.equal('result.manager.should.be.a(\'object\')');
    result[9].should.be.equal('result.manager.should.have.property(\'firstName\')');
    result[10].should.be.equal('result.manager.firstName.should.be.equal(\'John\')');
    result[11].should.be.equal('');
    result[12].should.be.equal('result.manager.should.have.property(\'lastName\')');
    result[13].should.be.equal('result.manager.lastName.should.be.equal(\'Doe\')');
    result[14].should.be.equal('');
  })

  it('should quote property name without semicolon if it contains special character', () => {
    let result = generateSpec({ 'Content-Type': 'application/json' }, { semicolon: false, style: 'should' })
    result.should.be.a('array');
    result.should.be.length(4);
    result[0].should.be.equal('result.should.be.a(\'object\')');
    result[1].should.be.equal('result.should.have.property(\'Content-Type\')');
    result[2].should.be.equal('result[\'Content-Type\'].should.be.equal(\'application/json\')');
    result[3].should.be.equal('');
  })

  it('should generate spec without semicolon if an object with one of the property array is given', () => {
    let result = generateSpec({ names: ['John', 'Doe'] }, { semicolon: false, style: 'should' })
    result.should.be.a('array');
    result.should.be.length(7);
    result[0].should.be.equal('result.should.be.a(\'object\')');
    result[1].should.be.equal('result.should.have.property(\'names\')');
    result[2].should.be.equal('result.names.should.be.a(\'array\')');
    result[3].should.be.equal('result.names.should.be.length(2)');
    result[4].should.be.equal('result.names[0].should.be.equal(\'John\')');
    result[5].should.be.equal('result.names[1].should.be.equal(\'Doe\')');
    result[6].should.be.equal('');
  })

})
