# reli

Reli (de "recomendame una peli"): app personal para llevar registro de las series y pelis que vi, ver el puntaje de IMDb y Rotten Tomatoes antes de empezar una, y recomendarlas a amigos.

## Estado actual

Versión de prueba de la interfaz. Es un sitio estático (HTML, CSS y JS, sin build) con datos de ejemplo en `data.js`. Lo que cambiás (estado, valoración, episodio, dónde la viste, comentarios) se guarda solo en tu navegador (`localStorage`).

Todavía no tiene login, ni datos reales de TMDB, OMDb o MDBList, ni amigos de verdad.

## Probar en local

Abrí `index.html` en el navegador, o levantá un servidor:

```
npx serve .
```

## Deploy

Vercel, plan Hobby (gratis). Se importa el repo con el preset "Other" y sin build command: cada push a `main` se publica solo.
