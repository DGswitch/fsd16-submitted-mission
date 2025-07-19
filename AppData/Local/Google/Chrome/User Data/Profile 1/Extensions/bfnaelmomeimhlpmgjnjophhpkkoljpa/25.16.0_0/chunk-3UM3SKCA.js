import{z}from"./chunk-AWXKHRGR.js";import{c as $}from"./chunk-CUH334XZ.js";import{V as E,fa as U,ha as R,ib as B,p as h}from"./chunk-FIPJHJBF.js";import{d as H}from"./chunk-MWXM4F4N.js";import{a as de}from"./chunk-WFPABEAU.js";import{Bc as k,Md as N}from"./chunk-7EAYY6PT.js";import{C as O,D as W,s as y}from"./chunk-E25H5Y2I.js";import{d as F,ka as w}from"./chunk-27NXJJ7L.js";import{a as g}from"./chunk-UA6ADLWZ.js";import{f as m,h as a,n as s}from"./chunk-3KENBVE7.js";a();s();var A=m(g());a();s();var G=m(g());function K(){var e=(0,G.useRef)(!0);return e.current?(e.current=!1,!0):e.current}var pe=function(e,t){return e===t};function C(e,t){t===void 0&&(t=pe);var o=(0,A.useRef)(),r=(0,A.useRef)(e),d=K();return!d&&!t(r.current,e)&&(o.current=r.current,r.current=e),o.current}a();s();a();s();var j=function(){};function q(e){for(var t=[],o=1;o<arguments.length;o++)t[o-1]=arguments[o];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function J(e){for(var t=[],o=1;o<arguments.length;o++)t[o-1]=arguments[o];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var V=typeof self<"u";a();s();var v=m(g());var ce=["mousedown","touchstart"],me=function(e,t,o){o===void 0&&(o=ce);var r=(0,v.useRef)(t);(0,v.useEffect)(function(){r.current=t},[t]),(0,v.useEffect)(function(){for(var d=function(u){var c=e.current;c&&!c.contains(u.target)&&r.current(u)},f=0,l=o;f<l.length;f++){var p=l[f];q(document,p,d)}return function(){for(var u=0,c=o;u<c.length;u++){var M=c[u];J(document,M,d)}}},[o,e])},xe=me;a();s();var b=m(g());var ge=V?b.useLayoutEffect:b.useEffect,Q=ge;a();s();var S=m(g()),he=function(e,t){var o=(0,S.useRef)(function(){});(0,S.useEffect)(function(){o.current=e}),(0,S.useEffect)(function(){if(t!==null){var r=setInterval(function(){return o.current()},t||0);return function(){return clearInterval(r)}}},[t])},we=he;a();s();var P=m(g());function X(e){var t=(0,P.useRef)();return(0,P.useEffect)(function(){t.current=e}),t.current}a();s();var D=m(g());var Z={x:0,y:0,width:0,height:0,top:0,left:0,bottom:0,right:0};function ve(){var e=(0,D.useState)(null),t=e[0],o=e[1],r=(0,D.useState)(Z),d=r[0],f=r[1],l=(0,D.useMemo)(function(){return new self.ResizeObserver(function(p){if(p[0]){var u=p[0].contentRect,c=u.x,M=u.y,se=u.width,ue=u.height,ne=u.top,ie=u.left,fe=u.bottom,le=u.right;f({x:c,y:M,width:se,height:ue,top:ne,left:ie,bottom:fe,right:le})}})},[]);return Q(function(){if(t)return l.observe(t),function(){l.disconnect()}},[t]),[o,d]}var Se=V&&typeof self.ResizeObserver<"u"?ve:function(){return[j,Z]};a();s();var Y=m(de()),n=m(g());var _=(0,n.createContext)({pushDetailViewCallback:()=>w,pushDetailView:w,popDetailView:w,resetDetailView:w,detailViewStackLength:0}),De=h(O.div)`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-height: ${e=>e.theme?.detailViewMaxHeight??"100%"};
  min-height: ${e=>e.theme?.detailViewMinHeight??"initial"};
`,Dt=n.default.memo(({children:e,shouldResetOnAccountChange:t,shouldPushDetailView:o})=>{let{detailViewStack:r,setDetailViewStack:d,pushDetailView:f,...l}=Ce(),{data:p}=N();return(0,n.useEffect)(()=>{t&&d([])},[p,d,t]),(0,n.useEffect)(()=>{o&&f(e)},[e,o,f]),n.default.createElement(_.Provider,{value:{...l,pushDetailView:f,detailViewStackLength:r.length}},n.default.createElement(be,{stack:r},e))}),ye=navigator.webdriver?0:500,Ce=()=>{let[e,t]=(0,n.useState)([]),o=(0,n.useMemo)(()=>(0,Y.default)(l=>{t(p=>k(p,u=>{u.push(l)}))},ye,{leading:!0,trailing:!1}),[t]),r=(0,n.useCallback)(()=>{t(l=>k(l,p=>{p.pop()}))},[t]),d=(0,n.useCallback)(l=>()=>{o(l)},[o]),f=(0,n.useCallback)(()=>()=>{t([])},[t]);return(0,n.useMemo)(()=>({detailViewStack:e,setDetailViewStack:t,pushDetailView:o,popDetailView:r,resetDetailView:f,pushDetailViewCallback:d}),[e,r,o,f,d])},Ve=.15,be=({children:e,stack:t})=>{let o=C(t,(u,c)=>u?.length===c.length),r=F(t),d=t.length>(o??[]).length,f=o===void 0,l=f?0:d?10:-10,p=f?1:0;return n.default.createElement(W,{mode:"wait"},n.default.createElement(De,{key:`${t.length}_${o?.length}`,initial:{x:l,opacity:p},animate:{x:0,opacity:1},exit:{opacity:0},transition:{duration:Ve},ref:Pe},r||e))},I=()=>{let e=(0,n.useContext)(_);if(!e)throw new Error("Missing detail view context");return e},Pe=e=>{e&&e.parentElement&&(e.parentElement.scrollTop=0)};a();s();var L=m(g()),Le=(0,L.createContext)({isOpen:!1,showSettingsMenu:w,hideSettingsMenu:w}),ee=()=>(0,L.useContext)(Le);a();s();var i=m(g());var te=h.section`
  z-index: 1;
  background-color: ${y.colors.legacy.bgWallet};
  padding: 10px 16px;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  justify-content: ${e=>e.justifyContent};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${y.colors.legacy.borderSecondary};
  height: ${e=>e.height}px;
  width: 100%;
`;te.defaultProps={justifyContent:"center",height:H};var oe=h(B).attrs({size:16,weight:500,lineHeight:25})``;oe.defaultProps={maxWidth:"280px",noWrap:!0};var Me=h.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  padding-bottom: 17px;
  position: relative;
  width: 100%;
`,re=h(z)`
  position: absolute;
  right: 0;
`,T=h($)`
  position: absolute;
  left: 0;
`,Nt=({children:e,items:t,sections:o,icon:r,shouldWrap:d,onIconClick:f,onLeftButtonClick:l,useCloseButton:p})=>{let u=He({withCloseButton:p??!1,onLeftButtonClick:l}),c=o&&o.length>0||t&&t.length>0;return i.default.createElement(Me,null,u,i.default.createElement(B,{weight:500,size:22,noWrap:!d,maxWidth:"280px"},e),c||f?i.default.createElement(re,{sections:o,items:t,icon:r||i.default.createElement(U,null),onIconClick:f}):i.default.createElement("div",null))},ae=h(te)`
  position: relative;
  border-bottom: none;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -20px;
    width: calc(100% + 40px);
    border-bottom: 1px solid ${y.colors.legacy.borderSecondary};
  }
`,ke=h.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`,Ot=({children:e,sections:t,items:o,icon:r,shouldWrap:d,onIconClick:f,onLeftButtonClick:l,disableIconBackground:p})=>{let u=Ee(l),c=t&&t.length>0||o&&o.length>0;return i.default.createElement(ae,null,u,i.default.createElement(ke,null,typeof e=="string"?i.default.createElement(oe,{noWrap:!d},e):e),c||f?i.default.createElement(re,{sections:t,items:o,icon:r,onIconClick:f,disableIconBackground:p}):i.default.createElement("div",null))};ae.defaultProps={justifyContent:"center",height:H};var He=({withCloseButton:e,onLeftButtonClick:t})=>{let{popDetailView:o,detailViewStackLength:r}=I();return(0,i.useMemo)(()=>r===0?i.default.createElement("div",null):i.default.createElement(T,{onClick:()=>{t?.(),o()},"data-testid":"header--back"},e?i.default.createElement(E,null):i.default.createElement(R,null)),[e])},Ee=e=>{let{hideSettingsMenu:t}=ee(),{popDetailView:o,detailViewStackLength:r}=I();return(0,i.useMemo)(()=>r>0?i.default.createElement(T,{onClick:()=>{o()},"data-testid":"header--back"},i.default.createElement(R,null)):i.default.createElement(T,{"data-testid":"settings-menu-close-button",onClick:e??t},i.default.createElement(E,null)),[])};export{xe as a,we as b,X as c,C as d,Se as e,Dt as f,I as g,Le as h,ee as i,te as j,Nt as k,Ot as l};
//# sourceMappingURL=chunk-3UM3SKCA.js.map
