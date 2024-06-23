import { type Component, type JSX, splitProps } from 'solid-js';

import './RGB.css';

export type RGBProps = JSX.IntrinsicElements['span'] & {
  color: string;
};

export const RGB: Component<RGBProps> = (props) => (
  <span
    {...splitProps(props, ['class'])[0]}
    class={['rgb', props.class].filter(Boolean).join(' ')}
  >
    <i class="rgb__icon" style={{ 'background-color': props.color }}/>
    {props.color}
  </span>
);
