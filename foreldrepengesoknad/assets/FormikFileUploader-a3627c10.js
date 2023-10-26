import{j as r}from"./jsx-runtime-69eee039.js";import{r as N}from"./index-7c191284.js";import{u as S,r as y,B as E,s as h,t as O,v as V,R as D,i as c,P as K,w as G}from"./validationUtils-3e3f35a1.js";import"./index-e13aeee6.js";import"./_baseToString-4b695375.js";import"./_createSet-32a27317.js";import{g as x,E as B}from"./apiInterceptor-c6c2844c.js";import{A as M}from"./AttachmentList-ca8f0ac5.js";import{B as U}from"./Link-b834ea2b.js";var b=(e=>(e.ANNET="I000060",e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM="I000051",e.BEKREFTELSE_FRA_STUDIESTED="I000061",e.DOKUMENTASJON_AV_TERMIN_ELLER_FØDSEL="I000041",e.DOK_AV_ALENEOMSORG="I000110",e.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID="I000111",e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET="I000112",e.DOK_INNLEGGELSE="I000037",e.DOK_MILITÆR_SILVIL_TJENESTE="I000039",e.DOK_MORS_UTDANNING_ARBEID_SYKDOM="I000038",e.DOK_OVERFØRING_FOR_SYK="I000023",e.ETTERLØNN_ELLER_SLUTTVEDERLAG="I000044",e.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG="I000007",e.OMSORGSOVERTAKELSESDATO="I000042",e.TERMINBEKREFTELSE="I000062",e.HV_ØVELSE="I000116",e.NAV_TILTAK="I000117",e))(b||{});function k(e){const t={withCredentials:!0,timeout:45e3,headers:{"content-type":"multipart/form-data"}},a=new FormData;a.append("id",e.id),a.append("vedlegg",e.file,e.filename);const n=`${B.REST_API_URL}/storage/vedlegg`;return x().post(n,a,t)}const P={saveAttachment:k},g=[".pdf",".jpeg",".jpg",".png"],m=16777,q=.0009765625,C=(e,t,a)=>e.map(n=>{const i=G(n,t,a);return i.pending=!0,i}),j=e=>{const t=e.split(".").pop();return g.includes(`.${t.toLowerCase()}`)},w=e=>e*q<=m,z=(e,t,a)=>e.filter(n=>{const i=j(n.filename);i||t(l=>l.concat(c(a,"vedlegg.feilmelding.ugyldig.type",{filename:n.filename})));const u=w(n.filesize);return u||t(l=>l.concat(c(a,"vedlegg.feilmelding.ugyldig.størrelse",{filename:n.filename,maxStørrelse:m}))),i&&u}),Y=(e,t,a,n,i,u)=>{e.forEach(async(l,d)=>{try{const s=await P.saveAttachment(l);l.pending=!1,l.url=s.headers.location,l.uploaded=!0,l.uuid=s.data,t(i+d,l)}catch{a(i+d),n(p=>p.concat(c(u,"vedlegg.feilmelding.opplasting.feilet",{filename:l.filename})))}})},I=({attachments:e,name:t,onFileInputClick:a,attachmentType:n,skjemanummer:i,label:u,legend:l,...d})=>{const s=S(),{setFieldValue:p}=y(),[_,f]=N.useState([]);return r.jsxs(r.Fragment,{children:[r.jsx(E,{padBottom:"l",children:r.jsx(h,{legend:l,buttonLabel:u,name:t,accept:g.join(", "),onFilesSelect:(o,{push:L,replace:T,remove:A})=>{const R=C(o,n,i),v=z(R,f,s);v.forEach(F=>L(F)),Y(v,T,A,f,e.length,s)},onClick:a,error:_.length>0?_.map(o=>r.jsx(U,{children:o},o)):void 0,...d})}),r.jsx(E,{padBottom:"l",visible:e.length>0,children:r.jsx(M,{attachments:e.filter(o=>!O(o)),showFileSize:!0,onDelete:o=>{p(t,V(e,o))}})}),r.jsx(E,{children:r.jsx(D,{header:c(s,"pictureScanninGuide.apneLabel"),children:r.jsx(K,{backgroundColor:"blue"})})})]})},le=I;try{I.displayName="FormikFileUploader",I.__docgenInfo={description:"",displayName:"FormikFileUploader",props:{attachments:{defaultValue:null,description:"",name:"attachments",required:!0,type:{name:"Attachment[]"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"any"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},attachmentType:{defaultValue:null,description:"",name:"attachmentType",required:!0,type:{name:"enum",value:[{value:'"omsorgsovertakelse"'},{value:'"adopsjonsvedtak"'},{value:'"terminbekreftelse"'},{value:'"fødselsattest"'},{value:'"anneninntektDokumentasjon"'},{value:'"utsettelseSykdomUttaksplan"'},{value:'"morsaktivitetdokumentasjon"'},{value:'"dokumentasjonOverføringAvKvote"'},{value:'"dokumentasjonAvAleneomsorg"'},{value:'"senEndring"'},{value:'"hvØvelse"'},{value:'"navTiltak"'}]}},skjemanummer:{defaultValue:null,description:"",name:"skjemanummer",required:!0,type:{name:"enum",value:[{value:'"I000060"'},{value:'"I000051"'},{value:'"I000061"'},{value:'"I000041"'},{value:'"I000110"'},{value:'"I000111"'},{value:'"I000112"'},{value:'"I000037"'},{value:'"I000039"'},{value:'"I000038"'},{value:'"I000023"'},{value:'"I000044"'},{value:'"I000007"'},{value:'"I000042"'},{value:'"I000062"'},{value:'"I000116"'},{value:'"I000117"'}]}},legend:{defaultValue:null,description:"",name:"legend",required:!0,type:{name:"string"}},onFileInputClick:{defaultValue:null,description:"",name:"onFileInputClick",required:!1,type:{name:"(() => void)"}}}}}catch{}export{P as A,le as F,b as S};
//# sourceMappingURL=FormikFileUploader-a3627c10.js.map