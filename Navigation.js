import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Share} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Import Screens
// import NameRegister from './src/Auth/NameRegister';
// import Profile from './src/BottomTabs/Profile';
import ReferAndEarn from './src/BottomTabs/ReferAndEarn';
import FantacyPointsSystems from './src/DrawerScreens/FantacyPointsSystems';
import HowToPlay from './src/DrawerScreens/HowToPlay';
import AboutUs from './src/DrawerScreens/AboutUs';
import HelpAndSupport from './src/DrawerScreens/HelpAndSupport';
import Cricket from './src/BottomTabs/TopScreens/Cricket';
import Football from './src/BottomTabs/TopScreens/Football';

// Context
import {SportProvider, useSport} from './src/SportContext';
// import ContestScreen from './src/Screens/ContestScreen';
import DrawerHeader from './src/DrawerScreens/DrawerHeader';
import Legality from './src/DrawerScreens/Legality';
import TermsAndCondition from './src/DrawerScreens/TermsAndCondition';
// import LoginEmail from './src/Auth/LoginEmail';
import CricketPonits from './src/DrawerScreens/Cricket';
import GetTheApp from './src/DrawerScreens/Help&SupportFiles/GetStarted/GetTheApp';
import GettingStarted from './src/DrawerScreens/Help&SupportFiles/GetStarted/GettingStarted';
import Impact11 from './src/DrawerScreens/Help&SupportFiles/GetStarted/Impact11';
import LostNumber from './src/DrawerScreens/Help&SupportFiles/GetStarted/LostNumber';
import QOTP from './src/DrawerScreens/Help&SupportFiles/GetStarted/QOTP';
import QSignUp from './src/DrawerScreens/Help&SupportFiles/GetStarted/QSignUp';
import StillPlay from './src/DrawerScreens/Help&SupportFiles/GetStarted/StillPlay';
import PlayingOnImpact from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/PlayingOnImpact';
import EditTeams from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/EditTeams';
import EditAfterMatch from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/EditAfterMatch';
import DeleteTeam from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/DeleteTeam';
import SwitchTeams from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/SwitchTeams';
import MultipleTeam from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/MultipleTeam';
import IncorrectLineup from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/IncorrectLineup';
import PlayerDoNotPlay from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/PlayerDoNotPlay';
import ContestJoin from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/ContestJoin';
import PublicPrivateContest from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/PublicPrivateContest';
import FlexibileContest from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/FlexibileContest';
import UnfilledContest from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/UnfilledContest';
import FindContest from './src/DrawerScreens/Help&SupportFiles/PlayOnImpact/FindContest';
import ScorePoints from './src/DrawerScreens/Help&SupportFiles/Scores&Points/ScorePoints';
import ScoresAndPoints from './src/DrawerScreens/Help&SupportFiles/Scores&Points/ScoresAndPoints';
import PointsNotUpdated from './src/DrawerScreens/Help&SupportFiles/Scores&Points/PointsNotUpdated';
import PointsForSuperOver from './src/DrawerScreens/Help&SupportFiles/Scores&Points/PointsForSuperOver';
import SubstitutePlayer from './src/DrawerScreens/Help&SupportFiles/Scores&Points/SubstitutePlayer';
import HSMyBalance from './src/DrawerScreens/Help&SupportFiles/MyBalance/HSMyBalance';
import WithDrawWinnings from './src/DrawerScreens/Help&SupportFiles/MyBalance/WithDrawWinnings';
import WithdrawalRequest from './src/DrawerScreens/Help&SupportFiles/MyBalance/WithdrawalRequest';
import CheckStatusWithdrawal from './src/DrawerScreens/Help&SupportFiles/MyBalance/CheckStatusWithdrawal';
import WithdrawalBankAccDetails from './src/DrawerScreens/Help&SupportFiles/MyBalance/WithdrawalBankAccDetails';
import WithdrawalRequestCancel from './src/DrawerScreens/Help&SupportFiles/MyBalance/WithdrawalRequestCancel';
import DiscountBonus from './src/DrawerScreens/Help&SupportFiles/MyBalance/DiscountBonus';
import AddCashMyBalance from './src/DrawerScreens/Help&SupportFiles/MyBalance/AddCashMyBalance';
import ManageWallets from './src/DrawerScreens/Help&SupportFiles/MyBalance/ManageWallets';
import ManageCards from './src/DrawerScreens/Help&SupportFiles/MyBalance/ManageCards';
import Winnings from './src/DrawerScreens/Help&SupportFiles/Winnings/Winnings';
import InformCashPrize from './src/DrawerScreens/Help&SupportFiles/Winnings/InformCashPrize';
import ReceiveMyWinnings from './src/DrawerScreens/Help&SupportFiles/Winnings/ReceiveMyWinnings';
import Distributed from './src/DrawerScreens/Help&SupportFiles/Winnings/Distributed';
import ProfileAndVerification from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/ProfileAndVerification';
import ChangeMobileNumber from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/ChangeMobileNumber';
import ChangeMailId from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/ChangeMailId';
import ChangeTeamName from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/ChangeTeamName';
import ChangeState from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/ChangeState';
import Calculate from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/Calculate';
import NotReceivingMail from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/NotReceivingMail';
import VerifyImapact11P from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/VerifyImapact11P';
import PanVerify from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/PanVerify';
import AadharVerifyWhy from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/AadharVerifyWhy';
import PanReject from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/PanReject';
import BankAccReject from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/BankAccReject';
import ChangePan from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/ChangePan';
import BankAccChange from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/BankAccChange';
import CompleteVerification from './src/DrawerScreens/Help&SupportFiles/Profile&Verification/CompleteVerification';
import OffersAndRewards from './src/DrawerScreens/Help&SupportFiles/Offer&Rewards/OffersAndRewards';
import InviteFriends from './src/DrawerScreens/Help&SupportFiles/Offer&Rewards/InviteFriends';
import Earn from './src/DrawerScreens/Help&SupportFiles/Offer&Rewards/Earn';
import MaximumInvite from './src/DrawerScreens/Help&SupportFiles/Offer&Rewards/MaximumInvite';
import Security from './src/DrawerScreens/Help&SupportFiles/Security/Security';
import AccountSecurity from './src/DrawerScreens/Help&SupportFiles/Security/AccountSecurity';
import Ensure from './src/DrawerScreens/Help&SupportFiles/Security/Ensure';
import Guide from './src/DrawerScreens/Help&SupportFiles/Security/Guide';
import LegalityScreen from './src/DrawerScreens/Help&SupportFiles/Legality/LegalityScreen';
import GameLegal from './src/DrawerScreens/Help&SupportFiles/Legality/GameLegal';
import Allow from './src/DrawerScreens/Help&SupportFiles/Legality/Allow';
import FairPlay from './src/DrawerScreens/Help&SupportFiles/FairPlay/FairPlay';
import FairPlayViolation from './src/DrawerScreens/Help&SupportFiles/FairPlay/FairPlayViolation';
import Suspicious from './src/DrawerScreens/Help&SupportFiles/FairPlay/Suspicious';
import AccessToChangeTeam from './src/DrawerScreens/Help&SupportFiles/FairPlay/AccessToChangeTeam';
import MatchDeadline from './src/DrawerScreens/Help&SupportFiles/FairPlay/MatchDeadline';
import DetailsSafe from './src/DrawerScreens/Help&SupportFiles/FairPlay/DetailsSafe';
import LosingGame from './src/DrawerScreens/Help&SupportFiles/FairPlay/LosingGame';
import VerifyBankAcc from './src/PaymentScreens/VerifyBankAcc';
import VerifyPanCard from './src/PaymentScreens/VerifyPanCard';
import KYC from './src/PaymentScreens/KYC';
import AddCash from './src/PaymentScreens/AddCash';
import Withdraw from './src/PaymentScreens/Withdraw';
import PaymentScreen from './src/PaymentScreens/PaymentScreen';
import ProfileScreen from './src/BottomTabs/ProfileScreen';
import MyinfoAndSettings from './src/BottomTabs/MyinfoAndSettings';
import Contest from './src/Screens/ContestScreen/ContestScreen';
import TierScreen from './src/BottomTabs/TireScreen';
import RecentlyPlayed from './src/BottomTabs/RecentlyPlayed';
import CricketCompletedMatches from './src/BottomTabs/MyMatchTabs/Cricket/CricketCompletedMatches';
import CricketCompleted from './src/BottomTabs/MyMatchTabs/Cricket/Completed/CricketCompleted';
import CricketLiveMatches from './src/BottomTabs/MyMatchTabs/Cricket/CricketLiveMatches';
import CricketUpcomingMatches from './src/BottomTabs/MyMatchTabs/Cricket/CricketUpcomingMatches';
import Winning from './src/BottomTabs/MyMatchTabs/Cricket/Live/Winning';
import Leaderboard from './src/BottomTabs/MyMatchTabs/Cricket/Live/Leaderboard';
import Scoreboard from './src/BottomTabs/MyMatchTabs/Cricket/Live/Scoreboard';
import Stats from './src/BottomTabs/MyMatchTabs/Cricket/Live/Stats';
import CricketMatches from './src/BottomTabs/MyMatchTabs/Cricket/CricketMatches';
import CricketLive from './src/BottomTabs/MyMatchTabs/Cricket/Live/CricketLive';
// import PlayerInfo from './src/CreateTeam/PlayerInfo';
// import PlayerDetails from './src/CreateTeam/PlayerDetails';

