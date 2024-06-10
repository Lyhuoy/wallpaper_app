import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '@/helper/common';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace('/home');
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require('../assets/images/welcome.png')}
        style={styles.bgImg}
        contentFit="cover"
      />
      <Animated.View style={{ flex: 1 }} entering={FadeInDown.duration(600)}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.5)',
            'white',
            'white',
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
          style={styles.gradient}
        />
        <View style={styles.contentContainer}>
          <Animated.Text
            style={styles.title}
            entering={FadeInDown.delay(400).springify()}
          >
            Title
          </Animated.Text>
          <Animated.Text
            style={styles.punchline}
            entering={FadeInDown.delay(500).springify()}
          >
            Every pixel tell the story
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Pressable style={styles.startButton} onPress={handleGetStarted}>
              <Text style={styles.startText}>Get Started</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    width: wp(100),
    height: hp(100),
    position: 'absolute',
  },
  gradient: {
    width: wp(100),
    height: hp(65),
    bottom: 0,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 14,
  },
  title: {
    fontSize: hp(7),
    color: theme.colors.neutral(0.9),
    fontWeight: 'bold',
  },
  punchline: {
    fontSize: hp(2),
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: '500',
  },
  startButton: {
    marginBottom: 50,
    backgroundColor: theme.colors.neutral(0.9),
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: 'circular',
  },
  startText: {
    color: 'white',
    fontSize: hp(3),
    fontWeight: '500',
    letterSpacing: 1,
  },
});
