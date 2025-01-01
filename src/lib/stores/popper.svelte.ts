import type { Component } from 'svelte';

export const referenceState: { reference: HTMLElement | undefined } = $state({ reference: undefined });

export const popperState: { visible: boolean, component: Component<any> | null, props: object } = $state({ visible: false, component: null, props: {} });

export const showPopper = <T extends Record<string, any>>(reference: HTMLElement, component: Component<T>, props: T) => {
	referenceState.reference = reference;
	popperState.visible = true;
	popperState.component = component;
	popperState.props = props;
};

export const hidePopper = () => {
	popperState.visible = false;
	popperState.component = null;
	popperState.props = {};
	referenceState.reference = undefined;
};