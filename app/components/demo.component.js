Vue.component('demo', { // eslint-disable-line no-undef
	props: ["list"],
	template: `<div class="col-md-3">
		<div class="input-group input-group-sm">
			<span class="input-group-addon" id="sizing-addon3">Search Patient: Id </span>
			<input @keyup="search" type="text" v-model="list.uid" class="form-control" placeholder="Hospital Number" aria-describedby="sizing-addon3">
		</div>
	</div>`
});