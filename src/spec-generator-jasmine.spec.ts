import { expect } from 'chai'
import { generateSpec } from './spec-generator'

describe('generateSpec in jasmine style', () => {

  it('should generate spec if given true', () => {
    let result = generateSpec(true, { style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(result).toBe(true);');
  })

  it('should generate spec if given false', () => {
    let result = generateSpec(false, { style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(result).toBe(false);');
  })

  it('should generate spec if given defined', () => {
    let result = generateSpec('defined', { special: true, style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(result).toBeDefined();');
  })

  it('should generate spec for throw in es6 style', () => {
    let result = generateSpec('throw calc(1, true)', { style: 'jasmine', special: true })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(() => calc(1, true)).toThrow();');
  })

  it('should generate spec for throw in es5 style', () => {
    let result = generateSpec('throw calc(1, true)', { style: 'jasmine', special: true, es6: false })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(function() { calc(1, true); }).toThrow();');
  })

  it('should generate spec if given undefined', () => {
    let result = generateSpec(undefined, { style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(result).toBeUndefined();');
  })

  it('should generate spec if given empty object', () => {
    let result = generateSpec({}, { style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(typeof result === \'object\' && !(result instanceof Array)).toBeTruthy();');
  })

  it('should generate spec if given empty array', () => {
    let result = generateSpec([], { style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.length(3);
    expect(result[0]).be.equal('expect(result instanceof Array).toBeTruthy();');
    expect(result[1]).be.equal('expect(result.length).toEqual(0);');
  })

  it('should generate spec if given array of strings', () => {
    let result = generateSpec(['a', 'b', 'c'], { style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.length(6);
    expect(result[0]).be.equal('expect(result instanceof Array).toBeTruthy();');
    expect(result[1]).be.equal('expect(result.length).toEqual(3);');
    expect(result[2]).be.equal('expect(result[0]).toEqual(\'a\');');
    expect(result[3]).be.equal('expect(result[1]).toEqual(\'b\');');
    expect(result[4]).be.equal('expect(result[2]).toEqual(\'c\');');
  })

  it('should generate spec if given an object', () => {
    let result = generateSpec({ firstName: 'John', lastName: 'Doe' }, { style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.length(7);
    expect(result[0]).be.equal('expect(typeof result === \'object\' && !(result instanceof Array)).toBeTruthy();');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain(\'firstName\');');
    expect(result[2]).be.equal('expect(result.firstName).toEqual(\'John\');');
    expect(result[3]).be.equal('');
    expect(result[4]).be.equal('expect(Object.keys(result)).toContain(\'lastName\');');
    expect(result[5]).be.equal('expect(result.lastName).toEqual(\'Doe\');');
    expect(result[6]).be.equal('');
  })

  it('should generate spec if given an array of objects', () => {
    let result = generateSpec([
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'John', lastName: 'Doe' }
    ], { style: 'jasmine' })

    expect(result).be.a('array');
    expect(result).be.length(16);
    expect(result[0]).be.equal('expect(result instanceof Array).toBeTruthy();');
    expect(result[1]).be.equal('expect(result.length).toEqual(2);');
    expect(result[2]).be.equal('expect(typeof result[0] === \'object\' && !(result[0] instanceof Array)).toBeTruthy();');
    expect(result[3]).be.equal('expect(Object.keys(result[0])).toContain(\'firstName\');');
    expect(result[4]).be.equal('expect(result[0].firstName).toEqual(\'John\');');
    expect(result[5]).be.equal('');
    expect(result[6]).be.equal('expect(Object.keys(result[0])).toContain(\'lastName\');');
    expect(result[7]).be.equal('expect(result[0].lastName).toEqual(\'Doe\');');
    expect(result[8]).be.equal('');
    expect(result[9]).be.equal('expect(typeof result[1] === \'object\' && !(result[1] instanceof Array)).toBeTruthy();');
    expect(result[10]).be.equal('expect(Object.keys(result[1])).toContain(\'firstName\');');
    expect(result[11]).be.equal('expect(result[1].firstName).toEqual(\'John\');');
    expect(result[12]).be.equal('');
    expect(result[13]).be.equal('expect(Object.keys(result[1])).toContain(\'lastName\');');
    expect(result[14]).be.equal('expect(result[1].lastName).toEqual(\'Doe\');');
    expect(result[15]).be.equal('');
  })

  it('should generate spec if object with inner objects is given', () => {
    let result = generateSpec({
      firstName: 'John',
      lastName: 'Doe',
      manager: { firstName: 'John', lastName: 'Doe' }
    }, { style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.length(15);
    expect(result[0]).be.equal('expect(typeof result === \'object\' && !(result instanceof Array)).toBeTruthy();');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain(\'firstName\');');
    expect(result[2]).be.equal('expect(result.firstName).toEqual(\'John\');');
    expect(result[3]).be.equal('');
    expect(result[4]).be.equal('expect(Object.keys(result)).toContain(\'lastName\');');
    expect(result[5]).be.equal('expect(result.lastName).toEqual(\'Doe\');');
    expect(result[6]).be.equal('');
    expect(result[7]).be.equal('expect(Object.keys(result)).toContain(\'manager\');');
    expect(result[8]).be.equal('expect(typeof result.manager === \'object\' && !(result.manager instanceof Array)).toBeTruthy();');
    expect(result[9]).be.equal('expect(Object.keys(result.manager)).toContain(\'firstName\');');
    expect(result[10]).be.equal('expect(result.manager.firstName).toEqual(\'John\');');
    expect(result[11]).be.equal('');
    expect(result[12]).be.equal('expect(Object.keys(result.manager)).toContain(\'lastName\');');
    expect(result[13]).be.equal('expect(result.manager.lastName).toEqual(\'Doe\');');
    expect(result[14]).be.equal('');
  })

  it('should return an empty array if an invalid special string is given', () => {
    let result = generateSpec('invalid-string', { special: true, style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.empty;
  })

  it('should quote property name if it contains special character', () => {
    let result = generateSpec({ 'Content-Type': 'application/json' }, { style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.length(4);
    expect(result[0]).be.equal('expect(typeof result === \'object\' && !(result instanceof Array)).toBeTruthy();');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain(\'Content-Type\');');
    expect(result[2]).be.equal('expect(result[\'Content-Type\']).toEqual(\'application/json\');');
    expect(result[3]).be.equal('');
  })

  it('should generate spec if an object with one of the property array is given', () => {
    let result = generateSpec({ names: ['John', 'Doe'] }, { style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.length(7);
    expect(result[0]).be.equal('expect(typeof result === \'object\' && !(result instanceof Array)).toBeTruthy();');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain(\'names\');');
    expect(result[2]).be.equal('expect(result.names instanceof Array).toBeTruthy();');
    expect(result[3]).be.equal('expect(result.names.length).toEqual(2);');
    expect(result[4]).be.equal('expect(result.names[0]).toEqual(\'John\');');
    expect(result[5]).be.equal('expect(result.names[1]).toEqual(\'Doe\');');
    expect(result[6]).be.equal('');
  })

  it('should not quote the property value if it is not string', () => {
    let result = generateSpec({ age: 20, active: false }, { style: 'jasmine' })
    expect(result).be.a('array');
    expect(result).be.length(7);
    expect(result[0]).be.equal('expect(typeof result === \'object\' && !(result instanceof Array)).toBeTruthy();');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain(\'age\');');
    expect(result[2]).be.equal('expect(result.age).toEqual(20);');
    expect(result[3]).be.equal('');
    expect(result[4]).be.equal('expect(Object.keys(result)).toContain(\'active\');');
    expect(result[5]).be.equal('expect(result.active).toBe(false);');
    expect(result[6]).be.equal('');
  })

})

describe('generateSpec in jasmine style with options semicolon = false', () => {

  it('should generate spec without semicolon if given true', () => {
    let result = generateSpec(true, { style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(result).toBe(true)');
  })

  it('should generate spec without semicolon if given false', () => {
    let result = generateSpec(false, { style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(result).toBe(false)');
  })

  it('should generate spec without semicolon if given defined', () => {
    let result = generateSpec('defined', { special: true, style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(result).toBeDefined()');
  })

  it('should generate spec for throw in es6 style and without semicolon', () => {
    let result = generateSpec('throw calc(1, true)', { style: 'jasmine', special: true, semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(() => calc(1, true)).toThrow()');
  })

  it('should generate spec for throw in es5 style and without semicolon', () => {
    let result = generateSpec('throw calc(1, true)', { style: 'jasmine', special: true, es6: false, semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(function() { calc(1, true) }).toThrow()');
  })

  it('should generate spec without semicolon if given undefined', () => {
    let result = generateSpec(undefined, { style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(result).toBeUndefined()');
  })

  it('should generate spec without semicolon if given empty object', () => {
    let result = generateSpec({}, { style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(typeof result === \'object\' && !(result instanceof Array)).toBeTruthy()');
  })

  it('should generate spec without semicolon if given empty array', () => {
    let result = generateSpec([], { style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(3);
    expect(result[0]).be.equal('expect(result instanceof Array).toBeTruthy()');
    expect(result[1]).be.equal('expect(result.length).toEqual(0)');
  })

  it('should generate spec without semicolon if given array of strings', () => {
    let result = generateSpec(['a', 'b', 'c'], { style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(6);
    expect(result[0]).be.equal('expect(result instanceof Array).toBeTruthy()');
    expect(result[1]).be.equal('expect(result.length).toEqual(3)');
    expect(result[2]).be.equal('expect(result[0]).toEqual(\'a\')');
    expect(result[3]).be.equal('expect(result[1]).toEqual(\'b\')');
    expect(result[4]).be.equal('expect(result[2]).toEqual(\'c\')');
  })

  it('should generate spec without semicolon if given an object', () => {
    let result = generateSpec({ firstName: 'John', lastName: 'Doe' }, { style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(7);
    expect(result[0]).be.equal('expect(typeof result === \'object\' && !(result instanceof Array)).toBeTruthy()');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain(\'firstName\')');
    expect(result[2]).be.equal('expect(result.firstName).toEqual(\'John\')');
    expect(result[3]).be.equal('');
    expect(result[4]).be.equal('expect(Object.keys(result)).toContain(\'lastName\')');
    expect(result[5]).be.equal('expect(result.lastName).toEqual(\'Doe\')');
    expect(result[6]).be.equal('');
  })

  it('should generate spec without semicolon if given an array of objects', () => {
    let result = generateSpec([
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'John', lastName: 'Doe' }
    ], { style: 'jasmine', semicolon: false })

    expect(result).be.a('array');
    expect(result).be.length(16);
    expect(result[0]).be.equal('expect(result instanceof Array).toBeTruthy()');
    expect(result[1]).be.equal('expect(result.length).toEqual(2)');
    expect(result[2]).be.equal('expect(typeof result[0] === \'object\' && !(result[0] instanceof Array)).toBeTruthy()');
    expect(result[3]).be.equal('expect(Object.keys(result[0])).toContain(\'firstName\')');
    expect(result[4]).be.equal('expect(result[0].firstName).toEqual(\'John\')');
    expect(result[5]).be.equal('');
    expect(result[6]).be.equal('expect(Object.keys(result[0])).toContain(\'lastName\')');
    expect(result[7]).be.equal('expect(result[0].lastName).toEqual(\'Doe\')');
    expect(result[8]).be.equal('');
    expect(result[9]).be.equal('expect(typeof result[1] === \'object\' && !(result[1] instanceof Array)).toBeTruthy()');
    expect(result[10]).be.equal('expect(Object.keys(result[1])).toContain(\'firstName\')');
    expect(result[11]).be.equal('expect(result[1].firstName).toEqual(\'John\')');
    expect(result[12]).be.equal('');
    expect(result[13]).be.equal('expect(Object.keys(result[1])).toContain(\'lastName\')');
    expect(result[14]).be.equal('expect(result[1].lastName).toEqual(\'Doe\')');
    expect(result[15]).be.equal('');
  })

  it('should generate spec without semicolon if object with inner objects is given', () => {
    let result = generateSpec({
      firstName: 'John',
      lastName: 'Doe',
      manager: { firstName: 'John', lastName: 'Doe' }
    }, { style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(15);
    expect(result[0]).be.equal('expect(typeof result === \'object\' && !(result instanceof Array)).toBeTruthy()');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain(\'firstName\')');
    expect(result[2]).be.equal('expect(result.firstName).toEqual(\'John\')');
    expect(result[3]).be.equal('');
    expect(result[4]).be.equal('expect(Object.keys(result)).toContain(\'lastName\')');
    expect(result[5]).be.equal('expect(result.lastName).toEqual(\'Doe\')');
    expect(result[6]).be.equal('');
    expect(result[7]).be.equal('expect(Object.keys(result)).toContain(\'manager\')');
    expect(result[8]).be.equal('expect(typeof result.manager === \'object\' && !(result.manager instanceof Array)).toBeTruthy()');
    expect(result[9]).be.equal('expect(Object.keys(result.manager)).toContain(\'firstName\')');
    expect(result[10]).be.equal('expect(result.manager.firstName).toEqual(\'John\')');
    expect(result[11]).be.equal('');
    expect(result[12]).be.equal('expect(Object.keys(result.manager)).toContain(\'lastName\')');
    expect(result[13]).be.equal('expect(result.manager.lastName).toEqual(\'Doe\')');
    expect(result[14]).be.equal('');
  })

  it('should return an empty array without semicolon if an invalid special string is given', () => {
    let result = generateSpec('invalid-string', { special: true, style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.empty;
  })

  it('should quote property name without semicolon if it contains special character', () => {
    let result = generateSpec({ 'Content-Type': 'application/json' }, { style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(4);
    expect(result[0]).be.equal('expect(typeof result === \'object\' && !(result instanceof Array)).toBeTruthy()');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain(\'Content-Type\')');
    expect(result[2]).be.equal('expect(result[\'Content-Type\']).toEqual(\'application/json\')');
    expect(result[3]).be.equal('');
  })

  it('should generate spec without semicolon if an object with one of the property array is given', () => {
    let result = generateSpec({ names: ['John', 'Doe'] }, { style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(7);
    expect(result[0]).be.equal('expect(typeof result === \'object\' && !(result instanceof Array)).toBeTruthy()');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain(\'names\')');
    expect(result[2]).be.equal('expect(result.names instanceof Array).toBeTruthy()');
    expect(result[3]).be.equal('expect(result.names.length).toEqual(2)');
    expect(result[4]).be.equal('expect(result.names[0]).toEqual(\'John\')');
    expect(result[5]).be.equal('expect(result.names[1]).toEqual(\'Doe\')');
    expect(result[6]).be.equal('');
  })

  it('should not quote the property value without semicolon if it is not string', () => {
    let result = generateSpec({ age: 20, active: false }, { style: 'jasmine', semicolon: false })
    expect(result).be.a('array');
    expect(result).be.length(7);
    expect(result[0]).be.equal('expect(typeof result === \'object\' && !(result instanceof Array)).toBeTruthy()');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain(\'age\')');
    expect(result[2]).be.equal('expect(result.age).toEqual(20)');
    expect(result[3]).be.equal('');
    expect(result[4]).be.equal('expect(Object.keys(result)).toContain(\'active\')');
    expect(result[5]).be.equal('expect(result.active).toBe(false)');
    expect(result[6]).be.equal('');
  })

})

describe('generateSpec in jasmine style with double quote', () => {

  it('should generate spec with double quote if given true', () => {
    let result = generateSpec(true, { style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(result).toBe(true);');
  })

  it('should generate spec with double quote if given false', () => {
    let result = generateSpec(false, { style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(result).toBe(false);');
  })

  it('should generate spec with double quote if given defined', () => {
    let result = generateSpec('defined', { special: true, style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(result).toBeDefined();');
  })

  it('should generate spec with double quote if given undefined', () => {
    let result = generateSpec(undefined, { style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(result).toBeUndefined();');
  })

  it('should generate spec with double quote if given empty object', () => {
    let result = generateSpec({}, { style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.length(1);
    expect(result[0]).be.equal('expect(typeof result === "object" && !(result instanceof Array)).toBeTruthy();');
  })

  it('should generate spec with double quote if given empty array', () => {
    let result = generateSpec([], { style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.length(3);
    expect(result[0]).be.equal('expect(result instanceof Array).toBeTruthy();');
    expect(result[1]).be.equal('expect(result.length).toEqual(0);');
  })

  it('should generate spec with double quote if given array of strings', () => {
    let result = generateSpec(['a', 'b', 'c'], { style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.length(6);
    expect(result[0]).be.equal('expect(result instanceof Array).toBeTruthy();');
    expect(result[1]).be.equal('expect(result.length).toEqual(3);');
    expect(result[2]).be.equal('expect(result[0]).toEqual("a");');
    expect(result[3]).be.equal('expect(result[1]).toEqual("b");');
    expect(result[4]).be.equal('expect(result[2]).toEqual("c");');
  })

  it('should generate spec with double quote if given an object', () => {
    let result = generateSpec({ firstName: 'John', lastName: 'Doe' }, { style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.length(7);
    expect(result[0]).be.equal('expect(typeof result === "object" && !(result instanceof Array)).toBeTruthy();');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain("firstName");');
    expect(result[2]).be.equal('expect(result.firstName).toEqual("John");');
    expect(result[3]).be.equal('');
    expect(result[4]).be.equal('expect(Object.keys(result)).toContain("lastName");');
    expect(result[5]).be.equal('expect(result.lastName).toEqual("Doe");');
    expect(result[6]).be.equal('');
  })

  it('should generate spec with double quote if given an array of objects', () => {
    let result = generateSpec([
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'John', lastName: 'Doe' }
    ], { style: 'jasmine', quote: '"' })

    expect(result).be.a('array');
    expect(result).be.length(16);
    expect(result[0]).be.equal('expect(result instanceof Array).toBeTruthy();');
    expect(result[1]).be.equal('expect(result.length).toEqual(2);');
    expect(result[2]).be.equal('expect(typeof result[0] === "object" && !(result[0] instanceof Array)).toBeTruthy();');
    expect(result[3]).be.equal('expect(Object.keys(result[0])).toContain("firstName");');
    expect(result[4]).be.equal('expect(result[0].firstName).toEqual("John");');
    expect(result[5]).be.equal('');
    expect(result[6]).be.equal('expect(Object.keys(result[0])).toContain("lastName");');
    expect(result[7]).be.equal('expect(result[0].lastName).toEqual("Doe");');
    expect(result[8]).be.equal('');
    expect(result[9]).be.equal('expect(typeof result[1] === "object" && !(result[1] instanceof Array)).toBeTruthy();');
    expect(result[10]).be.equal('expect(Object.keys(result[1])).toContain("firstName");');
    expect(result[11]).be.equal('expect(result[1].firstName).toEqual("John");');
    expect(result[12]).be.equal('');
    expect(result[13]).be.equal('expect(Object.keys(result[1])).toContain("lastName");');
    expect(result[14]).be.equal('expect(result[1].lastName).toEqual("Doe");');
    expect(result[15]).be.equal('');
  })

  it('should generate spec with double quote if object with inner objects is given', () => {
    let result = generateSpec({
      firstName: 'John',
      lastName: 'Doe',
      manager: { firstName: 'John', lastName: 'Doe' }
    }, { style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.length(15);
    expect(result[0]).be.equal('expect(typeof result === "object" && !(result instanceof Array)).toBeTruthy();');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain("firstName");');
    expect(result[2]).be.equal('expect(result.firstName).toEqual("John");');
    expect(result[3]).be.equal('');
    expect(result[4]).be.equal('expect(Object.keys(result)).toContain("lastName");');
    expect(result[5]).be.equal('expect(result.lastName).toEqual("Doe");');
    expect(result[6]).be.equal('');
    expect(result[7]).be.equal('expect(Object.keys(result)).toContain("manager");');
    expect(result[8]).be.equal('expect(typeof result.manager === "object" && !(result.manager instanceof Array)).toBeTruthy();');
    expect(result[9]).be.equal('expect(Object.keys(result.manager)).toContain("firstName");');
    expect(result[10]).be.equal('expect(result.manager.firstName).toEqual("John");');
    expect(result[11]).be.equal('');
    expect(result[12]).be.equal('expect(Object.keys(result.manager)).toContain("lastName");');
    expect(result[13]).be.equal('expect(result.manager.lastName).toEqual("Doe");');
    expect(result[14]).be.equal('');
  })

  it('should return an empty array with double quote if an invalid special string is given', () => {
    let result = generateSpec('invalid-string', { special: true, style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.empty;
  })

  it('should quote property name with double quote if it contains special character', () => {
    let result = generateSpec({ 'Content-Type': 'application/json' }, { style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.length(4);
    expect(result[0]).be.equal('expect(typeof result === "object" && !(result instanceof Array)).toBeTruthy();');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain("Content-Type");');
    expect(result[2]).be.equal('expect(result["Content-Type"]).toEqual("application/json");');
    expect(result[3]).be.equal('');
  })

  it('should generate spec with double quote if an object with one of the property array is given', () => {
    let result = generateSpec({ names: ['John', 'Doe'] }, { style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.length(7);
    expect(result[0]).be.equal('expect(typeof result === "object" && !(result instanceof Array)).toBeTruthy();');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain("names");');
    expect(result[2]).be.equal('expect(result.names instanceof Array).toBeTruthy();');
    expect(result[3]).be.equal('expect(result.names.length).toEqual(2);');
    expect(result[4]).be.equal('expect(result.names[0]).toEqual("John");');
    expect(result[5]).be.equal('expect(result.names[1]).toEqual("Doe");');
    expect(result[6]).be.equal('');
  })

  it('should not quote the property value with double quote if it is not string', () => {
    let result = generateSpec({ age: 20, active: false }, { style: 'jasmine', quote: '"' })
    expect(result).be.a('array');
    expect(result).be.length(7);
    expect(result[0]).be.equal('expect(typeof result === "object" && !(result instanceof Array)).toBeTruthy();');
    expect(result[1]).be.equal('expect(Object.keys(result)).toContain("age");');
    expect(result[2]).be.equal('expect(result.age).toEqual(20);');
    expect(result[3]).be.equal('');
    expect(result[4]).be.equal('expect(Object.keys(result)).toContain("active");');
    expect(result[5]).be.equal('expect(result.active).toBe(false);');
    expect(result[6]).be.equal('');
  })

})
