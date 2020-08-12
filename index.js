const minimist = require('minimist');

const arguments = minimist(process.argv.slice(2));

function count(summ, price) {
    let nominal = new Map([[50, 0], [25, 0], [10, 0], [5, 0], [1, 0]])

    let change = (summ*100-price*100)/100;
    let dollars = Math.floor(change);
    change = Math.round(change%1*100)
    let totalCoinsChange = change;

    if (change < 0) {
        throw new Error(`You don't have enough money`)
    }

    for (let [key] of nominal) {
        let coinsCount = Math.floor(change/key);
        if (coinsCount >= 1) {
            nominal.set(key,coinsCount);
        }
        change = change%key;
    }

    let res = `Your change: ${dollars} dollar(s), ${totalCoinsChange} cent. On nominal: `

    for (let [key, value] of nominal) {
        if (value > 0) {
            res += ` [ ${value} coin(s) of ${key} cent ] `
        }
    }
    console.log(res)
}

count(arguments.SUMM, arguments.PRICE)


