/**
 * Clasificador gratuito de artistas por estado de ánimo
 * Base de datos hardcodeada con artistas populares
 */

import { MOOD_CATEGORIES } from './moodClassifier.js';

// Base de datos de artistas conocidos clasificados por mood
const ARTIST_MOOD_DATABASE = {
  // FELIZ
  'Pharrell Williams': MOOD_CATEGORIES.FELIZ,
  'Bruno Mars': MOOD_CATEGORIES.FELIZ,
  'Justin Timberlake': MOOD_CATEGORIES.FELIZ,
  'Dua Lipa': MOOD_CATEGORIES.FELIZ,
  'The Weeknd': MOOD_CATEGORIES.FELIZ,
  'Lizzo': MOOD_CATEGORIES.FELIZ,
  'Doja Cat': MOOD_CATEGORIES.FELIZ,
  'Harry Styles': MOOD_CATEGORIES.FELIZ,
  'Ed Sheeran': MOOD_CATEGORIES.FELIZ,
  'Taylor Swift': MOOD_CATEGORIES.FELIZ,
  'Ariana Grande': MOOD_CATEGORIES.FELIZ,
  'Camila Cabello': MOOD_CATEGORIES.FELIZ,
  'Shawn Mendes': MOOD_CATEGORIES.FELIZ,
  'Katy Perry': MOOD_CATEGORIES.FELIZ,
  'Lady Gaga': MOOD_CATEGORIES.FELIZ,
  'Beyoncé': MOOD_CATEGORIES.FELIZ,
  'Rihanna': MOOD_CATEGORIES.FELIZ,
  'Selena Gomez': MOOD_CATEGORIES.FELIZ,
  'Justin Bieber': MOOD_CATEGORIES.FELIZ,
  'Charlie Puth': MOOD_CATEGORIES.FELIZ,
  'Meghan Trainor': MOOD_CATEGORIES.FELIZ,
  'Jason Mraz': MOOD_CATEGORIES.FELIZ,
  'Jack Johnson': MOOD_CATEGORIES.FELIZ,
  'OneRepublic': MOOD_CATEGORIES.FELIZ,
  'Maroon 5': MOOD_CATEGORIES.FELIZ,
  'The Beatles': MOOD_CATEGORIES.FELIZ,
  'ABBA': MOOD_CATEGORIES.FELIZ,
  'Michael Jackson': MOOD_CATEGORIES.FELIZ,
  'Stevie Wonder': MOOD_CATEGORIES.FELIZ,
  'Elton John': MOOD_CATEGORIES.FELIZ,
  
  // MÁS POP INTERNACIONAL Y MAINSTREAM
  'Olivia Rodrigo': MOOD_CATEGORIES.FELIZ,
  'Doja Cat': MOOD_CATEGORIES.FELIZ,
  'Megan Thee Stallion': MOOD_CATEGORIES.FELIZ,
  'Cardi B': MOOD_CATEGORIES.FELIZ,
  'Lizzo': MOOD_CATEGORIES.FELIZ,
  'Dua Lipa': MOOD_CATEGORIES.FELIZ,
  'The Weeknd': MOOD_CATEGORIES.FELIZ,
  'Post Malone': MOOD_CATEGORIES.FELIZ,
  'Billie Eilish': MOOD_CATEGORIES.FELIZ,
  'Lorde': MOOD_CATEGORIES.FELIZ,
  'Halsey': MOOD_CATEGORIES.FELIZ,
  'Camila Cabello': MOOD_CATEGORIES.FELIZ,
  'Sabrina Carpenter': MOOD_CATEGORIES.FELIZ,
  'Gracie Abrams': MOOD_CATEGORIES.FELIZ,
  'Clairo': MOOD_CATEGORIES.FELIZ,
  'Girl in Red': MOOD_CATEGORIES.FELIZ,
  'Beabadoobee': MOOD_CATEGORIES.FELIZ,
  'Phoebe Bridgers': MOOD_CATEGORIES.FELIZ,
  'Lana Del Rey': MOOD_CATEGORIES.FELIZ,
  'Mitski': MOOD_CATEGORIES.FELIZ,
  'Fiona Apple': MOOD_CATEGORIES.FELIZ,
  'Joni Mitchell': MOOD_CATEGORIES.FELIZ,
  'Fleetwood Mac': MOOD_CATEGORIES.FELIZ,
  'The 1975': MOOD_CATEGORIES.FELIZ,
  'Arctic Monkeys': MOOD_CATEGORIES.FELIZ,
  'Tame Impala': MOOD_CATEGORIES.FELIZ,
  'Glass Animals': MOOD_CATEGORIES.FELIZ,
  'Two Door Cinema Club': MOOD_CATEGORIES.FELIZ,
  'Foster the People': MOOD_CATEGORIES.FELIZ,
  'MGMT': MOOD_CATEGORIES.FELIZ,
  'Vampire Weekend': MOOD_CATEGORIES.FELIZ,
  'Phoenix': MOOD_CATEGORIES.FELIZ,
  'Passion Pit': MOOD_CATEGORIES.FELIZ,
  'Of Monsters and Men': MOOD_CATEGORIES.FELIZ,
  'Walk the Moon': MOOD_CATEGORIES.FELIZ,
  'COIN': MOOD_CATEGORIES.FELIZ,
  'Wallows': MOOD_CATEGORIES.FELIZ,
  'Rex Orange County': MOOD_CATEGORIES.FELIZ,
  'Still Woozy': MOOD_CATEGORIES.FELIZ,
  'Boy Pablo': MOOD_CATEGORIES.FELIZ,
  'Cuco': MOOD_CATEGORIES.FELIZ,
  'Omar Apollo': MOOD_CATEGORIES.FELIZ,
  
  // MÁS POP Y MAINSTREAM MASIVO
  'Adele': MOOD_CATEGORIES.FELIZ,
  'Sam Smith': MOOD_CATEGORIES.FELIZ,
  'Lewis Capaldi': MOOD_CATEGORIES.FELIZ,
  'James Arthur': MOOD_CATEGORIES.FELIZ,
  'Calum Scott': MOOD_CATEGORIES.FELIZ,
  'Dean Lewis': MOOD_CATEGORIES.FELIZ,
  'Bazzi': MOOD_CATEGORIES.FELIZ,
  'Lauv': MOOD_CATEGORIES.FELIZ,
  'Jeremy Zucker': MOOD_CATEGORIES.FELIZ,
  'Troye Sivan': MOOD_CATEGORIES.FELIZ,
  'Conan Gray': MOOD_CATEGORIES.FELIZ,
  'Madison Beer': MOOD_CATEGORIES.FELIZ,
  'Bea Miller': MOOD_CATEGORIES.FELIZ,
  'Tate McRae': MOOD_CATEGORIES.FELIZ,
  'Ava Max': MOOD_CATEGORIES.FELIZ,
  'Dua Lipa': MOOD_CATEGORIES.FELIZ,
  'Charli XCX': MOOD_CATEGORIES.FELIZ,
  'Kim Petras': MOOD_CATEGORIES.FELIZ,
  'Slayyyter': MOOD_CATEGORIES.FELIZ,
  'Rina Sawayama': MOOD_CATEGORIES.FELIZ,
  'Chappell Roan': MOOD_CATEGORIES.FELIZ,
  'Reneé Rapp': MOOD_CATEGORIES.FELIZ,
  'Fletcher': MOOD_CATEGORIES.FELIZ,
  'King Princess': MOOD_CATEGORIES.FELIZ,
  'Hayley Kiyoko': MOOD_CATEGORIES.FELIZ,
  'Troye Sivan': MOOD_CATEGORIES.FELIZ,
  'Years & Years': MOOD_CATEGORIES.FELIZ,
  'MUNA': MOOD_CATEGORIES.FELIZ,
  'The 1975': MOOD_CATEGORIES.FELIZ,
  'Bleachers': MOOD_CATEGORIES.FELIZ,
  'fun.': MOOD_CATEGORIES.FELIZ,
  'Nate Ruess': MOOD_CATEGORIES.FELIZ,
  'Steel Train': MOOD_CATEGORIES.FELIZ,
  'The Format': MOOD_CATEGORIES.FELIZ,

  // FIESTA
  'Bad Bunny': MOOD_CATEGORIES.FIESTA,
  'J Balvin': MOOD_CATEGORIES.FIESTA,
  'Karol G': MOOD_CATEGORIES.FIESTA,
  'Daddy Yankee': MOOD_CATEGORIES.FIESTA,
  'Ozuna': MOOD_CATEGORIES.FIESTA,
  'Maluma': MOOD_CATEGORIES.FIESTA,
  'Anuel AA': MOOD_CATEGORIES.FIESTA,
  'Farruko': MOOD_CATEGORIES.FIESTA,
  'Nicky Jam': MOOD_CATEGORIES.FIESTA,
  'Wisin': MOOD_CATEGORIES.FIESTA,
  'Yandel': MOOD_CATEGORIES.FIESTA,
  'Pitbull': MOOD_CATEGORIES.FIESTA,
  'David Guetta': MOOD_CATEGORIES.FIESTA,
  'Calvin Harris': MOOD_CATEGORIES.FIESTA,
  'Martin Garrix': MOOD_CATEGORIES.FIESTA,
  'Tiësto': MOOD_CATEGORIES.FIESTA,
  'Swedish House Mafia': MOOD_CATEGORIES.FIESTA,
  'Avicii': MOOD_CATEGORIES.FIESTA,
  'Marshmello': MOOD_CATEGORIES.FIESTA,
  'The Chainsmokers': MOOD_CATEGORIES.FIESTA,
  'Skrillex': MOOD_CATEGORIES.FIESTA,
  'Deadmau5': MOOD_CATEGORIES.FIESTA,
  'Daft Punk': MOOD_CATEGORIES.FIESTA,
  'Steve Aoki': MOOD_CATEGORIES.FIESTA,
  'Zedd': MOOD_CATEGORIES.FIESTA,
  'Diplo': MOOD_CATEGORIES.FIESTA,
  'Major Lazer': MOOD_CATEGORIES.FIESTA,
  'DJ Snake': MOOD_CATEGORIES.FIESTA,
  'Kygo': MOOD_CATEGORIES.FIESTA,
  'Alan Walker': MOOD_CATEGORIES.FIESTA,
  'Don Omar': MOOD_CATEGORIES.FIESTA,
  'Tego Calderón': MOOD_CATEGORIES.FIESTA,
  'Arcángel': MOOD_CATEGORIES.FIESTA,
  'De La Ghetto': MOOD_CATEGORIES.FIESTA,
  'Plan B': MOOD_CATEGORIES.FIESTA,
  'Rauw Alejandro': MOOD_CATEGORIES.FIESTA,
  'Myke Towers': MOOD_CATEGORIES.FIESTA,
  'Jhay Cortez': MOOD_CATEGORIES.FIESTA,
  'Sech': MOOD_CATEGORIES.FIESTA,
  'Rosalía': MOOD_CATEGORIES.FIESTA,
  'C. Tangana': MOOD_CATEGORIES.FIESTA,
  
  // MÁS REGGAETON Y URBANO LATINO
  'Feid': MOOD_CATEGORIES.FIESTA,
  'Ryan Castro': MOOD_CATEGORIES.FIESTA,
  'Blessd': MOOD_CATEGORIES.FIESTA,
  'Mora': MOOD_CATEGORIES.FIESTA,
  'Quevedo': MOOD_CATEGORIES.FIESTA,
  'Bizarrap': MOOD_CATEGORIES.FIESTA,
  'Duki': MOOD_CATEGORIES.FIESTA,
  'Paulo Londra': MOOD_CATEGORIES.FIESTA,
  'Trueno': MOOD_CATEGORIES.FIESTA,
  'Wos': MOOD_CATEGORIES.FIESTA,
  'Khea': MOOD_CATEGORIES.FIESTA,
  'Tiago PZK': MOOD_CATEGORIES.FIESTA,
  'LIT killah': MOOD_CATEGORIES.FIESTA,
  'Cazzu': MOOD_CATEGORIES.FIESTA,
  'Nicki Nicole': MOOD_CATEGORIES.FIESTA,
  'Maria Becerra': MOOD_CATEGORIES.FIESTA,
  'Emilia': MOOD_CATEGORIES.FIESTA,
  'Tini': MOOD_CATEGORIES.FIESTA,
  'MYA': MOOD_CATEGORIES.FIESTA,
  'Lali': MOOD_CATEGORIES.FIESTA,
  'Becky G': MOOD_CATEGORIES.FIESTA,
  'Anitta': MOOD_CATEGORIES.FIESTA,
  'Pabllo Vittar': MOOD_CATEGORIES.FIESTA,
  'MC Kevin': MOOD_CATEGORIES.FIESTA,
  'Luísa Sonza': MOOD_CATEGORIES.FIESTA,
  'Kevinho': MOOD_CATEGORIES.FIESTA,
  'MC Hariel': MOOD_CATEGORIES.FIESTA,
  'Djonga': MOOD_CATEGORIES.FIESTA,
  'Emicida': MOOD_CATEGORIES.FIESTA,
  'Matuê': MOOD_CATEGORIES.FIESTA,
  'WIU': MOOD_CATEGORIES.FIESTA,
  'Orochi': MOOD_CATEGORIES.FIESTA,
  'L7NNON': MOOD_CATEGORIES.FIESTA,
  'Xamã': MOOD_CATEGORIES.FIESTA,
  'Filipe Ret': MOOD_CATEGORIES.FIESTA,
  'BK': MOOD_CATEGORIES.FIESTA,
  'Sidoka': MOOD_CATEGORIES.FIESTA,
  'Veigh': MOOD_CATEGORIES.FIESTA,
  'Chefin': MOOD_CATEGORIES.FIESTA,
  'Borges': MOOD_CATEGORIES.FIESTA,
  'Mc IG': MOOD_CATEGORIES.FIESTA,
  'Mc Cabelinho': MOOD_CATEGORIES.FIESTA,
  'Mc Poze do Rodo': MOOD_CATEGORIES.FIESTA,
  'Mc Ryan SP': MOOD_CATEGORIES.FIESTA,
  'Mc Davi': MOOD_CATEGORIES.FIESTA,
  'Mc Marks': MOOD_CATEGORIES.FIESTA,
  
  // MÁS EDM Y ELECTRÓNICA MASIVO
  'Hardwell': MOOD_CATEGORIES.FIESTA,
  'Armin van Buuren': MOOD_CATEGORIES.FIESTA,
  'Above & Beyond': MOOD_CATEGORIES.FIESTA,
  'Gareth Emery': MOOD_CATEGORIES.FIESTA,
  'Ferry Corsten': MOOD_CATEGORIES.FIESTA,
  'Paul van Dyk': MOOD_CATEGORIES.FIESTA,
  'Sander van Doorn': MOOD_CATEGORIES.FIESTA,
  'Markus Schulz': MOOD_CATEGORIES.FIESTA,
  'Aly & Fila': MOOD_CATEGORIES.FIESTA,
  'Andrew Rayel': MOOD_CATEGORIES.FIESTA,
  'W&W': MOOD_CATEGORIES.FIESTA,
  'Dash Berlin': MOOD_CATEGORIES.FIESTA,
  'ATB': MOOD_CATEGORIES.FIESTA,
  'Paul Oakenfold': MOOD_CATEGORIES.FIESTA,
  'Cosmic Gate': MOOD_CATEGORIES.FIESTA,
  'Ørjan Nilsen': MOOD_CATEGORIES.FIESTA,
  'MaRLo': MOOD_CATEGORIES.FIESTA,
  'Ben Gold': MOOD_CATEGORIES.FIESTA,
  'John O\'Callaghan': MOOD_CATEGORIES.FIESTA,
  'Giuseppe Ottaviani': MOOD_CATEGORIES.FIESTA,
  'Simon Patterson': MOOD_CATEGORIES.FIESTA,
  'John Askew': MOOD_CATEGORIES.FIESTA,
  'Indecent Noise': MOOD_CATEGORIES.FIESTA,
  'Will Atkinson': MOOD_CATEGORIES.FIESTA,
  'Sneijder': MOOD_CATEGORIES.FIESTA,
  'Photographer': MOOD_CATEGORIES.FIESTA,
  'Alex M.O.R.P.H.': MOOD_CATEGORIES.FIESTA,
  'Bobina': MOOD_CATEGORIES.FIESTA,
  'Rank 1': MOOD_CATEGORIES.FIESTA,
  'Arty': MOOD_CATEGORIES.FIESTA,
  'Mat Zo': MOOD_CATEGORIES.FIESTA,
  'Porter Robinson': MOOD_CATEGORIES.FIESTA,
  'Madeon': MOOD_CATEGORIES.FIESTA,
  'Flume': MOOD_CATEGORIES.FIESTA,
  'ODESZA': MOOD_CATEGORIES.FIESTA,
  'Disclosure': MOOD_CATEGORIES.FIESTA,
  'RÜFÜS DU SOL': MOOD_CATEGORIES.FIESTA,
  'Lane 8': MOOD_CATEGORIES.FIESTA,
  'Yotto': MOOD_CATEGORIES.FIESTA,
  'Nora En Pure': MOOD_CATEGORIES.FIESTA,
  'Cristoph': MOOD_CATEGORIES.FIESTA,
  'Artbat': MOOD_CATEGORIES.FIESTA,
  'Stephan Bodzin': MOOD_CATEGORIES.FIESTA,
  'Tale Of Us': MOOD_CATEGORIES.FIESTA,
  'Adriatique': MOOD_CATEGORIES.FIESTA,
  'Maceo Plex': MOOD_CATEGORIES.FIESTA,
  'Hot Since 82': MOOD_CATEGORIES.FIESTA,
  'Jamie Jones': MOOD_CATEGORIES.FIESTA,
  'Green Velvet': MOOD_CATEGORIES.FIESTA,
  'Claude VonStroke': MOOD_CATEGORIES.FIESTA,
  'Fisher': MOOD_CATEGORIES.FIESTA,
  'Chris Lake': MOOD_CATEGORIES.FIESTA,

  // MOTIVADORA
  'Eminem': MOOD_CATEGORIES.MOTIVADORA,
  'Drake': MOOD_CATEGORIES.MOTIVADORA,
  'Kendrick Lamar': MOOD_CATEGORIES.MOTIVADORA,
  'Post Malone': MOOD_CATEGORIES.MOTIVADORA,
  'Travis Scott': MOOD_CATEGORIES.MOTIVADORA,
  'Queen': MOOD_CATEGORIES.MOTIVADORA,
  'AC/DC': MOOD_CATEGORIES.MOTIVADORA,
  'Linkin Park': MOOD_CATEGORIES.MOTIVADORA,
  'Imagine Dragons': MOOD_CATEGORIES.MOTIVADORA,
  'Fall Out Boy': MOOD_CATEGORIES.MOTIVADORA,
  'Panic! At The Disco': MOOD_CATEGORIES.MOTIVADORA,
  'Foo Fighters': MOOD_CATEGORIES.MOTIVADORA,
  'Green Day': MOOD_CATEGORIES.MOTIVADORA,
  'Jay-Z': MOOD_CATEGORIES.MOTIVADORA,
  'Kanye West': MOOD_CATEGORIES.MOTIVADORA,
  'The Notorious B.I.G.': MOOD_CATEGORIES.MOTIVADORA,
  '50 Cent': MOOD_CATEGORIES.MOTIVADORA,
  'Tupac': MOOD_CATEGORIES.MOTIVADORA,
  'Nas': MOOD_CATEGORIES.MOTIVADORA,
  'Ice Cube': MOOD_CATEGORIES.MOTIVADORA,
  'Snoop Dogg': MOOD_CATEGORIES.MOTIVADORA,
  'Dr. Dre': MOOD_CATEGORIES.MOTIVADORA,
  'Lil Wayne': MOOD_CATEGORIES.MOTIVADORA,
  'Future': MOOD_CATEGORIES.MOTIVADORA,
  'Migos': MOOD_CATEGORIES.MOTIVADORA,
  'Cardi B': MOOD_CATEGORIES.MOTIVADORA,
  'Nicki Minaj': MOOD_CATEGORIES.MOTIVADORA,
  'Megan Thee Stallion': MOOD_CATEGORIES.MOTIVADORA,
  'Led Zeppelin': MOOD_CATEGORIES.MOTIVADORA,
  'The Rolling Stones': MOOD_CATEGORIES.MOTIVADORA,
  'Guns N\' Roses': MOOD_CATEGORIES.MOTIVADORA,
  'Aerosmith': MOOD_CATEGORIES.MOTIVADORA,
  'Bon Jovi': MOOD_CATEGORIES.MOTIVADORA,
  'U2': MOOD_CATEGORIES.MOTIVADORA,
  'Coldplay': MOOD_CATEGORIES.MOTIVADORA,
  
  // MÁS HIP HOP Y RAP INTERNACIONAL
  'Lil Baby': MOOD_CATEGORIES.MOTIVADORA,
  'Lil Durk': MOOD_CATEGORIES.MOTIVADORA,
  'Polo G': MOOD_CATEGORIES.MOTIVADORA,
  'Pop Smoke': MOOD_CATEGORIES.MOTIVADORA,
  'Roddy Ricch': MOOD_CATEGORIES.MOTIVADORA,
  'DaBaby': MOOD_CATEGORIES.MOTIVADORA,
  'Lil Uzi Vert': MOOD_CATEGORIES.MOTIVADORA,
  'Playboi Carti': MOOD_CATEGORIES.MOTIVADORA,
  'Young Thug': MOOD_CATEGORIES.MOTIVADORA,
  'Gunna': MOOD_CATEGORIES.MOTIVADORA,
  'A$AP Rocky': MOOD_CATEGORIES.MOTIVADORA,
  'Tyler, The Creator': MOOD_CATEGORIES.MOTIVADORA,
  'J. Cole': MOOD_CATEGORIES.MOTIVADORA,
  'Big Sean': MOOD_CATEGORIES.MOTIVADORA,
  'Meek Mill': MOOD_CATEGORIES.MOTIVADORA,
  '21 Savage': MOOD_CATEGORIES.MOTIVADORA,
  'Offset': MOOD_CATEGORIES.MOTIVADORA,
  'Quavo': MOOD_CATEGORIES.MOTIVADORA,
  'Takeoff': MOOD_CATEGORIES.MOTIVADORA,
  'Lil Pump': MOOD_CATEGORIES.MOTIVADORA,
  '6ix9ine': MOOD_CATEGORIES.MOTIVADORA,
  'XXXTentacion': MOOD_CATEGORIES.MOTIVADORA,
  'Ski Mask The Slump God': MOOD_CATEGORIES.MOTIVADORA,
  'Denzel Curry': MOOD_CATEGORIES.MOTIVADORA,
  'JID': MOOD_CATEGORIES.MOTIVADORA,
  'Cordae': MOOD_CATEGORIES.MOTIVADORA,
  'Lil Tecca': MOOD_CATEGORIES.MOTIVADORA,
  'Juice WRLD': MOOD_CATEGORIES.MOTIVADORA,
  'The Kid LAROI': MOOD_CATEGORIES.MOTIVADORA,
  'Iann Dior': MOOD_CATEGORIES.MOTIVADORA,
  'Machine Gun Kelly': MOOD_CATEGORIES.MOTIVADORA,
  'Trippie Redd': MOOD_CATEGORIES.MOTIVADORA,

  // TRISTE
  'Adele': MOOD_CATEGORIES.TRISTE,
  'Sam Smith': MOOD_CATEGORIES.TRISTE,
  'Billie Eilish': MOOD_CATEGORIES.TRISTE,
  'Lana Del Rey': MOOD_CATEGORIES.TRISTE,
  'Sia': MOOD_CATEGORIES.TRISTE,
  'XXXTentacion': MOOD_CATEGORIES.TRISTE,
  'Juice WRLD': MOOD_CATEGORIES.TRISTE,
  'Mac Miller': MOOD_CATEGORIES.TRISTE,
  'Johnny Cash': MOOD_CATEGORIES.TRISTE,
  'Leonard Cohen': MOOD_CATEGORIES.TRISTE,
  'Radiohead': MOOD_CATEGORIES.TRISTE,
  'The National': MOOD_CATEGORIES.TRISTE,
  'Lorde': MOOD_CATEGORIES.TRISTE,
  'Hozier': MOOD_CATEGORIES.TRISTE,
  'James Blake': MOOD_CATEGORIES.TRISTE,
  'Frank Ocean': MOOD_CATEGORIES.TRISTE,
  'The 1975': MOOD_CATEGORIES.TRISTE,
  'Phoebe Bridgers': MOOD_CATEGORIES.TRISTE,
  'Clairo': MOOD_CATEGORIES.TRISTE,
  'Rex Orange County': MOOD_CATEGORIES.TRISTE,
  'Daniel Caesar': MOOD_CATEGORIES.TRISTE,
  'H.E.R.': MOOD_CATEGORIES.TRISTE,
  'SZA': MOOD_CATEGORIES.TRISTE,
  'The Weeknd': MOOD_CATEGORIES.TRISTE,
  'Khalid': MOOD_CATEGORIES.TRISTE,
  'Brent Favre': MOOD_CATEGORIES.TRISTE,
  'Summer Walker': MOOD_CATEGORIES.TRISTE,
  'Giveon': MOOD_CATEGORIES.TRISTE,
  'Bryson Tiller': MOOD_CATEGORIES.TRISTE,
  'Tory Lanez': MOOD_CATEGORIES.TRISTE,
  'PartyNextDoor': MOOD_CATEGORIES.TRISTE,
  '6LACK': MOOD_CATEGORIES.TRISTE,
  'Kali Uchis': MOOD_CATEGORIES.TRISTE,
  'Jorja Smith': MOOD_CATEGORIES.TRISTE,
  'Solange': MOOD_CATEGORIES.TRISTE,
  'FKA twigs': MOOD_CATEGORIES.TRISTE,
  'Kelela': MOOD_CATEGORIES.TRISTE,
  'Sade': MOOD_CATEGORIES.TRISTE,
  'Erykah Badu': MOOD_CATEGORIES.TRISTE,
  'Lauryn Hill': MOOD_CATEGORIES.TRISTE,
  'Alicia Keys': MOOD_CATEGORIES.TRISTE,
  
  // MÁS TRISTE - EMO, INDIE TRISTE, BALADAS
  'My Chemical Romance': MOOD_CATEGORIES.TRISTE,
  'Fall Out Boy': MOOD_CATEGORIES.TRISTE,
  'Panic! At The Disco': MOOD_CATEGORIES.TRISTE,
  'Paramore': MOOD_CATEGORIES.TRISTE,
  'Dashboard Confessional': MOOD_CATEGORIES.TRISTE,
  'Taking Back Sunday': MOOD_CATEGORIES.TRISTE,
  'Brand New': MOOD_CATEGORIES.TRISTE,
  'The Used': MOOD_CATEGORIES.TRISTE,
  'Hawthorne Heights': MOOD_CATEGORIES.TRISTE,
  'Senses Fail': MOOD_CATEGORIES.TRISTE,
  'Silverstein': MOOD_CATEGORIES.TRISTE,
  'Underoath': MOOD_CATEGORIES.TRISTE,
  'Thrice': MOOD_CATEGORIES.TRISTE,
  'Circa Survive': MOOD_CATEGORIES.TRISTE,
  'Coheed and Cambria': MOOD_CATEGORIES.TRISTE,
  'At the Drive-In': MOOD_CATEGORIES.TRISTE,
  'The Mars Volta': MOOD_CATEGORIES.TRISTE,
  'Thursday': MOOD_CATEGORIES.TRISTE,
  'Glassjaw': MOOD_CATEGORIES.TRISTE,
  'Saves the Day': MOOD_CATEGORIES.TRISTE,
  'Jimmy Eat World': MOOD_CATEGORIES.TRISTE,
  'The Get Up Kids': MOOD_CATEGORIES.TRISTE,
  'Hot Water Music': MOOD_CATEGORIES.TRISTE,
  'Alkaline Trio': MOOD_CATEGORIES.TRISTE,
  'The Lawrence Arms': MOOD_CATEGORIES.TRISTE,
  'The Menzingers': MOOD_CATEGORIES.TRISTE,
  'The Wonder Years': MOOD_CATEGORIES.TRISTE,
  'Modern Baseball': MOOD_CATEGORIES.TRISTE,
  'The Front Bottoms': MOOD_CATEGORIES.TRISTE,
  'McCafferty': MOOD_CATEGORIES.TRISTE,
  'Mom Jeans.': MOOD_CATEGORIES.TRISTE,
  'Prince Daddy & The Hyena': MOOD_CATEGORIES.TRISTE,
  'Origami Angel': MOOD_CATEGORIES.TRISTE,
  'Tiny Moving Parts': MOOD_CATEGORIES.TRISTE,
  'Turnover': MOOD_CATEGORIES.TRISTE,
  'Citizen': MOOD_CATEGORIES.TRISTE,
  'Balance and Composure': MOOD_CATEGORIES.TRISTE,
  'Title Fight': MOOD_CATEGORIES.TRISTE,
  'Basement': MOOD_CATEGORIES.TRISTE,
  'Sorority Noise': MOOD_CATEGORIES.TRISTE,
  'The Hotelier': MOOD_CATEGORIES.TRISTE,
  'Into It. Over It.': MOOD_CATEGORIES.TRISTE,
  'The World Is a Beautiful Place': MOOD_CATEGORIES.TRISTE,
  'Foxing': MOOD_CATEGORIES.TRISTE,
  'mewithoutYou': MOOD_CATEGORIES.TRISTE,
  'La Dispute': MOOD_CATEGORIES.TRISTE,
  'Touché Amoré': MOOD_CATEGORIES.TRISTE,
  'Pianos Become the Teeth': MOOD_CATEGORIES.TRISTE,
  
  // ARTISTAS DE TUS LOGS QUE FALTAN
  'Laufey': MOOD_CATEGORIES.RELAJADA,
  'Brray': MOOD_CATEGORIES.FIESTA,
  'Dei V': MOOD_CATEGORIES.FIESTA,
  'Fuerza Regida': MOOD_CATEGORIES.FIESTA,
  'Oscar Maydon': MOOD_CATEGORIES.FIESTA,
  'Eslabon Armado': MOOD_CATEGORIES.ROMANTICA,
  '2Pac': MOOD_CATEGORIES.MOTIVADORA,
  'Tupac': MOOD_CATEGORIES.MOTIVADORA,
  'KYLE': MOOD_CATEGORIES.FELIZ,
  'Fito Paez': MOOD_CATEGORIES.ROMANTICA,
  'JHAYCO': MOOD_CATEGORIES.FIESTA,
  'TV Girl': MOOD_CATEGORIES.MELANCOLICA,
  'Eladio Carrion': MOOD_CATEGORIES.FIESTA,
  'Steve Lacy': MOOD_CATEGORIES.RELAJADA,
  'Kidd Keo': MOOD_CATEGORIES.FIESTA,
  'Alex Rose': MOOD_CATEGORIES.FIESTA,
  'J Alvarez': MOOD_CATEGORIES.FIESTA,
  'Cosculluela': MOOD_CATEGORIES.FIESTA,
  'Cris MJ': MOOD_CATEGORIES.FIESTA,
  'Rels B': MOOD_CATEGORIES.FIESTA,
  'Rayo & Toby': MOOD_CATEGORIES.FIESTA,
  'Men I Trust': MOOD_CATEGORIES.RELAJADA,
  'Ñengo Flow': MOOD_CATEGORIES.FIESTA,
  '$uicideboy$': MOOD_CATEGORIES.OSCURA,
  'EDEN': MOOD_CATEGORIES.TRISTE,
  'Zarcort': MOOD_CATEGORIES.MOTIVADORA,
  'Hades66': MOOD_CATEGORIES.FIESTA,
  'Strawberry Guy': MOOD_CATEGORIES.RELAJADA,
  'Issac Delgado': MOOD_CATEGORIES.FIESTA,
  'Pedro Arroyo': MOOD_CATEGORIES.FIESTA,
  'G-Eazy': MOOD_CATEGORIES.MOTIVADORA,
  'Beéle': MOOD_CATEGORIES.FIESTA,
  'Gilberto Santa Rosa': MOOD_CATEGORIES.FIESTA,
  'Topboy TGR': MOOD_CATEGORIES.FIESTA,
  'Julio Jaramillo': MOOD_CATEGORIES.ROMANTICA,
  'Wallance': MOOD_CATEGORIES.FIESTA,
  'Lewis OfMan': MOOD_CATEGORIES.RELAJADA,
  'Forth Wanderers': MOOD_CATEGORIES.MELANCOLICA,
  'Frank Sark': MOOD_CATEGORIES.RELAJADA,
  'Buuoy': MOOD_CATEGORIES.RELAJADA,
  'Revol': MOOD_CATEGORIES.FIESTA,
  'førget.': MOOD_CATEGORIES.TRISTE,
  'alan vuong': MOOD_CATEGORIES.RELAJADA,
  'Clarent': MOOD_CATEGORIES.RELAJADA,
  'AWALL MUSIC UK': MOOD_CATEGORIES.MOTIVADORA,

  // ROMÁNTICA
  'John Legend': MOOD_CATEGORIES.ROMANTICA,
  'John Mayer': MOOD_CATEGORIES.ROMANTICA,
  'Norah Jones': MOOD_CATEGORIES.ROMANTICA,
  'Michael Bublé': MOOD_CATEGORIES.ROMANTICA,
  'Frank Sinatra': MOOD_CATEGORIES.ROMANTICA,
  'Amy Winehouse': MOOD_CATEGORIES.ROMANTICA,
  'Marvin Gaye': MOOD_CATEGORIES.ROMANTICA,
  'Al Green': MOOD_CATEGORIES.ROMANTICA,
  'Barry White': MOOD_CATEGORIES.ROMANTICA,
  'Romeo Santos': MOOD_CATEGORIES.ROMANTICA,
  'Prince Royce': MOOD_CATEGORIES.ROMANTICA,
  'Aventura': MOOD_CATEGORIES.ROMANTICA,
  'Marc Anthony': MOOD_CATEGORIES.ROMANTICA,
  'Luis Miguel': MOOD_CATEGORIES.ROMANTICA,
  'Ricardo Arjona': MOOD_CATEGORIES.ROMANTICA,
  'Jesse & Joy': MOOD_CATEGORIES.ROMANTICA,
  'Mau y Ricky': MOOD_CATEGORIES.ROMANTICA,
  'Camilo': MOOD_CATEGORIES.ROMANTICA,
  'Sebastián Yatra': MOOD_CATEGORIES.ROMANTICA,
  'Manuel Turizo': MOOD_CATEGORIES.ROMANTICA,
  'Reik': MOOD_CATEGORIES.ROMANTICA,
  'Sin Bandera': MOOD_CATEGORIES.ROMANTICA,
  'Maná': MOOD_CATEGORIES.ROMANTICA,
  'Carlos Vives': MOOD_CATEGORIES.ROMANTICA,
  'Julieta Venegas': MOOD_CATEGORIES.ROMANTICA,
  'Natalia Lafourcade': MOOD_CATEGORIES.ROMANTICA,
  'Mon Laferte': MOOD_CATEGORIES.ROMANTICA,
  'Álvaro Soler': MOOD_CATEGORIES.ROMANTICA,
  'Pablo Alborán': MOOD_CATEGORIES.ROMANTICA,
  'David Bisbal': MOOD_CATEGORIES.ROMANTICA,
  'Alejandro Sanz': MOOD_CATEGORIES.ROMANTICA,
  'Manu Chao': MOOD_CATEGORIES.ROMANTICA,
  'Jarabe de Palo': MOOD_CATEGORIES.ROMANTICA,
  'Ed Sheeran': MOOD_CATEGORIES.ROMANTICA,
  'Sam Smith': MOOD_CATEGORIES.ROMANTICA,
  'Adele': MOOD_CATEGORIES.ROMANTICA,
  'John Newman': MOOD_CATEGORIES.ROMANTICA,
  'James Arthur': MOOD_CATEGORIES.ROMANTICA,
  'Lewis Capaldi': MOOD_CATEGORIES.ROMANTICA,
  'Calum Scott': MOOD_CATEGORIES.ROMANTICA,
  'Dean Lewis': MOOD_CATEGORIES.ROMANTICA,
  'Bazzi': MOOD_CATEGORIES.ROMANTICA,
  'Lauv': MOOD_CATEGORIES.ROMANTICA,
  'Jeremy Zucker': MOOD_CATEGORIES.ROMANTICA,
  'Troye Sivan': MOOD_CATEGORIES.ROMANTICA,
  'Conan Gray': MOOD_CATEGORIES.ROMANTICA,
  'Shawn Mendes': MOOD_CATEGORIES.ROMANTICA,
  'Charlie Puth': MOOD_CATEGORIES.ROMANTICA,
  'Bruno Mars': MOOD_CATEGORIES.ROMANTICA,
  
  // MÁS ROMÁNTICA MASIVO - R&B, SOUL, INDIE ROMÁNTICO
  'The Weeknd': MOOD_CATEGORIES.ROMANTICA,
  'Frank Ocean': MOOD_CATEGORIES.ROMANTICA,
  'Daniel Caesar': MOOD_CATEGORIES.ROMANTICA,
  'H.E.R.': MOOD_CATEGORIES.ROMANTICA,
  'SZA': MOOD_CATEGORIES.ROMANTICA,
  'Khalid': MOOD_CATEGORIES.ROMANTICA,
  'Brent Favre': MOOD_CATEGORIES.ROMANTICA,
  'Summer Walker': MOOD_CATEGORIES.ROMANTICA,
  'Giveon': MOOD_CATEGORIES.ROMANTICA,
  'Bryson Tiller': MOOD_CATEGORIES.ROMANTICA,
  'Tory Lanez': MOOD_CATEGORIES.ROMANTICA,
  'PartyNextDoor': MOOD_CATEGORIES.ROMANTICA,
  '6LACK': MOOD_CATEGORIES.ROMANTICA,
  'Kali Uchis': MOOD_CATEGORIES.ROMANTICA,
  'Jorja Smith': MOOD_CATEGORIES.ROMANTICA,
  'Solange': MOOD_CATEGORIES.ROMANTICA,
  'FKA twigs': MOOD_CATEGORIES.ROMANTICA,
  'Kelela': MOOD_CATEGORIES.ROMANTICA,
  'Erykah Badu': MOOD_CATEGORIES.ROMANTICA,
  'Lauryn Hill': MOOD_CATEGORIES.ROMANTICA,
  'D\'Angelo': MOOD_CATEGORIES.ROMANTICA,
  'Maxwell': MOOD_CATEGORIES.ROMANTICA,
  'Usher': MOOD_CATEGORIES.ROMANTICA,
  'Chris Brown': MOOD_CATEGORIES.ROMANTICA,
  'Trey Songz': MOOD_CATEGORIES.ROMANTICA,
  'Mario': MOOD_CATEGORIES.ROMANTICA,
  'Omarr Rambert': MOOD_CATEGORIES.ROMANTICA,
  'Jeremih': MOOD_CATEGORIES.ROMANTICA,
  'Ty Dolla $ign': MOOD_CATEGORIES.ROMANTICA,
  'Kehlani': MOOD_CATEGORIES.ROMANTICA,
  'Jhené Aiko': MOOD_CATEGORIES.ROMANTICA,
  'Tinashe': MOOD_CATEGORIES.ROMANTICA,
  'Ella Mai': MOOD_CATEGORIES.ROMANTICA,
  'Ari Lennox': MOOD_CATEGORIES.ROMANTICA,
  'Lucky Daye': MOOD_CATEGORIES.ROMANTICA,
  'Masego': MOOD_CATEGORIES.ROMANTICA,
  'Anderson .Paak': MOOD_CATEGORIES.ROMANTICA,
  'Silk Sonic': MOOD_CATEGORIES.ROMANTICA,
  'John Legend': MOOD_CATEGORIES.ROMANTICA,
  'Alicia Keys': MOOD_CATEGORIES.ROMANTICA,
  
  // ROMÁNTICA LATINA EXPANDIDA
  'Jesse & Joy': MOOD_CATEGORIES.ROMANTICA,
  'Mau y Ricky': MOOD_CATEGORIES.ROMANTICA,
  'Camilo': MOOD_CATEGORIES.ROMANTICA,
  'Sebastián Yatra': MOOD_CATEGORIES.ROMANTICA,
  'Manuel Turizo': MOOD_CATEGORIES.ROMANTICA,
  'Reik': MOOD_CATEGORIES.ROMANTICA,
  'Sin Bandera': MOOD_CATEGORIES.ROMANTICA,
  'Maná': MOOD_CATEGORIES.ROMANTICA,
  'Carlos Vives': MOOD_CATEGORIES.ROMANTICA,
  'Julieta Venegas': MOOD_CATEGORIES.ROMANTICA,
  'Natalia Lafourcade': MOOD_CATEGORIES.ROMANTICA,
  'Mon Laferte': MOOD_CATEGORIES.ROMANTICA,
  'Álvaro Soler': MOOD_CATEGORIES.ROMANTICA,
  'Pablo Alborán': MOOD_CATEGORIES.ROMANTICA,
  'David Bisbal': MOOD_CATEGORIES.ROMANTICA,
  'Alejandro Sanz': MOOD_CATEGORIES.ROMANTICA,
  'Manu Chao': MOOD_CATEGORIES.ROMANTICA,
  'Jarabe de Palo': MOOD_CATEGORIES.ROMANTICA,
  'Estopa': MOOD_CATEGORIES.ROMANTICA,
  'Melendi': MOOD_CATEGORIES.ROMANTICA,
  'Vanesa Martín': MOOD_CATEGORIES.ROMANTICA,
  'India Martínez': MOOD_CATEGORIES.ROMANTICA,
  'Antonio Orozco': MOOD_CATEGORIES.ROMANTICA,
  'Manuel Carrasco': MOOD_CATEGORIES.ROMANTICA,
  'Malú': MOOD_CATEGORIES.ROMANTICA,
  'Pastora Soler': MOOD_CATEGORIES.ROMANTICA,
  'Diana Navarro': MOOD_CATEGORIES.ROMANTICA,

  // RELAJADA
  'Bon Iver': MOOD_CATEGORIES.RELAJADA,
  'Sufjan Stevens': MOOD_CATEGORIES.RELAJADA,
  'Iron & Wine': MOOD_CATEGORIES.RELAJADA,
  'The Paper Kites': MOOD_CATEGORIES.RELAJADA,
  'Daughter': MOOD_CATEGORIES.RELAJADA,
  'Ólafur Arnalds': MOOD_CATEGORIES.RELAJADA,
  'Ludovico Einaudi': MOOD_CATEGORIES.RELAJADA,
  'Max Richter': MOOD_CATEGORIES.RELAJADA,
  'Nils Frahm': MOOD_CATEGORIES.RELAJADA,
  'Kiasmos': MOOD_CATEGORIES.RELAJADA,
  'Bonobo': MOOD_CATEGORIES.RELAJADA,
  'Tycho': MOOD_CATEGORIES.RELAJADA,
  'Emancipator': MOOD_CATEGORIES.RELAJADA,
  
  // MÁS RELAJADA - AMBIENT, JAZZ, CLÁSICA, CHILL
  'Brian Eno': MOOD_CATEGORIES.RELAJADA,
  'Stars of the Lid': MOOD_CATEGORIES.RELAJADA,
  'Tim Hecker': MOOD_CATEGORIES.RELAJADA,
  'William Basinski': MOOD_CATEGORIES.RELAJADA,
  'Eluvium': MOOD_CATEGORIES.RELAJADA,
  'Grouper': MOOD_CATEGORIES.RELAJADA,
  'Julianna Barwick': MOOD_CATEGORIES.RELAJADA,
  'Loscil': MOOD_CATEGORIES.RELAJADA,
  'Biosphere': MOOD_CATEGORIES.RELAJADA,
  'Aphex Twin': MOOD_CATEGORIES.RELAJADA,
  'Boards of Canada': MOOD_CATEGORIES.RELAJADA,
  'Autechre': MOOD_CATEGORIES.RELAJADA,
  'Squarepusher': MOOD_CATEGORIES.RELAJADA,
  'Four Tet': MOOD_CATEGORIES.RELAJADA,
  'Caribou': MOOD_CATEGORIES.RELAJADA,
  'Floating Points': MOOD_CATEGORIES.RELAJADA,
  'Kiara Scuro': MOOD_CATEGORIES.RELAJADA,
  'Rival Consoles': MOOD_CATEGORIES.RELAJADA,
  'Kelly Lee Owens': MOOD_CATEGORIES.RELAJADA,
  'Actress': MOOD_CATEGORIES.RELAJADA,
  'Ben Frost': MOOD_CATEGORIES.RELAJADA,
  'Fennesz': MOOD_CATEGORIES.RELAJADA,
  'Tim Hecker': MOOD_CATEGORIES.RELAJADA,
  'Lorn': MOOD_CATEGORIES.RELAJADA,
  'Burial': MOOD_CATEGORIES.RELAJADA,
  'James Blake': MOOD_CATEGORIES.RELAJADA,
  'SBTRKT': MOOD_CATEGORIES.RELAJADA,
  'Mount Kimbie': MOOD_CATEGORIES.RELAJADA,
  'Darkside': MOOD_CATEGORIES.RELAJADA,
  'Nicolas Jaar': MOOD_CATEGORIES.RELAJADA,
  'Thom Yorke': MOOD_CATEGORIES.RELAJADA,
  'Jonny Greenwood': MOOD_CATEGORIES.RELAJADA,
  'Radiohead': MOOD_CATEGORIES.RELAJADA,
  'Atoms for Peace': MOOD_CATEGORIES.RELAJADA,
  'The Smile': MOOD_CATEGORIES.RELAJADA,
  
  // JAZZ Y CLÁSICA
  'Miles Davis': MOOD_CATEGORIES.RELAJADA,
  'John Coltrane': MOOD_CATEGORIES.RELAJADA,
  'Bill Evans': MOOD_CATEGORIES.RELAJADA,
  'Keith Jarrett': MOOD_CATEGORIES.RELAJADA,
  'Brad Mehldau': MOOD_CATEGORIES.RELAJADA,
  'Esbjörn Svensson Trio': MOOD_CATEGORIES.RELAJADA,
  'GoGo Penguin': MOOD_CATEGORIES.RELAJADA,
  'Kamasi Washington': MOOD_CATEGORIES.RELAJADA,
  'Robert Glasper': MOOD_CATEGORIES.RELAJADA,
  'Esperanza Spalding': MOOD_CATEGORIES.RELAJADA,
  'Snarky Puppy': MOOD_CATEGORIES.RELAJADA,
  'Yussef Kamaal': MOOD_CATEGORIES.RELAJADA,
  'Alfa Mist': MOOD_CATEGORIES.RELAJADA,
  'Tom Misch': MOOD_CATEGORIES.RELAJADA,
  'FKJ': MOOD_CATEGORIES.RELAJADA,
  'Anomalie': MOOD_CATEGORIES.RELAJADA,
  'Jordan Rakei': MOOD_CATEGORIES.RELAJADA,
  'Hiatus Kaiyote': MOOD_CATEGORIES.RELAJADA,

  // OSCURA
  'Nine Inch Nails': MOOD_CATEGORIES.OSCURA,
  'Tool': MOOD_CATEGORIES.OSCURA,
  'Metallica': MOOD_CATEGORIES.OSCURA,
  'Black Sabbath': MOOD_CATEGORIES.OSCURA,
  'Marilyn Manson': MOOD_CATEGORIES.OSCURA,
  'Rob Zombie': MOOD_CATEGORIES.OSCURA,
  'Rammstein': MOOD_CATEGORIES.OSCURA,
  'System of a Down': MOOD_CATEGORIES.OSCURA,
  'Korn': MOOD_CATEGORIES.OSCURA,
  'Slipknot': MOOD_CATEGORIES.OSCURA,
  'Disturbed': MOOD_CATEGORIES.OSCURA,
  'Alice in Chains': MOOD_CATEGORIES.OSCURA,
  'Soundgarden': MOOD_CATEGORIES.OSCURA,
  'Pearl Jam': MOOD_CATEGORIES.OSCURA,
  'Megadeth': MOOD_CATEGORIES.OSCURA,
  'Iron Maiden': MOOD_CATEGORIES.OSCURA,
  'Judas Priest': MOOD_CATEGORIES.OSCURA,
  'Pantera': MOOD_CATEGORIES.OSCURA,
  'Sepultura': MOOD_CATEGORIES.OSCURA,
  'Cradle of Filth': MOOD_CATEGORIES.OSCURA,
  'Dimmu Borgir': MOOD_CATEGORIES.OSCURA,
  'Behemoth': MOOD_CATEGORIES.OSCURA,
  'Mayhem': MOOD_CATEGORIES.OSCURA,
  'Emperor': MOOD_CATEGORIES.OSCURA,
  'Burzum': MOOD_CATEGORIES.OSCURA,
  'Darkthrone': MOOD_CATEGORIES.OSCURA,
  'Bathory': MOOD_CATEGORIES.OSCURA,
  'Venom': MOOD_CATEGORIES.OSCURA,
  'Celtic Frost': MOOD_CATEGORIES.OSCURA,
  'Type O Negative': MOOD_CATEGORIES.OSCURA,
  'Ministry': MOOD_CATEGORIES.OSCURA,
  'White Zombie': MOOD_CATEGORIES.OSCURA,
  'Fear Factory': MOOD_CATEGORIES.OSCURA,
  'Godflesh': MOOD_CATEGORIES.OSCURA,

  // MELANCÓLICA
  'Radiohead': MOOD_CATEGORIES.MELANCOLICA,
  'Pink Floyd': MOOD_CATEGORIES.MELANCOLICA,
  'The Smiths': MOOD_CATEGORIES.MELANCOLICA,
  'Joy Division': MOOD_CATEGORIES.MELANCOLICA,
  'The Cure': MOOD_CATEGORIES.MELANCOLICA,
  'Depeche Mode': MOOD_CATEGORIES.MELANCOLICA,
  'Portishead': MOOD_CATEGORIES.MELANCOLICA,
  'Massive Attack': MOOD_CATEGORIES.MELANCOLICA,
  'Thom Yorke': MOOD_CATEGORIES.MELANCOLICA,
  'Sigur Rós': MOOD_CATEGORIES.MELANCOLICA,
  'Godspeed You! Black Emperor': MOOD_CATEGORIES.MELANCOLICA,
  'Swans': MOOD_CATEGORIES.MELANCOLICA,
  'Nick Cave': MOOD_CATEGORIES.MELANCOLICA,
  'Interpol': MOOD_CATEGORIES.MELANCOLICA,
  'The National': MOOD_CATEGORIES.MELANCOLICA,
  'Arcade Fire': MOOD_CATEGORIES.MELANCOLICA,
  'Modest Mouse': MOOD_CATEGORIES.MELANCOLICA,
  'Built to Spill': MOOD_CATEGORIES.MELANCOLICA,
  'Pavement': MOOD_CATEGORIES.MELANCOLICA,
  'Sonic Youth': MOOD_CATEGORIES.MELANCOLICA,
  'My Bloody Valentine': MOOD_CATEGORIES.MELANCOLICA,
  'Slowdive': MOOD_CATEGORIES.MELANCOLICA,
  'Ride': MOOD_CATEGORIES.MELANCOLICA,
  'Shoegaze': MOOD_CATEGORIES.MELANCOLICA,
  'Cocteau Twins': MOOD_CATEGORIES.MELANCOLICA,
  'Dead Can Dance': MOOD_CATEGORIES.MELANCOLICA,
  'This Mortal Coil': MOOD_CATEGORIES.MELANCOLICA,
  'Mazzy Star': MOOD_CATEGORIES.MELANCOLICA,
  'Galaxy 500': MOOD_CATEGORIES.MELANCOLICA,
  'Galaxie 500': MOOD_CATEGORIES.MELANCOLICA,
  'Low': MOOD_CATEGORIES.MELANCOLICA,
  'Red House Painters': MOOD_CATEGORIES.MELANCOLICA,
  'Sun Kil Moon': MOOD_CATEGORIES.MELANCOLICA,
  'Mark Kozelek': MOOD_CATEGORIES.MELANCOLICA,
  'American Football': MOOD_CATEGORIES.MELANCOLICA,
  'Mineral': MOOD_CATEGORIES.MELANCOLICA,
  'Cap\'n Jazz': MOOD_CATEGORIES.MELANCOLICA,
  'Sunny Day Real Estate': MOOD_CATEGORIES.MELANCOLICA
};

