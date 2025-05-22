import React from 'react';
import { View } from 'react-native';
import { useSport } from '../SportContext';
import FootballMatches from './MyMatchTabs/Football/FootballMatches';
import CricketHome from './Home/CricketHome';
import FootballHome from './Home/FootballHome';
import CricketMatches from './MyMatchTabs/Cricket/CricketMatches';

const TabSelection = () => {
  const { selectedSport, TabName } = useSport();
  

  if (TabName === "home") {
    return selectedSport === "Cricket" ? <CricketHome /> : <FootballHome />;
  }

  if (TabName === "matches") {
    return selectedSport === "Cricket" ? <CricketMatches /> : <FootballMatches />;
  }

  return null;
};

export default TabSelection;