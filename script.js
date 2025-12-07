
const burger = document.getElementById("burgerBtn");
const navList = document.getElementById("navList");

burger.addEventListener("click", () => {
  navList.classList.toggle("open");
  burger.classList.toggle("active");
});


document.querySelectorAll(".nav-list a").forEach(link => {
  link.addEventListener("click", () => {
    navList.classList.remove("open");
    burger.classList.remove("active");
  });
});


const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const nftForm = document.getElementById("nftForm");
const successMessage = document.getElementById("successMessage");
const loadingSpinner = document.getElementById("loadingSpinner");


const nftNameInput = document.getElementById("nftName");
const nftDescriptionInput = document.getElementById("nftDescription");
const nftPriceInput = document.getElementById("nftPrice");
const nftCategorySelect = document.getElementById("nftCategory");
const nftRoyaltyInput = document.getElementById("nftRoyalty");
const nftFileInput = document.getElementById("nftFile");

const createdNftName = document.getElementById("createdNftName");
const createdNftPrice = document.getElementById("createdNftPrice");
const createdNftCategory = document.getElementById("createdNftCategory");
const createdNftRoyalty = document.getElementById("createdNftRoyalty");
const createdNftDescription = document.getElementById("createdNftDescription");


const charCount = document.getElementById("charCount");


const openModal = () => {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  

  resetForm();
  

  setTimeout(() => {
    const modalWindow = document.querySelector('.modal-window');
    if (modalWindow) {
      modalWindow.scrollTop = 0;
    }
  }, 100);
};


const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
};

document.querySelectorAll(".open-modal").forEach(btn => {
  btn.addEventListener("click", openModal);
});

modalClose.addEventListener("click", closeModal);
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeModal);
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});


function resetForm() {
  if (nftForm) {
    nftForm.reset();
    successMessage.style.display = "none";
    loadingSpinner.style.display = "none";
    nftForm.style.display = "block";
    

    const filePreview = document.getElementById("filePreview");
    const filePlaceholder = document.getElementById("filePlaceholder");
    const previewImage = document.getElementById("previewImage");
    const fileName = document.getElementById("fileName");
    
    if (filePreview) filePreview.style.display = "none";
    if (filePlaceholder) filePlaceholder.style.display = "flex";
    if (previewImage) previewImage.src = "";
    if (fileName) fileName.textContent = "";
    

    if (charCount) {
      charCount.textContent = "0";
      charCount.style.color = "#6c3fff";
    }
  }
}


if (nftDescriptionInput && charCount) {
  nftDescriptionInput.addEventListener('input', function() {
    const length = this.value.length;
    charCount.textContent = length;
    

    if (length > 500) {
      charCount.style.color = '#ff3b30';
    } else if (length > 450) {
      charCount.style.color = '#ff9500';
    } else {
      charCount.style.color = '#6c3fff';
    }
  });
}


const filePlaceholder = document.getElementById("filePlaceholder");

if (nftFileInput && filePlaceholder) {

  nftFileInput.addEventListener("change", function(e) {
    const file = this.files[0];
    const filePreview = document.getElementById("filePreview");
    const previewImage = document.getElementById("previewImage");
    const fileName = document.getElementById("fileName");
    
    if (file) {
      fileName.textContent = file.name;
      filePlaceholder.style.display = "none";
      

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function(e) {
          previewImage.src = e.target.result;
          filePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
      } else {

        previewImage.style.display = "none";
        filePreview.style.display = "block";
      }
    } else {
      filePreview.style.display = "none";
      filePlaceholder.style.display = "flex";
    }
  });
  

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    filePlaceholder.addEventListener(eventName, preventDefaults, false);
  });
  
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  ['dragenter', 'dragover'].forEach(eventName => {
    filePlaceholder.addEventListener(eventName, highlight, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    filePlaceholder.addEventListener(eventName, unhighlight, false);
  });
  
  function highlight() {
    filePlaceholder.style.borderColor = '#6c3fff';
    filePlaceholder.style.background = 'rgba(108, 63, 255, 0.15)';
  }
  
  function unhighlight() {
    filePlaceholder.style.borderColor = 'rgba(108, 63, 255, 0.3)';
    filePlaceholder.style.background = 'rgba(108, 63, 255, 0.05)';
  }
  
  filePlaceholder.addEventListener('drop', handleDrop, false);
  
  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
      nftFileInput.files = files;
      

      const event = new Event('change', { bubbles: true });
      nftFileInput.dispatchEvent(event);
    }
  }
}


function removeFile() {
  const filePreview = document.getElementById('filePreview');
  
  if (nftFileInput) {
    nftFileInput.value = '';
  }
  
  if (filePreview) {
    filePreview.style.display = 'none';
  }
  
  if (filePlaceholder) {
    filePlaceholder.style.display = 'flex';
  }
}


