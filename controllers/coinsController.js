require('dotenv').config(); // Load environment variables
const path = require('path');
const { makerequest } = require('../utils/helpers/makerequest'); 

const getCoins = async (req, res) => {
    try {
        const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
        const data = await makerequest(apiUrl)
        console.log(data)
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

        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?${params}`;
        const data = await makerequest(apiUrl)
        if (!data[cryptoId]) {
            return res.status(404).json({ 
                message: 'Cryptocurrency not found' 
            });
        }

        const price = data[cryptoId].usd;
        const usdValue = price * amount;
        
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
        
        const params = new URLSearchParams({
            from: from,
            to: to,
            vs_currencies: 'usd'
        });
        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${from},${to}&vs_currencies=usd`;
        const data = await makerequest(apiUrl)
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

module.exports = {
    getCoins,
    convertCrypto,
    convertCoins
};


