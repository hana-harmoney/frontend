import Image from 'next/image';

type Props = {
  imageUrl: string;
  size: number;
};

export default function ChatProfileImage({ imageUrl, size }: Props) {
  return (
    <div
      className="relative overflow-hidden rounded-full"
      style={{ width: size, height: size }}
    >
      <Image src={imageUrl} alt="profile" className="object-cover" fill />
    </div>
  );
}
