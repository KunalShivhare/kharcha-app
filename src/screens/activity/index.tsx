import ActivityCard from '@/src/components/cards/activity';
import EmptyScreen from '@/src/components/empty/emptyScreen';
import Header from '@/src/components/header/header';
import { Layout } from '@/src/components/themes/globalStyles';
import ThemeWrapper from '@/src/HOCs/ThemeWrapper';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

const Activity = () => {
  const acitivityCards = Array.from({ length: 5 }).map((_, i) => i);

  const renderItem = () => <ActivityCard />;
  return (
    <ThemeWrapper>
      <View style={Layout.container}>
        <Header title="Activity" />
        {acitivityCards.length ? (
          <FlatList
            data={acitivityCards}
            keyExtractor={(_, index) => String(index)}
            renderItem={renderItem}
          />
        ) : (
          <EmptyScreen />
        )}
      </View>
    </ThemeWrapper>
  );
};

export default Activity;
