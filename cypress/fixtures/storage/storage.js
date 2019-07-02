// prettier-ignore
module.exports = {    
    søknad: {
        type: "foreldrepenger",
        annenForelder: {
            kanIkkeOppgis: true
        },
        barn: {
            erBarnetFødt: false,
            antallBarn: 1,
            termindato: new Date(),
        },
        informasjonOmUtenlandsopphold: {
            tidligereOpphold: [],
            senereOpphold: [],
        },
        søker: {
            andreInntekterSiste10Mnd: [],
            rolle: "MOR",
        },
        harGodkjentVilkår: true,
        harGodkjentOppsummering: false,
        ekstrainfo: {
            erEnkelEndringssøknad: false,
            uttaksplanSkjema: { 
                startdatoPermisjon: new Date(),
                fellesperiodeukerMor: 0,
                forslagLaget: true,
            },
            currentStegID: "uttaksplan",
            søknadenGjelderBarnValg: {
                valgteBarn: [],
            }
        },
        tilleggsopplysninger: {},
        uttaksplan: [],
        erEndringssøknad: false,
        situasjon: "fødsel",
        dekningsgrad: "100",
    },
    common: {
        språkkode: "nb"
    }
}
