import{aZ as Ae,r as X,l as t,b_ as De,b$ as Ee,a6 as k,C as He,ba as F,c0 as Ce,U as ve,D as $e,V as Oe,c1 as Qe,M as S,x as w,c2 as Se,c3 as Ze,L as We,c4 as Xe,c5 as er,by as Ne,c6 as rr,T as Te,B as I,J as nr,a8 as tr,c7 as ar,c8 as ir,c9 as sr,ca as mr,cb as ur,cc as lr,cd as or,ce as dr,cf as pr,cg as gr,ch as yr,ci as kr,cj as Er,ck as vr,cl as Sr,cm as Tr,cn as Ar,co as Dr,cp as Or,cq as Nr,cr as _r,cs as Rr,ct as jr,cu as cr,cv as Ir,b4 as fr,m as br,at as Lr,b5 as qr,a7 as Kr,q as Gr,bq as wr}from"./iframe-80xrIdFK.js";import{b as c,C as D,c as hr}from"./FpDataContext-CSFYd9l2.js";import{A as V,j as Pr,b as Mr,a as Ur,o as Fr,f as Vr}from"./useFpNavigator-CvXySPCP.js";import{j as U,a as Br,g as Jr,f as xr}from"./annenForelderUtils-D8pKzxh4.js";import{A as G,b as E,S as r,c as Yr}from"./uttaksplanInfoUtils-DmaNmK1p.js";import{k as zr,A as _e,u as Hr,t as Cr}from"./index-DhmoAxZX.js";import{g as $r}from"./eksisterendeSakUtils-hr4IolH2.js";import{L as f}from"./List-D7bEoczz.js";const Re=e=>async n=>{const a=new FormData;return a.append("id",n.id),a.append("vedlegg",n.file,n.filename),{data:await(await zr.post(e,{body:a})).json()}},Qr=()=>"V".concat($r().replace(/-/g,"")),je=(e,n,a,i,m)=>({id:Qr(),file:e,filename:e.name,filesize:e.size,uploaded:!1,pending:!1,type:n,skjemanummer:a,innsendingsType:i,dokumenterer:m}),ce=(e,n,a)=>je({name:""},e,n,"SEND_SENERE",a),Zr=(e,n,a)=>je({name:""},e,n,"AUTOMATISK",a),M=(e,n)=>({...e,dokumenterer:n}),Ie=(e,n)=>e.map((a,i)=>{const m=a.tom?Ee(a.tom):n.formatMessage({id:"VedleggUploader.pågående"}),s=`${Ee(a.fom)}-${m}`;return e.length===1||i===e.length-1?s:i<e.length-2?`${s}, `:`${s} ${n.formatMessage({id:"VedleggUploader.Og"})} `}).join(""),h=({attachments:e,updateAttachments:n,skjemanummer:a,labelText:i,description:m,attachmentType:s,metadataType:l,perioder:u})=>{const{watch:p}=Ae(),y=p(a);return X.useEffect(()=>{if(y.length===0){const o=ce(s,a),d=M(o,{type:l,perioder:u});n([d])}},[n,y,s,a,l]),t.jsx(De,{label:i,description:m,attachmentType:s,skjemanummer:a,existingAttachments:e,updateAttachments:o=>{const d=o.map(b=>M(b,{type:l,perioder:u}));n(d)},saveAttachment:Re(_e.sendVedlegg)})};h.__docgenInfo={description:"",methods:[],displayName:"VedleggUploader",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}},description:""},skjemanummer:{required:!0,tsType:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
}>`},description:""}}};const fe=({attachments:e,updateAttachments:n,annenForelder:a})=>{const i=k();return!He(a)||!a.datoForAleneomsorg?null:t.jsx(h,{attachments:e,updateAttachments:n(r.DOK_AV_ALENEOMSORG),skjemanummer:r.DOK_AV_ALENEOMSORG,labelText:i.formatMessage({id:"manglendeVedlegg.aleneomsorg.tittel"}),description:i.formatMessage({id:"manglendeVedlegg.aleneomsorg.description"}),attachmentType:E.ALENEOMSORG,metadataType:G.BARN})};fe.__docgenInfo={description:"",methods:[],displayName:"AleneomsorgDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},annenForelder:{required:!0,tsType:{name:"union",raw:"AnnenForelderIkkeOppgitt | AnnenForelderOppgitt",elements:[{name:"Common"},{name:"AnnenForelderOppgitt"}]},description:""}}};const O=({attachments:e,updateAttachments:n,perioder:a,navnPåForeldre:i,familiehendelsesdato:m,termindato:s,situasjon:l,skjemanummer:u,labelText:p,description:y,attachmentType:o})=>{const{watch:d}=Ae(),b=d(u);return X.useEffect(()=>{if(b.length===0){const A=ce(o,u),L=M(A,{type:G.UTTAK,perioder:a.map(q=>({fom:U(q.tidsperiode.fom),tom:U(q.tidsperiode.tom)}))});n([L])}},[n,a,b,o,u]),t.jsx(De,{label:p,description:t.jsxs(t.Fragment,{children:[t.jsx(F,{children:y}),a.map(A=>t.jsx("div",{className:"my-4",children:t.jsx(Ce,{periode:A,erAleneOmOmsorg:!1,erFarEllerMedmor:!0,navnPåForeldre:i,familiehendelsesdato:ve(m).toDate(),termindato:s?ve(s).toDate():void 0,situasjon:l,melding:void 0})},A.id))]}),attachmentType:o,skjemanummer:u,existingAttachments:e,updateAttachments:A=>{const L=A.map(q=>M(q,{type:G.UTTAK,perioder:a.map(P=>({fom:U(P.tidsperiode.fom),tom:U(P.tidsperiode.tom)}))}));return n(L)},saveAttachment:Re(_e.sendVedlegg)})};O.__docgenInfo={description:"",methods:[],displayName:"UttakUploader",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},skjemanummer:{required:!0,tsType:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},description:""},labelText:{required:!0,tsType:{name:"string"},description:""},description:{required:!0,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:""},attachmentType:{required:!0,tsType:{name:"AttachmentType"},description:""}}};const be=({attachments:e,updateAttachments:n,perioder:a,navnPåForeldre:i,familiehendelsesdato:m,situasjon:s,termindato:l})=>{const u=k();return a.length===0?null:t.jsx(O,{attachments:e,updateAttachments:n(r.DOK_INNLEGGELSE_BARN),perioder:a,navnPåForeldre:i,familiehendelsesdato:m,termindato:l,situasjon:s,skjemanummer:r.DOK_INNLEGGELSE_BARN,labelText:u.formatMessage({id:"manglendeVedlegg.barnInnlagt.label"}),description:u.formatMessage({id:"manglendeVedlegg.barnInnlagt.description"}),attachmentType:E.UTSETTELSE_SYKDOM})};be.__docgenInfo={description:"",methods:[],displayName:"BarnInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Le=({attachments:e,updateAttachments:n,arbeidsforholdOgInntekt:a,andreInntektskilder:i})=>{const m=k();if(!a||a&&a.harHattAndreInntektskilder===!1||!i||!i.some(l=>l.type===V.SLUTTPAKKE))return null;const s=i.filter(l=>l.type===V.SLUTTPAKKE);return t.jsx(h,{attachments:e,updateAttachments:n(r.ETTERLØNN_ELLER_SLUTTVEDERLAG),skjemanummer:r.ETTERLØNN_ELLER_SLUTTVEDERLAG,labelText:m.formatMessage({id:"manglendeVedlegg.etterlønn.tittel"},{perioder:Ie(s,m),antallPerioder:s.length}),description:m.formatMessage({id:"manglendeVedlegg.etterlønn.description"}),attachmentType:E.ANNEN_INNTEKT,metadataType:G.OPPTJENING,perioder:s})};Le.__docgenInfo={description:"",methods:[],displayName:"EtterlønnEllerSluttvederlagDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},arbeidsforholdOgInntekt:{required:!0,tsType:{name:"union",raw:"ArbeidsforholdOgInntektFp | undefined",elements:[{name:"intersection",raw:`{
    harHattAndreInntektskilder: boolean;
} & ArbeidsforholdOgInntektFelles`,elements:[{name:"signature",type:"object",raw:`{
    harHattAndreInntektskilder: boolean;
}`,signature:{properties:[{key:"harHattAndreInntektskilder",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]},{name:"undefined"}]},description:""},andreInntektskilder:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]}],raw:"AndreInntektskilder[]"},description:""}}};const qe=({attachments:e,updateAttachments:n,perioder:a,navnPåForeldre:i,familiehendelsesdato:m,situasjon:s,termindato:l,erFarEllerMedmor:u})=>{const p=k();return a.length===0?null:t.jsx(O,{attachments:e,updateAttachments:n(r.DOK_SYKDOM_FAR),perioder:a,navnPåForeldre:i,familiehendelsesdato:m,termindato:l,situasjon:s,skjemanummer:r.DOK_SYKDOM_FAR,labelText:p.formatMessage({id:"manglendeVedlegg.farForSyk.label"},{navn:i.farMedmor,erFarEllerMedmor:u}),description:p.formatMessage({id:"manglendeVedlegg.farForSyk.description"},{navn:i.farMedmor,erFarEllerMedmor:u}),attachmentType:E.UTSETTELSE_SYKDOM})};qe.__docgenInfo={description:"",methods:[],displayName:"FarForSykDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Ke=({attachments:e,updateAttachments:n,perioder:a,navnPåForeldre:i,familiehendelsesdato:m,situasjon:s,termindato:l,erFarEllerMedmor:u})=>{const p=k();return a.length===0?null:t.jsx(O,{attachments:e,updateAttachments:n(r.DOK_INNLEGGELSE_FAR),perioder:a,navnPåForeldre:i,familiehendelsesdato:m,termindato:l,situasjon:s,skjemanummer:r.DOK_INNLEGGELSE_FAR,labelText:p.formatMessage({id:"manglendeVedlegg.farInnlagt.label"},{navn:i.farMedmor,erFarEllerMedmor:u}),description:p.formatMessage({id:"manglendeVedlegg.farInnlagt.description"},{navn:i.farMedmor,erFarEllerMedmor:u}),attachmentType:E.UTSETTELSE_SYKDOM})};Ke.__docgenInfo={description:"",methods:[],displayName:"FarInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Ge=({attachments:e,updateAttachments:n,arbeidsforholdOgInntekt:a,andreInntektskilder:i})=>{const m=k();if(!a||a&&!a.harHattAndreInntektskilder||!i||!i.some(l=>l.type===V.MILITÆRTJENESTE))return null;const s=i.filter(l=>l.type===V.MILITÆRTJENESTE);return t.jsx(h,{attachments:e,updateAttachments:n(r.DOK_MILITÆR_SILVIL_TJENESTE),skjemanummer:r.DOK_MILITÆR_SILVIL_TJENESTE,labelText:m.formatMessage({id:"manglendeVedlegg.militær.tittel"},{perioder:Ie(s,m),antallPerioder:s.length}),description:m.formatMessage({id:"manglendeVedlegg.militær.description"}),attachmentType:E.ANNEN_INNTEKT,metadataType:G.OPPTJENING,perioder:s})};Ge.__docgenInfo={description:"",methods:[],displayName:"MilitærEllerSiviltjenesteDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},arbeidsforholdOgInntekt:{required:!0,tsType:{name:"union",raw:"ArbeidsforholdOgInntektFp | undefined",elements:[{name:"intersection",raw:`{
    harHattAndreInntektskilder: boolean;
} & ArbeidsforholdOgInntektFelles`,elements:[{name:"signature",type:"object",raw:`{
    harHattAndreInntektskilder: boolean;
}`,signature:{properties:[{key:"harHattAndreInntektskilder",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]},{name:"undefined"}]},description:""},andreInntektskilder:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]}],raw:"AndreInntektskilder[]"},description:""}}};const we=({attachments:e,updateAttachments:n,perioder:a,navnPåForeldre:i,familiehendelsesdato:m,situasjon:s,termindato:l,erFarEllerMedmor:u})=>{const p=k();return a.length===0?null:t.jsx(O,{attachments:e,updateAttachments:n(r.DOK_SYKDOM_MOR),perioder:a,navnPåForeldre:i,familiehendelsesdato:m,termindato:l,situasjon:s,skjemanummer:r.DOK_SYKDOM_MOR,labelText:p.formatMessage({id:"manglendeVedlegg.morForSyk.label"},{navn:i.mor,erFarEllerMedmor:u}),description:p.formatMessage({id:"manglendeVedlegg.morForSyk.description"},{navn:i.mor,erFarEllerMedmor:u}),attachmentType:E.UTSETTELSE_SYKDOM})};we.__docgenInfo={description:"",methods:[],displayName:"MorForSykDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const he=({attachments:e,updateAttachments:n,perioder:a,navnPåForeldre:i,familiehendelsesdato:m,situasjon:s,termindato:l,erFarEllerMedmor:u})=>{const p=k();if(a.length===0)return null;const y=a.some(o=>o.type===$e.Uttak&&o.erMorForSyk===!0&&o.konto==="FEDREKVOTE");return t.jsx(O,{attachments:e,updateAttachments:n(r.DOK_INNLEGGELSE_MOR),perioder:a,navnPåForeldre:i,familiehendelsesdato:m,termindato:l,situasjon:s,skjemanummer:r.DOK_INNLEGGELSE_MOR,labelText:y?p.formatMessage({id:"manglendeVedlegg.morInnlagtEllerSyk.label"},{navn:i.mor,erFarEllerMedmor:u}):p.formatMessage({id:"manglendeVedlegg.morInnlagt.label"},{navn:i.mor,erFarEllerMedmor:u}),description:y?p.formatMessage({id:"manglendeVedlegg.morInnlagtEllerSyk.description"},{navn:i.mor,erFarEllerMedmor:u}):p.formatMessage({id:"manglendeVedlegg.morInnlagt.description"},{navn:i.mor,erFarEllerMedmor:u}),attachmentType:E.UTSETTELSE_SYKDOM})};he.__docgenInfo={description:"",methods:[],displayName:"MorInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Pe=({attachments:e,updateAttachments:n,perioder:a,navnPåForeldre:i,familiehendelsesdato:m,situasjon:s,termindato:l})=>{const u=k();return a.length===0?null:t.jsx(O,{attachments:e,updateAttachments:n(r.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET),perioder:a,navnPåForeldre:i,familiehendelsesdato:m,termindato:l,situasjon:s,skjemanummer:r.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET,labelText:u.formatMessage({id:"manglendeVedlegg.introduksjonsprogram.tittel"}),description:u.formatMessage({id:"manglendeVedlegg.introduksjonsprogram.description"},{navn:i.mor}),attachmentType:E.MORS_AKTIVITET_DOKUMENTASJON})};Pe.__docgenInfo={description:"",methods:[],displayName:"MorIntroduksjonsprogrammetDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Me=()=>t.jsxs(Oe,{gap:"space-8",children:[t.jsx(Qe,{children:t.jsx(S,{id:"dokumentasjon.ikke.påkrevd.label"})}),t.jsx(F,{className:"text-ax-text-neutral-subtle",children:t.jsx(S,{id:"dokumentasjon.ikke.påkrevd.beskrivelse.1"})}),t.jsx(F,{className:"text-ax-text-neutral-subtle",children:t.jsx(S,{id:"dokumentasjon.ikke.påkrevd.beskrivelse.2"})})]});Me.__docgenInfo={description:"",methods:[],displayName:"IngenDokumentasjonPåkrevd"};const Ue=({attachments:e,updateAttachments:n,perioder:a,navnPåForeldre:i,familiehendelsesdato:m,situasjon:s,erFarEllerMedmor:l,termindato:u})=>{if(a.length===0)return null;const p=k(),y=w(c(D.ANNEN_FORELDER)),o=w(c(D.OM_BARNET)),d=Se(y)?y.fnr:void 0,b=n(r.DOK_ARBEID_MOR);if(d&&!Ze(y)){const A=Se(y)&&l&&y.harRettPåForeldrepengerINorge===!1,L=Xr(a,o,A,d),q=Hr({...Cr(L),enabled:!!L});if(q.isPending)return t.jsx(We,{className:"self-center",size:"large"});if(!(q.data??!0))return t.jsx(Wr,{perioder:a,updateDokArbeidMorAttachment:b})}return t.jsx(O,{attachments:e,updateAttachments:b,perioder:a,navnPåForeldre:i,familiehendelsesdato:m,termindato:u,situasjon:s,skjemanummer:r.DOK_ARBEID_MOR,labelText:p.formatMessage({id:"manglendeVedlegg.morJobber.label"}),description:p.formatMessage({id:"manglendeVedlegg.morJobber.description"},{navn:i.mor}),attachmentType:E.MORS_AKTIVITET_DOKUMENTASJON})},Wr=({updateDokArbeidMorAttachment:e,perioder:n})=>(X.useEffect(()=>{const a=Zr(E.MORS_AKTIVITET_DOKUMENTASJON,r.DOK_ARBEID_MOR),i=M(a,{type:G.UTTAK,perioder:n.map(m=>({fom:Te(m.tidsperiode.fom),tom:Te(m.tidsperiode.tom)}))});e([i])},[]),t.jsx(Me,{})),Xr=(e,n,a,i)=>{const m=(Xe(n)||er(n))&&n.fnr!==void 0&&n.fnr.length>0?n.fnr[0]:void 0;return{annenPartFødselsnummer:i,barnFødselsnummer:m,familiehendelse:Ne(n),perioder:e.map(s=>({fom:s.tidsperiode.fom.toISOString(),tom:s.tidsperiode.tom.toISOString(),periodeType:a&&rr(s)?"UTSETTELSE":"UTTAK"}))}};Ue.__docgenInfo={description:"",methods:[],displayName:"MorJobberDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Fe=({attachments:e,updateAttachments:n,perioder:a,navnPåForeldre:i,familiehendelsesdato:m,situasjon:s,termindato:l})=>{const u=k();return a.length===0?null:t.jsx(O,{attachments:e,updateAttachments:n(r.DOK_UTDANNING_OG_ARBEID_MOR),perioder:a,navnPåForeldre:i,familiehendelsesdato:m,termindato:l,situasjon:s,skjemanummer:r.DOK_UTDANNING_OG_ARBEID_MOR,labelText:u.formatMessage({id:"manglendeVedlegg.studererOgJobber.label"}),description:t.jsxs(t.Fragment,{children:[t.jsx(I,{children:t.jsx(S,{id:"manglendeVedlegg.studererOgJobber.description.tittel",values:{navn:i.mor}})}),t.jsxs(f,{children:[t.jsx(f.Item,{children:t.jsx(I,{children:t.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt1"})})}),t.jsx(f.Item,{children:t.jsx(I,{children:t.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt2"})})}),t.jsx(f.Item,{children:t.jsx(I,{children:t.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt3"})})}),t.jsx(f.Item,{children:t.jsx(I,{children:t.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt4"})})})]})]}),attachmentType:E.MORS_AKTIVITET_DOKUMENTASJON})};Fe.__docgenInfo={description:"",methods:[],displayName:"MorJobberOgStudererDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Ve=({attachments:e,updateAttachments:n,perioder:a,navnPåForeldre:i,familiehendelsesdato:m,situasjon:s,termindato:l})=>{const u=k();return a.length===0?null:t.jsx(O,{attachments:e,updateAttachments:n(r.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM),perioder:a,navnPåForeldre:i,familiehendelsesdato:m,termindato:l,situasjon:s,skjemanummer:r.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM,labelText:u.formatMessage({id:"manglendeVedlegg.kvalifiseringsprogram.tittel"}),description:u.formatMessage({id:"manglendeVedlegg.kvalifiseringsprogram.description"},{navn:i.mor}),attachmentType:E.MORS_AKTIVITET_DOKUMENTASJON})};Ve.__docgenInfo={description:"",methods:[],displayName:"MorKvalifiseringsprogrammetDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Be=({attachments:e,updateAttachments:n,perioder:a,navnPåForeldre:i,familiehendelsesdato:m,situasjon:s,termindato:l})=>{const u=k();return a.length===0?null:t.jsx(O,{attachments:e,updateAttachments:n(r.DOK_UTDANNING_MOR),perioder:a,navnPåForeldre:i,familiehendelsesdato:m,termindato:l,situasjon:s,skjemanummer:r.DOK_UTDANNING_MOR,labelText:u.formatMessage({id:"manglendeVedlegg.studerer.label"}),description:t.jsxs(t.Fragment,{children:[t.jsx(I,{children:t.jsx(S,{id:"manglendeVedlegg.studerer.description.tittel",values:{navn:i.mor}})}),t.jsxs(f,{as:"ul",children:[t.jsx(f.Item,{children:t.jsx(I,{children:t.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt1"})})}),t.jsx(f.Item,{children:t.jsx(I,{children:t.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt2"})})}),t.jsx(f.Item,{children:t.jsx(I,{children:t.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt3"})})}),t.jsx(f.Item,{children:t.jsx(I,{children:t.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt4"})})})]})]}),attachmentType:E.MORS_AKTIVITET_DOKUMENTASJON})};Be.__docgenInfo={description:"",methods:[],displayName:"MorStudererDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Je=({attachments:e,updateAttachments:n,søkersituasjon:a})=>{const i=k();return a.situasjon!=="adopsjon"?null:t.jsx(h,{attachments:e,updateAttachments:n(r.OMSORGSOVERTAKELSE),skjemanummer:r.OMSORGSOVERTAKELSE,labelText:i.formatMessage({id:"manglendeVedlegg.omsorgsovertakelse.tittel"}),description:i.formatMessage({id:"manglendeVedlegg.omsorgsovertakelse.description"}),attachmentType:E.OMSORGSOVERTAKELSE,metadataType:G.BARN})};Je.__docgenInfo={description:"",methods:[],displayName:"OmsorgsovertakelseDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},søkersituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    situasjon?: Situasjon;
}`,signature:{properties:[{key:"situasjon",value:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}],required:!1}}]}},description:""}}};const en=(e,n)=>e?n?Br(n):!1:!0,xe=({attachments:e,updateAttachments:n,barn:a,arbeidsforhold:i,erFarEllerMedmor:m})=>{const s=k(),l=Pr(i,nr(a),m,Ne(a));return!tr(a)||l.length>0&&!m||!en(m,a.termindato)?null:t.jsx(h,{attachments:e,updateAttachments:n(r.TERMINBEKREFTELSE),skjemanummer:r.TERMINBEKREFTELSE,labelText:s.formatMessage({id:"manglendeVedlegg.terminbekreftelse.tittel"}),description:s.formatMessage({id:m?"manglendeVedlegg.terminbekreftelse.description.farMedmor":"manglendeVedlegg.terminbekreftelse.description"}),attachmentType:E.TERMINBEKREFTELSE,metadataType:G.BARN})};xe.__docgenInfo={description:"",methods:[],displayName:"TerminbekreftelseDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},barn:{required:!0,tsType:{name:"union",raw:"FødtBarn | UfødtBarn | AdoptertBarn | AdoptertStebarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn",elements:[{name:"FødtBarn"},{name:"UfødtBarn"},{name:"AdoptertBarn"},{name:"AdoptertStebarn"},{name:"AdoptertAnnetBarn"},{name:"IkkeUtfyltTypeBarn"}]},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]"},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const rn=e=>ar(e)||ir(e)||sr(e)||mr(e)||ur(e)||lr(e),nn=e=>pr(e)||gr(e)||yr(e)||kr(e)||Er(e),tn=e=>dr(e),an=e=>or(e),sn=e=>Rr(e)||jr(e),mn=e=>Tr(e)||Ar(e),un=e=>Dr(e)||Or(e),ln=e=>vr(e)||Sr(e),on=e=>Nr(e)||_r(e),dn=e=>{const n=e[r.OMSORGSOVERTAKELSE]?e[r.OMSORGSOVERTAKELSE]:[];return T(n)},pn=e=>{const n=e[r.DOK_AV_ALENEOMSORG]?e[r.DOK_AV_ALENEOMSORG]:[];return T(n)},gn=e=>{const n=e[r.TERMINBEKREFTELSE]?e[r.TERMINBEKREFTELSE]:[];return T(n)},yn=e=>{const n=e[r.DOK_MILITÆR_SILVIL_TJENESTE]?e[r.DOK_MILITÆR_SILVIL_TJENESTE]:[];return T(n)},kn=e=>{const n=e[r.ETTERLØNN_ELLER_SLUTTVEDERLAG]?e[r.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[];return T(n)},En=e=>{const n=e[r.DOK_INNLEGGELSE_MOR]?e[r.DOK_INNLEGGELSE_MOR]:[];return T(n)},vn=e=>{const n=e[r.DOK_SYKDOM_MOR]?e[r.DOK_SYKDOM_MOR]:[];return T(n)},Sn=e=>{const n=e[r.DOK_INNLEGGELSE_FAR]?e[r.DOK_INNLEGGELSE_FAR]:[];return T(n)},Tn=e=>{const n=e[r.DOK_SYKDOM_FAR]?e[r.DOK_SYKDOM_FAR]:[];return T(n)},An=e=>{const n=e[r.DOK_INNLEGGELSE_BARN]?e[r.DOK_INNLEGGELSE_BARN]:[];return T(n)},Dn=e=>{const n=e[r.DOK_UTDANNING_MOR]?e[r.DOK_UTDANNING_MOR]:[];return T(n)},On=e=>{const n=e[r.DOK_ARBEID_MOR]?e[r.DOK_ARBEID_MOR]:[];return T(n)},Nn=e=>{const n=e[r.DOK_UTDANNING_OG_ARBEID_MOR]?e[r.DOK_UTDANNING_OG_ARBEID_MOR]:[];return T(n)},_n=e=>{const n=e[r.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]?e[r.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[];return T(n)},Rn=e=>{const n=e[r.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]?e[r.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[];return T(n)},jn=e=>e.innsendingsType==="SEND_SENERE",T=e=>e.filter(n=>!jn(n)),cn=({mellomlagreSøknadOgNaviger:e,avbrytSøknad:n,søkerInfo:a,erEndringssøknad:i})=>{const m=k(),s=Mr(a.arbeidsforhold,e,i),l=Ur(a.arbeidsforhold,i),u=w(c(D.UTTAKSPLAN)),p=w(c(D.ANNEN_FORELDER)),y=w(c(D.OM_BARNET)),o=w(c(D.SØKERSITUASJON)),d=c(D.VEDLEGG)||{},b=c(D.UTTAKSPLAN_METADATA),A=c(D.ARBEIDSFORHOLD_OG_INNTEKT),L=c(D.ANDRE_INNTEKTSKILDER),q=hr(D.VEDLEGG),P=Yr(u,b?.perioderSomSkalSendesInn,i),K=Fr(o.rolle),N=cr(P,K,p),ee=En(d),re=vn(d),ne=Sn(d),te=Tn(d),ae=An(d),ie=Dn(d),se=On(d),me=Nn(d),ue=_n(d),le=Rn(d),oe=pn(d),de=gn(d),pe=dn(d),ge=yn(d),ye=kn(d),B=N.filter(rn),J=N.filter(Ir),x=N.filter(an),Y=N.filter(tn),z=N.filter(nn),H=N.filter(ln),ke=N.filter(mn),C=N.filter(un),$=N.filter(on),Q=N.filter(sn),_=Vr(a.søker,p,K,m),R=Jr(y),j=xr(y),Ye=g=>{const W={...d,[r.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:$.length?g[r.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[r.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:H.length>0?g[r.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[r.DOK_INNLEGGELSE_MOR]:B.length>0?g[r.DOK_INNLEGGELSE_MOR]:[],[r.DOK_INNLEGGELSE_BARN]:J.length>0?g[r.DOK_INNLEGGELSE_BARN]:[],[r.DOK_INNLEGGELSE_FAR]:Y.length>0?g[r.DOK_INNLEGGELSE_FAR]:[],[r.DOK_SYKDOM_MOR]:z.length>0?g[r.DOK_SYKDOM_MOR]:[],[r.DOK_SYKDOM_FAR]:x.length>0?g[r.DOK_SYKDOM_FAR]:[],[r.DOK_UTDANNING_MOR]:Q.length>0?g[r.DOK_UTDANNING_MOR]:[],[r.DOK_UTDANNING_OG_ARBEID_MOR]:C.length>0?g[r.DOK_UTDANNING_OG_ARBEID_MOR]:[],[r.DOK_ARBEID_MOR]:ke.length>0?g[r.DOK_ARBEID_MOR]:[],[r.DOK_AV_ALENEOMSORG]:g[r.DOK_AV_ALENEOMSORG]||[],[r.TERMINBEKREFTELSE]:g[r.TERMINBEKREFTELSE]||[],[r.OMSORGSOVERTAKELSE]:g[r.OMSORGSOVERTAKELSE]||[],[r.DOK_MILITÆR_SILVIL_TJENESTE]:g[r.DOK_MILITÆR_SILVIL_TJENESTE]||[],[r.ETTERLØNN_ELLER_SLUTTVEDERLAG]:g[r.ETTERLØNN_ELLER_SLUTTVEDERLAG]||[]};return q(W),s.goToNextDefaultStep()},Z=fr({defaultValues:{[r.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:le,[r.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:ue,[r.DOK_INNLEGGELSE_MOR]:ee,[r.DOK_INNLEGGELSE_BARN]:ae,[r.DOK_INNLEGGELSE_FAR]:ne,[r.DOK_SYKDOM_FAR]:te,[r.DOK_SYKDOM_MOR]:re,[r.DOK_UTDANNING_MOR]:ie,[r.DOK_UTDANNING_OG_ARBEID_MOR]:me,[r.DOK_ARBEID_MOR]:se,[r.DOK_AV_ALENEOMSORG]:oe,[r.TERMINBEKREFTELSE]:de,[r.OMSORGSOVERTAKELSE]:pe,[r.DOK_MILITÆR_SILVIL_TJENESTE]:ge,[r.ETTERLØNN_ELLER_SLUTTVEDERLAG]:ye}}),v=g=>W=>{Z.setValue(g,W,{shouldDirty:!0,shouldTouch:!0}),Z.clearErrors(g)},ze=[B,J,x,Y,z,H,C,$,Q].flat().length===0;return t.jsx(br,{pageTitle:m.formatMessage({id:"søknad.pageheading"}),children:t.jsx(Lr,{steps:l,noFieldsRequired:!0,children:t.jsx(qr,{formMethods:Z,onSubmit:Ye,children:t.jsxs(Oe,{gap:"space-40",children:[t.jsx(he,{attachments:ee,familiehendelsesdato:R,navnPåForeldre:_,perioder:B,situasjon:o.situasjon,termindato:j,updateAttachments:v,erFarEllerMedmor:K}),t.jsx(we,{attachments:re,familiehendelsesdato:R,navnPåForeldre:_,perioder:z,situasjon:o.situasjon,termindato:j,updateAttachments:v,erFarEllerMedmor:K}),t.jsx(Ke,{attachments:ne,familiehendelsesdato:R,navnPåForeldre:_,perioder:Y,situasjon:o.situasjon,termindato:j,updateAttachments:v,erFarEllerMedmor:K}),t.jsx(qe,{attachments:te,familiehendelsesdato:R,navnPåForeldre:_,perioder:x,situasjon:o.situasjon,termindato:j,updateAttachments:v,erFarEllerMedmor:K}),t.jsx(be,{attachments:ae,familiehendelsesdato:R,navnPåForeldre:_,perioder:J,situasjon:o.situasjon,termindato:j,updateAttachments:v}),t.jsx(Be,{attachments:ie,familiehendelsesdato:R,navnPåForeldre:_,perioder:Q,situasjon:o.situasjon,termindato:j,updateAttachments:v}),t.jsx(Ue,{attachments:se,familiehendelsesdato:R,navnPåForeldre:_,perioder:ke,situasjon:o.situasjon,erFarEllerMedmor:K,termindato:j,updateAttachments:v}),t.jsx(Fe,{attachments:me,familiehendelsesdato:R,navnPåForeldre:_,perioder:C,situasjon:o.situasjon,termindato:j,updateAttachments:v}),t.jsx(Pe,{attachments:ue,familiehendelsesdato:R,navnPåForeldre:_,perioder:H,situasjon:o.situasjon,termindato:j,updateAttachments:v}),t.jsx(Ve,{attachments:le,familiehendelsesdato:R,navnPåForeldre:_,perioder:$,situasjon:o.situasjon,termindato:j,updateAttachments:v}),t.jsx(fe,{attachments:oe,updateAttachments:v,annenForelder:p}),t.jsx(xe,{attachments:de,updateAttachments:v,barn:y,arbeidsforhold:a.arbeidsforhold,erFarEllerMedmor:K}),t.jsx(Je,{attachments:pe,updateAttachments:v,søkersituasjon:o}),t.jsx(Le,{attachments:ye,updateAttachments:v,arbeidsforholdOgInntekt:A,andreInntektskilder:L}),t.jsx(Ge,{attachments:ge,updateAttachments:v,arbeidsforholdOgInntekt:A,andreInntektskilder:L}),!ze&&t.jsxs(Kr,{size:"small",variant:"info",children:[t.jsx(Gr,{level:"2",size:"small",children:t.jsx(S,{id:"manglendeVedlegg.duKanSende.tittel"})}),t.jsx(F,{children:t.jsx(S,{id:"manglendeVedlegg.duKanSende.innhold"})})]}),t.jsx(wr,{goToPreviousStep:s.goToPreviousDefaultStep,onAvsluttOgSlett:n,onFortsettSenere:s.fortsettSøknadSenere})]})})})})};cn.__docgenInfo={description:"",methods:[],displayName:"ManglendeVedlegg",props:{søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""},erEndringssøknad:{required:!0,tsType:{name:"boolean"},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{cn as M};
