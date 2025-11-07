import{a3 as T,C as he,l as r,aW as we,r as ye,bW as Fe,b7 as U,bX as Ve,T as ke,D as Be,V as ve,bY as Je,M as S,x as P,bZ as ge,b_ as Se,L as xe,b$ as Ye,c0 as ze,bv as He,c1 as Ce,Q as Te,B as j,c2 as Qe,c3 as We,c4 as $e,c5 as Xe,c6 as Ze,c7 as en,c8 as nn,c9 as rn,ca as an,cb as tn,cc as mn,cd as un,ce as sn,cf as ln,cg as on,ch as dn,ci as En,cj as pn,ck as kn,cl as gn,cm as Sn,cn as Tn,co as yn,cp as vn,cq as An,b1 as On,m as _n,aq as Nn,b2 as Rn,a4 as Dn,q as In,bn as Ln}from"./iframe-DqY1YDWH.js";import{n as b,b as L,C as O,c as jn,g as fn,j as Kn}from"./FpDataContext-Dl4p-sQK.js";import{V as w,P as y,v as n,Q as cn,T as $,U as Gn,A as Mn,J as h,W as Ae,a as Pn,X as qn,Y as bn,d as Un,c as hn,Z as wn,j as Fn,_ as Vn}from"./useFpNavigator-DRVrwJYp.js";import{a as Bn}from"./uttaksplanInfoUtils-C7WV8thJ.js";import{L as f}from"./List-DNSY3dVZ.js";const Oe=({attachments:e,updateAttachments:a,annenForelder:t})=>{const m=T();return!he(t)||!t.datoForAleneomsorg?null:r.jsx(w,{attachments:e,updateAttachments:a(n.DOK_AV_ALENEOMSORG),skjemanummer:n.DOK_AV_ALENEOMSORG,labelText:m.formatMessage({id:"manglendeVedlegg.aleneomsorg.tittel"}),description:m.formatMessage({id:"manglendeVedlegg.aleneomsorg.description"}),attachmentType:y.ALENEOMSORG,metadataType:"BARN"})};Oe.__docgenInfo={description:"",methods:[],displayName:"AleneomsorgDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"}],return:{name:"void"}}}}},description:""},annenForelder:{required:!0,tsType:{name:"union",raw:"AnnenForelderIkkeOppgitt | AnnenForelderOppgitt",elements:[{name:"signature",type:"object",raw:`{
    kanIkkeOppgis: true;
}`,signature:{properties:[{key:"kanIkkeOppgis",value:{name:"literal",value:"true",required:!0}}]}},{name:"AnnenForelderOppgitt"}]},description:""}}};const _=({attachments:e,updateAttachments:a,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:i,situasjon:l,skjemanummer:s,labelText:o,description:k,attachmentType:d})=>{const{watch:E}=we(),M=E(s);return ye.useEffect(()=>{if(M.length===0){const A=cn(d,s),K=$(A,{type:"UTTAK",perioder:t.map(c=>({fom:b(c.tidsperiode.fom),tom:b(c.tidsperiode.tom)}))});a([K])}},[a,t,M,d,s]),r.jsx(Fe,{label:o,description:r.jsxs(r.Fragment,{children:[r.jsx(U,{children:k}),t.map(A=>r.jsx("div",{className:"my-4",children:r.jsx(Ve,{periode:A,erAleneOmOmsorg:!1,erFarEllerMedmor:!0,navnPåForeldre:m,familiehendelsesdato:ke(u).toDate(),termindato:i?ke(i).toDate():void 0,situasjon:l,melding:void 0})},A.id))]}),attachmentType:d,skjemanummer:s,existingAttachments:e,updateAttachments:A=>{const K=A.map(c=>$(c,{type:"UTTAK",perioder:t.map(q=>({fom:b(q.tidsperiode.fom),tom:b(q.tidsperiode.tom)}))}));return a(K)},saveAttachment:Gn(Mn.sendVedlegg)})};_.__docgenInfo={description:"",methods:[],displayName:"UttakUploader",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE`,elements:[{name:"Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM"},{name:"Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET"},{name:"Skjemanummer.DOK_INNLEGGELSE_BARN"},{name:"Skjemanummer.DOK_INNLEGGELSE_MOR"},{name:"Skjemanummer.DOK_INNLEGGELSE_FAR"},{name:"Skjemanummer.DOK_SYKDOM_MOR"},{name:"Skjemanummer.DOK_SYKDOM_FAR"},{name:"Skjemanummer.DOK_UTDANNING_MOR"},{name:"Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR"},{name:"Skjemanummer.DOK_ARBEID_MOR"},{name:"Skjemanummer.DOK_AV_ALENEOMSORG"},{name:"Skjemanummer.TERMINBEKREFTELSE"},{name:"Skjemanummer.OMSORGSOVERTAKELSE"},{name:"Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG"},{name:"Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE"}]},description:""},labelText:{required:!0,tsType:{name:"string"},description:""},description:{required:!0,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:""},attachmentType:{required:!0,tsType:{name:"AttachmentType"},description:""}}};const _e=({attachments:e,updateAttachments:a,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l})=>{const s=T();return t.length===0?null:r.jsx(_,{attachments:e,updateAttachments:a(n.DOK_INNLEGGELSE_BARN),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_INNLEGGELSE_BARN,labelText:s.formatMessage({id:"manglendeVedlegg.barnInnlagt.label"}),description:s.formatMessage({id:"manglendeVedlegg.barnInnlagt.description"}),attachmentType:y.UTSETTELSE_SYKDOM})};_e.__docgenInfo={description:"",methods:[],displayName:"BarnInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Ne=({attachments:e,updateAttachments:a,arbeidsforholdOgInntekt:t,andreInntektskilder:m})=>{const u=T();if(!t||t&&t.harHattAndreInntektskilder===!1||!m||!m.some(l=>l.type===h.SLUTTPAKKE))return null;const i=m.filter(l=>l.type===h.SLUTTPAKKE);return r.jsx(w,{attachments:e,updateAttachments:a(n.ETTERLØNN_ELLER_SLUTTVEDERLAG),skjemanummer:n.ETTERLØNN_ELLER_SLUTTVEDERLAG,labelText:u.formatMessage({id:"manglendeVedlegg.etterlønn.tittel"},{perioder:Ae(i,u),antallPerioder:i.length}),description:u.formatMessage({id:"manglendeVedlegg.etterlønn.description"}),attachmentType:y.ANNEN_INNTEKT,metadataType:"OPPTJENING",perioder:i})};Ne.__docgenInfo={description:"",methods:[],displayName:"EtterlønnEllerSluttvederlagDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]},{name:"undefined"}]},description:""},andreInntektskilder:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]}],raw:"AndreInntektskilder[]"},description:""}}};const Re=({attachments:e,updateAttachments:a,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l,erFarEllerMedmor:s})=>{const o=T();return t.length===0?null:r.jsx(_,{attachments:e,updateAttachments:a(n.DOK_SYKDOM_FAR),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_SYKDOM_FAR,labelText:o.formatMessage({id:"manglendeVedlegg.farForSyk.label"},{navn:m.farMedmor,erFarEllerMedmor:s}),description:o.formatMessage({id:"manglendeVedlegg.farForSyk.description"},{navn:m.farMedmor,erFarEllerMedmor:s}),attachmentType:y.UTSETTELSE_SYKDOM})};Re.__docgenInfo={description:"",methods:[],displayName:"FarForSykDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const De=({attachments:e,updateAttachments:a,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l,erFarEllerMedmor:s})=>{const o=T();return t.length===0?null:r.jsx(_,{attachments:e,updateAttachments:a(n.DOK_INNLEGGELSE_FAR),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_INNLEGGELSE_FAR,labelText:o.formatMessage({id:"manglendeVedlegg.farInnlagt.label"},{navn:m.farMedmor,erFarEllerMedmor:s}),description:o.formatMessage({id:"manglendeVedlegg.farInnlagt.description"},{navn:m.farMedmor,erFarEllerMedmor:s}),attachmentType:y.UTSETTELSE_SYKDOM})};De.__docgenInfo={description:"",methods:[],displayName:"FarInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Ie=({attachments:e,updateAttachments:a,arbeidsforholdOgInntekt:t,andreInntektskilder:m})=>{const u=T();if(!t||t&&!t.harHattAndreInntektskilder||!m||!m.some(l=>l.type===h.MILITÆRTJENESTE))return null;const i=m.filter(l=>l.type===h.MILITÆRTJENESTE);return r.jsx(w,{attachments:e,updateAttachments:a(n.DOK_MILITÆR_SILVIL_TJENESTE),skjemanummer:n.DOK_MILITÆR_SILVIL_TJENESTE,labelText:u.formatMessage({id:"manglendeVedlegg.militær.tittel"},{perioder:Ae(i,u),antallPerioder:i.length}),description:u.formatMessage({id:"manglendeVedlegg.militær.description"}),attachmentType:y.ANNEN_INNTEKT,metadataType:"OPPTJENING",perioder:i})};Ie.__docgenInfo={description:"",methods:[],displayName:"MilitærEllerSiviltjenesteDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"harJobbetSomFrilans",value:{name:"boolean",required:!0}},{key:"harJobbetSomSelvstendigNæringsdrivende",value:{name:"boolean",required:!0}}]}}]},{name:"undefined"}]},description:""},andreInntektskilder:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"SluttpakkeInntekt | MilitærtjenesteInntekt | JobbIUtlandetInntekt",elements:[{name:"SluttpakkeInntekt"},{name:"MilitærtjenesteInntekt"},{name:"JobbIUtlandetInntekt"}]}],raw:"AndreInntektskilder[]"},description:""}}};const Le=({attachments:e,updateAttachments:a,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l,erFarEllerMedmor:s})=>{const o=T();return t.length===0?null:r.jsx(_,{attachments:e,updateAttachments:a(n.DOK_SYKDOM_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_SYKDOM_MOR,labelText:o.formatMessage({id:"manglendeVedlegg.morForSyk.label"},{navn:m.mor,erFarEllerMedmor:s}),description:o.formatMessage({id:"manglendeVedlegg.morForSyk.description"},{navn:m.mor,erFarEllerMedmor:s}),attachmentType:y.UTSETTELSE_SYKDOM})};Le.__docgenInfo={description:"",methods:[],displayName:"MorForSykDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const je=({attachments:e,updateAttachments:a,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l,erFarEllerMedmor:s})=>{const o=T();if(t.length===0)return null;const k=t.some(d=>d.type===Be.Uttak&&d.erMorForSyk===!0&&d.konto==="FEDREKVOTE");return r.jsx(_,{attachments:e,updateAttachments:a(n.DOK_INNLEGGELSE_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_INNLEGGELSE_MOR,labelText:k?o.formatMessage({id:"manglendeVedlegg.morInnlagtEllerSyk.label"},{navn:m.mor,erFarEllerMedmor:s}):o.formatMessage({id:"manglendeVedlegg.morInnlagt.label"},{navn:m.mor,erFarEllerMedmor:s}),description:k?o.formatMessage({id:"manglendeVedlegg.morInnlagtEllerSyk.description"},{navn:m.mor,erFarEllerMedmor:s}):o.formatMessage({id:"manglendeVedlegg.morInnlagt.description"},{navn:m.mor,erFarEllerMedmor:s}),attachmentType:y.UTSETTELSE_SYKDOM})};je.__docgenInfo={description:"",methods:[],displayName:"MorInnlagtDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const fe=({attachments:e,updateAttachments:a,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l})=>{const s=T();return t.length===0?null:r.jsx(_,{attachments:e,updateAttachments:a(n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET,labelText:s.formatMessage({id:"manglendeVedlegg.introduksjonsprogram.tittel"}),description:s.formatMessage({id:"manglendeVedlegg.introduksjonsprogram.description"},{navn:m.mor}),attachmentType:y.MORS_AKTIVITET_DOKUMENTASJON})};fe.__docgenInfo={description:"",methods:[],displayName:"MorIntroduksjonsprogrammetDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Ke=()=>r.jsxs(ve,{gap:"space-8",children:[r.jsx(Je,{children:r.jsx(S,{id:"dokumentasjon.ikke.påkrevd.label"})}),r.jsx(U,{className:"text-ax-text-neutral-subtle",children:r.jsx(S,{id:"dokumentasjon.ikke.påkrevd.beskrivelse.1"})}),r.jsx(U,{className:"text-ax-text-neutral-subtle",children:r.jsx(S,{id:"dokumentasjon.ikke.påkrevd.beskrivelse.2"})})]});Ke.__docgenInfo={description:"",methods:[],displayName:"IngenDokumentasjonPåkrevd"};const ce=({attachments:e,updateAttachments:a,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,erFarEllerMedmor:l,termindato:s})=>{const o=T(),k=P(L(O.ANNEN_FORELDER)),d=P(L(O.OM_BARNET)),E=ge(k)?k.fnr:void 0,M=a(n.DOK_ARBEID_MOR),A=ge(k)&&l&&k.harRettPåForeldrepengerINorge===!1,K=xn(t,d,A,E||""),c=Pn({...qn(K),enabled:!!E&&!Se(k)&&!!K});if(t.length===0)return null;if(E&&!Se(k)){if(c.isPending)return r.jsx(xe,{className:"self-center",size:"large"});if(!(c.data??!0))return r.jsx(Jn,{perioder:t,updateDokArbeidMorAttachment:M})}return r.jsx(_,{attachments:e,updateAttachments:M,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:s,situasjon:i,skjemanummer:n.DOK_ARBEID_MOR,labelText:o.formatMessage({id:"manglendeVedlegg.morJobber.label"}),description:o.formatMessage({id:"manglendeVedlegg.morJobber.description"},{navn:m.mor}),attachmentType:y.MORS_AKTIVITET_DOKUMENTASJON})},Jn=({updateDokArbeidMorAttachment:e,perioder:a})=>(ye.useEffect(()=>{const t=bn(y.MORS_AKTIVITET_DOKUMENTASJON,n.DOK_ARBEID_MOR),m=$(t,{type:"UTTAK",perioder:a.map(u=>({fom:Te(u.tidsperiode.fom),tom:Te(u.tidsperiode.tom)}))});e([m])},[]),r.jsx(Ke,{})),xn=(e,a,t,m)=>{const u=(Ye(a)||ze(a))&&a.fnr!==void 0&&a.fnr.length>0?a.fnr[0]:void 0;return{annenPartFødselsnummer:m,barnFødselsnummer:u,familiehendelse:He(a),perioder:e.map(i=>({fom:i.tidsperiode.fom.toISOString(),tom:i.tidsperiode.tom.toISOString(),periodeType:t&&Ce(i)?"UTSETTELSE":"UTTAK"}))}};ce.__docgenInfo={description:"",methods:[],displayName:"MorJobberDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""}}};const Ge=({attachments:e,updateAttachments:a,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l})=>{const s=T();return t.length===0?null:r.jsx(_,{attachments:e,updateAttachments:a(n.DOK_UTDANNING_OG_ARBEID_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_UTDANNING_OG_ARBEID_MOR,labelText:s.formatMessage({id:"manglendeVedlegg.studererOgJobber.label"}),description:r.jsxs(r.Fragment,{children:[r.jsx(j,{children:r.jsx(S,{id:"manglendeVedlegg.studererOgJobber.description.tittel",values:{navn:m.mor}})}),r.jsxs(f,{children:[r.jsx(f.Item,{children:r.jsx(j,{children:r.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt1"})})}),r.jsx(f.Item,{children:r.jsx(j,{children:r.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt2"})})}),r.jsx(f.Item,{children:r.jsx(j,{children:r.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt3"})})}),r.jsx(f.Item,{children:r.jsx(j,{children:r.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt4"})})})]})]}),attachmentType:y.MORS_AKTIVITET_DOKUMENTASJON})};Ge.__docgenInfo={description:"",methods:[],displayName:"MorJobberOgStudererDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Me=({attachments:e,updateAttachments:a,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l})=>{const s=T();return t.length===0?null:r.jsx(_,{attachments:e,updateAttachments:a(n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM,labelText:s.formatMessage({id:"manglendeVedlegg.kvalifiseringsprogram.tittel"}),description:s.formatMessage({id:"manglendeVedlegg.kvalifiseringsprogram.description"},{navn:m.mor}),attachmentType:y.MORS_AKTIVITET_DOKUMENTASJON})};Me.__docgenInfo={description:"",methods:[],displayName:"MorKvalifiseringsprogrammetDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const Pe=({attachments:e,updateAttachments:a,perioder:t,navnPåForeldre:m,familiehendelsesdato:u,situasjon:i,termindato:l})=>{const s=T();return t.length===0?null:r.jsx(_,{attachments:e,updateAttachments:a(n.DOK_UTDANNING_MOR),perioder:t,navnPåForeldre:m,familiehendelsesdato:u,termindato:l,situasjon:i,skjemanummer:n.DOK_UTDANNING_MOR,labelText:s.formatMessage({id:"manglendeVedlegg.studerer.label"}),description:r.jsxs(r.Fragment,{children:[r.jsx(j,{children:r.jsx(S,{id:"manglendeVedlegg.studerer.description.tittel",values:{navn:m.mor}})}),r.jsxs(f,{as:"ul",children:[r.jsx(f.Item,{children:r.jsx(j,{children:r.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt1"})})}),r.jsx(f.Item,{children:r.jsx(j,{children:r.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt2"})})}),r.jsx(f.Item,{children:r.jsx(j,{children:r.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt3"})})}),r.jsx(f.Item,{children:r.jsx(j,{children:r.jsx(S,{id:"manglendeVedlegg.studerer.description.punkt4"})})})]})]}),attachmentType:y.MORS_AKTIVITET_DOKUMENTASJON})};Pe.__docgenInfo={description:"",methods:[],displayName:"MorStudererDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| UtsettelseAnnenPartInfoPeriode`,elements:[{name:"AvslåttPeriode"},{name:"UttakAnnenPartInfoPeriode"},{name:"UttakAnnenPartEØSInfoPeriode"},{name:"UtsettelseAnnenPartInfoPeriode"}]}]}],raw:"Periode[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},familiehendelsesdato:{required:!0,tsType:{name:"string"},description:""},termindato:{required:!0,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},situasjon:{required:!0,tsType:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}]},description:""}}};const qe=({attachments:e,updateAttachments:a,søkersituasjon:t})=>{const m=T();return t.situasjon!=="adopsjon"?null:r.jsx(w,{attachments:e,updateAttachments:a(n.OMSORGSOVERTAKELSE),skjemanummer:n.OMSORGSOVERTAKELSE,labelText:m.formatMessage({id:"manglendeVedlegg.omsorgsovertakelse.tittel"}),description:m.formatMessage({id:"manglendeVedlegg.omsorgsovertakelse.description"}),attachmentType:y.OMSORGSOVERTAKELSE,metadataType:"BARN"})};qe.__docgenInfo={description:"",methods:[],displayName:"OmsorgsovertakelseDokumentasjon",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"situasjon",value:{name:"union",raw:"'fødsel' | 'adopsjon' | 'omsorgsovertakelse'",elements:[{name:"literal",value:"'fødsel'"},{name:"literal",value:"'adopsjon'"},{name:"literal",value:"'omsorgsovertakelse'"}],required:!1}}]}},description:""}}};const Yn=e=>Qe(e)||We(e)||$e(e)||Xe(e)||Ze(e)||en(e),zn=e=>an(e)||tn(e)||mn(e)||un(e)||sn(e),Hn=e=>rn(e),Cn=e=>nn(e),Qn=e=>Tn(e)||yn(e),Wn=e=>dn(e)||En(e),$n=e=>pn(e)||kn(e),Xn=e=>ln(e)||on(e),Zn=e=>gn(e)||Sn(e),er=e=>{const a=e[n.OMSORGSOVERTAKELSE]?e[n.OMSORGSOVERTAKELSE]:[];return v(a)},nr=e=>{const a=e[n.DOK_AV_ALENEOMSORG]?e[n.DOK_AV_ALENEOMSORG]:[];return v(a)},rr=e=>{const a=e[n.TERMINBEKREFTELSE]?e[n.TERMINBEKREFTELSE]:[];return v(a)},ar=e=>{const a=e[n.DOK_MILITÆR_SILVIL_TJENESTE]?e[n.DOK_MILITÆR_SILVIL_TJENESTE]:[];return v(a)},tr=e=>{const a=e[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]?e[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[];return v(a)},mr=e=>{const a=e[n.DOK_INNLEGGELSE_MOR]?e[n.DOK_INNLEGGELSE_MOR]:[];return v(a)},ir=e=>{const a=e[n.DOK_SYKDOM_MOR]?e[n.DOK_SYKDOM_MOR]:[];return v(a)},ur=e=>{const a=e[n.DOK_INNLEGGELSE_FAR]?e[n.DOK_INNLEGGELSE_FAR]:[];return v(a)},sr=e=>{const a=e[n.DOK_SYKDOM_FAR]?e[n.DOK_SYKDOM_FAR]:[];return v(a)},lr=e=>{const a=e[n.DOK_INNLEGGELSE_BARN]?e[n.DOK_INNLEGGELSE_BARN]:[];return v(a)},or=e=>{const a=e[n.DOK_UTDANNING_MOR]?e[n.DOK_UTDANNING_MOR]:[];return v(a)},dr=e=>{const a=e[n.DOK_ARBEID_MOR]?e[n.DOK_ARBEID_MOR]:[];return v(a)},Er=e=>{const a=e[n.DOK_UTDANNING_OG_ARBEID_MOR]?e[n.DOK_UTDANNING_OG_ARBEID_MOR]:[];return v(a)},pr=e=>{const a=e[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]?e[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[];return v(a)},kr=e=>{const a=e[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]?e[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[];return v(a)},gr=e=>e.innsendingsType==="SEND_SENERE",v=e=>e.filter(a=>!gr(a)),Sr=({mellomlagreSøknadOgNaviger:e,avbrytSøknad:a,søkerInfo:t,erEndringssøknad:m})=>{const u=T(),i=Un(t.arbeidsforhold,e,m),l=hn(t.arbeidsforhold,m),s=P(L(O.UTTAKSPLAN)),o=P(L(O.ANNEN_FORELDER)),k=P(L(O.OM_BARNET)),d=P(L(O.SØKERSITUASJON)),E=L(O.VEDLEGG)||{},M=L(O.UTTAKSPLAN_METADATA),A=L(O.ARBEIDSFORHOLD_OG_INNTEKT),K=L(O.ANDRE_INNTEKTSKILDER),c=jn(O.VEDLEGG),q=Bn(s,M?.perioderSomSkalSendesInn,m),G=wn(d.rolle),N=vn(q,G,o),X=mr(E),Z=ir(E),ee=ur(E),ne=sr(E),re=lr(E),ae=or(E),te=dr(E),me=Er(E),ie=pr(E),ue=kr(E),se=nr(E),le=rr(E),oe=er(E),de=ar(E),Ee=tr(E),F=N.filter(Yn),V=N.filter(An),B=N.filter(Cn),J=N.filter(Hn),x=N.filter(zn),Y=N.filter(Xn),pe=N.filter(Wn),z=N.filter($n),H=N.filter(Zn),C=N.filter(Qn),R=Fn(t.person,o,G,u),D=fn(k),I=Kn(k),be=p=>{const W={...E,[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:H.length?p[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:Y.length>0?p[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[n.DOK_INNLEGGELSE_MOR]:F.length>0?p[n.DOK_INNLEGGELSE_MOR]:[],[n.DOK_INNLEGGELSE_BARN]:V.length>0?p[n.DOK_INNLEGGELSE_BARN]:[],[n.DOK_INNLEGGELSE_FAR]:J.length>0?p[n.DOK_INNLEGGELSE_FAR]:[],[n.DOK_SYKDOM_MOR]:x.length>0?p[n.DOK_SYKDOM_MOR]:[],[n.DOK_SYKDOM_FAR]:B.length>0?p[n.DOK_SYKDOM_FAR]:[],[n.DOK_UTDANNING_MOR]:C.length>0?p[n.DOK_UTDANNING_MOR]:[],[n.DOK_UTDANNING_OG_ARBEID_MOR]:z.length>0?p[n.DOK_UTDANNING_OG_ARBEID_MOR]:[],[n.DOK_ARBEID_MOR]:pe.length>0?p[n.DOK_ARBEID_MOR]:[],[n.DOK_AV_ALENEOMSORG]:p[n.DOK_AV_ALENEOMSORG]||[],[n.TERMINBEKREFTELSE]:p[n.TERMINBEKREFTELSE]||[],[n.OMSORGSOVERTAKELSE]:p[n.OMSORGSOVERTAKELSE]||[],[n.DOK_MILITÆR_SILVIL_TJENESTE]:p[n.DOK_MILITÆR_SILVIL_TJENESTE]||[],[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:p[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]||[]};return c(W),i.goToNextDefaultStep()},Q=On({defaultValues:{[n.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:ue,[n.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:ie,[n.DOK_INNLEGGELSE_MOR]:X,[n.DOK_INNLEGGELSE_BARN]:re,[n.DOK_INNLEGGELSE_FAR]:ee,[n.DOK_SYKDOM_FAR]:ne,[n.DOK_SYKDOM_MOR]:Z,[n.DOK_UTDANNING_MOR]:ae,[n.DOK_UTDANNING_OG_ARBEID_MOR]:me,[n.DOK_ARBEID_MOR]:te,[n.DOK_AV_ALENEOMSORG]:se,[n.TERMINBEKREFTELSE]:le,[n.OMSORGSOVERTAKELSE]:oe,[n.DOK_MILITÆR_SILVIL_TJENESTE]:de,[n.ETTERLØNN_ELLER_SLUTTVEDERLAG]:Ee}}),g=p=>W=>{Q.setValue(p,W,{shouldDirty:!0,shouldTouch:!0}),Q.clearErrors(p)},Ue=[F,V,B,J,x,Y,z,H,C].flat().length===0;return r.jsx(_n,{pageTitle:u.formatMessage({id:"søknad.pageheading"}),children:r.jsx(Nn,{steps:l,noFieldsRequired:!0,children:r.jsx(Rn,{formMethods:Q,onSubmit:be,children:r.jsxs(ve,{gap:"space-40",children:[r.jsx(je,{attachments:X,familiehendelsesdato:D,navnPåForeldre:R,perioder:F,situasjon:d.situasjon,termindato:I,updateAttachments:g,erFarEllerMedmor:G}),r.jsx(Le,{attachments:Z,familiehendelsesdato:D,navnPåForeldre:R,perioder:x,situasjon:d.situasjon,termindato:I,updateAttachments:g,erFarEllerMedmor:G}),r.jsx(De,{attachments:ee,familiehendelsesdato:D,navnPåForeldre:R,perioder:J,situasjon:d.situasjon,termindato:I,updateAttachments:g,erFarEllerMedmor:G}),r.jsx(Re,{attachments:ne,familiehendelsesdato:D,navnPåForeldre:R,perioder:B,situasjon:d.situasjon,termindato:I,updateAttachments:g,erFarEllerMedmor:G}),r.jsx(_e,{attachments:re,familiehendelsesdato:D,navnPåForeldre:R,perioder:V,situasjon:d.situasjon,termindato:I,updateAttachments:g}),r.jsx(Pe,{attachments:ae,familiehendelsesdato:D,navnPåForeldre:R,perioder:C,situasjon:d.situasjon,termindato:I,updateAttachments:g}),r.jsx(ce,{attachments:te,familiehendelsesdato:D,navnPåForeldre:R,perioder:pe,situasjon:d.situasjon,erFarEllerMedmor:G,termindato:I,updateAttachments:g}),r.jsx(Ge,{attachments:me,familiehendelsesdato:D,navnPåForeldre:R,perioder:z,situasjon:d.situasjon,termindato:I,updateAttachments:g}),r.jsx(fe,{attachments:ie,familiehendelsesdato:D,navnPåForeldre:R,perioder:Y,situasjon:d.situasjon,termindato:I,updateAttachments:g}),r.jsx(Me,{attachments:ue,familiehendelsesdato:D,navnPåForeldre:R,perioder:H,situasjon:d.situasjon,termindato:I,updateAttachments:g}),r.jsx(Oe,{attachments:se,updateAttachments:g,annenForelder:o}),r.jsx(Vn,{attachments:le,updateAttachments:g,barn:k,annenForelder:o,søkersituasjon:d,arbeidsforhold:t.arbeidsforhold,erFarEllerMedmor:G}),r.jsx(qe,{attachments:oe,updateAttachments:g,søkersituasjon:d}),r.jsx(Ne,{attachments:Ee,updateAttachments:g,arbeidsforholdOgInntekt:A,andreInntektskilder:K}),r.jsx(Ie,{attachments:de,updateAttachments:g,arbeidsforholdOgInntekt:A,andreInntektskilder:K}),!Ue&&r.jsxs(Dn,{size:"small",variant:"info",children:[r.jsx(In,{level:"2",size:"small",children:r.jsx(S,{id:"manglendeVedlegg.duKanSende.tittel"})}),r.jsx(U,{children:r.jsx(S,{id:"manglendeVedlegg.duKanSende.innhold"})})]}),r.jsx(Ln,{goToPreviousStep:i.goToPreviousDefaultStep,onAvsluttOgSlett:a,onFortsettSenere:i.fortsettSøknadSenere})]})})})})};Sr.__docgenInfo={description:"",methods:[],displayName:"ManglendeVedlegg",props:{søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
| 'GJENLEVENDE_PARTNER'`,elements:[{name:"literal",value:"'UOPPGITT'"},{name:"literal",value:"'UGIFT'"},{name:"literal",value:"'GIFT'"},{name:"literal",value:"'ENKE_ELLER_ENKEMANN'"},{name:"literal",value:"'SKILT'"},{name:"literal",value:"'SEPARERT'"},{name:"literal",value:"'REGISTRERT_PARTNER'"},{name:"literal",value:"'SEPARERT_PARTNER'"},{name:"literal",value:"'SKILT_PARTNER'"},{name:"literal",value:"'GJENLEVENDE_PARTNER'"}],required:!1}}]},required:!1}}]},required:!0}}]}},description:""},erEndringssøknad:{required:!0,tsType:{name:"boolean"},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{Sr as M};
