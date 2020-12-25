(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{100:function(e,t,a){},101:function(e,t,a){"use strict";a.r(t);var n=a(4),c=a(0),i=a.n(c),o=a(12),r=a.n(o),s=(a(76),a(23)),l=a(34),j=a.n(l),d=a(124),b=a(125),u=a(134),p=a(128),h=a(137),f=a(133),O=a(130),x=a(60),m=a.n(x),g=a(61),v=a.n(g),C=a(62),N=a.n(C),y=a(44),w=a(126),k=a(41),S=a(140),I=a(141),A=a(135),F=a(127),B=a(142),D=a(129),P=a(136),T=a(131),z=a(132),L=a(59),J=a.n(L),W=a(43),E=a.n(W),M=Object(d.a)((function(e){return{root:{width:"100%",backgroundColor:e.palette.background.paper},actions:{display:"flex",justifyContent:"center",alignItems:"center",padding:e.spacing(4)},duration:{"& > span":{float:"right"}},chips:{display:"flex",justifyContent:"center",flexWrap:"wrap","& > *":{margin:e.spacing(.5)}},whitechapelColor:{color:"#ff5252"},chip:{backgroundColor:"#ff5252",color:"#ffffff"},clearAllIcon:{margin:10,fontSize:"2rem",color:"#ff5252"},downlaodIcon:{margin:10,fontSize:"2em",color:"#ff5252"},songCard:{margin:10,padding:10},thumbnail:{margin:"0 10px"}}}));function R(e){var t=e.tracks,a=M(),i=Object(c.useState)([]),o=Object(s.a)(i,2),r=o[0],l=o[1],d=Object(c.useState)(!1),h=Object(s.a)(d,2),f=h[0],x=h[1],m=Object(c.useState)(!1),g=Object(s.a)(m,2),v=g[0],C=g[1],N=function(e){return function(){var t=r.indexOf(e),a=Object(y.a)(r);-1===t?a.push(e):a.splice(t,1),l(a)}},L=function(e){C(!0),j.a.post("/api/download-songs",e,{headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){200===e.status&&(console.log("The response: ".concat(e)),C(!1),x(!0))}))};return Object(n.jsx)(b.a,{maxWidth:"lg",children:Object(n.jsxs)(u.a,{p:6,children:[v&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(w.a,{className:a.whitechapelColor}),Object(n.jsx)(k.a,{variant:"body1",component:"p",children:"Converting to mp3...please wait"})]}),f&&Object(n.jsx)("a",{href:"/api/download-zip",children:"Download as .zip"}),r&&r.length>0?Object(n.jsxs)(u.a,{children:[Object(n.jsx)("div",{className:a.chips,children:r.map((function(e){return Object(n.jsx)(S.a,{avatar:Object(n.jsx)(I.a,{alt:"Song",src:e.thumbnails[0]}),label:e.title,onDelete:function(){return function(e){var t=r.indexOf(e),a=Object(y.a)(r);a.splice(t,1),l(a)}(e)},className:a.chip})}))}),Object(n.jsxs)("div",{className:a.actions,children:[Object(n.jsx)(A.a,{title:"Download All","aria-label":"download-all",children:Object(n.jsx)(E.a,{className:a.downlaodIcon,color:"secondary",onClick:function(){return L(r.map((function(e){return e.id})))}})}),Object(n.jsx)(A.a,{title:"Clear All","aria-label":"clear-all",children:Object(n.jsx)(J.a,{className:a.clearAllIcon,color:"secondary",onClick:function(){return l([])}})})]})]}):null,t.videos.length>0?Object(n.jsx)(F.a,{className:a.root,children:t.videos.map((function(e){var t=e.id,c=e.title,i=e.thumbnails,o=e.duration,s="checkbox-list-label-".concat(c);return Object(n.jsx)(p.a,{className:a.songCard,elevation:3,children:Object(n.jsxs)(B.a,{role:void 0,dense:!0,button:!0,onClick:N(e),children:[Object(n.jsx)(D.a,{children:Object(n.jsx)(P.a,{edge:"start",checked:-1!==r.indexOf(e),tabIndex:-1,disableRipple:!0,inputProps:{"aria-labelledby":s}})}),Object(n.jsx)(I.a,{className:a.thumbnail,alt:"thumbnail",src:i[0]}),Object(n.jsx)(T.a,{id:s,primary:"".concat(c)}),Object(n.jsx)(T.a,{className:a.duration,id:s,primary:"min ".concat(o)}),Object(n.jsx)(z.a,{children:Object(n.jsx)(A.a,{title:"Convert song to mp3","aria-label":"convert-song",children:Object(n.jsx)(O.a,{edge:"end","aria-label":"comments",children:Object(n.jsx)(E.a,{onClick:function(){return L([t])}})})})})]},t)})}))}):Object(n.jsx)(k.a,{variant:"body1",component:"p",children:"No results were found \ud83d\ude1e. Please try again"})]})})}var q=Object(d.a)((function(e){return{root:{padding:"2px 4px",display:"flex",alignItems:"center",width:400,margin:"0 auto"},input:{marginLeft:e.spacing(1),flex:1},iconButton:{padding:10,color:"#ff5252"},divider:{height:28,margin:4}}}));function G(){var e=q(),t=Object(c.useState)(),a=Object(s.a)(t,2),i=a[0],o=a[1],r=Object(c.useState)(),l=Object(s.a)(r,2),d=l[0],x=l[1];return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(b.a,{children:Object(n.jsx)(u.a,{p:6,children:Object(n.jsxs)(p.a,{component:"form",className:e.root,onSubmit:function(e){e.preventDefault(),j.a.post("/api/fetch-songs",i,{headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return x(e.data)}))},children:[Object(n.jsx)(O.a,{className:e.iconButton,"aria-label":"menu",children:Object(n.jsx)(m.a,{})}),Object(n.jsx)(h.a,{autoFocus:!0,className:e.input,onChange:function(e){o(e.target.value)},placeholder:"Search for a song or an artist",inputProps:{"aria-label":"search song or artist"}}),Object(n.jsx)(O.a,{type:"submit",className:e.iconButton,"aria-label":"search",children:Object(n.jsx)(v.a,{})}),Object(n.jsx)(f.a,{className:e.divider,orientation:"vertical"}),Object(n.jsx)(O.a,{className:e.iconButton,"aria-label":"directions",children:Object(n.jsx)(N.a,{})})]})})}),d&&Object(n.jsx)(R,{tracks:d})]})}a(100);var H=function(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsx)(G,{})})},K=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,143)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,o=t.getTTFB;a(e),n(e),c(e),i(e),o(e)}))};r.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(H,{})}),document.getElementById("root")),K()},76:function(e,t,a){}},[[101,1,2]]]);
//# sourceMappingURL=main.138f753c.chunk.js.map