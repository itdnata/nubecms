import { getSupabase } from './supabase'
import type { Post, Review, Note, Course, Letter } from './types'

export async function getPosts(): Promise<Post[]> {
  const sb = getSupabase()
  const { data, error } = await sb.from('posts').select('*').order('sort_order')
  if (error) throw error
  return (data ?? []) as Post[]
}

export async function getPost(slug: string): Promise<Post | null> {
  const sb = getSupabase()
  const { data, error } = await sb.from('posts').select('*').eq('slug', slug).maybeSingle()
  if (error) throw error
  return (data as Post) ?? null
}

export async function getReviews(): Promise<Review[]> {
  const sb = getSupabase()
  const { data, error } = await sb.from('reviews').select('*').order('sort_order')
  if (error) throw error
  return (data ?? []) as Review[]
}

export async function getNotes(): Promise<Note[]> {
  const sb = getSupabase()
  const { data, error } = await sb.from('notes').select('*').order('sort_order')
  if (error) throw error
  return (data ?? []) as Note[]
}

export async function getCourses(): Promise<Course[]> {
  const sb = getSupabase()
  const { data, error } = await sb.from('courses').select('*').order('sort_order')
  if (error) throw error
  return (data ?? []) as Course[]
}

export async function getCourse(slug: string): Promise<Course | null> {
  const sb = getSupabase()
  const { data, error } = await sb.from('courses').select('*').eq('slug', slug).maybeSingle()
  if (error) throw error
  return (data as Course) ?? null
}

export async function getLetters(): Promise<Letter[]> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('letters')
    .select('*')
    .eq('is_published', true)
    .order('is_new', { ascending: false })
    .order('sort_order')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Letter[]
}

export async function getLetter(id: string): Promise<Letter | null> {
  const sb = getSupabase()
  const { data, error } = await sb.from('letters').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return (data as Letter) ?? null
}
