import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

const { width } = Dimensions.get('window');

interface TaskModelProps {
  taskTitle?: string;
  completionDate?: string;
  recordImageUrl?: string | null;
  recordContent?: string;
  onClose: () => void;
}

const TaskModel: React.FC<TaskModelProps> = ({
  taskTitle,
  completionDate,
  recordImageUrl,
  recordContent,
  onClose,
}) => {
  console.log(
    'taskModel',
    taskTitle,
    completionDate,
    recordImageUrl,
    recordContent,
  );
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={15}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.4)"
        />
      </Pressable>
      <View style={styles.modalWrapper}>
        <View style={styles.header}>
          {taskTitle && <Text style={styles.taskTitle}>{taskTitle} 완료</Text>}
          {completionDate && (
            <Text style={styles.completionDate}>{completionDate}</Text>
          )}
        </View>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image
                  source={recordImageUrl ? { uri: recordImageUrl } : null}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.contentArea}>
                <Text style={styles.contentLabel}>내용</Text>
                <View style={styles.contentDisplayBox}>
                  {recordContent && (
                    <Text style={styles.contentText}>{recordContent}</Text>
                  )}
                </View>
              </View>
            </View>

            <View style={{ height: 100 }} />
          </ScrollView>
        </View>

        {/* 닫기 버튼 */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  container: {
    width: width * 0.9,
    height: '70%',
    borderRadius: 20,
    marginBottom: 50,
    overflow: 'hidden',
    alignSelf: 'center',
  },

  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  completionDate: {
    fontSize: 18,
    color: '#888',
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    // 그림자 스타일 (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // 그림자 스타일 (Android)
    elevation: 8,
  },

  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#F0F0F0',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  contentArea: {
    marginTop: 10,
  },
  contentLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  contentDisplayBox: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 50,
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },

  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  closeButton: {
    backgroundColor: '#272429',
    borderRadius: 14,
    paddingVertical: 18,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskModel;
