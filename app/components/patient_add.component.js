Vue.component('patient-add', {   // eslint-disable-line no-undef
  props: {
    patient: {
      default: {}
    },
    wards: {
      type: Array
    },
    consultants: {
      type: Array
    },
    teams: {
      type: Array
    },
    backend: {
      type: Object
    }
  },
  template: `<form class="panel panel-default">
  <div class="panel-heading">
    <h4 class="panel-title" @click="togglePanel">
    <span class="glyphicon glyphicon-plus-sign"></span>
    Add Patient
    </h4>
  </div>
  <div class="panel-body" id="new-patient-panel" style="display:none">
    <div class="row">
      <div class="col-md-2">
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-addon">Name</span>
              <input type="text" v-model="patient.name" data-parsley-required="true" class="form-control" placeholder="Name">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-addon">DOB</span>
              <datepicker v-bind:instance="patient" v-bind:name="'date_of_birth'"></datepicker>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-addon">UID</span>
              <input type="text" v-model="patient.uid" data-parsley-duplicateuid data-parsley-required="true" class="form-control" placeholder="UID">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-addon">Adm</span>
              <datepicker v-bind:instance="patient" v-bind:name="'admission_date'"></datepicker>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-7">
            <div class="input-group input-group-sm">
              <span class="input-group-addon">Ward</span>
              <select class="form-control input-sm" name="wards" v-model="patient.wardId">
                <option v-for="ward in wards"
                  v-bind:value="ward.id"
                  aria-describedby="sizing-addon3">
                  {{ ward.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-5">
            <div class="input-group input-group-sm">
              <span class="input-group-addon">Bed</span>
              <input type="text" v-model="patient.bed" class="form-control" placeholder="Bed">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-7">
            <div class="input-group input-group-sm">
              <span class="input-group-addon">Team</span>
              <select class="form-control input-sm" name="team" v-model="patient.teamId">
                <option v-for="team in teams"
                  v-bind:value="team.id" aria-describedby="sizing-addon3">
                  {{ team.code }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-5">
            <div class="input-group input-group-sm">
              <span class="input-group-addon">Cons</span>
              <select class="form-control input-sm"  name="team" v-model="patient.consultantId">
                <option v-for="consultant in consultants"
                  v-bind:value="consultant.id" aria-describedby="sizing-addon3">
                  {{ consultant.initials }}
                </option>
              </select>
              </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon">Dx </span>
              <input type="text" v-model="patient.problem" class="form-control" placeholder="Diagnosis/Problem" aria-describedby="sizing-addon3">
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm">Details</span>
              <textarea v-model="patient.details" class="form-control custom-control input-sm" rows="5" aria-describedby="sizing-addon3"></textarea>
              <div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm">PMH</span>
              <textarea v-model="patient.past_medical_history" class="form-control custom-control input-sm" rows="3" placeholder="PastHistory" aria-describedby="sizing-addon3"></textarea>
            </div>
          </div>
        </div>
      
      </div>
      
      <div class="col-md-4">
      
        <div class="row">
          <div class="col-md-8">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon">Rx </span>
              <input type="text" v-model="patient.treatment" class="form-control" placeholder="Treatment" aria-describedby="sizing-addon3">
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon">Dt </span>
              <datepicker v-bind:instance="patient" v-bind:name="'treatment_date'"></datepicker>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm">Tests</span>
              <textarea v-model="patient.tests" class="form-control custom-control input-sm textarea-tests" rows="8" placeholder="Tests" aria-describedby="sizing-addon3"></textarea>
            </div>
          </div>
        </div>
      
      </div>
      
      <div class="col-md-3">
        
        <div class="row">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm">Jobs</span>
              <textarea v-model="patient.jobs" class="form-control custom-control input-sm textarea-jobs" rows="6" placeholder="Jobs"  aria-describedby="sizing-addon3"></textarea>
            </div>
          </div>
        </div>
  
        <div class="row">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm">AE</span>
              <input type="text" v-model="patient.adverse_events" class="form-control custom-control input-sm" placeholder="Adverse Events">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm">
                <input type="checkbox"  class="form-control input-sm" name="is_discharged" aria_label="Discharged" v-model="patient.is_discharged">
              </span>
              <input type="text" class="form-control input-sm" aria-label="Discharged" v-model="patient.discharge_date">
              <span class="input-group-btn">
                <button type="button" class="btn btn-default btn-sm" disabled=	"disabled">
                  Discharge
                </button>
            
                <button type="button" class="btn btn-warning btn-sm" v-on:click.prevent="cancelClick">
                  <span class="glyphicon glyphicon-repeat"></span>
                </button>
                    
                <button type="button" class="btn btn-success btn-sm" v-on:click="addPatient">
                  <span class="glyphicon glyphicon-floppy-disk"></span>
                  Save
                </button>
              </span>
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
      this.backend.patients.insert(this.patient).then((patient) => {
        $('#new-patient-panel').toggle();
        this.patient = {};
        this.$emit('patient-created', patient);
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
    togglePanel () {
      $('#new-patient-panel').toggle();
    },
    addPatient() {
      this.validator.validate();
    }
  },
});

