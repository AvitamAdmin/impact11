import React from 'react';
import { View, Text, StyleSheet, ScrollView,SafeAreaView ,Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function Legality() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
    
        <View style={{ display: 'flex', flexDirection: 'column', width: wp('100%') }}>
                <LinearGradient colors={["#3b53bd", "#243373", "#192451",]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  <View style={{ display: 'flex', flexDirection: 'row', padding: 20, paddingLeft: 13 }}>
                    <View style={{ width: wp('10%') }}>
                      <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                      </Pressable>
                    </View>
                    <View style={{ width: wp('80%') }}>
                      <Text style={{ fontSize: hp(2.2), color: '#fff', fontWeight: '700' }}>Legality</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>
              Welcome to impact11, the ultimate destination for fantasy sports enthusiasts. Our app is designed to elevate your passion for sports by letting you build, manage, and compete with your fantasy teams. Whether you're a casual fan or a seasoned expert, we provide the tools and community to make every match thrilling.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Legal Compliance</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
              Our fantasy cricket betting app operates in strict compliance with all apllicable laws and regulations.We take the legal aspects of our operations very seriously and ensure that our platform adheres to the legal standards set by relevant authorities. 
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skill-Based Gaming</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
            Fantasy cricket betting is classified as a game of skill, not a game of chance. This distinction is crucial as games of skill are generally considered legal in many jurisdictions, unlike games of chance which are often subject to stricter regulations.
               </Text>
            <Text style={styles.sectionText}>
            In fantasy cricket betting, participants must use their knowledge, expertise, and understanding of cricket to select their teams. Success is determined by the real-world performance of the selected players, making it a skill-based activity
               </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Jurisdictional Restrictions</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
            While fantasy cricket betting is legal in many regions, some jurisdictions have specific regulations that may prohibit or restrict such activities. It is the responsibility of the user to ensure that participation in fantasy cricket betting is legal in their jurisdiction. We do not accept entries from users residing in states or countries where fantasy sports betting is prohibited or restricted by law.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Age Restrictions</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
            Participants must be at least 18 years old or the legal age of majority in their jurisdiction (whichever is higher) to participate in fantasy cricket betting on our platform. We take age verification seriously and use industry-standard procedures to verify the age of our users.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Responsible Gaming</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
            We are committed to promoting responsible gaming. Our platform includes features to help users manage their betting activities, including deposit limits, self-exclusion options, and access to resources for those who may need assistance with gambling-related issues.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fair Play and Intergrity</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
            Maintaining the integrity of our games is paramount. We employ advanced algorithms and monitoring systems to ensure fair play. Any user found to be engaging in fraudulent activities or violating our terms of service will be subject to account suspension or termination.
            </Text>
          </View>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Privacy and Security</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
            We prioritize the privacy and security of our users' data. Our platform is built with state-of-the-art security measures to protect personal and financial information. We adhere to strict data protection laws and regulations to ensure that your information is safe with us.
            </Text>
          </View>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
            If you have any questions or concerns regarding the legality of our services or any other aspect of our platform, please do not hesitate to contact our support team at support@impact11.com . We are here to assist you and provide any information you may need.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Disclaimer</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionText}>
            The information provided on this page is for informational purposes only and does not constitute legal advice. Users are encouraged to consult with legal professionals in their jurisdiction to fully understand the legality of fantasy cricket betting in their area.
            </Text>
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
    paddingBottom: 12 ,
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
    fontSize: 16,
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
    lineHeight: 20,
    fontSize: 13,
    paddingTop: 10,lineHeight: 24,
  },
 
});