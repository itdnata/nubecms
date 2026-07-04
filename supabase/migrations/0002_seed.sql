-- ============================================================
-- Seed — contenido original del mockup "A vuelo de nube"
-- Idempotente: limpia y recarga el contenido curado.
-- (No borra letters enviadas por usuarios ni course_signups.)
-- ============================================================

truncate table public.posts, public.reviews, public.notes, public.courses restart identity cascade;
delete from public.letters where file_name is not null or is_new = false;

-- ---------- posts ----------
insert into public.posts
  (slug, seq, kicker, category, title, title_highlight, dek, subtitle, reading_time, cover_caption, tags, body, published_at, sort_order)
values
(
  'por-que-no-podemos-dejar-de-mirar-las-nubes', '01', 'Ensayo · Cielo', 'Cielo',
  'Por qué no podemos dejar de mirar las nubes', 'nubes',
  'Un pasatiempo tan viejo como la humanidad y, felizmente, tan inútil como necesario. Notas sobre la contemplación y las formas que inventamos en el cielo.',
  'Un pasatiempo tan viejo como la humanidad y, felizmente, tan inútil como necesario.',
  '12 min', 'Cirros sobre la sabana, una tarde cualquiera.',
  array['cielo','contemplación','ocio'],
  $json$[
    {"type":"p","drop":true,"text":"Hay una forma de ociosidad que no da vergüenza confesar: quedarse mirando el cielo. No con un telescopio ni con propósito científico alguno, sino con esa atención distraída del que espera que algo pase sin saber muy bien qué. Las nubes son el último espectáculo gratuito que nos queda, y quizá por eso las miramos tan poco."},
    {"type":"p","text":"Durante siglos fueron un lenguaje. Los marineros leían en ellas la tormenta que venía; los campesinos, la lluvia que salvaba la cosecha. Hoy, con el pronóstico en el bolsillo, hemos perdido la necesidad de interpretarlas, y con ella, casi, la costumbre de levantar la cabeza."},
    {"type":"quote","text":"Mirar nubes es la única actividad en la que estar perdiendo el tiempo es exactamente el punto.","cite":"— A vuelo de nube"},
    {"type":"p","text":"En 1802 un boticario inglés llamado Luke Howard hizo algo casi absurdo: les puso nombre. Cúmulos, estratos, cirros. Nombrar lo que cambia de forma cada minuto parecía un despropósito, y sin embargo aquellas palabras en latín le dieron al cielo una gramática."},
    {"type":"h2","text":"El arte de no hacer nada"},
    {"type":"p","text":"Lo que de verdad ofrece una nube no es su forma, sino el permiso. El permiso para no ser productivo, para dejar que la mente divague, para reconocer en un montón de vapor de agua un dragón, un rostro conocido, un continente que no existe. Los psicólogos lo llaman pareidolia; los niños, simplemente, jugar."},
    {"type":"p","text":"Tal vez ahí esté la lección menor y verdadera de este pasatiempo: que hay cosas que solo aparecen cuando dejamos de buscarlas. La calma llega, si llega, cuando por fin miramos hacia arriba y no esperamos nada."},
    {"type":"end"}
  ]$json$::jsonb,
  '2026-07-02', 1
),
(
  'el-elogio-de-perderse-en-una-ciudad-conocida', '02', 'Ensayo · Ciudad', 'Ciudad',
  'El elogio de perderse en una ciudad conocida', 'perderse',
  'Sobre el arte casi extinto de caminar sin destino ni mapa, y lo que aparece cuando dejamos de saber exactamente dónde estamos.',
  'Sobre el arte casi extinto de caminar sin destino ni mapa.',
  '8 min', 'Una esquina cualquiera, a la hora en que cambia la luz.',
  array['ciudad','caminar','deriva'],
  $json$[
    {"type":"p","drop":true,"text":"Sobre el arte casi extinto de caminar sin destino ni mapa, y lo que aparece cuando dejamos de saber exactamente dónde estamos. Hay ciudades que creemos conocer de memoria hasta que, un día, doblamos por la calle equivocada y todo vuelve a ser nuevo."},
    {"type":"p","text":"Perderse a propósito es un lujo moderno. Basta guardar el teléfono en el bolsillo y decidir que ninguna esquina es un error, sino una invitación. La ciudad, entonces, deja de ser un trayecto y vuelve a ser un lugar."},
    {"type":"quote","text":"Caminar sin rumbo es la forma más honesta de dejar que una ciudad te cuente lo que no sabías preguntar.","cite":"— A vuelo de nube"},
    {"type":"h2","text":"La deriva como método"},
    {"type":"p","text":"Los situacionistas la llamaron dérive: dejarse llevar por las pendientes del terreno y los encuentros. No hace falta teoría para practicarla; basta una tarde libre y la disposición a llegar tarde a todo."},
    {"type":"end"}
  ]$json$::jsonb,
  '2026-06-20', 2
),
(
  'la-biblioteca-de-los-libros-que-nunca-termine', '03', 'Ensayo · Lecturas', 'Lecturas',
  'La biblioteca de los libros que nunca terminé', 'nunca terminé',
  'Una defensa apasionada, y algo culpable, del abandono lector. En elogio de las lecturas interrumpidas y las que nos leen a nosotros.',
  'Una defensa apasionada, y algo culpable, del abandono lector.',
  '6 min', 'La pila de la mesa de noche, siempre creciendo.',
  array['lecturas','libros','hábitos'],
  $json$[
    {"type":"p","drop":true,"text":"Una defensa apasionada, y algo culpable, del abandono lector. Hay una estantería secreta en cada casa: la de los libros que empezamos y no terminamos, y que sin embargo nos acompañan como deudas amables."},
    {"type":"p","text":"Abandonar un libro no siempre es un fracaso. A veces es un acto de honestidad: reconocer que ese texto y uno no coincidieron esta vez, y dejar la puerta abierta para otra."},
    {"type":"quote","text":"Los libros que no terminamos también nos leen: dicen quiénes fuimos el día que los dejamos.","cite":"— A vuelo de nube"},
    {"type":"h2","text":"En elogio de la interrupción"},
    {"type":"p","text":"La lectura interrumpida tiene su propia forma de fidelidad. Volvemos, releemos, cambiamos. Un libro paciente espera; y cuando por fin lo terminamos, ya somos otros lectores."},
    {"type":"end"}
  ]$json$::jsonb,
  '2026-06-05', 3
),
(
  'contra-el-reloj-en-defensa-de-llegar-tarde', '04', 'Ensayo · Tiempo', 'Tiempo',
  'Contra el reloj: en defensa de llegar tarde', 'llegar tarde',
  'Pequeña herejía sobre la puntualidad y sus tiranías cotidianas. Una invitación a devolverle al tiempo su elasticidad perdida.',
  'Pequeña herejía sobre la puntualidad y sus tiranías cotidianas.',
  '7 min', 'Un reloj de estación, detenido a las tres y diez.',
  array['tiempo','puntualidad','calma'],
  $json$[
    {"type":"p","drop":true,"text":"Pequeña herejía sobre la puntualidad y sus tiranías cotidianas. Llegar tarde tiene mala prensa, pero pocas cosas revelan tanto sobre una época como su relación con el reloj."},
    {"type":"p","text":"La puntualidad industrial nos enseñó a medir la vida en fracciones exactas. Ganamos precisión y perdimos elasticidad: la tarde que se estira, la conversación que no termina, la espera que también es parte de la cita."},
    {"type":"quote","text":"Devolverle al tiempo su elasticidad es recordar que no todo lo importante cabe en una agenda.","cite":"— A vuelo de nube"},
    {"type":"h2","text":"El elogio de la demora"},
    {"type":"p","text":"No se trata de hacer esperar a los demás, sino de recuperar un tiempo que no sea solo productivo. Llegar tarde, a veces, es llegar por fin a uno mismo."},
    {"type":"end"}
  ]$json$::jsonb,
  '2026-05-22', 4
);

