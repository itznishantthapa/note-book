import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Sample collection data
const mockCollections = [
  {
    id: '1',
    title: 'Learning',
    notes: 4,
    emoji: '📘',
  },
  {
    id: '2',
    title: 'Work',
    notes: 7,
    emoji: '💼',
  },
  {
    id: '3',
    title: 'Ideas',
    notes: 12,
    emoji: '💡',
  },
  {
    id: '4',
    title: 'Music',
    notes: 5,
    emoji: '🎵',
  },
];

const Dashboard = () => {
  const navigation = useNavigation() as any;

  const renderCollectionItem = ({
    item,
  }: {
    item: (typeof mockCollections)[0];
  }) => (
    <TouchableOpacity
      style={styles.collectionCard}
      onPress={() =>
        navigation.navigate('CollectionNotes', {collection: item})
      }>
      <View style={styles.cardHeader}>
        <Icon name="document-text-outline" size={18} color="rgba(0,0,0,0.6)" />
        <View style={styles.notesCountContainer}>
          <Text style={styles.notesCount}>{item.notes} Notes</Text>
        </View>
      </View>
      <Text style={styles.collectionTitle}>
        {item.title} {item.emoji}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Notepad</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateCollection')}>
            <Icon name="add-circle-outline" size={24} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* Collection Grid */}
        <FlatList
          data={mockCollections}
          renderItem={renderCollectionItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333333',
    letterSpacing: -0.5,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  collectionCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 24,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notesCountContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  notesCount: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '600',
  },
  collectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginTop: 8,
  },
});

export default Dashboard;
