import { IntlShape } from 'react-intl';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from '../utils/types/regelTypes';
import { isUttakAnnenPart } from 'uttaksplan/types/Periode';
import { Periodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { getPeriodeForelderNavn, getPeriodeTittel } from 'uttaksplan/utils/periodeUtils';
import { getNavnGenitivEierform } from 'app/utils/personUtils';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

export const overlapperPeriodeAndrePerioder: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const { perioder, navnPåForeldre } = grunnlag;
    const perioderUtenUttakAnnenPart = perioder.filter((p) => !isUttakAnnenPart(p));
    const perioderSomHarOverlapp = perioderUtenUttakAnnenPart.filter(
        (periode) => Periodene(perioderUtenUttakAnnenPart).finnOverlappendePerioder(periode).length > 0,
    );

    const passerer = perioderSomHarOverlapp.length === 0;
    return {
        passerer,
        info: perioderSomHarOverlapp.map((periode) => {
            const info: RegelTestresultatInfo = {
                periodeId: periode.id,
                intlKey: 'uttaksplan.validering.feil.periodeoverlapp.oppsummering',
                renderAsHtml: true,
                values: {
                    periode: (intl: IntlShape) =>
                        getPeriodeTittel(
                            intl,
                            periode,
                            navnPåForeldre,
                            grunnlag.familiehendelsesdato,
                            grunnlag.termindato,
                            grunnlag.søkersituasjon.situasjon,
                        ),
                    tidsperiode: (intl: IntlShape) => Tidsperioden(periode.tidsperiode).formaterStringKort(intl),
                    forelder: (intl: IntlShape) =>
                        getNavnGenitivEierform(getPeriodeForelderNavn(periode, navnPåForeldre), intl.locale),
                },
            };
            return info;
        }),
    };
};
