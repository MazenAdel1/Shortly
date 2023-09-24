let mobileMenu = document.querySelector(`.mobile-menu`),
  menuButton = document.querySelector(`.bar-icon`);

menuButton.onclick = function () {
  mobileMenu.classList.toggle(`d-none`);
};

document.addEventListener("click", function (event) {
  if (event.target != menuButton && event.target != mobileMenu) {
    if (!mobileMenu.classList.contains(`d-none`)) {
      mobileMenu.classList.add(`d-none`);
    }
  }
});

let input = document.querySelector(`input`),
  shortenButton = document.querySelector(`.shorten-button`),
  warningMessage = document.querySelector(`.warning-message`);

shortenButton.onclick = function () {
  if (input.value == ``) {
    input.style.cssText = `border: 4px solid hsl(0, 87%, 67%);`;
    input.classList.add(`error`);
    if (window.matchMedia("(max-width:768px)").matches) {
      shortenButton.style.cssText = `margin-top: 20px`;
    }
    warningMessage.classList.remove(`d-none`);
  } else {
    shortenUrl(input.value);
    document.querySelector(`.statics-container`).style.paddingTop = `100px`;
    document.querySelector(`.shorten-links`).style.paddingBottom = `100px`;
  }
};

input.oninput = function () {
  if (input.classList.contains(`error`)) {
    input.style.removeProperty(`border`);
    warningMessage.classList.add(`d-none`);
    shortenButton.style.cssText = `margin-top: 0;`;
  }
};

input.addEventListener(`keypress`, (event) => {
  if (event.key == `Enter`) {
    shortenButton.click();
  }
});

function shortenUrl(longUrl) {
  const apiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(
    longUrl
  )}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.shorturl) {
        const shortenedUrl = data.shorturl;

        // make the link element
        let mainDiv = document.createElement(`div`),
          span = document.createElement(`span`),
          hr = document.createElement(`hr`),
          div = document.createElement(`div`),
          link = document.createElement(`a`),
          button = document.createElement(`button`);

        mainDiv.className = `d-flex flex-md-row flex-column w-100 justify-content-between bg-white py-3 px-4 rounded-2 align-items-md-center align-items-start`;

        span.className = `h5 m-0`;

        hr.className = `w-100 d-md-none d-block`;

        div.className = `d-flex flex-md-row flex-column gap-md-3 gap-2 align-items-md-center align-items-start`;

        link.className = `primary-cyan text-decoration-none h5 m-0`;

        button.className = `primary-bg-cyan text-white border-0 rounded-2 py-2 px-4 hovered-cyan transition fw-bold w-100`;

        span.innerHTML = longUrl;
        link.innerHTML = shortenedUrl;
        button.innerHTML = `Copy`;

        span.style.textOverflow = `ellipsis`;
        span.style.overflow = `hidden`;
        span.style.width = `100%`;

        link.href = shortenedUrl;
        link.target = `_blank`;

        button.addEventListener(`click`, () => {
          navigator.clipboard.writeText(shortenedUrl);
          button.classList.add(`very-dark-violet-bg`);
          button.classList.remove(`hovered-cyan`);
          button.style.cursor = `auto`;
          button.innerHTML = `Copied!`;
        });

        div.appendChild(link);
        div.appendChild(button);

        mainDiv.appendChild(span);
        mainDiv.appendChild(hr);
        mainDiv.appendChild(div);
        //

        document.querySelector(`.shorten-links`).appendChild(mainDiv);
      } else {
        console.error("Error:", data.error || "An error occurred");
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
}
