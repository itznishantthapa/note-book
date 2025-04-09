import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
// Assuming you have icons, replace with your actual icon library
import Icon from 'react-native-vector-icons/Ionicons';

// Mock data for collections - replace with your actual data source
const collectionsData = [
  {id: '1', title: 'Learning', notes: 4, emoji: '📝', color: '#FFFFFF'},
  {id: '2', title: 'Rough Ideas', notes: 10, emoji: '🧠', color: '#FFFFFF'},
  {id: '3', title: 'To-Do-List', notes: 2, emoji: '✅', color: '#FFFFFF'},
  {
    id: '4',
    title: 'Heavy Music',
    notes: 8,
    emoji: '🤘',
    color: '#333333',
    selected: true,
  }, // Example selected state
];

const Dashboard = () => {
  const renderCollectionItem = ({
    item,
  }: {
    item: (typeof collectionsData)[0];
  }) => (
    <TouchableOpacity
      style={[
        styles.collectionCard,
        {backgroundColor: item.color},
        item.selected && styles.selectedCard, // Style for selected card
      ]}>
      <View style={styles.cardHeader}>
        {/* Replace with actual icon if available */}
        <Icon
          name="document-text-outline"
          size={16}
          color={item.selected ? '#A9A9A9' : '#888'}
        />
        <Text style={[styles.notesCount, item.selected && styles.selectedText]}>
          {item.notes} Notes
        </Text>
      </View>
      <Text
        style={[styles.collectionTitle, item.selected && styles.selectedText]}>
        {item.title} {item.emoji}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            {/* Replace with actual icon */}
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.saveToText}>SAVE TO</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Select Note</Text>
        <Text style={styles.title}>Collection</Text>

        {/* Collections Grid */}
        <FlatList
          data={collectionsData}
          renderItem={renderCollectionItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.row} // Distribute space between columns
          showsVerticalScrollIndicator={false} // Hide scroll bar visually
        />

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.saveAnywayText}>
              Save Anyway Without Collection
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            {/* Replace with actual icon */}
            <Icon
              name="folder-outline"
              size={20}
              color="#FFFFFF"
              style={styles.saveButtonIcon}
            />
            <Text style={styles.saveButtonText}>Save to Collection</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F5', // Light grey background
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    padding: 5, // Add padding for easier tapping
  },
  saveToText: {
    fontSize: 14,
    color: '#A0A0A0',
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1C1C1E',
    lineHeight: 40, // Adjust line height for better spacing
    // marginBottom: 5, // Removed bottom margin to stack lines closer
  },
  gridContainer: {
    paddingTop: 20, // Space between title and grid
    paddingBottom: 10,
  },
  row: {
    justifyContent: 'space-between', // Distribute cards evenly in a row
    marginBottom: 15, // Space between rows
  },
  collectionCard: {
    width: '48%', // Approximately half width minus gap
    aspectRatio: 1, // Make cards square-ish
    borderRadius: 20,
    padding: 15,
    justifyContent: 'space-between', // Push content to top and bottom
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Elevation for Android
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: '#333333', // Dark background for selected
    // Add potential border or other indicator if needed
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0.8, // Slightly transparent header elements
  },
  notesCount: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
    backgroundColor: '#E8E8E8', // Light badge background
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    overflow: 'hidden', // Ensure background respects border radius
  },
  collectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  selectedText: {
    color: '#FFFFFF', // White text for selected card
  },
  footer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  saveAnywayText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 15, // Space between the two buttons
    textDecorationLine: 'underline',
  },
  saveButton: {
    backgroundColor: '#1C1C1E', // Dark button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30, // Pill shape
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%', // Make button wide
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 4,
  },
  saveButtonIcon: {
    marginRight: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
