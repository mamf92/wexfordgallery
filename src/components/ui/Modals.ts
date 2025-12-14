import { Button } from './Buttons';

type IconVariants = 'error' | 'warning' | 'success' | 'questionmark';

interface ModalProps {
  title: string;
  message: string;
  icon: IconVariants;
}

interface ConfirmationModalProps extends ModalProps {
  confirmationLabel?: string;
  cancellationLabel?: string;
}

const ICONS: Record<IconVariants, string> = {
  error:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-41 max-sm:h-37 w-41 max-sm:w-37" fill="#8F2B16"><path d="M333.08-311.08 480-458l146.92 146.92 22-22L502-480l146.92-146.92-22-22L480-502 333.08-648.92l-22 22L458-480 311.08-333.08l22 22ZM480.13-120q-74.44 0-139.79-28.34t-114.48-77.42q-49.13-49.08-77.49-114.37Q120-405.42 120-479.87q0-74.67 28.34-140.41 28.34-65.73 77.42-114.36 49.08-48.63 114.37-76.99Q405.42-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.44-28.34 139.79t-76.92 114.48q-48.58 49.13-114.26 77.49Q554.81-120 480.13-120Zm-.13-30.77q137.38 0 233.31-96.04 95.92-96.04 95.92-233.19 0-137.38-95.92-233.31-95.93-95.92-233.31-95.92-137.15 0-233.19 95.92-96.04 95.93-96.04 233.31 0 137.15 96.04 233.19 96.04 96.04 233.19 96.04ZM480-480Z"/></svg>',
  warning:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-41 max-sm:h-37 w-41 max-sm:w-37" fill="#011526"> <path d="M109.23-160 480-800l370.77 640H109.23Zm53.23-30.77h635.08L480-738.46 162.46-190.77Zm319.42-63.15q8.58 0 14.2-5.81 5.61-5.8 5.61-14.38 0-8.58-5.8-14.2-5.81-5.61-14.39-5.61-8.58 0-14.19 5.8-5.62 5.81-5.62 14.39 0 8.58 5.81 14.19 5.8 5.62 14.38 5.62Zm-15.57-84.85h30.77v-211.69h-30.77v211.69ZM480-464.62Z"/> </svg>',
  success:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-41 max-sm:h-37 w-41 max-sm:w-37" fill="#327D36"> <path d="M421-324.92 677.08-581l-23.7-23.46L421-371.31 304.08-488.23l-22.7 23.46L421-324.92ZM480.13-120q-74.44 0-139.79-28.34t-114.48-77.42q-49.13-49.08-77.49-114.37Q120-405.42 120-479.87q0-74.67 28.34-140.41 28.34-65.73 77.42-114.36 49.08-48.63 114.37-76.99Q405.42-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.44-28.34 139.79t-76.92 114.48q-48.58 49.13-114.26 77.49Q554.81-120 480.13-120Zm-.13-30.77q137.38 0 233.31-96.04 95.92-96.04 95.92-233.19 0-137.38-95.92-233.31-95.93-95.92-233.31-95.92-137.15 0-233.19 95.92-96.04 95.93-96.04 233.31 0 137.15 96.04 233.19 96.04 96.04 233.19 96.04ZM480-480Z"/> </svg>',
  questionmark:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-41 max-sm:h-37 w-41 max-sm:w-37" fill="#011526"> <path d="M484.04-273.92q10.58 0 18.11-7.97 7.54-7.97 7.54-18.54 0-9.8-7.58-17.72-7.58-7.93-18.15-7.93-10.58 0-18.5 7.97t-7.92 17.77q0 10.57 7.96 18.49 7.97 7.93 18.54 7.93ZM463.62-403h32.07q.77-22.92 8.81-40.58 8.04-17.65 33.58-40.27 28.69-26.77 40.92-48.69 12.23-21.92 12.23-48.33 0-45.82-30.19-74.75-30.19-28.92-75.81-28.92-39.77 0-70.73 21.04t-46.42 51.73l30.69 12.31q11.77-25.69 31.85-40.04 20.07-14.35 51.61-14.35 39.39 0 59.62 21.58 20.23 21.58 20.23 51.35 0 21.23-11.46 38.8-11.47 17.58-32.62 36.27-28.46 26-41.42 51.12-12.96 25.11-12.96 51.73Zm16.51 283q-74.44 0-139.79-28.34t-114.48-77.42q-49.13-49.08-77.49-114.37Q120-405.42 120-479.87q0-74.67 28.34-140.41 28.34-65.73 77.42-114.36 49.08-48.63 114.37-76.99Q405.42-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.44-28.34 139.79t-76.92 114.48q-48.58 49.13-114.26 77.49Q554.81-120 480.13-120Zm-.13-30.77q137.38 0 233.31-96.04 95.92-96.04 95.92-233.19 0-137.38-95.92-233.31-95.93-95.92-233.31-95.92-137.15 0-233.19 95.92-96.04 95.93-96.04 233.31 0 137.15 96.04 233.19 96.04 96.04 233.19 96.04ZM480-480Z"/> </svg>',
};

/**
 * Displays a centered modal overlay with title, message, and close button.
 * Appends to document.body and removes itself on close.
 */
