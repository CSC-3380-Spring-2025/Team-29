import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, fetchGardens } from "../firebase";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const PoemLogic = () => {
  const [newPoem, setNewPoem] = useState({ title: "", content: "", theme: "" });
  const [poems, setPoems] = useState<{ id: string }[]>([]);
  const [garden, setGarden] = useState<{ id: string }[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedPoem, setSelectedPoem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const loadPoems = async () => {
      try {
        const loadedPoems = await fetchGardens();
        setGarden(loadedPoems);
        setPoems(loadedPoems);
      } catch (err) {
        console.error("Error loading gardens:", err);
      }
    };

    loadPoems();
    return () => unsubscribe();
  }, []);

  return {
    newPoem,
    setNewPoem,
    poems,
    setPoems,
    garden,
    setGarden,
    user,
    setUser,
    selectedPoem,
    setSelectedPoem,
    showForm,
    setShowForm,
    navigate,
  };
};

export default PoemLogic;