import React from 'react'
import ProductSelect from '../components/ProductSelect';


function SendTokens() {
  return (
    <div className='sendtokens'>
        <h1>Select conditions</h1>
        <ProductSelect/>
        {/* <h1>Database</h1>
        <SetCodes/> */}
    </div>
  )
}

export default SendTokens;
