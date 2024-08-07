import{j as e}from"./tslib.es6-C_-gbNBy.js";import{P as l,u as x,a as b,n as A,b as d,C as u}from"./useEsNavigator-3O4wt2tb.js";import{M as a,g as i,V as j,C as q,H as T}from"./dateFormValidation-DWsPbI_J.js";import{F as n,O,B as S}from"./BoIUtlandetOppsummeringspunkt-lAjw-SDh.js";import"./index-CTjT7uj6.js";import{e as k,a as w,b as E}from"./OmBarnet-BV6De4cI.js";const c=r=>!!r.terminbekreftelsedato;function B({dokumentasjon:r}){return e.jsxs(e.Fragment,{children:[e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"DokumentasjonOppsummering.Terminbekreftelse"})}),e.jsx(n.Answer,{children:i(r.terminbekreftelsedato)})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"DokumentasjonOppsummering.TerminbekreftelseDokument"})}),e.jsx(n.Answer,{children:e.jsx(j,{gap:"2",children:r.vedlegg.map(t=>t.filename)})})]})]})}function F({dokumentasjon:r}){return e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"DokumentasjonOppsummering.adopsjonsdokumenter"})}),e.jsx(n.Answer,{children:e.jsx(j,{gap:"2",children:r.vedlegg.map(t=>t.filename)})})]})}function v({dokumentasjon:r,onVilEndreSvar:t}){return!r||r.vedlegg.length===0?null:e.jsxs(n,{children:[e.jsxs(n.Header,{children:[e.jsx(n.Heading,{level:"2",children:e.jsx(a,{id:"DokumentasjonOppsummering.tittel"})}),e.jsx(n.EditLink,{onClick:()=>t(c(r)?l.TERMINBEKREFTELSE:l.ADOPSJONSBEKREFTELSE),children:e.jsx(a,{id:"Oppsummering.EndreSvar"})})]}),e.jsx(n.Answers,{children:c(r)?e.jsx(B,{dokumentasjon:r}):e.jsx(F,{dokumentasjon:r})})]})}v.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonOppsummering",props:{dokumentasjon:{required:!1,tsType:{name:"union",raw:"TerminDokumentasjon | Vedlegg",elements:[{name:"intersection",raw:`{
    terminbekreftelsedato: string;
} & Vedlegg`,elements:[{name:"signature",type:"object",raw:`{
    terminbekreftelsedato: string;
}`,signature:{properties:[{key:"terminbekreftelsedato",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    vedlegg: Attachment[];
}`,signature:{properties:[{key:"vedlegg",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    perioder?: Tidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"Tidsperiode"}],raw:"Tidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    vedlegg: Attachment[];
}`,signature:{properties:[{key:"vedlegg",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    perioder?: Tidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"Tidsperiode"}],raw:"Tidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]",required:!0}}]}}]},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"(path: Path) => Promise<void>",signature:{arguments:[{type:{name:"Path"},name:"path"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};function D({omBarnet:r}){const t=k(r);return r.antallBarn===1?e.jsx(a,{id:"OmBarnetOppsummering.EttBarn"}):r.antallBarn===2&&!t?e.jsx(a,{id:"OmBarnetOppsummering.Tvillinger"}):r.antallBarn===2&&t?e.jsx(a,{id:"OmBarnetOppsummering.ToBarn"}):e.jsx(a,{id:"OmBarnetOppsummering.FlereBarn"})}const f=({omBarnet:r,onVilEndreSvar:t})=>{const m=k(r),s=w(r),o=E(r);return e.jsxs(n,{children:[e.jsxs(n.Header,{children:[e.jsx(n.Heading,{level:"2",children:e.jsx(a,{id:"OmBarnetOppsummering.tittel"})}),e.jsx(n.EditLink,{onClick:t,children:e.jsx(a,{id:"Oppsummering.EndreSvar"})})]}),e.jsxs(n.Answers,{children:[e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.SoknadenGjelder"})}),e.jsx(n.Value,{children:e.jsx(D,{omBarnet:r})})]}),o&&e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.MedFødselsdato",values:{antall:1}})}),e.jsx(n.Value,{children:i(r.fødselsdato)})]}),s&&e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.MedTermindato"})}),e.jsx(n.Value,{children:i(r.termindato)})]}),m&&e.jsxs(e.Fragment,{children:[e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.MedAdopsjonsdato"})}),e.jsx(n.Value,{children:i(r.adopsjonsdato)})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.MedFødselsdato",values:{antall:r.fødselsdatoer.length}})}),e.jsx(n.Value,{children:r.fødselsdatoer.map(({dato:p})=>i(p)).join(", ")})]})]})]})]})};f.__docgenInfo={description:"",methods:[],displayName:"OmBarnetOppsummering",props:{omBarnet:{required:!0,tsType:{name:"union",raw:"Fødsel | Adopsjon",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
    erBarnetFødt: true;
    antallBarn: number;
    fødselsdato: string;
}`,signature:{properties:[{key:"erBarnetFødt",value:{name:"literal",value:"true",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    erBarnetFødt: false;
    antallBarn: number;
    termindato: string;
}`,signature:{properties:[{key:"erBarnetFødt",value:{name:"literal",value:"false",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    adopsjonAvEktefellesBarn: boolean;
    adopsjonsdato: string;
    antallBarn: number;
    søkerAdopsjonAlene?: boolean;
    fødselsdatoer: Array<{
        dato: string;
    }>;
}`,signature:{properties:[{key:"adopsjonAvEktefellesBarn",value:{name:"boolean",required:!0}},{key:"adopsjonsdato",value:{name:"string",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"søkerAdopsjonAlene",value:{name:"boolean",required:!1}},{key:"fødselsdatoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dato: string;
}`,signature:{properties:[{key:"dato",value:{name:"string",required:!0}}]}}],raw:`Array<{
    dato: string;
}>`,required:!0}}]}}]},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const h=({sendSøknad:r,mellomlagreOgNaviger:t})=>{const m=x(),s=b(t),o=A(d(u.OM_BARNET)),p=d(u.DOKUMENTASJON),g=d(u.UTENLANDSOPPHOLD_TIDLIGERE),y=d(u.UTENLANDSOPPHOLD_SENERE);return e.jsxs(q,{children:[e.jsx(T,{size:"large",children:e.jsx(a,{id:"Søknad.Pageheading"})}),e.jsxs(O,{appName:"Engangsstønad",stepConfig:m,sendSøknad:r,cancelApplication:s.avbrytSøknad,goToPreviousStep:s.goToPreviousDefaultStep,onContinueLater:s.fortsettSøknadSenere,children:[e.jsx(f,{omBarnet:o,onVilEndreSvar:()=>s.goToNextStep(l.OM_BARNET)}),e.jsx(S,{onVilEndreSvar:()=>s.goToNextStep(l.UTENLANDSOPPHOLD),tidligereUtenlandsopphold:(g==null?void 0:g.utenlandsoppholdSiste12Mnd)??[],senereUtenlandsopphold:(y==null?void 0:y.utenlandsoppholdNeste12Mnd)??[]}),e.jsx(v,{dokumentasjon:p,onVilEndreSvar:s.goToNextStep})]})]})},_=h;h.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(abortSignal: AbortSignal) => Promise<void>",signature:{arguments:[{type:{name:"AbortSignal"},name:"abortSignal"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},mellomlagreOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{_ as O,c as e};