// Patrones de géneros musicales para clasificación automática
const GENRE_PATTERNS = {
  // Reggaeton y urbano latino
  reggaeton: {
    keywords: ['reggaeton', 'perreo', 'dembow', 'urbano', 'trap latino', 'latin trap'],
    mood: MOOD_CATEGORIES.FIESTA
  },
  // Géneros latinos bailables
  salsa: {
    keywords: ['salsa', 'mambo', 'son', 'merengue', 'cumbia', 'vallenato'],
    mood: MOOD_CATEGORIES.FIESTA
  },
  // Géneros románticos latinos
  bachata: {
    keywords: ['bachata', 'bolero', 'balada', 'balada pop'],
    mood: MOOD_CATEGORIES.ROMANTICA
  },
  // Rock y metal
  rock: {
    keywords: ['rock', 'metal', 'punk', 'grunge', 'hardcore', 'metalcore', 'hard rock', 'heavy metal'],
    mood: MOOD_CATEGORIES.MOTIVADORA
  },
  // Pop comercial
  pop: {
    keywords: ['pop', 'dance pop', 'electropop', 'synth pop', 'teen pop'],
    mood: MOOD_CATEGORIES.FELIZ
  },
  // Hip hop y rap
  rap: {
    keywords: ['rap', 'hip hop', 'hip-hop', 'trap', 'drill', 'grime', 'freestyle'],
    mood: MOOD_CATEGORIES.MOTIVADORA
  },
  // Música electrónica bailable
  electronic: {
    keywords: ['electronic', 'edm', 'house', 'techno', 'trance', 'dubstep', 'bass', 'progressive house', 'deep house'],
    mood: MOOD_CATEGORIES.FIESTA
  },
  // Géneros relajados
  jazz: {
    keywords: ['jazz', 'blues', 'swing', 'smooth jazz', 'neo soul'],
    mood: MOOD_CATEGORIES.RELAJADA
  },
  classical: {
    keywords: ['classical', 'orchestra', 'symphony', 'piano', 'violin', 'opera', 'chamber'],
    mood: MOOD_CATEGORIES.RELAJADA
  },
  ambient: {
    keywords: ['ambient', 'chillout', 'downtempo', 'lounge', 'new age'],
    mood: MOOD_CATEGORIES.RELAJADA
  },
  // Géneros melancólicos
  indie: {
    keywords: ['indie', 'alternative', 'folk', 'indie rock', 'indie pop', 'shoegaze'],
    mood: MOOD_CATEGORIES.MELANCOLICA
  },
  // Géneros tristes
  emo: {
    keywords: ['emo', 'post-rock', 'slowcore', 'sad rap'],
    mood: MOOD_CATEGORIES.TRISTE
  },
  // Géneros oscuros
  dark: {
    keywords: ['black metal', 'death metal', 'doom', 'gothic', 'dark ambient', 'industrial'],
    mood: MOOD_CATEGORIES.OSCURA
  }
};

