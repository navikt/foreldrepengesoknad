import { BankNoteIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { finnGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Heading, ReadMore, VStack } from '@navikt/ds-react';

import { StønadskontoType } from '@navikt/fp-constants';
import {
    Dekningsgrad,
    Satser,
    TilgjengeligeStønadskontoer,
    TilgjengeligeStønadskontoerForDekningsgrad,
} from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

const getDagerForKonto = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    stønadskontoType: StønadskontoType,
) => {
    const konto = stønadskontoer.kontoer.find((k) => k.konto === stønadskontoType);
    return konto ? konto.dager / 5 : 0;
};

const finnAntallUker = (valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad) => {
    const totaltAntallUkerFellesperiode = getDagerForKonto(valgtStønadskonto, StønadskontoType.Fellesperiode);
    const antallUkerForeldrepengerFørFødsel = getDagerForKonto(
        valgtStønadskonto,
        StønadskontoType.ForeldrepengerFørFødsel,
    );
    const antallUkerMødrekvote = getDagerForKonto(valgtStønadskonto, StønadskontoType.Mødrekvote);
    const antallUkerFedrekvote = getDagerForKonto(valgtStønadskonto, StønadskontoType.Fedrekvote);
    return (
        totaltAntallUkerFellesperiode + antallUkerForeldrepengerFørFødsel + antallUkerMødrekvote + antallUkerFedrekvote
    );
};

export const getDailyPayment = (monthlyWage: number) => (monthlyWage * 12) / 260;

interface Props {
    dekningsgrad: Dekningsgrad;
    gjennomsnittslønn: number;
    stønadskontoer: TilgjengeligeStønadskontoer;
    satser: Satser;
}

const Utbetalingspanel: React.FunctionComponent<Props> = ({
    dekningsgrad,
    gjennomsnittslønn,
    stønadskontoer,
    satser,
}) => {
    const antallUkerMedUttak = finnAntallUker(stønadskontoer[dekningsgrad]);

    const erDekningsgrad100 = dekningsgrad === Dekningsgrad.HUNDRE_PROSENT;

    const grunnbeløpet = finnGrunnbeløp(satser, dayjs());
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
                    values={{ erDekningsgrad100, antallUker: antallUkerMedUttak }}
                />
            }
            icon={<BankNoteIcon aria-hidden />}
            useHorizontalDivider
            color="blue"
        >
            <VStack gap="4">
                <div>
                    <BodyShort size="small">
                        <FormattedMessage id="OppsummeringSide.MånedligFørSkatt" />
                    </BodyShort>
                    <Heading size="medium">{formatCurrencyWithKr(monthlyPayment)}</Heading>
                </div>
                <div>
                    <BodyShort size="small">
                        <FormattedMessage id="OppsummeringSide.DagligFørSkatt" />
                    </BodyShort>
                    <Heading size="medium">{formatCurrencyWithKr(dailyPayment)}</Heading>
                </div>
                <div>
                    <BodyShort size="small">
                        <FormattedMessage id="OppsummeringSide.Totalt" values={{ erDekningsgrad100 }} />
                    </BodyShort>
                    <Heading size="medium">{formatCurrencyWithKr(totalt)}</Heading>
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

export default Utbetalingspanel;
