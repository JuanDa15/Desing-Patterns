import Singleton from './Singleton';

const a: Singleton = Singleton.getInstance();
const b: Singleton = Singleton.getInstance();

console.log(a === b);
console.log(a.randomAttribute);
console.log(b.randomAttribute);
console.log(a.randomAttribute === b.randomAttribute)
console.log(a.transformRandomAttribute('a instance'));
console.log(b.transformRandomAttribute('b instance'));