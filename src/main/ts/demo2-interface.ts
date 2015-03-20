/////////////////////////////////////////////////
// Interface defining object DATA STRUCTURE
/////////////////////////////////////////////////
interface DataInterface {
	/** obj.member */
	member: number;
	/** obj.optionalMember */
	optionalMember?: number;
}

// object implementing DataInterface
var data: DataInterface = {
	member: 1,
	optionalMember: 2
}

console.log(data.member)


/////////////////////////////////////////////////
// Interface defining METHODS of class or object
/////////////////////////////////////////////////
interface MethodInterface {
	/** obj.someFunction("someParam") */
	someFunction(arg: string): void;
}

var objectWithMethod: MethodInterface = {
	someFunction: function(arg: string) {
		alert("someFunction("+arg+")");
	}
}

objectWithMethod.someFunction("arg");


///////////////////////////////////////////////////////////////////////////
// CLASS that implements data structure and methods of given interfaces
///////////////////////////////////////////////////////////////////////////
class SampleClass implements DataInterface, MethodInterface {
	member: number;
	someFunction(arg: string) {
		alert("someFunction("+arg+")");
	}
}

var classInstance = new SampleClass();
console.log(classInstance.member);
classInstance.someFunction("arg")

///////////////////////////////////////////////////////////////////////////
// OBJECT that implements data structure and methods of given interfaces
///////////////////////////////////////////////////////////////////////////
var data2: SampleClass = {
	member: 1,
	someFunction: function(arg: string) {
		alert("someFunction("+arg+")");
	}
}

///////////////////////////////////////////////////////////////////////////
// Functional interface - function name doesn't matter
///////////////////////////////////////////////////////////////////////////
interface FunInterface {
	/** obj("someArg") */
	(arg: string): void;
}

//function useFun(f: (arg: string) => void) {
function useFun(f: FunInterface) {
	f("arg");
}

// anonymous function is given as a parameter to the function call
//useFun(function(arg: string) {
useFun((arg: string) => { // replacing string with different type gives a compile-time error as expected
	alert(arg);
});



///////////////////////////////////////////////////////////////////////////
// Interface mismatch, that is sadly not detected by the compiler
///////////////////////////////////////////////////////////////////////////
var fun: FunInterface = function() {} // XXX: for some reason this doesn't generate a compile-time error
useFun(fun);



///////////////////////////////////////////////////////////////////////////
// Interface for weird object, that is a function and contains data
///////////////////////////////////////////////////////////////////////////
interface WeirdInterface extends DataInterface {
	/** Weird if object has (members or functions) AND function call, but can happen because of dynamic JS typing: obj(1) */
	(arg: number): void;
}

// if we really want to do so weird things, we need to say that variable is "any" type
var weirdO: any = function(arg: number) {
	alert("object("+arg+")")
}
weirdO.member= 1;
weirdO.optionalMember = 2;
weirdO.someFunction = function() { // XXX actually here is a mistake not detected by TS compiler or runtime
	alert("someFunction")
}
var obj:WeirdInterface = weirdO; // for some reason casting is not needed
 
obj(11);
alert("call member: " +obj.member);