import { useEffect, useState } from "react";

function useCurrencyInfo( currency ){
  const [ data , setdata] = useState({});
  const [ error , setError ] = useState(null);
  const [ loading , setLoading ] = useState(true);
  useEffect(() => {
    const fetchCurrencyData = async() => {
        setLoading(true);
        setError(null);

        try{
            const response = await fetch( `https://v6.exchangerate-api.com/v6/780e775a9b775653608c2840/latest/${currency}` );
            if(!response.ok){
              throw new error(`Erroe: ${response.status} ${response.status.text}`)
            }
            const result = await response.json();
            setdata(result.conversion_rates);
            console.log(data);
        }
        catch(error){
          setError(err.message);
        }
        finally{
          setLoading(false);
        }
      };
      fetchCurrencyData();
  },[currency]);

  return { data , error , loading }

}

export default useCurrencyInfo ; 