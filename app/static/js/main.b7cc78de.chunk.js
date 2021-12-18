(this["webpackJsonpdavinci-dome"]=this["webpackJsonpdavinci-dome"]||[]).push([[0],{26:function(e,t,n){},28:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var o=n(1),i=n.n(o),r=n(7),s=n.n(r),c=(n(26),n(50)),a=n(51),l=n(6),d=(n(27),n(2));n(28);function h(e,t){e.adjacent.push(t),t.adjacent.push(e)}let j;!function(e){e[e.Left=0]="Left",e[e.Right=1]="Right"}(j||(j={}));class p{constructor(e,t,n){if(this.frequency=e,this.radius=t,this.chirality=n,this.vertices=[],g.forEach((e=>this.vertexAt(e))),1===e)b.forEach((e=>{h(this.vertices[e[0]],this.vertices[e[1]])}));else if(2===e){const e=b.map((e=>{const t=this.vertices[e[0]],n=this.vertices[e[1]],o=this.vertexBetween(t,n);return h(t,o),h(o,n),o}));w.forEach((t=>{const n=e[t[0]],o=e[t[1]],i=e[t[2]];h(n,o),h(o,i),h(i,n)}))}else this.buildFaces(this.buildEdgeVertices());this.vertices.forEach((e=>function(e,t){const n=(new d.Vector3).copy(e.location).normalize(),o=e.adjacent.pop();if(!o)throw new Error("No first to pop!");const i=[o],r=t=>{let{location:n}=t;return(new d.Vector3).subVectors(n,e.location).normalize()};for(;e.adjacent.length>0;){const o=i[i.length-1],s=e.adjacent.find((e=>{const i=r(e),s=r(o);if(i.dot(s)<.25)return!1;const c=(new d.Vector3).crossVectors(s,i).dot(n);switch(t){case j.Left:return c>0;case j.Right:return c<0;default:throw new Error("Unknown chirality")}}));if(!s)throw new Error("No next found");i.push(s),e.adjacent=e.adjacent.filter((e=>e.index!==s.index))}e.adjacent=i}(e,n)))}buildEdgeVertices(){const e=[];return b.forEach((t=>{const n=[];let o,i;e.push(n);for(let e=0;e<this.frequency-1;e++){i=o;const r=this.vertices[t[0]],s=this.vertices[t[1]],c=r.location,a=s.location,l=(new d.Vector3).lerpVectors(c,a,(e+1)/this.frequency);o=this.vertexAt(l),n.push(o),i?(h(o,i),e===this.frequency-2&&h(o,s)):h(o,r)}})),e}buildFaces(e){const t=[];x.forEach(((n,o)=>{const i=e=>this.vertices[n[e]],r=i(0).location;for(let e=1;e<this.frequency-1;e++){const n=i(1),o=(new d.Vector3).lerpVectors(r,n.location,e/this.frequency);o.sub(r),t[e-1]=[];for(let s=1;s<this.frequency-e;s++){const n=i(2),c=(new d.Vector3).lerpVectors(r,n.location,s/this.frequency);c.sub(r);const a=(new d.Vector3).copy(r);a.add(o),a.add(c),t[e-1].push(this.vertexAt(a))}}for(let e=0;e<t.length;e++)for(let n=0;n<t[e].length;n++)if(n<t[e].length-1&&h(t[e][n],t[e][n+1]),e>0){const o=t[e][n];h(o,t[e-1][n]),h(o,t[e-1][n+1])}const s=[[],[],[]];for(let e=0;e<this.frequency-2;e++){const n=t.length-e-1;s[0].push(t[e][0]),s[1].push(t[n][t[n].length-1]),s[2].push(t[0][e])}for(let c=0;c<s.length;c++){const n=w[o],i=e[n[c]];for(let e=0;e<t.length;e++){const t=s[c][e];h(t,i[e]),h(t,i[e+1])}}})),v.forEach((t=>{for(let n=0;n<t.length;n++){const o=(n+1)%t.length,i=t[n].front?0:this.frequency-2,r=t[o].front?0:this.frequency-2;h(e[t[n].edge][i],e[t[o].edge][r])}}))}vertexBetween(e,t){const n=(new d.Vector3).copy(e.location).lerp(t.location,.5);return this.vertexAt(n)}vertexAt(e){const t=e.length();e.multiplyScalar(this.radius/t);const n={index:this.vertices.length,location:e,adjacent:[]};return this.vertices.push(n),n}}const u=.5257311121191336,f=.85065080835204,g=[new d.Vector3(+u,0,+f),new d.Vector3(+u,0,-f),new d.Vector3(+f,+u,0),new d.Vector3(-f,+u,0),new d.Vector3(0,+f,+u),new d.Vector3(0,-f,+u),new d.Vector3(-u,0,-f),new d.Vector3(-u,0,+f),new d.Vector3(-f,-u,0),new d.Vector3(+f,-u,0),new d.Vector3(0,-f,-u),new d.Vector3(0,+f,-u)],b=[[0,2],[0,4],[0,5],[0,7],[0,9],[1,10],[1,11],[1,2],[1,6],[1,9],[2,11],[2,4],[2,9],[3,11],[3,4],[3,6],[3,7],[3,8],[4,11],[4,7],[5,10],[5,7],[5,8],[5,9],[6,10],[6,11],[6,8],[7,8],[8,10],[9,10]],x=[[0,2,4],[0,2,9],[0,4,7],[0,5,7],[0,5,9],[1,2,11],[1,2,9],[1,6,10],[1,6,11],[1,9,10],[2,4,11],[3,4,11],[3,4,7],[3,6,11],[3,6,8],[3,7,8],[5,7,8],[5,8,10],[5,9,10],[6,8,10]],w=[[0,11,1],[0,12,4],[1,19,3],[2,21,3],[2,23,4],[7,10,6],[7,12,9],[8,24,5],[8,25,6],[9,29,5],[11,18,10],[14,18,13],[14,19,16],[15,25,13],[15,26,17],[16,27,17],[21,27,22],[22,28,20],[23,29,20],[26,28,24]],v=[[{edge:0,front:!0},{edge:1,front:!0},{edge:3,front:!0},{edge:2,front:!0},{edge:4,front:!0}],[{edge:7,front:!0},{edge:6,front:!0},{edge:8,front:!0},{edge:5,front:!0},{edge:9,front:!0}],[{edge:10,front:!0},{edge:11,front:!0},{edge:0,front:!1},{edge:12,front:!0},{edge:7,front:!1}],[{edge:14,front:!0},{edge:13,front:!0},{edge:15,front:!0},{edge:17,front:!0},{edge:16,front:!0}],[{edge:18,front:!0},{edge:11,front:!1},{edge:1,front:!1},{edge:19,front:!0},{edge:14,front:!1}],[{edge:21,front:!0},{edge:22,front:!0},{edge:20,front:!0},{edge:23,front:!0},{edge:2,front:!1}],[{edge:26,front:!0},{edge:24,front:!0},{edge:8,front:!1},{edge:25,front:!0},{edge:15,front:!1}],[{edge:27,front:!0},{edge:16,front:!1},{edge:19,front:!1},{edge:3,front:!1},{edge:21,front:!1}],[{edge:28,front:!0},{edge:22,front:!1},{edge:27,front:!1},{edge:17,front:!1},{edge:26,front:!1}],[{edge:4,front:!1},{edge:23,front:!1},{edge:29,front:!0},{edge:9,front:!1},{edge:12,front:!1}],[{edge:28,front:!1},{edge:20,front:!1},{edge:29,front:!1},{edge:5,front:!1},{edge:24,front:!1}],[{edge:6,front:!1},{edge:10,front:!1},{edge:18,front:!1},{edge:13,front:!1},{edge:25,front:!1}]];let m;function O(e,t){const n=Math.min(e.index,t.index),o=Math.max(e.index,t.index);return"".concat(n,",").concat(o)}function V(e,t,n){const o=t*(e.chirality===j.Left?1:-1),i=[],r=n?Math.atan(1/1.61803398875):0,s=new d.Vector3(1,0,0);function c(e){const t={index:i.length,point:e,position:m.Above};return i.push(t),t}const a=[],l={};e.vertices.forEach((e=>{e.adjacent.forEach((t=>{if(t.index>e.index)return;const n={index:a.length,joints:[c((new d.Vector3).copy(e.location).applyAxisAngle(s,r)),c(new d.Vector3),c(new d.Vector3),c((new d.Vector3).copy(t.location).applyAxisAngle(s,r))],vertexA:e,vertexB:t};a.push(n),l[O(n.vertexA,n.vertexB)]=n}))}));const h=e.vertices.map((e=>({adjacentBars:e.adjacent.map((t=>l[O(e,t)]))})));function p(e,t,n){const o=(new d.Vector3).crossVectors(e.joints[0].point,e.joints[3].point).normalize(),i=new d.Plane(o);if(h[e.vertexA.index].adjacentBars.findIndex((t=>t.index===e.index))<0)throw new Error("adjacent not found");const r=(e,t)=>(new d.Vector3).copy(t).add((new d.Vector3).subVectors(t,e)),s=new d.Line3(r(t.joints[0].point,t.joints[3].point),r(t.joints[3].point,t.joints[0].point)),c=new d.Vector3;i.intersectLine(s,c);return c.distanceTo(t.joints[0].point)<c.distanceTo(t.joints[3].point)?n?(t.joints[0].point.copy(c),t.joints[0]):(t.joints[1].point.copy(c),t.joints[1]):n?(t.joints[3].point.copy(c),t.joints[3]):(t.joints[2].point.copy(c),t.joints[2])}a.forEach((e=>{const t=(new d.Vector3).lerpVectors(e.joints[0].point,e.joints[3].point,.5).normalize();e.joints[0].point.applyAxisAngle(t,o),e.joints[3].point.applyAxisAngle(t,o)}));const u=[];return h.forEach((e=>{e.adjacentBars.forEach(((t,n)=>{const o=(n+1)%e.adjacentBars.length,i=e.adjacentBars[o],r={jointA:p(t,i,!0),jointB:p(i,t,!1),index:a.length+u.length};u.push(r)}))})),{bars:a,bolts:u,joints:i}}function y(e,t){const n=[...e.joints],o=[...e.bolts],i=new d.Plane(new d.Vector3(0,-1,0),t);n.forEach((e=>{const t=i.distanceToPoint(e.point);e.position=t<=0?m.Above:m.Below}));return{bars:e.bars.map((e=>{const t=new d.Line3(e.joints[0].point,e.joints[3].point),o=i.intersectLine(t,new d.Vector3);if(o){const t={point:o,index:n.length,position:m.OnSurface};return n.push(t),function(e,t){const n=(e.joints[0].position===m.Below?[t,...e.joints]:[...e.joints,t]).filter((e=>e.position!==m.Below));return{...e,joints:n}}(e,t)}return e})),bolts:o,joints:n}}function N(e){return Math.PI*e/180}!function(e){e[e.Above=0]="Above",e[e.Below=1]="Below",e[e.OnSurface=2]="OnSurface"}(m||(m={}));var E=n(5),S=n(4);const A=1e3;function B(e){let{spec:t,setSpec:n,saveCSV:i}=e;const[r,s]=Object(o.useState)(t.frequency.toString()),[c,a]=Object(o.useState)(t.degrees.toString()),[l,d]=Object(o.useState)(t.radius.toString()),[h,j]=Object(o.useState)((t.boltWidth*A).toString()),[p,u]=Object(o.useState)((t.barWidth*A).toString()),[f,g]=Object(o.useState)((t.barHeight*A).toString()),[b,x]=Object(o.useState)((t.barExtension*A).toString()),[w,v]=Object(o.useState)((t.boltExtension*A).toString()),[m,O]=Object(o.useState)(t.planeHeight.toString());function V(e){const t=parseInt(e,10);return!isNaN(t)&&(t<=10&&t>0)}function y(e){const t=parseInt(e,10);return!isNaN(t)&&(t<=90&&t>=-90)}return Object(S.jsxs)(E.b,{onSubmit:e=>{e.preventDefault(),function(){const e={frequency:parseInt(r,10),degrees:parseFloat(c),radius:parseFloat(l),boltWidth:parseFloat(h)/A,barWidth:parseFloat(p)/A,barHeight:parseFloat(f)/A,barExtension:parseFloat(b)/A,boltExtension:parseFloat(w)/A,planeHeight:parseFloat(m)};!V(r)||!y(c)||isNaN(e.radius)||isNaN(e.boltWidth)||isNaN(e.barWidth)||isNaN(e.barHeight)||isNaN(e.barExtension)||isNaN(e.boltExtension)||isNaN(e.planeHeight)||n(e)}()},className:"spec-editor",children:[Object(S.jsx)("h3",{className:"w-100 text-center",children:Object(S.jsx)("a",{target:"_BLANK",href:"https://github.com/CivilSource/DavinciDome",children:"Da Vinci Dome"})}),Object(S.jsx)("hr",{}),Object(S.jsxs)(E.c,{children:[Object(S.jsx)(E.e,{for:"frequency",children:"Frequency [1..10]"}),Object(S.jsx)(E.d,{id:"frequency",value:r,valid:V(r),invalid:!V(r),onChange:e=>{let{target:t}=e;return s(t.value)}})]}),Object(S.jsxs)(E.c,{children:[Object(S.jsx)(E.e,{for:"degrees",children:"Rotation [deg]"}),Object(S.jsx)(E.d,{id:"degrees",value:c,valid:y(c),invalid:!y(c),onChange:e=>{let{target:t}=e;return a(t.value)}})]}),Object(S.jsxs)(E.c,{children:[Object(S.jsx)(E.e,{for:"radius",children:"Radius [m]"}),Object(S.jsx)(E.d,{id:"radius",value:l,valid:!isNaN(parseFloat(l)),invalid:isNaN(parseFloat(l)),onChange:e=>{let{target:t}=e;return d(t.value)}})]}),Object(S.jsxs)(E.c,{children:[Object(S.jsx)(E.e,{for:"boltWidth",children:"Bolt Diam [mm]"}),Object(S.jsx)(E.d,{id:"boltWidth",value:h,valid:!isNaN(parseFloat(h)),invalid:isNaN(parseFloat(h)),onChange:e=>{let{target:t}=e;return j(t.value)}})]}),Object(S.jsxs)(E.c,{children:[Object(S.jsx)(E.e,{for:"barWidth",children:"Bar Width [mm]"}),Object(S.jsx)(E.d,{id:"barWidth",value:p,valid:!isNaN(parseFloat(p)),invalid:isNaN(parseFloat(p)),onChange:e=>{let{target:t}=e;return u(t.value)}})]}),Object(S.jsxs)(E.c,{children:[Object(S.jsx)(E.e,{for:"barHeight",children:"Bar Height [mm]"}),Object(S.jsx)(E.d,{id:"barHeight",value:f,valid:!isNaN(parseFloat(f)),invalid:isNaN(parseFloat(f)),onChange:e=>{let{target:t}=e;return g(t.value)}})]}),Object(S.jsxs)(E.c,{children:[Object(S.jsx)(E.e,{for:"boltExtension",children:"Bolt Extra [mm]"}),Object(S.jsx)(E.d,{id:"boltExtension",value:w,valid:!isNaN(parseFloat(w)),invalid:isNaN(parseFloat(w)),onChange:e=>{let{target:t}=e;return v(t.value)}})]}),Object(S.jsxs)(E.c,{children:[Object(S.jsx)(E.e,{for:"barExtension",children:"Bar Extra [mm]"}),Object(S.jsx)(E.d,{id:"barExtension",value:b,valid:!isNaN(parseFloat(b)),invalid:isNaN(parseFloat(b)),onChange:e=>{let{target:t}=e;return x(t.value)}})]}),Object(S.jsxs)(E.c,{children:[Object(S.jsx)(E.e,{for:"planeHeight",children:"Plane Height [m]"}),Object(S.jsx)(E.d,{id:"planeHeight",value:m,valid:!isNaN(parseFloat(m)),invalid:isNaN(parseFloat(m)),onChange:e=>{let{target:t}=e;return O(t.value)}})]}),Object(S.jsx)("hr",{}),Object(S.jsx)(E.a,{color:"success",className:"w-100 my-1",type:"submit",children:"Regenerate"}),Object(S.jsx)(E.a,{color:"info",className:"w-100",onClick:i,children:"Download"})]})}var F=n(17),H=n.n(F),q=n(18),W=n.n(q);function L(e){return e.toFixed(5).replace(/[.]/,",")}function C(e){const t=new W.a;t.file("support.csv",function(e){const t=e.joints.filter((e=>e.position===m.OnSurface));return'"joints"\n"=""'.concat(t.map((e=>e.index+1)),'"""')}(e)),t.file("nodes.csv",function(e){const t=[];return t.push(["index","x","y","z"]),e.joints.filter((e=>e.position!==m.Below)).forEach(((e,n)=>t.push([(n+1).toFixed(0),L(e.point.x),L(e.point.z),L(e.point.y)]))),t.map((e=>e.join(";"))).join("\n")}(e)),t.file("intervals.csv",function(e){const t=[];return t.push(["joints","type"]),e.daVinciIntervals.forEach(((e,n)=>{const o=e.nodeIndexes.map((e=>e+1)).join(",");t.push(['"=""'.concat(o,'"""'),e.type])})),t.map((e=>e.join(";"))).join("\n")}(e)),t.generateAsync({type:"blob",mimeType:"application/zip"}).then((e=>{H.a.saveAs(e,"davinci-".concat((new Date).toISOString().replace(/[.].*/,"").replace(/[:T_]/g,"-"),".zip"))}))}function z(e){let{position:t,radius:n}=e;return Object(S.jsxs)("mesh",{position:t,children:[Object(S.jsx)("sphereGeometry",{args:[n,32,16]}),Object(S.jsx)("meshPhongMaterial",{color:"red"})]})}const M=new d.Vector3(0,1,0),I=new d.Vector3(0,-1,0);function D(e){let{bar:t,renderSpec:n}=e;const o=t.joints[0],i=t.joints[t.joints.length-1],r=o.point.distanceTo(i.point),s=(new d.Vector3).subVectors(i.point,o.point).normalize(),c=(new d.Vector3).lerpVectors(o.point,i.point,.5),a=(new d.Vector3).crossVectors(c,s).normalize(),l=(new d.Matrix4).makeBasis((new d.Vector3).copy(c).normalize(),s,a).setPosition(c).scale(new d.Vector3(n.barHeight,r+n.barExtension,n.barWidth));return Object(S.jsxs)("mesh",{matrix:l,matrixAutoUpdate:!1,children:[Object(S.jsx)("boxBufferGeometry",{attach:"geometry"}),Object(S.jsx)("meshLambertMaterial",{attach:"material",color:"white"})]})}function P(e){let{bolt:t,renderSpec:n}=e;const o=t.jointA.point.distanceTo(t.jointB.point),i=(new d.Vector3).subVectors(t.jointB.point,t.jointA.point).normalize(),r=(new d.Vector3).lerpVectors(t.jointA.point,t.jointB.point,.5),s=new d.Vector3(n.boltWidth,o+n.boltExtension,n.boltWidth),c=M.dot(i),a=(new d.Euler).setFromQuaternion((new d.Quaternion).setFromUnitVectors(c>0?M:I,i));return Object(S.jsxs)("mesh",{scale:s,rotation:a,position:r,children:[Object(S.jsx)("cylinderBufferGeometry",{attach:"geometry",args:[1,1,1]}),Object(S.jsx)("meshLambertMaterial",{attach:"material",color:"orange"})]})}const T={frequency:2,degrees:30,radius:7,boltWidth:.05,barWidth:.3,barHeight:.06,barExtension:.3,boltExtension:.2,planeHeight:0},k=e=>{let{degrees:t}=e;return t>0?j.Right:j.Left};var R=function(){const[e,t]=Object(o.useState)([window.innerWidth,window.innerHeight]),[n,i]=Object(o.useState)(T),[r,s]=Object(o.useState)(y(V(new p(n.frequency,n.radius,k(n)),N(n.degrees),!0),n.planeHeight)),[h,j]=Object(o.useState)(0);Object(o.useEffect)((()=>{const e=()=>t([window.innerWidth,window.innerHeight]);return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),Object(o.useEffect)((()=>{const{frequency:e,radius:t,degrees:o}=n,i=Math.abs(N(o)),r=V(new p(e,t,k(n)),i,!0);s(y(r,n.planeHeight)),j((e=>e+1))}),[n]);const u=()=>1.5*Math.sqrt(r.joints.filter((e=>e.position!==m.Below)).reduce(((e,t)=>{let{point:n}=t;return Math.max(e,n.x*n.x+n.z*n.z)}),0));return Object(S.jsxs)("div",{className:"App",style:{width:e[0],height:e[1]},children:[Object(S.jsx)(B,{spec:n,setSpec:e=>i(e),saveCSV:()=>C(function(e){let{bars:t,bolts:n,joints:o}=e;const i=[];return t.filter((e=>e.joints[0].position===m.Above||e.joints[e.joints.length-1].position===m.Above)).forEach((e=>{i.push({nodeIndexes:e.joints.map((e=>e.index)),type:"type 1"})})),n.filter((e=>e.jointA.position===m.Above&&e.jointB.position===m.Above)).forEach((e=>{i.push({nodeIndexes:[e.jointA.index,e.jointB.index],type:"type 2"})})),{joints:o,daVinciIntervals:i}}(r))}),Object(S.jsxs)(l.a,{className:"canvas",children:[Object(S.jsx)("ambientLight",{intensity:.05}),Object(S.jsxs)("mesh",{onDoubleClick:e=>{const t=e.face;if(!t)return;const o=new d.Vector3(0,n.planeHeight,0),i=o.distanceTo(e.camera.position);o.add(t.normal.multiplyScalar(i)),e.camera.position.copy(o)},position:new d.Vector3(0,n.planeHeight,0),children:[Object(S.jsx)("boxGeometry",{args:[1,1,1]}),Object(S.jsx)("meshStandardMaterial",{transparent:!0,opacity:.8,color:"orange"})]}),Object(S.jsxs)("mesh",{rotation:new d.Euler(Math.PI/2,0,0),position:new d.Vector3(0,n.planeHeight,0),children:[Object(S.jsx)("circleGeometry",{args:[u(),120]}),Object(S.jsx)("meshStandardMaterial",{transparent:!0,opacity:.9,color:"darkgreen",side:2})]}),r.bars.filter((e=>!(e.joints[0].position===m.Below||e.joints[e.joints.length-1].position===m.Below))).map(((e,t)=>Object(S.jsx)(D,{bar:e,renderSpec:n},"bar-".concat(h,"-#").concat(t)))),r.bolts.filter((e=>e.jointA.position===m.Above||e.jointB.position===m.Above)).map(((e,t)=>Object(S.jsx)(P,{bolt:e,renderSpec:n},"bolt-".concat(h,"-#").concat(t)))),r.joints.filter((e=>e.position===m.OnSurface)).map(((e,t)=>Object(S.jsx)(z,{position:e.point,radius:n.barWidth},"ball-".concat(h,"-#").concat(t)))),Object(S.jsx)("pointLight",{position:[0,10*n.radius,0],color:"white"}),Object(S.jsx)(c.a,{makeDefault:!0,position:new d.Vector3(2*u(),n.planeHeight,0)}),Object(S.jsx)(a.a,{target:new d.Vector3(0,(n.planeHeight+n.radius)/2,0)})]})]})};var G=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,52)).then((t=>{let{getCLS:n,getFID:o,getFCP:i,getLCP:r,getTTFB:s}=t;n(e),o(e),i(e),r(e),s(e)}))};s.a.render(Object(S.jsx)(i.a.StrictMode,{children:Object(S.jsx)(R,{})}),document.getElementById("root")),G()}},[[41,1,2]]]);
//# sourceMappingURL=main.b7cc78de.chunk.js.map