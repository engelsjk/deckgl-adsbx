(this["webpackJsonpdeckgl-adsbx"]=this["webpackJsonpdeckgl-adsbx"]||[]).push([[0],{120:function(t,e){},183:function(t,e){},188:function(t,e,n){"use strict";n.r(e);var i=n(4),a=n.n(i),r=n(141),o=n.n(r),c=n(121),s=n(146),u=n(98),d=n.n(u),l=n(205),m=n(143),p=n(202),b=n(122),h=n(207),f=n(208),g=n(80);d.a.workerClass=n(182).default;var j={TRIPS:["https://raw.githubusercontent.com/engelsjk/deckgl-adsbx/main/data/trace_full_ab1fbb_deckgl.json","https://raw.githubusercontent.com/engelsjk/deckgl-adsbx/main/data/trace_full_abca00_deckgl.json"]},w=new m.a({color:[255,255,255],intensity:1}),x=new p.a({color:[255,255,255],intensity:2,position:[-74.05,40.7,8e3]}),k={buildingColor:[74,80,87],trailColor0:[253,128,93],trailColor1:[23,184,190],material:{ambient:.1,diffuse:.6,shininess:32,specularColor:[60,64,70]},effects:[new b.a({ambientLight:w,pointLight:x})]},v={longitude:-91.36156905126727,latitude:29.97256762427715,zoom:6,pitch:45,bearing:0,maxPitch:60};function y(t,e,n){return(t-n)/(e-n)}var O=function(t){var e=t.trips,n=void 0===e?j.TRIPS:e,a=t.trailLength,r=void 0===a?1e3:a,o=t.initialViewState,u=void 0===o?v:o,d=t.mapStyle,m=void 0===d?"mapbox://styles/mapbox/dark-v10":d,p=t.theme,b=void 0===p?k:p,w=t.loopLength,x=void 0===w?1e5:w,O=t.animationSpeed,S=void 0===O?50:O,C=Object(i.useState)(0),P=Object(c.a)(C,2),T=P[0],L=P[1],J=Object(i.useState)({}),_=Object(c.a)(J,1)[0],A=function t(){L((function(t){return(t+S)%x})),_.id=window.requestAnimationFrame(t)};Object(i.useEffect)((function(){return _.id=window.requestAnimationFrame(A),function(){return window.cancelAnimationFrame(_.id)}}),[_]);var E=[new h.a({id:"trips0",data:n[0],getPath:function(t){return t.path},getTimestamps:function(t){return t.timestamps},getColor:function(t){return t.path.map((function(t){return Object(f.a)(1-y(t[2],4e4,0)).match(/\d+/g).map(Number)}))},opacity:.3,widthMinPixels:5,rounded:!0,trailLength:r,currentTime:T,shadowEnabled:!1}),new h.a({id:"trips1",data:n[1],getPath:function(t){return t.path},getTimestamps:function(t){return t.timestamps.map((function(t){return t+4758.87}))},getColor:function(t){return t.path.map((function(t){return Object(f.a)(1-y(t[2],4e4,0)).match(/\d+/g).map(Number)}))},opacity:.3,widthMinPixels:5,rounded:!0,trailLength:r,currentTime:T,shadowEnabled:!1})];return Object(g.jsx)(l.a,{layers:E,effects:b.effects,initialViewState:u,controller:!0,children:Object(g.jsx)(s.a,{mapboxApiAccessToken:"pk.eyJ1IjoiZW5nZWxzamsiLCJhIjoiY2ttZjlsMnN6MHhtdjJwbXduZXczbGV1ZyJ9.Cq5NjHPcvnchR6xk4ET62w",maxPitch:60,mapStyle:m,preventStyleDiffing:!0})})};o.a.render(Object(g.jsx)(a.a.StrictMode,{children:Object(g.jsx)(O,{})}),document.getElementById("root"))}},[[188,1,2]]]);
//# sourceMappingURL=main.d930c85e.chunk.js.map