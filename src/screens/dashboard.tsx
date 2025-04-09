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
    color: '#FFFFFF',
  },
  {
    id: '2',
    title: 'Work',
    notes: 7,
    emoji: '💼',
    color: '#FFFFFF',
  },
  {
    id: '3',
    title: 'Ideas',
    notes: 12,
    emoji: '💡',
    color: '#FFFFFF',
  },
  {
    id: '4',
    title: 'Music',
    notes: 5,
    emoji: '🎵',
    color: '#000000',
    selected: true,
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
      style={[
        styles.collectionCard,
        {backgroundColor: item.color},
        item.selected && styles.selectedCard,
      ]}
      onPress={() =>
        navigation.navigate('CollectionNotes', {collection: item})
      }>
      <View style={styles.cardHeader}>
        <Icon
          name="document-text-outline"
          size={18}
          color={item.selected ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)'}
        />
        <View
          style={[
            styles.notesCountContainer,
            item.selected && styles.selectedNotesCount,
          ]}>
          <Text
            style={[styles.notesCount, item.selected && styles.selectedText]}>
            {item.notes} Notes
          </Text>
        </View>
      </View>
      <Text
        style={[styles.collectionTitle, item.selected && styles.selectedText]}>
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
          <Text style={styles.header}>Your Collections</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Icon name="settings-outline" size={24} color="#000000" />
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

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.createButton}>
            <Icon name="add-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Create New Collection</Text>
          </TouchableOpacity>
        </View>
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
    color: '#000000',
    letterSpacing: -0.5,
  },
  settingsButton: {
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
  selectedCard: {
    backgroundColor: '#000000',
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
  selectedNotesCount: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  notesCount: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '600',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  collectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginTop: 8,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    alignItems: 'center',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default Dashboard;
