async function searchCountry() {
    const country = document.getElementById('searchInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    if (!country) return;
  
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      const data = await response.json();
  
      if (data.status === 404) {
        resultDiv.innerHTML = '<p>Country not found.</p>';
        return;
      }
  
