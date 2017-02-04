
function newLine(specs) {
  if (specs.slice(-1)[0] !== '') {
    specs.push('');
  }
}

export interface Options {
  variableName?: string
  specs?: string[]
  special?: boolean
  quote?: string
  semicolon?: boolean
  style?: string
  es6?: boolean
}

export function generateSpec(target: any, options?: Options) {
  options = Object.assign({
    variableName: 'result',
    specs: [],
    quote: '\'',
    semicolon: true,
    special: false,
    es6: true
  }, options)

  return generateSpecForChai(target, options)
}

function generateArrayCheck(style, source, q, s) {
  if (style === 'jasmine') {
    return `expect(${source} instanceof Array).toBeTruthy()${s}`
  } else if (style === 'should') {
    return `${source}.should.be.a(${q}array${q})${s}`
  }
  return `expect(${source}).be.a(${q}array${q})${s}`
}

function generateArrayLengthCheck(style, source, length, q, s) {
  if (style === 'jasmine') {
    return `expect(${source}.length).toEqual(${length})${s}`
  } else if (style === 'should') {
    return `${source}.should` + (length === 0 ? `.be.empty${s}` : `.be.length(${length})${s}`)
  }
  return `expect(${source})` + (length === 0 ? `.be.empty${s}` : `.be.length(${length})${s}`)
}

function generateObjectCheck(style, source, q, s) {
  if (style === 'jasmine') {
    return `expect(typeof ${source} === ${q}object${q} && !(${source} instanceof Array)).toBeTruthy()${s}`
  } else if (style === 'should') {
    return `${source}.should.be.a(${q}object${q})${s}`
  }
  return `expect(${source}).be.a(${q}object${q})${s}`
}

function generatePropertyCheck(style, source, value, q, s) {
  if (style === 'jasmine') {
    return `expect(Object.keys(${source})).toContain(${q}${value}${q})${s}`
  } else if (style === 'should') {
    return `${source}.should.have.property(${q}${value}${q})${s}`
  }
  return `expect(${source}).have.property(${q}${value}${q})${s}`
}

function generateDefinedCheck(style, source, value, q, s) {
  if (style === 'jasmine') {
    return `expect(${source}).toBeDefined()${s}`
  } else if (style === 'should') {
    return `${source}.should.be.exist${s}`
  }
  return `expect(${source}).be.exist${s}`
}

function generateUndefinedCheck(style, source, value, q, s) {
  if (style === 'jasmine') {
    return `expect(${source}).toBeUndefined()${s}`
  } else if (style === 'should') {
    return `${source}.should.be.undefined${s}`
  }
  return `expect(${source}).be.undefined${s}`
}

function generateEqualCheck(style, source, value, q, s) {
  if (style === 'jasmine') {
    if (value === null || typeof value === 'boolean') {
      return `expect(${source}).toBe(${value})${s}`
    } else if (typeof value === 'number' && !isNaN(value)) {
      return `expect(${source}).toEqual(${value})${s}`
    }
    return `expect(${source}).toEqual(${q}${value}${q})${s}`
  } else if (style === 'should') {
    if (value === null || typeof value === 'boolean') {
      return `${source}.should.be.equal(${value})${s}`
    } else if (typeof value === 'number' && !isNaN(value)) {
      return `${source}.should.be.equal(${value})${s}`
    }
    return `${source}.should.be.equal(${q}${value}${q})${s}`
  }

  if (value === null || typeof value === 'boolean') {
    return `expect(${source}).be.equal(${value})${s}`
  } else if (typeof value === 'number' && !isNaN(value)) {
    return `expect(${source}).be.equal(${value})${s}`
  }
  return `expect(${source}).be.equal(${q}${value}${q})${s}`
}

function generateThrowCheck(style, source, value, q, s, es6) {
  if (style === 'jasmine') {
    if (es6) {
      return `expect(() => ${value}).toThrow()${s}`
    } else {
      return `expect(function() { ${value.replace(/;\s*$/, '')}${s} }).toThrow()${s}`
    }
  } else if (style === 'should') {
    if (es6) {
      return `(() => ${value}).should.to.throw()${s}`
    } else {
      return `(function() { ${value.replace(/;\s*$/, '')}${s} }).should.to.throw()${s}`
    }
  }

  if (es6) {
    return `expect(() => ${value}).to.throw()${s}`
  } else {
    return `expect(function() { ${value.replace(/;\s*$/, '')}${s} }).to.throw()${s}`
  }
}

function generateSpecForChai(target: any, options: Options) {
  const q = options.quote;
  const s = options.semicolon ? ';' : ''
  const style = options.style

  if (options.special) {
    if (target === 'defined') {
      return [generateDefinedCheck(style, options.variableName, target.length, q, s)]
    } else if (/^throw .+/.test(target)) {
      return [generateThrowCheck(style, options.variableName, target.replace(/^throw /, ''), q, s, options.es6)]
    }
    return []
  }

  if (target instanceof Array) {
    options.specs.push(generateArrayCheck(style, options.variableName, q, s))
    options.specs.push(generateArrayLengthCheck(style, options.variableName, target.length, q, s))
    target.map(function (item, index) {
      generateSpecForChai(item, Object.assign({}, options, {
        variableName: `${options.variableName}[${index}]`
      }));
    });
    newLine(options.specs);

  } else if (typeof target === 'object') {
    options.specs.push(generateObjectCheck(style, options.variableName, q, s))
    Object.keys(target).map(function (key) {
      options.specs.push(generatePropertyCheck(style, options.variableName, key, q, s))
      let keyRef = /^[a-zA-Z0-9_]+$/g.test(key) ? `.${key}` : `[${q}${key}${q}]`;
      let variableName = `${options.variableName}${keyRef}`;
      if (target[key] instanceof Array) {
        generateSpecForChai(target[key], Object.assign({}, options, { variableName: variableName }));
      } else if (typeof target[key] === 'object') {
        generateSpecForChai(target[key], Object.assign({}, options, { variableName: variableName }));
      } else {
        options.specs.push(generateEqualCheck(style, variableName, target[key], q, s))
      }
      newLine(options.specs);
    });

  } else if (target == undefined) {
    options.specs.push(generateUndefinedCheck(style, options.variableName, target, q, s))
  } else {
    options.specs.push(generateEqualCheck(style, options.variableName, target, q, s))
  }

  return options.specs;
}
