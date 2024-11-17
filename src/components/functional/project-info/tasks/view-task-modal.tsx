import { ITask } from "@/interfaces";
import { Modal } from "antd";
import React from "react";

interface IViewTaskModalProps {
  selectedTask: ITask;
  showViewTaskModal: boolean;
  setShowViewTaskModal: (showViewTaskModal: boolean) => void;
}

function ViewTaskModal({
  selectedTask,
  showViewTaskModal,
  setShowViewTaskModal,
}: IViewTaskModalProps) {
  return (
    <Modal
      open={showViewTaskModal}
      onClose={() => setShowViewTaskModal(false)}
      onCancel={() => setShowViewTaskModal(false)}
      centered
      title={selectedTask?.name}
      width={1200}
      footer={null}
    >
      <div className="flex flex-col gap-5 h-[500px] overflow-y-auto">
        <hr className="border border-gray-300" />
        <p dangerouslySetInnerHTML={{ __html: selectedTask?.description }}></p>
      </div>
    </Modal>
  );
}

export default ViewTaskModal;
