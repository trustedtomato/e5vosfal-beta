import makeError from 'make-error';

export default async (url, json) => {
  if (json) {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw makeError(responseJson.error)(responseJson.errorDescription);
    }
    return responseJson;
  }
  throw new Error('Not implemented yet!');
};
