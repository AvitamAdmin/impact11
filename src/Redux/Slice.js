import {createSlice} from '@reduxjs/toolkit';
import {teamsArray} from '../../jsonData/cskjson';
import {showMessage} from 'react-native-flash-message';

const initialState = {
  matchShortName: '',
  DateAndTime: [],
  matchesTeam1Id: '',
  matchesTeam2Id: '',
  matchId: '',
  userTeamId: '',
  tournamentId: '',
  venue:"",
  contestId: '',
  playerProfileInfo: [],
  impactPlayerLists: [],
  team1shortform: '',
  team2shortform: '',
  finalPlayerSelected: [],
  EditFinalPlayerSelected: [],
  teamIdForCount: '',
  team1ShortName: '',
  team2ShortName: '',
  selectedTeam1: [],
  selectedTeam2: [],
  playerId: '',
  TeamCount: 0,
  wicketKeeperId: '',
  batsManId: '',
  bowlerId: '',
  allRounderId: '',
  WicketKeepers: [],
  Batsman: [],
  Bowlers: [],
  AllRounders: [],
  playerRoleId: '',
  selectedPlayerTeamId: '',
  impactPlayer: [],
  impactPlayerImage: '',

  captain: [],
  ViceCaptain: [],
  captainImage: '',
  ViceCaptainImage: '',
  captainTeam: '',
  ViceCaptainTeam: '',
  ImpactPlayerTeamId: '',
  ImpactPlayerTeam: '',
  Teams: [],
  CreatedTeam: [],
  UserName: '',
  TeamName: '',
  playerListwithStatus: [],
  playerRole: '',
  selectedTeamIds: [],
  editTeamRecordId: '',
  DisableWicket: false,
  DisableBowler: false,
  reloadStatus: '',
  DisableBatsman: false,
  DisableAllRounder: false,
  WalletBalance: '',
  Referalcode: '',
  errorMessage: null,
  errorVisible: false,
  roleLimitsReached: {
    WicketKeepers: false,
    Batsman: false,
    Bowlers: false,
    AllRounders: false,
  },
  refresh:false,
};

