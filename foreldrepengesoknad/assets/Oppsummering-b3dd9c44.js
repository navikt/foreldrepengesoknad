import{j as e}from"./jsx-runtime-d079401a.js";import{E as Re,c as R,k as J,g as Ae,u as k,i as n,a0 as H,b as O,x as He,y as j,H as Ke,h as $,d as we,aW as ve,af as Ge,I as K,n as Ce,S as Je,aR as $e,B as We}from"./Tidsperioden-230fda20.js";import{r as V}from"./index-f1f2c4b1.js";import{n as S}from"./validation-631bcf6e.js";import{l as _e,m as Oe}from"./dateFormValidation-dddb5e20.js";import{a as Ye}from"./apiInterceptor-d706a9c9.js";import{w as Ze,i as fe,u as ke,t as Fe,B as be,r as ze,e as he,A as Xe,d as Qe,c as er,h as rr}from"./barnUtils-2bd29a1c.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{s as tr,a as nr,g as sr,u as ir}from"./stepsConfig-9affe22d.js";import{c as ar}from"./index-d741deb4.js";import{i as Ie}from"./isFarEllerMedmor-120238ea.js";import{B as p,L as Ee}from"./Link-13f307fd.js";import{T as Ve}from"./Tag-01a82302.js";import{f as lr}from"./dateUtils-0320eb73.js";import{A as L,d as or,s as z}from"./Uttaksplan-90a0bc89.js";import{g as dr}from"./arbeidsforholdUtils-07ae7a31.js";import{A as Y,H as pr,a as mr}from"./Næring-507cd81a.js";import{S as ur}from"./routes-9effe5a6.js";import{D as cr}from"./Periodene-c958b678.js";import{P as B,S as X,U as ye}from"./Perioden-31b9a852.js";import{c as gr,a as fr,d as kr,h as hr,u as jr}from"./uttaksPlanStatus-7c2b8508.js";import{A as vr,M as I}from"./leggTilPeriode-b40b5c44.js";import{A as xe}from"./FormikFileUploader-5bdf5146.js";import{u as N,C as A}from"./FpDataContext-fc20d236.js";import{B as _r}from"./BackButton-9bb476a6.js";import{u as yr}from"./index-cdc86f56.js";var xr=globalThis&&globalThis.__rest||function(r,t){var s={};for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&t.indexOf(i)<0&&(s[i]=r[i]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,i=Object.getOwnPropertySymbols(r);a<i.length;a++)t.indexOf(i[a])<0&&Object.prototype.propertyIsEnumerable.call(r,i[a])&&(s[i[a]]=r[i[a]]);return s};const Nr=V.forwardRef((r,t)=>{var{title:s,titleId:i}=r,a=xr(r,["title","titleId"]);let l=Re();return l=s?i||"title-"+l:void 0,V.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:t,"aria-labelledby":l},a),s?V.createElement("title",{id:l},s):null,V.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6.317 4.32a.75.75 0 0 0-1.023.932L7.704 12l-2.41 6.748a.75.75 0 0 0 1.023.932l15-7a.75.75 0 0 0 0-1.36l-15-7Zm2.712 6.93L7.31 6.44 19.227 12 7.31 17.56l1.719-4.81H12.5a.75.75 0 0 0 0-1.5H9.029Z",fill:"currentColor"}))}),Ar=Nr,Or=()=>{const r=V.useRef(new AbortController);return V.useEffect(()=>()=>{r.current.abort()},[]),r.current.signal};Ye.create();const d=({title:r,visible:t,children:s})=>e.jsxs(R,{padBottom:"l",visible:t,children:[e.jsx(J,{children:r}),s]});try{d.displayName="OppsummeringsPunkt",d.__docgenInfo={description:"",displayName:"OppsummeringsPunkt",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},visible:{defaultValue:null,description:"",name:"visible",required:!1,type:{name:"boolean"}}}}}catch{}const Fr=r=>Array.isArray(r),w=({ledetekst:r,children:t,className:s})=>e.jsxs("div",{className:s,children:[e.jsx(J,{children:r}),!Array.isArray(t)&&Fr(t.props.children)?t.props.children.map(i=>e.jsx(p,{className:"feltoppsummering__verdi",children:i},Ae())):t]});try{w.displayName="InnholdMedLedetekst",w.__docgenInfo={description:"",displayName:"InnholdMedLedetekst",props:{ledetekst:{defaultValue:null,description:"",name:"ledetekst",required:!0,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const Q=({ledetekst:r,children:t,className:s})=>e.jsx(w,{className:`feltoppsummering ${s}`,ledetekst:r,children:t});try{Q.displayName="KompleksFeltoppsummering",Q.__docgenInfo={description:"",displayName:"KompleksFeltoppsummering",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},ledetekst:{defaultValue:null,description:"",name:"ledetekst",required:!0,type:{name:"string"}}}}}catch{}const T=r=>{const{ledetekst:t,vedlegg:s}=r,i=k(),a=()=>s.filter(l=>!H(l)).map(({url:l,id:o,filename:u})=>e.jsx(Ee,{href:l,target:"_blank",children:u},o));return e.jsx(Q,{className:"oppsummeringAvDokumentasjon",ledetekst:t||n(i,"vedlagtdokumentasjon"),children:s&&s.filter(l=>!H(l)).length>0?e.jsx("div",{children:a()}):e.jsx("div",{children:e.jsx(Ve,{variant:"warning",children:n(i,"oppsummering.andreInntekter.dokumentasjon.mangler")})})})};try{T.displayName="OppsummeringAvDokumentasjon",T.__docgenInfo={description:"",displayName:"OppsummeringAvDokumentasjon",props:{ledetekst:{defaultValue:null,description:"",name:"ledetekst",required:!1,type:{name:"string"}},vedlegg:{defaultValue:null,description:"",name:"vedlegg",required:!0,type:{name:"Attachment[]"}}}}}catch{}const ee=({annenForelder:r,søker:t,søkerrolle:s,barn:i,farMedmorErAleneOmOmsorg:a})=>{const l=k(),o=Ie(s),{dokumentasjonAvAleneomsorg:u}=i;return e.jsxs(e.Fragment,{children:[Ze(r)&&e.jsx(d,{title:n(l,"oppsummering.annenForelder.ikkeOppgitt")}),fe(r)&&e.jsxs(e.Fragment,{children:[e.jsx(d,{title:n(l,"oppsummering.annenForelder.navn"),children:e.jsx(p,{children:`${r.fornavn} ${r.etternavn}`})}),e.jsx(d,{title:n(l,"oppsummering.annenForelder.fnr"),children:e.jsx(p,{children:r.fnr})}),e.jsx(d,{title:t.erAleneOmOmsorg?n(l,"oppsummering.annenForelder.aleneOmOmsorg.tittel"):n(l,"oppsummering.annenForelder.fellesOmsorg.tittel"),children:e.jsx(p,{children:e.jsx(O,{id:t.erAleneOmOmsorg?"oppsummering.annenForelder.aleneOmOmsorg.tekst":"oppsummering.annenForelder.fellesOmsorg.tekst"})})}),!t.erAleneOmOmsorg&&e.jsx(d,{title:n(l,"oppsummering.annenForelder.rettPåForeldrepengerINorge",{navn:r.fornavn}),children:e.jsx(p,{children:e.jsx(O,{id:r.harRettPåForeldrepengerINorge?"ja":"nei"})})}),!t.erAleneOmOmsorg&&!r.harRettPåForeldrepengerINorge&&e.jsx(d,{title:n(l,"oppsummering.annenForelder.harOppholdtSegIEØS",{navn:r.fornavn}),children:e.jsx(p,{children:e.jsx(O,{id:r.harOppholdtSegIEØS?"ja":"nei"})})}),!t.erAleneOmOmsorg&&r.harOppholdtSegIEØS===!0&&e.jsx(d,{title:n(l,"oppsummering.annenForelder.rettPåForeldrepengerIEØS",{navn:r.fornavn}),children:e.jsx(p,{children:e.jsx(O,{id:r.harRettPåForeldrepengerIEØS?"ja":"nei"})})}),o&&!t.erAleneOmOmsorg&&!r.harRettPåForeldrepengerINorge&&!r.harRettPåForeldrepengerIEØS&&e.jsx(d,{title:n(l,"annenForelder.erMorUfør",{navn:r.fornavn}),children:e.jsx(p,{children:e.jsx(O,{id:r.erUfør?"ja":"nei"})})})]}),a&&o&&e.jsx(T,{vedlegg:u||[],ledetekst:n(l,"oppsummering.annenForelder.dokumentasjonAvAleneomsorg")})]})};try{ee.displayName="AnnenForelderOppsummering",ee.__docgenInfo={description:"",displayName:"AnnenForelderOppsummering",props:{annenForelder:{defaultValue:null,description:"",name:"annenForelder",required:!0,type:{name:"AnnenForelder"}},søker:{defaultValue:null,description:"",name:"søker",required:!0,type:{name:"Søker"}},søkerrolle:{defaultValue:null,description:"",name:"søkerrolle",required:!0,type:{name:"enum",value:[{value:'"far"'},{value:'"medmor"'},{value:'"mor"'}]}},barn:{defaultValue:null,description:"",name:"barn",required:!0,type:{name:"Barn"}},farMedmorErAleneOmOmsorg:{defaultValue:null,description:"",name:"farMedmorErAleneOmOmsorg",required:!0,type:{name:"boolean"}}}}}catch{}const re=({barn:r,familiehendelsesdato:t})=>{const s=k();return ke(r)||lr(t)?null:e.jsxs(e.Fragment,{children:[e.jsx(d,{title:n(s,"oppsummering.barn.adoptertIUtlandet"),children:e.jsx(p,{children:e.jsx(O,{id:r.adoptertIUtlandet?"ja":"nei"})})}),e.jsx(d,{title:n(s,"oppsummering.barn.ankomstdato"),visible:He(r.ankomstdato),children:e.jsx(p,{children:j(r.ankomstdato)})})]})};try{re.displayName="BarnAdoptertIUtlandetDetaljer",re.__docgenInfo={description:"",displayName:"BarnAdoptertIUtlandetDetaljer",props:{barn:{defaultValue:null,description:"",name:"barn",required:!0,type:{name:"AdoptertStebarn | AdoptertAnnetBarn"}},familiehendelsesdato:{defaultValue:null,description:"",name:"familiehendelsesdato",required:!0,type:{name:"Date"}}}}}catch{}const br=(r,t)=>r===1?n(t,"oppsummering.barn.antallBarn.ettBarn"):r===2?n(t,"oppsummering.barn.antallBarn.toBarn"):n(t,"oppsummering.barn.antallBarn.flere",{antallBarn:r}),Ir=r=>r===be.UFØDT?"Termin":"Fødselsdato",Er=r=>ze(r)?j(r.termindato):j(r.fødselsdatoer[0]),te=({barn:r,familiehendelsesdato:t})=>{const s=k();return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:n(s,"oppsummering.barn.søknadenGjelder"),children:e.jsx(p,{children:br(r.antallBarn,s)})}),e.jsx(d,{title:Ir(r.type),children:e.jsx(p,{children:Er(r)})}),(Fe(r)||ke(r))&&e.jsxs(e.Fragment,{children:[e.jsx(d,{title:n(s,"oppsummering.barn.gjelderSøknadenStebarnsadopsjon"),children:e.jsx(p,{children:e.jsx(O,{id:r.type===be.ADOPTERT_STEBARN?"ja":"nei"})})}),e.jsx(d,{title:n(s,"oppsummering.barn.adopsjonsdato"),children:e.jsx(p,{children:j(r.adopsjonsdato)})}),e.jsx(re,{barn:r,familiehendelsesdato:t})]})]})};try{te.displayName="BarnOppsummering",te.__docgenInfo={description:"",displayName:"BarnOppsummering",props:{barn:{defaultValue:null,description:"",name:"barn",required:!0,type:{name:"Barn"}},familiehendelsesdato:{defaultValue:null,description:"",name:"familiehendelsesdato",required:!0,type:{name:"Date"}}}}}catch{}const E=({title:r,children:t})=>{const s=$("oppsummeringsPanel");return e.jsx(L,{children:e.jsxs(L.Item,{className:s.element("specificity"),children:[e.jsx(L.Header,{children:e.jsx(Ke,{level:"3",size:"small",children:r})}),e.jsx(L.Content,{children:t})]})})};try{E.displayName="OppsummeringsPanel",E.__docgenInfo={description:"",displayName:"OppsummeringsPanel",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}}}}}catch{}const ne=({søkerinfo:r})=>e.jsx(d,{title:`${r.person.fornavn} ${r.person.etternavn}`,children:e.jsx(p,{children:r.person.fnr})});try{ne.displayName="Personalia",ne.__docgenInfo={description:"",displayName:"Personalia",props:{søkerinfo:{defaultValue:null,description:"",name:"søkerinfo",required:!0,type:{name:"Søkerinfo"}}}}}catch{}const Vr=(r,t)=>we(r.tidsperiode.fom).isBefore(t.tidsperiode.fom,"day")?-1:1,G=({utenlandsopphold:r,tidligereOpphold:t})=>{const s=k(),i=$("utenlandsoppholdOppsummeringListe");return e.jsx("ul",{className:i.block,children:[...r].sort(Vr).map(a=>e.jsxs("li",{className:i.element("listElement"),children:[e.jsx(p,{children:t?n(s,"oppsummering.utenlandsopphold.harBoddINorge.utenlands",{land:_e.getName(a.land,"nb")}):n(s,"oppsummering.utenlandsopphold.skalBoINorge.utenlands",{land:_e.getName(a.land,"nb")})}),e.jsxs(p,{children:[j(a.tidsperiode.fom)," - ",j(a.tidsperiode.tom)]})]},`${a.land}${a.tidsperiode.fom}${a.tidsperiode.tom}`))})};try{G.displayName="UtenlandsoppholdOppsummeringListe",G.__docgenInfo={description:"",displayName:"UtenlandsoppholdOppsummeringListe",props:{utenlandsopphold:{defaultValue:null,description:"",name:"utenlandsopphold",required:!0,type:{name:"Utenlandsopphold[]"}},tidligereOpphold:{defaultValue:null,description:"",name:"tidligereOpphold",required:!0,type:{name:"boolean"}}}}}catch{}const Sr=(r,t,s)=>{let i=!0;return t.forEach(a=>{ve(a.tidsperiode,r)&&(i=!1)}),s.forEach(a=>{ve(a.tidsperiode,r)&&(i=!1)}),i},Ur=r=>Fe(r)||ke(r),Ne=[],se=({utenlandsopphold:r,tidligereUtenlandsopphold:t=Ne,senereUtenlandsopphold:s=Ne,barn:i})=>{const a=k(),l=he(i),o=Sr(l,t,s);return e.jsxs(e.Fragment,{children:[e.jsxs(d,{title:n(a,"oppsummering.utenlandsopphold.harBoddINorge"),children:[r.iNorgeSiste12Mnd?e.jsx(p,{children:n(a,"oppsummering.utenlandsopphold.harBoddINorge.norge")}):null,e.jsx(G,{utenlandsopphold:t,tidligereOpphold:!0})]}),e.jsxs(d,{title:n(a,"oppsummering.utenlandsopphold.skalBoINorge"),children:[r.iNorgeNeste12Mnd?e.jsx(p,{children:n(a,"oppsummering.utenlandsopphold.skalBoINorge.norge")}):null,e.jsx(G,{utenlandsopphold:s,tidligereOpphold:!1})]}),e.jsx(d,{title:Ur(i)?n(a,"oppsummering.utenlandsopphold.erINorgeOmsorgsovertakelsesdato"):n(a,"oppsummering.utenlandsopphold.erINorgePåFødselstidspunkt"),children:e.jsx(p,{children:e.jsx(O,{id:o?"ja":"nei"})})})]})};try{se.displayName="UtenlandsoppholdOppsummering",se.__docgenInfo={description:"",displayName:"UtenlandsoppholdOppsummering",props:{utenlandsopphold:{defaultValue:null,description:"",name:"utenlandsopphold",required:!0,type:{name:"Opphold"}},tidligereUtenlandsopphold:{defaultValue:{value:"[] as Utenlandsopphold[]"},description:"",name:"tidligereUtenlandsopphold",required:!1,type:{name:"Utenlandsopphold[]"}},senereUtenlandsopphold:{defaultValue:{value:"[] as Utenlandsopphold[]"},description:"",name:"senereUtenlandsopphold",required:!1,type:{name:"Utenlandsopphold[]"}},barn:{defaultValue:null,description:"",name:"barn",required:!0,type:{name:"Barn"}}}}}catch{}var Se=(r=>(r.harGodkjentOppsummering="harGodkjentOppsummering",r))(Se||{});const Tr={harGodkjentOppsummering:!1},qr=()=>Tr,Z=Ge(),Pr=r=>t=>{if(t!==!0)return n(r,"valideringsfeil.oppsummering.harGodkjentOppsummering.påkrevd")},ie=({annenInntekt:r})=>{const t=k(),{type:s,vedlegg:i}=r;if(s===Y.JOBB_I_UTLANDET){const a=r;return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:n(t,"oppsummering.andreInntekter.arbeidsgiverNavn"),children:e.jsx(p,{children:a.arbeidsgiverNavn})}),e.jsx(d,{title:n(t,"oppsummering.andreInntekter.arbeidsgiverLand"),children:e.jsx(p,{children:Oe.getName(a.land,"nb")})})]})}if(s===Y.SLUTTPAKKE||s===Y.MILITÆRTJENESTE){const a=()=>i.filter(l=>!H(l)).map(({url:l,id:o,filename:u})=>e.jsx(Ee,{href:l,target:"_blank",children:u},o));return e.jsx(d,{title:n(t,"oppsummering.andreInntekter.vedlagtdokumentasjon"),children:(i||[]).filter(l=>!H(l)).length>0?a():e.jsx(Ve,{variant:"warning",children:n(t,"oppsummering.andreInntekter.dokumentasjon.mangler")})})}return null};try{ie.displayName="AnnenInntektDetaljer",ie.__docgenInfo={description:"",displayName:"AnnenInntektDetaljer",props:{annenInntekt:{defaultValue:null,description:"",name:"annenInntekt",required:!0,type:{name:"AnnenInntekt"}}}}}catch{}const C=({list:r})=>e.jsx("ul",{className:"oppsummeringsliste",children:r.map(t=>e.jsxs("li",{className:"oppsummeringsliste__element",children:[e.jsxs("div",{className:"oppsummeringsliste__element__heading",children:[e.jsx(J,{children:t.headerVenstre}),e.jsx("div",{className:"høyrestiltTekst",children:e.jsx(p,{children:t.headerHøyre})})]}),t.content&&e.jsx("div",{className:"oppsummeringsliste__element__content",children:t.content})]},t.key))});try{C.displayName="InntekterTabell",C.__docgenInfo={description:"",displayName:"InntekterTabell",props:{list:{defaultValue:null,description:"",name:"list",required:!0,type:{name:"{ key: string; headerVenstre: string; headerHøyre: string; content?: ReactElement<any, string | JSXElementConstructor<any>> | undefined; }[]"}}}}}catch{}const ae=({søker:r})=>{const t=k();return!r.harHattAnnenInntektSiste10Mnd||!r.andreInntekterSiste10Mnd?e.jsx(d,{title:n(t,"oppsummering.andreInntekter.tittel"),children:e.jsx(p,{children:n(t,"oppsummering.andreInntekter.ikkeHattAndreInntekter")})}):e.jsx(d,{title:n(t,"oppsummering.andreInntekter.tittel"),children:e.jsx(C,{list:r.andreInntekterSiste10Mnd.map(s=>({key:s.type+s.tidsperiode,headerVenstre:n(t,`inntektstype.${s.type.toLowerCase()}`),headerHøyre:n(t,"tidsintervall",{fom:j(K(s.tidsperiode.fom)),tom:s.pågående?"pågående":j(K(s.tidsperiode.tom))}),content:e.jsx(ie,{annenInntekt:s})}))})})};try{ae.displayName="AndreInntekterOppsummering",ae.__docgenInfo={description:"",displayName:"AndreInntekterOppsummering",props:{søker:{defaultValue:null,description:"",name:"søker",required:!0,type:{name:"Søker"}}}}}catch{}const le=({søker:r})=>{const t=k();if(!r.frilansInformasjon||!r.harJobbetSomFrilansSiste10Mnd)return e.jsx(d,{title:n(t,"oppsummering.frilans.tittel"),children:e.jsx(p,{children:n(t,"oppsummering.frilans.ikkeFrilans")})});const{oppstart:s,jobberFremdelesSomFrilans:i}=r.frilansInformasjon;return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:n(t,"oppsummering.frilans.tittel")}),e.jsx(d,{title:n(t,"oppsummering.frilans.oppstartsdato"),children:e.jsx(p,{children:j(s)})}),e.jsx(d,{title:n(t,"oppsummering.frilans.fremdelesFrilans"),children:e.jsx(p,{children:i?n(t,"ja"):n(t,"nei")})})]})};try{le.displayName="FrilansOppsummering",le.__docgenInfo={description:"",displayName:"FrilansOppsummering",props:{søker:{defaultValue:null,description:"",name:"søker",required:!0,type:{name:"Søker"}}}}}catch{}const Dr=({næring:r})=>{const t=k(),{næringstyper:s,organisasjonsnummer:i,næringsinntekt:a,registrertINorge:l,registrertILand:o,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:u,hattVarigEndringAvNæringsinntektSiste4Kalenderår:f,endringAvNæringsinntektInformasjon:h}=r;return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:n(t,"oppsummering.selvstendigNæringsdrivende.næringstype"),children:e.jsx(p,{children:n(t,`næringstype.${s[0].toLowerCase()}`)})}),i&&e.jsx(d,{title:n(t,"oppsummering.selvstendigNæringsdrivende.orgnr"),children:e.jsx(p,{children:i})}),a&&e.jsx(d,{title:n(t,"oppsummering.selvstendigNæringsdrivende.næringsinntekt"),children:e.jsx(p,{children:a})}),l||o&&e.jsx(d,{title:n(t,"oppsummering.selvstendigNæringsdrivende.registrertLand"),children:e.jsx(p,{children:l?"Norge":Oe.getName(o,"nb")})}),u&&e.jsx(d,{title:n(t,"oppsummering.selvstendigNæringsdrivende.blittYrkesaktivSiste3År"),children:e.jsx(p,{children:u?n(t,"ja"):n(t,"nei")})}),f===!0&&e.jsxs(e.Fragment,{children:[e.jsx(d,{title:n(t,"oppsummering.selvstendigNæringsdrivende.datoForEndringAvNæringsinntekt"),children:e.jsx(p,{children:j(h.dato)})}),e.jsx(d,{title:n(t,"oppsummering.selvstendigNæringsdrivende.næringsinntektEtterEndring"),children:e.jsx(p,{children:h.næringsinntektEtterEndring})}),e.jsx(d,{title:n(t,"oppsummering.selvstendigNæringsdrivende.forklaring"),children:e.jsx(p,{children:h.forklaring})})]})]})};try{Nringsdetaljer.displayName="Nringsdetaljer",Nringsdetaljer.__docgenInfo={description:"",displayName:"Nringsdetaljer",props:{næring:{defaultValue:null,description:"",name:"næring",required:!0,type:{name:"Næring"}}}}}catch{}const Br=({søker:r})=>{const t=k();return!r.selvstendigNæringsdrivendeInformasjon||!r.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd?e.jsx(d,{title:n(t,"oppsummering.selvstendigNæringsdrivende.tittel"),children:e.jsx(p,{children:n(t,"oppsummering.selvstendigNæringsdrivende.ikkeSelvstendigNæringsdrivende")})}):e.jsx(d,{title:n(t,"oppsummering.selvstendigNæringsdrivende.tittel"),children:e.jsx(C,{list:r.selvstendigNæringsdrivendeInformasjon.map(s=>({key:s.navnPåNæringen+s.tidsperiode,headerVenstre:s.navnPåNæringen,headerHøyre:n(t,"tidsintervall",{fom:j(s.tidsperiode.fom),tom:s.pågående?"pågående":j(s.tidsperiode.tom)}),content:e.jsx(Dr,{næring:s})}))})})};try{SelvstendigNringsdrivendeOppsummering.displayName="SelvstendigNringsdrivendeOppsummering",SelvstendigNringsdrivendeOppsummering.__docgenInfo={description:"",displayName:"SelvstendigNringsdrivendeOppsummering",props:{søker:{defaultValue:null,description:"",name:"søker",required:!0,type:{name:"Søker"}}}}}catch{}const oe=({arbeidsforhold:r,barn:t,søkersituasjon:s,søker:i})=>{const a=k(),l=s.situasjon==="adopsjon",o=Ie(s.rolle),u=he(t),f=dr(r,l,o,K(u)),h=f!==void 0&&f.length>0;return e.jsxs(e.Fragment,{children:[e.jsxs(d,{title:n(a,"oppsummering.inntekt.registrerteArbeidsforhold"),children:[e.jsx(pr,{harArbeidsforhold:h}),e.jsx(mr,{harArbeidsforhold:h,arbeidsforhold:f})]}),e.jsx(le,{søker:i}),e.jsx(Br,{søker:i}),e.jsx(ae,{søker:i})]})};try{oe.displayName="ArbeidsforholdOgAndreInntekterOppsummering",oe.__docgenInfo={description:"",displayName:"ArbeidsforholdOgAndreInntekterOppsummering",props:{arbeidsforhold:{defaultValue:null,description:"",name:"arbeidsforhold",required:!0,type:{name:"Arbeidsforhold[]"}},barn:{defaultValue:null,description:"",name:"barn",required:!0,type:{name:"Barn"}},søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"SøkersituasjonFp"}},søker:{defaultValue:null,description:"",name:"søker",required:!0,type:{name:"Søker"}}}}}catch{}const Mr=$("list"),de=r=>{const{data:t,renderElement:s,className:i}=r;return e.jsx("ul",{className:`${Mr.block} ${i}`,children:t.map((a,l)=>s(a,l))})};try{de.displayName="List",de.__docgenInfo={description:"",displayName:"List",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"any[]"}},renderElement:{defaultValue:null,description:"",name:"renderElement",required:!0,type:{name:"(data: any, index: number) => Element"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const pe=r=>{const{data:t,kompakt:s}=r;return e.jsx(de,{className:"oppsummeringsliste",data:t,renderElement:i=>V.createElement(Lr,{...i,kompakt:s,key:Ae()})})},Lr=({venstrestiltTekst:r,høyrestiltTekst:t,content:s,kompakt:i})=>e.jsxs("li",{className:ar("oppsummeringsliste__element",{"oppsummeringsliste__element--kompakt":i===!0}),children:[e.jsxs("div",{className:"oppsummeringsliste__element__heading",children:[e.jsx(J,{as:"h4",children:r}),e.jsx("div",{className:"høyrestiltTekst",children:e.jsx(p,{children:t})})]}),s&&e.jsx("div",{className:"oppsummeringsliste__element__content",children:s})]});try{pe.displayName="Oppsummeringsliste",pe.__docgenInfo={description:"",displayName:"Oppsummeringsliste",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"OppsummeringslisteelementProps[]"}},kompakt:{defaultValue:null,description:"",name:"kompakt",required:!1,type:{name:"boolean"}}}}}catch{}const x=({feltnavn:r,verdi:t})=>e.jsx(w,{className:"feltoppsummering",ledetekst:r,children:e.jsx("div",{className:"feltoppsummering__verdi",children:t})});try{x.displayName="Feltoppsummering",x.__docgenInfo={description:"",displayName:"Feltoppsummering",props:{feltnavn:{defaultValue:null,description:"",name:"feltnavn",required:!0,type:{name:"string"}},verdi:{defaultValue:null,description:"",name:"verdi",required:!0,type:{name:"string | string[]"}}}}}catch{}const Rr=(r,t)=>{if(t){const s=r.find(({arbeidsgiverId:i,arbeidsgiverIdType:a})=>a==="orgnr"&&i===t);if(s)return s.arbeidsgiverNavn}return""},Hr=(r,t,s,i)=>{let a=[],l=[];return s!==void 0&&s.length>0&&i&&i.length>0&&(a=s.map(o=>{const u=Rr(i,o);return n(r,"oppsummering.uttak.arbeidstaker",{orgnr:o,arbeidsgiverNavn:u})})),t!==void 0&&t.length>0&&(l=t.filter(o=>o!==vr.arbeidstaker).map(o=>n(r,`oppsummering.uttak.${o.toLowerCase()}`))),a.concat(l)},Ue=(r,{type:t,årsak:s},i)=>{const a=t===B.Utsettelse?"utsettelsesårsak.":"overføringsårsaktype.";return n(r,`uttaksplan.${a+s}`,i)},Kr=(r,t,s)=>t===X.Fedrekvote?r.farMedmor:t===X.Mødrekvote?r.mor:n(s,"annen.forelder"),wr=({periode:r,navnPåForeldre:t,erFarEllerMedmor:s,periodeErNyEllerEndret:i})=>{const{vedlegg:a}=r,l=k(),o=Kr(t,r.konto,l);return e.jsxs(e.Fragment,{children:[e.jsx(x,{feltnavn:n(l,"oppsummering.uttak.årsak"),verdi:Ue(l,r,{navnAnnenForelder:o})}),or(s,r)&&i&&e.jsx(T,{vedlegg:a||[]})]})};try{Overfringsperiodedetaljer.displayName="Overfringsperiodedetaljer",Overfringsperiodedetaljer.__docgenInfo={description:"",displayName:"Overfringsperiodedetaljer",props:{periode:{defaultValue:null,description:"",name:"periode",required:!0,type:{name:"Overføringsperiode"}},navnPåForeldre:{defaultValue:null,description:"",name:"navnPåForeldre",required:!0,type:{name:"NavnPåForeldre"}},erFarEllerMedmor:{defaultValue:null,description:"",name:"erFarEllerMedmor",required:!0,type:{name:"boolean"}},periodeErNyEllerEndret:{defaultValue:null,description:"",name:"periodeErNyEllerEndret",required:!0,type:{name:"boolean"}}}}}catch{}const Gr=(r,t)=>{switch(t){case I.Arbeid:return n(r,"oppsummering.morsAktivitet.Arbeid");case I.ArbeidOgUtdanning:return n(r,"oppsummering.morsAktivitet.ArbeidOgUtdanning");case I.Innlagt:return n(r,"oppsummering.morsAktivitet.Innlagt");case I.Introduksjonsprogrammet:return n(r,"oppsummering.morsAktivitet.Introduksjonsprogrammet");case I.Kvalifiseringsprogrammet:return n(r,"oppsummering.morsAktivitet.Kvalifiseringsprogrammet");case I.TrengerHjelp:return n(r,"oppsummering.morsAktivitet.TrengerHjelp");case I.Uføre:return n(r,"oppsummering.morsAktivitet.Uføre");case I.Utdanning:return n(r,"oppsummering.morsAktivitet.Utdanning");case I.IkkeOppgitt:return n(r,"oppsummering.morsAktivitet.UtenAktivitetsKrav");default:return Ce(t,"Mor har ingen aktivitet")}},Te=({morsAktivitet:r,dokumentasjonAvMorsAktivitet:t,visOppsummeringAvDokumentasjon:s})=>{const i=k();return e.jsxs(e.Fragment,{children:[e.jsx(x,{feltnavn:n(i,"oppsummering.morsAktivitet"),verdi:Gr(i,r)}),s&&e.jsx(T,{ledetekst:n(i,"oppsummering.morsAktivitet.dokumentasjon"),vedlegg:t})]})};try{MorsaktiviteterDetaljer.displayName="MorsaktiviteterDetaljer",MorsaktiviteterDetaljer.__docgenInfo={description:"",displayName:"MorsaktiviteterDetaljer",props:{morsAktivitet:{defaultValue:null,description:"",name:"morsAktivitet",required:!0,type:{name:"enum",value:[{value:'"ARBEID"'},{value:'"UTDANNING"'},{value:'"KVALPROG"'},{value:'"INTROPROG"'},{value:'"TRENGER_HJELP"'},{value:'"INNLAGT"'},{value:'"ARBEID_OG_UTDANNING"'},{value:'"UFØRE"'},{value:'"IKKE_OPPGITT"'}]}},dokumentasjonAvMorsAktivitet:{defaultValue:null,description:"",name:"dokumentasjonAvMorsAktivitet",required:!0,type:{name:"Attachment[]"}},visOppsummeringAvDokumentasjon:{defaultValue:null,description:"",name:"visOppsummeringAvDokumentasjon",required:!0,type:{name:"boolean"}}}}}catch{}const me=({periode:r,registrerteArbeidsforhold:t,periodeErNyEllerEndret:s,søkerErFarEllerMedmor:i,annenForelder:a})=>{const{konto:l,morsAktivitetIPerioden:o,ønskerSamtidigUttak:u,gradert:f,stillingsprosent:h,orgnumre:F,arbeidsformer:v,vedlegg:_,ønskerFlerbarnsdager:y}=r,c=k();let b="";v&&(b=Hr(c,v,F,t).join(`\r
`));const U=fe(a)&&a.harRettPåForeldrepengerINorge;return e.jsxs(e.Fragment,{children:[y!==void 0&&U&&e.jsx(x,{feltnavn:n(c,"oppsummering.uttak.ønskerFlerbarnsdager"),verdi:y?n(c,"ja"):n(c,"nei")}),u!==void 0&&U&&e.jsx(x,{feltnavn:n(c,"oppsummering.uttak.samtidigUttak"),verdi:u?n(c,"ja"):n(c,"nei")}),l!==X.ForeldrepengerFørFødsel&&u!==!0&&e.jsx(x,{feltnavn:n(c,"oppsummering.uttak.kombineresMedarbeid"),verdi:f?n(c,"ja"):n(c,"nei")}),f===!0&&h&&e.jsx(x,{feltnavn:n(c,"oppsummering.uttak.stillingsprosent"),verdi:h}),v&&e.jsx(x,{feltnavn:n(c,"oppsummering.uttak.arbeidstaker.label"),verdi:b}),z(r,i,a)&&o&&e.jsx(Te,{morsAktivitet:o,dokumentasjonAvMorsAktivitet:_||[],visOppsummeringAvDokumentasjon:s})]})};try{me.displayName="Uttaksperiodedetaljer",me.__docgenInfo={description:"",displayName:"Uttaksperiodedetaljer",props:{periode:{defaultValue:null,description:"",name:"periode",required:!0,type:{name:"UttaksperiodeBase"}},registrerteArbeidsforhold:{defaultValue:null,description:"",name:"registrerteArbeidsforhold",required:!0,type:{name:"Arbeidsforhold[] | undefined"}},periodeErNyEllerEndret:{defaultValue:null,description:"",name:"periodeErNyEllerEndret",required:!0,type:{name:"boolean"}},søkerErFarEllerMedmor:{defaultValue:null,description:"",name:"søkerErFarEllerMedmor",required:!0,type:{name:"boolean"}},annenForelder:{defaultValue:null,description:"",name:"annenForelder",required:!0,type:{name:"AnnenForelder"}}}}}catch{}const Cr=({periode:r,søkerErFarEllerMedmor:t,annenForelder:s,periodeErNyEllerEndret:i})=>{const{årsak:a,morsAktivitetIPerioden:l,vedlegg:o,bekrefterArbeidIPerioden:u}=r,f=k(),h=u===!0?n(f,"ja"):n(f,"nei");return e.jsxs(e.Fragment,{children:[e.jsx(x,{feltnavn:n(f,"oppsummering.uttak.årsak"),verdi:Ue(f,r)}),z(r,t,s)&&i&&r.årsak!==ye.Fri&&e.jsx(T,{vedlegg:(o||[]).filter(F=>F.type!==xe.MORS_AKTIVITET_DOKUMENTASJON)}),a===ye.Arbeid&&e.jsx(x,{feltnavn:n(f,"oppsummering.uttak.bekreft100ProsentIArbeid.label"),verdi:h}),z(r,t,s)&&l&&e.jsx(Te,{morsAktivitet:l,dokumentasjonAvMorsAktivitet:(o||[]).filter(F=>F.type===xe.MORS_AKTIVITET_DOKUMENTASJON),visOppsummeringAvDokumentasjon:i})]})};try{Uttsettelsesperiodedetaljer.displayName="Uttsettelsesperiodedetaljer",Uttsettelsesperiodedetaljer.__docgenInfo={description:"",displayName:"Uttsettelsesperiodedetaljer",props:{periode:{defaultValue:null,description:"",name:"periode",required:!0,type:{name:"Utsettelsesperiode | PeriodeUtenUttakUtsettelse"}},registrerteArbeidsforhold:{defaultValue:null,description:"",name:"registrerteArbeidsforhold",required:!0,type:{name:"Arbeidsforhold[]"}},søkerErFarEllerMedmor:{defaultValue:null,description:"",name:"søkerErFarEllerMedmor",required:!0,type:{name:"boolean"}},annenForelder:{defaultValue:null,description:"",name:"annenForelder",required:!0,type:{name:"AnnenForelder"}},periodeErNyEllerEndret:{defaultValue:null,description:"",name:"periodeErNyEllerEndret",required:!0,type:{name:"boolean"}}}}}catch{}const ue=({perioder:r,navnPåForeldre:t,erFarEllerMedmor:s,registrerteArbeidsforhold:i,annenForelder:a,eksisterendeUttaksplan:l,familiehendelsesdato:o,termindato:u,situasjon:f,erAleneOmOmsorg:h,ønskerJustertUttakVedFødsel:F})=>{const v=k(),_=m=>kr(v,m,t,s,h),y=m=>{const g=_(m.konto);return hr(v,g,m,f,o,u)},c=m=>{const g=n(v,"tidsintervall",{fom:j(m.fom),tom:j(m.tom)});return jr(F,u,m.fom)?n(v,"oppsummering.uttak.periodenBlirAutomatiskJustert").concat(g):g},b=(m,g=!0)=>({venstrestiltTekst:y(m),høyrestiltTekst:c(m.tidsperiode),content:e.jsx(me,{periode:m,registrerteArbeidsforhold:i,periodeErNyEllerEndret:g,søkerErFarEllerMedmor:s,annenForelder:a})}),U=m=>({venstrestiltTekst:fr(v,m,t,o,u,f),høyrestiltTekst:c(m.tidsperiode)}),q=(m,g)=>({venstrestiltTekst:n(v,"oppsummering.utsettelse.pga"),høyrestiltTekst:c(m.tidsperiode),content:e.jsx(Cr,{periode:m,registrerteArbeidsforhold:i,søkerErFarEllerMedmor:s,annenForelder:a,periodeErNyEllerEndret:g})}),W=(m,g)=>{const M=_(m.konto);return{venstrestiltTekst:n(v,"oppsummering.overtakelse.pga",{konto:M}),høyrestiltTekst:c(m.tidsperiode),content:e.jsx(wr,{periode:m,navnPåForeldre:t,erFarEllerMedmor:s,periodeErNyEllerEndret:g})}},P=m=>{const g=l?gr(m,l)===!1:!0;switch(m.type){case B.Uttak:return b(m,g);case B.Utsettelse:return q(m,g);case B.Overføring:return W(m,g);case B.Opphold:return U(m);default:return null}},D=()=>r.map(g=>P(g)).filter(g=>g!==null);return e.jsx(pe,{data:D()})};try{ue.displayName="UttaksplanOppsummeringsliste",ue.__docgenInfo={description:"",displayName:"UttaksplanOppsummeringsliste",props:{perioder:{defaultValue:null,description:"",name:"perioder",required:!0,type:{name:"Periode[]"}},navnPåForeldre:{defaultValue:null,description:"",name:"navnPåForeldre",required:!0,type:{name:"NavnPåForeldre"}},erFarEllerMedmor:{defaultValue:null,description:"",name:"erFarEllerMedmor",required:!0,type:{name:"boolean"}},registrerteArbeidsforhold:{defaultValue:null,description:"",name:"registrerteArbeidsforhold",required:!0,type:{name:"Arbeidsforhold[]"}},annenForelder:{defaultValue:null,description:"",name:"annenForelder",required:!0,type:{name:"AnnenForelder"}},eksisterendeUttaksplan:{defaultValue:null,description:"",name:"eksisterendeUttaksplan",required:!1,type:{name:"Periode[]"}},familiehendelsesdato:{defaultValue:null,description:"",name:"familiehendelsesdato",required:!0,type:{name:"Date"}},termindato:{defaultValue:null,description:"",name:"termindato",required:!0,type:{name:"Date | undefined"}},situasjon:{defaultValue:null,description:"",name:"situasjon",required:!0,type:{name:"enum",value:[{value:'"fødsel"'},{value:'"adopsjon"'},{value:'"omsorgsovertakelse"'}]}},erAleneOmOmsorg:{defaultValue:null,description:"",name:"erAleneOmOmsorg",required:!0,type:{name:"boolean"}},ønskerJustertUttakVedFødsel:{defaultValue:null,description:"",name:"ønskerJustertUttakVedFødsel",required:!0,type:{name:"boolean | undefined"}}}}}catch{}const ce=({dekningsgrad:r,antallUkerUttaksplan:t,ønskerJustertUttakVedFødsel:s,antallBarn:i,...a})=>{const l=k(),o=r===cr.HUNDRE_PROSENT?n(l,"oppsummering.uttak.dekningsgrad.verdi100",{antallUker:t}):n(l,"oppsummering.uttak.dekningsgrad.verdi80",{antallUker:t});return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:n(l,"oppsummering.uttak.dekningsgrad.label"),children:e.jsx(p,{children:o})}),e.jsx(ue,{ønskerJustertUttakVedFødsel:s,...a}),s!==void 0&&e.jsx(d,{title:n(l,"oppsummering.uttak.ønskerAutomatiskJustering.label",{antallBarn:i}),children:e.jsx(p,{children:e.jsx(O,{id:s?"ja":"nei"})})})]})};try{ce.displayName="UttaksplanOppsummering",ce.__docgenInfo={description:"",displayName:"UttaksplanOppsummering",props:{perioder:{defaultValue:null,description:"",name:"perioder",required:!0,type:{name:"Periode[]"}},navnPåForeldre:{defaultValue:null,description:"",name:"navnPåForeldre",required:!0,type:{name:"NavnPåForeldre"}},erFarEllerMedmor:{defaultValue:null,description:"",name:"erFarEllerMedmor",required:!0,type:{name:"boolean"}},registrerteArbeidsforhold:{defaultValue:null,description:"",name:"registrerteArbeidsforhold",required:!0,type:{name:"Arbeidsforhold[]"}},dekningsgrad:{defaultValue:null,description:"",name:"dekningsgrad",required:!0,type:{name:"enum",value:[{value:'"80"'},{value:'"100"'}]}},antallUkerUttaksplan:{defaultValue:null,description:"",name:"antallUkerUttaksplan",required:!0,type:{name:"number"}},annenForelder:{defaultValue:null,description:"",name:"annenForelder",required:!0,type:{name:"AnnenForelder"}},familiehendelsesdato:{defaultValue:null,description:"",name:"familiehendelsesdato",required:!0,type:{name:"Date"}},termindato:{defaultValue:null,description:"",name:"termindato",required:!0,type:{name:"Date | undefined"}},situasjon:{defaultValue:null,description:"",name:"situasjon",required:!0,type:{name:"enum",value:[{value:'"fødsel"'},{value:'"adopsjon"'},{value:'"omsorgsovertakelse"'}]}},erAleneOmOmsorg:{defaultValue:null,description:"",name:"erAleneOmOmsorg",required:!0,type:{name:"boolean"}},antallBarn:{defaultValue:null,description:"",name:"antallBarn",required:!0,type:{name:"number"}},ønskerJustertUttakVedFødsel:{defaultValue:null,description:"",name:"ønskerJustertUttakVedFødsel",required:!0,type:{name:"boolean | undefined"}},eksisterendeUttaksplan:{defaultValue:null,description:"",name:"eksisterendeUttaksplan",required:!1,type:{name:"Periode[]"}}}}}catch{}const ge=({søkerInfo:r,erEndringssøknad:t,sendSøknad:s,avbrytSøknad:i,mellomlagreSøknadOgNaviger:a})=>{const l=$("oppsummering"),o=k(),u=yr(),f=ir(),[h,F]=V.useState(!1),v=Or(),_=S(N(A.OM_BARNET)),y=S(N(A.ANNEN_FORELDER)),c=S(N(A.SØKER)),b=S(N(A.SØKERSITUASJON)),U=S(N(A.UTTAKSPLAN)),q=S(N(A.UTTAKSPLAN_METADATA)),W=N(A.UTENLANDSOPPHOLD),P=N(A.UTENLANDSOPPHOLD_SENERE),D=N(A.UTENLANDSOPPHOLD_TIDLIGERE),m=N(A.EKSISTERENDE_SAK),g=Xe(b.rolle),M=Qe(r.person,y,g,o),qe=er(g,c.erAleneOmOmsorg,y),je=K(he(_)),Pe=rr(_),De=t&&fe(y)&&y.harRettPåForeldrepengerINorge?n(o,"oppsummering.harGodkjentOppsummering.endringssøknadMedAnnenForelder",{navnAnnenForelder:y.fornavn}):"",Be=n(o,"oppsummering.harGodkjentOppsummering").concat(De),Me=async Le=>{Le.harGodkjentOppsummering&&(F(!0),await s(v),u(ur.SØKNAD_SENDT))};return e.jsx(Z.FormikWrapper,{initialValues:qr(),onSubmit:Me,renderForm:()=>e.jsx(Z.Form,{includeButtons:!1,children:e.jsxs(Je,{bannerTitle:n(o,"søknad.pageheading"),activeStepId:"oppsummering",pageTitle:n(o,"søknad.oppsummering"),onCancel:i,onContinueLater:f,steps:tr(o,t),children:[e.jsx(R,{padBottom:"l",children:e.jsxs("div",{className:l.block,children:[e.jsx(E,{title:"Deg",children:e.jsx(ne,{søkerinfo:r})}),!t&&e.jsx(E,{title:"Barnet",children:e.jsx(te,{barn:_,familiehendelsesdato:je})}),!t&&e.jsx(E,{title:"Den andre forelderen",children:e.jsx(ee,{annenForelder:y,søker:c,søkerrolle:b.rolle,barn:_,farMedmorErAleneOmOmsorg:qe})}),!t&&e.jsx(E,{title:"Utenlandsopphold",children:e.jsx(se,{utenlandsopphold:S(W),tidligereUtenlandsopphold:D==null?void 0:D.tidligereOpphold,senereUtenlandsopphold:P==null?void 0:P.senereOpphold,barn:_})}),!t&&e.jsx(E,{title:"Arbeidsforhold og andre inntektskilder",children:e.jsx(oe,{arbeidsforhold:r.arbeidsforhold,barn:_,søkersituasjon:b,søker:c})}),e.jsx(E,{title:n(o,"oppsummering.uttak"),children:e.jsx(ce,{perioder:U,navnPåForeldre:M,annenForelder:y,erFarEllerMedmor:g,registrerteArbeidsforhold:r.arbeidsforhold,dekningsgrad:q.dekningsgrad,antallUkerUttaksplan:q.antallUkerIUttaksplan,eksisterendeUttaksplan:m?m.uttaksplan:void 0,familiehendelsesdato:je,termindato:Pe,situasjon:b.situasjon,erAleneOmOmsorg:c.erAleneOmOmsorg,antallBarn:_.antallBarn,ønskerJustertUttakVedFødsel:q.ønskerJustertUttakVedFødsel})})]})}),e.jsx(R,{padBottom:"l",children:e.jsx(Z.ConfirmationCheckbox,{name:Se.harGodkjentOppsummering,label:Be,validate:Pr(o)})}),e.jsx(R,{margin:"l",padBottom:"l",children:e.jsxs($e,{lastStep:!0,children:[e.jsx(_r,{mellomlagreSøknadOgNaviger:a,route:t?nr("oppsummering"):sr("oppsummering")}),e.jsx(We,{icon:e.jsx(Ar,{"aria-hidden":!0}),iconPosition:"right",type:"submit",disabled:h,loading:h,children:e.jsx(O,{id:"oppsummering.sendInnSøknad"})})]})})]})})})},_t=ge;try{ge.displayName="Oppsummering",ge.__docgenInfo={description:"",displayName:"Oppsummering",props:{søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},erEndringssøknad:{defaultValue:null,description:"",name:"erEndringssøknad",required:!0,type:{name:"boolean"}},sendSøknad:{defaultValue:null,description:"",name:"sendSøknad",required:!0,type:{name:"(abortSignal: AbortSignal) => Promise<void>"}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}},avbrytSøknad:{defaultValue:null,description:"",name:"avbrytSøknad",required:!0,type:{name:"() => void"}}}}}catch{}export{_t as O};
