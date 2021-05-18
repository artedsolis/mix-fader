let div = document.getElementById("fader-app");

const MarkWeight = {
  Minor: 0,
  Major: 1,
  Default: 2,
};

const FaderCurve = {};

const createFader = () => {
  let faderInput = document.createElement("input");
  faderInput.type = "range";
  faderInput.min = MarkWeight.Minor;
  faderInput.max = MarkWeight.Major;
  faderInput.value = MarkWeight.Default;
  faderInput.step = "0.01";
  faderInput.value = 0.19399678709072077;
  div.append(faderInput);
};

const createInput = () => {
  let inputToFader = document.createElement("input");
  inputToFader.type = "number";
  inputToFader.step = "0.01";
  inputToFader.id = "inputToFader";
  document.body.prepend(inputToFader);
  inputToFader.value = 0;
};

const initFaderHooks = () => {
  const fader = document.querySelector("#fader-app > input");
  fader.addEventListener("change", (e) => {
    const value = FaderCurve.positionToValue(e.currentTarget.value);
    inputToFader.value = value.toFixed(2);
  });
  
  const inputToFader = document.querySelector("#inputToFader");
  inputToFader.addEventListener("change", (e) => {
    const value = FaderCurve.valueToPosition(e.currentTarget.value);
    fader.value = value.toFixed(2);
  });
};

(function () {
  const b = Math.sqrt(5) + 1,
    a = 90 / Math.log10(b + 1),
    c = -80;

  /*********************** 
   * Declare new functions
   **********************/ 
  createFader();
  createInput();
  initFaderHooks();
  /***********************
   ***********************/

  /**
   * Translate (value) to range (position)
   ****/

  FaderCurve.valueToPosition = function (dB) {
    let pos = 1 - (Math.pow(10, (dB - c) / a) - 1) / b;

    if (pos > 1) pos = 1;
    else if (pos < 0) pos = 0;
    return pos;
  };

  /**
   * Translate range (position) to number (value)
   ****/
  FaderCurve.positionToValue = function (pos) {
    pos = 1 - pos;

    if (pos > 1) pos = 1;
    else if (pos < 0) pos = 0;

    return a * Math.log10(b * pos + 1) + c;
  };

  FaderCurve.scale = [
    { value: 10, weight: MarkWeight.Major, label: "10" },
    { value: 8, weight: MarkWeight.Minor },
    { value: 6, weight: MarkWeight.Minor },
    { value: 4, weight: MarkWeight.Minor },
    { value: 2, weight: MarkWeight.Minor },
    { value: 0, weight: MarkWeight.Default, label: "0" },
    { value: -2, weight: MarkWeight.Minor },
    { value: -4, weight: MarkWeight.Minor },
    { value: -6, weight: MarkWeight.Minor },
    { value: -8, weight: MarkWeight.Minor },
    { value: -10, weight: MarkWeight.Major, label: "-10" },
    { value: -20, weight: MarkWeight.Major, label: "-20" },
    { value: -30, weight: MarkWeight.Major, label: "-30" },
    { value: -40, weight: MarkWeight.Major, label: "-40" },
    { value: -50, weight: MarkWeight.Major, label: "-50" },
    { value: -60, weight: MarkWeight.Major, label: "-60" },
    { value: -70, weight: MarkWeight.Major, label: "-70" },
    { value: -80, weight: MarkWeight.Major, label: "off" },
  ];
})();
