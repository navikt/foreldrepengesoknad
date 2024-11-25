import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { barnehagestartDato } from 'steps/barnehageplass/BarnehageplassSteg';
import { OmBarnet } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erAlenesøker } from 'utils/HvemPlanleggerUtils';
import { Uttaksdata, findMonthsAndWeeksAndDaysBetween } from 'utils/uttakUtils';

import { BodyShort } from '@navikt/ds-react';

import { Infobox } from '@navikt/fp-ui';

interface Props {
    barnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
    uttaksdata100: Uttaksdata;
    uttaksdata80: Uttaksdata;
    valgtDekningsgrad: Dekningsgrad;
}

export const Barnehagestart = ({ barnet, hvemPlanlegger, uttaksdata100, uttaksdata80, valgtDekningsgrad }: Props) => {
    const intl = useIntl();
    const antallBarn = barnet.antallBarn;

    const sluttdatoSøker1 =
        valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? uttaksdata100.sluttdatoPeriode1
            : uttaksdata80.sluttdatoPeriode1;

    const sluttdatoSøker2 =
        valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? uttaksdata100.sluttdatoPeriode2
            : uttaksdata80.sluttdatoPeriode2;

    const sluttdato = sluttdatoSøker2 ?? sluttdatoSøker1;
    const barnehagestart = barnehagestartDato(barnet);

    const antallMånederOgUkerTilBarnehagestart =
        sluttdato && barnehagestart ? findMonthsAndWeeksAndDaysBetween(sluttdato, barnehagestart) : undefined;

    return (
        <Infobox
            header={
                antallMånederOgUkerTilBarnehagestart?.måneder === 0 &&
                antallMånederOgUkerTilBarnehagestart?.uker <= 0 ? (
                    <FormattedMessage id="HvorLangPeriodeSteg.Infoboks.Barnehageplass.AltDekket" />
                ) : (
                    <FormattedMessage
                        id="HvorLangPeriodeSteg.Infoboks.Barnehageplass.IkkeDekket"
                        values={{
                            måneder: antallMånederOgUkerTilBarnehagestart?.måneder,
                            uker: antallMånederOgUkerTilBarnehagestart?.uker,
                        }}
                    />
                )
            }
            icon={<CalendarIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            shouldFadeIn
            color="gray"
        >
            {antallMånederOgUkerTilBarnehagestart?.måneder === 0 && antallMånederOgUkerTilBarnehagestart?.uker <= 0 ? (
                <BodyShort>
                    <FormattedMessage
                        id="HvorLangPeriodeSteg.Infoboks.Barnehageplass.AltDekket.Tekst"
                        values={{
                            antallBarn,
                            erAlenesøker: erAlenesøker(hvemPlanlegger),
                            barnehagestartdato: intl.formatDate(barnehagestart, {
                                month: 'long',
                                year: 'numeric',
                            }),
                            uker: antallMånederOgUkerTilBarnehagestart?.dager,
                        }}
                    />
                </BodyShort>
            ) : (
                <BodyShort>
                    <FormattedMessage
                        id="HvorLangPeriodeSteg.Infoboks.Barnehageplass"
                        values={{
                            antallBarn,
                            erAlenesøker: erAlenesøker(hvemPlanlegger),
                            barnehagestartdato: intl.formatDate(barnehagestart, {
                                month: 'long',
                                year: 'numeric',
                            }),
                            måneder: antallMånederOgUkerTilBarnehagestart?.måneder,
                            uker: antallMånederOgUkerTilBarnehagestart?.uker,
                        }}
                    />
                </BodyShort>
            )}
        </Infobox>
    );
};
