import{a as s,c as f}from"./chunk-EDYGSR6Y.js";import{a as T}from"./chunk-GI7LRXYF.js";import{Ka as b,Z as I}from"./chunk-IWELHSHA.js";import"./chunk-GQXAN4MD.js";import"./chunk-QSCY46GS.js";import"./chunk-MDZMKEZM.js";import"./chunk-RXCJQWLX.js";import"./chunk-YQCQ4MB2.js";import"./chunk-OHAHQ6TH.js";import"./chunk-N7HMUOOL.js";import"./chunk-CQVRVBRD.js";import"./chunk-ZOT2E2W3.js";import"./chunk-ZQGFKLTM.js";import"./chunk-6CJ7SBO7.js";import"./chunk-BFYHQRJ5.js";import"./chunk-FOWWPYB2.js";import"./chunk-YN56PGWE.js";import"./chunk-P6A2XCI3.js";import"./chunk-ACPUL5BT.js";import"./chunk-4OJLPFQL.js";import"./chunk-3UM3SKCA.js";import"./chunk-XCXTYR6X.js";import"./chunk-HYWTTNE6.js";import"./chunk-F2XESPWP.js";import"./chunk-AWXKHRGR.js";import"./chunk-CUH334XZ.js";import"./chunk-Z2TWY6BT.js";import"./chunk-CLYKGO52.js";import"./chunk-QVBWEOIX.js";import"./chunk-7YL3G7GY.js";import"./chunk-AU2X2JVL.js";import"./chunk-MI4RUDWH.js";import{c as C,d as h}from"./chunk-FRKRTBHN.js";import{ib as l,p as o}from"./chunk-FIPJHJBF.js";import"./chunk-KRVIHM5V.js";import"./chunk-UCBZOSRF.js";import"./chunk-KFAB2DSY.js";import"./chunk-7ZN6LOJ6.js";import"./chunk-HCIXRSEY.js";import"./chunk-FU7K6O6V.js";import"./chunk-TQFGOCJD.js";import"./chunk-3R4YQLLG.js";import"./chunk-MWXM4F4N.js";import"./chunk-CQI745PK.js";import"./chunk-WOJPTGRH.js";import"./chunk-P6FNF3PO.js";import"./chunk-WFPABEAU.js";import"./chunk-ISLSTDN4.js";import{Ya as c,eb as y,tb as x}from"./chunk-7EAYY6PT.js";import"./chunk-VPAI5YFM.js";import"./chunk-TB3UVYOQ.js";import{j as g,s as a,w as B}from"./chunk-E25H5Y2I.js";import"./chunk-5CNB4EIU.js";import"./chunk-IW23UAMS.js";import"./chunk-27NXJJ7L.js";import{a as M}from"./chunk-UA6ADLWZ.js";import"./chunk-TVMPABNZ.js";import"./chunk-4M6V6BRQ.js";import"./chunk-O2N6PUOM.js";import"./chunk-UNDMYLJW.js";import"./chunk-ICCUGV36.js";import{f as v,h as u,n as d}from"./chunk-3KENBVE7.js";u();d();var n=v(M());var P=o.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
`,D=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
`,S=o(l).attrs({size:28,weight:500,color:a.colors.legacy.textPrimary})`
  margin: 16px;
`,V=o(l).attrs({size:14,weight:400,lineHeight:17,color:a.colors.legacy.textSecondary})`
  max-width: 275px;

  span {
    color: white;
  }
`,$=({networkId:t,token:r})=>{let{t:i}=g(),{handleHideModalVisibility:m}=b(),p=(0,n.useCallback)(()=>{m("insufficientBalance")},[m]),w=t&&y(x(c.getChainID(t))),{canBuy:k,openBuy:F}=I({caip19:w||"",context:"modal",analyticsEvent:"fiatOnrampFromInsufficientBalance"}),e=t?c.getTokenSymbol(t):i("tokens");return n.default.createElement(P,null,n.default.createElement("div",null,n.default.createElement(D,null,n.default.createElement(T,{type:"failure",backgroundWidth:75}),n.default.createElement(S,null,i("insufficientBalancePrimaryText",{tokenSymbol:e})),n.default.createElement(V,null,i("insufficientBalanceSecondaryText",{tokenSymbol:e})),r?n.default.createElement(B,{borderRadius:8,gap:1,marginTop:32,width:"100%"},n.default.createElement(s,{label:i("insufficientBalanceRemaining")},n.default.createElement(f,{color:a.colors.legacy.accentAlert},`${r.balance} ${e}`)),n.default.createElement(s,{label:i("insufficientBalanceRequired")},n.default.createElement(f,null,`${r.required} ${e}`))):null)),k?n.default.createElement(h,{primaryText:i("buyAssetInterpolated",{tokenSymbol:e}),onPrimaryClicked:F,secondaryText:i("commandCancel"),onSecondaryClicked:p}):n.default.createElement(C,{onClick:p},i("commandCancel")))},L=$;export{$ as InsufficientBalance,L as default};
//# sourceMappingURL=InsufficientBalance-WAL2HTQN.js.map
