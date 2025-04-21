import { useEffect, useState } from 'react';
import { fetchGardens, addGarden } from './firebase';

export default function MyGarden() {
  const [gardens, setGardens] = useState([]);

  // on‑mount, load poems from Firestore
  useEffect(() => {
    fetchGardens().then(setGardens);
  }, []);

  // (optional) helper to add a test poem:
  const handleAddDemo = async () => {
    await addGarden({ title: "Hello", content: "My first poem", theme: "joy" });
    const updated = await fetchGardens();
    setGardens(updated);
  };

  return (
    <div>
     <h1>Community Poem Garden</h1>
      <button onClick={handleAddDemo}>Add Demo Poem</button>
      <ul>
       {gardens.map(g => (
          <li key={g.id}>
           <strong>{g.title}</strong><br/>
           {g.content}
         </li>
       ))}
     </ul>
   </div>
 );
}