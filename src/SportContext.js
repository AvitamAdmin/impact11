import React, { createContext, useContext, useState } from "react";


const SportContext = createContext();


export const SportProvider = ({ children }) => {
  const [selectedSport, setSelectedSport] = useState("Cricket");
  const [TabName, setTabName] = useState("home");
  const [Tier, setTier] = useState("");
  const [ImpactScore, setImpactScore] = useState(1000);
  const [Toggle, setToggle] = useState(1);

  return (
    <SportContext.Provider
      value={{
        selectedSport,
        setSelectedSport,
        TabName,
        setTabName,
        Tier,
        setTier,
        ImpactScore,
        setImpactScore,
        Toggle,
        setToggle,
      }}
    >
      {children} 
    </SportContext.Provider>
  );
};

export const useSport = () => useContext(SportContext);
