Vue.component('add-patient', {   // eslint-disable-line no-undef
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
  template: `<div class="panel panel-default">
  <div class="panel-heading">
    <h4 class="panel-title" @click="togglePanel">
    <span class="glyphicon glyphicon-plus-sign"></span>
    Add Patient
    </h4>
  </div>
  <div class="panel-body" id="new-patient-panel" style="display:none">
    <div class="row">
      <div class="col-md-2" id="new-patient-details">
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Name</span>
              <input type="text" v-model="patient.name" class="form-control" id="new-patient-name" placeholder="Name">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">DOB</span>
              <datepicker v-bind:instance="patient" v-bind:name="'date_of_birth'"></datepicker>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">UID</span>
              <input type="text" v-model="patient.uid" class="form-control" id="new-patient-bed" placeholder="UID">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Adm</span>
              <datepicker v-bind:instance="patient" v-bind:name="'admission_date'"></datepicker>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-7">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Ward</span>
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
              <span class="input-group-addon" id="sizing-addon3">Bed</span>
              <input type="text" v-model="patient.bed" class="form-control" id="new-patient-bed" placeholder="Bed">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-7">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Team</span>
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
              <span class="input-group-addon" id="sizing-addon3">Cons</span>
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
      <div class="col-md-3" id="diagnosis-present-past">
        
        <div class="row" id="diagnosis">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">Dx </span>
              <input type="text" v-model="patient.problem" class="form-control" id="patman-" placeholder="Diagnosis/Problem" aria-describedby="sizing-addon3">
            </div>
          </div>
        </div>
        
        <div class="row" id="present-history">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">Details</span>
              <textarea v-model="patient.details" class="form-control custom-control input-sm" rows="5" aria-describedby="sizing-addon3"></textarea>
              <div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row" id="past-history">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">PMH</span>
              <textarea v-model="patient.past_medical_history" class="form-control custom-control input-sm" rows="3" id="patman-" placeholder="PastHistory" aria-describedby="sizing-addon3"></textarea>
            </div>
          </div>
        </div>
      
      </div>
      
      <div class="col-md-4" id="treatment-treatdate-tests">
      
        <div class="row" id="treatment-treatdate">
          <div class="col-md-8">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">Rx </span>
              <input type="text" v-model="patient.treatment" class="form-control" id="patman-" placeholder="Treatment" aria-describedby="sizing-addon3">
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">Dt </span>
              <datepicker v-bind:instance="patient" v-bind:name="'treatment_date'"></datepicker>
            </div>
          </div>
        </div>
        
        <div class="row" id="tests">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">Tests</span>
              <textarea v-model="patient.tests" class="form-control custom-control input-sm textarea-tests" rows="8" id="patman-" placeholder="Tests" aria-describedby="sizing-addon3"></textarea>
            </div>
          </div>
        </div>
      
      </div>
      
      <div class="col-md-3" id="jobs-adverse-events-buttons">
        
        <div class="row" id="jobs">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">Jobs</span>
              <textarea v-model="patient.jobs" class="form-control custom-control input-sm textarea-jobs" rows="6" id="patman-" placeholder="Jobs"  aria-describedby="sizing-addon3"></textarea>
            </div>
          </div>
        </div>
  
        <div class="row" id="adverse-events">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">AE</span>
              <input type="text" v-model="patient.adverse_events" class="form-control custom-control input-sm" id="patman-" placeholder="Adverse Events">
            </div>
          </div>
        </div>

        <div class="row" id="discharge-save">
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
</div>
`,
  methods: {
    togglePanel () {
      $('#new-patient-panel').toggle();
    },
    addPatient() {
      this.backend.patients.insert(this.patient).then((patient) => {
        $('#new-patient-panel').toggle();
        this.patient = {};
        this.$emit('patient-created', patient);
      });
    }
  },
});

