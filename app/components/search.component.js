Vue.component('search', {   // eslint-disable-line no-undef
  props: ['criteria', 'wards', 'consultants', 'teams'],
  template: `<div class="panel panel-default">
  <div class="panel-heading">
    <h4 class="panel-title" @click="toggleFilter">
      <span class="glyphicon glyphicon-plus-sign"></span>
      Search
    </h4>
  </div>
  <div class="panel-body" id="filters-panel" style="display:none">
    <div class="row" id="SearchPanel"><!---Open Row Search Panel -->
      <div class="col-md-2">
        <h4 @click="toggleFilter">
        <span class="glyphicon glyphicon-search"></span>
        Search
        </h4>
      </div>
      <div class="col-md-10">
        <div class="row"><!---Open Row ID-Name-Discharged -->
          <div class="col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Id: </span>
              <input @keyup="search" type="text" v-model="criteria.uid" class="form-control" placeholder="Hospital Number" aria-describedby="sizing-addon3">
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Name: </span>
              <input @keyup="search" type="text" v-model="criteria.name" class="form-control" placeholder="Patient Name" aria-describedby="sizing-addon3">
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-group input-group-sm">
              <input type="checkbox" @click="search" id="is-discharged-checkbox" v-model="criteria.is_discharged"> Discharged
            </div>
          </div>
        </div><!---Close Row ID-Name-Discharged -->
        <div class="row"><!---Open Row Ward-Team-Cons- -->
          <div class="col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Ward: </span>
              <select class="form-control input-sm"
                @change="search" name="wards"
                v-model="criteria.filters.wardId">
                <option v-for="ward in wards"
                  v-bind:value="ward.id"
                  aria-describedby="sizing-addon3">
                  {{ ward.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Team: </span>
              <select class="form-control input-sm"  @change="search" name="team" v-model="criteria.filters.teamId">
                <option v-for="team in teams"
                  v-bind:value="team.id" aria-describedby="sizing-addon3">
                  {{ team.code }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Cons: </span>
              <select class="form-control input-sm"  @change="search" name="team" v-model="criteria.filters.consultantId">
                <option v-for="consultant in consultants"
                  v-bind:value="consultant.id" aria-describedby="sizing-addon3">
                  {{ consultant.initials }}
                </option>
              </select>
            </div>
          </div>
        </div><!---Close Row Ward-Team-Cons- -->
      </div>
    </div><!---Close Row Search Panel -->
  </div>
</div>
`,
  methods: {
    toggleFilter() {
      $('#filters-panel').toggle();
    },
    search() {
      this.$emit('search-changed');
    }
  },
});

