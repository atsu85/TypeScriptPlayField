///////////////////////////////////////////////////////////////
// Type inference without type annotations
// compile-time errors when accessing missing field/function or using unsupported operation
///////////////////////////////////////////////////////////////
var a = 123; // type info is optional: inferred type is number
//var a = "123"; // type info is optional: inferred type is string
a = new Date().getDay() // type info is optional: inferred type is number
// var len = a.length; /// ERROR: Property 'length' does not exist on type 'number'.
//a.trim(); // ERROR: The property ‘trim’ does not exist on value of type ‘number’
var twice = a * a; // ERROR: The left-hand side of an arithmetic operation must be of type 'any', 'number' or an enum type.



///////////////////////////////////////////////////////////////
// Named and structural OBJECT types:
///////////////////////////////////////////////////////////////
/**
 * This is named type that is structurally equal to following:
 * {name: string; getAge(): number}
 */
interface IPerson {
	/** public field containing person name */
	name: string;
	/** function that returns age of the person */
	getAge(): number;
}

/** both lines have structurally same type despite diferences in signature */
function useNamedType(person: {name: string; getAge(): number}){
//function useNamedType(person: IPerson){
	return person.name + "("+person.getAge()+")"
}

var person = {name: "Ats", getAge: function() {return 29}};
	person = {name: "Ats", getAge: () => {return 29}}; // same thing, but shorter (and in some cases safer that avoids supprises)
// passing object as an argument that structurally matches correct argument type
useNamedType(person);


///////////////////////////////////////////////////////////////
// Named and structural CLASS types
///////////////////////////////////////////////////////////////
class Person implements IPerson {
	constructor(public name: string, private yearOfBirth: number, public genderIsMale = true, private hobby?: string){
	}
	
	getAge() { // return type inferred
		return new Date().getFullYear() - this.yearOfBirth; // silly demo
	}
	
	t(prefix: string) {
		// return () => {
		return function() {
			alert(prefix + "name:" + this.name);
		}
	}
	
}

var personC = new Person("Ats", 1985);
person = personC;
useNamedType(person);


///////////////////////////////////////////////////////////////
// Default and optional method/constructor parameters
///////////////////////////////////////////////////////////////
alert("genderIsMale?"+personC.genderIsMale);



///////////////////////////////////////////////////////////////
// Arrow function aka Lambda
///////////////////////////////////////////////////////////////
var w = personC;
w.t("f")(); // what does it do?



///////////////////////////////////////////////////////////////
// Named and Structural FUNCTION types
///////////////////////////////////////////////////////////////
/**
 * This is named FUNCTION type that is structurally equal to type of following function:
 * function(arg1: string, arg2: string[]): string {}
 */
interface IFun {
	(elem: string, elems: string[]): string;
}

/** anonymous function assigned to variable */
//var anonymousFunction: (elem: string, elems: string[]) => string =
//	(elem, elems) => { // lambda syntax for function ~same, but shorter than:
var anonymousFunction: IFun =
	function(elem, elems) {
        return "some string";
    }

//function usesFunction(fun: (elem: string, elems: string[]) => string){
function usesFunction(fun: IFun) {
    return fun("arg1", ["arg1", "arg2"])
}

usesFunction(anonymousFunction);
