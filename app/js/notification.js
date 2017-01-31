const defaults = {
  'debug': false,
  'positionClass': 'toast-top-right',
  'onclick': null,
  'fadeIn': 300,
  'fadeOut': 100,
  'timeOut': 3000,
  'extendedTimeOut': 1000
};


function showToaster(message) {   // eslint-disable-line no-unused-vars
  toastr.options = defaults;      // eslint-disable-line no-undef
  toastr.success(message);        // eslint-disable-line no-undef
}
