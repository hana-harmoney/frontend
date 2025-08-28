'use client';

import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Send from '@/assets/icons/send.svg';
import Microphone from '@/assets/icons/microphone.svg';
import { InputWithIcon } from '../common/inputWithIcon';
import useSpeechToText from '@/hooks/useSpeechToText';
import Record from '@/assets/icons/record.svg';
import StopRecord from '@/assets/icons/stop_record.svg';
import { cn } from '@/lib/utils';

type Props = {
  inputRef?: RefObject<HTMLInputElement | null>;
  onSend: (text: string) => void;
  showRecord: boolean;
  setShowRecord: Dispatch<SetStateAction<boolean>>;
};

export default function ChatInput({
  inputRef,
  onSend,
  showRecord,
  setShowRecord,
}: Props) {
  const [text, setText] = useState('');
  const {
    interimTranscript,
    listening,
    browserSupportsSpeechRecognition,
    toggleListening,
  } = useSpeechToText();

  // 음성 인식
  useEffect(() => {
    if (interimTranscript.trim()) {
      setText(
        (prev) => `${prev.trim() ? `${prev} ` : ''}${interimTranscript.trim()}`,
      );
    }
  }, [interimTranscript]);

  const toggleShowRecord = () => {
    if (listening) {
      toggleListening();
    }

    setShowRecord((prev) => !prev);
  };

  // 텍스트 전송
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const handleSend = () => {
    if (!text.trim()) return;

    onSend(text);
    setText('');
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="frame-container flex w-full flex-col bg-white p-2.5"
    >
      <div className="flex w-full gap-1">
        <InputWithIcon
          className="text-text h-12 flex-grow rounded-lg bg-white text-xl"
          ref={inputRef}
          value={text}
          placeholder="메세지를 입력해주세요..."
          icon={
            browserSupportsSpeechRecognition && (
              <button
                className="block"
                type="button"
                onClick={toggleShowRecord}
              >
                <Microphone
                  className={cn('size-8', showRecord ? 'stroke-hana-red' : '')}
                />
              </button>
            )
          }
          onChange={handleChangeText}
        />
        <button type="submit" onClick={handleSend}>
          <Send className="size-10" />
        </button>
      </div>
      {showRecord && (
        <div className="flex h-25 flex-col items-center justify-center gap-2">
          <button className="block" type="button" onClick={toggleListening}>
            {listening ? (
              <StopRecord className="size-12" />
            ) : (
              <Record className="size-12" />
            )}
          </button>
          <p className="text-xl font-medium">
            {listening
              ? '버튼을 눌러 음성 인식을 종료합니다'
              : '버튼을 눌러 음성 인식을 시작합니다'}
          </p>
        </div>
      )}
    </form>
  );
}