-- ---------- reviews ----------
insert into public.reviews (tag, title, note, sort_order) values
('Cine',   '«Stalker», de Tarkovski',        'Tres hombres, una Zona prohibida y la paciencia entendida como una forma de fe. Cine para ver con el reloj apagado.', 1),
('Libro',  '«El infinito en un junco»',      'La historia del libro contada como una novela de aventuras. Se lee con hambre y se termina queriendo empezar de nuevo.', 2),
('Música', '«Pink Moon», de Nick Drake',     'Veintiocho minutos de guitarra y voz que caben enteros en una madrugada. Frágil, exacto, inagotable.', 3);

-- ---------- notes ----------
insert into public.notes (num, text, sort_order) values
('01', 'Los pulpos tienen tres corazones y la sangre azul.', 1),
('02', '«Petricor» es el nombre del olor de la lluvia sobre la tierra seca.', 2),
('03', 'En japonés, «komorebi» es la luz del sol filtrada entre las hojas.', 3),
('04', 'Groenlandia parece enorme en los mapas por culpa de Mercator.', 4);

-- ---------- courses ----------
insert into public.courses (slug, tag, title, note, schedule, lead, body, temario, ficha, sort_order) values
(
  'los-raros', 'Club de lectura', 'Los raros',
  'Un encuentro mensual para leer autores olvidados y libros que nadie recomienda. Sin tareas, sin resúmenes: solo conversar.',
  'Mensual · 1er jueves',
  'Un club para leer lo que casi nadie lee: raros, malditos y olvidados. Nos vemos una vez al mes, sin obligación de terminar el libro.',
  $json$[
    {"t":"Cada mes elegimos entre todos un autor difícil de encontrar en las mesas de novedades. No hay ponencias ni exposiciones: nos sentamos en círculo, alguien lee un pasaje en voz alta y de ahí sale la conversación."},
    {"t":"La idea no es entender del todo, sino acompañarnos en el desconcierto. Se puede llegar sin haber terminado —o sin haber empezado— el libro del mes."}
  ]$json$::jsonb,
  $json$[
    {"n":"01","t":"Presentación del autor del mes y reparto de pasajes."},
    {"n":"02","t":"Lectura en voz alta y primeras impresiones."},
    {"n":"03","t":"Conversación abierta, sin moderador fijo."},
    {"n":"04","t":"Propuestas para el siguiente encuentro."}
  ]$json$::jsonb,
  $json$[
    {"k":"Modalidad","v":"Presencial"},
    {"k":"Frecuencia","v":"Mensual"},
    {"k":"Día","v":"1er jueves"},
    {"k":"Cupo","v":"12 personas"},
    {"k":"Precio","v":"Gratuito"}
  ]$json$::jsonb,
  1
),
(
  'escribir-lo-cotidiano', 'Taller', 'Escribir lo cotidiano',
  'Seis sesiones en línea para encontrar ensayos en lo que pasa cada día. Leemos, escribimos y nos leemos en voz alta.',
  '6 sesiones · Online',
  'Un taller para descubrir que lo cotidiano está lleno de ensayos esperando ser escritos. Seis sesiones en línea, mucha escritura y lecturas compartidas.',
  $json$[
    {"t":"Partimos de lo que tenemos más cerca —una rutina, un objeto, una manía— y aprendemos a mirarlo hasta que revela algo. Cada semana escribimos un texto breve y lo leemos en voz alta al grupo."},
    {"t":"Leeremos también ensayistas que hicieron de lo pequeño su materia. El taller es práctico: se escribe todas las semanas y se recibe lectura atenta."}
  ]$json$::jsonb,
  $json$[
    {"n":"01","t":"El detalle: mirar lo que damos por sentado."},
    {"n":"02","t":"La voz: cómo suena lo que escribes."},
    {"n":"03","t":"La digresión como método."},
    {"n":"04","t":"Del apunte al texto: estructura."},
    {"n":"05","t":"Edición y recorte en compañía."},
    {"n":"06","t":"Lectura final y cierre."}
  ]$json$::jsonb,
  $json$[
    {"k":"Modalidad","v":"Online"},
    {"k":"Duración","v":"6 sesiones"},
    {"k":"Sesión","v":"90 min"},
    {"k":"Cupo","v":"10 personas"},
    {"k":"Precio","v":"$120.000"}
  ]$json$::jsonb,
  2
),
(
  'poesia-en-voz-alta', 'Círculo', 'Poesía en voz alta',
  'Nos juntamos a leer poemas sin analizarlos, solo por el gusto de oírlos. Trae uno que te haya movido algo.',
  'Quincenal · Sábados',
  'Un círculo para leer poesía en voz alta sin analizarla. Solo el gusto de oírla y de compartir un poema que te haya movido algo.',
  $json$[
    {"t":"No hay análisis ni interpretación obligatoria: cada quien trae un poema y lo lee. A veces hablamos de por qué lo elegimos; a veces simplemente escuchamos el siguiente."},
    {"t":"Es un espacio pensado para reconciliarse con la poesía, especialmente si el colegio te la hizo antipática. Se vale traer poemas propios."}
  ]$json$::jsonb,
  $json$[
    {"n":"01","t":"Ronda de poemas elegidos por cada persona."},
    {"n":"02","t":"Lectura en voz alta, una y otra vez."},
    {"n":"03","t":"Conversación breve y libre."},
    {"n":"04","t":"Poema sorpresa para cerrar."}
  ]$json$::jsonb,
  $json$[
    {"k":"Modalidad","v":"Presencial"},
    {"k":"Frecuencia","v":"Quincenal"},
    {"k":"Día","v":"Sábados"},
    {"k":"Cupo","v":"15 personas"},
    {"k":"Precio","v":"Gratuito"}
  ]$json$::jsonb,
  3
);

