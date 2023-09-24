# Shorten API

const apiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(TheURL)}`

fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.shorturl) {
        const shortenedUrl = data.shorturl; // the result 
        }
      }
