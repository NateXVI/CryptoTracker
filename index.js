const fs = require('fs');
const axios = require('axios');

const dogecoin = 18638;
const ethereumClassic = 60.015;
const safemoon = 18638;

console.log('app started')
logData();
setInterval(logData, 15 * 60000)

async function logData() {
    let data = JSON.parse(fs.readFileSync('./cryptodata.json'));
    const d = await getDoge()
    const e = await getEthereumClassic();
    const s = await getSafemoon();

    data.push({
        doge: {
            price: d,
            quantity: dogecoin,
            value: d * dogecoin,
        },
        etc: {
            price: e,
            quantity: ethereumClassic,
            value: e * ethereumClassic,
        },
        safemoon: {
            price: s,
            quantity: safemoon,
            value: s * safemoon,
        },
        total: d+e+s,
        date: Date.now(),
    })

    fs.writeFileSync('./cryptodata.json', JSON.stringify(data))

    console.log(data);
    return
}

async function getDoge() {
	let data = await axios({
		url: 'https://api.cryptorank.io/v0/coins/dogecoin?locale=en',
	});
	data = data.data.data.price.USD;
	return data;
}

async function getEthereumClassic() {
	let data = await axios({
		url: 'https://api.cryptorank.io/v0/coins/ethereum-classic?locale=en',
	});
	data = data.data.data.price.USD;
	return data;
}

async function getSafemoon() {
	let data = await axios('https://api.cryptorank.io/v0/coins/safemoon/tickers');
	data = data.data.data;
	let index = data.findIndex((v) => v.exchangeName == 'Pancake Swap');
	index = index < 0 ? 0 : index;
	data = data[index].usdLast;
	return data;
}