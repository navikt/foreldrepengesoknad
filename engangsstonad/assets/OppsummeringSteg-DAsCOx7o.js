import{j as e,ah as n,M as a,ai as s,V as E,h as j,S as c,aj as O,ak as G}from"./iframe-DoQVCDi1.js";import{P as m,d as S,h as N,e as v,i as h,j as f,n as R,k as l,C as u}from"./useEsNavigator-Bs-deBXh.js";const g=r=>"terminbekreftelsedato"in r;function I({dokumentasjon:r}){return e.jsxs(e.Fragment,{children:[e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"DokumentasjonOppsummering.Terminbekreftelse"})}),e.jsx(n.Answer,{children:s(r.terminbekreftelsedato)})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"DokumentasjonOppsummering.TerminbekreftelseDokument"})}),e.jsx(n.Answer,{children:e.jsx(E,{gap:"space-8",children:r.vedlegg.map(t=>t.filename)})})]})]})}function x({dokumentasjon:r}){return e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"DokumentasjonOppsummering.adopsjonsdokumenter"})}),e.jsx(n.Answer,{children:e.jsx(E,{gap:"space-8",children:r.vedlegg.map(t=>t.filename)})})]})}function y({dokumentasjon:r,onVilEndreSvar:t}){return!r||r.vedlegg.length===0?null:e.jsxs(n,{children:[e.jsx(n.Header,{children:e.jsx(n.Heading,{level:"2",children:e.jsx(a,{id:"DokumentasjonOppsummering.tittel"})})}),e.jsx(n.Answers,{children:g(r)?e.jsx(I,{dokumentasjon:r}):e.jsx(x,{dokumentasjon:r})}),e.jsx(n.Footer,{children:e.jsx(n.EditLink,{onClick:()=>t(g(r)?m.TERMINBEKREFTELSE:m.ADOPSJONSBEKREFTELSE),children:e.jsx(a,{id:"Oppsummering.EndreSvar"})})})]})}y.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonOppsummering",props:{dokumentasjon:{required:!1,tsType:{name:"union",raw:"TerminDokumentasjon | Vedlegg",elements:[{name:"intersection",raw:`{
    terminbekreftelsedato: string;
} & Vedlegg`,elements:[{name:"signature",type:"object",raw:`{
    terminbekreftelsedato: string;
}`,signature:{properties:[{key:"terminbekreftelsedato",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    vedlegg: Attachment[];
}`,signature:{properties:[{key:"vedlegg",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    error?: AttachmentError;
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"union",raw:"GenerelleErrorKoder | ProblemDetailsErrorKode | InternError",elements:[{name:"union",raw:"'TIMEOUT' | 'SERVER_ERROR'",elements:[{name:"literal",value:"'TIMEOUT'"},{name:"literal",value:"'SERVER_ERROR'"}]},{name:"union",raw:`| 'IKKE_TILGANG'
| 'DUPLIKAT_FORSENDELSE'
| 'MELLOMLAGRING'
| 'MELLOMLAGRING_VEDLEGG'
| 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
| 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
| 'KRYPTERING_MELLOMLAGRING'`,elements:[{name:"literal",value:"'IKKE_TILGANG'"},{name:"literal",value:"'DUPLIKAT_FORSENDELSE'"},{name:"literal",value:"'MELLOMLAGRING'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'"},{name:"literal",value:"'KRYPTERING_MELLOMLAGRING'"}]},{name:"literal",value:"'NO_DATA'"}],required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    vedlegg: Attachment[];
}`,signature:{properties:[{key:"vedlegg",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    error?: AttachmentError;
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"union",raw:"GenerelleErrorKoder | ProblemDetailsErrorKode | InternError",elements:[{name:"union",raw:"'TIMEOUT' | 'SERVER_ERROR'",elements:[{name:"literal",value:"'TIMEOUT'"},{name:"literal",value:"'SERVER_ERROR'"}]},{name:"union",raw:`| 'IKKE_TILGANG'
| 'DUPLIKAT_FORSENDELSE'
| 'MELLOMLAGRING'
| 'MELLOMLAGRING_VEDLEGG'
| 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
| 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
| 'KRYPTERING_MELLOMLAGRING'`,elements:[{name:"literal",value:"'IKKE_TILGANG'"},{name:"literal",value:"'DUPLIKAT_FORSENDELSE'"},{name:"literal",value:"'MELLOMLAGRING'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'"},{name:"literal",value:"'KRYPTERING_MELLOMLAGRING'"}]},{name:"literal",value:"'NO_DATA'"}],required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]",required:!0}}]}}]},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"(path: Path) => void",signature:{arguments:[{type:{name:"Path"},name:"path"}],return:{name:"void"}}},description:""}}};function D({omBarnet:r}){const t=v(r);return r.antallBarn===1?e.jsx(a,{id:"OmBarnetOppsummering.EttBarn"}):r.antallBarn===2&&!t?e.jsx(a,{id:"OmBarnetOppsummering.Tvillinger"}):r.antallBarn===2&&t?e.jsx(a,{id:"OmBarnetOppsummering.ToBarn"}):e.jsx(a,{id:"OmBarnetOppsummering.FlereBarn"})}const T=({omBarnet:r,onVilEndreSvar:t})=>{const o=v(r),i=N(r),d=S(r);return e.jsxs(n,{children:[e.jsx(n.Header,{children:e.jsx(n.Heading,{level:"2",children:e.jsx(a,{id:"OmBarnetOppsummering.tittel"})})}),e.jsxs(n.Answers,{children:[e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.SoknadenGjelder"})}),e.jsx(n.Value,{children:e.jsx(D,{omBarnet:r})})]}),d&&e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.MedFødselsdato",values:{antall:1}})}),e.jsx(n.Value,{children:s(r.fødselsdato)})]}),i&&e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.MedTermindato"})}),e.jsx(n.Value,{children:s(r.termindato)})]}),o&&e.jsxs(e.Fragment,{children:[e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.MedAdopsjonsdato"})}),e.jsx(n.Value,{children:s(r.adopsjonsdato)})]}),e.jsxs(n.Answer,{children:[e.jsx(n.Label,{children:e.jsx(a,{id:"OmBarnetOppsummering.MedFødselsdato",values:{antall:r.fødselsdatoer.length}})}),e.jsx(n.Value,{children:r.fødselsdatoer.map(({dato:p})=>s(p)).join(", ")})]})]})]}),e.jsx(n.Footer,{children:e.jsx(n.EditLink,{onClick:t,children:e.jsx(a,{id:"Oppsummering.EndreSvar"})})})]})};T.__docgenInfo={description:"",methods:[],displayName:"OmBarnetOppsummering",props:{omBarnet:{required:!0,tsType:{name:"union",raw:"Fødsel | Adopsjon",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}}]},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const b=({sendSøknad:r,mellomlagreOgNaviger:t})=>{const o=h(),i=f(t),d=j(),p=R(l(u.OM_BARNET)),L=l(u.DOKUMENTASJON),A=l(u.UTENLANDSOPPHOLD_TIDLIGERE),k=l(u.UTENLANDSOPPHOLD_SENERE);return e.jsx(c,{pageTitle:d.formatMessage({id:"Søknad.Pageheading"}),children:e.jsxs(O,{appName:"Engangsstønad",stepConfig:o,sendSøknad:r,onAvsluttOgSlett:i.avbrytSøknad,goToPreviousStep:i.goToPreviousDefaultStep,onFortsettSenere:i.fortsettSøknadSenere,onStepChange:i.goToNextStep,children:[e.jsx(T,{omBarnet:p,onVilEndreSvar:()=>i.goToNextStep(m.OM_BARNET)}),e.jsx(G,{onVilEndreSvar:()=>i.goToNextStep(m.UTENLANDSOPPHOLD),tidligereUtenlandsopphold:A??[],senereUtenlandsopphold:k??[]}),e.jsx(y,{dokumentasjon:L,onVilEndreSvar:i.goToNextStep})]})})};b.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},mellomlagreOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{b as O,g as e};
