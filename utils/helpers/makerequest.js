require('dotenv').config();

const  makerequest = async (apiUrl) =>{

     // Replace with the actual API URL
        const apiKey = process.env.API_KEY; // Access the API key from the environment variable

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                 accept: 'application/json',
                'x-cg-demo-api-key': apiKey // Include the API key in the request header
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); 
        return data;
}


module.exports = {makerequest};