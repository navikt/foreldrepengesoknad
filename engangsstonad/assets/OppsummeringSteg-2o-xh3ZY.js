import{j as e,a6 as n,M as a,a7 as i,V as y,u as x,N as A,a8 as b,a9 as T}from"./iframe-DjoC9GJ7.js";import{P as l,d as q,h as O,e as c,i as w,j as S,n as E,k as d,C as u}from"./useEsNavigator-fq593qAo.js";const g=r=>"terminbekreftelsedato"in r;function B({dokumentasjon:r}){return e.jsxs(e.Fragment,{children:[e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"DokumentasjonOppsummering.Terminbekreftelse"})}),e.jsx(n.Answer,{children:i(r.terminbekreftelsedato)})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"DokumentasjonOppsummering.TerminbekreftelseDokument"})}),e.jsx(n.Answer,{children:e.jsx(y,{gap:"space-8",children:r.vedlegg.map(t=>t.filename)})})]})]})}function F({dokumentasjon:r}){return e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"DokumentasjonOppsummering.adopsjonsdokumenter"})}),e.jsx(n.Answer,{children:e.jsx(y,{gap:"space-8",children:r.vedlegg.map(t=>t.filename)})})]})}function j({dokumentasjon:r,onVilEndreSvar:t}){return!r||r.vedlegg.length===0?null:e.jsxs(n,{children:[e.jsx(n.Header,{children:e.jsx(n.Heading,{level:"2",children:e.jsx(a,{id:"DokumentasjonOppsummering.tittel"})})}),e.jsx(n.Answers,{children:g(r)?e.jsx(B,{dokumentasjon:r}):e.jsx(F,{dokumentasjon:r})}),e.jsx(n.Footer,{children:e.jsx(n.EditLink,{onClick:()=>t(g(r)?l.TERMINBEKREFTELSE:l.ADOPSJONSBEKREFTELSE),children:e.jsx(a,{id:"Oppsummering.EndreSvar"})})})]})}j.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonOppsummering",props:{dokumentasjon:{required:!1,tsType:{name:"union",raw:"TerminDokumentasjon | Vedlegg",elements:[{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    vedlegg: Attachment[];
}`,signature:{properties:[{key:"vedlegg",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]",required:!0}}]}}]},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"(path: Path) => Promise<void>",signature:{arguments:[{type:{name:"Path"},name:"path"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};function D({omBarnet:r}){const t=c(r);return r.antallBarn===1?e.jsx(a,{id:"OmBarnetOppsummering.EttBarn"}):r.antallBarn===2&&!t?e.jsx(a,{id:"OmBarnetOppsummering.Tvillinger"}):r.antallBarn===2&&t?e.jsx(a,{id:"OmBarnetOppsummering.ToBarn"}):e.jsx(a,{id:"OmBarnetOppsummering.FlereBarn"})}const k=({omBarnet:r,onVilEndreSvar:t})=>{const m=c(r),s=O(r),o=q(r);return e.jsxs(n,{children:[e.jsx(n.Header,{children:e.jsx(n.Heading,{level:"2",children:e.jsx(a,{id:"OmBarnetOppsummering.tittel"})})}),e.jsxs(n.Answers,{children:[e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.SoknadenGjelder"})}),e.jsx(n.Value,{children:e.jsx(D,{omBarnet:r})})]}),o&&e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.MedFødselsdato",values:{antall:1}})}),e.jsx(n.Value,{children:i(r.fødselsdato)})]}),s&&e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.MedTermindato"})}),e.jsx(n.Value,{children:i(r.termindato)})]}),m&&e.jsxs(e.Fragment,{children:[e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.MedAdopsjonsdato"})}),e.jsx(n.Value,{children:i(r.adopsjonsdato)})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.MedFødselsdato",values:{antall:r.fødselsdatoer.length}})}),e.jsx(n.Value,{children:r.fødselsdatoer.map(({dato:p})=>i(p)).join(", ")})]})]})]}),e.jsx(n.Footer,{children:e.jsx(n.EditLink,{onClick:t,children:e.jsx(a,{id:"Oppsummering.EndreSvar"})})})]})};k.__docgenInfo={description:"",methods:[],displayName:"OmBarnetOppsummering",props:{omBarnet:{required:!0,tsType:{name:"union",raw:"Fødsel | Adopsjon",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
    erBarnetFødt: true;
    antallBarn: number;
    fødselsdato: string;
    termindato: string;
}`,signature:{properties:[{key:"erBarnetFødt",value:{name:"literal",value:"true",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}}]},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const M=({sendSøknad:r,mellomlagreOgNaviger:t})=>{const m=w(),s=S(t),o=x(),p=E(d(u.OM_BARNET)),v=d(u.DOKUMENTASJON),h=d(u.UTENLANDSOPPHOLD_TIDLIGERE),f=d(u.UTENLANDSOPPHOLD_SENERE);return e.jsx(A,{pageTitle:o.formatMessage({id:"Søknad.Pageheading"}),children:e.jsxs(b,{appName:"Engangsstønad",stepConfig:m,sendSøknad:r,onAvsluttOgSlett:s.avbrytSøknad,goToPreviousStep:s.goToPreviousDefaultStep,onFortsettSenere:s.fortsettSøknadSenere,onStepChange:s.goToNextStep,children:[e.jsx(k,{omBarnet:p,onVilEndreSvar:()=>s.goToNextStep(l.OM_BARNET)}),e.jsx(T,{onVilEndreSvar:()=>s.goToNextStep(l.UTENLANDSOPPHOLD),tidligereUtenlandsopphold:h??[],senereUtenlandsopphold:f??[]}),e.jsx(j,{dokumentasjon:v,onVilEndreSvar:s.goToNextStep})]})})};M.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},mellomlagreOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{M as O,g as e};
