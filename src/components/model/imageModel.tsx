import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { TaskStage } from '../../../types/TaskStage';
import { completeApi } from '../../api/Mission/complete';
import EncryptedStorage from 'react-native-encrypted-storage';

interface TaskData {
  missionContent: string;
}

interface ImgModelProps {
  onClose: () => void;
  setTaskStage: (stage: TaskStage) => void;
  taskData: TaskData;
}

const PlusIcon = () => <Text style={modalStyles.plusIcon}>+</Text>;

const ImgModel = ({ onClose, setTaskStage, taskData }: ImgModelProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');

  const handleComplete = async () => {
    try {
      const auth = await EncryptedStorage.getItem('auth');
      if (!auth) return;

      const { accessToken } = JSON.parse(auth);

      const savedId = await EncryptedStorage.getItem('missions');
      if (!savedId) return;
      const { userMissionId } = JSON.parse(savedId);

      if (!userMissionId) {
        console.log('userMissionId가 없습니다.');
        return;
      }

      console.log('userMissionId', userMissionId);
      await completeApi({
        accessToken,
        userMissionid: Number(userMissionId),
        resultText: content,
        resultImageUrl: imageUrl,
      });
      console.log('기록 저장 및 완료');
      setTaskStage('idle');
      onClose();
    } catch (e) {
      console.log('Failed to complete mission:', e);
    }
  };

  const handleAddImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) return;

        if (response.errorCode) {
          console.log('ImagePicker Error:', response.errorMessage);
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          if (typeof uri === 'string') {
            setImageUrl(uri);
          }
        }
      },
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={modalStyles.wrapper}
    >
      <ScrollView
        contentContainerStyle={modalStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={modalStyles.header}>
          <Text style={modalStyles.instructionText}>
            과제를 완료했습니다.{'\n'}오늘의 추억을 사진과 글로 남겨주세요.
          </Text>
          <Text style={modalStyles.taskTitle}>
            {taskData?.missionContent} 완료
          </Text>
        </View>

        <View style={modalStyles.card}>
          <View style={modalStyles.inputContainer}>
            <Text style={modalStyles.label}>내용</Text>
            <TextInput
              style={modalStyles.textInput}
              placeholder="내용"
              placeholderTextColor="#B0B0B0"
              multiline={true}
              numberOfLines={4}
              value={content}
              onChangeText={setContent}
            />
          </View>

          {/* 이미지 추가 영역 */}
          <TouchableOpacity
            style={modalStyles.imageAddArea}
            onPress={handleAddImage}
          >
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={{ width: '100%', height: '100%', borderRadius: 12 }}
                resizeMode="cover"
              />
            ) : (
              <>
                <PlusIcon />
                <Text style={modalStyles.imagePromptText}>
                  눌러서 이미지 추가하기
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={modalStyles.completeButton}
        onPress={handleComplete}
      >
        <Text style={modalStyles.buttonText}>완료</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const modalStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    overflow: 'hidden',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  instructionText: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },

  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    minHeight: 50,
  },

  imageAddArea: {
    minHeight: 200,
    borderWidth: 1.5,
    borderColor: '#D0D0D0',
    borderStyle: 'dotted',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  plusIcon: {
    fontSize: 40,
    lineHeight: 50,
    color: '#A0A0A0',
  },
  imagePromptText: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 5,
  },

  completeButton: {
    backgroundColor: '#333333',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ImgModel;
