/*global moment */

Vue.component('patient-print', {   // eslint-disable-line no-undef
  props: ['patient', 'backend', 'wards', 'teams', 'consultants'],
  template: `<form>
  <div class="patient">
    <div class="row">
      <div class="col-md-3">        
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span>D.O.B: </span>
              <span v-text="formatDate(patient.date_of_birth)">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span>UID: </span>
              <span v-text="patient.uid">
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">Adm :</span>
              <datepicker v-bind:instance="patient" v-bind:name="'admission_date'" ref="admission_date"></datepicker>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>
`,
  mounted() {
    const options = {
      errorsContainer: function(ParsleyField) {
        return ParsleyField.$element.attr('title');
      },
      errorsWrapper: false
    };

    this.validator = $(this.$el).parsley(options);
    this.validator.on('form:success', () => {
      this.backend.patients.update(this.patient).then(() => {
        this.$emit('patient-updated', this.patient);
      });
    });
    this.validator.on('field:error', function(fieldInstance) {
      const messages = this.getErrorsMessages(fieldInstance);
      fieldInstance.$element.tooltip('destroy');
      fieldInstance.$element.tooltip({
        animation: false,
        container: 'body',
        placement: 'top',
        title: messages
      });
    });

    this.validator.on('field:success', function(fieldInstance) {
      fieldInstance.$element.tooltip('destroy');
    });
  },
  methods: {
    updateClick() {
      this.validator.validate();
    },
    reloadClick() {
      this.backend.patients.reload(this.patient).then(() => {
        this.$forceUpdate();
        for (const key in this.$refs)
          this.$refs[key].$forceUpdate();
        this.$emit('patient-reloaded', this.patient);
      });
    },
    formatDate(value) {
      return value ? moment(value).format('DD-MM-YYYY') : null;
    }
  }
});