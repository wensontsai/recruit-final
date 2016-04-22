export function prepareMessagesArray(array, message) {
  console.log('prepare func fired');
  if(array.indexOf(message) > -1 ) {
    return;
  }
  array.push(message);
  return array;
}