CREATE TABLE "public"."Card" (
  id SERIAL PRIMARY KEY NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  nom VARCHAR(255) NOT NULL,
  categorie TEXT,
  content   TEXT,
  "userId" INTEGER UNIQUE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "public"."User"(id)
);

CREATE TABLE "public"."User" (
  id SERIAL PRIMARY KEY NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  motdepasse VARCHAR(15) NOT NULL
);