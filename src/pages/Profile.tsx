import { Fragment } from 'react';
import { Card } from '../components/Card';
import { Authentication } from '../components/Authentication';
import { Subscriptions } from '../components/Subscriptions';

import { CreditCardIcon, FingerPrintIcon } from '@heroicons/react/outline';

import { Tab } from '@headlessui/react';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function Profile(): JSX.Element {
  const tabs = [
    { icon: <FingerPrintIcon className="w-4 h-4 mr-2" />, name: 'Authentication' },
    { icon: <CreditCardIcon className="w-4 h-4 mr-2" />, name: 'Subscriptions' },
  ];

  return (
    <Card>
      <Tab.Group vertical>
        <div className="flex">
          <Tab.List className="flex flex-col text-xl">
            {tabs.map((value, index): JSX.Element => {
              return (
                <Tab as={Fragment} key={index}>
                  {({ selected }) => (
                    <button
                      className={classNames(
                        selected ? 'bg-zinc-100 border-r-2' : '',
                        'block text-left h-14 px-4 mr-4 rounded-sm border-slate-400',
                      )}
                    >
                      <div className="inline-flex items-center">
                        {value.icon}
                        {value.name}
                      </div>
                    </button>
                  )}
                </Tab>
              );
            })}
          </Tab.List>
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
