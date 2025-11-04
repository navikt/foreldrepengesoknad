import { BankNoteIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Heading, ReadMore, VStack } from '@navikt/ds-react';

import { Dekningsgrad, KontoBeregningDto_fpoversikt, KontoTypeUttak_fpoversikt, Satser } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

const getDagerForKonto = (
    stønadskontoer: KontoBeregningDto_fpoversikt,
    stønadskontoType: KontoTypeUttak_fpoversikt,
) => {
    const konto = stønadskontoer.kontoer.find((k) => k.konto === stønadskontoType);
    return konto ? konto.dager : 0;
};

const finnAntallUkerOgDager = (valgtStønadskonto: KontoBeregningDto_fpoversikt) => {
    const totaltAntallDagerFellesperiode = getDagerForKonto(valgtStønadskonto, 'FELLESPERIODE');
    const antallDagerForeldrepengerFørFødsel = getDagerForKonto(valgtStønadskonto, 'FORELDREPENGER_FØR_FØDSEL');
    const antallUkerMødrekvote = getDagerForKonto(valgtStønadskonto, 'MØDREKVOTE');
    const antallUkerFedrekvote = getDagerForKonto(valgtStønadskonto, 'FEDREKVOTE');

    const totaltAntallDager =
        totaltAntallDagerFellesperiode +
        antallDagerForeldrepengerFørFødsel +
        antallUkerMødrekvote +
        antallUkerFedrekvote;
    const uker = Math.floor(totaltAntallDager / 5);
    return {
        uker,
        dager: totaltAntallDager - uker * 5,
    };
};

const getDailyPayment = (monthlyWage: number) => (monthlyWage * 12) / 260;

interface Props {
    dekningsgrad: Dekningsgrad;
    gjennomsnittslønn: number;
    stønadskontoer: { '80': KontoBeregningDto_fpoversikt; '100': KontoBeregningDto_fpoversikt };
    satser: Satser;
}

export const Utbetalingspanel = ({ dekningsgrad, gjennomsnittslønn, stønadskontoer, satser }: Props) => {
    const antallUkerOgDagerMedUttak = finnAntallUkerOgDager(stønadskontoer[dekningsgrad]);

    const erDekningsgrad100 = dekningsgrad === '100';

    const grunnbeløpet = finnSisteGrunnbeløp(satser);
    const annualMax = 6 * grunnbeløpet;
    const monthlyMax = annualMax / 12;

    const decimal = (erDekningsgrad100 ? 100 : 80) / 100;
    const monthlyPayment = Math.round(Math.min(gjennomsnittslønn * decimal, monthlyMax * decimal));
    const dailyPayment = Math.round(getDailyPayment(monthlyPayment));

    const totalt = erDekningsgrad100 ? dailyPayment * 5 * 25 : dailyPayment * 5 * 30;

    return (
        <Infobox
            header={
                <FormattedMessage
                    id="OppsummeringSide.GjennomsnittligUtbetaling"
                    values={{
                        erDekningsgrad100,
                        antallUker: antallUkerOgDagerMedUttak.uker,
                        antallDager: antallUkerOgDagerMedUttak.dager,
                    }}
                />
            }
            headingLevel="2"
            icon={<BankNoteIcon aria-hidden />}
            useHorizontalDivider
            color="blue"
        >
            <VStack gap="space-16">
                <div>
                    <BodyShort size="small">
                        <FormattedMessage id="OppsummeringSide.MånedligFørSkatt" />
                    </BodyShort>
                    <Heading size="medium" as="p">
                        {formatCurrencyWithKr(monthlyPayment)}
                    </Heading>
                </div>
                <div>
                    <BodyShort size="small">
                        <FormattedMessage id="OppsummeringSide.DagligFørSkatt" />
                    </BodyShort>
                    <Heading size="medium" as="p">
                        {formatCurrencyWithKr(dailyPayment)}
                    </Heading>
                </div>
                <div>
                    <BodyShort size="small">
                        <FormattedMessage id="OppsummeringSide.Totalt" values={{ erDekningsgrad100 }} />
                    </BodyShort>
                    <Heading size="medium" as="p">
                        {formatCurrencyWithKr(totalt)}
                    </Heading>
                    <ReadMore
                        header={
                            <FormattedMessage id="OppsummeringSide.HvorforAntallUker" values={{ erDekningsgrad100 }} />
                        }
                    >
                        <FormattedMessage id="OppsummeringSide.AntallUkerInfo" values={{ erDekningsgrad100 }} />
                    </ReadMore>
                </div>
            </VStack>
        </Infobox>
    );
};
