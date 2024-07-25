let observers = [];

startup = () => {
  let wrapper = document.querySelector(".wrapper");

  // Options for the observers

  let observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: [],
  };

  // An array of threshold sets for each of the boxes. The
  // first box's thresholds are set programmatically
  // since there will be so many of them (for each percentage
  // point).

  let thresholdSets = [
    [],
    [0.5],
    [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    [0, 0.25, 0.5, 0.75, 1.0],
  ];

  for (let i = 0; i <= 1.0; i += 0.01) {
    thresholdSets[0].push(i);
  }

  // Add each box, creating a new observer for each

  for (let i = 0; i < 4; i++) {
    let template = document
      .querySelector("#boxTemplate")
      .content.cloneNode(true);
    let boxID = `box${i + 1}`;
    template.querySelector(".sampleBox").id = boxID;
    wrapper.appendChild(document.importNode(template, true));

    // Set up the observer for this box
    let root = document
      .querySelector(".rootView")
    observerOptions.threshold = thresholdSets[i];
    observerOptions.root = root
    observers[i] = new IntersectionObserver(
      intersectionCallback,
      observerOptions,
    );
    observers[i].observe(document.querySelector(`#${boxID}`));
  }

  // Scroll to the starting position

  // document.scrollingElement.scrollTop = wrapper.firstElementChild.getBoundingClientRect().top + window.scrollY;
  // document.scrollingElement.scrollTop = window.innerHeight - wrapper.firstElementChild.getBoundingClientRect().height
  // document.scrollingElement.scrollTop = wrapper.firstElementChild.getBoundingClientRect().top - wrapper.firstElementChild.getBoundingClientRect().height

};

intersectionCallback = (entries) => {
  entries.forEach((entry) => {
    let box = entry.target;
    let visiblePct = `${Math.floor(entry.intersectionRatio * 100)}%`;
  
    box.querySelector(".center").innerHTML = visiblePct;
    box.querySelector(".topLeft").innerHTML = visiblePct;
    box.querySelector(".topRight").innerHTML = visiblePct;
    box.querySelector(".bottomLeft").innerHTML = visiblePct;
    box.querySelector(".bottomRight").innerHTML = visiblePct;
    console.log(entry.target + visiblePct)
  });
};

startup();
