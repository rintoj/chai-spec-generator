
function newLine(specs) {
  if (specs.slice(-1)[0] !== '') {
    specs.push('');
  }
}

interface Options {
  context?: string
  specs?: string[]
  special?: boolean
  quote?: string
  semicolon?: boolean
  style?: string
  es6?: boolean
}

export function generateSpec(target: any, options?: Options) {
  options = Object.assign({
    context: 'result',
    specs: [],
    quote: '\'',
    semicolon: true,
    special: false
  }, options)

  return generateSpecForChai(target, options)
}

function generateArrayCheck(style, source, q, s) {
  if (style === 'jasmine') {
    return `expect(${source} instanceof Array).toBeTruthy()${s}`
  }
  return `expect(${source}).be.a(${q}array${q})${s}`
}

function generateArrayLengthCheck(style, source, length, q, s) {
  if (style === 'jasmine') {
    return `expect(${source}.length).toEqual(${length})${s}`
  }
  return `expect(${source})` + (length === 0 ? `.be.empty${s}` : `.be.length(${length})${s}`)
}

function generateObjectCheck(style, source, q, s) {
  if (style === 'jasmine') {
    return `expect(typeof ${source} === ${q}object${q} && !(${source} instanceof Array)).toBeTruthy()${s}`
  }
  return `expect(${source}).be.a(${q}object${q})${s}`
}

function generatePropertyCheck(style, source, value, q, s) {
  if (style === 'jasmine') {
    return `expect(Object.keys(${source})).toContain(${q}${value}${q})${s}`
  }
  return `expect(${source}).have.property(${q}${value}${q})${s}`
}

function generateDefinedCheck(style, source, value, q, s) {
  if (style === 'jasmine') {
    return `expect(${source}).toBeDefined()${s}`
  }
  return `expect(${source}).be.exist${s}`
}

function generateUndefinedCheck(style, source, value, q, s) {
  if (style === 'jasmine') {
    return `expect(${source}).toBeUndefined()${s}`
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
  }
  if (value === null || typeof value === 'boolean') {
    return `expect(${source}).be.equal(${value})${s}`
  } else if (typeof value === 'number' && !isNaN(value)) {
    return `expect(${source}).be.equal(${value})${s}`
  }
  return `expect(${source}).be.equal(${q}${value}${q})${s}`
}

function generateSpecForChai(target: any, options: Options) {
  const q = options.quote;
  const s = options.semicolon ? ';' : ''
  const style = options.style

  if (options.special) {
    if (target === 'defined') {
      return [generateDefinedCheck(style, options.context, target.length, q, s)]
    }
    return []
  }

  if (target instanceof Array) {
    options.specs.push(generateArrayCheck(style, options.context, q, s))
    options.specs.push(generateArrayLengthCheck(style, options.context, target.length, q, s))
    target.map(function (item, index) {
      generateSpecForChai(item, Object.assign({}, options, {
        context: `${options.context}[${index}]`
      }));
    });
    newLine(options.specs);

  } else if (typeof target === 'object') {
    options.specs.push(generateObjectCheck(style, options.context, q, s))
    Object.keys(target).map(function (key) {
      options.specs.push(generatePropertyCheck(style, options.context, key, q, s))
      let keyRef = /^[a-zA-Z0-9_]+$/g.test(key) ? `.${key}` : `[${q}${key}${q}]`;
      let contextRef = `${options.context}${keyRef}`;
      if (target[key] instanceof Array) {
        generateSpecForChai(target[key], Object.assign({}, options, { context: contextRef }));
      } else if (typeof target[key] === 'object') {
        generateSpecForChai(target[key], Object.assign({}, options, { context: contextRef }));
      } else {
        options.specs.push(generateEqualCheck(style, contextRef, target[key], q, s))
      }
      newLine(options.specs);
    });

  } else if (target == undefined) {
    options.specs.push(generateUndefinedCheck(style, options.context, target, q, s))
  } else {
    options.specs.push(generateEqualCheck(style, options.context, target, q, s))
  }

  return options.specs;
}
