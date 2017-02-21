Vue.component('patient', {   // eslint-disable-line no-undef
  props: ['patient', 'backend', 'wards', 'teams', 'consultants'],
  template: `<div>
  <div class="patient">
    <div class="row">
      <div class="col-md-2" id="PatientDetails">
        
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">Name</span>
              <input type="text" v-model="patient.name" class="form-control" id="patman-" placeholder="Name" aria-describedby="sizing-addon3">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span class="input-group-addon" id="sizing-addon3">D.O.B</span>
              <input type="text" v-model="patient.dob" class="form-control" id="patman-" placeholder="DOB" aria-describedby="sizing-addon3">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">UID :</span>
              <input type="text" v-model="patient.uid" class="form-control" id="patman-" placeholder="Hospital ID" aria-describedby="sizing-addon3">
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">Adm :</span>
              <input type="text" v-model="patient.adm_date" class="form-control" id="patman-" placeholder="Admission Date" aria-describedby="sizing-addon3">
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
              <input type="text" v-model="patient.bed" class="form-control" id="patman-" placeholder="Bed" aria-describedby="sizing-addon3">
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
      <div class="col-md-3" id="Diagnosis-Present-Past">
        <div class="row" id="Diagnosis">
          <div class="col-md-12">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">Dx </span>
              <input type="text" v-model="patient.problem" class="form-control" id="patman-" placeholder="Diagnosis/Problem"" aria-describedby="sizing-addon3">
            </div>
          </div>
        </div>
        <div class="row" id="PresentHistory">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">Details</span>
              <textarea v-model="patient.details" class="form-control custom-control input-sm" rows="5" aria-describedby="sizing-addon3"></textarea>
              
            </div>
            
          </div>
        </div>
        <div class="row" id="PastHistory">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">PMH</span>
              <textarea v-model="patient.past_medical_history" class="form-control custom-control input-sm" rows="3" id="patman-" placeholder="PastHistory" aria-describedby="sizing-addon3"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4" id="Treatment-TreatDate-Tests">
        <div class="row" id="Treatment">
          <div class="col-md-8">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">Rx </span>
              <input type="text" v-model="patient.treatment" class="form-control" id="patman-" placeholder="Treatment" aria-describedby="sizing-addon3">
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-group input-group-sm">
              <span  class="input-group-addon" id="sizing-addon3">Dt </span>
              <input type="text" v-model="patient.treatment_date" class="form-control" id="patman-" placeholder="Rx Date" aria-describedby="sizing-addon3">
            </div>
          </div>
        </div>
        
        <div class="row" id="Tests">
          <div class="col-md-12" >
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">Tests</span>
              <textarea v-model="patient.tests" class="form-control custom-control input-sm textarea-tests" rows="8" id="patman-" placeholder="Tests" aria-describedby="sizing-addon3"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3" id="Jobs-AdverseEvents">
        <div class="row" id="Jobs">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">Jobs</span>
              <textarea v-model="patient.jobs" class="form-control custom-control input-sm textarea-jobs" rows="6" id="patman-" placeholder="Jobs"  aria-describedby="sizing-addon3"></textarea>
            </div>
          </div>
        </div>
        
        <div class="row" id="Adverse Events">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm"  id="sizing-addon3">AE</span>
              <input type="text" v-model="patient.adverse_events" class="form-control custom-control input-sm" id="patman-" placeholder="Adverse Events">
            </div>
          </div>
        </div>
        
        <div class="row" id="Update-Discharge">
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-addon input-sm">
                <input type="checkbox"  class="form-control input-sm" name="is_discharged" aria_label="Discharged" v-model="patient.is_discharged">
              </span>
              
              <input type="text" class="form-control input-sm" aria-label="Discharged" v-model="patient.dis_date">
              <span class="input-group-btn">
                <button type="button" class="btn btn-default btn-sm" disabled="disabled">Discharge</button>
                <button type="button" class="btn btn-warning btn-sm" v-on:click.prevent="cancelClick">
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
    }
  },
});