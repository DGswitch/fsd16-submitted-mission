import{Ka as g}from"./chunk-IWELHSHA.js";import"./chunk-GQXAN4MD.js";import"./chunk-QSCY46GS.js";import"./chunk-MDZMKEZM.js";import"./chunk-RXCJQWLX.js";import"./chunk-YQCQ4MB2.js";import"./chunk-OHAHQ6TH.js";import"./chunk-N7HMUOOL.js";import"./chunk-CQVRVBRD.js";import"./chunk-ZOT2E2W3.js";import"./chunk-ZQGFKLTM.js";import"./chunk-6CJ7SBO7.js";import"./chunk-BFYHQRJ5.js";import"./chunk-FOWWPYB2.js";import"./chunk-YN56PGWE.js";import"./chunk-P6A2XCI3.js";import"./chunk-ACPUL5BT.js";import"./chunk-4OJLPFQL.js";import"./chunk-3UM3SKCA.js";import"./chunk-XCXTYR6X.js";import"./chunk-HYWTTNE6.js";import"./chunk-F2XESPWP.js";import"./chunk-AWXKHRGR.js";import"./chunk-CUH334XZ.js";import"./chunk-Z2TWY6BT.js";import{a as w}from"./chunk-CLYKGO52.js";import"./chunk-QVBWEOIX.js";import"./chunk-7YL3G7GY.js";import"./chunk-AU2X2JVL.js";import"./chunk-MI4RUDWH.js";import{d as T}from"./chunk-FRKRTBHN.js";import{ib as a,ja as u,p as o}from"./chunk-FIPJHJBF.js";import{Gb as y,hb as S}from"./chunk-KRVIHM5V.js";import"./chunk-UCBZOSRF.js";import"./chunk-KFAB2DSY.js";import"./chunk-7ZN6LOJ6.js";import"./chunk-HCIXRSEY.js";import"./chunk-FU7K6O6V.js";import"./chunk-TQFGOCJD.js";import"./chunk-3R4YQLLG.js";import"./chunk-MWXM4F4N.js";import"./chunk-CQI745PK.js";import"./chunk-WOJPTGRH.js";import"./chunk-P6FNF3PO.js";import"./chunk-WFPABEAU.js";import"./chunk-ISLSTDN4.js";import"./chunk-7EAYY6PT.js";import"./chunk-VPAI5YFM.js";import"./chunk-TB3UVYOQ.js";import{j as f,s as i}from"./chunk-E25H5Y2I.js";import"./chunk-5CNB4EIU.js";import"./chunk-IW23UAMS.js";import"./chunk-27NXJJ7L.js";import{a as x,t as p,u as d}from"./chunk-UA6ADLWZ.js";import"./chunk-TVMPABNZ.js";import"./chunk-4M6V6BRQ.js";import"./chunk-O2N6PUOM.js";import"./chunk-UNDMYLJW.js";import"./chunk-ICCUGV36.js";import{f as C,h as l,n as m}from"./chunk-3KENBVE7.js";l();m();var e=C(x());var O=o.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding: 16px;
`,k=o.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -20px;
`,h=o(a).attrs({size:28,weight:500,color:i.colors.legacy.textPrimary})`
  margin-top: 24px;
`,P=o(a).attrs({size:16,weight:500,color:i.colors.legacy.textSecondary})`
  padding: 0px 5px;
  margin-top: 9px;
  span {
    color: ${i.colors.legacy.textPrimary};
  }
  label {
    color: ${i.colors.legacy.accentPrimary};
    cursor: pointer;
  }
`,b=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
`,A=o.div`
  margin-top: auto;
  width: 100%;
`,B=()=>{let{t:n}=f(),{mutateAsync:t}=y(),{handleHideModalVisibility:r,handleShowModalVisibility:s}=g(),v=(0,e.useCallback)(()=>{s("swapConfirmation",void 0,{event:"showSwapModal",payload:{data:{uiContext:"SwapConfirmation"}}}),r("swapTermsOfService")},[s,r]),c=S({goToConfirmation:v});return{onAgreeClick:(0,e.useCallback)(()=>{t(!0),c()},[t,c]),onCancelClick:()=>{r("swapTermsOfService")},t:n}},M=()=>{self.open(p,"_blank")},F=()=>{self.open(d,"_blank")},L=e.default.memo(({onAgreeClick:n,onCancelClick:t,t:r})=>e.default.createElement(O,null,e.default.createElement(k,null,e.default.createElement(b,null,e.default.createElement(u,null),e.default.createElement(h,null,r("termsOfServicePrimaryText")),e.default.createElement(P,null,e.default.createElement(w,{i18nKey:"termsOfServiceDiscliamerFeesEnabledInterpolated"},"We have revised our Terms of Service. By clicking ",e.default.createElement("span",null,'"I Agree"')," you agree to our new",e.default.createElement("label",{onClick:M},"Terms of Service"),".",e.default.createElement("br",null),e.default.createElement("br",null),"Our new Terms of Service include a new ",e.default.createElement("label",{onClick:F},"fee structure")," for certain products.")))),e.default.createElement(A,null,e.default.createElement(T,{primaryText:r("termsOfServiceActionButtonAgree"),secondaryText:r("commandCancel"),onPrimaryClicked:n,onSecondaryClicked:t})))),_=()=>{let n=B();return e.default.createElement(L,{...n})},X=_;export{_ as SwapTermsOfServicePage,X as default};
//# sourceMappingURL=SwapTermsOfServicePage-RA24YYB4.js.map
