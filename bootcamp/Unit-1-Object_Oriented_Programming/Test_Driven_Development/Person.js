const queen = {
    firstName: 'Elizabeth',
    lastname: 'Windsor',
    parents: [],
    childOf: function () {
      return this.parents.map(parent => parent.firstName).join(' & ') || "parents unknown"
    }
  };
  
  const duke = {
    firstName: 'Philip',
    lastname: 'Windsor',
    parents: [],
    childOf: function () {
      return this.parents.map(parent => parent.firstName).join(' & ') || "parents unknown"
    }
  };
  
  const diana = {
    firstName: 'Diana',
    lastname: 'Spencer',
    parents: [],
    childOf: function () {
      return this.parents.map(parent => parent.firstName).join(' & ') || "parents unknown"
    }
  };
  
  const charles = {
    firstName: 'Charles',
    lastname: 'Windsor',
    parents: [queen, duke],
    childOf: function () {
      return this.parents.map(parent => parent.firstName).join(' & ') || "parents unknown"
    }
  };
  
  const william = {
    firstName: 'William',
    lastname: 'Windsor',
    parents: [diana, charles],
    childOf: function () {
      return this.parents.map(parent => parent.firstName).join(' & ') || "parents unknown"
    }
  };
  
  /*
  console.log("Williams's parents: "+ william.childOf());
  console.log("William's paternal grandparents: "+william.parents[0].childOf());
  console.log("William's maternal grandparents: "+william.parents[1].childOf());
  */
  

module.exports = {queen, duke, william, diana, charles} // need to export it for other files to use