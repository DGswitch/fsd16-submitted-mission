import{a as Z}from"./chunk-PUYPLNV5.js";import{a as j}from"./chunk-ADUTHCOE.js";import{a as G}from"./chunk-KD7R5Z7P.js";import{a as U}from"./chunk-VA4ZDM4D.js";import{b as F}from"./chunk-JMVEP6NO.js";import{b as $}from"./chunk-ENOJJTZZ.js";import"./chunk-SJMXUFWH.js";import{Ka as K}from"./chunk-IWELHSHA.js";import{l as B}from"./chunk-GQXAN4MD.js";import"./chunk-QSCY46GS.js";import"./chunk-MDZMKEZM.js";import"./chunk-RXCJQWLX.js";import"./chunk-YQCQ4MB2.js";import{a as x}from"./chunk-OHAHQ6TH.js";import"./chunk-N7HMUOOL.js";import"./chunk-CQVRVBRD.js";import"./chunk-ZOT2E2W3.js";import"./chunk-ZQGFKLTM.js";import"./chunk-6CJ7SBO7.js";import"./chunk-BFYHQRJ5.js";import"./chunk-FOWWPYB2.js";import"./chunk-YN56PGWE.js";import{g as Q}from"./chunk-P6A2XCI3.js";import"./chunk-ACPUL5BT.js";import{a as O}from"./chunk-4OJLPFQL.js";import"./chunk-3UM3SKCA.js";import"./chunk-XCXTYR6X.js";import{a as V}from"./chunk-HYWTTNE6.js";import"./chunk-F2XESPWP.js";import"./chunk-AWXKHRGR.js";import"./chunk-CUH334XZ.js";import"./chunk-Z2TWY6BT.js";import"./chunk-CLYKGO52.js";import"./chunk-QVBWEOIX.js";import"./chunk-7YL3G7GY.js";import"./chunk-AU2X2JVL.js";import"./chunk-MI4RUDWH.js";import{c as z}from"./chunk-FRKRTBHN.js";import{D as N,ib as y,p as s}from"./chunk-FIPJHJBF.js";import"./chunk-KRVIHM5V.js";import"./chunk-UCBZOSRF.js";import{P as E,T as A,V as D,W as _,l as P}from"./chunk-KFAB2DSY.js";import"./chunk-7ZN6LOJ6.js";import"./chunk-HCIXRSEY.js";import"./chunk-FU7K6O6V.js";import"./chunk-TQFGOCJD.js";import"./chunk-3R4YQLLG.js";import"./chunk-MWXM4F4N.js";import"./chunk-CQI745PK.js";import"./chunk-WOJPTGRH.js";import"./chunk-P6FNF3PO.js";import"./chunk-WFPABEAU.js";import"./chunk-ISLSTDN4.js";import{Db as M,Nd as W}from"./chunk-7EAYY6PT.js";import"./chunk-VPAI5YFM.js";import"./chunk-TB3UVYOQ.js";import{j as p,pa as L,q as v,s as f,sa as k}from"./chunk-E25H5Y2I.js";import"./chunk-5CNB4EIU.js";import"./chunk-IW23UAMS.js";import"./chunk-27NXJJ7L.js";import{a as H}from"./chunk-UA6ADLWZ.js";import"./chunk-TVMPABNZ.js";import"./chunk-4M6V6BRQ.js";import"./chunk-O2N6PUOM.js";import"./chunk-UNDMYLJW.js";import"./chunk-ICCUGV36.js";import{f as T,h as S,n as I}from"./chunk-3KENBVE7.js";S();I();var t=T(H());S();I();var o=T(H());var J=v({marginLeft:4}),R=s(x).attrs({align:"center",padding:"10px"})`
  background-color: ${f.colors.legacy.bgRow};
  border-radius: 6px;
  height: 74px;
  margin: 4px 0;
`,Y=s.div`
  display: flex;
  align-items: center;
`,tt=s(O)`
  flex: 1;
  min-width: 0;
  text-align: left;
  align-items: normal;
`,et=s(y).attrs({size:16,weight:600,lineHeight:19,noWrap:!0,maxWidth:"175px",textAlign:"left"})``,ot=s(y).attrs({color:f.colors.legacy.textSecondary,size:14,lineHeight:17,noWrap:!0})`
  text-align: left;
  margin-top: 5px;
`,it=s.div`
  width: 55px;
  min-width: 55px;
  max-width: 55px;
  height: 55px;
  min-height: 55px;
  max-height: 55px;
  aspect-ratio: 1;
  margin-right: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`,X=o.default.memo(e=>{let{t:n}=p(),{collection:i,unknownItem:m,isHidden:r,isSpam:a,onToggleHidden:d}=e,{name:c,id:g}=i,l=D(i),h=l?.chainData,C=_(i),u=A(l?.media,"image",!1,"small"),b=c||l?.name||m;return o.default.createElement(R,null,o.default.createElement(it,null,a&&r?o.default.createElement(Z,{width:32}):u?o.default.createElement(F,{uri:u}):P(h)?o.default.createElement(j,{...h.utxoDetails}):o.default.createElement($,{type:"image",width:42})),o.default.createElement(x,null,o.default.createElement(tt,null,o.default.createElement(Y,null,o.default.createElement(et,null,b),a?o.default.createElement(N,{className:J,fill:f.colors.legacy.accentWarning,height:16,width:16}):null),o.default.createElement(ot,null,n("collectiblesSearchNrOfItems",{nrOfItems:C})))),o.default.createElement(U,{id:g,label:`${c} visible`,checked:!r,onChange:w=>{d(w.target.checked?"show":"hide")}}))});var nt=74,lt=10,st=nt+lt,rt=20,at=s.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`,mt=s.div`
  position: relative;
  width: 100%;
