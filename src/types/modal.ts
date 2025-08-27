export type FlowType = 'fill' | 'take' | 'send';

export type TwoStepModalProps = {
  open: boolean;
  type: FlowType;

  name?: string;
  amount?: number;
  account?: string;

  onClose: () => void;
  onSubmit: (payload: {
    type: FlowType;
    name: string;
    amount: number;
    account: string;
  }) => void;
};
