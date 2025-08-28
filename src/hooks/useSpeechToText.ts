import { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const useSpeechToText = () => {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const stopRecording = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const toggleListening = () => {
    if (listening) {
      stopRecording();
    } else {
      SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
    }
  };

  useEffect(() => {
    if (listening) {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        if (!interimTranscript.trim()) {
          // 사용자로부터 입력된 음성의 텍스트가 없을 경우
          stopRecording(); // 음성 인식 종료
          console.log('5초 타이머 끝');
        }
      }, 5000); // 5초 동안 음성 인식
      console.log('5초 타이머 시작');
      setTimer(newTimer);
    }
  }, [listening]);

  useEffect(() => {
    if (listening) {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        if (!interimTranscript.trim()) {
          // 사용자로부터 입력된 음성의 텍스트가 없을 경우
          stopRecording(); // 음성 인식 종료
          console.log('3초 타이머 끝');
        }
      }, 3000); // 3초 동안 음성 인식

      console.log('3초 타이머 시작');
      setTimer(newTimer);
    }
  }, [interimTranscript]);

  return {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    browserSupportsSpeechRecognition,
    toggleListening,
  };
};

export default useSpeechToText;
