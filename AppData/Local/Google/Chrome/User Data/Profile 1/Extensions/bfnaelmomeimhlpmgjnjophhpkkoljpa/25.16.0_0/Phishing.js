import{a as C}from"./chunk-CLYKGO52.js";import{a as N}from"./chunk-FMCYUJ7Y.js";import"./chunk-QVBWEOIX.js";import{a as P}from"./chunk-7YL3G7GY.js";import"./chunk-AU2X2JVL.js";import{a as U}from"./chunk-MI4RUDWH.js";import"./chunk-FRKRTBHN.js";import{d as T,ib as l,m as v,p as a,t as I}from"./chunk-FIPJHJBF.js";import{a as z}from"./chunk-3DXAPSZ2.js";import{c as L}from"./chunk-UB5GAGTU.js";import{U as w,X as y}from"./chunk-KRVIHM5V.js";import"./chunk-UCBZOSRF.js";import"./chunk-KFAB2DSY.js";import"./chunk-7ZN6LOJ6.js";import"./chunk-HCIXRSEY.js";import"./chunk-FU7K6O6V.js";import"./chunk-TQFGOCJD.js";import"./chunk-3R4YQLLG.js";import"./chunk-MWXM4F4N.js";import{a as B}from"./chunk-CQI745PK.js";import{a as W}from"./chunk-WOJPTGRH.js";import"./chunk-P6FNF3PO.js";import"./chunk-WFPABEAU.js";import"./chunk-ISLSTDN4.js";import"./chunk-7EAYY6PT.js";import"./chunk-VPAI5YFM.js";import"./chunk-TB3UVYOQ.js";import{j as x,s as p}from"./chunk-E25H5Y2I.js";import"./chunk-5CNB4EIU.js";import{A as S}from"./chunk-IW23UAMS.js";import"./chunk-27NXJJ7L.js";import{a as k}from"./chunk-UA6ADLWZ.js";import"./chunk-TVMPABNZ.js";import"./chunk-4M6V6BRQ.js";import"./chunk-O2N6PUOM.js";import"./chunk-UNDMYLJW.js";import"./chunk-ICCUGV36.js";import{f as c,h as n,n as s}from"./chunk-3KENBVE7.js";n();s();var O=c(k());var J=c(z());n();s();var e=c(k());n();s();var r=c(k());var m=p.colors.legacy.accentAlert,A=a.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${p.colors.brand.white};
  padding: clamp(24px, 16vh, 256px) 24px;
  box-sizing: border-box;
`,K=a.div`
  margin-bottom: 24px;
  padding-bottom: 8vh;
`,G=a.div`
  max-width: 100ch;
  margin: auto;

  * {
    text-align: left;
  }
`,F=a.a`
  text-decoration: underline;
  color: ${m};
`,d=new B,_=({origin:o,subdomain:t})=>{let{t:g}=x(),u=o?y(o):"",M=o??"",f=new URL(M).hostname,h=t==="true"?f:u,$=async()=>{if(t==="true"){let b=await d.get("userWhitelistedSubdomains"),i=JSON.parse(`${b}`);i?i.push(f):i=[f],i=[...new Set(i)],d.set("userWhitelistedSubdomains",JSON.stringify(i))}else{let b=await d.get("userWhitelistedOrigins"),i=JSON.parse(`${b}`);i?i.push(u):i=[u],i=[...new Set(i)],d.set("userWhitelistedOrigins",JSON.stringify(i))}self.location.href=o};return r.default.createElement(A,null,r.default.createElement(G,null,r.default.createElement(K,null,r.default.createElement(I,{width:128,fill:p.colors.brand.white})),r.default.createElement(l,{size:30,color:m,weight:"600"},g("blocklistOriginDomainIsBlocked",{domainName:h||g("blocklistOriginThisDomain")})),r.default.createElement(l,{color:m},g("blocklistOriginSiteIsMalicious")),r.default.createElement(l,{color:m},r.default.createElement(C,{i18nKey:"blocklistOriginCommunityDatabaseInterpolated"},"This site has been flagged as part of a",r.default.createElement(F,{href:w,rel:"noopener",target:"_blank"},"community-maintained database"),"of known phishing websites and scams. If you believe the site has been flagged in error,",r.default.createElement(F,{href:w,rel:"noopener",target:"_blank"},"please file an issue"),".")),h?r.default.createElement(l,{color:m,onClick:$,hoverUnderline:!0},g("blocklistOriginIgnoreWarning",{domainName:o})):r.default.createElement(r.default.Fragment,null)))};var H=()=>{let o;try{o=new URLSearchParams(self.location.search).get("origin")||"",new URL(o)}catch{o=""}return o},j=()=>new URLSearchParams(self.location.search).get("subdomain")||"",E=()=>{let o=(0,e.useMemo)(H,[]),t=(0,e.useMemo)(j,[]);return e.default.createElement(T,{future:{v7_startTransition:!0}},e.default.createElement(P,null,e.default.createElement(_,{origin:o,subdomain:t})))};W();S.init({provider:N});L();var q=document.getElementById("root"),Q=(0,J.createRoot)(q);Q.render(O.default.createElement(v,{theme:U},O.default.createElement(E,null)));
//# sourceMappingURL=Phishing.js.map
