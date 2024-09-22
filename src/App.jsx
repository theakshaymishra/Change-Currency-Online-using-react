import React, { useState } from "react";
import InputBox from "./Components/InputBox";
import useCurrencyInfo from "./Custom_Hooks/useCurrencyInfo";

function App() {
  // State variables for the amount to convert, currencies, and converted amount
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertAmount, setConvertAmount] = useState(0);

  // Fetching currency information based on the 'from' currency
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo.data || {}); // Extract available currencies

  // Function to swap the 'from' and 'to' currencies
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertAmount(amount); // Keep the same amount after swapping
    setAmount(convertAmount); // Update amount to reflect the converted amount
  };

  // Function to convert the amount using the fetched currency rates
  const convert = () => {
    if (currencyInfo.data[to]) { // Check if the target currency exists
      setConvertAmount(amount * currencyInfo.data[to]); // Calculate converted amount
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500" style={{
      backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
  }}>
      <div className="bg-white/30 backdrop-blur-lg border border-white/30 shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-xl font-bold mb-4 text-center">Currency Converter</h1>
        <form onSubmit={(e) => { e.preventDefault(); convert(); }}>
          <InputBox
            label="From" // Label for the input box
            amount={amount}
            currencyOptions={options} // Pass available currency options
            onCurrencyChange={setFrom} // Function to update 'from' currency
            selectCurrency={from}
            onAmountChange={setAmount} // Function to update the amount
          />
          <div className="flex justify-center my-4">
            <button
              type="button"
              className="bg-blue-600 text-white rounded-lg px-4 py-2"
              onClick={swap} // Call swap function on button click
            >
              Swap
            </button>
          </div>
          <InputBox
            label="To" // Label for the output box
            amount={convertAmount} // Display converted amount
            currencyOptions={options}
            onCurrencyChange={setTo} // Function to update 'to' currency
            selectCurrency={to}
            amountDisable // Disable amount input for 'to' currency
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 mt-4"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()} 
          </button>
        </form>
        {currencyInfo.loading && <p className="mt-4 text-center">Loading...</p>}
        {currencyInfo.error && <p className="mt-4 text-center text-red-500">{currencyInfo.error}</p>}
      </div>
    </div>
  );
}

export default App;