const userSlice = createSlice({
  name: 'fantasy',
  initialState,
  reducers: {
    setUserName: (state, {payload}) => {
      state.UserName = [payload];
    },
    setSelectedTeamsId: (state, action) => {
      state.selectedTeamIds = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    setTeamCount: (state, action) => {
      state.TeamCount = action.payload;
    },
    setMatchShortName: (state, {payload}) => {
      state.matchShortName = [payload];
    },
    setDateAndTime: (state, {payload}) => {
      state.DateAndTime = [payload];
    },
    setmatchId: (state, {payload}) => {
      state.matchId = payload;
    },
    setuserTeamId: (state, {payload}) => {
      state.userTeamId = payload;
    },
    setTournamentId: (state, {payload}) => {
      state.tournamentId = payload;
    },
    setvenue: (state, {payload}) => {
      state.venue = payload;
    },
    setcontestId: (state, {payload}) => {
      state.contestId = payload;
    },
    setteam1ShortName: (state, {payload}) => {
      state.team1ShortName = payload;
    },
    setteam2ShortName: (state, {payload}) => {
      state.team2ShortName = payload;
    },
    setMatchesTeam1Id: (state, {payload}) => {
      state.matchesTeam1Id = payload;
    },
    setMatchesTeam2Id: (state, {payload}) => {
      state.matchesTeam2Id = payload;
    },
    setplayerId: (state, {payload}) => {
      state.playerId = payload;
    },
    setEditTeamRecordId: (state, {payload}) => {
      state.editTeamRecordId = payload;
    },
    setwicketKeeperId: (state, {payload}) => {
      state.wicketKeeperId = payload;
    },
    setbatsManId: (state, {payload}) => {
      state.batsManId = payload;
    },
    setbowlerId: (state, {payload}) => {
      state.bowlerId = payload;
    },
    setallRounderId: (state, {payload}) => {
      state.allRounderId = payload;
    },
    setplayerRoleId: (state, {payload}) => {
      state.playerRoleId = payload;
    },
    setPlayerRole: (state, {payload}) => {
      state.playerRole = payload;
    },
    setselectedPlayerTeamId: (state, {payload}) => {
      state.selectedPlayerTeamId = payload;
    },
    setselectedPlayerTeamId: (state, {payload}) => {
      state.selectedPlayerTeamId = payload;
    },
    setcaptainTeam: (state, {payload}) => {
      state.captainTeam = payload;
    },
    resetcaptainTeam: state => {
      state.captainTeam = '';
    },
    setViceCaptainTeam: (state, {payload}) => {
      state.ViceCaptainTeam = payload;
    },
    resetViceCaptainTeam: state => {
      state.ViceCaptainTeam = '';
    },
    setImpactPlayerTeamId: (state, {payload}) => {
      state.ImpactPlayerTeamId = payload;
      // console.log('from slice impact teamId fixed:', state.ImpactPlayerTeamId);
    },
    setimpactPlayerImage: (state, {payload}) => {
      state.impactPlayerImage = payload;
    },
    setCaptainImage: (state, {payload}) => {
      state.captainImage = payload;
    },
    setViceCaptainImage: (state, {payload}) => {
      state.ViceCaptainImage = payload;
      // console.log("Sllice vc img:",state.ViceCaptainImage );
    },
    setImpactPlayerTeam: (state, {payload}) => {
      state.ImpactPlayerTeam = payload;
    },
    setTeams: (state, {payload}) => {
      state.Teams = payload;
    },
    setCreatedTeam: (state, {payload}) => {
      state.CreatedTeam = [...state.CreatedTeam, payload];
    },
    setTeamName: (state, {payload}) => {
      state.TeamName = payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
      state.errorVisible = true;
    },
    clearErrorMessage: state => {
      state.errorVisible = false;
    },
    triggerReloadApi: state => {
      state.reloadStatus = 'reload';
    },
    setplayerListwithStatus: (state, {payload}) => {
      if (!payload || !Array.isArray(payload)) {
        console.error('Error: Payload is not an array or is undefined.');
        return;
      }

      state.playerListwithStatus = payload.map(item => ({
        playerId: item,
        captain: state.captain.includes(item),
        viceCaptain: state.ViceCaptain.includes(item),
        impactPlayer: state.impactPlayer.includes(item),
      }));

      // console.log(
      //   'playerListwithStatus from slice: ',
      //   state.playerListwithStatus,
      // );
    },

    setcaptain: (state, {payload}) => {
      if (state.captain.includes(payload)) {
        state.captain = state.captain.filter(id => id !== payload);
        state.captainTeam = '';
        // console.log('UpdatedCapTeamName in SliderComponent', state.captainTeam);
      } else {
        if (state.captain.length == 0) {
          if (state.ViceCaptain.includes(payload)) {
            state.ViceCaptain = [];
            state.ViceCaptainTeam = '';
          }
          if (state.impactPlayer.includes(payload)) {
            state.impactPlayer = [];
          }
          state.captain = [...state.captain, payload];
          // console.log('cap from slice:', state.captain);
        } else {
          state.captain = [];
          state.captainTeam = '';
          if (state.ViceCaptain.includes(payload)) {
            state.ViceCaptain = [];
            state.ViceCaptainTeam = '';
          }
          if (state.impactPlayer.includes(payload)) {
            state.impactPlayer = [];
          }
          state.captain = [...state.captain, payload];
          // console.log('cap from slice:', state.captain);
        }
      }
    },
    setViceCaptain: (state, {payload}) => {
      if (state.ViceCaptain.includes(payload)) {
        state.ViceCaptain = state.ViceCaptain.filter(id => id !== payload);
        state.ViceCaptainTeam = '';
        // console.log(
        //   'UpdatedViceCapTeamName in SliderComponent',
        //   state.ViceCaptainTeam,
        // );
      } else {
        if (state.ViceCaptain.length == 0) {
          if (state.captain.includes(payload)) {
            state.captain = [];
            state.captainTeam = '';
          }
          if (state.impactPlayer.includes(payload)) {
            state.impactPlayer = [];
          }
          state.ViceCaptain = [...state.ViceCaptain, payload];
        } else {
          state.ViceCaptain = [];
          state.ViceCaptainTeam = '';
          if (state.captain.includes(payload)) {
            state.captain = [];
            state.captainTeam = '';
          }
          if (state.impactPlayer.includes(payload)) {
            state.impactPlayer = [];
          }
          state.ViceCaptain = [...state.ViceCaptain, payload];
        }
      }
      // console.log('Vicecaptain from slice:', state.ViceCaptain);
    },
    setimpactPlayer: (state, {payload}) => {
      if (state.impactPlayer.includes(payload)) {
        state.impactPlayer = state.impactPlayer.filter(id => id !== payload);
        state.ViceCaptainTeam = '';
        // console.log(
        //   'UpdatedViceCapTeamName in SliderComponent',
        //   state.ViceCaptainTeam,
        // );
      } else {
        if (state.impactPlayer.length == 0) {
          if (state.captain.includes(payload)) {
            state.captain = [];
            state.captainTeam = '';
          }
          if (state.ViceCaptain.includes(payload)) {
            state.ViceCaptain = [];
          }
          state.impactPlayer = [...state.impactPlayer, payload];
        } else {
          state.impactPlayer = [];

          if (state.captain.includes(payload)) {
            state.captain = [];
            state.captainTeam = '';
          }
          if (state.ViceCaptain.includes(payload)) {
            state.ViceCaptain = [];
          }
          state.impactPlayer = [...state.impactPlayer, payload];
        }
      }
      // console.log('impactPlayer from slice:', state.impactPlayer);
    },

    resetimpactPlayer: state => {
      state.impactPlayer = [];
      state.ImpactPlayerTeamId = '';
    },
    resetFinalPlayerSelected: state => {
      state.finalPlayerSelected = [];
      state.EditFinalPlayerSelected = [];

      state.selectedTeam1 = [];
      state.selectedTeam2 = [];
      state.WicketKeepers = [];
      state.Batsman = [];
      state.Bowlers = [];
      state.AllRounders = [];
      state.impactPlayer = [];
      state.captain = [];
      state.ViceCaptain = [];
      state.impactPlayerImage = '';
      state.captainImage = '';
      state.ViceCaptainImage = '';
      state.DisableWicket = false;
      state.DisableBowler = false;
      state.DisableBatsman = false;
      state.DisableAllRounder = false;
      state.playerListwithStatus = [];
    },
    initializePlayerLists: state => {
      const allPlayers = teamsArray.flatMap(team => team.players);
      state.playerProfileInfo = allPlayers;
      state.impactPlayerLists = allPlayers;
    },
    getteam1shortform: (state, {payload}) => {
      state.team1shortform = [payload];
    },
    getteam2shortform: (state, {payload}) => {
      state.team2shortform = [payload];
    },
    getteamIdForCount: (state, {payload}) => {
      state.teamIdForCount = [payload];
    },
    setWalletBalance: (state, {payload}) => {
      console.log('Updating balance to: 2', payload);
      state.WalletBalance = payload;
    },

    setReferalcode: (state, {payload}) => {
      state.Referalcode = payload;
    },

    // setfinalPlayerSelected: (state, { payload }) => {
    //   console.log("Slice playerId:",payload);

    //   const {
    //     playerRole,
    //     selectedPlayerTeamId,
    //     matchesTeam1Id,
    //     matchesTeam2Id,
    //   } = state;

    //   const removePlayer = (id) => {

    //     state.finalPlayerSelected = state.finalPlayerSelected.filter(
    //       player => player !== id,

    //     );
    //     state.selectedTeam1 = state.selectedTeam1.filter(
    //       player => player !== id,
    //     );
    //     state.selectedTeam2 = state.selectedTeam2.filter(
    //       player => player !== id,
    //     );

    //     state.WicketKeepers = state.WicketKeepers.filter(

    //       player => player !== id,

    //     );
    //     state.Batsman = state.Batsman.filter(player => player !== id);
    //     state.Bowlers = state.Bowlers.filter(player => player !== id);
    //     state.AllRounders = state.AllRounders.filter(player => player !== id);
    //   };

    //   if (state.finalPlayerSelected.includes(payload)) {
    //     removePlayer(payload);
    //     return;
    //   }

    //   const roleCounts = {
    //     WicketKeepers: state.WicketKeepers.length,
    //     Batsman: state.Batsman.length,
    //     Bowlers: state.Bowlers.length,
    //     AllRounders: state.AllRounders.length,
    //   };

    //   const totalSelected = state.finalPlayerSelected.length;

    //   if (totalSelected >= 12) {
    //     console.log('Cannot select more than 12 players.');
    //     return;
    //   }

    //   const unmetRoles = Object.entries(roleCounts).filter(
    //     ([role, count]) => count < 1,
    //   );
    //   const remainingSlots = 12 - totalSelected;
    //   const unmetRoleCount = unmetRoles.length;

    //   const dynamicLimits = {
    //     WicketKeepers: unmetRoles.some(([role]) => role === 'WicketKeepers')
    //       ? 1
    //       : roleCounts.WicketKeepers + remainingSlots - unmetRoleCount,
    //     Batsman: unmetRoles.some(([role]) => role === 'Batsman')
    //       ? 1
    //       : roleCounts.Batsman + remainingSlots - unmetRoleCount,
    //     Bowlers: unmetRoles.some(([role]) => role === 'Bowlers')
    //       ? 1
    //       : roleCounts.Bowlers + remainingSlots - unmetRoleCount,
    //     AllRounders: unmetRoles.some(([role]) => role === 'AllRounders')
    //       ? 1
    //       : roleCounts.AllRounders + remainingSlots - unmetRoleCount,
    //   };

    //   if (
    //     playerRole === "Wicketkeeper" &&
    //     roleCounts.WicketKeepers >= dynamicLimits.WicketKeepers
    //   ) {
    //     console.log('Cannot add more WicketKeepers.');

    //     return;
    //   }
    //   if (
    //     playerRole === "Batsman" &&
    //     roleCounts.Batsman >= dynamicLimits.Batsman
    //   ) {
    //     console.log('Cannot add more Batsmen.');

    //     return;
    //   }
    //   if (
    //     playerRole === "Bowler" &&
    //     roleCounts.Bowlers >= dynamicLimits.Bowlers
    //   ) {
    //     console.log('Cannot add more Bowlers.');

    //     return;
    //   }
    //   if (
    //     playerRole === "Allrounder" &&
    //     roleCounts.AllRounders >= dynamicLimits.AllRounders
    //   ) {
    //     console.log('Cannot add more AllRounders.');

    //     return;
    //   }

    //   const addPlayerToRoleAndTeam = (roleArray) => {
    //     const team1Count = state.selectedTeam1.length;
    //     const team2Count = state.selectedTeam2.length;

    //     if (selectedPlayerTeamId === matchesTeam1Id && team1Count >= 7) {
    //       console.log('Cannot select more than 7 players from Team 1.');
    //       return;
    //     }
    //     if (selectedPlayerTeamId === matchesTeam2Id && team2Count >= 7) {
    //       console.log('Cannot select more than 7 players from Team 2.');
    //       return;
    //     }

    //     state.finalPlayerSelected = [...state.finalPlayerSelected, payload];
    //     roleArray.push(payload);

    //     if (selectedPlayerTeamId === matchesTeam1Id) {
    //       state.selectedTeam1 = [...state.selectedTeam1, payload];
    //     } else if (selectedPlayerTeamId === matchesTeam2Id) {
    //       state.selectedTeam2 = [...state.selectedTeam2, payload];
    //     }
    //   };

    //   if (playerRole === "Wicketkeeper") {
    //     addPlayerToRoleAndTeam(state.WicketKeepers);
    //   } else if (playerRole === "Batsman") {
    //     addPlayerToRoleAndTeam(state.Batsman);
    //   } else if (playerRole === "Bowler") {
    //     addPlayerToRoleAndTeam(state.Bowlers);
    //   } else if (playerRole === "Allrounder") {
    //     addPlayerToRoleAndTeam(state.AllRounders);
    //   }

    //   console.log('Player added successfully:', payload);
    //   console.log('Updated team:', state.finalPlayerSelected);
    // },
    setfinalPlayerSelected: (state, {payload}) => {
      const {playerId, playerRole} = payload;
      const {selectedPlayerTeamId, matchesTeam1Id, matchesTeam2Id} = state;

      const removePlayer = id => {
        return {
          ...state,
          finalPlayerSelected: state.finalPlayerSelected.filter(p => p !== id),
          selectedTeam1: state.selectedTeam1.filter(p => p !== id),
          selectedTeam2: state.selectedTeam2.filter(p => p !== id),
          WicketKeepers: state.WicketKeepers.filter(p => p !== id),
          Batsman: state.Batsman.filter(p => p !== id),
          Bowlers: state.Bowlers.filter(p => p !== id),
          AllRounders: state.AllRounders.filter(p => p !== id),
          roleLimitsReached: {
            WicketKeepers: false,
            Batsman: false,
            Bowlers: false,
            AllRounders: false,
          },
          errorMessage: '',
          errorVisible: false,
        };
      };

      if (state.finalPlayerSelected.includes(playerId)) {
        return removePlayer(playerId);
      }

      const roleConfig = {
        Wicketkeeper: {
          key: 'WicketKeepers',
          name: 'Wicketkeeper',
        },
        Batsman: {
          key: 'Batsman',
          name: 'Batsman',
        },
        Bowler: {
          key: 'Bowlers',
          name: 'Bowler',
        },
        Allrounder: {
          key: 'AllRounders',
          name: 'All-Rounder',
        },
      };

      const role = roleConfig[playerRole];
      if (!role) return state;

      const currentCounts = {
        WicketKeepers: state.WicketKeepers.length,
        Batsman: state.Batsman.length,
        Bowlers: state.Bowlers.length,
        AllRounders: state.AllRounders.length,
      };

      if (currentCounts[role.key] >= 8) {
        showMessage({
          message: `Maximum 8 ${role.name}s allowed`,
          type: 'danger',
          position: 'top',
          duration: 2000,
        });
        return state;
      }

      if (state.finalPlayerSelected.length >= 12) {
        return {
          ...state,
          errorMessage: 'Cannot select more than 12 players',
          errorVisible: true,
        };
      }

      const minRequirements = {
        WicketKeepers: 1,
        Batsman: 1,
        Bowlers: 1,
        AllRounders: 1,
      };

      const remainingSlots = 12 - state.finalPlayerSelected.length - 1;

      const neededRoles = Object.entries(minRequirements)
        .filter(([r, min]) => currentCounts[r] < min)
        .filter(([r]) => r !== role.key)
        .map(
          ([r]) =>
            roleConfig[
              Object.keys(roleConfig).find(k => roleConfig[k].key === r)
            ].name,
        );

      if (neededRoles.length > remainingSlots) {
        let message;
        if (neededRoles.length === 1) {
          message = `You still need 1 ${neededRoles}`;
        } else {
          const lastRole = neededRoles.pop();
          message = `You still need 1 each from ${neededRoles}`;
        }

        showMessage({
          message: `${message} `,
          type: 'danger',
          position: 'top',
          duration: 3000,
        });
        return state;
      }

      const teamCount =
        selectedPlayerTeamId === matchesTeam1Id
          ? state.selectedTeam1.length
          : state.selectedTeam2.length;

      if (teamCount >= 7) {
        const teamName =
          selectedPlayerTeamId === matchesTeam1Id ? 'Team 1' : 'Team 2';
        showMessage({
          message: `Cannot select more than 7 players from ${teamName}`,
          type: 'danger',
          position: 'top',
          duration: 2000,
        });
        return state;
      }

      return {
        ...state,
        finalPlayerSelected: [...state.finalPlayerSelected, playerId],
        [role.key]: [...state[role.key], playerId],
        selectedTeam1:
          selectedPlayerTeamId === matchesTeam1Id
            ? [...state.selectedTeam1, playerId]
            : state.selectedTeam1,
        selectedTeam2:
          selectedPlayerTeamId === matchesTeam2Id
            ? [...state.selectedTeam2, playerId]
            : state.selectedTeam2,
      };
    },

    setEditFinalPlayerSelected: (state, {payload}) => {
      const {playerId, playerRole} = payload;

      // console.log('Current state before update:', state.EditFinalPlayerSelected);

      const {selectedPlayerTeamId, matchesTeam1Id, matchesTeam2Id} = state;

      const removePlayer = id => {
        // console.log('Removing player:', id);
        const newState = {
          ...state,
          EditFinalPlayerSelected: state.EditFinalPlayerSelected.filter(
            player => player !== id,
          ),
          selectedTeam1: state.selectedTeam1.filter(player => player !== id),
          selectedTeam2: state.selectedTeam2.filter(player => player !== id),
          WicketKeepers: state.WicketKeepers.filter(player => player !== id),
          Batsman: state.Batsman.filter(player => player !== id),
          Bowlers: state.Bowlers.filter(player => player !== id),
          AllRounders: state.AllRounders.filter(player => player !== id),
          roleLimitsReached: {
            WicketKeepers: false,
            Batsman: false,
            Bowlers: false,
            AllRounders: false,
          },
          errorMessage: '',
          errorVisible: false,
        };
        // console.log('State after removal:', newState.EditFinalPlayerSelected);
        return newState;
      };

      if (state.EditFinalPlayerSelected.includes(playerId)) {
        // console.log("Player already selected. Removing...", playerId);
        // console.log("Current selected players before removal:", state.EditFinalPlayerSelected);
        const newState = removePlayer(playerId);
        // console.log("Selected players after removal:", newState.EditFinalPlayerSelected);
        return newState;
      }

      if (state.EditFinalPlayerSelected.length >= 12) {
        return {
          ...state,
          errorMessage: 'Cannot select more than 12 players',
          errorVisible: true,
        };
      }

      // Calculate role counts and dynamic limits
      const roleCounts = {
        WicketKeepers: state.WicketKeepers.length,
        Batsman: state.Batsman.length,
        Bowlers: state.Bowlers.length,
        AllRounders: state.AllRounders.length,
      };

      const unmetRoles = Object.entries(roleCounts).filter(
        ([role, count]) => count < 1,
      );
      const remainingSlots = 12 - state.EditFinalPlayerSelected.length;
      const unmetRoleCount = unmetRoles.length;

      const dynamicLimits = {
        WicketKeepers: unmetRoles.some(([role]) => role === 'WicketKeepers')
          ? 1
          : roleCounts.WicketKeepers + remainingSlots - unmetRoleCount,
        Batsman: unmetRoles.some(([role]) => role === 'Batsman')
          ? 1
          : roleCounts.Batsman + remainingSlots - unmetRoleCount,
        Bowlers: unmetRoles.some(([role]) => role === 'Bowlers')
          ? 1
          : roleCounts.Bowlers + remainingSlots - unmetRoleCount,
        AllRounders: unmetRoles.some(([role]) => role === 'AllRounders')
          ? 1
          : roleCounts.AllRounders + remainingSlots - unmetRoleCount,
      };

      if (
        playerRole === 'Wicketkeeper' &&
        roleCounts.WicketKeepers >= dynamicLimits.WicketKeepers
      ) {
        showMessage({
          message: 'Maximum Wicketkeepers Reached',
          type: 'danger',
          position: 'top',
          duration: 1000,
        });
        return {
          ...state,
          roleLimitsReached: {
            ...state.roleLimitsReached,
            WicketKeepers: true,
          },
        };
      }

      if (
        playerRole === 'Batsman' &&
        roleCounts.Batsman >= dynamicLimits.Batsman
      ) {
        showMessage({
          message: 'Maximum Batsman Reached',
          type: 'danger',
          position: 'top',
          duration: 1000,
        });
        return {
          ...state,
          roleLimitsReached: {
            ...state.roleLimitsReached,
            Batsman: true,
          },
        };
      }
      if (
        playerRole === 'Bowler' &&
        roleCounts.Bowlers >= dynamicLimits.Bowlers
      ) {
        showMessage({
          message: 'Maximum Bowler Reached',
          type: 'danger',
          position: 'top',
          duration: 1000,
        });
        return {
          ...state,
          roleLimitsReached: {
            ...state.roleLimitsReached,
            Bowlers: true,
          },
        };
      }

      if (
        playerRole === 'Allrounder' &&
        roleCounts.AllRounders >= dynamicLimits.AllRounders
      ) {
        showMessage({
          message: 'Maximum Allrounder Reached',
          type: 'danger',
          position: 'top',
          duration: 1000,
        });
        return {
          ...state,
          roleLimitsReached: {
            ...state.roleLimitsReached,
            AllRounders: true,
          },
        };
      }

      let roleArray;
      if (playerRole === 'Wicketkeeper') {
        roleArray = 'WicketKeepers';
      } else if (playerRole === 'Batsman') {
        roleArray = 'Batsman';
      } else if (playerRole === 'Bowler') {
        roleArray = 'Bowlers';
      } else if (playerRole === 'Allrounder') {
        roleArray = 'AllRounders';
      } else {
        // console.log('Invalid player role.');
        return state;
      }

      const team1Count = state.selectedTeam1.length;
      const team2Count = state.selectedTeam2.length;

      if (selectedPlayerTeamId === matchesTeam1Id && team1Count >= 7) {
        showMessage({
          message: 'Cannot select more than 7 players from Team 1',
          type: 'danger',
          position: 'top',
          duration: 1000,
        });
        return state;
      }

      if (selectedPlayerTeamId === matchesTeam2Id && team2Count >= 7) {
        showMessage({
          message: 'Cannot select more than 7 players from Team 2',
          type: 'danger',
          position: 'top',
          duration: 1000,
        });
        return state;
      }

      const newState = {
        ...state,
        EditFinalPlayerSelected: [...state.EditFinalPlayerSelected, playerId],
        [roleArray]: [...state[roleArray], playerId],
        selectedTeam1:
          selectedPlayerTeamId === matchesTeam1Id
            ? [...state.selectedTeam1, playerId]
            : state.selectedTeam1,
        selectedTeam2:
          selectedPlayerTeamId === matchesTeam2Id
            ? [...state.selectedTeam2, playerId]
            : state.selectedTeam2,
      };

      // console.log('Player added successfully:', playerId);

      setTimeout(() => {
        // console.log("Updated EditFinalPlayerSelected:", newState.EditFinalPlayerSelected);
      }, 100);

      return newState;
    },

    setselectedTeam2: (state, {payload}) => {
      if (state.finalPlayerSelected.length !== 12) {
        if (state.matchesTeam2Id === payload) {
          if (state.selectedTeam2.includes(state.playerId)) {
            state.selectedTeam2 = state.selectedTeam2.filter(
              id => id !== state.playerId,
            );
          } else {
            state.selectedTeam2.push(state.playerId);
          }
        }
      }
    },
  },
});

export const {
  setMatchShortName,
  setDateAndTime,
  setMatchesTeam1Id,
  setMatchesTeam2Id,
  resetFinalPlayerSelected,
  initializePlayerLists,
  getteam1shortform,
  getteam2shortform,
  setfinalPlayerSelected,
  getfinalPlayerSelected,
  getteamIdForCount,
  setteam1ShortName,
  setteam2ShortName,
  setplayerId,
  setselectedTeam1,
  setselectedTeam2,
  setTeamCount,
  setwicketKeeperId,
  setbatsManId,
  setbowlerId,
  setallRounderId,
  setplayerRoleId,
  setselectedPlayerTeamId,
  setimpactPlayer,
  resetimpactPlayer,
  setcaptain,
  setViceCaptain,
  setcaptainTeam,
  setViceCaptainTeam,
  setImpactPlayerTeamId,
  setImpactPlayerTeam,
  resetViceCaptainTeam,
  resetcaptainTeam,
  setCreatedTeam,
  setTeams,
  setUserName,
  setmatchId,
  setTeamName,
  setcontestId,
  setplayerListwithStatus,
  setimpactPlayerImage,
  setPlayerRole,
  setCaptainImage,
  setViceCaptainImage,
  setSelectedTeamsId,
  setEditTeamRecordId,
  setTournamentId,
  setuserTeamId,
  setWalletBalance,
  setReferalcode,
  setErrorMessage,
  clearErrorMessage,
  triggerReloadApi,
  setEditFinalPlayerSelected,
  setvenue,
  setRefresh,
} = userSlice.actions;

export default userSlice.reducer;