import WinningsBreakup from './src/BottomTabs/MyMatchTabs/Cricket/WinningsBreakup';
import CreateTeam from './src/Screens/ContestScreen/MyTeam/CreateTeam/CreateTeam';
import ImpactPlayerSelection from './src/Screens/ContestScreen/MyTeam/CreateTeam/CVCI_Selection/ImpactPlayerSelection';
import CVCSelection from './src/Screens/ContestScreen/MyTeam/CreateTeam/CVCI_Selection/CVCSelection';
import MyTeam from './src/Screens/ContestScreen/MyTeam/MyTeam';
import ContestDetailScreen from './src/Screens/ContestScreen/ContestDetail/ContestDetailScreen';
import TeamPreview from './src/Screens/ContestScreen/MyTeam/CreateTeam/TeamPreview';
import ContestHeader from './src/Screens/ContestScreen/ContestHeader';
import LinearGradient from 'react-native-linear-gradient';
import TabSelection from './src/BottomTabs/TabSelection';
import LottieView from 'lottie-react-native';
import {api} from './src/envfile/api';
// import axios from 'axios';
import EditTeam from './src/Screens/ContestScreen/MyTeam/Edit Team/EditTeam';
import MyContest from './src/Screens/ContestScreen/Mycontest';
import SelectTeam from './src/Screens/ContestScreen/MyTeam/SelectTeam';
import EditCVCSelection from './src/Screens/ContestScreen/MyTeam/Edit Team/CVCI_Selection/EditCVCSelection';
import ReferalCodePopup from './src/Models/ReferalCodePopup';
import CopyTeam from './src/Screens/ContestScreen/MyTeam/Edit Team/CopyTeam';
import CopyCVCSelection from './src/Screens/ContestScreen/MyTeam/Edit Team/CVCI_Selection/CopyCVCSelection';
import PermissionSetting from './src/BottomTabs/PermissionSettings';
import UserProfileScreen from './src/BottomTabs/UserProfileScreen';
import {useDispatch, useSelector} from 'react-redux';
import {
  setDateAndTime,
  setMatchesTeam1Id,
  setMatchesTeam2Id,
  setmatchId,
  setMatchShortName,
  setReferalcode,
  setteam1ShortName,
  setteam2ShortName,
  setTournamentId,
  setWalletBalance,
} from './src/Redux/Slice';
import WriteToUs from './src/DrawerScreens/Help&SupportFiles/WriteToUs';
import MyTeam_TeamPreview from './src/Screens/ContestScreen/MyTeam/MyTeam_TeamPreview';
import CompletedTeamPreview from './src/BottomTabs/MyMatchTabs/Cricket/Completed/CompletedTeamPreview';
import CreateContest from './src/Screens/ContestScreen/ContestDetail/CreateContest';
// import moment from 'moment';
import SwapTeam from './src/Screens/ContestScreen/MyTeam/SwapTeam';
import LiveTeamPreview from './src/BottomTabs/MyMatchTabs/Cricket/Live/LiveTeamPreview';
import ShareContest from './src/Screens/ContestScreen/ContestDetail/ShareContest';
import EditTeamPreview from './src/Screens/ContestScreen/MyTeam/Edit Team/EditTeamPreview';
import ProfileRecentlyPlayed from './src/BottomTabs/ProfileRecentlyPlayed';
import MyTransactions from './src/PaymentScreens/MyTransactions/MyTransactions';


import FootballMatches from './src/BottomTabs/MyMatchTabs/Football/FootballMatches';

import VerifyEmail from './src/PaymentScreens/VerifyEmail';
import VerifyMobileNumber from './src/PaymentScreens/VerifyMobileNumber';
import VerifyEmailOtp from './src/PaymentScreens/VerifyEmailOtp';
import MyMatchTab from './src/BottomTabs/MyMatchTabs/MyMatchTab';

// import NameRegister from './src/Auth/NameRegister';
// import Otp from './src/Auth/otp';
import TaxWinnings from './src/DrawerScreens/Help&SupportFiles/Winnings/TaxWinnings';
import HomeNotification from './src/BottomTabs/Home/HomeNotification';
import All from './src/BottomTabs/Home/All';
import Offers from './src/BottomTabs/Home/Offer';
import MyBalance from './src/PaymentScreens/MyBalance';
import CricketHome from './src/BottomTabs/Home/CricketHome';
import DiscardPopup from './src/Models/DiscardPopup';
import Home from './src/BottomTabs/Home/Home';
import CarouselScreen from './src/Auth/CarouselScreen';
import RegisterPage from './src/Auth/RegisterPage';
import LoginPhone from './src/Auth/LoginPhone';
import LoginEmail from './src/Auth/LoginEmail';
import NameRegister from './src/Auth/NameRegister';
import Otp from './src/Auth/otp';



export const navigationRef = createNavigationContainerRef();

