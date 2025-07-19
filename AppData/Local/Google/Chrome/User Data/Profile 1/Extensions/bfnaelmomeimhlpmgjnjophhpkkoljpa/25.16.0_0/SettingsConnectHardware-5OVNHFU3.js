import{a as N,c as D,d as F,g as G}from"./chunk-BBGKLLHQ.js";import{a as f}from"./chunk-YKSMRZMS.js";import"./chunk-GI7LRXYF.js";import"./chunk-7ARXUMPY.js";import"./chunk-5GKDBLHH.js";import"./chunk-WD6CRZ7D.js";import{a as T}from"./chunk-UW7SGJP2.js";import"./chunk-3ZIEPSRY.js";import"./chunk-IWELHSHA.js";import"./chunk-GQXAN4MD.js";import"./chunk-QSCY46GS.js";import"./chunk-MDZMKEZM.js";import"./chunk-RXCJQWLX.js";import"./chunk-YQCQ4MB2.js";import{a as L}from"./chunk-OHAHQ6TH.js";import"./chunk-N7HMUOOL.js";import"./chunk-CQVRVBRD.js";import"./chunk-ZOT2E2W3.js";import"./chunk-ZQGFKLTM.js";import"./chunk-6CJ7SBO7.js";import"./chunk-BFYHQRJ5.js";import"./chunk-FOWWPYB2.js";import"./chunk-YN56PGWE.js";import"./chunk-P6A2XCI3.js";import"./chunk-ACPUL5BT.js";import"./chunk-4OJLPFQL.js";import{d as _}from"./chunk-3UM3SKCA.js";import{a as u}from"./chunk-XCXTYR6X.js";import"./chunk-HYWTTNE6.js";import"./chunk-LD3IHZHB.js";import{a as S}from"./chunk-OZKQV3O3.js";import"./chunk-F2XESPWP.js";import"./chunk-AWXKHRGR.js";import"./chunk-CUH334XZ.js";import"./chunk-BEKGBQLD.js";import"./chunk-Z2TWY6BT.js";import"./chunk-CLYKGO52.js";import"./chunk-QVBWEOIX.js";import"./chunk-7YL3G7GY.js";import"./chunk-AU2X2JVL.js";import"./chunk-MI4RUDWH.js";import"./chunk-FRKRTBHN.js";import{p as s,w as O}from"./chunk-FIPJHJBF.js";import"./chunk-KRVIHM5V.js";import"./chunk-UCBZOSRF.js";import"./chunk-KFAB2DSY.js";import"./chunk-7ZN6LOJ6.js";import"./chunk-HCIXRSEY.js";import"./chunk-FU7K6O6V.js";import"./chunk-TQFGOCJD.js";import"./chunk-3R4YQLLG.js";import"./chunk-MWXM4F4N.js";import"./chunk-CQI745PK.js";import"./chunk-WOJPTGRH.js";import"./chunk-P6FNF3PO.js";import"./chunk-WFPABEAU.js";import"./chunk-ISLSTDN4.js";import{Dd as E,wd as B}from"./chunk-7EAYY6PT.js";import"./chunk-VPAI5YFM.js";import"./chunk-TB3UVYOQ.js";import{C as P,D as $,s as e}from"./chunk-E25H5Y2I.js";import"./chunk-5CNB4EIU.js";import"./chunk-IW23UAMS.js";import{f as v}from"./chunk-27NXJJ7L.js";import{a as H}from"./chunk-UA6ADLWZ.js";import"./chunk-TVMPABNZ.js";import"./chunk-4M6V6BRQ.js";import"./chunk-O2N6PUOM.js";import"./chunk-UNDMYLJW.js";import"./chunk-ICCUGV36.js";import{f as A,h as n,n as i}from"./chunk-3KENBVE7.js";n();i();var t=A(H());n();i();var a=A(H());n();i();var I=s(u)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: background-color 200ms ease;
  background-color: ${o=>o.$isExpanded?e.colors.legacy.black:e.colors.legacy.bgButton} !important;
  :hover {
    background-color: ${e.colors.legacy.gray};
    svg {
      fill: white;
    }
  }
  svg {
    fill: ${o=>o.$isExpanded?"white":e.colors.legacy.textSecondary};
    transition: fill 200ms ease;
    position: relative;
    ${o=>o.top?`top: ${o.top}px;`:""}
    ${o=>o.right?`right: ${o.right}px;`:""}
  }
`;var V=s(L).attrs({justify:"space-between"})`
  background-color: ${e.colors.legacy.bgWallet};
  padding: 10px 16px;
  border-bottom: 1px solid ${e.colors.legacy.borderSecondary};
  height: 46px;
  opacity: ${o=>o.opacity??"1"};
`,q=s.div`
  display: flex;
  margin-left: 10px;
  > * {
    margin-right: 10px;
  }
`,M=s.div`
  width: 24px;
  height: 24px;
`,W=({onBackClick:o,totalSteps:c,currentStepIndex:l,isHidden:d,showBackButtonOnFirstStep:r,showBackButton:g=!0})=>a.default.createElement(V,{opacity:d?0:1},g&&(r||l!==0)?a.default.createElement(I,{right:1,onClick:o},a.default.createElement(O,null)):a.default.createElement(M,null),a.default.createElement(q,null,v(c).map(p=>{let m=p<=l?e.colors.legacy.accentPrimary:e.colors.legacy.bgButton;return a.default.createElement(u,{key:p,diameter:12,color:m})})),a.default.createElement(M,null));n();i();var K=()=>{let{mutateAsync:o}=E(),{hardwareStepStack:c,pushStep:l,popStep:d,currentStep:r,setOnConnectHardwareAccounts:g,setOnConnectHardwareDone:y,setExistingAccounts:p}=N(),{data:m=[],isFetched:x,isError:k}=B(),C=_(c,(h,U)=>h?.length===U.length),X=c.length>(C??[]).length,b=C?.length===0,j={initial:{x:b?0:X?150:-150,opacity:b?1:0},animate:{x:0,opacity:1},exit:{opacity:0},transition:{duration:.2}},J=(0,t.useCallback)(()=>{r()?.props.preventBack||(r()?.props.onBackCallback&&r()?.props.onBackCallback?.(),d())},[r,d]);return T(()=>{g(async h=>{await o(h),await S.set(f,!await S.get(f))}),y(()=>self.close()),l(t.default.createElement(G,null))},c.length===0),(0,t.useEffect)(()=>{p({data:m,isFetched:x,isError:k})},[m,x,k,p]),t.default.createElement(D,null,t.default.createElement(W,{totalSteps:3,onBackClick:J,showBackButton:!r()?.props.preventBack,currentStepIndex:c.length-1}),t.default.createElement($,{mode:"wait"},t.default.createElement(P.div,{style:{display:"flex",flexGrow:1},key:`${c.length}_${C?.length}`,...j},t.default.createElement(F,null,r()))))},Po=K;export{Po as default};
//# sourceMappingURL=SettingsConnectHardware-5OVNHFU3.js.map
