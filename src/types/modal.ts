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
  }) => Promise<void>;
  onComplete?: () => void;
};

export type TwoStepModalPropsWithVoidSubmit = Omit<
  TwoStepModalProps,
  'onSubmit'
> & {
  onSubmit: (payload: {
    type: FlowType;
    name: string;
    amount: number;
    account: string;
  }) => Promise<{ ok: boolean; message?: string }>;
};
