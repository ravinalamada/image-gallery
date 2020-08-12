console.log("let's code our gallery!");

function Gallery(gallery) {
  if(!gallery) {
    throw Error('No Gallery found!!!');
  }

  // Select the element we need
  const images = Array.from(gallery.querySelectorAll('img'));
  console.log(images);
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function openModal() {
    console.info('opening modal');
    if(modal.matches('.open')) {
      console.info('modal already open');
      return;// Stop the funct from running
    }
    modal.classList.add('open');

    // event listner when we open the modal
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal () {
    modal.classList.remove('open');

    // Clear the event listeners
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function handleClickOutside(e) {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  }

  function handleKeyUp (e) {
    if(e.key === 'Escape') return closeModal();
    if(e.key === 'ArrowLeft') return showPrevImage();
    if(e.key === 'ArrowRight') return showNextImage();
  }

  function showImage(el) {
    // safety check
    if(!el) {
      console.info("no image to show");
      return;
    }
    // upadate this modal with this info
    console.log(el);
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    // store a reference of the data
    currentImage = el;
    openModal();
  }

  images.forEach(image => {
    image.addEventListener('click', e => showImage(e.currentTarget));
  });

  //loop through the image
  images.forEach(image => {
    image.addEventListener('keyup', e => {
      // attache an event listener for each
      if(e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    });
  });
  modal.addEventListener('click', handleClickOutside);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
const gallery3 = Gallery(document.querySelector('.gallery3'));

