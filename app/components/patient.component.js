Vue.component('patient', {
  props: ['item'],
  template: `<div>
  <div class="row">
  
    <div class="col-xs-3 col-md-1">
      <label for="exampleInputEmail1">Ward</label>
      <input type="email" v-model="item.wAR" class="form-control" id="exampleInputEmail1" placeholder="Email">
    </div>
    
    <div class="col-xs-3 col-md-1">
      <label for="exampleInputEmail1">Bed</label>
      <input type="email" v-model="item.name" class="form-control" id="exampleInputEmail1" placeholder="Email">
    </div>	
  
    <div class="col-xs-6 col-md-4">
      <label for="exampleInputEmail1">Problem</label>
      <input type="email" v-model="item.problem" class="form-control" id="exampleInputEmail1" placeholder="Email">  
    </div>
  
    <div class="col-xs-6 col-md-3">	  
        <label for="exampleInputEmail1">Treatment</label>
      <input type="email" v-model="item.treatment" class="form-control" id="exampleInputEmail1" placeholder="Email">  
    </div>
  
    <div class="col-xs-3 col-md-2">
      <label for="exampleInputEmail1">Op date</label>
      <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">  
    </div>
  
  </div>
  
  <div class="row">
  
    <div class="col-xs-6 col-md-2">
      <label for="exampleInputEmail1">Name</label>
      <input type="email" v-model="item.name" class="form-control" id="exampleInputEmail1" placeholder="Email">
      
      <div class="row">
            <div class="col-xs-12 col-sm-12">
            <label for="exampleInputEmail1">DOB</label>
              <input type="email" v-model="item.dob" class="form-control" id="exampleInputEmail1" placeholder="Email">
            </div>
       </div>
       
       <div class="row">
            <div class="col-xs-12 col-sm-12">
            <label for="exampleInputEmail1">HOSP #</label>
              <input type="email" v-model="item.uid" class="form-control" id="exampleInputEmail1" placeholder="Email">
            </div>
       </div> 
       
       <div class="row">
            <div class="col-xs-6 col-sm-6">
            <label for="exampleInputEmail1">TEAM</label>
              <input type="email" v-model="item.team" class="form-control" id="exampleInputEmail1" placeholder="Email">
            </div>
            
            <div class="col-xs-6 col-sm-6">
            <label for="exampleInputEmail1">COMS</label>
              <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
            </div>
       </div> 	      
      
    </div>	
  
    <div class="col-xs-6 col-md-4">
      <label for="exampleInputEmail1">Details</label>
      <input type="email" v-model="item.details" class="form-control" id="exampleInputEmail1" placeholder="Email">  
    </div>
  
    <div class="col-xs-6 col-md-3">	  
        <label for="exampleInputEmail1">Test results</label>
      <input type="email" v-model="item.tests" class="form-control" id="exampleInputEmail1" placeholder="Email">  
    </div>
  
    <div class="col-xs-6 col-md-3">
      <label for="exampleInputEmail1">Jobs</label>
      <input type="email" v-model="item.jobs" class="form-control" id="exampleInputEmail1" placeholder="Email">  
    </div>
  
  </div>
  
  
  <div class="row">
  
    <div class="col-xs-3 col-md-2">
      <label for="exampleInputEmail1">Admitted</label>
      <input type="email" v-model="item.adm_date" class="form-control" id="exampleInputEmail1" placeholder="Email">
    </div>	
    
    <div class="col-xs-6 col-md-4">
      <label for="exampleInputEmail1">PMH</label>
      <input type="email" v-model="item.past_medical_history" class="form-control" id="exampleInputEmail1" placeholder="Email">
    </div>	
    
    <div class="col-xs-6 col-md-3">
      <label for="exampleInputEmail1">Adverse Events</label>
      <input type="email" v-model="item.adverse_events" class="form-control" id="exampleInputEmail1" placeholder="Email">
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
      this.$emit('test');
    }
  },
});