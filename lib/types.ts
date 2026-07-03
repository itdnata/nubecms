// Tipos del contenido del blog (mapean las tablas de Supabase)

export type PostBlock =
  | { type: 'p'; text: string; drop?: boolean }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'h2'; text: string }
  | { type: 'end' }

export type Media = {
  id: string
  bucket: string
  path: string
  filename: string
  public_url: string
  alt: string | null
  caption: string | null
  width: number | null
  height: number | null
  size_bytes: number | null
  content_type: string | null
  kind: string | null
}

export type Post = {
  id: string
  slug: string
  seq: string
  kicker: string
  category: string | null
  title: string
  title_highlight: string | null
  dek: string
  subtitle: string | null
  reading_time: string
  cover_caption: string | null
  author_name: string
  author_bio: string
  author_location: string
  tags: string[]
  body: PostBlock[]
  published_at: string | null
  sort_order: number
  cover_media_id: string | null
  cover?: Media | null
}

export type Review = {
  id: string
  tag: string
  title: string
  note: string
  sort_order: number
}

export type Note = {
  id: string
  num: string
  text: string
  sort_order: number
}

export type CourseParagraph = { t: string }
export type CourseTema = { n: string; t: string }
export type CourseFicha = { k: string; v: string }

export type Course = {
  id: string
  slug: string
  tag: string
  title: string
  note: string
  schedule: string
  lead: string
  body: CourseParagraph[]
  temario: CourseTema[]
  ficha: CourseFicha[]
  sort_order: number
}

export type LetterLine = {
  n: number
  b?: string
  t?: string
  link?: string
  href?: string
  post?: string
}

export type Letter = {
  id: string
  heteronym: string
  title: string
  excerpt: string
  file_name: string | null
  body: LetterLine[]
  is_new: boolean
  is_published: boolean
  sort_order: number
  created_at: string
}
