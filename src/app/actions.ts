"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addSignature(formData: FormData) {
  const name = formData.get("name");

  if (!name || typeof name !== "string" || name.trim() === "") {
    return { error: "O nome não pode estar vazio." };
  }

  const sanitizedName = name.trim().substring(0, 30); // Limiting to 30 characters

  try {
    await prisma.signature.create({
      data: {
        name: sanitizedName,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to add signature:", error);
    return { error: "Ocorreu um erro ao adicionar seu nome. Tente novamente." };
  }
}
