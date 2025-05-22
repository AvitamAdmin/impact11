import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

export default function AboutUs() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{display: 'flex', flexDirection: 'column', width: wp('100%')}}>
          <LinearGradient
            colors={['#3A4CD6', '#000000']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 20,
                paddingLeft: 13,
              }}>
              <View style={{width: wp('10%')}}>
                <Pressable onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={23} color="white" />
                </Pressable>
              </View>
              <View style={{width: wp('80%')}}>
                <Text
                  style={{fontSize: hp(2), color: '#fff', fontWeight: '700'}}>
                  About Us
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>WHO ARE WE?</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
              Welcome to impact11, the ultimate destination for fantasy sports
              enthusiasts. Our app is designed to elevate your passion for
              sports by letting you build, manage, and compete with your fantasy
              teams. Whether you're a casual fan or a seasoned expert, we
              provide the tools and community to make every match thrilling.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>OUR MISSION</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
              Our mission is to bring the excitement of sports to your
              fingerprints. We aim to create a dynamic and engaging platform
              where sports lovers can indulge in their passion, showcase their
              strategic skills, and compete with friends and fans around the
              world.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>OUR VISION</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
              We envision a world where every sports fan can experience the
              thrill of being a team manager. Our goal is to be the leading
              fantasy sports platform, offering innovative features,
              comprehensive statistics, and a vibrant community. We strive to
              transform the way fans interact with their favorite sports, making
              every game more exciting and meaningful.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>JOIN THE FANTASY</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
              At impact11, we believe that sports are more than just a game -
              they're a passion that unites us all. Whether you're strategizing
              your next move or celebrating a hard-fought victory, our platform
              is here to enhance your experience.
            </Text>
            <Text style={styles.sectionText}>
              Dive into the world of fantasy sports with us and turn every match
              into an epic showdown.Build your team,compete with the best, and
              rise to the top.The game is on!
            </Text>
            <Text style={styles.sectionText}>
              Welcome to impact11 - Where Your Fantasy Becomes Reality!
            </Text>
          </View>

          <View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{fontWeight: '700', fontSize: hp(1.8), color: '#000'}}>
                Stay connected
              </Text>
            </View>
            <View
              style={{
                width: wp('100%'),
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                padding: 20,
              }}>
              <View style={{width: wp('15%')}}>
                <Image
                  source={require('../../assets/Insta.png')}
                  style={{
                    width: wp('14%'),
                    height: 35,
                    resizeMode: 'contain',
                  }}
                />
              </View>

              <View style={{width: wp('15%')}}>
                <Image
                  source={require('../../assets/x.png')}
                  style={{
                    width: wp('10%'),
                    height: 35,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 14,
    paddingLeft: 13,
  },
  backButton: {
    width: wp('20%'),
  },
  titleContainer: {
    width: wp('50%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingBottom: 20, // Adjust padding as needed
  },
  section: {
    padding: 20,
    width: wp('100%'),
  },
  sectionTitle: {
    color: '#374DAC',
    fontSize: hp(1.9),
    fontWeight: '800',
    paddingTop: 2,
  },
  sectionLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#374DAC',
    width: wp('18%'),
  },
  sectionText: {
    color: '#2D2E33',
    lineHeight: 24,
    fontSize: 13,
    paddingTop: 10,
  },
});
