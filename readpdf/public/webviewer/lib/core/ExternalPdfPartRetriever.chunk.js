/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[8],{390:function(ia,da,f){f.r(da);var ba=f(1);ia=f(48);var ea=f(158),aa=f(351),ha=f(218),ca=window;f=function(){function f(f,y){this.nS=function(f){f=f.split(".");return f[f.length-1].match(/(jpg|jpeg|png|gif)$/i)};y=y||{};this.url=f;this.filename=y.filename||f;this.Se=y.customHeaders;this.yha=!!y.useDownloader;this.withCredentials=!!y.withCredentials}f.prototype.DC=function(f){this.Se=f};f.prototype.getCustomHeaders=function(){return this.Se};
f.prototype.getFileData=function(w){var y=this,r=this,h=new XMLHttpRequest,n=0===this.url.indexOf("blob:")?"blob":"arraybuffer";h.open("GET",this.url,!0);h.withCredentials=this.withCredentials;h.responseType=n;this.Se&&Object.keys(this.Se).forEach(function(e){h.setRequestHeader(e,y.Se[e])});var e=/^https?:/i.test(this.url);h.addEventListener("load",function(h){return Object(ba.b)(this,void 0,void 0,function(){var n,x,y,z,aa,ca;return Object(ba.d)(this,function(ba){switch(ba.label){case 0:if(200!==
this.status&&(e||0!==this.status))return[3,10];r.trigger(f.Events.DOCUMENT_LOADING_PROGRESS,[h.loaded,h.loaded]);if("blob"!==this.responseType)return[3,4];n=this.response;return r.nS(r.filename)?[4,Object(ha.b)(n)]:[3,2];case 1:return x=ba.da(),r.fileSize=x.byteLength,w(new Uint8Array(x)),[3,3];case 2:y=new FileReader,y.onload=function(e){e=new Uint8Array(e.target.result);r.fileSize=e.length;w(e)},y.readAsArrayBuffer(n),ba.label=3;case 3:return[3,9];case 4:ba.Bi.push([4,8,,9]);z=new Uint8Array(this.response);
if(!r.nS(r.filename))return[3,6];n=new Blob([z.buffer]);return[4,Object(ha.b)(n)];case 5:return x=ba.da(),r.fileSize=x.byteLength,w(new Uint8Array(x)),[3,7];case 6:r.fileSize=z.length,w(z),ba.label=7;case 7:return[3,9];case 8:return ba.da(),r.trigger(f.Events.ERROR,["pdfLoad","Out of memory"]),[3,9];case 9:return[3,11];case 10:aa=h.currentTarget,ca=Object(ea.b)(aa),r.trigger(f.Events.ERROR,["pdfLoad",this.status+" "+aa.statusText,ca]),ba.label=11;case 11:return r.ox=null,[2]}})})},!1);h.onprogress=
function(e){r.trigger(f.Events.DOCUMENT_LOADING_PROGRESS,[e.loaded,0<e.total?e.total:0])};h.addEventListener("error",function(){r.trigger(f.Events.ERROR,["pdfLoad","Network failure"]);r.ox=null},!1);h.send();this.ox=h};f.prototype.getFile=function(){var f=this;return new Promise(function(w){ca.utils.isJSWorker&&w(f.url);if(f.yha){var r=Object(ba.a)({url:f.url},f.Se?{customHeaders:f.Se}:{});w(r)}w(null)})};f.prototype.abort=function(){this.ox&&(this.ox.abort(),this.ox=null)};f.Events={DOCUMENT_LOADING_PROGRESS:"documentLoadingProgress",
ERROR:"error"};return f}();Object(ia.a)(f);Object(aa.a)(f);Object(aa.b)(f);da["default"]=f}}]);}).call(this || window)
