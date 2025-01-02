import { ToastType } from '$lib/interfaces';

export const toastState: { text: string, visible: boolean, type: ToastType } = $state({ text: '', visible: false, type: ToastType.info });