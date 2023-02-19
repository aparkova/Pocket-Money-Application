import React from 'react'

const Group = (groupName, options, setValue) => {

  return {
    label: (() => {
      return (
        <div
          onClick={() =>
            setValue(value => {
              const result = value.concat(options.filter(groupOptions => !value.includes(groupOptions)))
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
  
   


