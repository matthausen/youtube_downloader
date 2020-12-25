(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{100:function(e,t,n){},101:function(e,t,n){"use strict";n.r(t);var a=n(4),c=n(0),i=n.n(c),o=n(12),r=n.n(o),s=(n(76),n(23)),l=n(34),j=n.n(l),d=n(124),b=n(125),u=n(134),p=n(128),O=n(137),h=n(133),f=n(130),x=n(60),m=n.n(x),g=n(61),v=n.n(g),S=n(62),C=n.n(S),N=n(44),_=n(126),T=n(41),y=n(140),w=n(141),E=n(135),k=n(127),A=n(142),D=n(129),I=n(136),P=n(131),F=n(132),R=n(59),L=n.n(R),B=n(43),W=n.n(B),H=Object(d.a)((function(e){return{root:{width:"100%",backgroundColor:e.palette.background.paper},actions:{display:"flex",justifyContent:"center",alignItems:"center",padding:e.spacing(4)},duration:{"& > span":{float:"right"}},chips:{display:"flex",justifyContent:"center",flexWrap:"wrap","& > *":{margin:e.spacing(.5)}},whitechapelColor:{color:"#ff5252"},chip:{backgroundColor:"#ff5252",color:"#ffffff"},clearAllIcon:{margin:10,fontSize:"2rem",color:"#ff5252"},downlaodIcon:{margin:10,fontSize:"2em",color:"#ff5252"},songCard:{margin:10,padding:10},thumbnail:{margin:"0 10px"}}}));function K(e){var t=e.tracks,n=H(),i=Object(c.useState)([]),o=Object(s.a)(i,2),r=o[0],l=o[1],d=Object(c.useState)(!1),O=Object(s.a)(d,2),h=O[0],x=O[1],m=Object(c.useState)(!1),g=Object(s.a)(m,2),v=g[0],S=g[1],C=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).API_URL,R=function(e){return function(){var t=r.indexOf(e),n=Object(N.a)(r);-1===t?n.push(e):n.splice(t,1),l(n)}},B=function(e){S(!0),j.a.post("".concat(C,"/api/download-songs"),e,{headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){200===e.status&&(console.log("The response: ".concat(e)),S(!1),x(!0))}))};return Object(a.jsx)(b.a,{maxWidth:"lg",children:Object(a.jsxs)(u.a,{p:6,children:[v&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(_.a,{className:n.whitechapelColor}),Object(a.jsx)(T.a,{variant:"body1",component:"p",children:"Converting to mp3...please wait"})]}),h&&Object(a.jsx)("a",{href:"".concat(C,"/api/download-zip"),children:"Download as .zip"}),r&&r.length>0?Object(a.jsxs)(u.a,{children:[Object(a.jsx)("div",{className:n.chips,children:r.map((function(e){return Object(a.jsx)(y.a,{avatar:Object(a.jsx)(w.a,{alt:"Song",src:e.thumbnails[0]}),label:e.title,onDelete:function(){return function(e){var t=r.indexOf(e),n=Object(N.a)(r);n.splice(t,1),l(n)}(e)},className:n.chip})}))}),Object(a.jsxs)("div",{className:n.actions,children:[Object(a.jsx)(E.a,{title:"Download All","aria-label":"download-all",children:Object(a.jsx)(W.a,{className:n.downlaodIcon,color:"secondary",onClick:function(){return B(r.map((function(e){return e.id})))}})}),Object(a.jsx)(E.a,{title:"Clear All","aria-label":"clear-all",children:Object(a.jsx)(L.a,{className:n.clearAllIcon,color:"secondary",onClick:function(){return l([])}})})]})]}):null,t.videos.length>0?Object(a.jsx)(k.a,{className:n.root,children:t.videos.map((function(e){var t=e.id,c=e.title,i=e.thumbnails,o=e.duration,s="checkbox-list-label-".concat(c);return Object(a.jsx)(p.a,{className:n.songCard,elevation:3,children:Object(a.jsxs)(A.a,{role:void 0,dense:!0,button:!0,onClick:R(e),children:[Object(a.jsx)(D.a,{children:Object(a.jsx)(I.a,{edge:"start",checked:-1!==r.indexOf(e),tabIndex:-1,disableRipple:!0,inputProps:{"aria-labelledby":s}})}),Object(a.jsx)(w.a,{className:n.thumbnail,alt:"thumbnail",src:i[0]}),Object(a.jsx)(P.a,{id:s,primary:"".concat(c)}),Object(a.jsx)(P.a,{className:n.duration,id:s,primary:"min ".concat(o)}),Object(a.jsx)(F.a,{children:Object(a.jsx)(E.a,{title:"Convert song to mp3","aria-label":"convert-song",children:Object(a.jsx)(f.a,{edge:"end","aria-label":"comments",children:Object(a.jsx)(W.a,{onClick:function(){return B([t])}})})})})]},t)})}))}):Object(a.jsx)(T.a,{variant:"body1",component:"p",children:"No results were found \ud83d\ude1e. Please try again"})]})})}var U=Object(d.a)((function(e){return{root:{padding:"2px 4px",display:"flex",alignItems:"center",width:400,margin:"0 auto"},input:{marginLeft:e.spacing(1),flex:1},iconButton:{padding:10,color:"#ff5252"},divider:{height:28,margin:4}}}));function z(){var e=U(),t=Object(c.useState)(),n=Object(s.a)(t,2),i=n[0],o=n[1],r=Object(c.useState)(),l=Object(s.a)(r,2),d=l[0],x=l[1];return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(b.a,{children:Object(a.jsx)(u.a,{p:6,children:Object(a.jsxs)(p.a,{component:"form",className:e.root,onSubmit:function(e){e.preventDefault();var t=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).API_URL;j.a.post("".concat(t,"/api/fetch-songs"),i,{headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return x(e.data)}))},children:[Object(a.jsx)(f.a,{className:e.iconButton,"aria-label":"menu",children:Object(a.jsx)(m.a,{})}),Object(a.jsx)(O.a,{autoFocus:!0,className:e.input,onChange:function(e){o(e.target.value)},placeholder:"Search for a song or an artist",inputProps:{"aria-label":"search song or artist"}}),Object(a.jsx)(f.a,{type:"submit",className:e.iconButton,"aria-label":"search",children:Object(a.jsx)(v.a,{})}),Object(a.jsx)(h.a,{className:e.divider,orientation:"vertical"}),Object(a.jsx)(f.a,{className:e.iconButton,"aria-label":"directions",children:Object(a.jsx)(C.a,{})})]})})}),d&&Object(a.jsx)(K,{tracks:d})]})}n(100);var J=function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(z,{})})},V=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,143)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),i(e),o(e)}))};r.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(J,{})}),document.getElementById("root")),V()},76:function(e,t,n){}},[[101,1,2]]]);
//# sourceMappingURL=main.bebd8254.chunk.js.map