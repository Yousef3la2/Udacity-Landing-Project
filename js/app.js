
// Global Variables
const back_up_btn = document.getElementById("back_up_btn");
const page__header = document.getElementById("page__header");

// change title's text
const Title = document.getElementById("title");
Title.textContent = `Udactiy's Project`;


// detecting the current section
window.addEventListener("scroll", () => {
  const main = document.getElementById("main");
  if (document.body.scrollTop <= 10) {
    console.log("at top");
    page__header.style.position = "relative";
  } else {
    console.log("not at top");
    page__header.style.position = "fixed";
  }
  if (document.body.scrollTop >= 700) {
    back_up_btn.style.display = "block";
  } else {
    back_up_btn.style.display = "none";
  }
  
  ActivateCurrentSection();
});

/**
* Add class 'active' to section when near top of viewport
* using Element.getBoundingClientRect() instead of Intersection Observer API 
* source i use for it https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
*/
function ActivateCurrentSection(){
   const Sections = document.getElementsByClassName("Section");
   const sectionLen = Sections.length;
   for(var i=0;i<sectionLen;i++){
	   if(Sections[i].getBoundingClientRect().top > -100 && Sections[i].getBoundingClientRect().top <= 500){
		    document
			.getElementById("section" + (i+1))
			.classList.add("your-active-class");
			document
			.getElementsByClassName("navbar_sections")
			[i].classList.add("navbar__active");
	   }else{
		   
		   document
			.getElementById("section" + (i+1))
			.classList.remove("your-active-class");
			document
			.getElementsByClassName("navbar_sections")
			[i].classList.remove("navbar__active");
		   
		   
	   }
   }
}


/**
 * add sections dynamically
 * by using addSection function and add them to the main tag
 * ES6
 */
const addSection = () => {
  const Section = document.getElementsByClassName("Section");
  const sectionLen = Section.length;
  const main = document.getElementById("main");
  main.innerHTML += `<section id="section${sectionLen + 1}" data-nav="Section ${
    sectionLen + 1
  }" class="Section">
  <div class="landing__container">
        <h2 id="Section_${sectionLen + 1}">Section ${sectionLen + 1}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
      </div>
  </section>`;
  addSectionToNav();
}

// delete section
function deleteSection() {
  const Section = document.getElementsByClassName("Section");
  const sectionLen = Section.length;
  if (sectionLen > 4) {
    const main = document.getElementById("main");
    main.removeChild(main.lastElementChild);
    deleteSectionFromNav();
  }
}


// highlight section in navbar
function navbar_section_highlight(idNum) {
  const Section = document.getElementsByClassName("Section");
  document
    .getElementsByClassName("navbar_sections")
    [idNum - 1].classList.add("navbar__active");

  for (let i = Section.length - 1; i >= 0; i--) {
    if (idNum != i + 1) {
      document
        .getElementsByClassName("navbar_sections")
        [i].classList.remove("navbar__active");

        /**
        * As you click on the navigation links, you will move smoothly to the correct section
        * i'm able to shortcut this code simply the usage of CSS (html{ scroll-behavior: "smooth"})
        * however I suppose it higher to apply what I learn
        * and I use setTimeout to earn some time to scroll easily
        */
        document.getElementById("section"+idNum).scrollIntoView({
          behavior: "smooth"
        });
        setTimeout(() => {
          location.hash = ("section"+idNum);
        }, 1000);
    }
  }
}

/**
 * adds new section to the navbar
 */
function addSectionToNav() {
  const Section = document.getElementsByClassName("Section");
  const navBar = document.getElementById("navbar__list");
  const sectionLen = Section.length;
    navBar.innerHTML += `<li id="Section${sectionLen}" class="navbar_sections" onclick="navbar_section_highlight(${
      sectionLen
    })"><a href="#${sectionLen}" class="navbar__link">Section ${
      sectionLen
    }</a></li>`;

}

// delete section from navbar__list
function deleteSectionFromNav() {
  const Section = document.getElementsByClassName("Section");
  const sectionLen = Section.length+1;
  const LastSection = document.getElementById("Section"+sectionLen);
LastSection.remove();
}

// Scroll to the top
//source i use for it https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
function scrollToTop() {
window.scrollTo({top: 0, behavior: 'smooth'});
}

//Initalize the navbar with elements for the first time only
function InitNav(){
	  const Section = document.getElementsByClassName("Section");
  const navBar = document.getElementById("navbar__list");
  const sectionLen = Section.length;
  navBar.innerHTML = "";
  for (let i = 0; i < sectionLen; i++) {
    navBar.innerHTML += `<li id="Section${i+1}" class="navbar_sections" onclick="navbar_section_highlight(${
      i + 1
    })"><a href="#${i + 1}" class="navbar__link">Section ${
      i + 1
    }</a></li>`;
  }
  ActivateCurrentSection();
}

InitNav();
