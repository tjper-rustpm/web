import { Fragment, useState } from 'react';
import { Authentication } from '../components/Authentication';
import { Card } from '../components/Card';
import { Divider } from '../components/Divider';
import { Subscriptions } from '../components/Subscriptions';
import { Transition } from '@headlessui/react';

import { CreditCardIcon, FingerPrintIcon, MenuIcon } from '@heroicons/react/outline';

import { Tab } from '@headlessui/react';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function Profile(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  let listWidth = 'w-14';
  if (open) {
    listWidth = 'w-56';
  }

  const tabs = [
    { icon: <FingerPrintIcon className="w-8 h-8" />, name: 'Authentication' },
    { icon: <CreditCardIcon className="w-8 h-8" />, name: 'Subscriptions' },
  ];

  return (
    <Card>
      <Tab.Group vertical>
        <div className="flex relative">
          <div
            className={`absolute z-10 h-full bg-zinc-50 text-left text-xl transition-width ease-in-out duration-200 ${listWidth}`}
          >
            <div className="flex items-center">
              <button className="mr-4" onClick={() => setOpen(!open)}>
                <div className="flex flex-col w-11 h-11 bg-zinc-100 rounded-full">
                  <MenuIcon className="justify-center m-auto w-8 h-8" />
                </div>
              </button>
              <Transition
                show={open}
                enter="transition-opacity ease-in-out duration-400"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-in-out duration-50"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <span>Menu</span>
              </Transition>
            </div>
            <div className="pr-2">
              <Divider />
            </div>
            <Tab.List className="flex flex-col space-y-2">
              {tabs.map((value, index): JSX.Element => {
                return (
                  <Tab as={Fragment} key={index}>
                    {({ selected }) => (
                      <button
                        className={classNames(
                          selected ? 'bg-zinc-100 border-slate-600' : '',
                          'inline-flex items-center py-3 px-2 rounded-sm border-r-8 ',
                        )}
                      >
                        <div className="mr-4">{value.icon}</div>
                        <Transition
                          show={open}
                          enter="transition-opacity ease-in-out duration-400"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition-opacity ease-in-out duration-50"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div>{value.name}</div>
                        </Transition>
                      </button>
                    )}
                  </Tab>
                );
              })}
            </Tab.List>
          </div>
          <Tab.Panels className="grow ml-20">
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