const formInputs = document.querySelectorAll('.modal-form input, .modal-form textarea, .modal-form select');
formInputs.forEach(input => {
  input.addEventListener('focus', function() {

    if (window.innerWidth <= 768) {
      setTimeout(() => {
        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  });
});


if (nftForm) {
  nftForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    

    const modalWindow = document.querySelector('.modal-window');
    if (modalWindow) {
      modalWindow.scrollTop = 0;
    }
    

    const nftName = nftNameInput.value;
    const description = nftDescriptionInput.value;
    const price = nftPriceInput.value;
    const category = nftCategorySelect.value;
    const royalty = nftRoyaltyInput.value || "0";
    const file = nftFileInput.files[0];
    

    if (!nftName || !description || !price || !category || !file) {
      alert("Please fill all required fields (*)");
      

      if (!nftName) nftNameInput.focus();
      else if (!description) nftDescriptionInput.focus();
      else if (!price) nftPriceInput.focus();
      else if (!category) nftCategorySelect.focus();
      else if (!file) nftFileInput.focus();
      
      return;
    }
    

    nftForm.style.display = "none";
    successMessage.style.display = "none";
    loadingSpinner.style.display = "flex";
    

    if (modalWindow) {
      modalWindow.scrollTop = 0;
    }
    

    setTimeout(() => {

      createdNftName.textContent = nftName;
      createdNftPrice.textContent = `${price} ETH`;
      createdNftCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      createdNftRoyalty.textContent = `${royalty}%`;
      createdNftDescription.textContent = description.length > 100 ? description.substring(0, 100) + "..." : description;
      

      loadingSpinner.style.display = "none";
      successMessage.style.display = "block";
      

      if (modalWindow) {
        modalWindow.scrollTop = 0;
      }
      

      const nftData = {
        name: nftName,
        description: description,
        price: price,
        category: category,
        royalty: royalty,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem("lastCreatedNFT", JSON.stringify(nftData));
      

      let createdNFTs = JSON.parse(localStorage.getItem("createdNFTs") || "[]");
      createdNFTs.push(nftData);
      localStorage.setItem("createdNFTs", JSON.stringify(createdNFTs));
      
    }, 1500);
  });
}


function viewNftDetails() {
  const nftData = JSON.parse(localStorage.getItem("lastCreatedNFT") || "{}");
  
  if (nftData.name) {
    alert(`🎨 NFT Details:\n\nName: ${nftData.name}\nPrice: ${nftData.price} ETH\nCategory: ${nftData.category}\nRoyalty: ${nftData.royalty}%\n\nThis NFT has been added to your collection!`);
    closeModal();
    

    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = gallerySection.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: targetPosition - headerHeight - 20,
        behavior: "smooth"
      });
    }
  } else {
    alert("No NFT data found.");
  }
}


function createAnotherNft() {
  successMessage.style.display = "none";
  nftForm.style.display = "block";
  resetForm();
  

  const modalWindow = document.querySelector('.modal-window');
  if (modalWindow) {
    modalWindow.scrollTop = 0;
    

    setTimeout(() => {
      nftNameInput.focus();
    }, 100);
  }
}


const track = document.getElementById("sliderTrack");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const slides = document.querySelectorAll(".slide");

if (track && slides.length > 0) {
  let currentIndex = 0;
  const slideWidth = slides[0].offsetWidth + 30;
  const visibleSlides = Math.floor(track.parentElement.offsetWidth / slideWidth);
  const maxIndex = Math.max(0, slides.length - visibleSlides);
  
  function updateSlider() {
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    if (leftBtn) leftBtn.disabled = currentIndex === 0;
    if (rightBtn) rightBtn.disabled = currentIndex >= maxIndex;
  }
  
  if (rightBtn) {
    rightBtn.addEventListener("click", () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
      }
    });
  }
  
  if (leftBtn) {
    leftBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  }
  
  let autoSlideInterval = setInterval(() => {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  }, 5000);
  
  if (track) {
    track.addEventListener("mouseenter", () => {
      clearInterval(autoSlideInterval);
    });
    
    track.addEventListener("mouseleave", () => {
      autoSlideInterval = setInterval(() => {
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateSlider();
      }, 5000);
    });
  }
  
  window.addEventListener("resize", () => {
    const newVisibleSlides = Math.floor(track.parentElement.offsetWidth / slideWidth);
    const newMaxIndex = Math.max(0, slides.length - newVisibleSlides);
    
    if (currentIndex > newMaxIndex) {
      currentIndex = newMaxIndex;
    }
    
    updateSlider();
  });
  
  updateSlider();
}


document.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  

  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
  

  const circles = document.querySelectorAll('.circle');
  const triangles = document.querySelectorAll('.triangle');
  const squares = document.querySelectorAll('.square');
  
  circles.forEach((circle, index) => {
    const speed = 0.05 * (index + 1);
    circle.style.transform = `translateY(${scrolled * speed}px)`;
  });
  
  triangles.forEach((triangle, index) => {
    const speed = 0.03 * (index + 1);
    triangle.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
  });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#" || targetId.startsWith("#modal")) return;
    
    e.preventDefault();
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: targetPosition - headerHeight - 20,
        behavior: "smooth"
      });
    }
  });
});


const subscribeForm = document.querySelector(".subscribe-form");
if (subscribeForm) {
  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = subscribeForm.querySelector("input[type='email']");
    const email = emailInput.value;
    
    if (email && email.includes("@")) {
      alert("Thank you for subscribing! You'll receive updates soon.");
      subscribeForm.reset();
    } else {
      alert("Please enter a valid email address.");
      emailInput.focus();
    }
  });
}


const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);


document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});


document.addEventListener("DOMContentLoaded", () => {
  console.log("NFT Marketplace loaded successfully!");
  

  const savedNFTs = localStorage.getItem("createdNFTs");
  if (savedNFTs) {
    console.log(`Found ${JSON.parse(savedNFTs).length} saved NFTs`);
  }
});