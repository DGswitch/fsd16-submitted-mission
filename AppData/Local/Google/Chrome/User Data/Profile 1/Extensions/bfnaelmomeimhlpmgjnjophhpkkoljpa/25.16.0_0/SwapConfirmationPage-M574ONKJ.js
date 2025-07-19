import{a as tt}from"./chunk-GI7LRXYF.js";import{Ka as ot}from"./chunk-IWELHSHA.js";import"./chunk-GQXAN4MD.js";import"./chunk-QSCY46GS.js";import"./chunk-MDZMKEZM.js";import"./chunk-RXCJQWLX.js";import"./chunk-YQCQ4MB2.js";import"./chunk-OHAHQ6TH.js";import"./chunk-N7HMUOOL.js";import"./chunk-CQVRVBRD.js";import"./chunk-ZOT2E2W3.js";import"./chunk-ZQGFKLTM.js";import{e as X,f as Y,g as R}from"./chunk-6CJ7SBO7.js";import"./chunk-BFYHQRJ5.js";import"./chunk-FOWWPYB2.js";import"./chunk-YN56PGWE.js";import"./chunk-P6A2XCI3.js";import"./chunk-ACPUL5BT.js";import"./chunk-4OJLPFQL.js";import"./chunk-3UM3SKCA.js";import"./chunk-XCXTYR6X.js";import"./chunk-HYWTTNE6.js";import"./chunk-F2XESPWP.js";import"./chunk-AWXKHRGR.js";import"./chunk-CUH334XZ.js";import"./chunk-Z2TWY6BT.js";import"./chunk-CLYKGO52.js";import"./chunk-QVBWEOIX.js";import"./chunk-7YL3G7GY.js";import"./chunk-AU2X2JVL.js";import"./chunk-MI4RUDWH.js";import{c as Q}from"./chunk-FRKRTBHN.js";import{W as q,c as K,ib as k,l as Z,p,qa as J}from"./chunk-FIPJHJBF.js";import{Tb as G}from"./chunk-KRVIHM5V.js";import"./chunk-UCBZOSRF.js";import"./chunk-KFAB2DSY.js";import"./chunk-7ZN6LOJ6.js";import{p as U}from"./chunk-HCIXRSEY.js";import"./chunk-FU7K6O6V.js";import"./chunk-TQFGOCJD.js";import"./chunk-3R4YQLLG.js";import"./chunk-MWXM4F4N.js";import"./chunk-CQI745PK.js";import"./chunk-WOJPTGRH.js";import"./chunk-P6FNF3PO.js";import"./chunk-WFPABEAU.js";import"./chunk-ISLSTDN4.js";import{Nd as j,Ya as C}from"./chunk-7EAYY6PT.js";import"./chunk-VPAI5YFM.js";import"./chunk-TB3UVYOQ.js";import{Aa as _,C as L,D as B,Z as W,j as b,s as g,w as z,za as E}from"./chunk-E25H5Y2I.js";import"./chunk-5CNB4EIU.js";import"./chunk-IW23UAMS.js";import"./chunk-27NXJJ7L.js";import{a as O}from"./chunk-UA6ADLWZ.js";import"./chunk-TVMPABNZ.js";import"./chunk-4M6V6BRQ.js";import"./chunk-O2N6PUOM.js";import"./chunk-UNDMYLJW.js";import"./chunk-ICCUGV36.js";import{f as M,h as T,n as y}from"./chunk-3KENBVE7.js";T();y();var e=M(O());T();y();var i=M(O());var it=p.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: ${t=>t.addScreenPadding?"16px":"0"};
`,Tt=p.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`,yt=p.div`
  width: 100%;
  > * {
    margin-top: 10px;
  }
  padding: 16px;
`,Ct=p.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  padding: 16px;
`,bt=p.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`,qt=p.div`
  position: relative;
`,Jt=p.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: ${g.colors.legacy.accentSuccess};
  }
`,kt=p(k).attrs({size:28,weight:500,color:g.colors.legacy.textPrimary})`
  margin-top: 24px;
  margin-left: 12px;
  margin-right: 12px;
`,et=p(k).attrs({size:16,weight:400,color:g.colors.legacy.textSecondary})`
  margin-top: 9px;
  margin-left: 12px;
  margin-right: 12px;
  span {
    color: ${g.colors.legacy.textSecondary};
    font-weight: bold;
  }
`,ht=p(k).attrs({size:16,weight:500,color:g.colors.legacy.accentPrimary})`
  margin-top: 18px;
  text-decoration: none;
  ${t=>t.opacity!==0&&Z`
      &:hover {
        cursor: pointer;
        color: ${g.colors.legacy.accentPrimaryLight};
      }
    `}
