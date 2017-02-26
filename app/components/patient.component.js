/*global moment */

Vue.component('patient', {   // eslint-disable-line no-undef
  props: ['patient', 'backend', 'wards', 'teams', 'consultants'],
  template: `<div>
  <div class="patient">
    <div class="row">
      <div class="col-md-2">
        
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Name</span>
              <input type="text" v-model="patient.name" class="form-control" placeholder="Name" aria-describedby="sizing-addon3">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">D.O.B</span>
              <datepicker v-bind:instance="patient" v-bind:name="'date_of_birth'" ref="date_of_birth"></datepicker>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">UID :</span>
              <input type="text" v-model="patient.uid" class="form-control" placeholder="Hospital ID" aria-describedby="sizing-addon3">
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

        <div class="row">
          <div class="col-md-7">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Ward</span>
              <select class="form-control input-sm" name="wards" v-model="patient.wardId">
                <option v-for="ward in wards" v-bind:value="ward.id" aria-describedby="sizing-addon3">
                  {{ ward.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-5">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Bed</span>
              <input type="text" v-model="patient.bed" class="form-control" placeholder="Bed" aria-describedby="sizing-addon3">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-7">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Team</span>
              <select class="form-control input-sm"  name="team" v-model="patient.consultantId">
                <option v-for="consultant in consultants"
                  v-bind:value="consultant.id" aria-describedby="sizing-addon3">
                  {{ consultant.initials }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-5">
              <select class="form-control input-sm" name="team" v-model="patient.teamId">
                <option v-for="team in teams"
                  v-bind:value="team.id" aria-describedby="sizing-addon3">
                  {{ team.code }}
                </option>
              </select>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">Dx </span>
              <input type="text" v-model="patient.problem" class="form-control" placeholder="Diagnosis/Problem"" aria-describedby="sizing-addon3">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">Details</span>
              <textarea v-model="patient.details" class="form-control custom-control input-sm" rows="5" aria-describedby="sizing-addon3"></textarea>
              
            </div>
            
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">PMH</span>
              <textarea v-model="patient.past_medical_history" class="form-control custom-control input-sm" rows="3" placeholder="PastHistory" aria-describedby="sizing-addon3"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-8">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">Rx </span>
              <input type="text" v-model="patient.treatment" class="form-control" placeholder="Treatment" aria-describedby="sizing-addon3">
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">Dt </span>
              <datepicker v-bind:instance="patient" v-bind:name="'treatment_date'" ref="treatment_date"></datepicker>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-12" >
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">Tests</span>
              <textarea v-model="patient.tests" class="form-control custom-control input-sm textarea-tests" rows="8" placeholder="Tests" aria-describedby="sizing-addon3"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">Jobs</span>
              <textarea v-model="patient.jobs" class="form-control custom-control input-sm textarea-jobs" rows="6" placeholder="Jobs"  aria-describedby="sizing-addon3"></textarea>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">AE</span>
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
              
              <input type="text" class="form-control input-sm datepicker" aria-label="Discharged" readonly="readonly" v-model="formatDate(patient.discharge_date)">
              <span class="input-group-btn">
                <button type="button" class="btn btn-default btn-sm" disabled="disabled">Discharge</button>
                <button type="button" class="btn btn-warning btn-sm" v-on:click.prevent="reloadClick">
                  <span class="glyphicon glyphicon-repeat"></span>
                </button>
                <button type="button" class="btn btn-success btn-sm" v-on:click.prevent="updateClick">
                <span class="glyphicon glyphicon-floppy-disk"></span>
                Save</button>
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
    updateClick() {
      this.backend.patients.update(this.patient).then(() => {
        this.$emit('patient-updated', this.patient);
      });
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