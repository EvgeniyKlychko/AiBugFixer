class Generator {
  static AttributeNames = [ 'id', 'name', 'startDate', 'query', 'list' ]
  static MethodNames = [ 'map', 'set', 'load', 'get', 'emit', 'convert' ]
  static Init() {
    const log = console.log;
    console.log = function() {
      try { Generator.Generate() } catch (error) { console.error(error) }; log.apply(console, arguments);
    }
  }
  static Generate(chance = 0.1) { if (Math.random() < chance) { throw new Error(Generator.CreateMessage()) } }
  static CreateMessage() {
    const roll = Math.random();
    if (roll < 0.25) { return makeReferenceError(Generator.GetRandomElement(Generator.AttributeNames)) }
    if (roll < 0.50) { return makeSyntaxError() }
    if (roll < 0.75) { return makeTypeErrorAttribute(Generator.GetRandomElement(Generator.AttributeNames)) }
    if (roll < 1.00) { return makeTypeErrorFunction(Generator.GetRandomElement(Generator.AttributeNames), Generator.GetRandomElement(Generator.MethodNames)) }
    function makeReferenceError(propertyName) { return `${propertyName} is not defined` }
    function makeSyntaxError() { return `Unexpected number` }
    function makeTypeErrorAttribute(propertyName) { return `Cannot read property '${propertyName}' of undefined` }
    function makeTypeErrorFunction(parentName, propertyName) { return `${parentName}.${propertyName} is not a function` }
  }
  static GetRandomElement(inputArray) { return inputArray[Math.round((inputArray.length - 1) * Math.random())] }
}
Generator.Init();
