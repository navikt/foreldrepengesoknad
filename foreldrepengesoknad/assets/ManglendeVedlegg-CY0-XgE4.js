import{j as a}from"./jsx-runtime-CLpGMVip.js";import{u as D,C as I,a as Ve}from"./FpDataContext-DWIUkGg8.js";import{A as F,g as we,a as Be,u as Je,j as xe,k as Ye}from"./useFpNavigator-BcJlRLYe.js";import{h as Se,u as ze,R as He,S as Ce}from"./ErrorSummaryHookForm-DjlRtc40.js";import{u as E,B as ge,a as v,M as T,H as $e}from"./Label-ykNXDO_J.js";import{G as b,D as Qe,g as We,p as Xe}from"./barnUtils-Cl6EU1S6.js";import{I as Te,S as n,a as S,A as M,g as Ze}from"./uttaksplanInfoUtils-D1gWXJkx.js";import{bb as Ee,bc as _e,O as en,bd as nn,ap as rn,e as an,g as tn,Q as mn,a9 as sn,a_ as un,a$ as dn,b0 as ln,b1 as on,b2 as kn,be as pn,bf as En,bg as yn,bh as Sn,bi as gn,bj as Tn,bk as _n,bl as An,bm as On,bn as Rn,bo as cn,bp as jn,bq as vn,br as Nn,bs as In,bt as fn,bu as Dn,bv as Ln,n as U,ba as Mn,bw as Kn,b as qn,A as hn}from"./Uttaksplan-B6Kb2NO6.js";import{d as ye}from"./dates-M0QhicXZ.js";import{r as Ae}from"./index-DI2V0i71.js";import{g as Gn}from"./guid-CsArkN6i.js";import{k as bn}from"./index-0JiJ8puv.js";import{V as B}from"./VStack-BeAjIZdy.js";const Oe=(e,r)=>async t=>{const m=new FormData;m.append("id",t.id),m.append("vedlegg",t.file,t.filename);const i=await bn.post(`${e}/rest/storage/${r}/vedlegg`,{body:m});return{headers:{location:i.headers.get("Location")},data:await i.text()}},Un=()=>"V".concat(Gn().replace(/-/g,"")),Fn=(e,r,t,m,i)=>({id:Un(),file:e,filename:e.name,filesize:e.size,uploaded:!1,pending:!1,type:r,skjemanummer:t,innsendingsType:m,dokumenterer:i}),Re=(e,r,t)=>Fn({name:"",size:""},e,r,Te.SEND_SENERE,t),P=(e,r)=>({...e,dokumenterer:r}),ce=(e,r)=>e.map((t,m)=>{const i=t.tom?Ee(t.tom):r.formatMessage({id:"VedleggUploader.pågående"}),s=`${Ee(t.fom)}-${i}`;return e.length===1||m===e.length-1?s:m<e.length-2?`${s}, `:`${s} ${r.formatMessage({id:"VedleggUploader.Og"})} `}).join(""),h=({attachments:e,updateAttachments:r,skjemanummer:t,labelText:m,description:i,attachmentType:s,metadataType:d,perioder:u})=>{const{watch:k}=Se(),_=k(t);return Ae.useEffect(()=>{if(_.length===0){const l=Re(s,t),o=P(l,{type:d,perioder:u});r([o])}},[r,_,s,t,d]),a.jsx(_e,{label:m,description:i,attachmentType:s,skjemanummer:t,existingAttachments:e,updateAttachments:l=>{const o=l.map(f=>P(f,{type:d,perioder:u}));r(o)},saveAttachment:Oe("./","foreldrepenger")})};h.__docgenInfo={description:"",methods:[],displayName:"VedleggUploader",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}},description:""},skjemanummer:{required:!0,tsType:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},description:""},labelText:{required:!0,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:""},attachmentType:{required:!0,tsType:{name:"AttachmentType"},description:""},metadataType:{required:!0,tsType:{name:"AttachmentMetadataType"},description:""},perioder:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:`Array<{
    fom: string;
    tom?: string;
}>`},description:""}}};const je=({attachments:e,updateAttachments:r,annenForelder:t})=>{const m=E();return!en(t)||!t.datoForAleneomsorg?null:a.jsx(h,{attachments:e,updateAttachments:r(n.DOK_AV_ALENEOMSORG),skjemanummer:n.DOK_AV_ALENEOMSORG,labelText:m.formatMessage({id:"manglendeVedlegg.aleneomsorg.tittel"}),description:m.formatMessage({id:"manglendeVedlegg.aleneomsorg.description"}),attachmentType:S.ALENEOMSORG,metadataType:M.BARN})};je.__docgenInfo={description:"",methods:[],displayName:"AleneomsorgDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},annenForelder:{required:!0,tsType:{name:"union",raw:"AnnenForelderIkkeOppgitt | AnnenForelderOppgitt",elements:[{name:"Common"},{name:"AnnenForelderOppgitt"}]},description:""}}};const Pn="_periodeAttachmentUploader_jo11m_1",Vn={periodeAttachmentUploader:Pn},A=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:s,situasjon:d,skjemanummer:u,labelText:k,description:_,attachmentType:l})=>{const{watch:o}=Se(),f=o(u);return Ae.useEffect(()=>{if(f.length===0){const N=Re(l,u),K=P(N,{type:M.UTTAK,perioder:t.map(q=>({fom:b(q.tidsperiode.fom),tom:b(q.tidsperiode.tom)}))});r([K])}},[r,t,f,l,u]),a.jsx(_e,{label:k,description:a.jsxs(a.Fragment,{children:[a.jsx(ge,{children:_}),t.map(N=>a.jsx("div",{className:Vn.periodeAttachmentUploader,children:a.jsx(nn,{periode:N,erAleneOmOmsorg:!1,erFarEllerMedmor:!0,navnPåForeldre:m,familiehendelsesdato:ye(i).toDate(),termindato:s?ye(s).toDate():void 0,situasjon:d,melding:void 0})},N.id))]}),attachmentType:l,skjemanummer:u,existingAttachments:e,updateAttachments:N=>{const K=N.map(q=>P(q,{type:M.UTTAK,perioder:t.map(G=>({fom:b(G.tidsperiode.fom),tom:b(G.tidsperiode.tom)}))}));return r(K)},saveAttachment:Oe("./","foreldrepenger")})};A.__docgenInfo={description:"",methods:[],displayName:"UttakUploader",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},skjemanummer:{required:!0,tsType:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},description:""},labelText:{required:!0,tsType:{name:"string"},description:""},description:{required:!0,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:""},attachmentType:{required:!0,tsType:{name:"AttachmentType"},description:""}}};const ve=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:s,termindato:d})=>{const u=E();return t.length===0?null:a.jsx(A,{attachments:e,updateAttachments:r(n.DOK_INNLEGGELSE_BARN),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:s,skjemanummer:n.DOK_INNLEGGELSE_BARN,labelText:u.formatMessage({id:"manglendeVedlegg.barnInnlagt.label"}),description:u.formatMessage({id:"manglendeVedlegg.barnInnlagt.description"}),attachmentType:S.UTSETTELSE_SYKDOM})};ve.__docgenInfo={description:"",methods:[],displayName:"BarnInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Ne=({attachments:e,updateAttachments:r,arbeidsforholdOgInntekt:t,andreInntektskilder:m})=>{const i=E();if(!t||t&&t.harHattAndreInntektskilder===!1||!m||!m.some(d=>d.type===F.SLUTTPAKKE))return null;const s=m.filter(d=>d.type===F.SLUTTPAKKE);return a.jsx(h,{attachments:e,updateAttachments:r(n.ETTERLØNN_ELLER_SLUTTVEDERLAG),skjemanummer:n.ETTERLØNN_ELLER_SLUTTVEDERLAG,labelText:i.formatMessage({id:"manglendeVedlegg.etterlønn.tittel"},{perioder:ce(s,i),antallPerioder:s.length}),description:i.formatMessage({id:"manglendeVedlegg.etterlønn.description"}),attachmentType:S.ANNEN_INNTEKT,metadataType:M.OPPTJENING,perioder:s})};Ne.__docgenInfo={description:"",methods:[],displayName:"EtterlønnEllerSluttvederlagDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},arbeidsforholdOgInntekt:{required:!0,tsType:{name:"union",raw:"ArbeidsforholdOgInntektFp | undefined",elements:[{name:"intersection",raw:`{
    harHattAndreInntektskilder: boolean;
} & ArbeidsforholdOgInntektFelles`,elements:[{name:"signature",type:"object",raw:`{
    harHattAndreInntektskilder: boolean;
}`,signature:{properties:[{key:"harHattAndreInntektskilder",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]},{name:"undefined"}]},description:""},andreInntektskilder:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]}],raw:"AndreInntektskilder[]"},description:""}}};const Ie=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:s,termindato:d,erFarEllerMedmor:u})=>{const k=E();return t.length===0?null:a.jsx(A,{attachments:e,updateAttachments:r(n.DOK_SYKDOM_FAR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:s,skjemanummer:n.DOK_SYKDOM_FAR,labelText:k.formatMessage({id:"manglendeVedlegg.farForSyk.label"},{navn:m.farMedmor,erFarEllerMedmor:u}),description:k.formatMessage({id:"manglendeVedlegg.farForSyk.description"},{navn:m.farMedmor,erFarEllerMedmor:u}),attachmentType:S.UTSETTELSE_SYKDOM})};Ie.__docgenInfo={description:"",methods:[],displayName:"FarForSykDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const fe=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:s,termindato:d,erFarEllerMedmor:u})=>{const k=E();return t.length===0?null:a.jsx(A,{attachments:e,updateAttachments:r(n.DOK_INNLEGGELSE_FAR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:s,skjemanummer:n.DOK_INNLEGGELSE_FAR,labelText:k.formatMessage({id:"manglendeVedlegg.farInnlagt.label"},{navn:m.farMedmor,erFarEllerMedmor:u}),description:k.formatMessage({id:"manglendeVedlegg.farInnlagt.description"},{navn:m.farMedmor,erFarEllerMedmor:u}),attachmentType:S.UTSETTELSE_SYKDOM})};fe.__docgenInfo={description:"",methods:[],displayName:"FarInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const De=({attachments:e,updateAttachments:r,arbeidsforholdOgInntekt:t,andreInntektskilder:m})=>{const i=E();if(!t||t&&!t.harHattAndreInntektskilder||!m||!m.some(d=>d.type===F.MILITÆRTJENESTE))return null;const s=m.filter(d=>d.type===F.MILITÆRTJENESTE);return a.jsx(h,{attachments:e,updateAttachments:r(n.DOK_MILITÆR_SILVIL_TJENESTE),skjemanummer:n.DOK_MILITÆR_SILVIL_TJENESTE,labelText:i.formatMessage({id:"manglendeVedlegg.militær.tittel"},{perioder:ce(s,i),antallPerioder:s.length}),description:i.formatMessage({id:"manglendeVedlegg.militær.description"}),attachmentType:S.ANNEN_INNTEKT,metadataType:M.OPPTJENING,perioder:s})};De.__docgenInfo={description:"",methods:[],displayName:"MilitærEllerSiviltjenesteDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},arbeidsforholdOgInntekt:{required:!0,tsType:{name:"union",raw:"ArbeidsforholdOgInntektFp | undefined",elements:[{name:"intersection",raw:`{
    harHattAndreInntektskilder: boolean;
} & ArbeidsforholdOgInntektFelles`,elements:[{name:"signature",type:"object",raw:`{
    harHattAndreInntektskilder: boolean;
}`,signature:{properties:[{key:"harHattAndreInntektskilder",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]},{name:"undefined"}]},description:""},andreInntektskilder:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]}],raw:"AndreInntektskilder[]"},description:""}}};const Le=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:s,termindato:d,erFarEllerMedmor:u})=>{const k=E();return t.length===0?null:a.jsx(A,{attachments:e,updateAttachments:r(n.DOK_SYKDOM_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:s,skjemanummer:n.DOK_SYKDOM_MOR,labelText:k.formatMessage({id:"manglendeVedlegg.morForSyk.label"},{navn:m.mor,erFarEllerMedmor:u}),description:k.formatMessage({id:"manglendeVedlegg.morForSyk.description"},{navn:m.mor,erFarEllerMedmor:u}),attachmentType:S.UTSETTELSE_SYKDOM})};Le.__docgenInfo={description:"",methods:[],displayName:"MorForSykDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Me=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:s,termindato:d,erFarEllerMedmor:u})=>{const k=E();if(t.length===0)return null;const _=t.find(l=>l.type===rn.Uttak&&l.erMorForSyk===!0&&l.konto===an.Fedrekvote)!==void 0;return a.jsx(A,{attachments:e,updateAttachments:r(n.DOK_INNLEGGELSE_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:s,skjemanummer:n.DOK_INNLEGGELSE_MOR,labelText:_?k.formatMessage({id:"manglendeVedlegg.morInnlagtEllerSyk.label"},{navn:m.mor,erFarEllerMedmor:u}):k.formatMessage({id:"manglendeVedlegg.morInnlagt.label"},{navn:m.mor,erFarEllerMedmor:u}),description:_?k.formatMessage({id:"manglendeVedlegg.morInnlagtEllerSyk.description"},{navn:m.mor,erFarEllerMedmor:u}):k.formatMessage({id:"manglendeVedlegg.morInnlagt.description"},{navn:m.mor,erFarEllerMedmor:u}),attachmentType:S.UTSETTELSE_SYKDOM})};Me.__docgenInfo={description:"",methods:[],displayName:"MorInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Ke=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:s,termindato:d})=>{const u=E();return t.length===0?null:a.jsx(A,{attachments:e,updateAttachments:r(n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:s,skjemanummer:n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET,labelText:u.formatMessage({id:"manglendeVedlegg.introduksjonsprogram.tittel"}),description:u.formatMessage({id:"manglendeVedlegg.introduksjonsprogram.description"},{navn:m.mor}),attachmentType:S.MORS_AKTIVITET_DOKUMENTASJON})};Ke.__docgenInfo={description:"",methods:[],displayName:"MorIntroduksjonsprogrammetDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const qe=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:s,termindato:d})=>{const u=E();return t.length===0?null:a.jsx(A,{attachments:e,updateAttachments:r(n.DOK_ARBEID_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:s,skjemanummer:n.DOK_ARBEID_MOR,labelText:u.formatMessage({id:"manglendeVedlegg.morJobber.label"}),description:u.formatMessage({id:"manglendeVedlegg.morJobber.description"},{navn:m.mor}),attachmentType:S.MORS_AKTIVITET_DOKUMENTASJON})};qe.__docgenInfo={description:"",methods:[],displayName:"MorJobberDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const he=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:s,termindato:d})=>{const u=E();return t.length===0?null:a.jsx(A,{attachments:e,updateAttachments:r(n.DOK_UTDANNING_OG_ARBEID_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:s,skjemanummer:n.DOK_UTDANNING_OG_ARBEID_MOR,labelText:u.formatMessage({id:"manglendeVedlegg.studererOgJobber.label"}),description:a.jsxs(a.Fragment,{children:[a.jsx(v,{children:a.jsx(T,{id:"manglendeVedlegg.studererOgJobber.description.tittel",values:{navn:m.mor}})}),a.jsx("ul",{style:{margin:"0",padding:"0.5rem 2.5rem"},children:a.jsxs(B,{gap:"2",children:[a.jsx("li",{children:a.jsx(v,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt1"})})}),a.jsx("li",{children:a.jsx(v,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt2"})})}),a.jsx("li",{children:a.jsx(v,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt3"})})}),a.jsx("li",{children:a.jsx(v,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt4"})})})]})})]}),attachmentType:S.MORS_AKTIVITET_DOKUMENTASJON})};he.__docgenInfo={description:"",methods:[],displayName:"MorJobberOgStudererDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Ge=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:s,termindato:d})=>{const u=E();return t.length===0?null:a.jsx(A,{attachments:e,updateAttachments:r(n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:s,skjemanummer:n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM,labelText:u.formatMessage({id:"manglendeVedlegg.kvalifiseringsprogram.tittel"}),description:u.formatMessage({id:"manglendeVedlegg.kvalifiseringsprogram.description"},{navn:m.mor}),attachmentType:S.MORS_AKTIVITET_DOKUMENTASJON})};Ge.__docgenInfo={description:"",methods:[],displayName:"MorKvalifiseringsprogrammetDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const be=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:s,termindato:d})=>{const u=E();return t.length===0?null:a.jsx(A,{attachments:e,updateAttachments:r(n.DOK_UTDANNING_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:s,skjemanummer:n.DOK_UTDANNING_MOR,labelText:u.formatMessage({id:"manglendeVedlegg.studerer.label"}),description:a.jsxs(a.Fragment,{children:[a.jsx(v,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.tittel",values:{navn:m.mor}})}),a.jsx("ul",{style:{margin:"0",padding:"0.5rem 2.5rem"},children:a.jsxs(B,{gap:"2",children:[a.jsx("li",{children:a.jsx(v,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt1"})})}),a.jsx("li",{children:a.jsx(v,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt2"})})}),a.jsx("li",{children:a.jsx(v,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt3"})})}),a.jsx("li",{children:a.jsx(v,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt4"})})})]})})]}),attachmentType:S.MORS_AKTIVITET_DOKUMENTASJON})};be.__docgenInfo={description:"",methods:[],displayName:"MorStudererDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Ue=({attachments:e,updateAttachments:r,søkersituasjon:t})=>{const m=E();return t.situasjon!=="adopsjon"?null:a.jsx(h,{attachments:e,updateAttachments:r(n.OMSORGSOVERTAKELSE),skjemanummer:n.OMSORGSOVERTAKELSE,labelText:m.formatMessage({id:"manglendeVedlegg.omsorgsovertakelse.tittel"}),description:m.formatMessage({id:"manglendeVedlegg.omsorgsovertakelse.description"}),attachmentType:S.OMSORGSOVERTAKELSE,metadataType:M.BARN})};Ue.__docgenInfo={description:"",methods:[],displayName:"OmsorgsovertakelseDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},søkersituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    situasjon?: Situasjon;
}`,signature:{properties:[{key:"situasjon",value:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}],required:!1}}]}},description:""}}};const wn=(e,r)=>e?r?Qe(r):!1:!0,Fe=({attachments:e,updateAttachments:r,barn:t,arbeidsforhold:m,erFarEllerMedmor:i})=>{const s=E(),d=we(m,mn(t),i,tn(t));return!sn(t)||d.length>0&&!i||!wn(i,t.termindato)?null:a.jsx(h,{attachments:e,updateAttachments:r(n.TERMINBEKREFTELSE),skjemanummer:n.TERMINBEKREFTELSE,labelText:s.formatMessage({id:"manglendeVedlegg.terminbekreftelse.tittel"}),description:s.formatMessage({id:i?"manglendeVedlegg.terminbekreftelse.description.farMedmor":"manglendeVedlegg.terminbekreftelse.description"}),attachmentType:S.TERMINBEKREFTELSE,metadataType:M.BARN})};Fe.__docgenInfo={description:"",methods:[],displayName:"TerminbekreftelseDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
| Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
| Skjemanummer.DOK_INNLEGGELSE_BARN
| Skjemanummer.DOK_INNLEGGELSE_MOR
| Skjemanummer.DOK_INNLEGGELSE_FAR
| Skjemanummer.DOK_SYKDOM_MOR
| Skjemanummer.DOK_SYKDOM_FAR
| Skjemanummer.DOK_UTDANNING_MOR
| Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
| Skjemanummer.DOK_ARBEID_MOR
| Skjemanummer.DOK_AV_ALENEOMSORG
| Skjemanummer.TERMINBEKREFTELSE
| Skjemanummer.OMSORGSOVERTAKELSE
| Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},name:"skjemanummer"}],return:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},barn:{required:!0,tsType:{name:"union",raw:"FødtBarn | UfødtBarn | AdoptertBarn | AdoptertStebarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn",elements:[{name:"FødtBarn"},{name:"UfødtBarn"},{name:"AdoptertBarn"},{name:"AdoptertStebarn"},{name:"AdoptertAnnetBarn"},{name:"IkkeUtfyltTypeBarn"}]},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Bn=e=>un(e)||dn(e)||ln(e)||on(e)||kn(e)||pn(e),Jn=e=>En(e)||yn(e)||Sn(e)||gn(e)||Tn(e),xn=e=>_n(e),Yn=e=>An(e),zn=e=>On(e)||Rn(e),Hn=e=>cn(e)||jn(e),Cn=e=>vn(e)||Nn(e),$n=e=>In(e)||fn(e),Qn=e=>Dn(e)||Ln(e),Wn=e=>{const r=e[n.OMSORGSOVERTAKELSE]?e[n.OMSORGSOVERTAKELSE]:[];return g(r)},Xn=e=>{const r=e[n.DOK_AV_ALENEOMSORG]?e[n.DOK_AV_ALENEOMSORG]:[];return g(r)},Zn=e=>{const r=e[n.TERMINBEKREFTELSE]?e[n.TERMINBEKREFTELSE]:[];return g(r)},er=e=>{const r=e[n.DOK_MILITÆR_SILVIL_TJENESTE]?e[n.DOK_MILITÆR_SILVIL_TJENESTE]:[];return g(r)},nr=e=>{const r=e[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]?e[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[];return g(r)},rr=e=>{const r=e[n.DOK_INNLEGGELSE_MOR]?e[n.DOK_INNLEGGELSE_MOR]:[];return g(r)},ar=e=>{const r=e[n.DOK_SYKDOM_MOR]?e[n.DOK_SYKDOM_MOR]:[];return g(r)},tr=e=>{const r=e[n.DOK_INNLEGGELSE_FAR]?e[n.DOK_INNLEGGELSE_FAR]:[];return g(r)},mr=e=>{const r=e[n.DOK_SYKDOM_FAR]?e[n.DOK_SYKDOM_FAR]:[];return g(r)},ir=e=>{const r=e[n.DOK_INNLEGGELSE_BARN]?e[n.DOK_INNLEGGELSE_BARN]:[];return g(r)},sr=e=>{const r=e[n.DOK_UTDANNING_MOR]?e[n.DOK_UTDANNING_MOR]:[];return g(r)},ur=e=>{const r=e[n.DOK_ARBEID_MOR]?e[n.DOK_ARBEID_MOR]:[];return g(r)},dr=e=>{const r=e[n.DOK_UTDANNING_OG_ARBEID_MOR]?e[n.DOK_UTDANNING_OG_ARBEID_MOR]:[];return g(r)},lr=e=>{const r=e[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]?e[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[];return g(r)},or=e=>{const r=e[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]?e[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[];return g(r)},kr=e=>e.innsendingsType===Te.SEND_SENERE,g=e=>e.filter(r=>!kr(r)),pr=({mellomlagreSøknadOgNaviger:e,avbrytSøknad:r,søkerInfo:t,erEndringssøknad:m})=>{const i=E(),s=Be(t.arbeidsforhold,e,m),d=Je(t.arbeidsforhold,m),u=U(D(I.UTTAKSPLAN)),k=U(D(I.ANNEN_FORELDER)),_=U(D(I.OM_BARNET)),l=U(D(I.SØKERSITUASJON)),o=D(I.VEDLEGG)||{},f=D(I.UTTAKSPLAN_METADATA),N=D(I.ARBEIDSFORHOLD_OG_INNTEKT),K=D(I.ANDRE_INNTEKTSKILDER),q=Ve(I.VEDLEGG),G=Ze(u,f==null?void 0:f.perioderSomSkalSendesInn,m),L=xe(l.rolle),O=Mn(G,L,k),J=rr(o),x=ar(o),Y=tr(o),z=mr(o),H=ir(o),C=sr(o),$=ur(o),Q=dr(o),W=lr(o),X=or(o),Z=Xn(o),ee=Zn(o),ne=Wn(o),re=er(o),ae=nr(o),te=O.filter(Bn),me=O.filter(Kn),ie=O.filter(Yn),se=O.filter(xn),ue=O.filter(Jn),de=O.filter($n),le=O.filter(Hn),oe=O.filter(Cn),ke=O.filter(Qn),pe=O.filter(zn),R=Ye(t.søker,k,L,i),c=We(_),j=Xe(_),Pe=p=>{const w={...o,[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:ke.length?p[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:de.length>0?p[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[n.DOK_INNLEGGELSE_MOR]:te.length>0?p[n.DOK_INNLEGGELSE_MOR]:[],[n.DOK_INNLEGGELSE_BARN]:me.length>0?p[n.DOK_INNLEGGELSE_BARN]:[],[n.DOK_INNLEGGELSE_FAR]:se.length>0?p[n.DOK_INNLEGGELSE_FAR]:[],[n.DOK_SYKDOM_MOR]:ue.length>0?p[n.DOK_SYKDOM_MOR]:[],[n.DOK_SYKDOM_FAR]:ie.length>0?p[n.DOK_SYKDOM_FAR]:[],[n.DOK_UTDANNING_MOR]:pe.length>0?p[n.DOK_UTDANNING_MOR]:[],[n.DOK_UTDANNING_OG_ARBEID_MOR]:oe.length>0?p[n.DOK_UTDANNING_OG_ARBEID_MOR]:[],[n.DOK_ARBEID_MOR]:le.length>0?p[n.DOK_ARBEID_MOR]:[],[n.DOK_AV_ALENEOMSORG]:p[n.DOK_AV_ALENEOMSORG]||[],[n.TERMINBEKREFTELSE]:p[n.TERMINBEKREFTELSE]||[],[n.OMSORGSOVERTAKELSE]:p[n.OMSORGSOVERTAKELSE]||[],[n.DOK_MILITÆR_SILVIL_TJENESTE]:p[n.DOK_MILITÆR_SILVIL_TJENESTE]||[],[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:p[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]||[]};return q(w),s.goToNextDefaultStep()},V=ze({defaultValues:{[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:X,[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:W,[n.DOK_INNLEGGELSE_MOR]:J,[n.DOK_INNLEGGELSE_BARN]:H,[n.DOK_INNLEGGELSE_FAR]:Y,[n.DOK_SYKDOM_FAR]:z,[n.DOK_SYKDOM_MOR]:x,[n.DOK_UTDANNING_MOR]:C,[n.DOK_UTDANNING_OG_ARBEID_MOR]:Q,[n.DOK_ARBEID_MOR]:$,[n.DOK_AV_ALENEOMSORG]:Z,[n.TERMINBEKREFTELSE]:ee,[n.OMSORGSOVERTAKELSE]:ne,[n.DOK_MILITÆR_SILVIL_TJENESTE]:re,[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:ae}}),y=p=>w=>{V.setValue(p,w,{shouldDirty:!0,shouldTouch:!0}),V.clearErrors(p)};return a.jsx(qn,{bannerTitle:i.formatMessage({id:"søknad.pageheading"}),onCancel:r,onContinueLater:s.fortsettSøknadSenere,steps:d,noFieldsRequired:!0,children:a.jsx(He,{formMethods:V,onSubmit:Pe,children:a.jsxs(B,{gap:"10",children:[a.jsx(Me,{attachments:J,familiehendelsesdato:c,navnPåForeldre:R,perioder:te,situasjon:l.situasjon,termindato:j,updateAttachments:y,erFarEllerMedmor:L}),a.jsx(Le,{attachments:x,familiehendelsesdato:c,navnPåForeldre:R,perioder:ue,situasjon:l.situasjon,termindato:j,updateAttachments:y,erFarEllerMedmor:L}),a.jsx(fe,{attachments:Y,familiehendelsesdato:c,navnPåForeldre:R,perioder:se,situasjon:l.situasjon,termindato:j,updateAttachments:y,erFarEllerMedmor:L}),a.jsx(Ie,{attachments:z,familiehendelsesdato:c,navnPåForeldre:R,perioder:ie,situasjon:l.situasjon,termindato:j,updateAttachments:y,erFarEllerMedmor:L}),a.jsx(ve,{attachments:H,familiehendelsesdato:c,navnPåForeldre:R,perioder:me,situasjon:l.situasjon,termindato:j,updateAttachments:y}),a.jsx(be,{attachments:C,familiehendelsesdato:c,navnPåForeldre:R,perioder:pe,situasjon:l.situasjon,termindato:j,updateAttachments:y}),a.jsx(qe,{attachments:$,familiehendelsesdato:c,navnPåForeldre:R,perioder:le,situasjon:l.situasjon,termindato:j,updateAttachments:y}),a.jsx(he,{attachments:Q,familiehendelsesdato:c,navnPåForeldre:R,perioder:oe,situasjon:l.situasjon,termindato:j,updateAttachments:y}),a.jsx(Ke,{attachments:W,familiehendelsesdato:c,navnPåForeldre:R,perioder:de,situasjon:l.situasjon,termindato:j,updateAttachments:y}),a.jsx(Ge,{attachments:X,familiehendelsesdato:c,navnPåForeldre:R,perioder:ke,situasjon:l.situasjon,termindato:j,updateAttachments:y}),a.jsx(je,{attachments:Z,updateAttachments:y,annenForelder:k}),a.jsx(Fe,{attachments:ee,updateAttachments:y,barn:_,arbeidsforhold:t.arbeidsforhold,erFarEllerMedmor:L}),a.jsx(Ue,{attachments:ne,updateAttachments:y,søkersituasjon:l}),a.jsx(Ne,{attachments:ae,updateAttachments:y,arbeidsforholdOgInntekt:N,andreInntektskilder:K}),a.jsx(De,{attachments:re,updateAttachments:y,arbeidsforholdOgInntekt:N,andreInntektskilder:K}),a.jsxs(hn,{size:"small",variant:"info",children:[a.jsx($e,{level:"2",size:"small",children:a.jsx(T,{id:"manglendeVedlegg.duKanSende.tittel"})}),a.jsx(ge,{children:a.jsx(T,{id:"manglendeVedlegg.duKanSende.innhold"})})]}),a.jsx(Ce,{goToPreviousStep:s.goToPreviousDefaultStep})]})})})};pr.__docgenInfo={description:"",methods:[],displayName:"ManglendeVedlegg",props:{søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    søker: Søker;
    arbeidsforhold: Arbeidsforhold[];
}`,signature:{properties:[{key:"søker",value:{name:"intersection",raw:`{
    fødselsdato: string;
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn: SøkerBarn[];
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    fødselsdato: string;
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn: SøkerBarn[];
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"bankkonto",value:{name:"Bankkonto",required:!1}},{key:"sivilstand",value:{name:"Sivilstand",required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"intersection",raw:`{
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
}`,signature:{properties:[{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"intersection",raw:`{
    fødselsdato?: string;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    fødselsdato?: string;
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}]}],raw:"SøkerBarn[]",required:!0}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}],required:!0}},{key:"arbeidsforhold",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""},erEndringssøknad:{required:!0,tsType:{name:"boolean"},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{pr as M};