-- ---------- letters (cartas curadas) ----------
insert into public.letters (heteronym, title, excerpt, file_name, body, is_new, is_published, sort_order) values
(
  'Heterónimo — M.', 'Tratado entre ser flor y ser insecto',
  'Querida Alicia: en una carpeta de papel mantequilla apareció un texto que nadie supo si escribieron las moscas, las orquídeas o esa zona intermedia donde una forma se vuelve otra.',
  'tratado-de-los-trichoceros.txt',
  $json$[
    {"n":1,"b":"De:","t":"     M.  (heterónimo)"},
    {"n":2,"b":"Para:","t":"   Alicia"},
    {"n":3,"b":"Fecha:","t":"  21-07-2192 · Cundinamarca, Colombia"},
    {"n":4,"b":"","t":""},
    {"n":5,"b":"Querida Alicia,","t":""},
    {"n":6,"b":"","t":""},
    {"n":7,"b":"","t":"El otro día estuvimos en la conferencia dictada en el salón multipropósito de la Universidad Pedagógica Nacional. Nos sorprendió gratamente que los estudios sobre el lenguaje de los insectos-plantas hayan llegado a conclusiones tan provechosas para nuestro ejercicio, especialmente porque es cierto que ya no podemos llamarlo terolingüística, pues se trata del lenguaje de las orquídeas andinas y, más específicamente, de la metamorfosis de los insectos en plantas. ¿Es acaso todavía un tipo de comunicación animal, o es un modo en el que el sistema lingüístico logra conectar animales y plantas?"},
    {"n":8,"b":"","t":""},
    {"n":9,"b":"","t":"Pero lo que más me inquietó, Alicia, no fue la conferencia en sí, sino un hallazgo del que apenas se habló al final, como si los investigadores temieran pronunciarlo con demasiada claridad. En una carpeta de papel mantequilla, junto a varias láminas secas de ","link":"Trichoceros antennifer","href":"https://es.wikipedia.org/wiki/Trichoceros","post":", apareció otro texto, más antiguo o quizá escrito en un tiempo que no coincide con el nuestro. Lo llamaron, provisionalmente, Tratado ontológico entre ser flor y ser insecto, aunque nadie pudo asegurar si sus autoras eran las moscas, las orquídeas o esa zona intermedia donde una forma se mezcla hasta volverse otra. Desde entonces no he podido dejar de pensar en esa posibilidad: que los trichoceros no solo imiten a las moscas para atraerlas, sino que hayan producido una filosofía completa sobre la identidad."},
    {"n":10,"b":"","t":""},
    {"n":11,"b":"","t":"Esta sería la traducción preliminar según las láminas encontradas:"},
    {"n":12,"b":"","t":""},
    {"n":13,"b":"","t":"    La sombra tiene no carne"},
    {"n":14,"b":"","t":"    es un cuerpo;"},
    {"n":15,"b":"","t":"    el otro cuerpo."},
    {"n":16,"b":"","t":"    Es el cuerpo que no puede contenerse en frascos"},
    {"n":17,"b":"","t":"    se escurre entre los pétalos para ser nuevamente sombra"},
    {"n":18,"b":"","t":""},
    {"n":19,"b":"","t":"Los terolingüistas quedaron fascinados porque allí no aparece una distinción entre la orquídea y la mosca. Es en el encuentro donde es posible su estilo y modo de comunicación. En el idioma de los trichoceros se mezclan necesariamente las dos experiencias y modos de ser. Las dos se entregan para sobrevivir."},
    {"n":20,"b":"","t":""},
    {"n":21,"b":"","t":"Este tipo de lenguaje le corresponde tanto a la orquídea como a la mosca en su modo de formular una hipótesis sobre el mundo. En este caso, como tú lo has mencionado en la conferencia, una forma de sobrellevar el duelo."},
    {"n":22,"b":"","t":""},
    {"n":23,"b":"","t":"Esta hipótesis explicaría por qué la flor puede adoptar la curvatura de sus pétalos como alas, sus vellos, su olor, su textura. La sombra es el contorno de lo que alguna vez fue la mosca. Todo bicho conoce el mundo en contacto. Las moscas, si la traducción no nos traiciona, habrían comprendido que vivir también es vivir siendo flor."},
    {"n":24,"b":"","t":""},
    {"n":25,"b":"","t":"Por eso he querido escribirte. Tú siempre has desconfiado de las fronteras demasiado limpias: animal, vegetal, humano, máquina, signo, mujer, hombre, día, noche. Recuerdo que una vez dijiste que toda clasificación era una cortesía momentánea, una manera de no enloquecer frente a la continuidad del mundo. Ahora pienso que los trichoceros habrían estado de acuerdo contigo. Para ellos, ser flor no significa pertenecer únicamente a un nuevo reino, sino detenerse en un estado intermedio (insecto-flor) y dejarse convocar por aquello que promete dicha mezcla."},
    {"n":26,"b":"","t":""},
    {"n":27,"b":"","t":"Espero que vengas pronto. Quiero mostrarte mis apuntes antes de que la prudencia académica los vuelva ilegibles. Además, sospecho que el tratado no está terminado. O peor: sospecho que continúa escribiéndose cada vez que una mosca nace flor."},
    {"n":28,"b":"","t":""},
    {"n":29,"b":"","t":"Con afecto y creciente curiosidad,"},
    {"n":30,"b":"M.","t":""}
  ]$json$::jsonb,
  false, true, 1
),
(
  'Heterónimo — Ada Serna', 'La gramática de las ballenas',
  'Estimada Sociedad: adjunto mis notas sobre el canto de las yubartas, que —sospecho— conjugan el futuro en una clave que aún no sabemos oír.',
  null, '[]'::jsonb, false, true, 2
),
(
  'Heterónimo — La cartógrafa muda', 'Cómo leer el musgo del Ártico',
  'Propongo un alfabeto de líquenes: cada mancha, una vocal; cada grieta, una consonante que solo se pronuncia en invierno.',
  null, '[]'::jsonb, false, true, 3
);
