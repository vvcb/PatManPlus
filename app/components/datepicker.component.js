/*global moment */

Vue.component('datepicker', {   // eslint-disable-line no-undef
  props: ['instance', 'name'],
  template: `<input type="text" v-text="moment(instance[name]).format('DD-MM-YYYY')" readonly="readonly" class="form-control datepicker" aria-describedby="sizing-addon3">
`,
  mounted() {
    const component = this;
    $(this.$el).datepicker({
      format: 'dd-mm-yyyy',
      daysOfWeekHighlighted: [0,6],
      todayBtn: 'linked',
      todayHighlight: true,
      weekStart: 1,
    }).on('changeDate', function(e) {
      component.instance[component.name] = moment($(e.target).val(), 'DD-MM-YYYY').toDate();
    });
    const value = component.instance[component.name];
    if (value)
      $(component.$el).val(moment(value).format('DD-MM-YYYY'));
  }
});
