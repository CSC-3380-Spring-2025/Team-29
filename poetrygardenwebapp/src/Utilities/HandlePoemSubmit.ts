import { addGarden } from "../firebase.ts";

interface Poem {
  title: string;
  content: string;
  theme: string;
}

const handlePoemSubmit = async ({
  newPoem,
  user,
  setPoems,
  setGarden,
  setShowForm,
  setNewPoem,
}: {
  newPoem: Poem;
  user: { email?: string } | null;
  setPoems: React.Dispatch<React.SetStateAction<any[]>>;
  setGarden: React.Dispatch<React.SetStateAction<any[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setNewPoem: React.Dispatch<React.SetStateAction<Poem>>;
}) => {
  const placeholder =
    newPoem.theme === "love"
      ? "Flower1.png"
      : newPoem.theme === "loss"
      ? "Flower2.png"
      : newPoem.theme === "time"
      ? "Flower3.png"
      : newPoem.theme === "dreams"
      ? "Flower4.png"
      : newPoem.theme === "nature"
      ? "Flower5.png"
      : newPoem.theme === "identity"
      ? "Flower6.png"
      : newPoem.theme === "silence"
      ? "Flower7.png"
      : newPoem.theme === "hope"
      ? "Flower8.png"
      : newPoem.theme === "chaos"
      ? "Flower9.png"
      : newPoem.theme === "memory"
      ? "Flower10.png"
      : newPoem.theme === "faith"
      ? "Flower11.png"
      : newPoem.theme === "solitude"
      ? "Flower12.png"
      : ":seedling:";

  const newPoemEntry = {
    title: newPoem.title,
    content: newPoem.content,
    theme: newPoem.theme,
    placeholder,
    published: true,
    userEmail: user?.email || "Anonymous",
  };

  try {
    await addGarden(newPoemEntry);
    const entryWithId = { id: Date.now(), ...newPoemEntry };
    setPoems((prev) => [...prev, entryWithId]);
    setGarden((prev) => [...prev, entryWithId]);
    setShowForm(false);
    setNewPoem({ title: "", content: "", theme: "" });
  } catch (err) {
    console.error("Failed to add poem to Firebase", err);
  }
};

export default handlePoemSubmit;