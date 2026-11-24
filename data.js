// Datos de ejemplo para probar la interfaz. Los puntajes de IMDb/RT y las
// plataformas son ilustrativos: en la versión real vienen de TMDB, OMDb y MDBList.
window.SEED = {
  me: { name: 'Lu', emoji: '🦊', country: 'Argentina' },
  friends: [
    { id: 'caro', name: 'Caro', emoji: '🍕' },
    { id: 'tomi', name: 'Tomi', emoji: '🐸' },
    { id: 'juli', name: 'Juli', emoji: '🌵' },
    { id: 'mati', name: 'Mati', emoji: '🎧' }
  ],
  platforms: ['Netflix', 'Disney+', 'Max', 'Prime Video', 'Apple TV+', 'MUBI', 'Paramount+', 'Cine', 'Otra'],
  countries: ['Argentina', 'Uruguay', 'Chile', 'Brasil', 'México', 'España', 'Estados Unidos', 'Italia', 'Otro'],
  genres: ['Drama', 'Comedia', 'Sci-fi', 'Thriller', 'Misterio', 'Romance', 'Historia'],
  catalog: [
    { id: 'sev', title: 'Severance', year: 2022, kind: 'serie', genres: ['Thriller', 'Sci-fi'], color: '#2F4F63', imdb: '8.7', rt: '96%', ar: ['Apple TV+'], eps: 10,
      mine: { status: 'vista', platform: 'Apple TV+', country: 'Argentina', rating: 5, comment: 'La segunda temporada me voló la cabeza. Necesito la tercera ya.' },
      friends: [{ f: 'caro', r: 4, c: 'Rara pero adictiva' }, { f: 'tomi', r: 5, c: '' }] },
    { id: 'bear', title: 'The Bear', year: 2022, kind: 'serie', genres: ['Drama', 'Comedia'], color: '#6E3B2E', imdb: '8.5', rt: '99%', ar: ['Disney+'], eps: 10,
      mine: { status: 'viendo', platform: 'Disney+', country: 'Argentina', season: 3, ep: 4, rating: 4, comment: 'Me estresa y me encanta.' },
      friends: [{ f: 'juli', r: 5, c: 'Yes, chef.' }] },
    { id: 'dark', title: 'Dark', year: 2017, kind: 'serie', genres: ['Sci-fi', 'Misterio'], color: '#2C4236', imdb: '8.7', rt: '95%', ar: ['Netflix'], eps: 10,
      mine: { status: 'vista', platform: 'Netflix', country: 'España', rating: 4, comment: 'Hay que verla con un cuaderno al lado.' },
      friends: [{ f: 'mati', r: 5, c: 'La mejor de Netflix, no se discute.' }] },
    { id: 'bb', title: 'Breaking Bad', year: 2008, kind: 'serie', genres: ['Drama', 'Thriller'], color: '#4A5A24', imdb: '9.5', rt: '96%', ar: ['Netflix'], eps: 13,
      mine: { status: 'vista', platform: 'Netflix', country: 'Argentina', rating: 5, comment: 'Clásico absoluto.' },
      friends: [{ f: 'tomi', r: 5, c: '' }, { f: 'caro', r: 3, c: 'Muy larga para mí' }] },
    { id: 'rel', title: 'Relatos salvajes', year: 2014, kind: 'pelicula', genres: ['Comedia', 'Drama'], color: '#7A5A22', imdb: '8.1', rt: '95%', ar: [],
      mine: { status: 'vista', platform: 'Cine', country: 'Argentina', rating: 5, comment: 'Bombita forever.' },
      friends: [{ f: 'caro', r: 5, c: '' }, { f: 'mati', r: 4, c: '' }] },
    { id: 'sho', title: 'Shōgun', year: 2024, kind: 'serie', genres: ['Drama', 'Historia'], color: '#5B2B33', imdb: '8.6', rt: '99%', ar: ['Disney+'], eps: 10,
      mine: { status: 'quiero' }, why: 'Porque te gustó Severance',
      friends: [{ f: 'mati', r: 5, c: 'Épica, mirala en pantalla grande.' }] },
    { id: 'ete', title: 'El Eternauta', year: 2025, kind: 'serie', genres: ['Sci-fi', 'Drama'], color: '#3A4055', imdb: '7.4', rt: '91%', ar: ['Netflix'], eps: 6,
      mine: {}, recBy: 'tomi',
      friends: [{ f: 'tomi', r: 4, c: 'Tenés que verla, Lu.' }, { f: 'juli', r: 4, c: '' }] },
    { id: 'succ', title: 'Succession', year: 2018, kind: 'serie', genres: ['Drama', 'Comedia'], color: '#4E4A26', imdb: '8.8', rt: '94%', ar: ['Max'], eps: 10,
      mine: {}, recBy: 'caro',
      friends: [{ f: 'caro', r: 5, c: 'Es para vos. Confiá.' }] },
    { id: 'past', title: 'Past Lives', year: 2023, kind: 'pelicula', genres: ['Romance', 'Drama'], color: '#3D4A6B', imdb: '7.8', rt: '95%', ar: ['Prime Video'],
      mine: {}, why: 'Le encantó a Juli',
      friends: [{ f: 'juli', r: 5, c: 'Lloré en el colectivo.' }] },
    { id: 'pd', title: 'Perfect Days', year: 2023, kind: 'pelicula', genres: ['Drama'], color: '#2B5452', imdb: '7.9', rt: '96%', ar: ['MUBI'],
      mine: {}, why: 'Tranquila, como Past Lives',
      friends: [{ f: 'juli', r: 5, c: 'Paz absoluta.' }] }
  ],
  feed: [
    { f: 'tomi', verb: 'te recomendó', id: 'ete', when: 'hace 2 h' },
    { f: 'caro', verb: 'te recomendó', id: 'succ', when: 'ayer' },
    { f: 'juli', verb: 'vio', id: 'past', when: 'hace 3 días' },
    { f: 'mati', verb: 'vio', id: 'sho', when: 'hace 5 días' },
    { f: 'juli', verb: 'vio', id: 'bear', when: 'la semana pasada' },
    { f: 'caro', verb: 'vio', id: 'sev', when: 'en octubre' }
  ]
};
