"use server";

import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase";

export type RegistroState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "ok"; nombre: string; correo: string; curso: string };

export async function submitRegistro(
  _prev: RegistroState,
  formData: FormData
): Promise<RegistroState> {
  const curso = String(formData.get("curso") || "").trim();
  const nombre = String(formData.get("nombre") || "").trim();
  const correo = String(formData.get("correo") || "").trim();
  const telefono = String(formData.get("telefono") || "").trim();

  if (!nombre || !correo) {
    return { status: "error", message: "El nombre y el correo son obligatorios." };
  }

  const sb = getSupabase();
  const { error } = await sb.from("course_signups").insert({
    course_title: curso,
    name: nombre,
    email: correo,
    phone: telefono || null,
  });
  if (error) return { status: "error", message: error.message };

  return { status: "ok", nombre, correo, curso };
}

export type CartaState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "ok"; firma: string; titulo: string };

export async function submitCarta(
  _prev: CartaState,
  formData: FormData
): Promise<CartaState> {
  const firma = String(formData.get("firma") || "").trim();
  const titulo = String(formData.get("titulo") || "").trim();
  const texto = String(formData.get("texto") || "").trim();

  if (!firma || !titulo || !texto) {
    return { status: "error", message: "Todos los campos son obligatorios." };
  }

  const excerpt =
    texto.slice(0, 180) + (texto.length > 180 ? "…" : "");

  const sb = getSupabase();
  const { error } = await sb.from("letters").insert({
    heteronym: "Heterónimo — " + firma,
    title: titulo,
    excerpt,
    file_name: null,
    body: [],
    is_new: true,
    is_published: true,
  });
  if (error) return { status: "error", message: error.message };

  // Refresca la lista de cartas (cacheada por ISR) para que la nueva aparezca ya.
  revalidatePath("/cartas");

  return { status: "ok", firma, titulo };
}
