import DelegatePage from './pages/DelegatePage';

type Props = {
  searchParams: { token?: string };
};

export default function ProfileDelegatePage({ searchParams }: Props) {
  const token = searchParams.token;

  return <DelegatePage token={token || ''} />;
}
