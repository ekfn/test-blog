This is a test blog project.

## Getting Started

To run development server:

```bash
npm i
npm run dev
```

To run in a production-like environment:

```bash
npm i
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About

- The homepage employs a static generation strategy, with a client-side component implementing a button to load additional articles.
- Article pages are pre-generated in HTML, and comments are loaded on the client side after the page loads.
- Images are available in original sizes of 2400x1200 and 1200x1200, with the appropriate size being selected upon loading. Images for the first two articles, as well as the image on the internal article page, are preloaded.
