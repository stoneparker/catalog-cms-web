export default function getErrorMessage(error: Error) {
  const message = error.message;

  return message.split('got error(s):').pop()?.split('See the error `source` property for more information.')[0];
}
