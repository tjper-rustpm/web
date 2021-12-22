import { Fragment, useState } from 'react';
import { Card } from '../components/Card';
import { Authentication } from '../components/Authentication';
import { Subscriptions } from '../components/Subscriptions';
import { Transition } from '@headlessui/react';

import { CreditCardIcon, FingerPrintIcon, MenuIcon } from '@heroicons/react/outline';

import { Tab } from '@headlessui/react';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function Profile(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const tabs = [
    { icon: <FingerPrintIcon className="w-8 h-8" />, name: 'Authentication' },
    { icon: <CreditCardIcon className="w-8 h-8" />, name: 'Subscriptions' },
  ];

  return (
    <Card>
      <Tab.Group vertical>
        <div className="flex">
          <div>
            <div>
              <button onClick={() => setOpen(!open)}>
                <MenuIcon className="w-9 h-9" />
              </button>
            </div>
            <Tab.List className="flex flex-col text-xl space-y-2">
              {tabs.map((value, index): JSX.Element => {
                return (
                  <Tab as={Fragment} key={index}>
                    {({ selected }) => (
                      <button
                        className={classNames(
                          selected ? 'bg-zinc-100 border-slate-600' : '',
                          `inline-flex items-center py-3 px-2 text-left rounded-sm border-r-8 transition-width ease-in-out duration-200 ${
                            open ? 'w-56' : 'w-16'
                          }`,
                        )}
                      >
                        <span className="mr-4">{value.icon}</span>
                        <Transition
                          show={open}
                          enter="transition-opacity ease-linear duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition-opacity ease-linear duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <span>{value.name}</span>
                        </Transition>
                      </button>
                    )}
                  </Tab>
                );
              })}
            </Tab.List>
          </div>
          <Tab.Panels className="grow ml-6">
            <Tab.Panel>
              <Authentication />
            </Tab.Panel>
            <Tab.Panel>
              <Subscriptions />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </Card>
  );
}
