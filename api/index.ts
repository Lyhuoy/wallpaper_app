const API_URL = `https://pixabay.com/api/?key=${process.env.API_KEY}`;

const formatUrl = (param: any) => {
  let url = API_URL + '&per_page=25&safesearch=false&editors_choice=true';
  if (!param) return url;
  let paramKeys = Object.keys(param);

  paramKeys.map((key: any) => {
    let value = key == 'q' ? encodeURIComponent(param[key]) : param[key];
    url += `&${key}=${value}`;
  });

  return url;
};

export const apiCall = async (param: any) => {
  try {
    const response = await fetch(formatUrl(param));
    const data = await response.json();
    return data.hits;
  } catch (error: any) {
    console.error('error: ', error.message);
  }
};
