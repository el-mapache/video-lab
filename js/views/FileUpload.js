var FileUpload = VL.View.extend({
  //inline, whatever
  template: '<img src='' id="image-preview" height="150" width="150"/>' +
            '<input type="file" id="file-upload" accept="image/gif, image/jpeg, image/png"/>',
  
  events: {
    '#file-upload change': 'handleImageUpload' 
  },

  render: function() {
    this.el.innerHTML = doT.compile(this.template)(this.model.data());
    return this;
  },

  handleImageUpload: function(event) {
    var file = event.currentTarget.files[0];
    var currentFile;

    if (file) {
      currentFile = file;
      reader.readAsDataURL(file);
    }
  }
});

