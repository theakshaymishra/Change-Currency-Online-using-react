import React, { useId } from 'react';

const InputBox = ({
    label, // Label for the input box
    amount, // Current amount value
    onAmountChange, // Function to handle amount change
    onCurrencyChange, // Function to handle currency change
    currencyOptions = [], // List of available currencies
    selectCurrency = "USD", // Default selected currency
    amountDisable = false, // Flag to disable amount input
    currencyDisable = false, // Flag to disable currency select
}) => {
  
  const amountInputId = useId(); // Unique ID for the input for accessibility

  return (
    <div className="mb-4"> {/* Margin bottom for spacing */}
      <label htmlFor={amountInputId} className="block text-gray-700 font-semibold mb-2">
        {label} {/* Display the label */}
      </label>
      <div className="flex"> {/* Flex container for input and select */}
        <input  
          id={amountInputId} // Associating label with input for accessibility
          className="flex-grow bg-white/30 backdrop-blur-lg border border-white/30 rounded-l-lg py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
          type="number" // Number input for amount
          placeholder="Enter amount" // Placeholder text
          disabled={amountDisable} // Disable input if flag is true
          value={amount} // Current amount value
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))} // Handle amount change
        />
        <select
          className="bg-white/30 backdrop-blur-lg border border-white/30 rounded-r-lg py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} // Handle currency change
          disabled={currencyDisable} // Disable select if flag is true
          value={selectCurrency} // Current selected currency
        >
          {currencyOptions.map((currency) => ( // Map through available currencies
            <option key={currency} value={currency}>
              {currency} {/* Display currency */}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
