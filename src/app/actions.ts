"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

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

export async function deleteSignature(id: string) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  try {
    await prisma.signature.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete signature:", error);
    return { error: "Falha ao apagar." };
  }
}

export async function editSignature(id: string, newName: string) {
  const session = await auth();
  if (!session) return { error: "Não autorizado" };

  const sanitizedName = newName.trim().substring(0, 30);
  if (!sanitizedName) return { error: "O nome não pode estar vazio." };

  try {
    await prisma.signature.update({
      where: { id },
      data: { name: sanitizedName }
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to edit signature:", error);
    return { error: "Falha ao editar." };
  }
}
