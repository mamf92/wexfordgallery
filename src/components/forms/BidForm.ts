import { TextInput } from '../inputs/InputField';
import { Button } from '../ui/Buttons';

/**
 * Renders a bid submission form with amount input and submit button.
 * Sets max bid to available credits if provided.
 */
export function renderBidForm(
  onSubmit: (e: SubmitEvent) => void,
  availableCredits: string
) {
  const formContainer = document.createElement('div');
  formContainer.className = 'flex flex-col w-full bg-wexham-white';

  const form = document.createElement('form');
  form.id = 'bid-form';
  form.className = 'flex flex-col gap-6 w-full items-center';
  form.addEventListener('submit', onSubmit);

  const bidInput = TextInput({
    id: 'bid-amount',
    name: 'bid-amount',
    label: 'Place your bid (crdts)',
    type: 'number',
    placeholder: 'Enter your bid amount',
    min: '1',
    max: availableCredits ? availableCredits : undefined,
    required: true,
    title:
      'Enter your bid amount in crdts. Minimum is 1 crdt. Maximum is your available credits.',
  });
  bidInput.classList.add('w-full');

  const submitButton = Button({
    label: 'Place Bid',
    variant: 'primary',
    size: 'small',
  });
  submitButton.classList.add('self-end');

  form.appendChild(bidInput);
  form.appendChild(submitButton);
  formContainer.appendChild(form);
  return formContainer;
}
