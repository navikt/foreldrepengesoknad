import{I as E}from"./Tidsperioden-bc4aa89e.js";import"./jsx-runtime-69eee039.js";import{A as s}from"./AttachmentType-f6ad37cf.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";const m=n=>Array.isArray(n)&&n[0]!==null&&n.some(i=>i&&i.innsendingsType===E.SEND_SENERE),V=n=>n===s.UTSETTELSE_SYKDOM||n===s.MORS_AKTIVITET_DOKUMENTASJON||n===s.HV_ØVELSE||n===s.NAV_TILTAK||n===s.OVERFØRING_KVOTE,T=(n,i,o)=>{if(n==null)return new Map;const a=i||"søknad";let t=o||new Map;return Object.keys(n).forEach(r=>{typeof n[r]=="object"&&(m(n[r])?t.set(a+"."+r,n[r][0]):t=T(n[r],a+"."+r,t))}),t};export{T as f,V as i};
//# sourceMappingURL=util-88d81413.js.map