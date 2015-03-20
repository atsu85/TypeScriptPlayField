module es6Demo {
    export class DemoClass {
        stringField: string;
        constructor(private optionalArg?) {

        }

        sampleFunction(): Human {
            console.log("sampleFunction()")
            return new Human("Ats");
        }

    }

    export class Human {
//        constructor(private firstName: string, private lastName?: string) {
        firstName: string;
        lastName: string;
        constructor(firstName: string, lastName?: string) {
        }

        toString() : string {
            return this.firstName + " " + this.lastName;
        }
    }
}