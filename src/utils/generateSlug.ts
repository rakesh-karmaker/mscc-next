import prisma from "@/lib/prisma";
import getDate from "./getDate";

type GenerateSlugProps = (
  name: string,
  model: keyof typeof prisma
) => Promise<string>;

const generateSlug: GenerateSlugProps = async (name, model) => {
  const formattedName = name
    .toLowerCase()
    .replace(/[^a-z0-9_ ]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with dashes
  const slug = `${formattedName}-${Math.floor(Math.random() * 1000)}`;

  try {
    // Check if slug already exists
    const allData = await (
      prisma[model] as unknown as {
        findFirst: (args: {
          where: { slug: string };
        }) => Promise<{ slug: string } | null>;
      }
    ).findFirst({
      where: { slug },
    });

    if (allData) {
      // If slug exists, recursively generate a new one
      return generateSlug(name, model);
    }

    return slug;
  } catch (err) {
    console.error("Error generating slug - ", getDate(), "\n---\n", err);
    throw err;
  }
};

export default generateSlug;
