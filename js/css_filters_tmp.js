/*
  var filters = ["contrast", "brightness", "blur", "grayscale",
                 "hue-rotate", "invert", "opactiy", "saturate", "sepia"];

  var filterMap = {
    grayscale: {
      min: 0,
      max: 100,
      measuredIn: "%",
      default: 0
    },

    brightness: {
      min: 0,
      max: 100000,
      measuredIn: "%",
      default: 0
    },

    contrast: {
      min: 0,
      max: 10000,
      measuredIn: "%",
      default: 0
    },

    blur: {
      min: 0,
      max: 200,
      measuredIn: "px",
      default: 0
    },

    "hue-rotate": {
      min: 0,
      max: 360,
      measuredIn: "deg",
      default: 0
    },

    invert: {
      min: 0,
      max: 100,
      measuredIn: "%",
      default: 0
    },

    opactiy: {
      min: 0,
      max: 100,
      measuredIn: "%",
      default: 100
    },

    sepia: {
      min: 0,
      max: 100,
      measuredIn: "%",
      default: 0
    },
    saturate: {
      min: 0,
      max: 1000,
      units: "",
      default: 0
    }
  };



   Filter object template

    function Filter() {
      this.minVal
      this.maxVal
      this.defaultVal
      this.unit
      this.currentVal
      this.type
    }

    prototype:
      valueInRange
      setCurrentValue
      getCurrentValue


    Filters
     [] this.activeFilters
     listener on all child filters, 
     assuming value is in range, if filter is in array,
     splice with regex, replace value, rejoin and set as filter

   -  or also maybe two arrays, one of filters one of values,
   or an object? that has all current vals...
*/
