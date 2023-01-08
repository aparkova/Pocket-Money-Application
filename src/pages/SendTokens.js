import React from 'react'
import TransferTokens from '../components/TransferTokens';
import ProductSelect from '../components/ProductSelect';
import SetCodes from '../components/SetCodes';

function SendTokens() {
  return (
    <div className='sendtokens'>
        <h1>Select conditions</h1>
        <ProductSelect/>
        {/* <h1>Send tokens</h1>
        <TransferTokens/> */}
        {/* <Test/> */}
        <h1>Database</h1>
        <SetCodes/>
    </div>
  )
}

export default SendTokens;
