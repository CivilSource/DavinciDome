(this["webpackJsonpdavinci-dome"]=this["webpackJsonpdavinci-dome"]||[]).push([[0],{45:function(e,t,n){},47:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var r,o=n(1),i=n.n(o),a=n(18),c=n.n(a),s=(n(45),n(13)),d=n(70),u=n(71),f=n(16),l=(n(46),n(14)),j=(n(47),n(6)),h=n(2),b=n(3);function p(e,t){e.adjacent.push(t),t.adjacent.push(e)}!function(e){e[e.Left=0]="Left",e[e.Right=1]="Right"}(r||(r={}));var g=function(){function e(t,n,o){var i=this;if(Object(h.a)(this,e),this.frequency=t,this.radius=n,this.chirality=o,this.vertices=[],O.forEach((function(e){return i.vertexAt(e)})),1===t)w.forEach((function(e){p(i.vertices[e[0]],i.vertices[e[1]])}));else if(2===t){var a=w.map((function(e){var t=i.vertices[e[0]],n=i.vertices[e[1]],r=i.vertexBetween(t,n);return p(t,r),p(r,n),r}));m.forEach((function(e){var t=a[e[0]],n=a[e[1]],r=a[e[2]];p(t,n),p(n,r),p(r,t)}))}else this.buildFaces(this.buildEdgeVertices());this.vertices.forEach((function(e){return function(e,t){var n=(new j.Vector3).copy(e.location).normalize(),o=e.adjacent.pop();if(!o)throw new Error("No first to pop!");var i=[o],a=function(t){var n=t.location;return(new j.Vector3).subVectors(n,e.location).normalize()},c=function(){var o=i[i.length-1],c=e.adjacent.find((function(e){var i=a(e),c=a(o);if(i.dot(c)<.25)return!1;var s=(new j.Vector3).crossVectors(c,i).dot(n);switch(t){case r.Left:return s>0;case r.Right:return s<0;default:throw new Error("Unknown chirality")}}));if(!c)throw new Error("No next found");i.push(c),e.adjacent=e.adjacent.filter((function(e){return e.index!==c.index}))};for(;e.adjacent.length>0;)c();e.adjacent=i}(e,o)}))}return Object(b.a)(e,[{key:"buildEdgeVertices",value:function(){var e=this,t=[];return w.forEach((function(n){var r,o,i=[];t.push(i);for(var a=0;a<e.frequency-1;a++){o=r;var c=e.vertices[n[0]],s=e.vertices[n[1]],d=c.location,u=s.location,f=(new j.Vector3).lerpVectors(d,u,(a+1)/e.frequency);r=e.vertexAt(f),i.push(r),o?(p(r,o),a===e.frequency-2&&p(r,s)):p(r,c)}})),t}},{key:"buildFaces",value:function(e){var t=this,n=[];y.forEach((function(r,o){for(var i=function(e){return t.vertices[r[e]]},a=i(0).location,c=1;c<t.frequency-1;c++){var s=i(1),d=(new j.Vector3).lerpVectors(a,s.location,c/t.frequency);d.sub(a),n[c-1]=[];for(var u=1;u<t.frequency-c;u++){var f=i(2),l=(new j.Vector3).lerpVectors(a,f.location,u/t.frequency);l.sub(a);var h=(new j.Vector3).copy(a);h.add(d),h.add(l),n[c-1].push(t.vertexAt(h))}}for(var b=0;b<n.length;b++)for(var g=0;g<n[b].length;g++)if(g<n[b].length-1&&p(n[b][g],n[b][g+1]),b>0){var v=n[b][g];p(v,n[b-1][g]),p(v,n[b-1][g+1])}for(var x=[[],[],[]],O=0;O<t.frequency-2;O++){var w=n.length-O-1;x[0].push(n[O][0]),x[1].push(n[w][n[w].length-1]),x[2].push(n[0][O])}for(var y=0;y<x.length;y++)for(var V=m[o],N=e[V[y]],E=0;E<n.length;E++){var A=x[y][E];p(A,N[E]),p(A,N[E+1])}})),V.forEach((function(n){for(var r=0;r<n.length;r++){var o=(r+1)%n.length,i=n[r].front?0:t.frequency-2,a=n[o].front?0:t.frequency-2;p(e[n[r].edge][i],e[n[o].edge][a])}}))}},{key:"vertexBetween",value:function(e,t){var n=(new j.Vector3).copy(e.location).lerp(t.location,.5);return this.vertexAt(n)}},{key:"vertexAt",value:function(e){var t=e.length();e.multiplyScalar(this.radius/t);var n={index:this.vertices.length,location:e,adjacent:[]};return this.vertices.push(n),n}}]),e}(),v=.5257311121191336,x=.85065080835204,O=[new j.Vector3(+v,0,+x),new j.Vector3(+v,0,-x),new j.Vector3(+x,+v,0),new j.Vector3(-x,+v,0),new j.Vector3(0,+x,+v),new j.Vector3(0,-x,+v),new j.Vector3(-v,0,-x),new j.Vector3(-v,0,+x),new j.Vector3(-x,-v,0),new j.Vector3(+x,-v,0),new j.Vector3(0,-x,-v),new j.Vector3(0,+x,-v)],w=[[0,2],[0,4],[0,5],[0,7],[0,9],[1,10],[1,11],[1,2],[1,6],[1,9],[2,11],[2,4],[2,9],[3,11],[3,4],[3,6],[3,7],[3,8],[4,11],[4,7],[5,10],[5,7],[5,8],[5,9],[6,10],[6,11],[6,8],[7,8],[8,10],[9,10]],y=[[0,2,4],[0,2,9],[0,4,7],[0,5,7],[0,5,9],[1,2,11],[1,2,9],[1,6,10],[1,6,11],[1,9,10],[2,4,11],[3,4,11],[3,4,7],[3,6,11],[3,6,8],[3,7,8],[5,7,8],[5,8,10],[5,9,10],[6,8,10]],m=[[0,11,1],[0,12,4],[1,19,3],[2,21,3],[2,23,4],[7,10,6],[7,12,9],[8,24,5],[8,25,6],[9,29,5],[11,18,10],[14,18,13],[14,19,16],[15,25,13],[15,26,17],[16,27,17],[21,27,22],[22,28,20],[23,29,20],[26,28,24]],V=[[{edge:0,front:!0},{edge:1,front:!0},{edge:3,front:!0},{edge:2,front:!0},{edge:4,front:!0}],[{edge:7,front:!0},{edge:6,front:!0},{edge:8,front:!0},{edge:5,front:!0},{edge:9,front:!0}],[{edge:10,front:!0},{edge:11,front:!0},{edge:0,front:!1},{edge:12,front:!0},{edge:7,front:!1}],[{edge:14,front:!0},{edge:13,front:!0},{edge:15,front:!0},{edge:17,front:!0},{edge:16,front:!0}],[{edge:18,front:!0},{edge:11,front:!1},{edge:1,front:!1},{edge:19,front:!0},{edge:14,front:!1}],[{edge:21,front:!0},{edge:22,front:!0},{edge:20,front:!0},{edge:23,front:!0},{edge:2,front:!1}],[{edge:26,front:!0},{edge:24,front:!0},{edge:8,front:!1},{edge:25,front:!0},{edge:15,front:!1}],[{edge:27,front:!0},{edge:16,front:!1},{edge:19,front:!1},{edge:3,front:!1},{edge:21,front:!1}],[{edge:28,front:!0},{edge:22,front:!1},{edge:27,front:!1},{edge:17,front:!1},{edge:26,front:!1}],[{edge:4,front:!1},{edge:23,front:!1},{edge:29,front:!0},{edge:9,front:!1},{edge:12,front:!1}],[{edge:28,front:!1},{edge:20,front:!1},{edge:29,front:!1},{edge:5,front:!1},{edge:24,front:!1}],[{edge:6,front:!1},{edge:10,front:!1},{edge:18,front:!1},{edge:13,front:!1},{edge:25,front:!1}]];function N(e,t){var n=Math.min(e.index,t.index),r=Math.max(e.index,t.index);return"".concat(n,",").concat(r)}function E(e,t){var n=t*(e.chirality===r.Left?1:-1),o=[];function i(e){var t={index:o.length,point:e};return o.push(t),t}var a=[],c={};e.vertices.forEach((function(e){e.adjacent.forEach((function(t){if(!(t.index>e.index)){var n=a.length,r=i((new j.Vector3).copy(e.location)),o=i(new j.Vector3),s=i(new j.Vector3),d={index:n,jointA:r,jointD:i((new j.Vector3).copy(t.location)),jointB:o,jointC:s,vertexA:e,vertexB:t};a.push(d),c[N(d.vertexA,d.vertexB)]=d}}))}));var s=e.vertices.map((function(e){return{adjacentBars:e.adjacent.map((function(t){return c[N(e,t)]}))}}));function d(e,t,n){var r=(new j.Vector3).crossVectors(e.jointA.point,e.jointD.point).normalize(),o=new j.Plane(r);if(s[e.vertexA.index].adjacentBars.findIndex((function(t){return t.index===e.index}))<0)throw new Error("adjacent not found");var i=function(e,t){return(new j.Vector3).copy(t).add((new j.Vector3).subVectors(t,e))},a=new j.Line3(i(t.jointA.point,t.jointD.point),i(t.jointD.point,t.jointA.point)),c=new j.Vector3;return o.intersectLine(a,c),c.distanceTo(t.jointA.point)<c.distanceTo(t.jointD.point)?n?(t.jointA.point.copy(c),t.jointA):(t.jointB.point.copy(c),t.jointB):n?(t.jointD.point.copy(c),t.jointD):(t.jointC.point.copy(c),t.jointC)}a.forEach((function(e){var t=e.jointA,r=e.jointD,o=(new j.Vector3).lerpVectors(t.point,r.point,.5).normalize();t.point.applyAxisAngle(o,n),r.point.applyAxisAngle(o,n)}));var u=[];return s.forEach((function(e){e.adjacentBars.forEach((function(t,n){var r=(n+1)%e.adjacentBars.length,o=e.adjacentBars[r],i={jointA:d(t,o,!0),jointB:d(o,t,!1),index:a.length+u.length};u.push(i)}))})),{bars:a,bolts:u,joints:o}}function A(e){return Math.PI*e/180}var S=n(9);function F(e){var t=e.spec,n=e.setSpec,r=Object(o.useState)(t.frequency.toString()),i=Object(s.a)(r,2),a=i[0],c=i[1],d=Object(o.useState)(t.degrees.toString()),u=Object(s.a)(d,2),f=u[0],j=u[1],h=Object(o.useState)(t.radius.toString()),b=Object(s.a)(h,2),p=b[0],g=b[1],v=Object(o.useState)(t.boltWidth.toString()),x=Object(s.a)(v,2),O=x[0],w=x[1],y=Object(o.useState)(t.barWidth.toString()),m=Object(s.a)(y,2),V=m[0],N=m[1],E=Object(o.useState)(t.barHeight.toString()),A=Object(s.a)(E,2),F=A[0],B=A[1],D=Object(o.useState)(t.barExtension.toString()),q=Object(s.a)(D,2),C=q[0],W=q[1],L=Object(o.useState)(t.boltExtension.toString()),z=Object(s.a)(L,2),I=z[0],k=z[1];function M(e){var t=parseInt(e,10);return!isNaN(t)&&(t<=10&&t>0)}return Object(S.jsxs)(l.b,{onSubmit:function(e){e.preventDefault(),function(){var e={frequency:parseInt(a,10),degrees:parseFloat(f),radius:parseFloat(p),boltWidth:parseFloat(O),barWidth:parseFloat(V),barHeight:parseFloat(F),barExtension:parseFloat(C),boltExtension:parseFloat(I)};!M(a)||isNaN(e.degrees)||isNaN(e.radius)||isNaN(e.boltWidth)||isNaN(e.barWidth)||isNaN(e.barHeight)||isNaN(e.barExtension)||isNaN(e.boltExtension)||n(e)}()},className:"top-left bg-light",children:[Object(S.jsx)(l.c,{children:Object(S.jsx)("h3",{children:Object(S.jsx)("a",{target:"_BLANK",href:"https://github.com/CivilSource/DavinciDome",children:"Da Vinci App"})})}),Object(S.jsxs)(l.c,{children:[Object(S.jsx)(l.e,{for:"frequency",children:"Frequency (1-10)"}),Object(S.jsx)(l.d,{id:"frequency",value:a,valid:M(a),invalid:!M(a),onChange:function(e){var t=e.target;return c(t.value)}})]}),Object(S.jsxs)(l.c,{children:[Object(S.jsx)(l.e,{for:"degrees",children:"Degrees"}),Object(S.jsx)(l.d,{id:"degrees",value:f,valid:!isNaN(parseFloat(f)),invalid:isNaN(parseFloat(f)),onChange:function(e){var t=e.target;return j(t.value)}})]}),Object(S.jsxs)(l.c,{children:[Object(S.jsx)(l.e,{for:"radius",children:"Radius"}),Object(S.jsx)(l.d,{id:"radius",value:p,valid:!isNaN(parseFloat(p)),invalid:isNaN(parseFloat(p)),onChange:function(e){var t=e.target;return g(t.value)}})]}),Object(S.jsxs)(l.c,{children:[Object(S.jsx)(l.e,{for:"boltWidth",children:"Bolt Width"}),Object(S.jsx)(l.d,{id:"boltWidth",value:O,valid:!isNaN(parseFloat(O)),invalid:isNaN(parseFloat(O)),onChange:function(e){var t=e.target;return w(t.value)}})]}),Object(S.jsxs)(l.c,{children:[Object(S.jsx)(l.e,{for:"barWidth",children:"Bar Width"}),Object(S.jsx)(l.d,{id:"barWidth",value:V,valid:!isNaN(parseFloat(V)),invalid:isNaN(parseFloat(V)),onChange:function(e){var t=e.target;return N(t.value)}})]}),Object(S.jsxs)(l.c,{children:[Object(S.jsx)(l.e,{for:"barHeight",children:"Bar Height"}),Object(S.jsx)(l.d,{id:"barHeight",value:F,valid:!isNaN(parseFloat(F)),invalid:isNaN(parseFloat(F)),onChange:function(e){var t=e.target;return B(t.value)}})]}),Object(S.jsxs)(l.c,{children:[Object(S.jsx)(l.e,{for:"boltExtension",children:"Bolt Extension"}),Object(S.jsx)(l.d,{id:"boltExtension",value:I,valid:!isNaN(parseFloat(I)),invalid:isNaN(parseFloat(I)),onChange:function(e){var t=e.target;return k(t.value)}})]}),Object(S.jsxs)(l.c,{children:[Object(S.jsx)(l.e,{for:"barExtension",children:"Bar Extension"}),Object(S.jsx)(l.d,{id:"barExtension",value:C,valid:!isNaN(parseFloat(C)),invalid:isNaN(parseFloat(C)),onChange:function(e){var t=e.target;return W(t.value)}})]}),Object(S.jsx)("hr",{}),Object(S.jsx)(l.c,{children:Object(S.jsx)(l.a,{className:"w-100",type:"submit",children:"Generate"})})]})}var B=n(36),D=n.n(B),q=n(37),C=n.n(q);function W(e){return e.toFixed(5).replace(/[.]/,",")}function L(e){var t=new C.a;t.file("joints.csv",function(e){var t=[];return t.push(["index","x","y","z"]),e.joints.forEach((function(e,n){return t.push([(n+1).toFixed(0),W(e.point.x),W(e.point.y),W(e.point.z)])})),t.map((function(e){return e.join(";")})).join("\n")}(e)),t.file("intervals.csv",function(e){var t=[];return t.push(["joints","type"]),e.daVinciIntervals.forEach((function(e,n){var r=e.nodeIndexes.map((function(e){return e+1})).join(",");t.push(['"=""'.concat(r,'"""'),e.type])})),t.map((function(e){return e.join(";")})).join("\n")}(e)),t.generateAsync({type:"blob",mimeType:"application/zip"}).then((function(e){D.a.saveAs(e,"davinci-".concat((new Date).toISOString().replace(/[.].*/,"").replace(/[:T_]/g,"-"),".zip"))}))}var z=new j.Vector3(0,1,0),I=new j.Vector3(0,-1,0);function k(e){var t=e.bar,n=e.renderSpec,r=t.jointA.point.distanceTo(t.jointD.point),o=(new j.Vector3).subVectors(t.jointD.point,t.jointA.point).normalize(),i=(new j.Vector3).lerpVectors(t.jointA.point,t.jointD.point,.5),a=(new j.Vector3).crossVectors(i,o).normalize(),c=(new j.Matrix4).makeBasis((new j.Vector3).copy(i).normalize(),o,a).setPosition(i).scale(new j.Vector3(n.barHeight,r+n.barExtension,n.barWidth));return Object(S.jsxs)("mesh",{matrix:c,matrixAutoUpdate:!1,children:[Object(S.jsx)("boxBufferGeometry",{attach:"geometry"}),Object(S.jsx)("meshLambertMaterial",{attach:"material",color:"white"})]})}function M(e){var t=e.bolt,n=e.renderSpec,r=t.jointA.point.distanceTo(t.jointB.point),o=(new j.Vector3).subVectors(t.jointB.point,t.jointA.point).normalize(),i=(new j.Vector3).lerpVectors(t.jointA.point,t.jointB.point,.5),a=new j.Vector3(n.boltWidth,r+n.boltExtension,n.boltWidth),c=z.dot(o),s=(new j.Euler).setFromQuaternion((new j.Quaternion).setFromUnitVectors(c>0?z:I,o));return Object(S.jsxs)("mesh",{scale:a,rotation:s,position:i,children:[Object(S.jsx)("cylinderBufferGeometry",{attach:"geometry",args:[1,1,1]}),Object(S.jsx)("meshLambertMaterial",{attach:"material",color:"orange"})]})}var H={frequency:2,degrees:30,radius:7,boltWidth:.05,barWidth:.3,barHeight:.02,barExtension:.3,boltExtension:.2},T=function(e){return e.degrees>0?r.Right:r.Left};var P=function(){var e=Object(o.useState)(H),t=Object(s.a)(e,2),n=t[0],r=t[1],i=Object(o.useState)(new g(n.frequency,n.radius,T(n))),a=Object(s.a)(i,2),c=a[0],j=a[1],h=Object(o.useState)(E(c,A(n.degrees))),b=Object(s.a)(h,2),p=b[0],v=b[1],x=Object(o.useState)(0),O=Object(s.a)(x,2),w=O[0],y=O[1];return Object(o.useEffect)((function(){var e=n.frequency,t=n.radius,r=n.degrees,o=Math.abs(A(r)),i=new g(e,t,T(n));j(i),v(E(i,o)),y((function(e){return e+1}))}),[n]),Object(S.jsxs)("div",{className:"App",children:[Object(S.jsx)("div",{className:"bottom-left",children:Object(S.jsx)(l.a,{onClick:function(){return L(function(e,t,n){var r=[];return e.forEach((function(e){r.push({nodeIndexes:[e.jointA.index,e.jointB.index,e.jointC.index,e.jointD.index],type:"type 1"})})),t.forEach((function(e){r.push({nodeIndexes:[e.jointA.index,e.jointB.index],type:"type 2"})})),{joints:n,daVinciIntervals:r}}(p.bars,p.bolts,p.joints))},children:"Download"})}),Object(S.jsx)(F,{spec:n,setSpec:function(e){return r(e)}}),Object(S.jsxs)(f.a,{className:"Canvas",children:[Object(S.jsx)("ambientLight",{intensity:.05}),Object(S.jsxs)("mesh",{onDoubleClick:function(e){var t=e.face;if(t){var n=t.normal.multiplyScalar(e.camera.position.length());e.camera.position.copy(n)}},children:[Object(S.jsx)("boxGeometry",{args:[1,1,1]}),Object(S.jsx)("meshStandardMaterial",{transparent:!0,opacity:.8,color:"orange"})]}),p.bars.map((function(e,t){return Object(S.jsx)(k,{bar:e,renderSpec:n},"bar-".concat(w,"-#").concat(t))})),p.bolts.map((function(e,t){return Object(S.jsx)(M,{bolt:e,renderSpec:n},"bolt-".concat(w,"-#").concat(t))})),Object(S.jsx)(d.a,{makeDefault:!0,position:[3*n.radius,0,0],children:Object(S.jsx)("pointLight",{position:[0,10*n.radius,0],color:"white"})}),Object(S.jsx)(u.a,{})]})]})},R=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,72)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),r(e),o(e),i(e),a(e)}))};c.a.render(Object(S.jsx)(i.a.StrictMode,{children:Object(S.jsx)(P,{})}),document.getElementById("root")),R()}},[[61,1,2]]]);
//# sourceMappingURL=main.192a2484.chunk.js.map