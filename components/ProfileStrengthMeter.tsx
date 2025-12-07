import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface ProfileStrengthMeterProps {
  name: string;
  bio: string;
}

export function ProfileStrengthMeter({ name, bio }: ProfileStrengthMeterProps) {
  const [score, setScore] = useState(0);
  const [animatedWidth] = useState(new Animated.Value(0));

  useEffect(() => {
    calculateScore();
  }, [name, bio]);

  const calculateScore = () => {
    let newScore = 0;

    // Name validation (30 points)
    if (name && name.trim().length >= 3) {
      newScore += 30;
    } else if (name && name.trim().length > 0) {
      newScore += 15;
    }

    // Bio validation (70 points)
    const bioLength = bio?.trim().length || 0;
    
    if (bioLength >= 20) {
      newScore += 40; // Bio exists and meets minimum
      
      // Optimal length bonus (30 points)
      if (bioLength >= 50 && bioLength <= 200) {
        newScore += 30; // Perfect length
      } else if (bioLength >= 200) {
        newScore += 15; // A bit too long but okay
      } else {
        newScore += Math.floor((bioLength - 20) / 30 * 30); // Proportional
      }
    } else if (bioLength > 0) {
      newScore += Math.floor(bioLength / 20 * 40); // Partial credit
    }

    setScore(newScore);
    
    // Animate the progress bar
    Animated.timing(animatedWidth, {
      toValue: newScore,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const getStrengthInfo = () => {
    if (score < 34) {
      return { label: 'Weak', color: '#ef4444' };
    } else if (score < 67) {
      return { label: 'Good', color: '#f59e0b' };
    } else {
      return { label: 'Excellent', color: '#10b981' };
    }
  };

  const strengthInfo = getStrengthInfo();

  const width = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile Strength</Text>
        <Text style={[styles.scoreText, { color: strengthInfo.color }]}>
          {score}/100
        </Text>
      </View>

      <View style={styles.barContainer}>
        <Animated.View
          style={[
            styles.bar,
            {
              width,
              backgroundColor: strengthInfo.color,
            },
          ]}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: strengthInfo.color }]}>
          {strengthInfo.label}
        </Text>
      </View>

      <View style={styles.tips}>
        <Text style={styles.tipsTitle}>Tips to improve:</Text>
        {(!name || name.trim().length < 3) && (
          <Text style={styles.tip}>• Add a name with at least 3 characters</Text>
        )}
        {(!bio || bio.trim().length < 20) && (
          <Text style={styles.tip}>• Add a bio with at least 20 characters</Text>
        )}
        {bio && bio.trim().length >= 20 && bio.trim().length < 50 && (
          <Text style={styles.tip}>• Make your bio more detailed (50-200 characters is optimal)</Text>
        )}
        {bio && bio.trim().length > 200 && (
          <Text style={styles.tip}>• Consider shortening your bio (50-200 characters is optimal)</Text>
        )}
        {score === 100 && (
          <Text style={[styles.tip, { color: '#10b981' }]}>✓ Your profile is complete!</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  barContainer: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  labelContainer: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  tips: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  tipsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  tip: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
});