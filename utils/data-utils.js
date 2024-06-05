export const replaceMongoIdInArray = (array) => {
    const mappedArray = array.map(({_id , ...res}) => ({
        id: _id.toString() ,
        ...res
    }))


    return mappedArray;
  }

  export const replaceMongoIdInObject = (obj) => {

    const {_id, ...rest} = obj;
    const updatedObj = {id: _id.toString(), ...rest};
    return updatedObj;
  };
  



  

