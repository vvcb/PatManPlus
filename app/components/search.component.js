Vue.component('search-patient', {  // eslint-disable-line no-undef

template: `
<div class="row patient" id="SearchPanel">
	<!--
		<div class="col-md-2">
								<h3 @click="toggleFilters()">
								<span class="glyphicon glyphicon-search"></span>
					Search
		</div>
	-->
	<div class="col-md-3">
		<div class="input-group input-group-sm">
			<span class="input-group-addon" id="sizing-addon3">Search Patient: Id </span>
			<input @keyup="search" type="text" v-model="searchCriteria.uid" class="form-control" placeholder="Hospital Number" aria-describedby="sizing-addon3">
		</div>
	</div>
	<div class="col-md-3">
		<div class="input-group input-group-sm">
			<span class="input-group-addon" id="sizing-addon3">Name: </span>
			<input @keyup="search" type="text" v-model="searchCriteria.name" class="form-control" placeholder="Patient Name" aria-describedby="sizing-addon3">
		</div>
	</div>
	<div class="col-md-2">
		<div class="input-group input-group-sm">
			<span class="input-group-addon" id="sizing-addon3">Ward: </span>
			<select style="height: 30px;" @change="search" name="wards" v-model="searchCriteria.filters.ward">
				<option v-for="ward in searchCriteria.availableWards" v-bind:value="ward.name" aria-describedby="sizing-addon3">
					{{ ward.name }}
				</option>
			</select>
		</div>
	</div>
	<div class="col-md-2">
		<div class="input-group input-group-sm">
			<span class="input-group-addon" id="sizing-addon3">Team: </span>
			<select style="height: 30px;" @change="search" name="team" v-model="searchCriteria.filters.team">
				<option v-for="team in searchCriteria.availableTeams" v-bind:value="team.code" aria-describedby="sizing-addon3">
					{{ team.code }}
				</option>
			</select>
		</div>
	</div>
	<div class="col-md-2">
		<div class="input-group input-group-sm">
			<span class="input-group-addon" id="sizing-addon3">Cons: </span>
			<select style="height: 30px;" @change="search" name="team" v-model="searchCriteria.filters.consultant">
				<option v-for="consultant in searchCriteria.availableConsultants" v-bind:value="consultant.initials" aria-describedby="sizing-addon3">
					{{ consultant.initials }}
				</option>
			</select>
		</div>
	</div>
</div>`,
});