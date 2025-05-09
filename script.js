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
  
      const info = data[0];
      const html = `
        <div class="card">
          <img src="${info.flags.svg}" alt="Flag of ${info.name.common}" class="flag">
          <h2>${info.name.official}</h2>
          <p><strong>Common Name:</strong> ${info.name.common}</p>
          <p><strong>Capital:</strong> ${info.capital?.[0] || 'N/A'}</p>
          <p><strong>Currency:</strong> ${Object.values(info.currencies)[0].name} (${Object.values(info.currencies)[0].symbol})</p>
          <p><strong>Languages:</strong> ${Object.values(info.languages).join(', ')}</p>
          <p><strong>Population:</strong> ${info.population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${info.region}</p>
          <p><strong>Area:</strong> ${info.area.toLocaleString()} km²</p>
          <p><strong>Timezones:</strong> ${info.timezones.join(', ')}</p>
          <button onclick="document.getElementById('searchInput').value=''; document.getElementById('result').innerHTML='';">← Back to Search</button>
        </div>
      `;
  
      resultDiv.innerHTML = html;
    } catch (error) {
      resultDiv.innerHTML = '<p>Error fetching country data.</p>';
      console.error(error);
    }
  }
   