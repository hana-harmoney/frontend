import { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const useSpeechToText = () => {
  const {
    transcript,
    interimTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
    }
  };

  useEffect(() => {
    if (listening) {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        console.log('최초 5초 동안 입력 없음, 인식 중지');
        if (!interimTranscript) {
          // 사용자로부터 입력된 음성의 텍스트가 없을 경우
          SpeechRecognition.stopListening(); // 음성 인식 종료
        }
      }, 5000); // 5초 동안 음성 인식
      setTimer(newTimer);
    }
  }, [listening]);

  useEffect(() => {
    if (listening) {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        console.log('3초 동안 입력 없음, 인식 중지');
        if (!interimTranscript) {
          // 사용자로부터 입력된 음성의 텍스트가 없을 경우
          SpeechRecognition.stopListening(); // 음성 인식 종료
        }
      }, 3000); // 3초 동안 음성 인식
      setTimer(newTimer);
    }
  }, [interimTranscript]);

  return {
    transcript,
    interimTranscript,
    listening,
    browserSupportsSpeechRecognition,
    toggleListening,
  };
};

export default useSpeechToText;
