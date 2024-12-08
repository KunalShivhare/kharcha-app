import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Modal = () => {
  const router = useRouter();

  const handleCancel = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Your Group</Text>
        <Text style={styles.text}>Create</Text>
      </View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
});