const CustomHeader = () => {
  const navigation = useNavigation();
  const reloadStatus = useSelector(state => state.fantasy.reloadStatus);
  const walletBalance = useSelector(state => state.fantasy.WalletBalance);
  const [userMatches, setUserMatches] = useState([]);

  const [userDetails, setUserDetails] = useState({balance: 0});
  const [teams, setTeams] = useState({});

  useEffect(() => {
    fetchUserMatch();
  }, []);

  const CountdownTimer = ({matchTime, eventStatus}) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
      const updateCountdown = () => {
        const now = new Date();
        const matchDate = moment(matchTime, 'YYYY/M/D, h:mm:ss A').toDate();

        if (isNaN(matchDate.getTime())) {
          setDisplayText('Invalid Date');
          return;
        }

        const difference = matchDate - now;

        // Show eventStatus if match has started (difference <= 0)
        if (difference <= 0) {
          setDisplayText(eventStatus);
          return;
        }

        // For upcoming matches, show the countdown
        const diffHours = Math.floor(difference / (1000 * 60 * 60));
        const diffDays = Math.floor(difference / (1000 * 60 * 60 * 24));

        if (diffHours < 24) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          setDisplayText(`${hours}h ${minutes}m ${seconds}s`);
          if (hours == 0 && minutes == 0 && seconds == 0) {
            setDisplayText(eventStatus);
          }
        } else if (diffDays === 1) {
          setDisplayText('Tomorrow');
        } else {
          setDisplayText(
            matchDate.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
          );
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }, [matchTime, eventStatus]);

    const textColor =
      displayText === 'Live'
        ? 'red'
        : displayText === 'Completed'
        ? 'red'
        : 'red';

    return (
      <Text
        style={{
          fontSize: hp(1.4),
          color: textColor,
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}>
        {displayText}
      </Text>
    );
  };

  const fetchUserMatch = async () => {
    const token = await AsyncStorage.getItem('jwtToken');
    const userId = await AsyncStorage.getItem('userId');
    const body = {userId: userId};

    try {
      const userMatchesResponse = await axios.post(
        `${api}/admin/matches/getMatchesByUser`,
        body,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      const allMatches = userMatchesResponse.data?.matchesDtoList || [];
      const sortedMatches = allMatches.sort((a, b) => {
        const timeA = a.creationTime
          ? new Date(a.creationTime)
          : new Date(a.matchTime);
        const timeB = b.creationTime
          ? new Date(b.creationTime)
          : new Date(b.matchTime);
        return timeB - timeA;
      });

      const recentMatches = sortedMatches.slice(0, 3);
      setUserMatches(recentMatches);

      const teamIds = [
        ...new Set(recentMatches.flatMap(m => [m.team1Id, m.team2Id])),
      ];

      if (teamIds.length > 0) {
        const teamResponse = await axios.post(
          `${api}/admin/team/getedit`,
          {teamDtoList: teamIds.map(id => ({recordId: id}))},
          {headers: {Authorization: `Bearer ${token}`}},
        );

        const teamData = {};
        if (teamResponse.data.teamDtoList) {
          teamResponse.data.teamDtoList.forEach(team => {
            teamData[team.recordId] = team;
          });
        }

        setTeams(prev => ({...prev, ...teamData}));
      }
    } catch (error) {
      console.error('Error fetching user matches:', error);
    }
  };

  const handleMatchNavigate = matchId => {
    // console.log('🔍 Attempting to navigate to ContestScreen with matchId:', matchId);

    if (navigationRef.isReady()) {
      // console.log('✅ Navigation is ready! Navigating now...');
      navigationRef.navigate('ContestScreen', {matchId});
    } else {
      // console.log('❌ Navigation is NOT ready!');
    }
  };
  useEffect(() => {
    console.log('hitting reload status api');
    if (reloadStatus === 'reload') {
      getReferalCodeData();
    }
  }, [reloadStatus]);
  useEffect(() => {
    getReferalCodeData();
  }, []);
  const dispatch = useDispatch();
  const getReferalCodeData = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const recordId = await AsyncStorage.getItem('userId');

      if (!token) return;

      const body = {recordId};
      console.log('body from ', body);

      const response = await axios.post(`${api}/admin/user/getUserById`, body, {
        headers: {Authorization: `Bearer ${token}`},
      });

      if (response.data?.userDtoList?.length > 0) {
        const userData = response.data.userDtoList[0];
        setUserDetails(userData);
        dispatch(setWalletBalance(userData.balance));
        dispatch(setReferalcode(userData.referralCode));
        const balance = userData.balance;
        await AsyncStorage.setItem('walletBalance', JSON.stringify(balance));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#000', '#192451', '#243373', '#3b53bd']}
      style={{paddingTop: Platform.OS === 'ios' ? 50 : 0}}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingBottom: 10,
            paddingHorizontal: 15,
          }}>
          <Pressable
            style={{justifyContent: 'flex-start', paddingLeft: 10}}
            onPress={() => navigation.toggleDrawer()}>
            <Feather name="menu" size={22} color={'white'} />
          </Pressable>

          <Image
            source={require('./assets/IMPACT11LogoExtended.png')}
            style={{
              width: 120,
              height: 20,
              borderRadius: 20,
              resizeMode: 'contain',
            }}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 18,
            }}>
            <Pressable
              onPress={() => navigation.navigate('ADD CASH')}
              style={{
                // borderColor: 'rgb(179, 179, 179)',
                // borderRadius: 4,
                justifyContent: 'space-around',
                flexDirection: 'row',
                // minWidth: 75,
                // backgroundColor: '#6C77AA',
                // alignItems: 'center',
                // borderWidth: 0.8,
                // paddingLeft: 2,
                // paddingRight: 2,
                // gap: 5,
              }}>
              <Text
              // style={{
              //   color: '#fff',
              //   fontFamily: 'Roboto-Bold',
              //   paddingLeft: 2,
              // }}
              >
                {/* ₹ {userDetails.balance || 0} */}
              </Text>
              <Ionicons name="wallet-outline" size={24} color="white" />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('HomeNotification')}
              style={{marginRight: 15, alignItems: 'center'}}>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: wp('100%'),
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: 10,
          }}>
          {userMatches.length > 1 && (
            <>
              <View style={{}}>
                <Text
                  style={{fontWeight: '800', fontSize: hp(1.8), color: '#fff'}}>
                  My Matches
                </Text>
              </View>
              <Pressable
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('Recently Played')}>
                <View>
                  <Text style={{fontSize: hp(1.7), color: '#B9BBC6'}}>
                    View all
                  </Text>
                </View>
                <View>
                  <AntDesign name="right" size={14} color="#B9BBC6" />
                </View>
              </Pressable>
            </>
          )}
        </View>

        <View style={{width: '100%', padding: 10}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{}}
            contentContainerStyle={
              {
                // paddingHorizontal: 10
              }
            }>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                //paddingBottom: 30,
              }}>
              {userMatches.map(match => {
                const cardWidth =
                  userMatches.length > 1 ? wp('75%') : wp('95%');

                const team1Data = teams[match.team1Id] || {
                  shortName: 'Unknown',
                  logo: null,
                };
                const team2Data = teams[match.team2Id] || {
                  shortName: 'Unknown',
                  logo: null,
                };

                return (
                  <View
                    key={match.recordId}
                    style={{gap: 10, paddingBottom: 10}}>
                    <View
                      style={{
                        width: cardWidth,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pressable
                        onPress={() => {
                          dispatch(setTournamentId(match.tournamentId));
                          dispatch(setMatchShortName(match.identifier));
                          dispatch(setMatchesTeam1Id(match.team1Id));
                          dispatch(setMatchesTeam2Id(match.team2Id));
                          dispatch(setmatchId(match.recordId));
                          dispatch(setteam1ShortName(team1Data.shortName));
                          dispatch(setteam2ShortName(team2Data.shortName));
                          dispatch(setDateAndTime(match.matchTime));
                          if (match.eventStatus === 'Live') {
                            navigation.navigate('CricketLive', {
                              matchId: match.recordId,
                            });
                          } else if (match.eventStatus === 'Completed') {
                            navigation.navigate('CricketCompleted', {
                              matchId: match.recordId,
                            });
                          } else if (match.eventStatus === 'Abandoned') {
                            navigation.navigate('CricketCompleted', {
                              matchId: match.recordId,
                            });
                          } else {
                            handleMatchNavigate(match.recordId);
                          }
                        }}
                        style={{
                          borderRadius: 5,
                          overflow: 'hidden',
                          width: '100%',
                          backgroundColor: '#fff',
                          flexDirection: 'column',
                          borderWidth: 0.5,
                          borderColor: '#cccccc',
                          justifyContent: 'space-between',
                          ...Platform.select({
                            ios: {
                              shadowColor: 'red',
                              shadowOpacity: 0.8,
                              shadowOffset: {width: 20, height: 10},
                            },
                          }),
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            //  backgroundColor:"#f3f"
                          }}>
                          {/* Match Details */}
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '100%',
                              padding: 2,
                            }}>
                            <View
                              style={{
                                width: '70%',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomRightRadius: 50,
                                position: 'relative',

                                paddingHorizontal: 8,
                                // backgroundColor:"#f4f"
                              }}>
                              <View
                                style={{
                                  backgroundColor: '#595959',
                                  borderRadius: 10,
                                  padding: 2,
                                  justifyContent: 'flex-end',
                                  alignItems: 'center',
                                  width: '15%',
                                }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    fontSize: hp(1.2),
                                  }}>
                                  {match.matchType}
                                </Text>
                              </View>
                              <Text
                                style={{
                                  fontSize: hp(1.4),
                                  padding: 10,
                                  color: '#000',
                                  fontWeight: 'bold',
                                  // position: 'absolute',
                                  // width: '70%',
                                  justifyContent: 'flex-end',
                                  alignItems: 'flex-end',
                                }}
                                numberOfLines={1}>
                                {match.tournamentName}
                              </Text>
                            </View>

                            {match.eventStatus === 'Lineups Out' && (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'rgba(25, 200, 105, 0.1)',
                                  borderRadius: 12,
                                  paddingHorizontal: 10,
                                  paddingVertical: 4,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: hp(1.3),
                                    color: '#19c869',
                                    fontWeight: '900',
                                    marginLeft: 5,
                                  }}>
                                  Lineups Out
                                </Text>
                              </View>
                            )}
                          </View>

                          <View>
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                // justifyContent: 'space-between',
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '22%',
                                  // gap: 10,
                                }}>
                                <View style={{padding: 2}}>
                                  {team1Data.logoPath ? (
                                    <Image
                                      source={{
                                        uri: team1Data.logoPath,
                                        cache: 'force-cache',
                                      }}
                                      style={{
                                        width: 60,
                                        height: 60,
                                      }}
                                    />
                                  ) : (
                                    <View
                                      style={{
                                        width: 40,
                                        height: 40,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <Text style={{fontSize: hp(1.5)}}>
                                        No Logo
                                      </Text>
                                    </View>
                                  )}
                                </View>
                              </View>

                              <View
                                style={{
                                  width: '50%',
                                  // backgroundColor: '#f5f',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 10,
                                    width: '100%',
                                    // backgroundColor: '#f5f',
                                  }}>
                                  <View
                                    style={{
                                      width: '30%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      display: 'flex',
                                      // backgroundColor: '#126',
                                    }}>
                                    <View>
                                      <Text
                                        style={{
                                          fontWeight: 'bold',
                                          fontFamily: 'Roboto-Bold',
                                          color: '#000',
                                          fontStyle: 'italic',
                                          fontSize: hp(2),
                                        }}>
                                        {team1Data.shortName}
                                      </Text>
                                    </View>
                                  </View>

                                  <View>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: hp(1.5),
                                        backgroundColor: '#dfe1ec',
                                        width: 25,
                                        height: 25,
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                        borderRadius: 17.5,
                                        // paddingVertical: 5,
                                      }}>
                                      VS
                                    </Text>
                                  </View>

                                  <View
                                    style={{
                                      width: '30%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      display: 'flex',
                                    }}>
                                    <View>
                                      <Text
                                        style={{
                                          fontWeight: 'bold',
                                          fontFamily: 'Roboto-Bold',
                                          color: '#000',
                                          fontStyle: 'italic',
                                          fontSize: hp(2),
                                        }}>
                                        {team2Data.shortName}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    // gap: 15,
                                    width: '100%',
                                    // backgroundColor: '#f5f',
                                  }}>
                                  <View
                                    style={{
                                      // gap: 40,
                                      width: '40%',
                                      justifyContent: 'flex-end',
                                      alignItems: 'flex-end',
                                      display: 'flex',
                                      // backgroundColor: '#f5f',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        color: '#000',
                                      }}
                                      numberOfLines={1}>
                                      {team1Data.identifier}
                                    </Text>
                                  </View>

                                  <View
                                    style={{
                                      width: '40%',
                                      justifyContent: 'flex-start',
                                      alignItems: 'flex-start',
                                      display: 'flex',
                                      // backgroundColor: '#f5f',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        color: '#000',
                                        textAlign: 'center',
                                      }}
                                      numberOfLines={1}>
                                      {team2Data.identifier}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '25%',
                                  // gap: 10,
                                  // backgroundColor: '#126',
                                }}>
                                <View style={{padding: 2}}>
                                  {team2Data.logoPath ? (
                                    <Image
                                      source={{
                                        uri: team2Data.logoPath,
                                        cache: 'force-cache',
                                      }}
                                      style={{
                                        width: 60,
                                        height: 60,
                                        // borderRadius: 30,
                                        // borderWidth: 1,
                                        // borderColor: '#c0c0c0',
                                      }}
                                    />
                                  ) : (
                                    <View
                                      style={{
                                        width: 40,
                                        height: 40,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <Text style={{fontSize: hp(1.5)}}>
                                        No Logo
                                      </Text>
                                    </View>
                                  )}
                                </View>
                              </View>
                            </View>
                          </View>

                          {/* Countdown Timer Section */}
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              // backgroundColor: '#126',
                              // gap: 5,
                            }}>
                            <View
                              style={{
                                padding: 5,
                              }}>
                              <Text
                                style={{
                                  fontSize: hp(1.5),
                                  color: 'red',
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                }}>
                                <CountdownTimer
                                  matchTime={match.matchTime}
                                  eventStatus={match.eventStatus}
                                />
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  fontSize: hp(1.4),
                                  color: '#000',
                                  fontWeight: '500',
                                }}>
                                {match.matchTime.split(' ')[1]}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              padding: 5,
                              width: wp('95%'),
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              // borderTopWidth: 0.5,
                              borderColor: '#cccccc',
                              paddingLeft: 10,
                              // paddingRight: 10,
                            }}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 7,
                                alignItems: 'center',
                                // backgroundColor: '#3D55C0',
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: 3,
                                  // borderRadius: 5,
                                  // backgroundColor: '#3D55C0',
                                }}>
                                <MaterialCommunityIcons
                                  name="tshirt-v-outline"
                                  size={16}
                                  color="#000"
                                />
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    borderRadius: 15,
                                    color: '#000',
                                    padding: 1,
                                    fontSize: hp(1.2),
                                  }}>
                                  {match.teamCount} Teams
                                </Text>
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: 3,
                                  alignItems: 'center',
                                }}>
                                <MaterialCommunityIcons
                                  name="ticket-confirmation-outline"
                                  size={16}
                                  color="#000"
                                />
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    fontSize: hp(1.2),
                                    color: '#000',
                                  }}>
                                  {match.contestCount} Contest
                                </Text>
                              </View>
                            </View>
                            {/* <Pressable onPress={() => setIsPopupVisible(true)}> */}
                            {/* <MaterialCommunityIcons
                              name="bell-circle"
                              size={22}
                              color="grey"
                            /> */}
                            {/* <AppExitModel
        visible={exitModalVisible}
        onCancel={() => setExitModalVisible(false)}
        onExit={exitApp}
      /> */}
                            {/* <MatchReminder
                              visible={isPopupVisible}
                              onClose={() => setIsPopupVisible(false)}
                            />
                          </Pressable> */}
                          </View>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
};

