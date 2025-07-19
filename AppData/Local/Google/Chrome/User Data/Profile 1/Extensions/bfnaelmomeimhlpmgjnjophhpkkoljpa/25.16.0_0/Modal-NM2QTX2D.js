import{a as v}from"./chunk-HYWTTNE6.js";import{c as A}from"./chunk-CUH334XZ.js";import{c as k}from"./chunk-FRKRTBHN.js";import{V as b,ib as C,p as e}from"./chunk-FIPJHJBF.js";import{Ld as u}from"./chunk-P6FNF3PO.js";import"./chunk-WFPABEAU.js";import"./chunk-ISLSTDN4.js";import"./chunk-7EAYY6PT.js";import"./chunk-VPAI5YFM.js";import"./chunk-TB3UVYOQ.js";import{Da as w,j as h,s as c,v as d,w as T}from"./chunk-E25H5Y2I.js";import"./chunk-5CNB4EIU.js";import"./chunk-IW23UAMS.js";import"./chunk-27NXJJ7L.js";import{a as D}from"./chunk-UA6ADLWZ.js";import"./chunk-TVMPABNZ.js";import"./chunk-4M6V6BRQ.js";import"./chunk-UNDMYLJW.js";import{f as I,h as g,n as y}from"./chunk-3KENBVE7.js";g();y();var o=I(D());var F=16,P=e.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  height: 100%;
`,M=e.div`
  overflow: scroll;
`,$=e.div`
  margin: 45px 16px 16px 16px;
  padding-top: 16px;
`,z=e(A)`
  left: ${F}px;
  position: absolute;
`,S=e.div`
  align-items: center;
  background: ${c.colors.legacy.bgWallet};
  border-bottom: 1px solid ${c.colors.legacy.borderSecondary};
  display: flex;
  height: 46px;
  padding: ${F}px;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`,W=e.div`
  display: flex;
  flex: 1;
  justify-content: center;
`,B=e.footer`
  margin-top: auto;
  flex-shrink: 0;
  min-height: 16px;
`,H=e(C)`
  text-align: left;
`;H.defaultProps={margin:"12px 0px"};var G=e(C).attrs({size:16,weight:500,lineHeight:25})``;function L(r){let{actions:i,shortcuts:p,trackAction:n,onClose:s}=r;return(0,o.useMemo)(()=>{let a=i.more.map(t=>{let x=d[u(t.type)],l=t.isDestructive?"accentAlert":"textPrimary";return{start:o.default.createElement(x,{size:18,type:t.type,color:l}),topLeft:{text:t.text,color:l},onClick:()=>{n(t),s(),t.onClick(t.type)}}}),m=p?.map(t=>{let x=d[u(t.type)],l=t.isDestructive?"accentAlert":"textPrimary";return{start:o.default.createElement(x,{size:18,color:l}),topLeft:{text:t.text,color:l},onClick:()=>{n(t),s(),t.onClick(t.type)}}})??[];return[{rows:a},{rows:m}]},[i,s,p,n])}function N(r){let{t:i}=h(),{headerText:p,hostname:n,shortcuts:s}=r,f=L(r);return o.default.createElement(P,null,o.default.createElement(M,null,o.default.createElement(S,{onClick:r.onClose},o.default.createElement(z,null,o.default.createElement(b,null)),o.default.createElement(W,null,o.default.createElement(G,null,p))),o.default.createElement($,null,o.default.createElement(T,{gap:"section"},f.map((a,m)=>o.default.createElement(w,{key:`group-${m}`,rows:a.rows}))),o.default.createElement(B,null,n&&s&&s.length>0&&o.default.createElement(H,{color:c.colors.legacy.textSecondary,size:14,lineHeight:17},i("shortcutsWarningDescription",{url:n})))),o.default.createElement(v,{removeFooterExpansion:!0},o.default.createElement(k,{onClick:r.onClose},i("commandClose")))))}var Y=N;export{N as CTAModal,Y as default};
//# sourceMappingURL=Modal-NM2QTX2D.js.map
