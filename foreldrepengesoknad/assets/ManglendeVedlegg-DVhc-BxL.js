import{aT as Oe,r as X,_ as a,bW as Re,bX as ge,Z as y,x as He,b4 as w,bY as $e,J as Te,y as Ce,G as Ze,$ as ce,bZ as Qe,a1 as T,q as G,b_ as _e,b$ as We,ar as Xe,c0 as en,c1 as nn,bs as ve,c2 as rn,I as Ae,a7 as L,D as an,a2 as tn,c3 as mn,c4 as un,c5 as sn,c6 as dn,c7 as ln,c8 as on,c9 as kn,ca as pn,cb as En,cc as yn,cd as Sn,ce as gn,cf as Tn,cg as _n,ch as An,ci as On,cj as Rn,ck as cn,cl as vn,cm as jn,cn as In,co as Nn,cp as Dn,cq as Ln,cr as Mn,aZ as fn,as as Kn,a_ as qn,a0 as hn,a5 as Gn,bl as bn}from"./iframe-DtqnyF_u.js";import{b as D,C as R,c as Un}from"./FpDataContext-C6RBdciT.js";import{A as V,j as Fn,b as Pn,a as wn,o as Vn,f as Bn}from"./useFpNavigator-Cq2TmE8s.js";import{j as P,a as Jn,g as xn,f as Yn}from"./annenForelderUtils-CkvsNLZm.js";import{I as ee,A as h,b as S,S as n,c as zn}from"./uttaksplanInfoUtils-Cqgqlo4l.js";import{g as Hn}from"./guid-CsArkN6i.js";import{k as $n,u as Cn,t as Zn}from"./api-Cn5PXQ2L.js";import{L as M}from"./List-LrIJhw8F.js";const je=(e,r)=>async t=>{const m=new FormData;m.append("id",t.id),m.append("vedlegg",t.file,t.filename);const i=await $n.post(`${e}/rest/storage/${r}/vedlegg`,{body:m});return{headers:{location:i.headers.get("Location")},data:await i.text()}},Qn=()=>"V".concat(Hn().replace(/-/g,"")),Ie=(e,r,t,m,i)=>({id:Qn(),file:e,filename:e.name,filesize:e.size,uploaded:!1,pending:!1,type:r,skjemanummer:t,innsendingsType:m,dokumenterer:i,url:null}),Ne=(e,r,t)=>Ie({name:""},e,r,ee.SEND_SENERE,t),Wn=(e,r,t)=>Ie({name:""},e,r,ee.AUTOMATISK,t),F=(e,r)=>({...e,dokumenterer:r}),De=(e,r)=>e.map((t,m)=>{const i=t.tom?ge(t.tom):r.formatMessage({id:"VedleggUploader.pågående"}),u=`${ge(t.fom)}-${i}`;return e.length===1||m===e.length-1?u:m<e.length-2?`${u}, `:`${u} ${r.formatMessage({id:"VedleggUploader.Og"})} `}).join(""),b=({attachments:e,updateAttachments:r,skjemanummer:t,labelText:m,description:i,attachmentType:u,metadataType:d,perioder:s})=>{const{watch:k}=Oe(),E=k(t);return X.useEffect(()=>{if(E.length===0){const l=Ne(u,t),o=F(l,{type:d,perioder:s});r([o])}},[r,E,u,t,d]),a.jsx(Re,{label:m,description:i,attachmentType:u,skjemanummer:t,existingAttachments:e,updateAttachments:l=>{const o=l.map(A=>F(A,{type:d,perioder:s}));r(o)},saveAttachment:je("./","foreldrepenger")})};b.__docgenInfo={description:"",methods:[],displayName:"VedleggUploader",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}},description:""},skjemanummer:{required:!0,tsType:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
}>`},description:""}}};const Le=({attachments:e,updateAttachments:r,annenForelder:t})=>{const m=y();return!He(t)||!t.datoForAleneomsorg?null:a.jsx(b,{attachments:e,updateAttachments:r(n.DOK_AV_ALENEOMSORG),skjemanummer:n.DOK_AV_ALENEOMSORG,labelText:m.formatMessage({id:"manglendeVedlegg.aleneomsorg.tittel"}),description:m.formatMessage({id:"manglendeVedlegg.aleneomsorg.description"}),attachmentType:S.ALENEOMSORG,metadataType:h.BARN})};Le.__docgenInfo={description:"",methods:[],displayName:"AleneomsorgDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},annenForelder:{required:!0,tsType:{name:"union",raw:"AnnenForelderIkkeOppgitt | AnnenForelderOppgitt",elements:[{name:"Common"},{name:"AnnenForelderOppgitt"}]},description:""}}};const Xn="_periodeAttachmentUploader_jo11m_1",er={periodeAttachmentUploader:Xn},c=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:u,situasjon:d,skjemanummer:s,labelText:k,description:E,attachmentType:l})=>{const{watch:o}=Oe(),A=o(s);return X.useEffect(()=>{if(A.length===0){const O=Ne(l,s),f=F(O,{type:h.UTTAK,perioder:t.map(K=>({fom:P(K.tidsperiode.fom),tom:P(K.tidsperiode.tom)}))});r([f])}},[r,t,A,l,s]),a.jsx(Re,{label:k,description:a.jsxs(a.Fragment,{children:[a.jsx(w,{children:E}),t.map(O=>a.jsx("div",{className:er.periodeAttachmentUploader,children:a.jsx($e,{periode:O,erAleneOmOmsorg:!1,erFarEllerMedmor:!0,navnPåForeldre:m,familiehendelsesdato:Te(i).toDate(),termindato:u?Te(u).toDate():void 0,situasjon:d,melding:void 0})},O.id))]}),attachmentType:l,skjemanummer:s,existingAttachments:e,updateAttachments:O=>{const f=O.map(K=>F(K,{type:h.UTTAK,perioder:t.map(U=>({fom:P(U.tidsperiode.fom),tom:P(U.tidsperiode.tom)}))}));return r(f)},saveAttachment:je("./","foreldrepenger")})};c.__docgenInfo={description:"",methods:[],displayName:"UttakUploader",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
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
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},description:""},labelText:{required:!0,tsType:{name:"string"},description:""},description:{required:!0,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:""},attachmentType:{required:!0,tsType:{name:"AttachmentType"},description:""}}};const Me=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:u,termindato:d})=>{const s=y();return t.length===0?null:a.jsx(c,{attachments:e,updateAttachments:r(n.DOK_INNLEGGELSE_BARN),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:u,skjemanummer:n.DOK_INNLEGGELSE_BARN,labelText:s.formatMessage({id:"manglendeVedlegg.barnInnlagt.label"}),description:s.formatMessage({id:"manglendeVedlegg.barnInnlagt.description"}),attachmentType:S.UTSETTELSE_SYKDOM})};Me.__docgenInfo={description:"",methods:[],displayName:"BarnInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const fe=({attachments:e,updateAttachments:r,arbeidsforholdOgInntekt:t,andreInntektskilder:m})=>{const i=y();if(!t||t&&t.harHattAndreInntektskilder===!1||!m||!m.some(d=>d.type===V.SLUTTPAKKE))return null;const u=m.filter(d=>d.type===V.SLUTTPAKKE);return a.jsx(b,{attachments:e,updateAttachments:r(n.ETTERLØNN_ELLER_SLUTTVEDERLAG),skjemanummer:n.ETTERLØNN_ELLER_SLUTTVEDERLAG,labelText:i.formatMessage({id:"manglendeVedlegg.etterlønn.tittel"},{perioder:De(u,i),antallPerioder:u.length}),description:i.formatMessage({id:"manglendeVedlegg.etterlønn.description"}),attachmentType:S.ANNEN_INNTEKT,metadataType:h.OPPTJENING,perioder:u})};fe.__docgenInfo={description:"",methods:[],displayName:"EtterlønnEllerSluttvederlagDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},arbeidsforholdOgInntekt:{required:!0,tsType:{name:"union",raw:"ArbeidsforholdOgInntektFp | undefined",elements:[{name:"intersection",raw:`{
    harHattAndreInntektskilder: boolean;
} & ArbeidsforholdOgInntektFelles`,elements:[{name:"signature",type:"object",raw:`{
    harHattAndreInntektskilder: boolean;
}`,signature:{properties:[{key:"harHattAndreInntektskilder",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]},{name:"undefined"}]},description:""},andreInntektskilder:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]}],raw:"AndreInntektskilder[]"},description:""}}};const Ke=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:u,termindato:d,erFarEllerMedmor:s})=>{const k=y();return t.length===0?null:a.jsx(c,{attachments:e,updateAttachments:r(n.DOK_SYKDOM_FAR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:u,skjemanummer:n.DOK_SYKDOM_FAR,labelText:k.formatMessage({id:"manglendeVedlegg.farForSyk.label"},{navn:m.farMedmor,erFarEllerMedmor:s}),description:k.formatMessage({id:"manglendeVedlegg.farForSyk.description"},{navn:m.farMedmor,erFarEllerMedmor:s}),attachmentType:S.UTSETTELSE_SYKDOM})};Ke.__docgenInfo={description:"",methods:[],displayName:"FarForSykDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const qe=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:u,termindato:d,erFarEllerMedmor:s})=>{const k=y();return t.length===0?null:a.jsx(c,{attachments:e,updateAttachments:r(n.DOK_INNLEGGELSE_FAR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:u,skjemanummer:n.DOK_INNLEGGELSE_FAR,labelText:k.formatMessage({id:"manglendeVedlegg.farInnlagt.label"},{navn:m.farMedmor,erFarEllerMedmor:s}),description:k.formatMessage({id:"manglendeVedlegg.farInnlagt.description"},{navn:m.farMedmor,erFarEllerMedmor:s}),attachmentType:S.UTSETTELSE_SYKDOM})};qe.__docgenInfo={description:"",methods:[],displayName:"FarInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const he=({attachments:e,updateAttachments:r,arbeidsforholdOgInntekt:t,andreInntektskilder:m})=>{const i=y();if(!t||t&&!t.harHattAndreInntektskilder||!m||!m.some(d=>d.type===V.MILITÆRTJENESTE))return null;const u=m.filter(d=>d.type===V.MILITÆRTJENESTE);return a.jsx(b,{attachments:e,updateAttachments:r(n.DOK_MILITÆR_SILVIL_TJENESTE),skjemanummer:n.DOK_MILITÆR_SILVIL_TJENESTE,labelText:i.formatMessage({id:"manglendeVedlegg.militær.tittel"},{perioder:De(u,i),antallPerioder:u.length}),description:i.formatMessage({id:"manglendeVedlegg.militær.description"}),attachmentType:S.ANNEN_INNTEKT,metadataType:h.OPPTJENING,perioder:u})};he.__docgenInfo={description:"",methods:[],displayName:"MilitærEllerSiviltjenesteDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},arbeidsforholdOgInntekt:{required:!0,tsType:{name:"union",raw:"ArbeidsforholdOgInntektFp | undefined",elements:[{name:"intersection",raw:`{
    harHattAndreInntektskilder: boolean;
} & ArbeidsforholdOgInntektFelles`,elements:[{name:"signature",type:"object",raw:`{
    harHattAndreInntektskilder: boolean;
}`,signature:{properties:[{key:"harHattAndreInntektskilder",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]},{name:"undefined"}]},description:""},andreInntektskilder:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]}],raw:"AndreInntektskilder[]"},description:""}}};const Ge=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:u,termindato:d,erFarEllerMedmor:s})=>{const k=y();return t.length===0?null:a.jsx(c,{attachments:e,updateAttachments:r(n.DOK_SYKDOM_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:u,skjemanummer:n.DOK_SYKDOM_MOR,labelText:k.formatMessage({id:"manglendeVedlegg.morForSyk.label"},{navn:m.mor,erFarEllerMedmor:s}),description:k.formatMessage({id:"manglendeVedlegg.morForSyk.description"},{navn:m.mor,erFarEllerMedmor:s}),attachmentType:S.UTSETTELSE_SYKDOM})};Ge.__docgenInfo={description:"",methods:[],displayName:"MorForSykDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const be=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:u,termindato:d,erFarEllerMedmor:s})=>{const k=y();if(t.length===0)return null;const E=t.find(l=>l.type===Ce.Uttak&&l.erMorForSyk===!0&&l.konto===Ze.Fedrekvote)!==void 0;return a.jsx(c,{attachments:e,updateAttachments:r(n.DOK_INNLEGGELSE_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:u,skjemanummer:n.DOK_INNLEGGELSE_MOR,labelText:E?k.formatMessage({id:"manglendeVedlegg.morInnlagtEllerSyk.label"},{navn:m.mor,erFarEllerMedmor:s}):k.formatMessage({id:"manglendeVedlegg.morInnlagt.label"},{navn:m.mor,erFarEllerMedmor:s}),description:E?k.formatMessage({id:"manglendeVedlegg.morInnlagtEllerSyk.description"},{navn:m.mor,erFarEllerMedmor:s}):k.formatMessage({id:"manglendeVedlegg.morInnlagt.description"},{navn:m.mor,erFarEllerMedmor:s}),attachmentType:S.UTSETTELSE_SYKDOM})};be.__docgenInfo={description:"",methods:[],displayName:"MorInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Ue=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:u,termindato:d})=>{const s=y();return t.length===0?null:a.jsx(c,{attachments:e,updateAttachments:r(n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:u,skjemanummer:n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET,labelText:s.formatMessage({id:"manglendeVedlegg.introduksjonsprogram.tittel"}),description:s.formatMessage({id:"manglendeVedlegg.introduksjonsprogram.description"},{navn:m.mor}),attachmentType:S.MORS_AKTIVITET_DOKUMENTASJON})};Ue.__docgenInfo={description:"",methods:[],displayName:"MorIntroduksjonsprogrammetDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Fe=()=>a.jsxs(ce,{gap:"2",children:[a.jsx(Qe,{children:a.jsx(T,{id:"dokumentasjon.ikke.påkrevd.label"})}),a.jsx(w,{className:"text-text-subtle",children:a.jsx(T,{id:"dokumentasjon.ikke.påkrevd.beskrivelse.1"})}),a.jsx(w,{className:"text-text-subtle",children:a.jsx(T,{id:"dokumentasjon.ikke.påkrevd.beskrivelse.2"})})]});Fe.__docgenInfo={description:"",methods:[],displayName:"IngenDokumentasjonPåkrevd"};const Pe=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:u,erFarEllerMedmor:d,termindato:s})=>{if(t.length===0)return null;const k=y(),E=G(D(R.ANNEN_FORELDER)),l=G(D(R.OM_BARNET)),o=_e(E)?E.fnr:void 0,A=r(n.DOK_ARBEID_MOR);if(o&&!We(E)){const O=_e(E)&&d&&E.harRettPåForeldrepengerINorge===!1,f=rr(t,l,O,o),K=Cn({...Zn(f),enabled:!!f});if(K.isPending)return a.jsx(Xe,{className:"self-center",size:"large"});if(!(K.data??!0))return a.jsx(nr,{perioder:t,updateDokArbeidMorAttachment:A})}return a.jsx(c,{attachments:e,updateAttachments:A,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:s,situasjon:u,skjemanummer:n.DOK_ARBEID_MOR,labelText:k.formatMessage({id:"manglendeVedlegg.morJobber.label"}),description:k.formatMessage({id:"manglendeVedlegg.morJobber.description"},{navn:m.mor}),attachmentType:S.MORS_AKTIVITET_DOKUMENTASJON})},nr=({updateDokArbeidMorAttachment:e,perioder:r})=>(X.useEffect(()=>{const t=Wn(S.MORS_AKTIVITET_DOKUMENTASJON,n.DOK_ARBEID_MOR),m=F(t,{type:h.UTTAK,perioder:r.map(i=>({fom:Ae(i.tidsperiode.fom),tom:Ae(i.tidsperiode.tom)}))});e([m])},[]),a.jsx(Fe,{})),rr=(e,r,t,m)=>{const i=(en(r)||nn(r))&&r.fnr!==void 0&&r.fnr.length>0?r.fnr[0]:void 0;return{annenPartFødselsnummer:m,barnFødselsnummer:i,familiehendelse:ve(r),perioder:e.map(u=>({fom:u.tidsperiode.fom.toISOString(),tom:u.tidsperiode.tom.toISOString(),periodeType:t&&rn(u)?"UTSETTELSE":"UTTAK"}))}};Pe.__docgenInfo={description:"",methods:[],displayName:"MorJobberDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const we=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:u,termindato:d})=>{const s=y();return t.length===0?null:a.jsx(c,{attachments:e,updateAttachments:r(n.DOK_UTDANNING_OG_ARBEID_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:u,skjemanummer:n.DOK_UTDANNING_OG_ARBEID_MOR,labelText:s.formatMessage({id:"manglendeVedlegg.studererOgJobber.label"}),description:a.jsxs(a.Fragment,{children:[a.jsx(L,{children:a.jsx(T,{id:"manglendeVedlegg.studererOgJobber.description.tittel",values:{navn:m.mor}})}),a.jsxs(M,{children:[a.jsx(M.Item,{children:a.jsx(L,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt1"})})}),a.jsx(M.Item,{children:a.jsx(L,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt2"})})}),a.jsx(M.Item,{children:a.jsx(L,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt3"})})}),a.jsx(M.Item,{children:a.jsx(L,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt4"})})})]})]}),attachmentType:S.MORS_AKTIVITET_DOKUMENTASJON})};we.__docgenInfo={description:"",methods:[],displayName:"MorJobberOgStudererDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Ve=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:u,termindato:d})=>{const s=y();return t.length===0?null:a.jsx(c,{attachments:e,updateAttachments:r(n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:u,skjemanummer:n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM,labelText:s.formatMessage({id:"manglendeVedlegg.kvalifiseringsprogram.tittel"}),description:s.formatMessage({id:"manglendeVedlegg.kvalifiseringsprogram.description"},{navn:m.mor}),attachmentType:S.MORS_AKTIVITET_DOKUMENTASJON})};Ve.__docgenInfo={description:"",methods:[],displayName:"MorKvalifiseringsprogrammetDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Be=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:i,situasjon:u,termindato:d})=>{const s=y();return t.length===0?null:a.jsx(c,{attachments:e,updateAttachments:r(n.DOK_UTDANNING_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:i,termindato:d,situasjon:u,skjemanummer:n.DOK_UTDANNING_MOR,labelText:s.formatMessage({id:"manglendeVedlegg.studerer.label"}),description:a.jsxs(a.Fragment,{children:[a.jsx(L,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.tittel",values:{navn:m.mor}})}),a.jsxs(M,{as:"ul",children:[a.jsx(M.Item,{children:a.jsx(L,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt1"})})}),a.jsx(M.Item,{children:a.jsx(L,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt2"})})}),a.jsx(M.Item,{children:a.jsx(L,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt3"})})}),a.jsx(M.Item,{children:a.jsx(L,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt4"})})})]})]}),attachmentType:S.MORS_AKTIVITET_DOKUMENTASJON})};Be.__docgenInfo={description:"",methods:[],displayName:"MorStudererDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:"AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode",elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Je=({attachments:e,updateAttachments:r,søkersituasjon:t})=>{const m=y();return t.situasjon!=="adopsjon"?null:a.jsx(b,{attachments:e,updateAttachments:r(n.OMSORGSOVERTAKELSE),skjemanummer:n.OMSORGSOVERTAKELSE,labelText:m.formatMessage({id:"manglendeVedlegg.omsorgsovertakelse.tittel"}),description:m.formatMessage({id:"manglendeVedlegg.omsorgsovertakelse.description"}),attachmentType:S.OMSORGSOVERTAKELSE,metadataType:h.BARN})};Je.__docgenInfo={description:"",methods:[],displayName:"OmsorgsovertakelseDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},søkersituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    situasjon?: Situasjon;
}`,signature:{properties:[{key:"situasjon",value:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}],required:!1}}]}},description:""}}};const ar=(e,r)=>e?r?Jn(r):!1:!0,xe=({attachments:e,updateAttachments:r,barn:t,arbeidsforhold:m,erFarEllerMedmor:i})=>{const u=y(),d=Fn(m,an(t),i,ve(t));return!tn(t)||d.length>0&&!i||!ar(i,t.termindato)?null:a.jsx(b,{attachments:e,updateAttachments:r(n.TERMINBEKREFTELSE),skjemanummer:n.TERMINBEKREFTELSE,labelText:u.formatMessage({id:"manglendeVedlegg.terminbekreftelse.tittel"}),description:u.formatMessage({id:i?"manglendeVedlegg.terminbekreftelse.description.farMedmor":"manglendeVedlegg.terminbekreftelse.description"}),attachmentType:S.TERMINBEKREFTELSE,metadataType:h.BARN})};xe.__docgenInfo={description:"",methods:[],displayName:"TerminbekreftelseDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    url: string | null;
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},barn:{required:!0,tsType:{name:"union",raw:"FødtBarn | UfødtBarn | AdoptertBarn | AdoptertStebarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn",elements:[{name:"FødtBarn"},{name:"UfødtBarn"},{name:"AdoptertBarn"},{name:"AdoptertStebarn"},{name:"AdoptertAnnetBarn"},{name:"IkkeUtfyltTypeBarn"}]},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]"},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const tr=e=>mn(e)||un(e)||sn(e)||dn(e)||ln(e)||on(e),mr=e=>En(e)||yn(e)||Sn(e)||gn(e)||Tn(e),ir=e=>pn(e),ur=e=>kn(e),sr=e=>Nn(e)||Dn(e),dr=e=>On(e)||Rn(e),lr=e=>cn(e)||vn(e),or=e=>_n(e)||An(e),kr=e=>jn(e)||In(e),pr=e=>{const r=e[n.OMSORGSOVERTAKELSE]?e[n.OMSORGSOVERTAKELSE]:[];return _(r)},Er=e=>{const r=e[n.DOK_AV_ALENEOMSORG]?e[n.DOK_AV_ALENEOMSORG]:[];return _(r)},yr=e=>{const r=e[n.TERMINBEKREFTELSE]?e[n.TERMINBEKREFTELSE]:[];return _(r)},Sr=e=>{const r=e[n.DOK_MILITÆR_SILVIL_TJENESTE]?e[n.DOK_MILITÆR_SILVIL_TJENESTE]:[];return _(r)},gr=e=>{const r=e[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]?e[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[];return _(r)},Tr=e=>{const r=e[n.DOK_INNLEGGELSE_MOR]?e[n.DOK_INNLEGGELSE_MOR]:[];return _(r)},_r=e=>{const r=e[n.DOK_SYKDOM_MOR]?e[n.DOK_SYKDOM_MOR]:[];return _(r)},Ar=e=>{const r=e[n.DOK_INNLEGGELSE_FAR]?e[n.DOK_INNLEGGELSE_FAR]:[];return _(r)},Or=e=>{const r=e[n.DOK_SYKDOM_FAR]?e[n.DOK_SYKDOM_FAR]:[];return _(r)},Rr=e=>{const r=e[n.DOK_INNLEGGELSE_BARN]?e[n.DOK_INNLEGGELSE_BARN]:[];return _(r)},cr=e=>{const r=e[n.DOK_UTDANNING_MOR]?e[n.DOK_UTDANNING_MOR]:[];return _(r)},vr=e=>{const r=e[n.DOK_ARBEID_MOR]?e[n.DOK_ARBEID_MOR]:[];return _(r)},jr=e=>{const r=e[n.DOK_UTDANNING_OG_ARBEID_MOR]?e[n.DOK_UTDANNING_OG_ARBEID_MOR]:[];return _(r)},Ir=e=>{const r=e[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]?e[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[];return _(r)},Nr=e=>{const r=e[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]?e[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[];return _(r)},Dr=e=>e.innsendingsType===ee.SEND_SENERE,_=e=>e.filter(r=>!Dr(r)),Lr=({mellomlagreSøknadOgNaviger:e,avbrytSøknad:r,søkerInfo:t,erEndringssøknad:m})=>{const i=y(),u=Pn(t.arbeidsforhold,e,m),d=wn(t.arbeidsforhold,m),s=G(D(R.UTTAKSPLAN)),k=G(D(R.ANNEN_FORELDER)),E=G(D(R.OM_BARNET)),l=G(D(R.SØKERSITUASJON)),o=D(R.VEDLEGG)||{},A=D(R.UTTAKSPLAN_METADATA),O=D(R.ARBEIDSFORHOLD_OG_INNTEKT),f=D(R.ANDRE_INNTEKTSKILDER),K=Un(R.VEDLEGG),U=zn(s,A==null?void 0:A.perioderSomSkalSendesInn,m),q=Vn(l.rolle),v=Ln(U,q,k),ne=Tr(o),re=_r(o),ae=Ar(o),te=Or(o),me=Rr(o),ie=cr(o),ue=vr(o),se=jr(o),de=Ir(o),le=Nr(o),oe=Er(o),ke=yr(o),pe=pr(o),Ee=Sr(o),ye=gr(o),B=v.filter(tr),J=v.filter(Mn),x=v.filter(ur),Y=v.filter(ir),z=v.filter(mr),H=v.filter(or),Se=v.filter(dr),$=v.filter(lr),C=v.filter(kr),Z=v.filter(sr),j=Bn(t.søker,k,q,i),I=xn(E),N=Yn(E),Ye=p=>{const W={...o,[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:C.length?p[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:H.length>0?p[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[n.DOK_INNLEGGELSE_MOR]:B.length>0?p[n.DOK_INNLEGGELSE_MOR]:[],[n.DOK_INNLEGGELSE_BARN]:J.length>0?p[n.DOK_INNLEGGELSE_BARN]:[],[n.DOK_INNLEGGELSE_FAR]:Y.length>0?p[n.DOK_INNLEGGELSE_FAR]:[],[n.DOK_SYKDOM_MOR]:z.length>0?p[n.DOK_SYKDOM_MOR]:[],[n.DOK_SYKDOM_FAR]:x.length>0?p[n.DOK_SYKDOM_FAR]:[],[n.DOK_UTDANNING_MOR]:Z.length>0?p[n.DOK_UTDANNING_MOR]:[],[n.DOK_UTDANNING_OG_ARBEID_MOR]:$.length>0?p[n.DOK_UTDANNING_OG_ARBEID_MOR]:[],[n.DOK_ARBEID_MOR]:Se.length>0?p[n.DOK_ARBEID_MOR]:[],[n.DOK_AV_ALENEOMSORG]:p[n.DOK_AV_ALENEOMSORG]||[],[n.TERMINBEKREFTELSE]:p[n.TERMINBEKREFTELSE]||[],[n.OMSORGSOVERTAKELSE]:p[n.OMSORGSOVERTAKELSE]||[],[n.DOK_MILITÆR_SILVIL_TJENESTE]:p[n.DOK_MILITÆR_SILVIL_TJENESTE]||[],[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:p[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]||[]};return K(W),u.goToNextDefaultStep()},Q=fn({defaultValues:{[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:le,[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:de,[n.DOK_INNLEGGELSE_MOR]:ne,[n.DOK_INNLEGGELSE_BARN]:me,[n.DOK_INNLEGGELSE_FAR]:ae,[n.DOK_SYKDOM_FAR]:te,[n.DOK_SYKDOM_MOR]:re,[n.DOK_UTDANNING_MOR]:ie,[n.DOK_UTDANNING_OG_ARBEID_MOR]:se,[n.DOK_ARBEID_MOR]:ue,[n.DOK_AV_ALENEOMSORG]:oe,[n.TERMINBEKREFTELSE]:ke,[n.OMSORGSOVERTAKELSE]:pe,[n.DOK_MILITÆR_SILVIL_TJENESTE]:Ee,[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:ye}}),g=p=>W=>{Q.setValue(p,W,{shouldDirty:!0,shouldTouch:!0}),Q.clearErrors(p)},ze=[B,J,x,Y,z,H,$,C,Z].flat().length===0;return a.jsx(Kn,{bannerTitle:i.formatMessage({id:"søknad.pageheading"}),onCancel:r,onContinueLater:u.fortsettSøknadSenere,steps:d,noFieldsRequired:!0,children:a.jsx(qn,{formMethods:Q,onSubmit:Ye,children:a.jsxs(ce,{gap:"10",children:[a.jsx(be,{attachments:ne,familiehendelsesdato:I,navnPåForeldre:j,perioder:B,situasjon:l.situasjon,termindato:N,updateAttachments:g,erFarEllerMedmor:q}),a.jsx(Ge,{attachments:re,familiehendelsesdato:I,navnPåForeldre:j,perioder:z,situasjon:l.situasjon,termindato:N,updateAttachments:g,erFarEllerMedmor:q}),a.jsx(qe,{attachments:ae,familiehendelsesdato:I,navnPåForeldre:j,perioder:Y,situasjon:l.situasjon,termindato:N,updateAttachments:g,erFarEllerMedmor:q}),a.jsx(Ke,{attachments:te,familiehendelsesdato:I,navnPåForeldre:j,perioder:x,situasjon:l.situasjon,termindato:N,updateAttachments:g,erFarEllerMedmor:q}),a.jsx(Me,{attachments:me,familiehendelsesdato:I,navnPåForeldre:j,perioder:J,situasjon:l.situasjon,termindato:N,updateAttachments:g}),a.jsx(Be,{attachments:ie,familiehendelsesdato:I,navnPåForeldre:j,perioder:Z,situasjon:l.situasjon,termindato:N,updateAttachments:g}),a.jsx(Pe,{attachments:ue,familiehendelsesdato:I,navnPåForeldre:j,perioder:Se,situasjon:l.situasjon,erFarEllerMedmor:q,termindato:N,updateAttachments:g}),a.jsx(we,{attachments:se,familiehendelsesdato:I,navnPåForeldre:j,perioder:$,situasjon:l.situasjon,termindato:N,updateAttachments:g}),a.jsx(Ue,{attachments:de,familiehendelsesdato:I,navnPåForeldre:j,perioder:H,situasjon:l.situasjon,termindato:N,updateAttachments:g}),a.jsx(Ve,{attachments:le,familiehendelsesdato:I,navnPåForeldre:j,perioder:C,situasjon:l.situasjon,termindato:N,updateAttachments:g}),a.jsx(Le,{attachments:oe,updateAttachments:g,annenForelder:k}),a.jsx(xe,{attachments:ke,updateAttachments:g,barn:E,arbeidsforhold:t.arbeidsforhold,erFarEllerMedmor:q}),a.jsx(Je,{attachments:pe,updateAttachments:g,søkersituasjon:l}),a.jsx(fe,{attachments:ye,updateAttachments:g,arbeidsforholdOgInntekt:O,andreInntektskilder:f}),a.jsx(he,{attachments:Ee,updateAttachments:g,arbeidsforholdOgInntekt:O,andreInntektskilder:f}),!ze&&a.jsxs(hn,{size:"small",variant:"info",children:[a.jsx(Gn,{level:"2",size:"small",children:a.jsx(T,{id:"manglendeVedlegg.duKanSende.tittel"})}),a.jsx(w,{children:a.jsx(T,{id:"manglendeVedlegg.duKanSende.innhold"})})]}),a.jsx(bn,{goToPreviousStep:u.goToPreviousDefaultStep})]})})})};Lr.__docgenInfo={description:"",methods:[],displayName:"ManglendeVedlegg",props:{søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    søker: PersonFrontend;
    arbeidsforhold: Arbeidsforhold[];
}`,signature:{properties:[{key:"søker",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: Kjønn;
    fødselsdato: string;
    bankkonto?: Bankkonto;
    barn: BarnFrontend[];
    sivilstand?: Sivilstand;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"bankkonto",value:{name:"signature",type:"object",raw:`{
    kontonummer?: string;
    banknavn?: string;
}`,signature:{properties:[{key:"kontonummer",value:{name:"string",required:!1}},{key:"banknavn",value:{name:"string",required:!1}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: AnnenForelderFrontend;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}}]}}],raw:"BarnFrontend[]",required:!0}},{key:"sivilstand",value:{name:"signature",type:"object",raw:`{
    type?: SivilstandType;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:`| 'UOPPGITT'
| 'UGIFT'
| 'GIFT'
| 'ENKE_ELLER_ENKEMANN'
| 'SKILT'
| 'SEPARERT'
| 'REGISTRERT_PARTNER'
| 'SEPARERT_PARTNER'
| 'SKILT_PARTNER'
| 'GJENLEVENDE_PARTNER'`,elements:[{name:"literal",value:"'UOPPGITT'"},{name:"literal",value:"'UGIFT'"},{name:"literal",value:"'GIFT'"},{name:"literal",value:"'ENKE_ELLER_ENKEMANN'"},{name:"literal",value:"'SKILT'"},{name:"literal",value:"'SEPARERT'"},{name:"literal",value:"'REGISTRERT_PARTNER'"},{name:"literal",value:"'SEPARERT_PARTNER'"},{name:"literal",value:"'SKILT_PARTNER'"},{name:"literal",value:"'GJENLEVENDE_PARTNER'"}],required:!1}}]},required:!1}}]},required:!0}},{key:"arbeidsforhold",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""},erEndringssøknad:{required:!0,tsType:{name:"boolean"},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{Lr as M};
