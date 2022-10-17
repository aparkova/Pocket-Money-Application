import React from 'react'

const Group = (groupName, options, setValue) => {

  return {
    label: (() => {
      return (
        <div
          onClick={() =>
            setValue(value => {
              // console.log(value, options, "debug")
              const result = value.concat(options.filter(groupOptions => !value.includes(groupOptions)))
              // console.log(result, "debug2")
              const itemCodes = result.map(item => item.value);
              console.log(result, "here")
              console.log(itemCodes, "debug3")

              return result
            })
            
          }
        >
          {groupName}
        </div>
      );
    })(),
    options: options
  };
};

  export default Group;
  
   


