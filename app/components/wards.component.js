Vue.component('wards', {   // eslint-disable-line no-undef
  props: ['presenter'],
  template: `<div>
  <table class="table table-condensed">
    <thead>
      <tr>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in presenter.wards" v-bind:item="item">
        <td>
          <input type="text" v-model="item.name">
        </td>
        <td>
          <div v-if="index != 0" class="glyphicon glyphicon-arrow-up" v-on:click.prevent="presenter.changeOrderUpClick(item)"></div>
          <div v-if="index != (presenter.wards.length - 1)" class="glyphicon glyphicon-arrow-down" v-on:click.prevent="presenter.changeOrderDownClick(item)"></div>
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
    saveClick(item) {
      item.save ? this.presenter.update(item) : this.presenter.create(item);
    },
    addClick() {
      this.presenter.wards.push({});
    }
  },
});