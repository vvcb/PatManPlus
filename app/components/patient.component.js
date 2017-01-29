Vue.component('patient', {
props: ['item'],
template: `<div>
  <div class="row">
    <div class="col-md-2">
      <div class="row">
        <div class="col-md-6">
          <input type="text" v-model="item.wAR" class="form-control" id="patman-" placeholder="Ward">
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
        <input type="text" v-model="item.consultant" class="form-control" id="patman-" placeholder="Cons">
      </div>
    </div>
    </div>
    <div class="col-md-4" id="Diagnosis-Present-Past">
      
    </div>

    <div class="col-md-4" id="Treatment-TreatDate-Tests">
      
    </div>

  <div class="col-md-4" id="Jobs-AdverseEvents">
      
    </div>
    <div class="col-xs-6 col-md-4">
      <label for="patman-">Problem</label>
      <input type="text" v-model="item.problem" class="form-control" id="patman-" placeholder="Email">
    </div>
    
    <div class="col-xs-6 col-md-3">
      <label for="patman-">Treatment</label>
      <input type="text" v-model="item.treatment" class="form-control" id="patman-" placeholder="Email">
    </div>
    
    <div class="col-xs-3 col-md-2">
      <label for="patman-">Op date</label>
      <input type="text" class="form-control" id="patman-" placeholder="Email">
    </div>
    
  </div>
  
  <div class="row">
    
   
    
    <div class="col-xs-6 col-md-4">
      <label for="patman-">Details</label>
      <input type="text" v-model="item.details" class="form-control" id="patman-" placeholder="Email">
    </div>
    
    <div class="col-xs-6 col-md-3">
      <label for="patman-">Test results</label>
      <input type="text" v-model="item.tests" class="form-control" id="patman-" placeholder="Email">
    </div>
    
    <div class="col-xs-6 col-md-3">
      <label for="patman-">Jobs</label>
      <input type="text" v-model="item.jobs" class="form-control" id="patman-" placeholder="Email">
    </div>
    
  </div>
  
  
  <div class="row">
    
    <div class="col-xs-3 col-md-2">
      <label for="patman-">Admitted</label>
      <input type="text" v-model="item.adm_date" class="form-control" id="patman-" placeholder="Email">
    </div>
    
    <div class="col-xs-6 col-md-4">
      <label for="patman-">PMH</label>
      <input type="text" v-model="item.past_medical_history" class="form-control" id="patman-" placeholder="Email">
    </div>
    
    <div class="col-xs-6 col-md-3">
      <label for="patman-">Adverse Events</label>
      <input type="text" v-model="item.adverse_events" class="form-control" id="patman-" placeholder="Email">
    </div>
    
    <div class="col-xs-6 col-md-2">
      <label>
        <input type="checkbox"> Check me out
      </label>
    </div>
    
  </div>
  <div>
    <button v-on:click="updateClick">Update</button>
  </div>
</div>
`,
methods: {
updateClick: function () {
this.$emit('update-click', this.item);
}
},
});