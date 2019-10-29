'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_PREWIEW_IMG = 'img/muffin-grey.svg';

  var form = window.form.adForm;
  var avatarChooser = form.querySelector('.ad-form__field input[name=avatar]');
  var avatarPreview = form.querySelector('.ad-form-header__preview img');
  var housingPhotoChooser = form.querySelector('.ad-form__upload input[name=images]');
  var emptyPhoto = form.querySelector('.ad-form__photo');
  var upload = form.querySelector('.ad-form__upload');

  var setUploadImgCallback = function (fileChooser, preview, setOrCreate) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];

      if (file) {
        var fileName = file.name.toLowerCase();
        var isImage = FILE_TYPES.some(function (current) {
          return fileName.endsWith(current);
        });

        if (isImage) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            switch (true) {
              case setOrCreate === 'set' :
                preview.src = reader.result;
                break;
              case setOrCreate === 'create' :
                var photoWrapper = preview.cloneNode();

                photoWrapper.style.backgroundImage = 'url(\'' + reader.result + '\')';
                upload.insertAdjacentElement('afterend', photoWrapper);
                preview.remove();
                break;
            }
          });

          reader.readAsDataURL(file);
        }
      }
    });
  };

  var resetImages = function () {
    var photos = form.querySelectorAll('.ad-form__photo');

    avatarPreview.src = AVATAR_PREWIEW_IMG;

    photos.forEach(function (currentPhoto) {
      currentPhoto.remove();
    });

    upload.insertAdjacentElement('afterend', emptyPhoto);
  };

  setUploadImgCallback(avatarChooser, avatarPreview, 'set');
  setUploadImgCallback(housingPhotoChooser, emptyPhoto, 'create');

  window.uploadImages = {
    resetImages: resetImages
  };
})();
