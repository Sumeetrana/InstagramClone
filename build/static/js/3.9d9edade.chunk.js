(this["webpackJsonpinstagram-react12"]=this["webpackJsonpinstagram-react12"]||[]).push([[3],{336:function(e,t,n){"use strict";function a(e){return(a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function s(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function i(e,t){return!t||"object"!==a(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e,t,n){return(c="undefined"!==typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var a=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=l(e)););return e}(e,t);if(a){var r=Object.getOwnPropertyDescriptor(a,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var p=n(0),m=n(337),f=m.canvasStyle,d=m.mirrorProps,b=n(338).omit;function v(e,t){if("letters"!==t&&"words"!==t)throw new Error("Unsupported options basedOn: ".concat(t));if(e.nodeType===Node.TEXT_NODE){var n,a=document.createDocumentFragment();switch(t){case"words":n=e.textContent.split(/\b|(?=\W)/);break;case"letters":n=Array.from(e.textContent)}n.forEach((function(e){a.appendChild(function(e){var t=document.createElement("span");return t.className="LinesEllipsis-unit",t.textContent=e,t}(e))})),e.parentNode.replaceChild(a,e)}else if(e.nodeType===Node.ELEMENT_NODE)for(var r=[].slice.call(e.childNodes),o=r.length,s=0;s<o;s++)v(r[s],t)}function h(e){e.parentNode.replaceChild(document.createTextNode(e.textContent),e)}function y(e,t){if(t.contains(e)&&e!==t){for(;e.nextElementSibling;)e.parentNode.removeChild(e.nextElementSibling);y(e.parentNode,t)}}function g(e){for(var t=e;t=t.parentNode;)if(/p|div|main|section|h\d|ul|ol|li/.test(t.tagName.toLowerCase()))return t}function E(e){return!(!e.offsetHeight||!e.offsetWidth&&!/\S/.test(e.textContent))}var O={component:"div",unsafeHTML:"",maxLine:1,ellipsis:"\u2026",ellipsisHTML:void 0,className:"",basedOn:void 0,onReflow:function(){},winWidth:void 0},j=Object.keys(O),w=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=i(this,l(t).call(this,e))).state={html:e.unsafeHTML,clamped:!1},n.canvas=null,n.maxLine=0,n.nlUnits=[],n}var n,a,m;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(t,e),n=t,(a=[{key:"componentDidMount",value:function(){this.initCanvas(),this.reflow(this.props)}},{key:"componentDidUpdate",value:function(e){e.winWidth!==this.props.winWidth&&this.copyStyleToCanvas(),this.props!==e&&this.reflow(this.props)}},{key:"componentWillUnmount",value:function(){this.canvas.parentNode.removeChild(this.canvas)}},{key:"setState",value:function(e,n){return"undefined"!==typeof e.clamped&&(this.clamped=e.clamped),c(l(t.prototype),"setState",this).call(this,e,n)}},{key:"initCanvas",value:function(){if(!this.canvas){var e=this.canvas=document.createElement("div");e.className="LinesEllipsis-canvas ".concat(this.props.className),e.setAttribute("aria-hidden","true"),this.copyStyleToCanvas(),Object.keys(f).forEach((function(t){e.style[t]=f[t]})),document.body.appendChild(e)}}},{key:"copyStyleToCanvas",value:function(){var e=this,t=window.getComputedStyle(this.target);d.forEach((function(n){e.canvas.style[n]=t[n]}))}},{key:"reflow",value:function(e){this.maxLine=+e.maxLine||1,this.canvas.innerHTML=e.unsafeHTML;var t=e.basedOn||(/^[\x00-\x7F]+$/.test(e.unsafeHTML)?"words":"letters");v(this.canvas,t);var n={clamped:this.putEllipsis(this.calcIndexes()),html:this.canvas.innerHTML};this.setState(n,e.onReflow.bind(this,n))}},{key:"calcIndexes",value:function(){var e=[0],t=this.nlUnits=Array.from(this.canvas.querySelectorAll(".LinesEllipsis-unit")),n=t.length;if(!t.length)return e;var a=t.find(E);if(!a)return e;for(var r=1,o=a.offsetTop,s=1;s<n&&!(E(t[s])&&t[s].offsetTop-o>1&&(r++,e.push(s),o=t[s].offsetTop,r>this.maxLine));s++);return e}},{key:"putEllipsis",value:function(e){if(e.length<=this.maxLine)return!1;this.nlUnits=this.nlUnits.slice(0,e[this.maxLine]);var t=this.nlUnits.pop(),n=this.makeEllipsisSpan();do{y(t,this.canvas),g(t).appendChild(n),t=this.nlUnits.pop()}while(t&&(!E(t)||n.offsetHeight>t.offsetHeight||n.offsetTop>t.offsetTop));return t&&h(t),this.nlUnits.forEach(h),!0}},{key:"makeEllipsisSpan",value:function(){var e=this.props,t=e.ellipsisHTML,n=e.ellipsis,a=document.createElement("span");a.appendChild(document.createElement("wbr"));var r=document.createElement("span");return r.className="LinesEllipsis-ellipsis",t?r.innerHTML=t:r.textContent=n,a.appendChild(r),a}},{key:"isClamped",value:function(){return this.clamped}},{key:"render",value:function(){var e=this,t=this.state,n=t.html,a=t.clamped,s=this.props,i=s.component,c=s.className,l=s.unsafeHTML,u=o(s,["component","className","unsafeHTML"]);return p.createElement(i,r({className:"LinesEllipsis ".concat(a?"LinesEllipsis--clamped":""," ").concat(c),ref:function(t){return e.target=t}},b(u,j)),p.createElement("div",{dangerouslySetInnerHTML:{__html:a?n:l}}))}}])&&s(n.prototype,a),m&&s(n,m),t}(p.Component);w.defaultProps=O,e.exports=w},337:function(e,t,n){"use strict";e.exports={canvasStyle:{position:"absolute",bottom:0,left:0,height:0,overflow:"hidden","padding-top":0,"padding-bottom":0,border:"none"},mirrorProps:["box-sizing","width","font-size","font-weight","font-family","font-style","letter-spacing","text-indent","white-space","word-break","overflow-wrap","padding-left","padding-right"]}},338:function(e,t,n){"use strict";function a(e){return(a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e.exports={omit:function(e,t){if(!e||"object"!==a(e))return e;var n={};return Object.keys(e).forEach((function(a){t.indexOf(a)>-1||(n[a]=e[a])})),n}}},339:function(e,t,n){"use strict";n.r(t);var a=n(19),r=n(37),o=n(2),s=n(0),i=n.n(s),c=n(12),l=n(82),u=n(23),p=n(25),m=n(52),f=n(79),d=n(332),b=n(115),v=n(330),h=n(336),y=n.n(h),g=n(100),E=n(143),O=n(75),j=n(144),w=n.n(j),k=n(30),N=n(34),x=n(14),C=n(65);function S(e){var t=e.likes,n=e.postId,a=e.authorId,s=Object(c.i)(),l=i.a.useContext(C.a),p=l.currentUserId,m=l.feedIds,f=t.some((function(e){return e.user_id===p})),d=i.a.useState(f),b=Object(o.a)(d,2),v=b[0],h=b[1],y=v?u.s:u.k,g=v?s.liked:s.like,E=v?function(){h(!1),S({variables:_,update:I})}:function(){h(!0),j({variables:_,update:I})},O=Object(x.c)(k.i),j=Object(o.a)(O,1)[0],w=Object(x.c)(k.l),S=Object(o.a)(w,1)[0],_={postId:n,userId:p,profileId:a};function I(e,t){var n,a={limit:2,feedIds:m},o=e.readQuery({query:N.d,variables:a}),s="likes_mutation_response"===(null===(n=t.data.insert_likes)||void 0===n?void 0:n.__typename)?1:-1,i=o.posts.map((function(e){return Object(r.a)({},e,{likes_aggregate:Object(r.a)({},e.likes_aggregate,{aggregate:Object(r.a)({},e.likes_aggregate.aggregate,{count:e.likes_aggregate.aggregate.count+s})})})}));e.writeQuery({query:N.d,data:{posts:i}})}return i.a.createElement(y,{className:g,onClick:E})}function _(e){var t=e.savedPosts,n=e.postId,a=Object(c.i)(),r=i.a.useContext(C.a).currentUserId,s=t.some((function(e){return e.user_id===r})),l=i.a.useState(s),p=Object(o.a)(l,2),m=p[0],f=p[1],d=m?u.p:u.q,b=m?function(){f(!1),g({variables:E})}:function(){f(!0),h({variables:E})},v=Object(x.c)(k.j),h=Object(o.a)(v,1)[0],y=Object(x.c)(k.m),g=Object(o.a)(y,1)[0],E={postId:n,userId:r};return i.a.createElement(d,{className:a.saveIcon,onClick:b})}function I(e){var t=e.postId,n=i.a.useContext(C.a),l=n.currentUserId,u=n.feedIds,p=Object(c.i)(),m=Object(s.useState)(""),d=Object(o.a)(m,2),b=d[0],h=d[1],y=Object(x.c)(k.b),g=Object(o.a)(y,1)[0];function E(e,n){var o={limit:2,feedIds:u},s=e.readQuery({query:N.d,variables:o});console.log({data:s,result:n});var i=n.data.insert_comments.returning[0],c=Object(r.a)({},i,{user:Object(r.a)({},i.user)}),l=s.posts.map((function(e){var n=Object(r.a)({},e,{comments:[].concat(Object(a.a)(e.comments),[c]),comments_aggregate:Object(r.a)({},e.comments_aggregate,{aggregate:Object(r.a)({},e.comments_aggregate,{count:e.comments_aggregate.aggregate.count+1})})});return e.id===t?n:e}));e.writeQuery({query:N.d,data:{posts:l}}),h("")}return i.a.createElement("div",{className:p.commentContainer},i.a.createElement(v.a,{fullWidth:!0,value:b,placeholder:"Add a comment...",multiline:!0,rowsMax:2,rows:1,onChange:function(e){return h(e.target.value)},className:p.textField,InputProps:{classes:{root:p.root,underline:p.underline}}}),i.a.createElement(f.a,{onClick:function(){g({variables:{content:b,postId:t,userId:l},update:E})},color:"primary",className:p.commentButton,disabled:!b.trim()},"Post"))}t.default=function(e){var t=e.post,n=e.index,a=Object(c.i)(),r=Object(s.useState)(!1),v=Object(o.a)(r,2),h=v[0],j=v[1],k=Object(s.useState)(!1),N=Object(o.a)(k,2),x=N[0],C=N[1],L=t.media,T=t.id,M=t.likes,P=t.user,H=t.caption,U=t.comments,W=t.comments_aggregate,D=t.likes_aggregate,q=t.saved_posts,R=t.location,A=t.created_at,B=1===n,F=D.aggregate.count,Q=W.aggregate.count;return i.a.createElement(i.a.Fragment,null,i.a.createElement("article",{className:a.article,style:{marginBottom:B&&30}},i.a.createElement("div",{className:a.postHeader},i.a.createElement(l.a,{user:P,location:R}),i.a.createElement(u.o,{className:a.MoreIcon,onClick:function(){return C(!0)}})),i.a.createElement("div",null,i.a.createElement(w.a,{src:L,alt:"Post media",className:a.image})),i.a.createElement("div",{className:a.postButtonsWrapper},i.a.createElement("div",{className:a.postButtons},i.a.createElement(S,{likes:M,postId:T,authorId:P.id}),i.a.createElement(p.b,{to:"/p/".concat(T)},i.a.createElement(u.c,null)),i.a.createElement(u.r,null),i.a.createElement(_,{savedPosts:q,postId:T})),i.a.createElement(m.a,{className:a.likes,variant:"subtitle2"},i.a.createElement("span",null,1===F?"1 like":"".concat(F," likes"))),i.a.createElement("div",{className:h?a.expanded:a.collapsed},i.a.createElement(p.b,{to:"/".concat(P.username)},i.a.createElement(m.a,{variant:"subtitle2",component:"span",className:a.username},P.username)),h?i.a.createElement(m.a,{variant:"body2",component:"span",dangerouslySetInnerHTML:{__html:H}}):i.a.createElement("div",{className:a.captionWrapper},i.a.createElement(y.a,{unsafeHTML:H,className:a.caption,maxLine:"0",ellipsis:"...",basedOn:"letters"}),i.a.createElement(f.a,{className:a.moreButton,onClick:function(){return j(!0)}},"More"))),i.a.createElement(p.b,{to:"/p/".concat(T)},i.a.createElement(m.a,{className:a.commentsLink,variant:"body2",component:"div"},"View all ",Q," comments")),U.map((function(e){return i.a.createElement("div",{key:e.id},i.a.createElement(p.b,{to:"/".concat(e.user.username)},i.a.createElement(m.a,{variant:"subtitle2",component:"span",className:a.commentUsername},e.user.username)," ",i.a.createElement(m.a,{variant:"body2",component:"span"},e.content)))})),i.a.createElement(m.a,{color:"textSecondary",className:a.datePosted},Object(O.a)(A))),i.a.createElement(d.a,{xsDown:!0},i.a.createElement(b.a,null),i.a.createElement(I,{postId:T}))),B&&i.a.createElement(g.a,null),x&&i.a.createElement(E.a,{authorId:P.id,postId:T,onClose:function(){return C(!1)}}))}}}]);
//# sourceMappingURL=3.9d9edade.chunk.js.map