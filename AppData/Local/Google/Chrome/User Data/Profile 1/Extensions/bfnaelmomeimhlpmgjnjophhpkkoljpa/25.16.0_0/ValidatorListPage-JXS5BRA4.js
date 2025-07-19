import{a as U}from"./chunk-6O7PPKOD.js";import{c as k,g as b,l as P,n as H,o as W}from"./chunk-GQXAN4MD.js";import"./chunk-QSCY46GS.js";import"./chunk-RXCJQWLX.js";import"./chunk-OHAHQ6TH.js";import{a as V,b as F}from"./chunk-N7HMUOOL.js";import{a as p,b as f,e as z}from"./chunk-CQVRVBRD.js";import"./chunk-ZOT2E2W3.js";import"./chunk-FOWWPYB2.js";import{g as L}from"./chunk-P6A2XCI3.js";import"./chunk-4OJLPFQL.js";import{g as S}from"./chunk-3UM3SKCA.js";import"./chunk-XCXTYR6X.js";import{a as I}from"./chunk-HYWTTNE6.js";import"./chunk-AWXKHRGR.js";import"./chunk-CUH334XZ.js";import"./chunk-CLYKGO52.js";import"./chunk-7YL3G7GY.js";import"./chunk-AU2X2JVL.js";import{c as T}from"./chunk-FRKRTBHN.js";import{ib as l,p as i}from"./chunk-FIPJHJBF.js";import"./chunk-7ZN6LOJ6.js";import{B as x,z as w}from"./chunk-FU7K6O6V.js";import"./chunk-TQFGOCJD.js";import"./chunk-MWXM4F4N.js";import"./chunk-CQI745PK.js";import"./chunk-WOJPTGRH.js";import"./chunk-P6FNF3PO.js";import"./chunk-WFPABEAU.js";import"./chunk-ISLSTDN4.js";import{$b as A}from"./chunk-7EAYY6PT.js";import"./chunk-VPAI5YFM.js";import"./chunk-TB3UVYOQ.js";import{j as s,pa as v,s as d,w as C}from"./chunk-E25H5Y2I.js";import"./chunk-5CNB4EIU.js";import"./chunk-IW23UAMS.js";import{Y as y,v as h}from"./chunk-27NXJJ7L.js";import{a as O}from"./chunk-UA6ADLWZ.js";import"./chunk-TVMPABNZ.js";import"./chunk-4M6V6BRQ.js";import"./chunk-UNDMYLJW.js";import"./chunk-ICCUGV36.js";import{f as j,h as u,n as g}from"./chunk-3KENBVE7.js";u();g();var t=j(O());var G=o=>{let{t:e}=s(),{searchResults:r,isLoading:n,hasError:a,isSuccess:m,showApy:D,onRefetch:B,setSearchTerm:M}=w(),c=(0,t.useRef)();return(0,t.useEffect)(()=>{setTimeout(()=>c.current?.focus(),200)},[]),t.default.createElement(W,{isLoading:n},a?t.default.createElement(k,{title:e("errorAndOfflineSomethingWentWrong"),description:e("validatorListErrorFetching"),refetch:B}):t.default.createElement(Q,null,t.default.createElement(X,null,t.default.createElement(L,{ref:c,tabIndex:0,placeholder:e("commandSearch"),onChange:_=>M(_.currentTarget.value),maxLength:50})),m&&r.length?t.default.createElement(q,{data:r,showApy:D}):t.default.createElement(K,null)),t.default.createElement(I,null,t.default.createElement(T,{onClick:o.onClose},e("commandCancel"))))},Lt=G,K=()=>{let{t:o}=s();return t.default.createElement(C,{padding:"screen"},t.default.createElement(l,{size:16,color:d.colors.legacy.textSecondary},o("validatorListNoResults")))},N=84,q=o=>{let{data:e,showApy:r}=o;return t.default.createElement(t.default.Fragment,null,t.default.createElement(Z,{showApy:r}),t.default.createElement(P,null,t.default.createElement(v,null,({height:n,width:a})=>t.default.createElement(b,{height:n,itemCount:e.length,itemData:e,itemSize:N,width:a},J))))},J=({index:o,style:e,data:r})=>{let n=r[o];return t.default.createElement("div",{key:n.identityPubkey,style:e},t.default.createElement($,{voteAccountPubkey:n.voteAccountPubkey,formattedPercentValue:n.totalApy?y(n.totalApy/100,{format:"0.00%"}):"",activatedStake:n.activatedStake,name:n.info?.name,keybaseUsername:n.info?.keybaseUsername,iconUrl:n.info?.iconUrl}))},Q=i.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`,X=i.div`
  position: relative;
`,Y=i.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`,E=i(z).attrs(()=>({iconSize:12,lineHeight:19,fontWeight:500,fontSize:16}))``,Z=({showApy:o})=>{let{t:e}=s();return t.default.createElement(Y,null,t.default.createElement(E,{tooltipAlignment:"bottomLeft",info:t.default.createElement(f,null,t.default.createElement(p,null,e("validatorInfoDescription")))},e("validatorInfoTooltip")),o?t.default.createElement(E,{tooltipAlignment:"bottomRight",info:t.default.createElement(f,null,t.default.createElement(p,null,e("validatorApyInfoDescription")))},e("validatorApyInfoTooltip")):null)},$=o=>{let{pushDetailView:e,popDetailView:r}=S(),n=(0,t.useRef)(null),{data:a}=x(o.keybaseUsername),m=o.name??o.keybaseUsername??A(o.voteAccountPubkey);return t.default.createElement(R,{ref:n,onClick:()=>{e(t.default.createElement(U,{voteAccountPubkey:o.voteAccountPubkey,onClose:r}))}},t.default.createElement(tt,{iconUrl:o.iconUrl??a}),t.default.createElement(ot,null,t.default.createElement(et,null,t.default.createElement(l,{size:16,weight:600,lineHeight:19,textAlign:"left",noWrap:!0},h(m,20)),t.default.createElement(l,{size:14,color:d.colors.legacy.textSecondary,lineHeight:19,textAlign:"left",noWrap:!0},t.default.createElement(F,{format:"0,0"},o.activatedStake))),t.default.createElement(l,{size:14,weight:400,lineHeight:19,textAlign:"left",noWrap:!0},o.formattedPercentValue)))},R=i(H)`
  display: grid;
  grid-template-columns: 44px auto;
  column-gap: 10px;
`,tt=i(V).attrs({width:44})``,ot=i.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: space-between;
`,et=i.div`
  display: flex;
  flex-direction: column;
`;export{G as ValidatorListPage,Lt as default};
//# sourceMappingURL=ValidatorListPage-JXS5BRA4.js.map
