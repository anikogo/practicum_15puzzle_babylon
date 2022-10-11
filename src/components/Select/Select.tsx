import { Fragment } from 'react';

import classnames from 'classnames';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

type OptionProps<T> = {
  label: string;
  value: T;
};

type SelectProps<T> = {
  value: T;
  classes?: {
    button?: string,
    list?: string,
  },
  options: OptionProps<T>[];
  onChange: (value: T) => void;
};

export default function Select<T>({
  value,
  options,
  classes,
  onChange,
}: SelectProps<T>) {
  const { label } = options.find((item) => item.value === value) ?? options[0];

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className={classnames('select-button', classes?.button)}>
          <span className="block truncate">{label}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className={classnames('select-options', classes?.list)}>
            {options.map((item) => (
              <Listbox.Option
                key={item.label}
                value={item.value}
                className={({ active }) => classnames('cursor-default select-none relative py-2 pl-10 pr-4', {
                  'bg-secondary-disabled': active,
                  'text-gray-900': !active,
                })}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={classnames('block truncate', {
                        'font-medium': selected,
                        'font-normal': !selected,
                      })}
                    >
                      {item.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-normal">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
