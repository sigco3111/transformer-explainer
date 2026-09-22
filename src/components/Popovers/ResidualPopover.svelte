<script lang="ts">
	import type { PopoverProps } from 'flowbite-svelte/Popover.svelte';
	import CommonPopover from './CommonPopover.svelte';

	export let offset: PopoverProps['offset'] = undefined;
	export let className: PopoverProps['class'] = undefined;
	export let triggeredBy: PopoverProps['triggeredBy'] = undefined;
	export let trigger: PopoverProps['trigger'] = undefined;
	export let placement: PopoverProps['placement'] = undefined;
	export let reference: PopoverProps['reference'];
</script>

<CommonPopover
	className="residual-popover"
	title="잔차 연결(Residual Connection)"
	{offset}
	{triggeredBy}
	{trigger}
	{placement}
	{reference}
	goTo="article-residual"
>
	<div class="residual-content">
		계층의 입력을 출력에 더해 정보 손실을 막습니다.
	</div></CommonPopover
>

<style lang="scss">
	.residual-content {
		width: 12rem;
	}
</style>
