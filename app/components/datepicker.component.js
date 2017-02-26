/*global moment */

Vue.component('datepicker', {   // eslint-disable-line no-undef
  props: ['instance', 'name'],
  template: `<input type="text" readonly="readonly" class="form-control datepicker" aria-describedby="sizing-addon3">
`,
  methods: {
    currentDate() {
      const value = this.instance[this.name];
      return value ? moment(value).format('DD-MM-YYYY') : '';
    }
  },
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
    }).val(this.currentDate());

    $(this.$el).blur(function () {
      $(this).val(component.currentDate());
    });
  },
  updated() {
    $(this.$el).val(this.currentDate());
  }
});
