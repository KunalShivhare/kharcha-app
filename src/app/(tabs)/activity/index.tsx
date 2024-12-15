import ActivityCard from '@/src/components/cards/activity';
import Header from '@/src/components/header/header';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

const Activity = () => {
  const acitivityCards = Array.from({ length: 5 }).map((_, i) => i);
  const renderItem = () => <ActivityCard />;
  return (
    <View style={{ flex: 1 }}>
      <Header title="Activity" />
      <FlatList
        data={acitivityCards}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({});
