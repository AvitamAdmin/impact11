import React, { createContext, useContext, useState } from "react";


const SportContext = createContext();


export const SportProvider = ({ children }) => {
  const [selectedSport, setSelectedSport] = useState("cricket");
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










// // Create a context for the selected sport
// const SportContext = createContext();

// // Create a context provider to manage the selected sport
// export const SportProvider = ({ children }) => {
//   const [selectedSport, setSelectedSport] = useState('cricket');
//   const [TabName, setTabName] = useState('football')
//   const [Tier, setTier] = useState('')
//   const [ImpactScore, setImpactScore] = useState(1000)

//   return (
//     <SportContext.Provider value={{ selectedSport, setSelectedSport,TabName ,setTabName,Tier,setTier,ImpactScore,setImpactScore}}>
//       {children}
//     </SportContext.Provider>
//   );
// };

// // Custom hook to access the selected sport
// export const useSport = () => useContext(SportContext);