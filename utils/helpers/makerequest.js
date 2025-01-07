require('dotenv').config();

const  makerequest = async (apiUrl) =>{

        const apiKey = process.env.API_KEY;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                 accept: 'application/json',
                'x-cg-demo-api-key': apiKey 
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); 
        return data;
}


module.exports = {makerequest};