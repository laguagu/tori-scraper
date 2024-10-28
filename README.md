# Tori.fi Scraper

Yksinkertainen web scraper Tori.fi:n ilmoitusten hakemiseen. Toteutettu Next.js:llä ja Cheerio:lla.

## Ominaisuudet

- Hakee huonekaluilmoitukset Tori.fi:stä
- Palauttaa ilmoitukset JSON-muodossa (otsikko, hinta, sijainti, kuva, linkki)
- Käytettävissä joko API-endpointtina tai React-komponenttina

## Asennus

```bash
git clone https://github.com/laguagu/tori-scraper
cd tori-scraper
npm install
```

## Käyttö

### Kehitysympäristön käynnistys

```bash
npm run dev
```

### API Endpoint

API-endpointtia voi kutsua seuraavasti:

```
GET /api/tori-search?q=hakusana
```

Esimerkki kutsusta:
```bash
curl "http://localhost:3000/api/tori-search?q=ikea+klippan"
```

Vastaus on JSON-muodossa:
```json
{
  "results": [
    {
      "title": "Ikea Klippan sohva",
      "price": "50 €",
      "location": "Helsinki, Kallio",
      "imageUrl": "https://example.com/image.jpg",
      "link": "https://www.tori.fi/..."
    },
    // ...
  ]
}
```

## Riippuvuudet

- Next.js 15.0.1
- Cheerio 1.0.0
- React 19.0.0
- Shadcn/ui komponentit

## Huomioitavaa

- API ei tue sivutusta tällä hetkellä
