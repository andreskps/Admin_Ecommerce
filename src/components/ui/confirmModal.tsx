import React from "react";
import { Button } from "./button";
import { Dialog, DialogDescription, DialogFooter, DialogTitle } from "./dialog";
import { Modal } from "./modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button onClick={onCancel} variant="outline">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="destructive">
          Eliminar
        </Button>
      </div>
    </Modal>
  );
};
