// ========== Gallery Functionality ==========
document.addEventListener('DOMContentLoaded', () => {
  // Wczytaj obrazy do galerii
  const galleryGrid = document.getElementById('galleryGrid')

  if (galleryGrid) {
    // Lista obrazów w folderze gallery (1.webp do 6.webp)
    const imageCount = 6

    for (let i = 1; i <= imageCount; i++) {
      const galleryItem = document.createElement('div')
      galleryItem.className = 'gallery-item'

      const img = document.createElement('img')
      img.src = `assets/images/gallery/${i}.webp`
      img.alt = `Zdjęcie z koncertu Heroes ${i}`
      img.loading = 'lazy'

      // Dodaj obsługę błędów ładowania obrazu
      img.onerror = function () {
        console.warn(`Nie można załadować obrazu: ${this.src}`)
        galleryItem.style.display = 'none'
      }

      galleryItem.appendChild(img)
      galleryGrid.appendChild(galleryItem)

      // Dodaj lightbox functionality
      galleryItem.addEventListener('click', () => {
        openLightbox(img.src)
      })
    }
  }

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox')
  const lightboxClose = document.getElementById('lightboxClose')
  const lightboxImage = document.getElementById('lightboxImage')

  if (lightbox && lightboxClose && lightboxImage) {
    lightboxClose.addEventListener('click', closeLightbox)

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox()
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox()
      }
    })
  }

  function openLightbox(imageSrc) {
    if (lightbox && lightboxImage) {
      lightboxImage.src = imageSrc
      lightbox.classList.add('active')
      document.body.style.overflow = 'hidden'
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active')
      document.body.style.overflow = 'auto'
    }
  }
})

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  })
})

// ========== Navigation Active State ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html'
document.querySelectorAll('.nav-links a').forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active')
  }
})

// ========== Scroll Animation Effect ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1'
      entry.target.style.transform = 'translateY(0)'
    }
  })
}, observerOptions)

document.querySelectorAll('.info-card, .gallery-item').forEach((el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(20px)'
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
  observer.observe(el)
})

// ========== Mobile Menu Toggle (jeśli potrzebne w przyszłości) ==========
const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelector('.nav-links')

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active')
  })
}

// ========== Parallax Effect for Background ==========
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector('body::before')

  if (parallax) {
    const speed = 0.5
    document.body.style.backgroundPositionY = -(scrolled * speed) + 'px'
  }
})

// ========== Console Easter Egg ==========
console.log(
  '%c🎮 Heroes of Might and Magic - Koncert Symfoniczny 🎵',
  'font-size: 20px; font-weight: bold; color: #daa520; text-shadow: 2px 2px 4px #000;'
)
console.log(
  '%cWitaj, Bohaterze! Przygotuj się na epicką przygodę muzyczną!',
  'font-size: 14px; color: #f5deb3;'
)