const CustomHeader2 = () => {
  const navigation = useNavigation();
  const reloadStatus = useSelector(state => state.fantasy.reloadStatus);
  const walletBalance = useSelector(state => state.fantasy.WalletBalance);

  const [userDetails, setUserDetails] = useState({balance: 0});
  useEffect(() => {
    console.log('hitting reload status api');
    if (reloadStatus === 'reload') {
      getReferalCodeData();
    }
  }, [reloadStatus]);
  useEffect(() => {
    getReferalCodeData();
  }, []);
  const dispatch = useDispatch();
  const getReferalCodeData = async () => {
    try {
      // console.log('Hitting API...');
      const token = await AsyncStorage.getItem('jwtToken');
      const recordId = await AsyncStorage.getItem('userId');

      if (!token) {
        // console.log('No token found in AsyncStorage');
        return;
      }

      // console.log('Token:', token);
      const body = {recordId};

      const response = await axios.post(`${api}/admin/user/getUserById`, body, {
        headers: {Authorization: `Bearer ${token}`},
      });

      // console.log('Full API Response:', response.data);

      if (response.data?.userDtoList?.length > 0) {
        setUserDetails(response.data?.userDtoList[0]);
        dispatch(setWalletBalance(response.data?.userDtoList[0].balance));
        dispatch(setReferalcode(response.data?.userDtoList[0].referralCode));
        const balance = response.data.userDtoList[0].balance;
        await AsyncStorage.setItem('walletBalance', JSON.stringify(balance));

        // console.log(
        // response.data?.userDtoList[0],
        // 'response.data?.userDtoList[0]',
        // );
      } else {
        // console.log('No referral code found in response');
      }
    } catch (error) {
      // console.log(
      // 'API Error:',
      // error.response ? error.response.data : error.message,
      // );
    }
  };

  return (
    <LinearGradient
      colors={['#3E57C4', '#1E2E74', '#000']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={
        {
          // paddingTop: Platform.OS === 'ios' ? 50 : 0
        }
      }>
      {/* <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}> */}
      <View
        style={{
          flexDirection: 'row',
          // padding: 3,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          gap: 5,
        }}>
        <Pressable
          style={{justifyContent: 'flex-start', padding: 10}}
          onPress={() => navigation.toggleDrawer()}>
          <Feather name="menu" size={22} color={'white'} />
        </Pressable>

        {/* <Image
            source={require('./assets/IMPACT11LogoExtended.png')}
            style={{
              width: 120,
              height: 20,
              borderRadius: 20,
              resizeMode: 'contain',
            }}
          /> */}

        <Text style={{color: '#fff', fontWeight: '600', fontSize: hp(2)}}>
          My Matches
        </Text>
        {/* <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 18,
            }}>
            <Pressable
              onPress={() => navigation.navigate('ADD CASH')}
              style={{
                borderColor: 'rgb(179, 179, 179)',
                borderRadius: 4,
                justifyContent: 'space-around',
                flexDirection: 'row',
                minWidth: 75,
                backgroundColor: '#6C77AA',
                alignItems: 'center',
                borderWidth: 0.8,
                paddingLeft: 2,
                paddingRight: 2,
                gap: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Bold',
                  paddingLeft: 2,
                }}>
                ₹ {userDetails.balance || 0}
              </Text>
              <Ionicons name="wallet-outline" size={24} color="white" />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('HomeNotification')}
              style={{marginRight: 15, alignItems: 'center'}}>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </Pressable>
          </View> */}
      </View>
      {/* </View> */}
    </LinearGradient>
  );
};

const ProfileHeader2 = () => {
  const navigation = useNavigation();
  const reloadStatus = useSelector(state => state.fantasy.reloadStatus);
  const walletBalance = useSelector(state => state.fantasy.WalletBalance);

  const [userDetails, setUserDetails] = useState({balance: 0});
  useEffect(() => {
    console.log('hitting reload status api');
    if (reloadStatus === 'reload') {
      getReferalCodeData();
    }
  }, [reloadStatus]);
  useEffect(() => {
    getReferalCodeData();
  }, []);
  const dispatch = useDispatch();
  const getReferalCodeData = async () => {
    try {
      // console.log('Hitting API...');
      const token = await AsyncStorage.getItem('jwtToken');
      const recordId = await AsyncStorage.getItem('userId');

      if (!token) {
        // console.log('No token found in AsyncStorage');
        return;
      }

      // console.log('Token:', token);
      const body = {recordId};

      const response = await axios.post(`${api}/admin/user/getUserById`, body, {
        headers: {Authorization: `Bearer ${token}`},
      });

      // console.log('Full API Response:', response.data);

      if (response.data?.userDtoList?.length > 0) {
        setUserDetails(response.data?.userDtoList[0]);
        dispatch(setWalletBalance(response.data?.userDtoList[0].balance));
        dispatch(setReferalcode(response.data?.userDtoList[0].referralCode));
        const balance = response.data.userDtoList[0].balance;
        await AsyncStorage.setItem('walletBalance', JSON.stringify(balance));

        // console.log(
        // response.data?.userDtoList[0],
        // 'response.data?.userDtoList[0]',
        // );
      } else {
        // console.log('No referral code found in response');
      }
    } catch (error) {
      // console.log(
      // 'API Error:',
      // error.response ? error.response.data : error.message,
      // );
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this fantasy app! https://yourapp.link', // Replace with your URL or message
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log('Shared with activity type: ', result.activityType);
        } else {
          // console.log('Shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        // console.log('Share dismissed.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <LinearGradient colors={['#020202', '#020202',"#020202" ]}>
      <View
        style={{
          flexDirection: 'row',
          // padding: 3,
          padding: 10,
          alignItems: 'center',
          // justifyContent: 'space-between',
          // width: '100%',
          // gap: 5,
          // paddingHorizontal:15
          // backgroundColor: '#f5f',
        }}>
        <Pressable
          style={{justifyContent: 'flex-start', padding: 10}}
          onPress={() => navigation.toggleDrawer()}>
          <Feather name="menu" size={22} color={'white'} />
        </Pressable>

        <Text style={{color: '#fff', fontWeight: '600', fontSize: hp(2)}}>
          Profile
        </Text>
        <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              // gap: 18,
              // backgroundColor: '#f5f',
              padding: 10,
              paddingHorizontal: 15,
            }}>
            
           
            <Pressable 
             onPress={onShare}>
              <MaterialCommunityIcons name="share-variant" size={24} color="white" />
            </Pressable>
            
          </View>
      </View>
      {/* </View> */}
    </LinearGradient>
  );
};

