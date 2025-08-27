'use client';

import Warning from '@/assets/icons/warning.svg';
import CheckCircle from '@/assets/icons/check_circle.svg';
import ChatDialogButton from './ChatDialogButton';
import { useState } from 'react';
import { reportReasons } from '@/lib/utils';
import { Label } from '../ui/label';
import { reportUser } from '@/lib/api/chat';
import toast from 'react-hot-toast';

type Props = {
  roomId: number;
};

export default function ReportButton({ roomId }: Props) {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showDoneDialog, setShowDoneDialog] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setSelected((prev) => {
      const draft = new Set(prev);
      if (draft.has(idx)) draft.delete(idx);
      else draft.add(idx);
      return draft;
    });
  };

  const openReportDialog = () => {
    setShowReportDialog(true);
  };

  const closeReportDialog = () => {
    setSelected(new Set());

    setShowReportDialog(false);
  };

  const openDoneDialog = () => {
    setShowDoneDialog(true);
  };

  const closeDoneDialog = () => {
    setShowDoneDialog(false);
  };

  const handleReportUser = async () => {
    try {
      await reportUser(roomId);

      closeReportDialog();
      openDoneDialog();
    } catch {
      toast.error('신고하기에 실패했습니다.');
    }
  };

  return (
    <div>
      <button
        className="cursor-pointer"
        type="button"
        onClick={openReportDialog}
      >
        <Warning className="size-8" />
      </button>

      {/* 신고하기 다이알로그 */}
      <ChatDialogButton
        title={'신고하기'}
        desc={'해당되는 사항에 체크해주세요'}
        open={showReportDialog}
        onAction={handleReportUser}
        onClose={closeReportDialog}
        actionButtonText="신고하기"
      >
        <div className="flex flex-col gap-2.5">
          {reportReasons.map((reason, index) => {
            const id = `report-reason-${index}`;
            const checked = selected.has(index);
            return (
              <div key={id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(index)}
                  className="checked:bg-hana-green checked:border-hana-green grid size-5 appearance-none place-content-center rounded border border-gray-300 bg-white transition before:block before:h-1.5 before:w-2.5 before:translate-y-[-1px] before:scale-0 before:-rotate-45 before:border-b-2 before:border-l-2 before:border-white before:content-[''] checked:before:scale-100"
                />
                <Label
                  onClick={() => toggle(index)}
                  htmlFor={id}
                  className="text-gray cursor-pointer text-xl font-light"
                >
                  {reason}
                </Label>
              </div>
            );
          })}
        </div>
      </ChatDialogButton>

      {/* 신고 완료 다이알로그 */}
      <ChatDialogButton
        title={'신고하기'}
        desc={'신고가 완료되었습니다.'}
        open={showDoneDialog}
        showCancleButton={false}
        onAction={closeDoneDialog}
        onClose={closeDoneDialog}
        actionButtonText="완료"
      >
        <CheckCircle className="size-10 w-full" />
      </ChatDialogButton>
    </div>
  );
}
