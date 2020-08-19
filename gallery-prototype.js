console.log("let's code our gallery!");

function Gallery(gallery) {
  if(!gallery) {
    throw Error('No Gallery found!!!');
  }
  this.gallery = gallery;
  // Select the element we need
  this.images = Array.from(gallery.querySelectorAll('img'));
  console.log(this.images);
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');
  // let currentImage;
  this.images.forEach(image => {
    image.addEventListener('click', e => this.showImage(e.currentTarget));
  });

  // bind our methods to the instance for
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);
  //loop through the image
  this.images.forEach(image => {
    image.addEventListener('keyup', e => {
      // attache an event listener for each
      if(e.key === 'Enter') {
        this.showImage(e.currentTarget);
      }
    });
  });
  this.modal.addEventListener('click', this.handleClickOutside);
}

 Gallery.prototype.openModal = function() {
  console.info('opening modal');
  if(this.modal.matches('.open')) {
    console.info('modal already open');
    return;// Stop the funct from running
  }
  this.modal.classList.add('open');

  // event listner when we open the modal
  window.addEventListener('keyup', this.handleKeyUp);
  this.modal.addEventListener('click', this.handleClickOutside);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
}

Gallery.prototype.closeModal = function() {
  this.modal.classList.remove('open');

  // Clear the event listeners
  window.removeEventListener('keyup', this.handleKeyUp);
  this.modal.addEventListener('click', this.handleClickOutside);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
}

Gallery.prototype.showNextImage = function() {
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild);
}

Gallery.prototype.showPrevImage = function() {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild);
}

Gallery.prototype.handleClickOutside = function(e) {
  if (e.currentTarget === e.target) {
    this.closeModal();
  }
}

Gallery.prototype.handleKeyUp = function(e) {
  if(e.key === 'Escape') return this.closeModal();
  if(e.key === 'ArrowLeft') return this.showPrevImage();
  if(e.key === 'ArrowRight') return this.showNextImage();
}

Gallery.prototype.showImage = function(el) {
  // safety check
  if(!el) {
    console.info("no image to show");
    return;
  }
  // upadate this modal with this info
  console.log(el);
  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('h2').textContent = el.title;
  this.modal.querySelector('figure p').textContent = el.dataset.description;
  // store a reference of the data
  this.currentImage = el;
  this.openModal();
}

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
const gallery3 = new Gallery(document.querySelector('.gallery3'));

console.log(gallery1, gallery2, gallery3);
