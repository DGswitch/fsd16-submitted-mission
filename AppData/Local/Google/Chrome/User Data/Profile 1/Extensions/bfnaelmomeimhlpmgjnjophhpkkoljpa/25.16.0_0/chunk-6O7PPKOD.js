import{a as _,b as K}from"./chunk-QSCY46GS.js";import{b as q}from"./chunk-N7HMUOOL.js";import{b as O}from"./chunk-ZOT2E2W3.js";import{b as G}from"./chunk-FOWWPYB2.js";import{k as f}from"./chunk-3UM3SKCA.js";import{a as W}from"./chunk-CLYKGO52.js";import{a as N,d as U}from"./chunk-FRKRTBHN.js";import{ib as n,p as r}from"./chunk-FIPJHJBF.js";import{A as z,C as H,a as M,k as B,s as F,y as I}from"./chunk-FU7K6O6V.js";import{H as E,da as D}from"./chunk-TQFGOCJD.js";import{Dc as L,rc as V}from"./chunk-P6FNF3PO.js";import{$b as w,H as h,I as b,L as yo,ke as P,tb as k}from"./chunk-7EAYY6PT.js";import{j as g,s as a}from"./chunk-E25H5Y2I.js";import{b as v}from"./chunk-27NXJJ7L.js";import{a as So}from"./chunk-UA6ADLWZ.js";import{f as fo,h as T,n as A}from"./chunk-3KENBVE7.js";T();A();var o=fo(So());var xo=i=>{let{t}=g(),{voteAccountPubkey:l}=i,{showStakeAccountCreateAndDelegateStatusModal:Y,closeAllModals:j}=O(),J=()=>{i.onClose(),j()},{data:X}=P("solana"),{data:Z}=E(),R=Z?.totalQuantityString??"";D(X,"STAKE_FUNGIBLE");let{cluster:oo,connection:u}=L(),s=F(u),to=k("solana"),{data:eo}=V({query:{data:to}}),no=eo?.usd,e=(0,o.useMemo)(()=>s.results?.find(go=>go.voteAccountPubkey===l),[s.results,l]),ao=e?.info?.name??e?.info?.keybaseUsername??w(l),ro=G(u),[m,S]=(0,o.useState)(""),c=v(m),p=h(1+(H(u).data??0)),y=z({balance:R,cluster:oo,rentExemptionMinimum:p}),io=()=>S(y.toString()),so=c.isLessThan(p),lo=c.isGreaterThan(y),mo=c.isFinite(),d=m&&so?t("validatorViewAmountSOLRequiredToStakeInterpolated",{amount:p}):m&&lo?t("validatorViewInsufficientBalance"):"",co=ro.isPending,x=mo&&!d&&!co,uo=()=>{Y({lamports:b(c).toNumber(),votePubkey:l,usdPerSol:no,onClose:J,validatorName:ao})},{data:C=null}=I(),po=C?B(C,e?.commission??0):null;return o.default.createElement(Co,null,s.isPending?o.default.createElement(N,null):s.isError||!e?o.default.createElement(o.default.Fragment,null,o.default.createElement(f,null,t("validatorViewPrimaryText")),o.default.createElement(Q,null,o.default.createElement(n,{size:16,color:a.colors.legacy.textSecondary,lineHeight:20},t("validatorViewErrorFetching")," ",s.error?.message??""))):o.default.createElement(o.default.Fragment,null,o.default.createElement(f,null,t("validatorViewPrimaryText")),o.default.createElement(Q,null,o.default.createElement(n,{size:16,color:a.colors.legacy.textSecondary,lineHeight:20,margin:"0 0 20px 0"},o.default.createElement(W,{i18nKey:"validatorViewDescriptionInterpolated"},"Choose how much SOL you\u2019d like to ",o.default.createElement("br",null),"stake with this validator. ",o.default.createElement($,{href:M},"Learn more"))),o.default.createElement(_,{value:m,symbol:"SOL",alignSymbol:"right",buttonText:t("maxInputMax"),width:47,warning:!!d,onSetTarget:io,onUserInput:S}),o.default.createElement(Ao,null,o.default.createElement(n,{color:d?a.colors.legacy.accentAlert:"transparent",size:16,textAlign:"left"},d)),o.default.createElement(ho,{onEdit:i.onClose}),o.default.createElement(K,{identifier:e.voteAccountPubkey,name:e.info?.name,keybaseUsername:e.info?.keybaseUsername,iconUrl:e.info?.iconUrl,website:e.info?.website,data:[{label:t("validatorCardEstimatedApy"),value:o.default.createElement(n,{textAlign:"right",weight:500,size:14,noWrap:!0},po,"%")},{label:t("validatorCardCommission"),value:o.default.createElement(n,{textAlign:"right",weight:500,size:14,noWrap:!0},e.commission,"%")},{label:t("validatorCardTotalStake"),value:o.default.createElement(n,{textAlign:"right",weight:500,size:14,noWrap:!0},o.default.createElement(q,null,e.activatedStake))}]})),o.default.createElement(To,null,o.default.createElement(U,{primaryText:t("validatorViewActionButtonStake"),secondaryText:t("commandClose"),onPrimaryClicked:uo,onSecondaryClicked:i.onClose,primaryTheme:x?"primary":"default",primaryDisabled:!x}))))},Ro=xo,Co=r.div`
  display: grid;
  grid-template-rows: 42px auto 47px;
  height: 100%;
`,Q=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`,$=r.a.attrs({target:"_blank",rel:"noopener noreferrer"})`
  color: ${a.colors.legacy.accentPrimary};
  text-decoration: none;
  cursor: pointer;
`,To=r.section`
  display: flex;
  gap: 15px;
`,Ao=r.div`
  width: 100%;
`,vo=r(n)`
  width: 100%;
  margin-top: 15px;
  > a {
    color: ${a.colors.legacy.accentPrimary};
    cursor: pointer;
  }
`,ho=i=>{let{t}=g();return o.default.createElement(vo,{size:16,color:a.colors.legacy.textSecondary,lineHeight:20,textAlign:"left"},t("validatorViewValidator")," \u2022 ",o.default.createElement($,{onClick:i.onEdit},t("commandEdit")))};export{xo as a,Ro as b};
//# sourceMappingURL=chunk-6O7PPKOD.js.map
