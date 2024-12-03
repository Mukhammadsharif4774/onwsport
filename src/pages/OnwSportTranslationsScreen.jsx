import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import OnwSportHeader from '../components/OnwSportHeader';

export default function () {
  const renderBroadcast = (league, time, teams) => (
    <View style={styles.broadcast}>
      <View style={styles.leagueContainer}>
        <Text style={styles.league}>{league}</Text>
        <Text style={styles.matchTime}>{time}</Text>
      </View>
      <View style={styles.teamsContainer}>
        <Text style={styles.teams}>{teams}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <OnwSportHeader />
      <Text style={styles.header}>Трансляции</Text>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 100}}>
        {renderBroadcast(
          'NFL',
          '13.01 - 00:50',
          'Dallas Cowboys \n vs \n New York Giants',
        )}
        {renderBroadcast(
          'NBA',
          '19.01 - 00:45',
          'Los Angeles Lakers \n vs \n Chicago Bulls',
        )}
        {renderBroadcast(
          'NHL',
          '25.06 - 00:00',
          'Toronto Maple Leafs \n vs \n Boston Bruins',
        )}
        {renderBroadcast(
          'MLB',
          '30.01 - 00:30',
          'New York Yankees \n vs \n Boston Red Sox',
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    backgroundColor: COLORS.white,
  },
  header: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    margin: 20,
  },
  league: {
    fontSize: 44,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  broadcast: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  leagueContainer: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    height: 150,
  },
  teamsContainer: {
    width: '60%',
  },
  matchTime: {
    fontSize: 18,
    fontFamily: FONTS.black,
    color: COLORS.white,
  },
  teams: {
    textAlign: 'center',
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.black,
  },
});
