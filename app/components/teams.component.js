Vue.component('teams', {   // eslint-disable-line no-undef
  props: ['presenter'],
  template: `<div>
  <table class="table table-condensed">
    <thead>
      <tr>
        <th>Code</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in presenter.teams" v-bind:item="item">
        <td>
          <input type="text" v-model="item.code">
        </td>
        <td>
          <input type="text" v-model="item.name">
        </td>
        <td>
          <div v-if="index != 0" class="glyphicon glyphicon-arrow-up" v-on:click.prevent="presenter.changeOrderUpClick(item)"></div>
          <div v-if="index != (presenter.teams.length - 1)" class="glyphicon glyphicon-arrow-down" v-on:click.prevent="presenter.changeOrderDownClick(item)"></div>
        </td>
        <td>
          <button type="button" class="btn btn-success btn-sm" v-on:click.prevent="saveClick(item)">
            <span class="glyphicon glyphicon-floppy-disk"></span> Save
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <button type="button" class="btn btn-success btn-sm" v-on:click.prevent="addClick">
    <span class="glyphicon glyphicon-plus"></span> Add
  </button>
</div>
`,
  methods: {
    saveClick: function (item) {
      item.save ? this.presenter.update(item) : this.presenter.create(item);
    },
    addClick: function () {
      this.presenter.teams.push({});
    }
  },
});