const ReferAndEarnHeader = () => {
  const navigation = useNavigation();
  const reloadStatus = useSelector(state => state.fantasy.reloadStatus);
  const walletBalance = useSelector(state => state.fantasy.WalletBalance);

  const [userDetails, setUserDetails] = useState({balance: 0});
  useEffect(() => {
    console.log('hitting reload status api');
    if (reloadStatus === 'reload') {
      getReferalCodeData();
    }
  }, [reloadStatus]);
  useEffect(() => {
    getReferalCodeData();
  }, []);
  const dispatch = useDispatch();
  const getReferalCodeData = async () => {
    try {
      // console.log('Hitting API...');
      const token = await AsyncStorage.getItem('jwtToken');
      const recordId = await AsyncStorage.getItem('userId');

      if (!token) {
        // console.log('No token found in AsyncStorage');
        return;
      }

      // console.log('Token:', token);
      const body = {recordId};

      const response = await axios.post(`${api}/admin/user/getUserById`, body, {
        headers: {Authorization: `Bearer ${token}`},
      });

      // console.log('Full API Response:', response.data);

      if (response.data?.userDtoList?.length > 0) {
        setUserDetails(response.data?.userDtoList[0]);
        dispatch(setWalletBalance(response.data?.userDtoList[0].balance));
        dispatch(setReferalcode(response.data?.userDtoList[0].referralCode));
        const balance = response.data.userDtoList[0].balance;
        await AsyncStorage.setItem('walletBalance', JSON.stringify(balance));

        // console.log(
        // response.data?.userDtoList[0],
        // 'response.data?.userDtoList[0]',
        // );
      } else {
        // console.log('No referral code found in response');
      }
    } catch (error) {
      // console.log(
      // 'API Error:',
      // error.response ? error.response.data : error.message,
      // );
    }
  };

  return (
    <LinearGradient colors={['#000', '#000']}>
      <View
        style={{
          flexDirection: 'row',
          // padding: 3,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          gap: 5,
        }}>
        <Pressable
          style={{justifyContent: 'flex-start', padding: 10}}
          onPress={() => navigation.toggleDrawer()}>
          <Feather name="menu" size={22} color={'white'} />
        </Pressable>

        <Text style={{color: '#fff', fontWeight: '600', fontSize: hp(2)}}>
          Refer And Earn
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Pressable
          //  onPress={() => navigation.navigate('MyinfoAndSettings')}
          >
            <Feather name="info" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
      {/* </View> */}
    </LinearGradient>
  );
};
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      // console.log('🔍 Fetched Token:', token);
      setIsAuthenticated(!!token); // ✅ Ensure it's boolean
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{isAuthenticated, setIsAuthenticated, isLoading}}>
      {/* {console.log(
        '🚀 AuthProvider Rendered, isAuthenticated:',
        isAuthenticated,
      )} */}
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function AppWrapper() {
  const {isAuthenticated, isLoading} = useAuth();
  // console.log('🌀 AppWrapper Rendered, isAuthenticated:', isAuthenticated);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#3385ff" />
      </View>
    );
  }

  return <StackNavigator />;
}

