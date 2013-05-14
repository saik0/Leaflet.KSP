Leaflet.KSP
==========

Leaflet.KSP is a [Lealfet](http://leafletjs.com/) plugin for displaying [celestial bodies](http://wiki.kerbalspaceprogram.com/wiki/Celestials) from [Kerbal Space Program](https://kerbalspaceprogram.com/).

The plugin powers the community based [Kerbal Maps](http://www.kerbalmaps.com) website.

Usage
-----

Incorporating Leaflet.KSP into your own site or web based mod is easy:

```js
map = new L.KSP.Map('yourDivId',  {
 // define options
	layers: [ L.KSP.CelestialBody.KERBIN ], // default: kerbin
	zoom: L.KSP.CelestialBody.KERBIN.defaultLayer.options.maxZoom
	center: [ -0.1027, -74.5754 ], // Kerbal Space Center
	bodyControl: true, // show body control. default: false
	layerControl: true, // show layer control. default: false
	scaleControl: true // show scale control. default: false
});
```

Building Leaflet.KSP from Source
--------------------------------

Leaflet build system is powered by the [Node.js](http://nodejs.org/) platform and Jake, JSHint and UglifyJS libraries, which install easily and work well across all major platforms. Here are the steps to install it:

1. [Download and install Node](http://nodejs.org/)
2. Run the following commands in the command line:

	```text
	npm install -g jake
	npm install jshint
	npm install uglify-js
    ```
3. Now that you have everything installed, run ```jake``` inside the Leaflet.KSP directory. This will check Leaflet source files for JavaScript errors and inconsistencies, and then combine and minify it to the dist folder.

Developers
----------

* Author: Joel Pedraza&nbsp;&nbsp;&nbsp;[Google+](http://plus.google.com/111289811888358912498/)&nbsp;&nbsp;&nbsp;[Kerbal Forums](http://forum.kerbalspaceprogram.com/member.php/58916)

License
-------

Leaflet.KSP is free software, and may be used and/or distributed under the Simplified BSD License


> Copyright (c) 2013, Joel Pedraza
All rights reserved.

> Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met: 

> 1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer. 
> 2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution. 

> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 
