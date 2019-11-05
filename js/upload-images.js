'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_PREVIEW_IMG = 'img/muffin-grey.svg';

  var form = window.form.adProfile;
  var avatarChooser = form.querySelector('.ad-form__field input[name=avatar]');
  var avatarPreview = form.querySelector('.ad-form-header__preview img');
  var housingPhotoChooser = form.querySelector('.ad-form__upload input[name=images]');
  var emptyPhoto = form.querySelector('.ad-form__photo');
  var upload = form.querySelector('.ad-form__upload');

  var createImage = function (preview, reader) {
    var photoWrapper = preview.cloneNode();

    photoWrapper.style.backgroundImage = 'url(\'' + reader.result + '\')';
    upload.insertAdjacentElement('afterend', photoWrapper);
    preview.remove();
  };

  var readFile = function (preview, setOrCreate, file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      if (setOrCreate === 'set') {
        preview.src = reader.result;
      } else {
        createImage(preview, reader);
      }
    });

    reader.readAsDataURL(file);
  };

  var setUploadImgCallback = function (fileChooser, preview, setOrCreate) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];

      if (file) {
        var fileName = file.name.toLowerCase();
        var isImage = FILE_TYPES.some(function (current) {
          return fileName.endsWith(current);
        });

        if (isImage) {
          readFile(preview, setOrCreate, file);
        }
      }
    });
  };

  var resetImages = function () {
    var photos = Array.from(form.querySelectorAll('.ad-form__photo'));

    avatarPreview.src = AVATAR_PREVIEW_IMG;

    photos.forEach(function (currentPhoto) {
      currentPhoto.remove();
    });

    upload.insertAdjacentElement('afterend', emptyPhoto);
  };

  setUploadImgCallback(avatarChooser, avatarPreview, 'set');
  setUploadImgCallback(housingPhotoChooser, emptyPhoto, 'create');

  window.uploadImages = {
    resetPictures: resetImages
  };
})();