const Stack = createStackNavigator();
function StackNavigator() {
  const {isAuthenticated} = useAuth();
  // console.log('🔥 StackNavigator Rendered, isAuthenticated:', isAuthenticated); // Debugging

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="DrawerNavigation" options={{headerShown: false}}>
            {() => <DrawerNavigation />}
          </Stack.Screen>
          <Stack.Screen
            name="ContestScreen"
            component={Contest}
            options={{
              headerShown: false,
              headerTitle: () => <ContestHeader />,
            }}
          />
          <Stack.Screen
            name="CricketMatches"
            component={CricketMatches}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PermissionSetting"
            component={PermissionSetting}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserProfileScreen"
            component={UserProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateTeam"
            component={CreateTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegisterPage"
            component={RegisterPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CricketPonits"
            component={CricketPonits}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Football"
            component={Football}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ContestDetailScreen"
            component={ContestDetailScreen}
            options={{
              headerTitle: () => <ContestHeader />,
              headerStyle: {backgroundColor: '#3385ff'},
              headerTintColor: '#fff',
              headerShown: false,
            }}
          />

          <Stack.Screen
            options={{
              headerTitle: () => <ContestHeader />,
              headerStyle: {
                backgroundColor: '#3385ff',
              },
              headerTintColor: '#fff',
              headerShown: false,
            }}
            name="MyTeam"
            component={MyTeam}
          />
          <Stack.Screen
            options={{
              headerTitle: () => <ContestHeader />,
              headerStyle: {
                backgroundColor: '#3385ff',
              },
              headerTintColor: '#fff',
              headerShown: false,
            }}
            name="MyContest"
            component={MyContest}
          />

          <Stack.Screen
            options={{
              headerTitle: () => <ContestHeader />,
              headerStyle: {
                backgroundColor: '#3385ff',
              },
              headerTintColor: '#fff',
              headerShown: false,
            }}
            name="SelectTeam"
            component={SelectTeam}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="CreateContest"
            component={CreateContest}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="ShareContest"
            component={ShareContest}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="ImpactPlayerSelection"
            component={ImpactPlayerSelection}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="CVCSelection"
            component={CVCSelection}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="TeamPreview"
            component={TeamPreview}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="EditTeamPreview"
            component={EditTeamPreview}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="MyTeam_TeamPreview"
            component={MyTeam_TeamPreview}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="CompletedTeamPreview"
            component={CompletedTeamPreview}
          />

          <Stack.Screen
            options={{
              headerTintColor: '#fff',
              headerTitle: 'Notifications',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTitleStyle: {
                fontSize: hp(1.8),
              },
            }}
            name="HomeNotification"
            component={HomeNotification}
          />

          <Stack.Screen
            name="My Transactions"
            component={MyTransactions}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTitleStyle: {
                fontSize: hp(1.9),
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="All"
            component={All}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Offers"
            component={Offers}
          />
          <Stack.Screen
            name="MyinfoAndSettings"
            component={MyinfoAndSettings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WriteToUs"
            component={WriteToUs}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="GettingStarted"
            component={GettingStarted}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Impact11"
            component={Impact11}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GetTheApp"
            component={GetTheApp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LostNumber"
            component={LostNumber}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QOTP"
            component={QOTP}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QSignUp"
            component={QSignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="StillPlay"
            component={StillPlay}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="PlayingOnImpact"
            component={PlayingOnImpact}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditTeams"
            component={EditTeams}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditAfterMatch"
            component={EditAfterMatch}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DeleteTeam"
            component={DeleteTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SwitchTeams"
            component={SwitchTeams}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MultipleTeam"
            component={MultipleTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="IncorrectLineup"
            component={IncorrectLineup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PlayerDoNotPlay"
            component={PlayerDoNotPlay}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ContestJoin"
            component={ContestJoin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PublicPrivateContest"
            component={PublicPrivateContest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FlexibileContest"
            component={FlexibileContest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UnfilledContest"
            component={UnfilledContest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FindContest"
            component={FindContest}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ScoresAndPoints"
            component={ScoresAndPoints}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScorePoints"
            component={ScorePoints}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PointsNotUpdated"
            component={PointsNotUpdated}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PointsForSuperOver"
            component={PointsForSuperOver}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SubstitutePlayer"
            component={SubstitutePlayer}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="HSMyBalance"
            component={HSMyBalance}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WithDrawWinnings"
            component={WithDrawWinnings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WithdrawalRequest"
            component={WithdrawalRequest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CheckStatusWithdrawal"
            component={CheckStatusWithdrawal}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WithdrawalBankAccDetails"
            component={WithdrawalBankAccDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WithdrawalRequestCancel"
            component={WithdrawalRequestCancel}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DiscountBonus"
            component={DiscountBonus}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddCashMyBalance"
            component={AddCashMyBalance}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ManageWallets"
            component={ManageWallets}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ManageCards"
            component={ManageCards}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Winnings"
            component={Winnings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="InformCashPrize"
            component={InformCashPrize}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ReceiveMyWinnings"
            component={ReceiveMyWinnings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Distributed"
            component={Distributed}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TaxWinnings"
            component={TaxWinnings}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ProfileAndVerification"
            component={ProfileAndVerification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangeMobileNumber"
            component={ChangeMobileNumber}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangeMailId"
            component={ChangeMailId}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangeTeamName"
            component={ChangeTeamName}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangeState"
            component={ChangeState}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Calculate"
            component={Calculate}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NotReceivingMail"
            component={NotReceivingMail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VerifyImapact11P"
            component={VerifyImapact11P}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PanVerify"
            component={PanVerify}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AadharVerifyWhy"
            component={AadharVerifyWhy}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PanReject"
            component={PanReject}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BankAccReject"
            component={BankAccReject}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangePan"
            component={ChangePan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BankAccChange"
            component={BankAccChange}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CompleteVerification"
            component={CompleteVerification}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="OffersAndRewards"
            component={OffersAndRewards}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="InviteFriends"
            component={InviteFriends}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Earn"
            component={Earn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MaximumInvite"
            component={MaximumInvite}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Security"
            component={Security}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AccountSecurity"
            component={AccountSecurity}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Ensure"
            component={Ensure}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Guide"
            component={Guide}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LegalityScreen"
            component={LegalityScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GameLegal"
            component={GameLegal}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Allow"
            component={Allow}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="FairPlay"
            component={FairPlay}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FairPlayViolation"
            component={FairPlayViolation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Suspicious"
            component={Suspicious}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AccessToChangeTeam"
            component={AccessToChangeTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MatchDeadline"
            component={MatchDeadline}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailsSafe"
            component={DetailsSafe}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LosingGame"
            component={LosingGame}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="CricketHome"
            component={CricketHome}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="CricketLive"
            component={CricketLive}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CricketLiveMatches"
            component={CricketLiveMatches}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CricketUpcomingMatches"
            component={CricketUpcomingMatches}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CricketCompletedMatches"
            component={CricketCompletedMatches}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CricketCompleted"
            component={CricketCompleted}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TierScreen"
            component={TierScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Winning"
            component={Winning}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Leaderboard"
            component={Leaderboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Scoreboard"
            component={Scoreboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Stats"
            component={Stats}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DiscardPopup"
            component={DiscardPopup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ReferalCodePopup"
            component={ReferalCodePopup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WinningsBreakup"
            component={WinningsBreakup}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Recently Played"
            component={RecentlyPlayed}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTitleStyle: {
                fontSize: hp(1.8),
              },
            }}
          />

          <Stack.Screen
            name="ProfileRecentlyPlayed"
            component={ProfileRecentlyPlayed}
            options={{
              title: 'Recently Played',
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTitleStyle: {
                fontSize: hp(1.8),
              },
            }}
          />

          <Stack.Screen
            name="ADD CASH"
            component={AddCash}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),

              headerTitleStyle: {
                fontSize: hp(1.8),
              },
            }}
          />

          <Stack.Screen
            name="WITHDRAW"
            component={Withdraw}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: hp(1.8),
              },
            }}
          />

          <Stack.Screen
            name="PAYMENT OPTIONS"
            component={PaymentScreen}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: hp(2),
              },
            }}
          />

          <Stack.Screen
            name="Verify Account"
            component={KYC}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTitleStyle: {
                fontSize: hp(2),
              },
              headerTintColor: '#fff',
            }}
          />

          <Stack.Screen
            name="Verify PAN Card"
            component={VerifyPanCard}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: hp(2),
              },
            }}
          />

          <Stack.Screen
            name="Verify Bank Account"
            component={VerifyBankAcc}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: hp(2),
              },
            }}
          />

          <Stack.Screen
            name="My Balance"
            component={MyBalance}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTitleStyle: {
                fontSize: hp(1.9),
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="EditUserTeam"
            component={EditTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditCVCSelection"
            component={EditCVCSelection}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CopyTeam"
            component={CopyTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CopyCVCSelection"
            component={CopyCVCSelection}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FantacyPointsSystems"
            component={FantacyPointsSystems}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SwapTeam"
            component={SwapTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LiveTeamPreview"
            component={LiveTeamPreview}
            options={{headerShown: false}}
          />
            <Stack.Screen
            
            name="VerifyEmail"
            component={VerifyEmail}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTitleStyle: {
                fontSize: hp(2),
              },
            }}
          />
            <Stack.Screen
            
            name="VerifyMobileNumber"
            component={VerifyMobileNumber}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTitleStyle: {
                fontSize: hp(2),
              },
            }}
          />
           <Stack.Screen
            name="Otp"
            component={Otp}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="VerifyEmailOtp"
            component={VerifyEmailOtp}
            options={{headerShown: false}}
          />

          {/* <Stack.Screen name="LoginEmail" component={LoginEmail} options={{ headerShown: false }} /> */}
        </>
      ) : (
        <>
          <Stack.Screen
            name="CarouselScreen"
            component={CarouselScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LoginEmail"
            component={LoginEmail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginPhone"
            component={LoginPhone}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Nameregister"
            component={NameRegister}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegisterPage"
            component={RegisterPage}
            options={{headerShown: false}}
          />

          <Stack.Screen name="DrawerNavigation" options={{headerShown: false}}>
            {() => <DrawerNavigation />}
          </Stack.Screen>
          <Stack.Screen
            name="PermissionSetting"
            component={PermissionSetting}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserProfileScreen"
            component={UserProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ContestScreen"
            component={Contest}
            options={{
              headerTitle: () => <ContestHeader />,
              headerStyle: {backgroundColor: '#3385ff'},
              headerTintColor: '#fff',
              headerShown: false,
            }}
          />
          <Stack.Screen name="CreateContest" component={CreateContest} />

          <Stack.Screen
            options={{headerShown: false}}
            name="ShareContest"
            component={ShareContest}
          />
          <Stack.Screen
            name="CopyTeam"
            component={CopyTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CopyCVCSelection"
            component={CopyCVCSelection}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelectTeam"
            component={SelectTeam}
            options={{
              headerTitle: () => <ContestHeader />,
              headerStyle: {backgroundColor: '#3385ff'},
              headerTintColor: '#fff',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="CricketMatches"
            component={CricketMatches}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ContestDetailScreen"
            component={ContestDetailScreen}
            options={{
              headerTitle: () => <ContestHeader />,
              headerStyle: {backgroundColor: '#3385ff'},
              headerTintColor: '#fff',
              headerShown: false,
            }}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="MyTeam"
            component={MyTeam}
          />

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="MyContest"
            component={MyContest}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ImpactPlayerSelection"
            component={ImpactPlayerSelection}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="CVCSelection"
            component={CVCSelection}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="TeamPreview"
            component={TeamPreview}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="MyTeam_TeamPreview"
            component={MyTeam_TeamPreview}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="CompletedTeamPreview"
            component={CompletedTeamPreview}
          />

          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: '#3385ff',
              },
              headerTitle: 'Notifications',
              headerTitleStyle: {
                color: '#fff',
                fontSize: hp(2),
              },
              headerTintColor: '#fff',
            }}
            name="HomeNotification"
            component={HomeNotification}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="All"
            component={All}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Offers"
            component={Offers}
          />
          <Stack.Screen
            name="MyinfoAndSettings"
            component={MyinfoAndSettings}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="GettingStarted"
            component={GettingStarted}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Impact11"
            component={Impact11}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GetTheApp"
            component={GetTheApp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LostNumber"
            component={LostNumber}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QOTP"
            component={QOTP}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QSignUp"
            component={QSignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="StillPlay"
            component={StillPlay}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="PlayingOnImpact"
            component={PlayingOnImpact}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditTeams"
            component={EditTeams}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditAfterMatch"
            component={EditAfterMatch}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DeleteTeam"
            component={DeleteTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SwitchTeams"
            component={SwitchTeams}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MultipleTeam"
            component={MultipleTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="IncorrectLineup"
            component={IncorrectLineup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PlayerDoNotPlay"
            component={PlayerDoNotPlay}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ContestJoin"
            component={ContestJoin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PublicPrivateContest"
            component={PublicPrivateContest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FlexibileContest"
            component={FlexibileContest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UnfilledContest"
            component={UnfilledContest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FindContest"
            component={FindContest}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ScoresAndPoints"
            component={ScoresAndPoints}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScorePoints"
            component={ScorePoints}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PointsNotUpdated"
            component={PointsNotUpdated}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PointsForSuperOver"
            component={PointsForSuperOver}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SubstitutePlayer"
            component={SubstitutePlayer}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="HSMyBalance"
            component={HSMyBalance}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WithDrawWinnings"
            component={WithDrawWinnings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WithdrawalRequest"
            component={WithdrawalRequest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CheckStatusWithdrawal"
            component={CheckStatusWithdrawal}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WithdrawalBankAccDetails"
            component={WithdrawalBankAccDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WithdrawalRequestCancel"
            component={WithdrawalRequestCancel}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DiscountBonus"
            component={DiscountBonus}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddCashMyBalance"
            component={AddCashMyBalance}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ManageWallets"
            component={ManageWallets}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ManageCards"
            component={ManageCards}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Winnings"
            component={Winnings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="InformCashPrize"
            component={InformCashPrize}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ReceiveMyWinnings"
            component={ReceiveMyWinnings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Distributed"
            component={Distributed}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TaxWinnings"
            component={TaxWinnings}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ProfileAndVerification"
            component={ProfileAndVerification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangeMobileNumber"
            component={ChangeMobileNumber}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangeMailId"
            component={ChangeMailId}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangeTeamName"
            component={ChangeTeamName}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangeState"
            component={ChangeState}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Calculate"
            component={Calculate}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NotReceivingMail"
            component={NotReceivingMail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VerifyImapact11P"
            component={VerifyImapact11P}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PanVerify"
            component={PanVerify}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AadharVerifyWhy"
            component={AadharVerifyWhy}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PanReject"
            component={PanReject}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BankAccReject"
            component={BankAccReject}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangePan"
            component={ChangePan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BankAccChange"
            component={BankAccChange}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CompleteVerification"
            component={CompleteVerification}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="OffersAndRewards"
            component={OffersAndRewards}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="InviteFriends"
            component={InviteFriends}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Earn"
            component={Earn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MaximumInvite"
            component={MaximumInvite}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Security"
            component={Security}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AccountSecurity"
            component={AccountSecurity}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Ensure"
            component={Ensure}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Guide"
            component={Guide}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LegalityScreen"
            component={LegalityScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GameLegal"
            component={GameLegal}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Allow"
            component={Allow}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="FairPlay"
            component={FairPlay}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FairPlayViolation"
            component={FairPlayViolation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Suspicious"
            component={Suspicious}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AccessToChangeTeam"
            component={AccessToChangeTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MatchDeadline"
            component={MatchDeadline}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailsSafe"
            component={DetailsSafe}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LosingGame"
            component={LosingGame}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="CricketHome"
            component={CricketHome}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="CricketLive"
            component={CricketLive}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CricketLiveMatches"
            component={CricketLiveMatches}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CricketUpcomingMatches"
            component={CricketUpcomingMatches}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CricketCompletedMatches"
            component={CricketCompletedMatches}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CricketCompleted"
            component={CricketCompleted}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TierScreen"
            component={TierScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Winning"
            component={Winning}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Leaderboard"
            component={Leaderboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Scoreboard"
            component={Scoreboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Stats"
            component={Stats}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DiscardPopup"
            component={DiscardPopup}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="EditCVCSelection"
            component={EditCVCSelection}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WinningsBreakup"
            component={WinningsBreakup}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Recently Played"
            component={RecentlyPlayed}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTitleStyle: {
                fontSize: hp(1.8),
              },
            }}
          />

          <Stack.Screen
            name="ProfileRecentlyPlayed"
            component={ProfileRecentlyPlayed}
            options={{
              title: 'Recently Played',
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTitleStyle: {
                fontSize: hp(1.8),
              },
            }}
          />

          <Stack.Screen
            name="ADD CASH"
            component={AddCash}
            options={{
              headerStyle: {
                backgroundColor: '#3e57c4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: hp(1.8),
              },
            }}
          />

          <Stack.Screen
            name="WITHDRAW"
            component={Withdraw}
            options={{
              headerStyle: {
                backgroundColor: '#3e57c4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: hp(1.8),
              },
            }}
          />

          <Stack.Screen
            name="PAYMENT OPTIONS"
            component={PaymentScreen}
            options={{
              headerStyle: {
                backgroundColor: '#3e57c4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: hp(2),
              },
            }}
          />

          <Stack.Screen
            name="Verify Account"
            component={KYC}
            options={{
              headerStyle: {
                backgroundColor: '#3e57c4',
                borderBottomWidth: 0,
              },
              headerTitleStyle: {
                fontSize: hp(2),
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="CreateTeam"
            component={CreateTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditUserTeam"
            component={EditTeam}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Verify PAN Card"
            component={VerifyPanCard}
            options={{
              headerStyle: {
                backgroundColor: '#3e57c4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: hp(2),
              },
            }}
          />

          <Stack.Screen
            name="Verify Bank Account"
            component={VerifyBankAcc}
            options={{
              headerStyle: {
                backgroundColor: '#3e57c4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: hp(2),
              },
            }}
          />

          <Stack.Screen
            name="My Balance"
            component={MyBalance}
            options={{
              headerStyle: {
                backgroundColor: '#3e57c4',
                borderBottomWidth: 0,
              },
              headerTitleStyle: {
                fontSize: hp(1.9),
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="FantacyPointsSystems"
            component={FantacyPointsSystems}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SwapTeam"
            component={SwapTeam}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LiveTeamPreview"
            component={LiveTeamPreview}
            options={{headerShown: false}}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="EditTeamPreview"
            component={EditTeamPreview}
          />
          <Stack.Screen
            
            name="VerifyEmail"
            component={VerifyEmail}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTitleStyle: {
                fontSize: hp(2),
              },
            }}
          />
           <Stack.Screen
            
            name="VerifyMobileNumber"
            component={VerifyMobileNumber}
            options={{
              headerTintColor: '#fff',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{flex: 1}}
                />
              ),
              headerTitleStyle: {
                fontSize: hp(2),
              },
            }}
          />
           <Stack.Screen
            name="VerifyEmailOtp"
            component={VerifyEmailOtp}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function DrawerNavigation({setIsAuthenticated}) {
  const Drawer = createDrawerNavigator();
  const [userDetails, setUserDetails] = useState(null);
  const [profImage, setprofImage] = useState()
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      const recordId = await AsyncStorage.getItem('userId');
      const profileImage = await AsyncStorage.getItem('profileImage');
      setprofImage(profileImage)
      if (!token) return;

      try {
        const response = await axios.post(
          `${api}/admin/user/getUserById`,
          {recordId},
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );

        if (response.data?.userDtoList?.length > 0) {
          setUserDetails(response.data.userDtoList[0]);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerHeader {...props} />}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        swipeEnabled: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#f0f8ff', // Change this to your desired color
        },
      }}>
      <Drawer.Screen name="home" options={{drawerItemStyle: {height: 0}}}>
        {() => (
          <BottomTabs
            setIsAuthenticated={setIsAuthenticated}
            userDetails={userDetails}
            profImage = {profImage}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Help & Support"
        component={HelpAndSupport}
        options={{
          headerShown: false,
          drawerIcon: ({color, size}) => (
            <Feather name="headphones" size={22} color={'#3e57c4'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Fantasy Point System"
        component={FantacyPointsSystems}
        options={{
          headerShown: false,
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="signal-cellular-outline"
              size={18}
              color="#3e57c4"
            />
          ),
        }}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: ({color, size}) => (
            <Image
              source={require('./assets/Icon-HowToPlay.png')}
              style={{width: 20, height: 22}}
              resizeMode="cover"
            />
          ),
        }}
        name="How To Play?"
        component={HowToPlay}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: ({color, size}) => (
            <Image
              source={require('./assets/Icon-Legality.png')}
              style={{width: 20, height: 24}}
            />
          ),
        }}
        name="Legality"
        component={Legality}
      />
      <Drawer.Screen
        name="Terms & Condition"
        component={TermsAndCondition}
        options={{
          headerShown: false,
          drawerIcon: ({color, size}) => (
            <Feather name="file-text" size={22} color={'#3e57c4'} />
          ),
        }}
      />
      <Drawer.Screen
        name="About us"
        component={AboutUs}
        options={{
          headerShown: false,
          drawerIcon: ({color, size}) => (
            <Image
              source={require('./assets/Icon-Aboutus.png')}
              style={{width: 20, height: 26}}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function BottomTabs({setIsAuthenticated, navigation, userDetails,profImage}) {
  const {setTabName, TabName} = useSport();

  const handleTab = tabName => {
    setTabName(tabName);
  };
      const [ProfileImage, setProfileImage] = useState()
      useFocusEffect(
  React.useCallback(() => {
    const fetchImage = async () => {
      const profImage = await AsyncStorage.getItem('profileImage');
      if (profImage) setProfileImage(profImage);
    };
    fetchImage();
  }, [])
);

 
  
  return (
    <Tab.Navigator
  screenOptions={{
    tabBarStyle: {
      height: 60,
      // backgroundColor: '#f5f', // Light pinkish-purple
    },
    tabBarItemStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBarLabelStyle: {
      fontSize: 12,
      textAlign: 'center',
    },
    tabBarHideOnKeyboard: true,
  }}
>
  <Tab.Screen
    name="Home"
    component={Home}
    options={{
      tabBarLabel: 'Home',
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <View style={{ alignItems: 'center' }}>
          {TabName === 'home' ? (
            <LottieView
              source={require('../FantasyApp/assets/Home.json')}
              autoPlay
              loop={false}
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <Image
              source={require('../FantasyApp/assets/Home-Updated.png')}
              style={{ width: 25, height: 23 }}
            />
          )}
        </View>
      ),
    }}
    listeners={{ tabPress: () => handleTab('home') }}
  />

  <Tab.Screen
    name="MyMatches"
    component={MyMatchTab}
    options={{
      tabBarLabel: 'My Matches',
      tabBarIcon: ({ color, size }) => (
        <View style={{ alignItems: 'center' }}>
          {TabName === 'matches' ? (
            <LottieView
              source={require('../FantasyApp/assets/MyMatches.json')}
              autoPlay
              loop={false}
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <Image
              source={require('../FantasyApp/assets/MyMatches-Updated.png')}
              style={{ width: 25, height: 23 }}
            />
          )}
        </View>
      ),
      header: () => <CustomHeader2 />,
    }}
    listeners={{ tabPress: () => handleTab('matches') }}
  />

  <Tab.Screen
    name="ReferAndEarn"
    component={ReferAndEarn}
    options={{
      tabBarLabel: 'Refer & Earn',
      tabBarIcon: ({ color, size }) => (
        <View style={{ alignItems: 'center' }}>
          {TabName === 'referandearn' ? (
            <LottieView
              source={require('../FantasyApp/assets/Refer&Earn.json')}
              autoPlay
              loop={false}
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <Image
              source={require('../FantasyApp/assets/Refer-Updated.png')}
              style={{ width: 25, height: 23 }}
            />
          )}
        </View>
      ),
      header: () => <ReferAndEarnHeader />,
    }}
    listeners={{ tabPress: () => handleTab('referandearn') }}
  />

  <Tab.Screen
    name="Profile"
    component={ProfileScreen}
    options={{
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color, size }) => (
        <View style={{ alignItems: 'center' }}>
          {ProfileImage? (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${ProfileImage}`,
              }}
              style={{ width: 30, height: 30, borderRadius: 15 }}
            />
          ) : (
            <Image
              source={require('../FantasyApp/assets/userProfileIcon.png')}
              style={{ width: 30, height: 30, borderRadius: 15 }}
            />
          )}
        </View>
      ),

      header: () => <ProfileHeader2 />,
      
    }}
    listeners={{ tabPress: () => handleTab('profile') }}
    
  />
</Tab.Navigator>

  );
}

// Matches  Top tab

// const TopScreen = () => {
//   const Tab = createMaterialTopTabNavigator();
//   const { selectedSport, setSelectedSport } = useSport();

//   // Simplified tab index calculation
//   const tabIndex = selectedSport === 'All' ? 0 : selectedSport === 'Cricket' ? 1 : 1;

//   const navigationRef = React.useRef();

//   // Update when selectedSport changes
//   useEffect(() => {
//     if (navigationRef.current) {
//       // Only navigate if the route exists
//       const routeName = selectedSport === 'All' ? 'AllMatches' : selectedSport;
//       navigationRef.current.navigate(routeName);
//     }
//   }, [selectedSport]);

//   const CustomTabBar = ({ state, descriptors, navigation }) => {
//     navigationRef.current = navigation;

//     return (
//       <View style={{
//         flexDirection: 'row',
//         paddingVertical: 10,
//         paddingHorizontal: 10,
//         justifyContent: 'space-around',
//       }}>
//         {state.routes.map((route, index) => {
//           const { options } = descriptors[route.key];
//           const label = options.tabBarLabel || options.title || route.name;
//           const isFocused = tabIndex === index;
//           let iconSource;

//           if (route.name === 'AllMatches') {
//             iconSource = require('../FantasyApp/assets/all.png');
//           } else if (route.name === 'Cricket') {
//             iconSource = require('../FantasyApp/assets/cricket5.png');
//           } else {
//             iconSource = require('../FantasyApp/assets/Football.png');
//           }

//           const onPress = () => {
//             const selected = route.name === 'AllMatches' ? 'All' : route.name;
//             setSelectedSport(selected);
//           };

//           return (
//             <Pressable
//               key={route.key}
//               onPress={onPress}
//               style={[
//                 {
//                   borderRadius: 5,
//                   paddingVertical: 8,
//                   width: '32%',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   flexDirection: 'row',
//                   borderWidth: 1,
//                   borderColor: '#000',
//                 },
//                 {
//                   backgroundColor: isFocused ? '#000' : '#fff',
//                 },
//               ]}>
//               <Image
//                 source={iconSource}
//                 style={{
//                   width: 22,
//                   height: 22,
//                   tintColor: isFocused ? '#fff' : '#000',
//                   marginRight: 8,
//                 }}
//               />
//               <Text
//                 style={{
//                   color: isFocused ? '#fff' : '#000',
//                   fontWeight: '700',
//                 }}>
//                 {route.name === 'AllMatches' ? 'ALL' : label.toUpperCase()}
//               </Text>
//             </Pressable>
//           );
//         })}
//       </View>
//     );
//   };

//   // Component to show cricket when All is selected
//   const AllMatchesScreen = () => <CricketMatches/>;

//   return (
//     <Tab.Navigator
//       initialRouteName= 'AllMatches' 
//       screenOptions={{ swipeEnabled: false }}
//       tabBar={props => <CustomTabBar {...props} />}
//     >
//       <Tab.Screen
//         name="AllMatches"
//         component={AllMatchesScreen}
//         options={{ title: 'All' }}
//       />
//       <Tab.Screen name="Cricket" component={TabSelection} />
//       <Tab.Screen name="Football" component={TabSelection} />
//     </Tab.Navigator>
//   );
// };

const TopScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  const [selectedSport, setSelectedSport] = useState('All');

  // ✅ Ensure 'All' is default (adjust this inside your context default too)
  const tabIndex =
    selectedSport === 'All' ? 0 : selectedSport === 'Cricket' ? 1 : 2;

  const navigationRef = React.useRef();

  useEffect(() => {
    if (navigationRef.current) {
      const routeName = selectedSport === 'All' ? 'AllMatches' : selectedSport;
      navigationRef.current.navigate(routeName);
    }
  }, [selectedSport]);

  const CustomTabBar = ({state, descriptors, navigation}) => {
    navigationRef.current = navigation;

    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 10,
          justifyContent: 'space-around',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index; // ✅ Correct focus check
          let iconSource;

          if (route.name === 'AllMatches') {
            iconSource = require('../FantasyApp/assets/all.png');
          } else if (route.name === 'Cricket') {
            iconSource = require('../FantasyApp/assets/cricket5.png');
          } else {
            iconSource = require('../FantasyApp/assets/Football.png');
          }

          const onPress = () => {
            const selected = route.name === 'AllMatches' ? 'All' : route.name;
            setSelectedSport(selected);
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[
                {
                  borderRadius: 5,
                  paddingVertical: 8,
                  width: '32%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#000',
                },
                {
                  backgroundColor: isFocused ? '#000' : '#fff',
                },
              ]}>
              <Image
                source={iconSource}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: isFocused ? '#fff' : '#000',
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  color: isFocused ? '#fff' : '#000',
                  fontWeight: '700',
                }}>
                {route.name === 'AllMatches' ? 'ALL' : label.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  // ✅ Render cricket content in All tab by default
  const AllMatchesScreen = () => <TabSelection sport="Cricket" />;

  return (
    <Tab.Navigator
      initialRouteName="AllMatches" // ✅ Always start with AllMatches
      screenOptions={{swipeEnabled: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="AllMatches"
        component={AllMatchesScreen}
        options={{title: 'All'}}
      />
      <Tab.Screen name="Cricket" component={CricketMatches } />
      <Tab.Screen name="Football" component={FootballMatches } />
    </Tab.Navigator>
  );
};

// Home  Top tab

const TopScreen1 = () => {
  const Tab = createMaterialTopTabNavigator();
  const {selectedSport, setSelectedSport} = useSport();

  const [tabIndex, setTabIndex] = useState(
    selectedSport === 'Football' ? 1 : 0,
  );

  const navigationRef = React.useRef();

  // Update when selectedSport changes
  useEffect(() => {
    if (navigationRef.current) {
      navigationRef.current.jumpTo(selectedSport);
      setTabIndex(selectedSport === 'Football' ? 1 : 0); // manually set index
    }
  }, [selectedSport]);

  return (
    <Tab.Navigator
      initialRouteName={selectedSport === 'Football' ? 'Football' : 'Cricket'}
      screenOptions={{swipeEnabled: false}}
      tabBar={({state, descriptors, navigation}) => {
        navigationRef.current = navigation; // store navigation object into ref

        return (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#E1E1E1',
              borderRadius: 10,
              margin: 10,
              width: '95%',
              alignSelf: 'center',
            }}>
            {state.routes.map((route, index) => {
              const focused = tabIndex === index;
              const label = route.name;
              const iconSource =
                label === 'Cricket'
                  ? require('../FantasyApp/assets/cricket5.png')
                  : require('../FantasyApp/assets/Football.png');

              const onPress = () => {
                setSelectedSport(label);
              };

              return focused ? (
                <LinearGradient
                  key={label}
                  colors={['#3b53bd', '#243373', '#192451', '#000']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{borderRadius: 10, flex: 1}}>
                  <TouchableOpacity
                    onPress={onPress}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                      borderRadius: 5,
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={iconSource}
                      style={{
                        width: 22,
                        height: 22,
                        tintColor: 'white',
                        marginRight: 8,
                      }}
                    />
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      {label.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <TouchableOpacity
                  key={label}
                  onPress={onPress}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    padding: 12,
                    borderRadius: 10,
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={iconSource}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: label === 'Football' ? '#1C274C' : 'black',
                      marginRight: 8,
                    }}
                  />
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    {label.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}>
      <Tab.Screen name="Cricket" component={TabSelection} />
      <Tab.Screen name="Football" component={TabSelection} />
    </Tab.Navigator>
  );
};
export default function Navigation() {
  return (
    <AuthProvider>
      <SportProvider>
        <NavigationContainer ref={navigationRef}>
          <AppWrapper />
        </NavigationContainer>
      </SportProvider>
    </AuthProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {fontSize: 18, fontWeight: 'bold', color: '#3385ff'},
});
