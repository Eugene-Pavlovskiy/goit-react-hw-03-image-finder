const KEY = '23526711-d54635d6fd3abb803255ed000';

async function getImages({ query, page }) {
  const response = await fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  const data = await response.json();
  return data;
}

export default getImages;