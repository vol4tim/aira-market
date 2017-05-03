import Promise from 'bluebird'

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
  const decimalsFormat = Number(decimals);
  let decimalsNum = decimalsFormat
  if (decimalsNum > 0) {
    decimalsNum = Math.pow(10, decimalsNum)
  } else {
    decimalsNum = 1
  }
  return (Number(price) / decimalsNum).toFixed(decimalsFormat);
}
