document.addEventListener('DOMContentLoaded', () => {



  // 1) Scroll reveal for preview cards

  const revealEls = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if(ent.isIntersecting){
        ent.target.style.opacity = 1;
        ent.target.style.transform = 'translateY(0)';
        io.unobserve(ent.target);
      }
    });
  }, { threshold: 0.18 });
  revealEls.forEach(el => io.observe(el));


  // 2) Typewriter quotes animation

  const quotes = [
    "“Wisdom is not a product of schooling but of the lifelong attempt to acquire it.” <br><br>— Albert Einstein",
    "“Live as if you were to die tomorrow. Learn as if you were to live forever.” <br><br>— Mahatma Gandhi",
    "“Tell me and I forget, teach me and I may remember, involve me and I learn.” <br><br>— Benjamin Franklin",
    "“Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.”<br><br>— Richard Feynman",
    "“It is important that students bring a certain ragamuffin, barefoot irreverence to their studies; they are not here to worship what is known, but to question it.” <br><br>— Jacob Bronowski",
    "“Education is the most powerful weapon which you can use to change the world.” <br><br>— Nelson Mandela",
    "“The beautiful thing about learning is that nobody can take it away from you.” <br><br>— B.B. King",
    "“An investment in knowledge pays the best interest.” <br><br>— Benjamin Franklin",
    "“I never teach my pupils; I only attempt to provide the conditions in which they can learn.” <br><br>— Albert Einstein",
    "“The mind is not a vessel to be filled, but a fire to be kindled.” <br><br>— Plutarch",
    "“Education is not preparation for life; education is life itself.” <br><br>— John Dewey",
    "“Learning never exhausts the mind.” <br><br>— Leonardo da Vinci",
    "“Intellectual growth should commence at birth and cease only at death.” <br><br>— Albert Einstein",
    "“The roots of education are bitter, but the fruit is sweet.” <br><br>— Aristotle",
    "“Curiosity is the wick in the candle of learning.” <br><br>— William Arthur Ward"
  ];

  const quoteElement = document.getElementById("quote");
  const typingSpeed = 30;
  const erasingSpeed = 15;
  const delayBetweenQuotes = 2500;
  let currentQuote = 0;

  function typeQuote(quote, i = 0) {
    if (i < quote.length) {
      if (quote[i] === "<") {
        let tagEnd = quote.indexOf(">", i);
        quoteElement.innerHTML += quote.substring(i, tagEnd + 1);
        i = tagEnd + 1;
      } else {
        quoteElement.innerHTML += quote[i];
        i++;
      }
      setTimeout(() => typeQuote(quote, i), typingSpeed);
    } else {
      setTimeout(() => eraseQuote(quote), delayBetweenQuotes);
    }
  }

  function eraseQuote(quote) {
    let content = quoteElement.innerHTML;
    if (content.length > 0) {
      if (content.endsWith(">")) {
        let tagStart = content.lastIndexOf("<");
        quoteElement.innerHTML = content.substring(0, tagStart);
      } else {
        quoteElement.innerHTML = content.substring(0, content.length - 1);
      }
      setTimeout(() => eraseQuote(quote), erasingSpeed);
    } else {
      currentQuote = (currentQuote + 1) % quotes.length;
      setTimeout(() => typeQuote(quotes[currentQuote]), 500);
    }
  }

  // Start the first quote
  typeQuote(quotes[currentQuote]);


  // 3) Disable right-click on images

  document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // 5) ARC GLOBAL PRESENCE MAP (amCharts)


  // Themes
  am4core.useTheme(am4themes_dark);
  am4core.useTheme(am4themes_animated);

  // Create chart
  var chart = am4core.create("chartdiv", am4maps.MapChart);
  chart.geodata = am4geodata_worldLow;
  chart.projection = new am4maps.projections.Miller();

  chart.background.fill = am4core.color(
    getComputedStyle(document.documentElement).getPropertyValue("--bg-1")
  );

  // Disable dragging/zooming
  chart.seriesContainer.draggable = false;
  chart.seriesContainer.resizable = false;
  chart.chartContainer.wheelable = false;
  chart.maxZoomLevel = 1;
  chart.minZoomLevel = 1;

  // Country polygons
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.useGeodata = true;
  polygonSeries.exclude = ["AQ"];

  polygonSeries.mapPolygons.template.fill = am4core.color("#787878");
  polygonSeries.mapPolygons.template.stroke = am4core.color("black");
  polygonSeries.mapPolygons.template.strokeWidth = 0.6;

  // Marker layer
  var imageSeries = chart.series.push(new am4maps.MapImageSeries());
  var imageTemplate = imageSeries.mapImages.template;
  imageTemplate.propertyFields.latitude = "latitude";
  imageTemplate.propertyFields.longitude = "longitude";

  // Marker style
  var marker = imageTemplate.createChild(am4core.Circle);
  marker.radius = 5;
  marker.fill = am4core.color(
    getComputedStyle(document.documentElement).getPropertyValue("--accent")
  );
  marker.stroke = am4core.color(
    getComputedStyle(document.documentElement).getPropertyValue("--neon-2")
  );
  marker.strokeWidth = 2;

  marker.filters.push(new am4core.DropShadowFilter());
  marker.filters.getIndex(0).blur = 5;
  marker.filters.getIndex(0).color = am4core.color(
    getComputedStyle(document.documentElement).getPropertyValue("--neon-2")
  );

  // Tooltip
  imageTemplate.tooltipText = "{title}";

  // ARC presence data
  imageSeries.data = [
    { title: "Pakistan", latitude: 30.3753, longitude: 69.3451 },
    { title: "India", latitude: 20.5937, longitude: 78.9629 },
    { title: "Germany", latitude: 51.1657, longitude: 10.4515 },
    { title: "Czechia", latitude: 49.8175, longitude: 15.4730 },
    { title: "Dubai (UAE)", latitude: 25.2048, longitude: 55.2708 },
    { title: "United Kingdom", latitude: 55.3781, longitude: -3.4360 },
    { title: "New York, USA", latitude: 40.7128, longitude: -74.0060 },
    { title: "Sydney, Australia", latitude: -33.8688, longitude: 151.2093 },
    { title: "Kuala Lumpur, Malaysia", latitude: 3.1390, longitude: 101.6869 },
    { title: "Nigeria", latitude: 9.0820, longitude: 8.6753 }
  ];

  // Default zoom
  chart.homeZoomLevel = 1.25;
  chart.homeGeoPoint = { latitude: 25, longitude: 20 };




  // counter

  const counters = document.querySelectorAll(".counter");

  const easeOutQuad = (t) => t * (2 - t);
  // Smooth easing function: starts fast, ends slow

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let duration = 18000; // total animation time (18s)
      let startTime = null;

      const update = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        const easedProgress = easeOutQuad(progress);
        counter.innerText = Math.floor(easedProgress * target);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.innerText = target; // ensure exact final value
        }
      };

      requestAnimationFrame(update);
    });
  };

  // Run when the section becomes visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  });

  observer.observe(document.querySelector('.arc-counter-section'));

});
// BURGER MENU
const burger = document.getElementById("burger");
const navMenu = document.getElementById("nav-menu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll("#nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});


// SMOOTH SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll("[data-reveal], .elaboration-content");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect().top;

    if (rect < trigger) {
      el.classList.add("revealed");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ========================================
// 3D CARD SLIDER
// ========================================
const sliderCards = document.querySelectorAll('.slider-section .card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (sliderCards.length > 0 && prevBtn && nextBtn) {
  let currentIndex = 0;

  function updateCards() {
    sliderCards.forEach((card, index) => {
      card.classList.remove('active', 'prev', 'next', 'hidden');

      if (index === currentIndex) {
        card.classList.add('active');
      } else if (index === (currentIndex - 1 + sliderCards.length) % sliderCards.length) {
        card.classList.add('prev');
      } else if (index === (currentIndex + 1) % sliderCards.length) {
        card.classList.add('next');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + sliderCards.length) % sliderCards.length;
    updateCards();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % sliderCards.length;
    updateCards();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + sliderCards.length) % sliderCards.length;
      updateCards();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % sliderCards.length;
      updateCards();
    }
  });

  // Auto-play
  let autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % sliderCards.length;
    updateCards();
  }, 5000);

  // Pause autoplay on hover
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
      autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % sliderCards.length;
        updateCards();
      }, 5000);
    });
  }
}

