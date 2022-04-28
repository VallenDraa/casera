function Employee(name) {
  this.name = name;
  this.sayHello = () => console.log('Hello My Name Is ' + this.name);
}

function Manager(name) {
  Employee.call(this, name);

  this.sayHello = () =>
    console.log(
      'Hello My Name Is ' + this.name + " And I'm The Manager In Here"
    );
  this.giveCash = () => console.log(this.name + ' Gave Cash To Everybody');
}

class Junior {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log('Hello My Name Is ' + this.name + " And I'm the Junior Dev");
  }
}

class Senior extends Junior {
  constructor(name) {
    super(name);
  }

  sayHello() {
    console.log('Hello My Name Is ' + this.name + " And I'm the Senior Dev");
  }
}
const david = new Senior('david');

david.sayHello();

// const steve = new Employee('vallen');
// const jack = new Manager('jack');

// console.log(Manager);
