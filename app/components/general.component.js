Vue.component('general', {   // eslint-disable-line no-undef
  props: ['settings'],
  template: `<div>
  <div class="row">
    <label for="databaseLocation" class="col-sm-3 col-form-label">Database Location</label>
    <div class="col-sm-7">
      <input type="email" v-model="settings.dbFilePath" class="form-control" name="databaseLocation">
    </div>
    <button type="button" class="btn btn-success btn-sm" v-on:click.prevent="changeClick">
      <span class="glyphicon glyphicon-plus"></span> Change
    </button>
  </div>
</div>
`,
  methods: {
    changeClick() {
      this.$emit('update-click');
    }
  },
});