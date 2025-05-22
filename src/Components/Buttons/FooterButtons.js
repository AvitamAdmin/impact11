import React from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FooterButtons = ({
  leftText = 'PREVIEW',
  leftIcon,
  onLeftPress,
  rightText = 'NEXT',
  rightIcon,
  onRightPress,
  rightDisabled = false,
  gradientColors = ['#3E57C4', '#1E2E74'],
  disabledColor = '#c0c0c0',
  safeArea = true,
}) => {
  // Platform-specific adjustments
  const androidBottomPadding = Platform.OS === 'android' ? hp('2%') : 0;
  const iosBottomPadding = Platform.OS === 'ios' ? hp('1%') : 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      <View style={[
        styles.container,
        safeArea && { paddingBottom: androidBottomPadding + iosBottomPadding }
      ]}>
        <View style={styles.buttonsContainer}>
          {/* Left Button */}
          <Pressable
            onPress={onLeftPress}
            style={({ pressed }) => [
              styles.button,
              styles.leftButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}>
            {leftIcon && <View style={styles.iconMargin}>{leftIcon}</View>}
            <Text style={styles.buttonText}>{leftText}</Text>
          </Pressable>

          {/* Right Button */}
          <View style={styles.rightButtonWrapper}>
            {rightDisabled ? (
              <Pressable
                disabled={true}
                style={[styles.button, { backgroundColor: disabledColor }]}>
                <Text style={styles.buttonText}>{rightText}</Text>
                {rightIcon && <View style={styles.iconMargin}>{rightIcon}</View>}
              </Pressable>
            ) : (
              <LinearGradient
                colors={gradientColors}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Pressable
                  onPress={onRightPress}
                  style={({ pressed }) => [
                    styles.gradientPressable,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <Text style={styles.buttonText}>{rightText}</Text>
                  {rightIcon && <View style={styles.iconMargin}>{rightIcon}</View>}
                </Pressable>
              </LinearGradient>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoid: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    width: '100%',
    paddingHorizontal: wp('4%'),
    backgroundColor: 'transparent',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  button: {
    width: wp('44%'), // Slightly less than 45% for margin
    height: hp('5.5%'),
    borderRadius: wp('2%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  leftButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  rightButtonWrapper: {
    borderRadius: wp('2%'),
    overflow: 'hidden',
  },
  gradientPressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: hp('1.8%'),
    includeFontPadding: false, // Fixes Android text alignment
    textAlignVertical: 'center',
  },
  iconMargin: {
    marginRight: wp('1.5%'),
  },
});

export default FooterButtons;