function remoteRequire(module) {
  return require('electron').remote.require(module);
}

$(() => {
  // example communication between main and render process
  const { getFile } = remoteRequire('./app/getFile');
  $('#primary').click(() => {
    console.log(getFile);
    getFile('yarn.lock').then((c) => console.log(c));
  });
  var app7 = new Vue({
      el: '#app-7',
      data: {
          groceryList: [
              { text: 'Vegetables' },
              { text: 'Cheese' },
              { text: 'Whatever else humans are supposed to eat' }
          ]
      }
   });
});
