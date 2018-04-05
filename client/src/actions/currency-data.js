import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
const request = require('request');


export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchCurrencyDataSuccess = data => ({
    type: 'FETCH_CURRENCY',
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchCurrencyDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const FETCH_COIN_PRICES = 'FETCH_COIN_PRICES';
export const fetchCoinPrices = data => ({
    type: FETCH_COIN_PRICES,
    data
})



export const fetchCurrencyData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/currency`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => {
            dispatch(fetchCurrencyDataSuccess(data))
            console.log("watermelon")
            //map({name: "Bitcoin"})
            //console.log(data)
            var result = data.filter(function( obj ) {
                return obj.name == "Bitcoin";
            });
            result.forEach((coin) =>{ coin.price_usd = Number(coin.price_usd), coin.rank = Number(coin.rank), coin.percent_change_1h = Number(coin.percent_change_1h), coin.percent_change_7d = Number(coin.percent_change_7d), coin.percent_change_24h = Number(coin.percent_change_24h)})
            dispatch(mapCurrency(result));
        })

        .catch(err => {
             console.log(err)
            dispatch(fetchCurrencyDataError(err));
        });
};


export const mapCurrency = results => ({
    type: "MAP_CURRENCY",
    results
});

//for yourCoins
export const fetchYourCoins = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/yourcoins`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({yourCoins}) => {
            dispatch(yourCurrency(yourCoins))
            console.log("Zebra")
            console.log(yourCoins)
        })

        .catch(err => {
             console.log(err)
            dispatch(fetchCurrencyDataError(err));
        });
};

export const yourCurrency = yourCoins => ({
    type: "YOUR_CURRENCY",
    yourCoins
});

//edit coins
export const editCoins = (coin, num) => (dispatch, getState) => {
    console.log(coin, num)
    let c = {coin: coin, num: num}
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/editcoins`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
         body: JSON.stringify(c)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({yourCoins}) => {
            //yourCoins[0].amount += num
            dispatch(editCoin(yourCoins))
            console.log("Zebra")
            console.log(yourCoins)
        })

        .catch(err => {
             console.log(err)
            dispatch(fetchCurrencyDataError(err));
        });
};

export const editCoin = (yourCoins) => ({
    type: "EDIT",
    yourCoins
});

/*export const fetchLatestPrices = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/updatePrices`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({latestPrices}) => {
            dispatch(currentPrices(latestPrices))
            console.log("Blackberry")
            console.log(latestPrices)
        
            })
           
        .catch(err => {
             console.log(err)
            dispatch(fetchCurrencyDataError(err));
        });
};

export const currentPrices = latestPrices => ({
    type: "CURRENT_PRICES",
    latestPrices
});*/





