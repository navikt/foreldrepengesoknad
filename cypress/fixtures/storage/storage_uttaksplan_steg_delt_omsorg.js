// prettier-ignore
module.exports = {
    søknad: {
        type: 'foreldrepenger',
        annenForelder: {
            kanIkkeOppgis: false,
            fornavn: 'Fnavn',
            etternavn: 'Enavn',
            fnr: '123',
            utenlandskFnr: true,
            bostedsland: 'FR',
            harRettPåForeldrepenger: true,
            erInformertOmSøknaden: true
        },
        barn: { erBarnetFødt: false, antallBarn: 1, termindato: new Date() },
        informasjonOmUtenlandsopphold: { tidligereOpphold: [], senereOpphold: [] },
        søker: { erAleneOmOmsorg: false, andreInntekterSiste10Mnd: [], rolle: 'MOR' },
        harGodkjentVilkår: true,
        harGodkjentOppsummering: false,
        ekstrainfo: {
            erEnkelEndringssøknad: false,
            uttaksplanSkjema: {
                startdatoPermisjon: new Date(),
                fellesperiodeukerMor: 8,
                forslagLaget: true
            },
            currentStegID: 'uttaksplan',
            søknadenGjelderBarnValg: { valgteBarn: [] }
        },
        tilleggsopplysninger: {},
        uttaksplan: [],
        erEndringssøknad: false,
        situasjon: 'fødsel',
        dekningsgrad: '100'
    },
    common: { språkkode: 'nb' }
}
