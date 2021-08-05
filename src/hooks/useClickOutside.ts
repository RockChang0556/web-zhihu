/*
 * @Author: Peng zhang
 * @Date: 2021-02-01 11:42:16
 * @LastEditTime: 2021-02-01 11:55:22
 * @Description:
 */

import { ref, Ref, onMounted, onUnmounted } from 'vue';

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
	const isClickOutside = ref(false);

	const handle = (e: MouseEvent) => {
		if (elementRef.value) {
			isClickOutside.value = !elementRef.value.contains(
				e.target as HTMLElement
			);
		}
	};

	onMounted(() => {
		document.addEventListener('click', handle);
	});
	onUnmounted(() => {
		document.removeEventListener('click', handle);
	});

	return { isClickOutside };
};

export default useClickOutside;
