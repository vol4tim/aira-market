import Promise from 'bluebird'
import BigNumber from 'bignumber.js'

export const promiseFor = Promise.method((condition, action, value) => {
  if (!condition(value)) return value;
  return action(value).then(promiseFor.bind(null, condition, action));
});
// promiseFor(count => count < 10, count => (
//   new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(count);
//       resolve(count + 1);
//     }, 250);
//   })
// ), 0)
//   .then(() => {
//     console.log('good');
//   });

export const formatDecimals = (price, decimals) => {
  const priceNum = new BigNumber(price);
  return priceNum.shift(-decimals).toNumber();
}
