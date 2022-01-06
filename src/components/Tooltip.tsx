import { useCallback, useState, CSSProperties } from 'react';
import { Transition } from '@headlessui/react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  arrow?: boolean;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export const Tooltip = (props: TooltipProps): JSX.Element => {
  const { children, content, arrow = true, position = 'right' } = props;

  const [active, setActive] = useState<boolean>(false);

  const [childWidth, setChildWidth] = useState<number>(0);
  const [childHeight, setChildHeight] = useState<number>(0);

  const childRef = useCallback(
    (node) => {
      if (node === null) return;

      const rect = node.getBoundingClientRect();
      setChildWidth(rect.width);
      setChildHeight(rect.height);
    },
    [childWidth, childHeight],
  );

  const [tooltipWidth, setTooltipWidth] = useState<number>(0);
  const [tooltipHeight, setTooltipHeight] = useState<number>(0);

  const tooltipRef = useCallback(
    (node) => {
      if (node === null) return;

      const rect = node.getBoundingClientRect();
      setTooltipWidth(rect.width);
      setTooltipHeight(rect.height);
    },
    [tooltipWidth, tooltipHeight],
  );

  let tooltipStyle: CSSProperties = {};
  let arrowStyle: CSSProperties = {};
  let arrowBorderStyle = '';
  switch (position) {
    case 'top':
      tooltipStyle = { left: `${(childWidth - tooltipWidth) / 2}px`, top: `-${tooltipHeight + 14}px` };
      arrowStyle = { left: `${childWidth / 2 - 6}px`, top: '-20px' };
      arrowBorderStyle = 'border-b border-r';
      break;
    case 'right':
      tooltipStyle = { left: `${childWidth + 22}px`, top: `-${(tooltipHeight - childHeight) / 2}px` };
      arrowStyle = { left: `${childWidth + 16}px`, top: `${childHeight / 2 - 6}px` };
      arrowBorderStyle = 'border-b border-l';
      break;
    case 'bottom':
      tooltipStyle = { left: `${(childWidth - tooltipWidth) / 2}px`, top: `${childHeight + 14}px` };
      arrowStyle = { left: `${childWidth / 2 - 6}px`, top: `${childHeight + 8}px` };
      arrowBorderStyle = 'border-t border-l';
      break;
    case 'left':
      tooltipStyle = { right: `${childWidth + 22}px`, top: `-${(tooltipHeight - childHeight) / 2}px` };
      arrowStyle = { right: `${childWidth + 16}px`, top: `${childHeight / 2 - 6}px` };
      arrowBorderStyle = 'border-t border-r';
  }

  return (
    <div className="relative" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
      <Transition
        show={active}
        enter="transition-opacity ease-in-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in-out duration-50"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          ref={tooltipRef}
          style={tooltipStyle}
          className={
            'absolute rounded-md p-3 bg-slate-50 border shadow-xl border-slate-200 shadow-slate-500 text-xs text-slate-700 w-max z-40'
          }
        >
          {content}
        </div>
        {arrow ? (
          <div
            style={arrowStyle}
            className={`absolute w-3 h-3 bg-slate-50 border-slate-200 shadow-xl shadow-slate-500 rotate-45 z-40 ${arrowBorderStyle}`}
          ></div>
        ) : null}
      </Transition>
      <div ref={childRef}>{children}</div>
    </div>
  );
};
