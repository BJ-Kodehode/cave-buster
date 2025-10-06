# 🚀 Cave Buster Quick Setup

Du ser denne meldingen fordi miljøvariablene ikke er konfigurert ennå. Følg disse trinnene for å få alt til å fungere:

## ✨ Nye Funksjoner i Cave Buster

- 🔍 **Sanntids søk** med fargekodede sjangre
- ⌨️ **Tastaturnavigasjon** i søkeresultater
- 🎨 **20+ unike farger** for forskjellige filmsjangre
- 📱 **Fullstendig mobil-optimalisert** med responsivt design
- 🎬 **Utvidet API** med dedikert søkeendepunkt
- 🏗️ **Organisert dokumentasjon** i `/doc/` mappe
- 🎯 **Touch-vennlig grensesnitt** for mobile enheter

## 📋 Trinn 1: Sett opp MongoDB

### Alternativ A: MongoDB Atlas (Anbefalt - Gratis)
1. Gå til [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Opprett en gratis konto
3. Opprett en ny cluster (velg gratis tier)
4. Gå til "Database Access" og opprett en database bruker
5. Gå til "Network Access" og legg til din IP (eller 0.0.0.0/0 for testing)
6. Få connection string fra "Connect" knappen

### Alternativ B: Lokal MongoDB
1. Installer MongoDB lokalt
2. Bruk connection string: `mongodb://localhost:27017/cavebuster`

## 🔐 Trinn 2: Sett opp Clerk Authentication

1. Gå til [Clerk.com](https://clerk.com)
2. Opprett en gratis konto
3. Opprett en ny applikasjon
4. Kopier "Publishable Key" og "Secret Key"

## ⚙️ Trinn 3: Konfigurer .env.local

Oppdater `.env.local` filen med dine ekte verdier:

```bash
# Erstatt med dine ekte Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_din_ekte_key_her
CLERK_SECRET_KEY=sk_test_din_ekte_secret_her

# Erstatt med din ekte MongoDB URI
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cavebuster?retryWrites=true&w=majority
```

## 🔄 Trinn 4: Restart serveren

```bash
npm run dev
```

## ✅ Test funksjonaliteten

1. Besøk `http://localhost:3000`
2. Registrer en ny bruker
3. Legg til en film
4. Skriv en anmeldelse

---

**💡 Tips:** Du kan teste applikasjonen med kun lokale data ved å la MongoDB URI være som den er, men autentisering vil ikke fungere uten Clerk konfigurering.

**📚 Se SETUP.md for mer detaljerte instruksjoner.**