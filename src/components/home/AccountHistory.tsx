import HanaBank from '@/assets/icons/hana-bank.svg';
type AccountHistoryProps = {
  name: string;
  accountNum: string;
  onClick: () => void;
};

const AccountHistory = ({ name, accountNum, onClick }: AccountHistoryProps) => {
  return (
    <div className="flex w-full gap-3" onClick={onClick}>
      <HanaBank className="mt-2 h-10 w-10" />
      <div className="flex flex-col text-2xl">
        <span className="font-semibold">{name}</span>
        <span className="text-gray font-light">{accountNum}</span>
      </div>
    </div>
  );
};
export default AccountHistory;
