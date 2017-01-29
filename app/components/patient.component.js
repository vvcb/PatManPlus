Vue.component('patient', {
props: ['item'],
template: `<div>

<div class="patient">

<div class="row">
<div class="col-md-2" id="PatientDetails">
      <div class="row">
        <div class="col-md-6">
          <input type="text" v-model="item.war" class="form-control" id="patman-" placeholder="Ward">
        </div>
        <div class="col-md-6">
          <input type="text" v-model="item.bed" class="form-control" id="patman-" placeholder="Bed">
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <input type="text" v-model="item.name" class="form-control" id="patman-" placeholder="Name">
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-12">
          <input type="text" v-model="item.dob" class="form-control" id="patman-" placeholder="DOB">
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <input type="text" v-model="item.uid" class="form-control" id="patman-" placeholder="Patient ID">
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <input type="text" v-model="item.team" class="form-control" id="patman-" placeholder="Team">
        </div>
        <div class="col-md-6">
          <input type="text" v-model="item.consultant" class="form-control" id="patman-" placeholder="Consultant">
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <input type="text" v-model="item.adm_date" class="form-control" id="patman-" placeholder="Admission Date">
        </div>
      </div>
      <div class="row">
      <div class="col-md-12">
        <label>
          <input type="checkbox" v-model="item.is_discharged">Discharged
        </label>
      </div>      
    </div>
</div>

<div class="col-md-4" id="Diagnosis-Present-Past">
  <div class="row" id="Diagnosis">
    <div class="col-md-12">
      <input type="text" v-model="item.problem" class="form-control" id="patman-" placeholder="Diagnosis/Problem">
    </div>
  </div>
  
  <div class="row" id="PresentHistory">
    <div class="col-md-12">
      <input type="text" v-model="item.details" class="form-control" id="patman-" placeholder="PresentHistory">
    </div>
  </div>
  
  <div class="row" id="PastHistory">
    <div class="col-md-12">
      <input type="text" v-model="item.past_medical_history" class="form-control" id="patman-" placeholder="PastHistory">
    </div>
  </div>
</div>
      
<div class="col-md-3" id="Treatment-TreatDate-Tests">
  <div class="row" id="Treatment">
    <div class="col-md-8">
      <input type="text" v-model="item.treatment" class="form-control" id="patman-" placeholder="Treatment">
    </div>
    <div class="col-md-4">
      <input type="text" v-model="item.treatment_date" class="form-control" id="patman-" placeholder="Rx Date">
    </div>
  </div>
  
  <div class="row" id="Tests">
    <div class="col-md-12">
      <input type="text" v-model="item.tests" class="form-control" id="patman-" placeholder="Tests">
      </div>
    </div>
  </div>
        
  <div class="col-md-3" id="Jobs-AdverseEvents">
    <div class="row" id="Jobs">
      <div class="col-md-12">
        <input type="text" v-model="item.jobs" class="form-control" id="patman-" placeholder="Jobs">
      </div>
    </div>
    
    <div class="row" id="Adverse Events">
      <div class="col-md-12">
        <input type="text" v-model="item.adverse_events" class="form-control" id="patman-" placeholder="Adverse Events">
      </div>
    </div>
  </div>        
</div>
      
      <button v-on:click="updateClick">Update</button>
    </div>
  </div>
    </div>
  `,
  methods: {
  updateClick: function () {
  this.$emit('update-click', this.item);
  }
  },
  });