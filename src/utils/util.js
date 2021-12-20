const toDecimal = value => parseFloat(value).toFixed(0);

const to2Decimal = value => {
  let result = parseFloat(value).toFixed(2);
  if (result === '0.00') { result = value; }
  return result;
};

const randColor = () => {
  return ("#" + Math.floor(Math.random()*16777215).toString(16));
}

const moneyWithCommas = amount => {
  const breakAmount = amount.toString().split('.');
  const preDecimal = breakAmount[0];
  const postDecimal = breakAmount[1];
  const preDecimalWithCommas = preDecimal.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const resultArry = [preDecimalWithCommas, postDecimal];
  const result = postDecimal ? resultArry.join('.') : preDecimalWithCommas;
  return result;
};

const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');


export {
  to2Decimal,
  toDecimal,
  moneyWithCommas,
  randColor,
  toSnakeCase
};
