import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ExclamationCircleIcon, CheckIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import { useField, FieldHookConfig } from 'formik';

import { Typography } from './Typography';

type InputFieldProps = FieldHookConfig<string> & {
  label: string;
};

export function InputField({ label, ...props }: InputFieldProps): JSX.Element {
  const [field, meta] = useField(props);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <div className="inline-flex items-center my-2">
        <label className="text-slate-700 text-xl mx-2" htmlFor={label.toLowerCase()}>
          <Typography size="xl">{label}</Typography>
        </label>
        <Transition
          show={meta.touched && meta.error == undefined}
          enter="transition-opacity duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <CheckIcon className="w-4 h-4 text-green-400" />
        </Transition>
      </div>
      <div className="relative w-full">
        <input
          className="shadow w-full rounded-md h-11 px-3 mb-3 font-sans text-slate-400 border-slate-200 border"
          {...field}
          placeholder={props.placeholder}
          type={props.type === 'password' && visible ? 'text' : props.type}
        />
        {props.type === 'password' && (
          <button className="absolute top-3 right-4" type="button" onClick={() => setVisible(!visible)}>
            {visible ? (
              <EyeSlashIcon className="w-5 h-5 text-slate-700" />
            ) : (
              <EyeIcon className="w-5 h-5 text-slate-700" />
            )}
          </button>
        )}
      </div>
      <Transition
        show={meta.touched && meta.error != undefined}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex items-center ml-2 mb-3">
          <ExclamationCircleIcon className="mr-2 h-6 text-red-400" />
          <p className="font-sans text-md text-red-500">{meta.error}</p>
        </div>
      </Transition>
    </div>
  );
}
