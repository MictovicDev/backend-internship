require('dotenv').config(); // Load environment variables

const getCoins = async (req, res) => {
    try {
        const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'; // Replace with the actual API URL
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

        const prices = data.map(coin => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            current_price: coin.current_price,
            price_change_24h: coin.price_change_percentage_24h
        }));

        res.status(200).json(prices);
    } catch (error) {
        console.log(error)
        console.error('Error fetching data from API:', error.message);
        res.status(500).json({ message: 'Failed to fetch data from the API' });
    }
};

const convertCrypto = async (req, res) => {
    try{
        const { cryptoId, amount } = req.body;

        
        const params = new URLSearchParams({
            ids: cryptoId,
            vs_currencies: 'usd'
        });

        const apiUrl = 'https://api.coingecko.com/api/v3/simple/price';
        const apiKey = process.env.API_KEY;

        const response = await fetch(`${apiUrl}?${params}`, {
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
        console.log(data)

        
        if (!data[cryptoId]) {
            return res.status(404).json({ 
                message: 'Cryptocurrency not found' 
            });
        }

        const price = data[cryptoId].usd;
        const usdValue = price * amount;

        console.log(price)
        console.log(usdValue)
        
        return res.status(200).json({
            from: cryptoId,
            amount: amount,
            to: 'USD',
            value: usdValue
        });
    }
    catch (error) {
        console.log(error)
        console.error('Error fetching data from API:', error.message);
        res.status(500).json({ message: 'Failed to fetch data from the API' });
    }
}


const convertCoins = async(req, res) => {
    try{
        const {from, to, amount} = req.body;
        const apiUrl = 'https://api.coingecko.com/api/v3/simple/price';
        const apiKey = process.env.API_KEY;

        const response = await fetch(`${apiUrl}?ids=${from},${to}&vs_currencies=usd`, {
            method: 'GET',
            headers: {
                 accept: 'application/json',
                'x-cg-demo-api-key': apiKey 
            }
        });
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        conversion_rate = data[from].usd / data[to].usd
        converted = amount * conversion_rate

        return res.status(200).json({
            from: from,
            to: to,
            amount: amount,
            converted: converted
        });
        
    }
    catch (error) {
        console.log(error)
        console.error('Error fetching data from API:', error.message);
        res.status(500).json({ message: 'Failed to fetch data from the API' });
    }
}

module.exports = { getCoins, convertCrypto, convertCoins };


