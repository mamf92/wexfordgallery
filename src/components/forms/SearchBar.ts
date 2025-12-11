import { TextInput } from '../inputs/InputField';
import { Button } from '../ui/Buttons';

interface SearchBarOptions {
  onSubmit: (e: SubmitEvent) => void;
  onFilterButtonPress: () => void;
  onSortButtonPress: () => void;
  filterButton: boolean;
  sortButton: boolean;
}

export function renderSearchBar(options: SearchBarOptions) {
  const formContainer = document.createElement('div');
  formContainer.className = 'flex w-full max-w-[1200px] bg-wexham-white';
  const { onSubmit } = options;
  const form = document.createElement('form');
  form.id = 'search-form';
  form.className = 'flex gap-2 w-full p-4';
  form.addEventListener('submit', onSubmit);

  if (options.filterButton) {
    const filterButton = Button({
      label: 'Filter',
      variant: 'secondary',
      size: 'small',
      onlyIcon: 'filter',
      onClick: options.onFilterButtonPress,
    });
    form.appendChild(filterButton);
  }

  const searchInput = TextInput({
    id: 'search',
    name: 'search',
    label: 'Search query',
    type: 'text',
    placeholder: 'Enter your search query',
    pattern: '.*\\S.*',
    required: true,
    title: 'Please enter a search query.',
    srOnly: true,
  });
  form.appendChild(searchInput);

  const submitButton = Button({
    label: 'Search',
    variant: 'primary',
    size: 'small',
    onlyIcon: 'search',
  });
  form.appendChild(submitButton);

  if (options.sortButton) {
    const sortButton = Button({
      label: 'Sort',
      variant: 'secondary',
      size: 'small',
      onlyIcon: 'sort',
      onClick: options.onSortButtonPress,
    });
    form.appendChild(sortButton);
  }

  formContainer.appendChild(form);
  return formContainer;
}
