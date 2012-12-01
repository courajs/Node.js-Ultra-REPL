var bindbind  = Function.prototype.bind.bind(Function.prototype.bind),
    callbind  = bindbind(Function.prototype.call),
    applybind = bindbind(Function.prototype.apply),
    slice     = callbind(Array.prototype.slice),
    has       = callbind(Object.prototype.hasOwnProperty),
    toString  = callbind(Object.prototype.toString);

module.exports = {
  heritable: heritable,
  descriptor: descriptor,
  callbind: callbind,
  applybind: applybind,
  lazyProperty: lazyProperty,
  is: is
};

var props    = Object.getOwnPropertyNames,
    define   = Object.defineProperty,
    describe = Object.getOwnPropertyDescriptor,
    proto    = Object.getPrototypeOf,
    create   = Object.create,
    keys     = Object.keys;



function is(compare){
  if (typeof compare === 'string') {
    compare = '[object ' + compare + ']';
  } else {
    compare = toString(compare);
  }
  if (compare in is) return is[compare];
  return is[compare] = function(o){
    return toString(o) === compare;
  }
}

function clone(o){
  var names = props(o);
  return create(proto(o), names.map(describe.bind(null, o)).reduce(function(r,d,i){ r[names[i]] = d; return r; }, {}));
}

function descriptor(val, h, r){
  var desc = { enumerable: !h, configurable: true };
  if (Array.isArray(val) && val.length === 2 &&
       typeof val[0] === 'function' &&
       typeof val[1] === 'function') {
    desc.get = val[0];
    desc.set = val[1];
  } else if (typeof val === 'function' && /^[gs]etter$/.test(val.name)) {
    desc[val.name[0]+'et'] = val;
  } else {
    desc.value = val;
    desc.writable = !r;
  }
  return desc;
}

function heritable(definition){
  var ctor = definition.constructor;
  define(ctor, 'super', {
    value: definition.super,
    configurable: true,
    writable: true
  });
  ctor.prototype = create(ctor.super.prototype);
  delete definition.super;

  keys(definition).forEach(function(prop){
    var desc = describe(definition, prop);
    desc.enumerable = false;
    define(ctor.prototype, prop, desc);
  });

  function construct(){
    var obj = new (ctor.bind.apply(ctor, [null].concat(slice(arguments))));
    ctor.super.call(obj);
    return obj;
  }

  construct.prototype = ctor.prototype;

  return construct;
}


function lazyProperty(obj, name){
  if (Array.isArray(name)) {
    name.forEach(function(prop){ lazyProperty(obj, prop) });
    return obj;
  }
  var visible = name[0] === '$';
  name = visible ? name.slice(1) : name;
  define(obj, name, {
    configurable: true,
    enumerable: visible,
    get: function(){},
    set: function(v){ define(this, name, { value: v, writable: true }) }
  });
}

var hidden = { configurable: true, writable: true };
function defineHidden(o, n, v){
  hidden.value = v;
  define(o, n, v);
  hidden.value = null;
}


function extend(to, from){
  props(Object(from)).forEach(function(key){
    if (!has(to, key)) {
      define(to, key, describe(from, key));
    }
  });
  return to;
}
Object.extend = extend;


Object.inherit = function inherit(from, props){
  return extend(create(from), props);
}

Function.inherit = function inherit(superctor, ctor, props){
  ctor.prototype = Object.inherit(superctor.prototype, props);
  defineHidden(ctor.prototype, 'constructor', ctor);
  return ctor.prototype;
}