/**
 * Clasifica un artista basado en la base de datos o patrones
 */
function classifyArtist(artistName) {
  // 1. Buscar en la base de datos exacta
  if (ARTIST_MOOD_DATABASE[artistName]) {
    return {
      mood: ARTIST_MOOD_DATABASE[artistName],
      method: 'database',
      confidence: 1.0
    };
  }

  // 2. Buscar coincidencias parciales (útil para featuring)
  const lowerArtist = artistName.toLowerCase();
  for (const [dbArtist, mood] of Object.entries(ARTIST_MOOD_DATABASE)) {
    if (lowerArtist.includes(dbArtist.toLowerCase()) || 
        dbArtist.toLowerCase().includes(lowerArtist)) {
      return {
        mood: mood,
        method: 'partial_match',
        confidence: 0.8
      };
    }
  }

  // 3. Clasificar por patrones de género (si el nombre del artista contiene pistas)
  for (const [genre, pattern] of Object.entries(GENRE_PATTERNS)) {
    for (const keyword of pattern.keywords) {
      if (lowerArtist.includes(keyword)) {
        return {
          mood: pattern.mood,
          method: 'genre_pattern',
          confidence: 0.6
        };
      }
    }
  }

  // 4. Patrones por sufijos y prefijos comunes
  const lowerName = artistName.toLowerCase();
  
  // Patrones de reggaeton/trap latino
  if (lowerName.includes('lil ') || lowerName.includes('young ') || 
      lowerName.includes('big ') || lowerName.includes('el ') || 
      lowerName.includes('la ') || lowerName.includes('los ') ||
      lowerName.includes('mc ') || lowerName.includes('dj ')) {
    return {
      mood: MOOD_CATEGORIES.FIESTA,
      method: 'name_pattern',
      confidence: 0.5
    };
  }
  
  // Patrones de rock/metal
  if (lowerName.includes('death') || lowerName.includes('black') ||
      lowerName.includes('iron') || lowerName.includes('fire') ||
      lowerName.includes('blood') || lowerName.includes('dark') ||
      lowerName.includes('metal') || lowerName.includes('steel')) {
    return {
      mood: MOOD_CATEGORIES.OSCURA,
      method: 'name_pattern',
      confidence: 0.6
    };
  }
  
  // Patrones de DJ/Electronic
  if (lowerName.startsWith('dj ') || lowerName.includes('electronic') ||
      lowerName.includes('beats') || lowerName.includes('sound')) {
    return {
      mood: MOOD_CATEGORIES.FIESTA,
      method: 'name_pattern',
      confidence: 0.6
    };
  }
  
  // 5. Clasificación por origen/idioma
  const spanishPattern = /[ñáéíóúü]/i;
  if (spanishPattern.test(artistName)) {
    return {
      mood: MOOD_CATEGORIES.FIESTA,
      method: 'language_pattern',
      confidence: 0.4
    };
  }
  
  // Nombres que suenan a artistas indie/alternativos
  if (lowerName.includes('the ') && lowerName.length > 10) {
    return {
      mood: MOOD_CATEGORIES.MELANCOLICA,
      method: 'indie_pattern',
      confidence: 0.3
    };
  }

  // 5. Sin clasificar - mejor ser honesto que inventar
  return {
    mood: MOOD_CATEGORIES.SIN_CLASIFICAR,
    method: 'unclassified',
    confidence: 0.0
  };
}

