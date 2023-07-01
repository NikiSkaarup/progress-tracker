<script lang="ts">
	export let id: string;
	export let begin: string;
	export let dur: string | number = 0.8;
	export let repeatCount: string | number = 1;
	export let seed: string | number = 0;
	export let scale: string | number = 0;
	export let seeds: string = '0;200;0';
	export let scales: string = '0;20;0';
	export let baseFrequency: string = '0.7,0.8';
</script>

<svg class="pointer-events-none absolute -left-full -top-full h-0 w-0 overflow-hidden opacity-0">
	<defs>
		<filter {id}>
			<feTurbulence type="fractalNoise" {baseFrequency} {seed}>
				<animate attributeName="seed" values={seeds} {dur} {repeatCount} {begin} />
			</feTurbulence>
			<feDisplacementMap in="SourceGraphic" in2="warp" {scale}>
				<animate attributeName="scale" values={scales} {dur} {repeatCount} {begin} />
			</feDisplacementMap>
		</filter>
	</defs>
</svg>