export function showModal({ title, message, icon }: ModalProps): HTMLElement {
  const Modal = document.createElement('div');
  Modal.className =
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-1 border-b-1 lg:border-t-2 lg:border-b-2 border-wexham-dark z-[1000] flex flex-col items-center justify-center w-[95vw] max-w-[35rem] md:min-w-[21rem] bg-wexham-white px-2 lg:px-6 pt-6 pb-2 gap-4';

  const ModalContent = document.createElement('div');
  ModalContent.className = 'flex flex-row items-center justify-around w-full ';

  const ModalText = document.createElement('div');
  ModalText.className =
    'flex flex-col w-[calc(100%-40%)] sm:w-[calc(100%-9.25rem)] text-wexham-dark gap-2 p-4';

  const ModalTitle = document.createElement('h2');
  ModalTitle.className = 'font-heading text-2xl sm:text-3xl lg:text-4xl';
  ModalTitle.textContent = title;

  const ModalMessage = document.createElement('p');
  ModalMessage.className = 'font-body text-md sm:text-lg';
  ModalMessage.textContent = message;

  const ModalIconContainer = document.createElement('div');
  ModalIconContainer.className = 'flex justify-center';
  ModalIconContainer.innerHTML = ICONS[icon];

  const ModalActions = document.createElement('div');
  ModalActions.className =
    'flex flex-row width-full justify-center gap-2 p-2 md:gap-0';

  const ModalCloseButton = Button({
    label: 'Close',
    variant: 'primary',
    size: 'medium',
    onClick: () => Modal.remove(),
  });

  Modal.appendChild(ModalContent);
  ModalContent.appendChild(ModalText);
  ModalText.appendChild(ModalTitle);
  ModalText.appendChild(ModalMessage);
  ModalContent.appendChild(ModalIconContainer);
  Modal.appendChild(ModalActions);
  ModalActions.appendChild(ModalCloseButton);
  document.body.appendChild(Modal);
  Modal.classList.add('show');

  return Modal;
}

/**
 * Displays a confirmation modal with confirm/cancel buttons.
 * Returns a promise that resolves to user's choice.
 */
export function requestConfirmation({
  title,
  message,
  icon,
  confirmationLabel = 'Confirm',
  cancellationLabel = 'Cancel',
}: ConfirmationModalProps): Promise<boolean> {
  return new Promise((resolve) => {
    const ConfirmationModal = document.createElement('div');
    ConfirmationModal.className =
      'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-1 border-b-1 lg:border-t-2 lg:border-b-2 border-wexham-dark z-[1000] flex flex-col items-center justify-center w-[95vw] max-w-[35rem] md:min-w-[21rem] bg-wexham-white px-2 lg:px-6 pt-6 pb-2 gap-4';

    const ConfirmationModalContent = document.createElement('div');
    ConfirmationModalContent.className =
      'flex flex-row items-center justify-around w-full';

    const ConfirmationModalText = document.createElement('div');
    ConfirmationModalText.className =
      'flex flex-col w-[calc(100%-40%)] sm:w-[calc(100%-9.25rem)] text-wexham-dark gap-2 p-4';

    const ConfirmationModalTitle = document.createElement('h3');
    ConfirmationModalTitle.className =
      'font-heading text-2xl sm:text-3xl lg:text-4xl';
    ConfirmationModalTitle.textContent = title;

    const ConfirmationModalMessage = document.createElement('p');
    ConfirmationModalMessage.className = 'font-body text-md sm:text-lg';
    ConfirmationModalMessage.textContent = message;

    const ConfirmationModalIconContainer = document.createElement('div');
    ConfirmationModalIconContainer.className =
      'flex justify-center h-[9.25rem]';

    const ConfirmationModalIcon = document.createElement('svg');
    ConfirmationModalIcon.innerHTML = ICONS[icon];

    const ConfirmationModalActions = document.createElement('div');
    ConfirmationModalActions.className =
      'flex flex-row width-full justify-center gap-8 p-6';

    const ConfirmationModalCancelButton = Button({
      label: cancellationLabel,
      variant: 'secondary',
      size: 'small',
      onClick: () => {
        ConfirmationModal.remove();
        resolve(false);
      },
    });

    const ConfirmationModalConfirmButton = Button({
      label: confirmationLabel,
      variant: 'primary',
      size: 'small',
      onClick: () => {
        ConfirmationModal.remove();
        resolve(true);
      },
    });

    ConfirmationModal.appendChild(ConfirmationModalContent);
    ConfirmationModalContent.appendChild(ConfirmationModalText);
    ConfirmationModalText.appendChild(ConfirmationModalTitle);
    ConfirmationModalText.appendChild(ConfirmationModalMessage);
    ConfirmationModalContent.appendChild(ConfirmationModalIconContainer);
    ConfirmationModalIconContainer.appendChild(ConfirmationModalIcon);
    ConfirmationModal.appendChild(ConfirmationModalActions);
    ConfirmationModalActions.appendChild(ConfirmationModalCancelButton);
    ConfirmationModalActions.appendChild(ConfirmationModalConfirmButton);

    document.body.appendChild(ConfirmationModal);
    ConfirmationModal.classList.add('show');
  });
}
