-- 0004 — Corrige el hipervínculo de "Trichoceros antennifer" en la carta
-- "Tratado entre ser flor y ser insecto" (heterónimo M.) para que apunte al
-- artículo del género en Wikipedia en español.
--
-- Se hace con un UPDATE quirúrgico (reemplazo de string dentro del JSONB del
-- cuerpo) en lugar de re-sembrar: las cartas usan UUID autogenerado, así que
-- re-ejecutar el seed cambiaría la URL /cartas/<id> de esta carta. Idempotente:
-- el filtro `like` evita reejecuciones y no toca ninguna otra fila.
update public.letters
set body = replace(
  body::text,
  'https://es.wikipedia.org/wiki/Trichoceros_antennifer',
  'https://es.wikipedia.org/wiki/Trichoceros'
)::jsonb
where file_name = 'tratado-de-los-trichoceros.txt'
  and body::text like '%wiki/Trichoceros_antennifer%';
