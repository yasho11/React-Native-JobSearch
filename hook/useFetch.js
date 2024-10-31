import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      'x-rapidapi-key': 'c7750c14cemsh2751414afaa3a5ep1cdabejsn6bb490ae558a',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com',
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options); // Fixed typo here
      setData(response.data.data || []); // Ensure data is an array if API response is empty
    } catch (error) {
        setError(error);
        console.error("Error fetching data:", error); // Log error details
        alert(`There is an error: ${error.message}`); // Display the error message to provide more info
      }
       finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, query]); // Add dependencies to re-fetch if they change

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
