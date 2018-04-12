/* eslint-disable */

var pyodide = {}

var languagePluginLoader = new Promise((resolve, reject) => {
  var baseURL = 'https://iodide-project.github.io/pyodide-demo/';
  var wasmURL = `${baseURL}pyodide.asm.wasm?x=${Date.now()}`;
  var wasmXHR = new XMLHttpRequest();
  wasmXHR.open('GET', wasmURL, true);
  wasmXHR.responseType = 'arraybuffer';
  wasmXHR.onload = function () {
    if (wasmXHR.status === 200 || wasmXHR.status === 0) {
      pyodide.wasmBinary = wasmXHR.response;
    } else {
      alert(`Couldn't download the pyodide.asm.wasm binary.  Response was ${wasmXHR.status}`);
    }

    pyodide.baseURL = baseURL;
    var script = document.createElement('script');
    script.src = `${baseURL}pyodide.asm.js`;
    script.onload = () => {
      // setInterval hack until we can get a callback when compilation is complete.
      var everythingLoaded = setInterval(() => {
        if (pyodide.runPython !== undefined) {
            clearInterval(everythingLoaded);
            resolve()
        }
      }, 100);
      
    }
    document.body.appendChild(script);
  };
  wasmXHR.send(null);
})
languagePluginLoader