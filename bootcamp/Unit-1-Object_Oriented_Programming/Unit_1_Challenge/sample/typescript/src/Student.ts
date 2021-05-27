class Student {
    private fullName: string;

    constructor(
      firstName: string,
      middleInitial: string,
      lastName: string
    ) {
      this.fullName = firstName + " " + middleInitial + " " + lastName;
    }

    public getName() {
      return this.fullName;
    }
  }

  export = Student;

  // const s = new Student("", "", "2");
  // console.log(s.fullName);

