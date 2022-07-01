import Singleton from './Singleton';

const a: Singleton = Singleton.getInstance();
const b: Singleton = Singleton.getInstance();

console.log(a === b);