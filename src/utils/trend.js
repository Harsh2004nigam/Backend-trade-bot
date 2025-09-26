import Binance from "node-binance-api";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET,
  useServerTime: true,
});

// Config
const SYMBOL = "BTCUSDT";
const profitTarget = 109000; // set your target price here

console.log(chalk.blue(`📡 Streaming LTP for ${SYMBOL}... Profit target: ${profitTarget}`));

const ws = binance.websockets.miniTicker(markets => {
  if (markets[SYMBOL]) {
    const lastPrice = parseFloat(markets[SYMBOL].close);
    console.log(`${new Date().toLocaleTimeString()} | LTP: ${chalk.yellow(lastPrice)}`);

    // Check if profit target is reached
    if (lastPrice >= profitTarget) {
      console.log(chalk.green(`🎯 Profit target reached: ${lastPrice}. Stopping stream.`));

      // Close all WebSockets
      binance.websockets.terminate(ws);

      // Optional: exit process
      process.exit(0);
    }
  }
});























// import Binance from "node-binance-api";
// import chalk from "chalk";
// import dotenv from "dotenv";

// dotenv.config();

// const binance = new Binance().options({
//   APIKEY: process.env.BINANCE_API_KEY,
//   APISECRET: process.env.BINANCE_API_SECRET,
//   useServerTime: true,
// });

// // Trading pair
// const SYMBOL = "BTCUSDT";

// console.log(chalk.blue(`📡 Streaming LTP for ${SYMBOL}...`));

// // WebSocket Mini Ticker — gives last price updates
// binance.websockets.miniTicker(markets => {
//   if (markets[SYMBOL]) {
//     const lastPrice = markets[SYMBOL].close; // last traded price
//     console.log(`${new Date().toLocaleTimeString()} | LTP: ${chalk.yellow(lastPrice)}`);
//   }
// });











// import Binance from "node-binance-api";
// import chalk from "chalk";
// import dotenv from "dotenv";

// dotenv.config();

// const binance = new Binance().options({
//   APIKEY: process.env.BINANCE_API_KEY,
//   APISECRET: process.env.BINANCE_API_SECRET,
//   useServerTime: true,
// });

// const SYMBOL = "BTCUSDT";  // Example pair

// console.log(chalk.blue(`📡 Connecting to Binance WebSocket for ${SYMBOL}...`));

// // WebSocket stream
// binance.websockets.trades([SYMBOL], (trade) => {
//   const { p: price, q: qty, m: isBuyerMaker, T: time } = trade;
//   const direction = isBuyerMaker ? chalk.red("SELL") : chalk.green("BUY");

//   console.log(
//     `${new Date(time).toLocaleTimeString()} | ${direction} | Price: ${chalk.yellow(price)} | Qty: ${qty}`
//   );
// });