`,ct=()=>{let{handleHideModalVisibility:e}=K(),{data:n,isPending:i}=W(),{viewState:m,viewStateLoading:r}=E({account:n}),a=(0,t.useCallback)(()=>e("collectiblesVisibility"),[e]),d=(0,t.useMemo)(()=>({...m,handleCloseModal:a}),[a,m]),c=(0,t.useMemo)(()=>i||r,[i,r]);return{data:d,loading:c}},dt=t.default.memo(e=>{let{t:n}=p(),i=(0,t.useRef)(null);return(0,t.useEffect)(()=>{setTimeout(()=>i.current?.focus(),200)},[]),t.default.createElement(t.default.Fragment,null,t.default.createElement(mt,null,t.default.createElement(Q,{ref:i,tabIndex:0,placeholder:n("assetListSearch"),maxLength:M,onChange:e.handleSearch,value:e.searchQuery,name:"Search collectibles"})),t.default.createElement(B,null,t.default.createElement(L,null,({height:m,width:r})=>t.default.createElement(k,{style:{padding:`${rt}px 0`},scrollToIndex:e.searchQuery!==e.debouncedSearchQuery?0:void 0,height:m,width:r,rowCount:e.listItems.length,rowHeight:st,rowRenderer:a=>t.default.createElement(pt,{...a,data:e.listItems,unknownItem:n("assetListUnknownToken"),getIsHidden:e.getIsHidden,getIsSpam:e.getIsSpam,getSpamStatus:e.getSpamStatus,onToggleHidden:e.onToggleHidden})}))))}),pt=e=>{let{index:n,data:i,style:m,unknownItem:r,getIsHidden:a,getIsSpam:d,getSpamStatus:c,onToggleHidden:g}=e,l=i[n],h=a(l),C=d(l),u=c(l),b=(0,t.useCallback)(w=>g({item:l,status:w}),[g,l]);return t.default.createElement("div",{style:m},t.default.createElement(X,{collection:l,unknownItem:r,isHidden:h,isSpam:C,spamStatus:u,onToggleHidden:b}))},gt=()=>{let{data:e,loading:n}=ct(),{t:i}=p();return t.default.createElement(at,null,n?t.default.createElement(G,null):t.default.createElement(dt,{...e}),t.default.createElement(V,null,t.default.createElement(z,{onClick:e.handleCloseModal},i("commandClose"))))},$t=gt;export{gt as CollectiblesVisibilityPage,$t as default};
//# sourceMappingURL=CollectiblesVisibilityPage-TWQYDZ6E.js.map