`,Lt=({description:t,header:n,icon:o,onClose:r,title:c,txLink:s,isClosable:l,disclaimer:m})=>{let{t:a}=b(),f=()=>{s&&self.open(s)};return i.default.createElement(it,null,n,i.default.createElement(Tt,null,i.default.createElement(B,{mode:"wait",initial:!0},i.default.createElement(L.div,{key:c,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2}},o)),i.default.createElement(kt,null,c),i.default.createElement(et,null,t),s&&i.default.createElement(B,{mode:"wait",initial:!1},i.default.createElement(L.div,{key:s,initial:{opacity:0,y:16},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.2}},i.default.createElement(ht,{opacity:1,onClick:f},a("swapTxConfirmationViewTransaction"))))),l&&r?i.default.createElement(yt,null,i.default.createElement(et,null,m),l&&r?i.default.createElement(Q,{onClick:r},a("commandClose")):null):null)};var nt=({ledgerAction:t,numberOfTransactions:n,cancel:o,ledgerApp:r})=>i.default.createElement(it,{addScreenPadding:!0},i.default.createElement(Y,{ledgerAction:t,numberOfTransactions:n,cancel:o,ledgerApp:r}));var Bt=t=>self.open(t,"_blank"),rt=({txErrorTitle:t,txErrorMessage:n,txErrorHelpButtonLink:o,txLink:r,onClose:c})=>i.default.createElement(Lt,{header:i.default.createElement(Ct,null,i.default.createElement(bt,{onClick:()=>Bt(o)},i.default.createElement(q,{fill:"white"}))),icon:i.default.createElement(tt,{type:"failure"}),description:n,onClose:c,title:t,txLink:r,isClosable:!0});var Et=t=>self.open(t,"_blank"),At=()=>{let{handleHideModalVisibility:t}=ot(),n=K(),{data:o}=j(),c=o?.type==="ledger",s="swapConfirmation",l=(0,e.useCallback)(()=>{t(s)},[t,s]),m=(0,e.useCallback)(()=>{l(),n("/notifications")},[l,n]);return G({isLedger:c,goToSwapTab:l,goToActivityTab:m})},Pt=({txError:t,txErrorTitle:n,txErrorMessage:o,txErrorHelpButtonLink:r,txLink:c,executeSwap:s,numberOfTransactions:l,addressType:m,onClose:a})=>X(t)?e.default.createElement(R,{ledgerActionError:t,onRetryClick:s,onCancelClick:a}):t?e.default.createElement(rt,{txErrorTitle:n,txErrorMessage:o,txLink:c,onClose:a,txErrorHelpButtonLink:r}):e.default.createElement(nt,{ledgerAction:s,numberOfTransactions:l,cancel:a,ledgerApp:U(m)}),Nt=e.default.memo(t=>{let n=(0,e.useRef)(null),{t:o}=b(),r=o("swapTxConfirmationViewTransaction"),{addressType:c,executeSwap:s,isLedger:l,isBridge:m,sellAsset:a,buyAsset:f,estimatedTime:st,isFailure:at,isSuccess:A,isClosable:pt,notEnoughSol:ct,numberOfTransactions:lt,txError:mt,txErrorTitle:P,txErrorMessage:N,txLink:h,txErrorHelpButtonLink:v,isReadyToExecute:dt,onClose:I,onSwapSuccess:ut}=t,[D,gt]=(0,e.useState)(!1),d,u,V,w,$=o("commandClose"),H,S,x=pt||!1;if((0,e.useEffect)(()=>{!S&&setTimeout(()=>{!D&&n.current?.start(),gt(!0)},200)},[D,S]),l&&!h&&dt)return e.default.createElement(Pt,{isBridge:m,txError:mt,txErrorTitle:P,txErrorMessage:N,txErrorHelpButtonLink:v,txLink:h,numberOfTransactions:lt,addressType:c,executeSwap:s,onClose:I});if(m&&a){let F=`${a.amount} ${a.symbol}`,ft=C.getNetworkName(a.networkID),wt=`${f.amount} ${f.symbol}`,St=C.getNetworkName(f.networkID);d=o("swapTxBridgeSubmitting"),u=o("swapTxBridgeSubmittingDescription",{sellAmount:F,sellNetwork:ft,buyAmount:wt,buyNetwork:St})}else u=`${f.symbol||o("swapTxConfirmationTokens")} ${o("swapTxConfirmationTokensWillBeDeposited")} `,d=o("swapTxConfirmationSwappingTokens");return ct&&(d=o("notEnoughSolPrimaryText"),u=o("notEnoughSolSecondaryText"),S=e.default.createElement(J,{width:E,height:E}),w={theme:"primary"},x=!0),A&&(m?(d=o("swapTxBridgeSubmitted"),u=o("swapTxBridgeSubmittedDescription",{estimatedTime:st}),V=o("swapTxBridgeSubmittedDisclaimer")):(d=o("swapTxConfirmationTokensDepositedTitle"),u=o("swapTxConfirmationTokensDepositedBody")),w={theme:"primary"},x=!0,n.current?.success()),at&&(d=P,u=N,w={theme:"secondary"},$=o("commandClose"),x=!0,H=e.default.createElement(z,{alignItems:"flex-end"},e.default.createElement(W,{icon:"HelpCircle",size:32,onClick:()=>Et(v),backgroundColor:[null,"bgButton"],color:["textSecondary","textPrimary"],label:o("commandHelp")})),n.current?.fail()),e.default.createElement(_,{ref:n,title:d,txLink:h,txTitle:r,description:u,disclaimer:V,isClosable:x,buttonVariant:w,buttonText:$,onClose:A?ut:I,header:H,customIcon:S})}),vt=()=>{let t=At();return(0,e.useEffect)(()=>{!t.isReadyToExecute||t.isLedger||t.executeSwap()},[t.isReadyToExecute,t.isLedger]),e.default.createElement(Nt,{...t})},fo=vt;export{vt as SwapConfirmationPage,fo as default};
//# sourceMappingURL=SwapConfirmationPage-M574ONKJ.js.map
