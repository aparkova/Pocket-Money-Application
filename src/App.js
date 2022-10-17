// import ProductsDropdown from './components/ProductsDropdown';
import TransferTokens from './components/TransferTokens';
// import SetCodes from './components/SetCodes';
// import { useState } from 'react'
import ProductSelect from './components/ProductSelect';

function App () {
  
  return (
    <div>
      <TransferTokens/>
      {/* <ProductsDropdown data={categories}/>  */}
      {/* <SetCodes/>     */}
      <ProductSelect/>
      
    </div>
  );
}

export default App;
