import{aX as Ae,r as Z,l as a,bY as Oe,bZ as ge,a4 as g,C as He,b8 as w,b_ as Ce,T as ye,D as $e,V as _e,b$ as Qe,M as T,x as M,c0 as Se,c1 as Te,L as Xe,c2 as Ze,c3 as We,bw as Ne,c4 as en,Q as ve,B as f,J as nn,a6 as rn,c5 as an,c6 as tn,c7 as mn,c8 as un,c9 as sn,ca as ln,cb as on,cc as dn,cd as En,ce as pn,cf as kn,cg as gn,ch as yn,ci as Sn,cj as Tn,ck as vn,cl as An,cm as On,cn as _n,co as Nn,cp as Rn,cq as Dn,cr as In,cs as Ln,ct as fn,b2 as jn,m as Kn,ar as cn,b3 as Gn,a5 as qn,q as Mn,bo as Pn}from"./iframe-Dmr2Xk0e.js";import{b as L,C as O,c as bn}from"./FpDataContext-C8cVxE23.js";import{A as F,j as Un,b as hn,a as wn,o as Fn,f as Vn}from"./useFpNavigator-BzCUTurL.js";import{j as h,a as Bn,g as Jn,f as xn}from"./annenForelderUtils-shRlbNJP.js";import{A as y,S as n,b as Yn}from"./uttaksplanInfoUtils-4-RErtid.js";import{k as zn,A as Re,u as Hn,t as Cn}from"./index-C7140wNa.js";import{g as $n}from"./eksisterendeSakUtils-CEgJ-AQF.js";import{L as j}from"./List-CiMB35ku.js";const De=e=>async r=>{const t=new FormData;return t.append("id",r.id),t.append("vedlegg",r.file,r.filename),{data:await(await zn.post(e,{body:t})).json()}},Qn=()=>"V".concat($n().replace(/-/g,"")),Ie=(e,r,t,m,u)=>({id:Qn(),file:e,filename:e.name,filesize:e.size,uploaded:!1,pending:!1,type:r,skjemanummer:t,innsendingsType:m,dokumenterer:u}),Le=(e,r,t)=>Ie({name:""},e,r,"SEND_SENERE",t),Xn=(e,r,t)=>Ie({name:""},e,r,"AUTOMATISK",t),U=(e,r)=>({...e,dokumenterer:r}),fe=(e,r)=>e.map((t,m)=>{const u=t.tom?ge(t.tom):r.formatMessage({id:"VedleggUploader.pågående"}),i=`${ge(t.fom)}-${u}`;return e.length===1||m===e.length-1?i:m<e.length-2?`${i}, `:`${i} ${r.formatMessage({id:"VedleggUploader.Og"})} `}).join(""),P=({attachments:e,updateAttachments:r,skjemanummer:t,labelText:m,description:u,attachmentType:i,metadataType:l,perioder:s})=>{const{watch:E}=Ae(),p=E(t);return Z.useEffect(()=>{if(p.length===0){const o=Le(i,t),d=U(o,{type:l,perioder:s});r([d])}},[r,p,i,t,l]),a.jsx(Oe,{label:m,description:u,attachmentType:i,skjemanummer:t,existingAttachments:e,updateAttachments:o=>{const d=o.map(K=>U(K,{type:l,perioder:s}));r(d)},saveAttachment:De(Re.sendVedlegg)})};P.__docgenInfo={description:"",methods:[],displayName:"VedleggUploader",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}},description:""},skjemanummer:{required:!0,tsType:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},description:""},labelText:{required:!0,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:""},attachmentType:{required:!0,tsType:{name:"AttachmentType"},description:""},metadataType:{required:!0,tsType:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}]},description:""},perioder:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:`Array<{
    fom: string;
    tom?: string;
}>`},description:""}}};const je=({attachments:e,updateAttachments:r,annenForelder:t})=>{const m=g();return!He(t)||!t.datoForAleneomsorg?null:a.jsx(P,{attachments:e,updateAttachments:r(n.DOK_AV_ALENEOMSORG),skjemanummer:n.DOK_AV_ALENEOMSORG,labelText:m.formatMessage({id:"manglendeVedlegg.aleneomsorg.tittel"}),description:m.formatMessage({id:"manglendeVedlegg.aleneomsorg.description"}),attachmentType:y.ALENEOMSORG,metadataType:"BARN"})};je.__docgenInfo={description:"",methods:[],displayName:"AleneomsorgDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},annenForelder:{required:!0,tsType:{name:"union",raw:"AnnenForelderIkkeOppgitt | AnnenForelderOppgitt",elements:[{name:"Common"},{name:"AnnenForelderOppgitt"}]},description:""}}};const _=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:i,situasjon:l,skjemanummer:s,labelText:E,description:p,attachmentType:o})=>{const{watch:d}=Ae(),K=d(s);return Z.useEffect(()=>{if(K.length===0){const A=Le(o,s),c=U(A,{type:"UTTAK",perioder:t.map(G=>({fom:h(G.tidsperiode.fom),tom:h(G.tidsperiode.tom)}))});r([c])}},[r,t,K,o,s]),a.jsx(Oe,{label:E,description:a.jsxs(a.Fragment,{children:[a.jsx(w,{children:p}),t.map(A=>a.jsx("div",{className:"my-4",children:a.jsx(Ce,{periode:A,erAleneOmOmsorg:!1,erFarEllerMedmor:!0,navnPåForeldre:m,familiehendelsesdato:ye(u).toDate(),termindato:i?ye(i).toDate():void 0,situasjon:l,melding:void 0})},A.id))]}),attachmentType:o,skjemanummer:s,existingAttachments:e,updateAttachments:A=>{const c=A.map(G=>U(G,{type:"UTTAK",perioder:t.map(b=>({fom:h(b.tidsperiode.fom),tom:h(b.tidsperiode.tom)}))}));return r(c)},saveAttachment:De(Re.sendVedlegg)})};_.__docgenInfo={description:"",methods:[],displayName:"UttakUploader",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
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
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},description:""},labelText:{required:!0,tsType:{name:"string"},description:""},description:{required:!0,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:""},attachmentType:{required:!0,tsType:{name:"AttachmentType"},description:""}}};const Ke=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l})=>{const s=g();return t.length===0?null:a.jsx(_,{attachments:e,updateAttachments:r(n.DOK_INNLEGGELSE_BARN),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_INNLEGGELSE_BARN,labelText:s.formatMessage({id:"manglendeVedlegg.barnInnlagt.label"}),description:s.formatMessage({id:"manglendeVedlegg.barnInnlagt.description"}),attachmentType:y.UTSETTELSE_SYKDOM})};Ke.__docgenInfo={description:"",methods:[],displayName:"BarnInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const ce=({attachments:e,updateAttachments:r,arbeidsforholdOgInntekt:t,andreInntektskilder:m})=>{const u=g();if(!t||t&&t.harHattAndreInntektskilder===!1||!m||!m.some(l=>l.type===F.SLUTTPAKKE))return null;const i=m.filter(l=>l.type===F.SLUTTPAKKE);return a.jsx(P,{attachments:e,updateAttachments:r(n.ETTERLØNN_ELLER_SLUTTVEDERLAG),skjemanummer:n.ETTERLØNN_ELLER_SLUTTVEDERLAG,labelText:u.formatMessage({id:"manglendeVedlegg.etterlønn.tittel"},{perioder:fe(i,u),antallPerioder:i.length}),description:u.formatMessage({id:"manglendeVedlegg.etterlønn.description"}),attachmentType:y.ANNEN_INNTEKT,metadataType:"OPPTJENING",perioder:i})};ce.__docgenInfo={description:"",methods:[],displayName:"EtterlønnEllerSluttvederlagDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},arbeidsforholdOgInntekt:{required:!0,tsType:{name:"union",raw:"ArbeidsforholdOgInntektFp | undefined",elements:[{name:"intersection",raw:`{
    harHattAndreInntektskilder: boolean;
} & ArbeidsforholdOgInntektFelles`,elements:[{name:"signature",type:"object",raw:`{
    harHattAndreInntektskilder: boolean;
}`,signature:{properties:[{key:"harHattAndreInntektskilder",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]},{name:"undefined"}]},description:""},andreInntektskilder:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]}],raw:"AndreInntektskilder[]"},description:""}}};const Ge=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l,erFarEllerMedmor:s})=>{const E=g();return t.length===0?null:a.jsx(_,{attachments:e,updateAttachments:r(n.DOK_SYKDOM_FAR),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_SYKDOM_FAR,labelText:E.formatMessage({id:"manglendeVedlegg.farForSyk.label"},{navn:m.farMedmor,erFarEllerMedmor:s}),description:E.formatMessage({id:"manglendeVedlegg.farForSyk.description"},{navn:m.farMedmor,erFarEllerMedmor:s}),attachmentType:y.UTSETTELSE_SYKDOM})};Ge.__docgenInfo={description:"",methods:[],displayName:"FarForSykDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const qe=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l,erFarEllerMedmor:s})=>{const E=g();return t.length===0?null:a.jsx(_,{attachments:e,updateAttachments:r(n.DOK_INNLEGGELSE_FAR),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_INNLEGGELSE_FAR,labelText:E.formatMessage({id:"manglendeVedlegg.farInnlagt.label"},{navn:m.farMedmor,erFarEllerMedmor:s}),description:E.formatMessage({id:"manglendeVedlegg.farInnlagt.description"},{navn:m.farMedmor,erFarEllerMedmor:s}),attachmentType:y.UTSETTELSE_SYKDOM})};qe.__docgenInfo={description:"",methods:[],displayName:"FarInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Me=({attachments:e,updateAttachments:r,arbeidsforholdOgInntekt:t,andreInntektskilder:m})=>{const u=g();if(!t||t&&!t.harHattAndreInntektskilder||!m||!m.some(l=>l.type===F.MILITÆRTJENESTE))return null;const i=m.filter(l=>l.type===F.MILITÆRTJENESTE);return a.jsx(P,{attachments:e,updateAttachments:r(n.DOK_MILITÆR_SILVIL_TJENESTE),skjemanummer:n.DOK_MILITÆR_SILVIL_TJENESTE,labelText:u.formatMessage({id:"manglendeVedlegg.militær.tittel"},{perioder:fe(i,u),antallPerioder:i.length}),description:u.formatMessage({id:"manglendeVedlegg.militær.description"}),attachmentType:y.ANNEN_INNTEKT,metadataType:"OPPTJENING",perioder:i})};Me.__docgenInfo={description:"",methods:[],displayName:"MilitærEllerSiviltjenesteDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},arbeidsforholdOgInntekt:{required:!0,tsType:{name:"union",raw:"ArbeidsforholdOgInntektFp | undefined",elements:[{name:"intersection",raw:`{
    harHattAndreInntektskilder: boolean;
} & ArbeidsforholdOgInntektFelles`,elements:[{name:"signature",type:"object",raw:`{
    harHattAndreInntektskilder: boolean;
}`,signature:{properties:[{key:"harHattAndreInntektskilder",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]},{name:"undefined"}]},description:""},andreInntektskilder:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]}],raw:"AndreInntektskilder[]"},description:""}}};const Pe=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l,erFarEllerMedmor:s})=>{const E=g();return t.length===0?null:a.jsx(_,{attachments:e,updateAttachments:r(n.DOK_SYKDOM_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_SYKDOM_MOR,labelText:E.formatMessage({id:"manglendeVedlegg.morForSyk.label"},{navn:m.mor,erFarEllerMedmor:s}),description:E.formatMessage({id:"manglendeVedlegg.morForSyk.description"},{navn:m.mor,erFarEllerMedmor:s}),attachmentType:y.UTSETTELSE_SYKDOM})};Pe.__docgenInfo={description:"",methods:[],displayName:"MorForSykDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const be=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l,erFarEllerMedmor:s})=>{const E=g();if(t.length===0)return null;const p=t.some(o=>o.type===$e.Uttak&&o.erMorForSyk===!0&&o.konto==="FEDREKVOTE");return a.jsx(_,{attachments:e,updateAttachments:r(n.DOK_INNLEGGELSE_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_INNLEGGELSE_MOR,labelText:p?E.formatMessage({id:"manglendeVedlegg.morInnlagtEllerSyk.label"},{navn:m.mor,erFarEllerMedmor:s}):E.formatMessage({id:"manglendeVedlegg.morInnlagt.label"},{navn:m.mor,erFarEllerMedmor:s}),description:p?E.formatMessage({id:"manglendeVedlegg.morInnlagtEllerSyk.description"},{navn:m.mor,erFarEllerMedmor:s}):E.formatMessage({id:"manglendeVedlegg.morInnlagt.description"},{navn:m.mor,erFarEllerMedmor:s}),attachmentType:y.UTSETTELSE_SYKDOM})};be.__docgenInfo={description:"",methods:[],displayName:"MorInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Ue=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l})=>{const s=g();return t.length===0?null:a.jsx(_,{attachments:e,updateAttachments:r(n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET,labelText:s.formatMessage({id:"manglendeVedlegg.introduksjonsprogram.tittel"}),description:s.formatMessage({id:"manglendeVedlegg.introduksjonsprogram.description"},{navn:m.mor}),attachmentType:y.MORS_AKTIVITET_DOKUMENTASJON})};Ue.__docgenInfo={description:"",methods:[],displayName:"MorIntroduksjonsprogrammetDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const he=()=>a.jsxs(_e,{gap:"space-8",children:[a.jsx(Qe,{children:a.jsx(T,{id:"dokumentasjon.ikke.påkrevd.label"})}),a.jsx(w,{className:"text-ax-text-neutral-subtle",children:a.jsx(T,{id:"dokumentasjon.ikke.påkrevd.beskrivelse.1"})}),a.jsx(w,{className:"text-ax-text-neutral-subtle",children:a.jsx(T,{id:"dokumentasjon.ikke.påkrevd.beskrivelse.2"})})]});he.__docgenInfo={description:"",methods:[],displayName:"IngenDokumentasjonPåkrevd"};const we=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,erFarEllerMedmor:l,termindato:s})=>{const E=g(),p=M(L(O.ANNEN_FORELDER)),o=M(L(O.OM_BARNET)),d=Se(p)?p.fnr:void 0,K=r(n.DOK_ARBEID_MOR),A=Se(p)&&l&&p.harRettPåForeldrepengerINorge===!1,c=Wn(t,o,A,d||""),G=Hn({...Cn(c),enabled:!!d&&!Te(p)&&!!c});if(t.length===0)return null;if(d&&!Te(p)){if(G.isPending)return a.jsx(Xe,{className:"self-center",size:"large"});if(!(G.data??!0))return a.jsx(Zn,{perioder:t,updateDokArbeidMorAttachment:K})}return a.jsx(_,{attachments:e,updateAttachments:K,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:s,situasjon:i,skjemanummer:n.DOK_ARBEID_MOR,labelText:E.formatMessage({id:"manglendeVedlegg.morJobber.label"}),description:E.formatMessage({id:"manglendeVedlegg.morJobber.description"},{navn:m.mor}),attachmentType:y.MORS_AKTIVITET_DOKUMENTASJON})},Zn=({updateDokArbeidMorAttachment:e,perioder:r})=>(Z.useEffect(()=>{const t=Xn(y.MORS_AKTIVITET_DOKUMENTASJON,n.DOK_ARBEID_MOR),m=U(t,{type:"UTTAK",perioder:r.map(u=>({fom:ve(u.tidsperiode.fom),tom:ve(u.tidsperiode.tom)}))});e([m])},[]),a.jsx(he,{})),Wn=(e,r,t,m)=>{const u=(Ze(r)||We(r))&&r.fnr!==void 0&&r.fnr.length>0?r.fnr[0]:void 0;return{annenPartFødselsnummer:m,barnFødselsnummer:u,familiehendelse:Ne(r),perioder:e.map(i=>({fom:i.tidsperiode.fom.toISOString(),tom:i.tidsperiode.tom.toISOString(),periodeType:t&&en(i)?"UTSETTELSE":"UTTAK"}))}};we.__docgenInfo={description:"",methods:[],displayName:"MorJobberDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Fe=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l})=>{const s=g();return t.length===0?null:a.jsx(_,{attachments:e,updateAttachments:r(n.DOK_UTDANNING_OG_ARBEID_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_UTDANNING_OG_ARBEID_MOR,labelText:s.formatMessage({id:"manglendeVedlegg.studererOgJobber.label"}),description:a.jsxs(a.Fragment,{children:[a.jsx(f,{children:a.jsx(T,{id:"manglendeVedlegg.studererOgJobber.description.tittel",values:{navn:m.mor}})}),a.jsxs(j,{children:[a.jsx(j.Item,{children:a.jsx(f,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt1"})})}),a.jsx(j.Item,{children:a.jsx(f,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt2"})})}),a.jsx(j.Item,{children:a.jsx(f,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt3"})})}),a.jsx(j.Item,{children:a.jsx(f,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt4"})})})]})]}),attachmentType:y.MORS_AKTIVITET_DOKUMENTASJON})};Fe.__docgenInfo={description:"",methods:[],displayName:"MorJobberOgStudererDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Ve=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l})=>{const s=g();return t.length===0?null:a.jsx(_,{attachments:e,updateAttachments:r(n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM,labelText:s.formatMessage({id:"manglendeVedlegg.kvalifiseringsprogram.tittel"}),description:s.formatMessage({id:"manglendeVedlegg.kvalifiseringsprogram.description"},{navn:m.mor}),attachmentType:y.MORS_AKTIVITET_DOKUMENTASJON})};Ve.__docgenInfo={description:"",methods:[],displayName:"MorKvalifiseringsprogrammetDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Be=({attachments:e,updateAttachments:r,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l})=>{const s=g();return t.length===0?null:a.jsx(_,{attachments:e,updateAttachments:r(n.DOK_UTDANNING_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_UTDANNING_MOR,labelText:s.formatMessage({id:"manglendeVedlegg.studerer.label"}),description:a.jsxs(a.Fragment,{children:[a.jsx(f,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.tittel",values:{navn:m.mor}})}),a.jsxs(j,{as:"ul",children:[a.jsx(j.Item,{children:a.jsx(f,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt1"})})}),a.jsx(j.Item,{children:a.jsx(f,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt2"})})}),a.jsx(j.Item,{children:a.jsx(f,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt3"})})}),a.jsx(j.Item,{children:a.jsx(f,{children:a.jsx(T,{id:"manglendeVedlegg.studerer.description.punkt4"})})})]})]}),attachmentType:y.MORS_AKTIVITET_DOKUMENTASJON})};Be.__docgenInfo={description:"",methods:[],displayName:"MorStudererDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},perioder:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:`| Uttaksperiode
| Utsettelsesperiode
| Oppholdsperiode
| Overføringsperiode
| PeriodeHull
| PeriodeUtenUttakUtsettelse
| PeriodeUtenUttak
| InfoPeriode`,elements:[{name:"union",raw:"UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode",elements:[{name:"UttaksperiodeBase"},{name:"ForeldrepengerFørFødselUttaksperiode"}]},{name:"Utsettelsesperiode"},{name:"Oppholdsperiode"},{name:"Overføringsperiode"},{name:"PeriodeHull"},{name:"PeriodeUtenUttakUtsettelse"},{name:"PeriodeUtenUttak"},{name:"union",raw:`| AvslåttPeriode
| UttakAnnenPartInfoPeriode
| UttakAnnenPartEØSInfoPeriode
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Je=({attachments:e,updateAttachments:r,søkersituasjon:t})=>{const m=g();return t.situasjon!=="adopsjon"?null:a.jsx(P,{attachments:e,updateAttachments:r(n.OMSORGSOVERTAKELSE),skjemanummer:n.OMSORGSOVERTAKELSE,labelText:m.formatMessage({id:"manglendeVedlegg.omsorgsovertakelse.tittel"}),description:m.formatMessage({id:"manglendeVedlegg.omsorgsovertakelse.description"}),attachmentType:y.OMSORGSOVERTAKELSE,metadataType:"BARN"})};Je.__docgenInfo={description:"",methods:[],displayName:"OmsorgsovertakelseDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},søkersituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    situasjon?: Situasjon;
}`,signature:{properties:[{key:"situasjon",value:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}],required:!1}}]}},description:""}}};const er=(e,r)=>e?r?Bn(r):!1:!0,xe=({attachments:e,updateAttachments:r,barn:t,arbeidsforhold:m,erFarEllerMedmor:u})=>{const i=g(),l=Un(m,nn(t),u,Ne(t));return!rn(t)||l.length>0&&!u||!er(u,t.termindato)?null:a.jsx(P,{attachments:e,updateAttachments:r(n.TERMINBEKREFTELSE),skjemanummer:n.TERMINBEKREFTELSE,labelText:i.formatMessage({id:"manglendeVedlegg.terminbekreftelse.tittel"}),description:i.formatMessage({id:u?"manglendeVedlegg.terminbekreftelse.description.farMedmor":"manglendeVedlegg.terminbekreftelse.description"}),attachmentType:y.TERMINBEKREFTELSE,metadataType:"BARN"})};xe.__docgenInfo={description:"",methods:[],displayName:"TerminbekreftelseDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void",signature:{arguments:[{type:{name:"union",raw:`| Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: ÅpenPeriodeDto[];
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},barn:{required:!0,tsType:{name:"union",raw:"FødtBarn | UfødtBarn | AdoptertBarn | AdoptertStebarn | AdoptertAnnetBarn | IkkeUtfyltTypeBarn",elements:[{name:"FødtBarn"},{name:"UfødtBarn"},{name:"AdoptertBarn"},{name:"AdoptertStebarn"},{name:"AdoptertAnnetBarn"},{name:"IkkeUtfyltTypeBarn"}]},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    from: string;
    stillingsprosent: number;
    to?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"from",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"to",value:{name:"string",required:!1}}]}}],raw:"EksternArbeidsforholdDto_fpoversikt[]"},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const nr=e=>an(e)||tn(e)||mn(e)||un(e)||sn(e)||ln(e),rr=e=>En(e)||pn(e)||kn(e)||gn(e)||yn(e),ar=e=>dn(e),tr=e=>on(e),mr=e=>Dn(e)||In(e),ir=e=>vn(e)||An(e),ur=e=>On(e)||_n(e),sr=e=>Sn(e)||Tn(e),lr=e=>Nn(e)||Rn(e),or=e=>{const r=e[n.OMSORGSOVERTAKELSE]?e[n.OMSORGSOVERTAKELSE]:[];return v(r)},dr=e=>{const r=e[n.DOK_AV_ALENEOMSORG]?e[n.DOK_AV_ALENEOMSORG]:[];return v(r)},Er=e=>{const r=e[n.TERMINBEKREFTELSE]?e[n.TERMINBEKREFTELSE]:[];return v(r)},pr=e=>{const r=e[n.DOK_MILITÆR_SILVIL_TJENESTE]?e[n.DOK_MILITÆR_SILVIL_TJENESTE]:[];return v(r)},kr=e=>{const r=e[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]?e[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[];return v(r)},gr=e=>{const r=e[n.DOK_INNLEGGELSE_MOR]?e[n.DOK_INNLEGGELSE_MOR]:[];return v(r)},yr=e=>{const r=e[n.DOK_SYKDOM_MOR]?e[n.DOK_SYKDOM_MOR]:[];return v(r)},Sr=e=>{const r=e[n.DOK_INNLEGGELSE_FAR]?e[n.DOK_INNLEGGELSE_FAR]:[];return v(r)},Tr=e=>{const r=e[n.DOK_SYKDOM_FAR]?e[n.DOK_SYKDOM_FAR]:[];return v(r)},vr=e=>{const r=e[n.DOK_INNLEGGELSE_BARN]?e[n.DOK_INNLEGGELSE_BARN]:[];return v(r)},Ar=e=>{const r=e[n.DOK_UTDANNING_MOR]?e[n.DOK_UTDANNING_MOR]:[];return v(r)},Or=e=>{const r=e[n.DOK_ARBEID_MOR]?e[n.DOK_ARBEID_MOR]:[];return v(r)},_r=e=>{const r=e[n.DOK_UTDANNING_OG_ARBEID_MOR]?e[n.DOK_UTDANNING_OG_ARBEID_MOR]:[];return v(r)},Nr=e=>{const r=e[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]?e[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[];return v(r)},Rr=e=>{const r=e[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]?e[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[];return v(r)},Dr=e=>e.innsendingsType==="SEND_SENERE",v=e=>e.filter(r=>!Dr(r)),Ir=({mellomlagreSøknadOgNaviger:e,avbrytSøknad:r,søkerInfo:t,erEndringssøknad:m})=>{const u=g(),i=hn(t.arbeidsforhold,e,m),l=wn(t.arbeidsforhold,m),s=M(L(O.UTTAKSPLAN)),E=M(L(O.ANNEN_FORELDER)),p=M(L(O.OM_BARNET)),o=M(L(O.SØKERSITUASJON)),d=L(O.VEDLEGG)||{},K=L(O.UTTAKSPLAN_METADATA),A=L(O.ARBEIDSFORHOLD_OG_INNTEKT),c=L(O.ANDRE_INNTEKTSKILDER),G=bn(O.VEDLEGG),b=Yn(s,K?.perioderSomSkalSendesInn,m),q=Fn(o.rolle),N=Ln(b,q,E),W=gr(d),ee=yr(d),ne=Sr(d),re=Tr(d),ae=vr(d),te=Ar(d),me=Or(d),ie=_r(d),ue=Nr(d),se=Rr(d),le=dr(d),oe=Er(d),de=or(d),Ee=pr(d),pe=kr(d),V=N.filter(nr),B=N.filter(fn),J=N.filter(tr),x=N.filter(ar),Y=N.filter(rr),z=N.filter(sr),ke=N.filter(ir),H=N.filter(ur),C=N.filter(lr),$=N.filter(mr),R=Vn(t.person,E,q,u),D=Jn(p),I=xn(p),Ye=k=>{const X={...d,[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:C.length?k[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:z.length>0?k[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[n.DOK_INNLEGGELSE_MOR]:V.length>0?k[n.DOK_INNLEGGELSE_MOR]:[],[n.DOK_INNLEGGELSE_BARN]:B.length>0?k[n.DOK_INNLEGGELSE_BARN]:[],[n.DOK_INNLEGGELSE_FAR]:x.length>0?k[n.DOK_INNLEGGELSE_FAR]:[],[n.DOK_SYKDOM_MOR]:Y.length>0?k[n.DOK_SYKDOM_MOR]:[],[n.DOK_SYKDOM_FAR]:J.length>0?k[n.DOK_SYKDOM_FAR]:[],[n.DOK_UTDANNING_MOR]:$.length>0?k[n.DOK_UTDANNING_MOR]:[],[n.DOK_UTDANNING_OG_ARBEID_MOR]:H.length>0?k[n.DOK_UTDANNING_OG_ARBEID_MOR]:[],[n.DOK_ARBEID_MOR]:ke.length>0?k[n.DOK_ARBEID_MOR]:[],[n.DOK_AV_ALENEOMSORG]:k[n.DOK_AV_ALENEOMSORG]||[],[n.TERMINBEKREFTELSE]:k[n.TERMINBEKREFTELSE]||[],[n.OMSORGSOVERTAKELSE]:k[n.OMSORGSOVERTAKELSE]||[],[n.DOK_MILITÆR_SILVIL_TJENESTE]:k[n.DOK_MILITÆR_SILVIL_TJENESTE]||[],[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:k[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]||[]};return G(X),i.goToNextDefaultStep()},Q=jn({defaultValues:{[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:se,[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:ue,[n.DOK_INNLEGGELSE_MOR]:W,[n.DOK_INNLEGGELSE_BARN]:ae,[n.DOK_INNLEGGELSE_FAR]:ne,[n.DOK_SYKDOM_FAR]:re,[n.DOK_SYKDOM_MOR]:ee,[n.DOK_UTDANNING_MOR]:te,[n.DOK_UTDANNING_OG_ARBEID_MOR]:ie,[n.DOK_ARBEID_MOR]:me,[n.DOK_AV_ALENEOMSORG]:le,[n.TERMINBEKREFTELSE]:oe,[n.OMSORGSOVERTAKELSE]:de,[n.DOK_MILITÆR_SILVIL_TJENESTE]:Ee,[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:pe}}),S=k=>X=>{Q.setValue(k,X,{shouldDirty:!0,shouldTouch:!0}),Q.clearErrors(k)},ze=[V,B,J,x,Y,z,H,C,$].flat().length===0;return a.jsx(Kn,{pageTitle:u.formatMessage({id:"søknad.pageheading"}),children:a.jsx(cn,{steps:l,noFieldsRequired:!0,children:a.jsx(Gn,{formMethods:Q,onSubmit:Ye,children:a.jsxs(_e,{gap:"space-40",children:[a.jsx(be,{attachments:W,familiehendelsesdato:D,navnPåForeldre:R,perioder:V,situasjon:o.situasjon,termindato:I,updateAttachments:S,erFarEllerMedmor:q}),a.jsx(Pe,{attachments:ee,familiehendelsesdato:D,navnPåForeldre:R,perioder:Y,situasjon:o.situasjon,termindato:I,updateAttachments:S,erFarEllerMedmor:q}),a.jsx(qe,{attachments:ne,familiehendelsesdato:D,navnPåForeldre:R,perioder:x,situasjon:o.situasjon,termindato:I,updateAttachments:S,erFarEllerMedmor:q}),a.jsx(Ge,{attachments:re,familiehendelsesdato:D,navnPåForeldre:R,perioder:J,situasjon:o.situasjon,termindato:I,updateAttachments:S,erFarEllerMedmor:q}),a.jsx(Ke,{attachments:ae,familiehendelsesdato:D,navnPåForeldre:R,perioder:B,situasjon:o.situasjon,termindato:I,updateAttachments:S}),a.jsx(Be,{attachments:te,familiehendelsesdato:D,navnPåForeldre:R,perioder:$,situasjon:o.situasjon,termindato:I,updateAttachments:S}),a.jsx(we,{attachments:me,familiehendelsesdato:D,navnPåForeldre:R,perioder:ke,situasjon:o.situasjon,erFarEllerMedmor:q,termindato:I,updateAttachments:S}),a.jsx(Fe,{attachments:ie,familiehendelsesdato:D,navnPåForeldre:R,perioder:H,situasjon:o.situasjon,termindato:I,updateAttachments:S}),a.jsx(Ue,{attachments:ue,familiehendelsesdato:D,navnPåForeldre:R,perioder:z,situasjon:o.situasjon,termindato:I,updateAttachments:S}),a.jsx(Ve,{attachments:se,familiehendelsesdato:D,navnPåForeldre:R,perioder:C,situasjon:o.situasjon,termindato:I,updateAttachments:S}),a.jsx(je,{attachments:le,updateAttachments:S,annenForelder:E}),a.jsx(xe,{attachments:oe,updateAttachments:S,barn:p,arbeidsforhold:t.arbeidsforhold,erFarEllerMedmor:q}),a.jsx(Je,{attachments:de,updateAttachments:S,søkersituasjon:o}),a.jsx(ce,{attachments:pe,updateAttachments:S,arbeidsforholdOgInntekt:A,andreInntektskilder:c}),a.jsx(Me,{attachments:Ee,updateAttachments:S,arbeidsforholdOgInntekt:A,andreInntektskilder:c}),!ze&&a.jsxs(qn,{size:"small",variant:"info",children:[a.jsx(Mn,{level:"2",size:"small",children:a.jsx(T,{id:"manglendeVedlegg.duKanSende.tittel"})}),a.jsx(w,{children:a.jsx(T,{id:"manglendeVedlegg.duKanSende.innhold"})})]}),a.jsx(Pn,{goToPreviousStep:i.goToPreviousDefaultStep,onAvsluttOgSlett:r,onFortsettSenere:i.fortsettSøknadSenere})]})})})})};Ir.__docgenInfo={description:"",methods:[],displayName:"ManglendeVedlegg",props:{søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    person: PersonDto_fpoversikt;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    from: string;
    stillingsprosent: number;
    to?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"from",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"to",value:{name:"string",required:!1}}]}}],raw:"EksternArbeidsforholdDto_fpoversikt[]",required:!0}},{key:"person",value:{name:"signature",type:"object",raw:`{
    aktørid?: string;
    bankkonto?: Bankkonto_fpoversikt;
    barn: BarnDto_fpoversikt[];
    fnr: string;
    fødselsdato: string;
    kjønn: Kjønn_fpoversikt;
    målform?: Målform_fpoversikt;
    navn: Navn_fpoversikt;
    sivilstand?: Sivilstand_fpoversikt;
}`,signature:{properties:[{key:"aktørid",value:{name:"string",required:!1}},{key:"bankkonto",value:{name:"signature",type:"object",raw:`{
    banknavn?: string;
    kontonummer?: string;
}`,signature:{properties:[{key:"banknavn",value:{name:"string",required:!1}},{key:"kontonummer",value:{name:"string",required:!1}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    annenPart?: AnnenForelderDto_fpoversikt;
    dødsdato?: string;
    fnr: string;
    fødselsdato: string;
    kjønn: Kjønn_fpoversikt;
    navn: Navn_fpoversikt;
}`,signature:{properties:[{key:"annenPart",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fødselsdato?: string;
    navn: Navn_fpoversikt;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!0}}]},required:!1}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!0}}]}}],raw:"BarnDto_fpoversikt[]",required:!0}},{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"målform",value:{name:"union",raw:"'NB' | 'NN' | 'EN' | 'E'",elements:[{name:"literal",value:"'NB'"},{name:"literal",value:"'NN'"},{name:"literal",value:"'EN'"},{name:"literal",value:"'E'"}],required:!1}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!0}},{key:"sivilstand",value:{name:"signature",type:"object",raw:`{
    type?: SivilstandType_fpoversikt;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:`| 'UOPPGITT'
| 'UGIFT'
| 'GIFT'
| 'ENKE_ELLER_ENKEMANN'
| 'SKILT'
| 'SEPARERT'
| 'REGISTRERT_PARTNER'
| 'SEPARERT_PARTNER'
| 'SKILT_PARTNER'
| 'GJENLEVENDE_PARTNER'`,elements:[{name:"literal",value:"'UOPPGITT'"},{name:"literal",value:"'UGIFT'"},{name:"literal",value:"'GIFT'"},{name:"literal",value:"'ENKE_ELLER_ENKEMANN'"},{name:"literal",value:"'SKILT'"},{name:"literal",value:"'SEPARERT'"},{name:"literal",value:"'REGISTRERT_PARTNER'"},{name:"literal",value:"'SEPARERT_PARTNER'"},{name:"literal",value:"'SKILT_PARTNER'"},{name:"literal",value:"'GJENLEVENDE_PARTNER'"}],required:!1}}]},required:!1}}]},required:!0}}]}},description:""},erEndringssøknad:{required:!0,tsType:{name:"boolean"},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{Ir as M};
