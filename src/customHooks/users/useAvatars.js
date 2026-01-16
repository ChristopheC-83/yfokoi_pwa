//  exemple pour import de données

import { useEffect, useState } from "react";

const AVATAR_API =
  "https://cloud.ducompagnon.fr/api/shares_by_folder/174/4d9dcf3b-3768-4d1f-949f-44061ee98736";

export default function useAvatars() {
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const res = await fetch(AVATAR_API);
        if (!res.ok) throw new Error("Erreur lors du chargement des avatars");
        const data = await res.json();
        setAvatars(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

      fetchAvatars();
  }, []);
  return { avatars, loading, error };
}
