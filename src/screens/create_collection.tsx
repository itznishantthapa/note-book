import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Common emoji categories
const emojiCategories = [
  {
    title: 'Frequently Used',
    emojis: ['📁', '📚', '💼', '💡', '🎵', '📝', '📌', '📅', '🎯', '⭐'],
  },
  {
    title: 'Work',
    emojis: ['📊', '📈', '📉', '📋', '📑', '📒', '📓', '📔', '📕', '📗'],
  },
  {
    title: 'Ideas',
    emojis: ['💭', '💡', '🔍', '🔎', '🔐', '🔑', '🔒', '🔓', '🔔', '🔕'],
  },
  {
    title: 'Personal',
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💝'],
  },
];

// Color palette options
const colorPalette = [
  {name: 'White', value: '#FFFFFF'},
  {name: 'Light Gray', value: '#F5F5F5'},
  {name: 'Light Blue', value: '#E6F7FF'},
  {name: 'Light Green', value: '#E6FFE6'},
  {name: 'Light Yellow', value: '#FFFFF0'},
  {name: 'Light Pink', value: '#FFE6E6'},
  {name: 'Light Purple', value: '#F5E6FF'},
  {name: 'Light Orange', value: '#FFF0E6'},
];

const CreateCollection = () => {
  const navigation = useNavigation() as any;
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('📁');
  const [color, setColor] = useState('#FFFFFF');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleCreateCollection = () => {
    if (title.trim()) {
      // Here you would typically save the collection to your data store
      // For now, we'll just navigate back to the dashboard
      navigation.goBack();
    }
  };

  const renderEmojiItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.emojiItem}
      onPress={() => {
        setEmoji(item);
        setShowEmojiPicker(false);
      }}>
      <Text style={styles.emojiItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderEmojiCategory = ({
    item,
  }: {
    item: {title: string; emojis: string[]};
  }) => (
    <View style={styles.emojiCategory}>
      <Text style={styles.emojiCategoryTitle}>{item.title}</Text>
      <FlatList
        data={item.emojis}
        renderItem={renderEmojiItem}
        keyExtractor={(emoji, index) => `${emoji}-${index}`}
        numColumns={5}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Collection</Text>
          <TouchableOpacity
            style={[
              styles.saveButton,
              !title.trim() && styles.saveButtonDisabled,
            ]}
            onPress={handleCreateCollection}
            disabled={!title.trim()}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <ScrollView style={styles.content}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Collection Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter collection name"
                value={title}
                onChangeText={setTitle}
                autoFocus
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Emoji (Optional)</Text>
              <View style={styles.emojiContainer}>
                <Text style={styles.emojiPreview}>{emoji}</Text>
                <TouchableOpacity
                  style={styles.emojiButton}
                  onPress={() => setShowEmojiPicker(true)}>
                  <Icon name="happy-outline" size={24} color="#666666" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Color (Optional)</Text>
              <View style={styles.colorContainer}>
                <View style={[styles.colorPreview, {backgroundColor: color}]} />
                <TouchableOpacity
                  style={styles.colorButton}
                  onPress={() => setShowColorPicker(true)}>
                  <Icon
                    name="color-palette-outline"
                    size={24}
                    color="#666666"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Emoji Picker Modal */}
        <Modal
          visible={showEmojiPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowEmojiPicker(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Emoji</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowEmojiPicker(false)}>
                  <Icon name="close" size={24} color="#333333" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={emojiCategories}
                renderItem={renderEmojiCategory}
                keyExtractor={item => item.title}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Modal>

        {/* Color Picker Modal */}
        <Modal
          visible={showColorPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowColorPicker(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Color</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowColorPicker(false)}>
                  <Icon name="close" size={24} color="#333333" />
                </TouchableOpacity>
              </View>
              <View style={styles.colorGrid}>
                {colorPalette.map((colorItem, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorItem,
                      {backgroundColor: colorItem.value},
                      color === colorItem.value && styles.selectedColorItem,
                    ]}
                    onPress={() => {
                      setColor(colorItem.value);
                      setShowColorPicker(false);
                    }}>
                    {color === colorItem.value && (
                      <Icon name="checkmark" size={20} color="#333333" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  saveButton: {
    backgroundColor: '#666666',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#333333',
  },
  emojiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiPreview: {
    fontSize: 32,
    marginRight: 12,
  },
  emojiButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiCategory: {
    marginBottom: 20,
  },
  emojiCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 10,
  },
  emojiItem: {
    width: '20%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emojiItemText: {
    fontSize: 28,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorItem: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedColorItem: {
    borderWidth: 2,
    borderColor: '#666666',
  },
});

export default CreateCollection;
