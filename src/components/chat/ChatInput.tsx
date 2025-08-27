'use client';

import { RefObject, useRef, useState } from 'react';
import Send from '@/assets/icons/send.svg';
import Microphone from '@/assets/icons/microphone.svg';
import { InputWithIcon } from '../common/inputWithIcon';

type Props = {
  inputRef?: RefObject<HTMLInputElement | null>;
  onSend: (text: string) => void;
};

export default function ChatInput({ inputRef, onSend }: Props) {
  const [text, setText] = useState('');

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
      className="frame-container flex w-full gap-1 bg-white p-2.5"
    >
      <InputWithIcon
        className="text-text h-12 flex-grow rounded-lg bg-white text-xl"
        ref={inputRef}
        value={text}
        placeholder="메세지를 입력해주세요..."
        icon={<Microphone className="size-8" />}
        onChange={handleChangeText}
      />
      <button type="submit" onClick={handleSend}>
        <Send className="size-10" />
      </button>
    </form>
  );
}
