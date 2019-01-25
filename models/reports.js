let reports = {};

reports.kmom01 = `JavaScript som backend med NodeJS
-------------------------------
En av dom mest uppenbara fördelarna med Node är just användandet av JavaScript. I samband med att front-end ramverk som React, Vue eller Angular – som samtliga bygger på JavaScript – tar allt mer plats på webben är det mycket logiskt att endast behöva bry sig om ett enda språk. Även hur man installerar moduler underlättar, då NPM fungerar väldigt bra i alla dessa fall. Vid fall då du vill ha serverrenderad JavaScript kod i dina vyer, fungerar Node exemplariskt då Node kan på egen hand omvandla JS-koden till HTML filer.
Beroende på vilken typ av databas man vill använda i sin applikation, finns det fall då jag hade valt ett annat språk som backend. Jag tänker på främst vid fall då man använder sig MySQL, där jag hade föredragit PHP då jag har uppfattningen om att PHP fungerar bättre ihop med MySQL. Detta är något jag behöver göra mer forskning kring för att kunna göra ett fast beslut. Det finns också en aspekt gällande prestanda. ThinkMobiles har gjort en benchmark 2018, där Node ställs mot PHP7 tillsammans med Nginx. Två tester gjordes, då det andra testet är det mer intressanta. De båda fick ta hand om 1000 queries i 1000 trådar och PHP behövde 32ms jämfört med NodJS som behövde hela 200ms. Nu var detta bara en källa av många, där man kan ifrågasätta deras sätt att testa de båda språken, men det visar tydligt att prestandan är något man måste beakta. Länk till testet hittar ni i slutet av denna redovisning.

Express som ramverk
---------------------------------
Som ramverk för NodeJS har jag valt att använda mig av Express. Största fördelen med Express är att det finns ingen påtvingad mappstruktur att förhålla sig till. Den största nackdelen, däremot, är att det finns ingen påtvingad mappstruktur att förhålla sig till. Det gör att det lätt blir väldigt dåligt organiserat om man inte är noga med hur man väljer att strukturera upp sitt projekt tidigt. Efter undersökningar har jag hittat tre stycken olika artiklar som nämner just detta. Länk till dessa hittar ni längst ner i redovisningen.
Terlici har publicerat en artikel skriven av Stefan där app-arkitektur avhandlas. Här har man valt en arkitektur enligt MVC. Man skall nämna att det framgår att deras arkitektur är gjord för en full-stack app, där vi istället bygger ett RESTful API. Detta betyder att vissa delar inte är applicerbara, som tex vyer, men jag anser ändå att det finns bra punkter att hämta från denna artikeln och den har legat till grund för strukturen i mitt projekt. I artikeln är strukturen uppdelad i följande delar:
Conrollers – Definierar app logiken och dess routes
Helpers – Kod som är delad mellan olika parter i projektet
Middlewares – Funktioner som skall appliceras på alla inkommande anrop till servern
Models – Hanterar all kommunikation med databas
Public – Innehåller allt statiskt som tex bilder, CSS osv.
Views – Vyer som används för frontend
Tests – Tester för projektet
På sidan Dev kan man läsa om vilken arkitektur dem har valt. Det är betydligt mer slimmad struktur med mycket färre mappar. I detta exemplet har dom utgått från ett RESTful perspektiv, men det finns bara config, modules och services. Något tunt i min mening.
En liknande arkitektur kan man hitta på sidan Medium, fast med en något utökad mappstruktur. Fortfarande inget som jag känner passar in den strukturen jag har tänkt mig för mitt projekt.
Den strukturen jag valde att implementera är en mix av de jag läst om, med fokus på MVC stuket. Detta känns naturligt då vi arbetat med MVC ramverk i förra kursen. Strukturen blev enligt följande:
Config – Diverse konfigureringar och globala variabler
Helpers – Hjälpfunktioner som används på olika ställen i projektet
Middlewares – Funktioner som skall appliceras på alla inkommande anrop till servern
Models – Hanterar all kommunikation med databas
Public – Innehåller allt statiskt som tex bilder, CSS osv.
Routes – Routes helt enkelt
Tests – Tester i projektet

Uppbyggnad av API:et
----------------------------
Eftersom att det inte finns speciellt mycket funktionalitet i API:et ännu, finns det inte jättemycket kod att fördela ut. Jag misstänker att vi inte kommer ha den mesta datan lagrad i någon form av databas. Därför har jag förberett appen så långt det går, för att lätt kunna koppla ihop den med en databas.
Denna texten kommer från en egen modell som jag kallar Reports och så återfinns i mappen Models. Modellen har en metod get, så dom ska hämta datan ifrån en databas, men eftersom det inte finns någon, ligger den lagrad i ett objekt. Metoden exporteras ut, och importeras i routen Reports. Tanken är att routen skall använda denna metoden på precis samma sätt även om en databas är inkopplad. Routen vet inte vart dess data kommer ifrån, utan detta håller modellen Reports hand om.
På liknande vis serveras data om mig själv till routen via modellen Me.
Texten är skriven i Markdown just nu. Detta kan komma att ändras när jag sedan ska bygga ett frontend som använder API:et.

Refrenser
---------------------
https://www.terlici.com/2014/08/25/best-practices-express-structure.html
https://dev.to/lars124/how-i-structure-my-rest-apis-11k4
https://medium.com/codebase/structure-of-a-nodejs-api-project-cdecb46ef3f8
https://thinkmobiles.com/blog/php-vs-nodejs/

`;

exports.get = function (kmom) {
    return reports[kmom];
};