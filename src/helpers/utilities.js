export const getErrorMessage = (field,errors ) => {
    // interagates the errors object for related messages.
    if ( errors ){
      let messages = [];
      if ( Array.isArray(field) ){
        field.map(function(v, index){
          if ( errors.hasOwnProperty(v) ){ messages.push(errors[v].join()); }
        })
      }else{
        if ( errors.hasOwnProperty(field) ){ messages.push(errors[field].join()); }
      }
      return messages.join();
    }
  }

export const confirmConstraints = (state, constraints) => {
    let validationResult = {}
    for (let constraint in constraints) {
      const currentConstraint = constraints[constraint];
      if (!currentConstraint || constraint === undefined) continue;
      let currentStateVal = state[constraint];

      if (currentConstraint.hasOwnProperty('presence')) {
        if(currentConstraint['presence']['allowEmpty'] && !currentStateVal) continue;
        else if (!currentStateVal || Array.isArray(currentStateVal) && currentStateVal.length < 1) {
            validationResult[constraint] = [currentConstraint['presence']['message']];
            continue;
          }
      }

      if (currentConstraint.hasOwnProperty('format')) {
        let expr;
        if (currentConstraint['format']['flag']) {
          expr = `${currentConstraint['format']['pattern']}`
          expr = RegExp(expr, currentConstraint['format']['flag']);
        } else {
          expr = `${currentConstraint['format']['pattern']}`
          expr = RegExp(expr);
        }
        if (!(currentStateVal instanceof Array) && !expr.test(currentStateVal)) {
          
          validationResult[constraint] = [currentConstraint['format']['message']]
          continue;
        }
      }
      if (currentConstraint.hasOwnProperty('message')) {
        validationResult[constraint] = [currentConstraint['message']['message']]
        continue;
      }
    }
    
    return (Object.keys(validationResult).length === 0)?null:validationResult;
  }