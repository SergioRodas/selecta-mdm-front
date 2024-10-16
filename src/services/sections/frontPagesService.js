import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const urlGetFrontPages = `${API_URL}/PrimerasPlanas`;
export const urlGetImages = `${API_URL}/Images`;

export const obtenerURLLogo = (note) => {
  if (!note.MEDIO) {
    return 'https://intelicast.net/w6231v4smt7j5PM74S7vS768W58W0K7e6m99bP0O/logos_medios/tv.jpg';
  }

  const baseName = note.MEDIO.replace('.jpg', '').toLowerCase();
  const adjustedName = baseName.replace(/ /g, '');
  const logos = '';
  return (
    logos[adjustedName] ||
    'https://intelicast.net/w6231v4smt7j5PM74S7vS768W58W0K7e6m99bP0O/logos_medios/radio.jpg'
  );
};

export const fetchPrimerasPlanas = async () => {
  const response = await axios.get(urlGetFrontPages);
  return response.data;
};

export const fetchPrimerasPlanasWithImages = async () => {
  try {
    const [resPrimerasPlanas, resImages] = await Promise.all([
      axios.get(urlGetFrontPages),
      axios.get(urlGetImages),
    ]);

    return resPrimerasPlanas.data
      .map((primerasPlanas) => {
        const adicional = resImages.data.find(
          (img) => img.MEDIO === primerasPlanas.MEDIO
        );

        return {
          ...primerasPlanas,
          logoUrl: adicional
            ? obtenerURLLogo(adicional)
            : 'https://intelicast.net/w6231v4smt7j5PM74S7vS768W58W0K7e6m99bP0O/logos_medios/tv.jpg',
          PrimeraplanaURL: primerasPlanas.PrimeraplanaURL,
          captitulo: adicional ? adicional.captitulo : primerasPlanas.captitulo,
          NotacompletaURL: adicional ? adicional.NotacompletaURL : '',
        };
      })
      .filter((element) => element !== null);
  } catch (error) {
    console.error('Error fetching primeras planas with images:', error);
    throw error;
  }
};
