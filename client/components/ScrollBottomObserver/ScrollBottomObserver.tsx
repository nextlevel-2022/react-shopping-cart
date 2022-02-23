// eslint-disable-next-line import/named
import { debounce } from 'lodash';
import { useEffect } from 'react';

interface Props {
  workToDoWhenArrivedBottom: () => void;
  msToDelay?: number;
  isLastPage: boolean;
}

const ScrollBottomObserver = ({ workToDoWhenArrivedBottom, msToDelay = 100 }: Props) => {
  const returnIsBottom = (): boolean => {
    const { innerHeight } = window;
    const {
      body: { scrollHeight },
      documentElement: { scrollTop },
    } = document;

    return Math.round(scrollTop + innerHeight) >= scrollHeight;
  };

  const debouncedOnScroll = debounce(() => {
    if (returnIsBottom()) {
      workToDoWhenArrivedBottom();
    }
  }, msToDelay);

  useEffect(() => {
    window.addEventListener('scroll', debouncedOnScroll);
  }, [debouncedOnScroll]);

  return <></>;
};

export default ScrollBottomObserver;
