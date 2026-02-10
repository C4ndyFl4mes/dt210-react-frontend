# Moment 3

## Beskrivning
Den här webbplatsen konsumerar ett REST API skapat med .NET med Identity där användare kan registrera/logga in och bli autentiserade med HttpCookie. Inlägg har full CRUD där också Admins kan radera andra medlemmars inlägg. API och databas ligger i ett projekt på Railway.

## Applikation
Applikationen har två services för att hantera förfrågning mot API:et och de använder Axios. Det finns fem interfaces för att hantera typer: IAuth, IError, IPost, IUser och IValidationError. IAuth enbart används för att skicka användarnamn och lösenord till backend.

Det finns fyra sidor: Account (inloggning/registrering), Panel (skapa inlägg), Posts (listar inlägg), och SinglePost (visar enskilt inlägg).

Det finns sex stycken komponenter: AccountForm, ConfirmDeletion, Navigation, Overlay, Post och PostForm. Där Overlay tar in antingen ConfirmDeletion eller PostForm för att kunna ta bort eller radera det enskilda inlägget.

En ytterligare komponent, ProtectedRoute, används för att skydda Panel sidan.

Applikationen använder Mobx för globalt tillståndshantering för att hantera användarens inloggningsstatus.

Det finns också en utility klass Validation som använder Yup för att validera fält.
