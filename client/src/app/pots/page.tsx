"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [pots, setPots] = useState(null);

  useEffect(() => {
    const fetchPots = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/pots");
        const result = await response.json();
        setPots(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPots();
  }, []);
  return (
    <div>
      {pots ? <pre>{JSON.stringify(pots, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}