/**
 * Extrae artistas únicos y los clasifica usando la base de datos gratuita
 */
export function classifyTracksByArtistFree(tracks) {
  console.log('🆓 Using free artist classification...');
  
  const artistMoods = {};
  const trackClassifications = {};
  const moodCounts = {};
  const classificationDetails = {};
  
  // Inicializar contadores
  Object.values(MOOD_CATEGORIES).forEach(mood => {
    moodCounts[mood] = 0;
  });
  
  // Extraer artistas únicos
  const uniqueArtists = [...new Set(tracks.map(track => track.artist.trim()))];
  console.log(`🎤 Found ${uniqueArtists.length} unique artists`);
  
  // Clasificar cada artista
  uniqueArtists.forEach(artist => {
    const classification = classifyArtist(artist);
    artistMoods[artist] = classification.mood;
    classificationDetails[artist] = classification;
    
    console.log(`🎭 ${artist} -> ${classification.mood} (${classification.method}, confidence: ${classification.confidence})`);
  });
  
  // Aplicar clasificación a todas las canciones
  tracks.forEach(track => {
    const artist = track.artist.trim();
    const mood = artistMoods[artist];
    
    if (mood) {
      trackClassifications[track.id] = mood;
      moodCounts[mood]++;
    }
  });
  
  // Calcular estadísticas
  const totalClassified = Object.keys(trackClassifications).length;
  const moodPercentages = {};
  Object.entries(moodCounts).forEach(([mood, count]) => {
    moodPercentages[mood] = totalClassified > 0 ? (count / totalClassified) * 100 : 0;
  });
  
  const statistics = {
    moodCounts,
    moodPercentages,
    totalClassified,
    totalTracks: tracks.length
  };
  
  console.log('🎯 Free classification completed:', {
    totalArtists: uniqueArtists.length,
    totalClassified,
    moodCounts
  });
  
  return {
    classifications: trackClassifications,
    statistics,
    artistMoods,
    classificationDetails,
    method: 'free_database'
  };
}
