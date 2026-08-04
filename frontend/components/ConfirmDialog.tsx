"use client";

import { Fragment, useRef } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ConfirmDialogProps } from "@/types";

/* A real dialog rather than `window.confirm` — the native one is unstyleable,
 * blocks the main thread, and looks like a browser warning rather than part of
 * the app.
 *
 * Focus lands on Cancel, not on the destructive button, so a stray Enter
 * dismisses instead of destroying. Escape and backdrop click both cancel. */
const ConfirmDialog = ({
  isOpen,
  title,
  body,
  confirmLabel,
  cancelLabel = "Cancel",
  tone = "danger",
  busy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative"
        style={{ zIndex: "var(--z-modal)" }}
        initialFocus={cancelRef}
        onClose={busy ? () => undefined : onCancel}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-long"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-short"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="dialog__backdrop" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-md">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-long"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-short"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="dialog__panel dialog__panel--sm">
                <DialogTitle className="dialog__title">{title}</DialogTitle>
                <Description className="confirm__body">{body}</Description>

                <div className="confirm__actions">
                  <button
                    ref={cancelRef}
                    type="button"
                    className="btn btn--quiet"
                    onClick={onCancel}
                    disabled={busy}
                  >
                    {cancelLabel}
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      tone === "danger" ? "btn--danger-solid" : "btn--primary"
                    }`}
                    onClick={onConfirm}
                    disabled={busy}
                    aria-busy={busy || undefined}
                  >
                    {busy && <span className="btn__spinner" aria-hidden="true" />}
                    <span>{confirmLabel}</span>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmDialog;
