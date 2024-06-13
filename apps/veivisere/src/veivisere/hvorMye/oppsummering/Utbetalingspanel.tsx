import { BankNoteIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Heading, ReadMore, VStack } from '@navikt/ds-react';

import { Dekningsgrad } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

//FIXME Hent frå tjeneste
export const GRUNNBELØPET = 118620;

export const getDailyPayment = (monthlyWage: number) => (monthlyWage * 12) / 260;

interface Props {
    dekningsgrad: Dekningsgrad;
    gjennomsnittslønn: number;
}

const Utbetalingspanel: React.FunctionComponent<Props> = ({ dekningsgrad, gjennomsnittslønn }) => {
    const erDekningsgrad100 = dekningsgrad === Dekningsgrad.HUNDRE_PROSENT;

    const annualMax = 6 * GRUNNBELØPET;
    const monthlyMax = annualMax / 12;

    const decimal = (erDekningsgrad100 ? 100 : 80) / 100;
    const monthlyPayment = Math.round(Math.min(gjennomsnittslønn * decimal, monthlyMax * decimal));
    const dailyPayment = Math.round(getDailyPayment(monthlyPayment));

    const totalt = erDekningsgrad100 ? dailyPayment * 5 * 25 : dailyPayment * 5 * 30;

    return (
        <Infobox
            header={
                erDekningsgrad100 ? (
                    <FormattedMessage id="OppsummeringSide.GjennomsnittligUtbetaling100" />
                ) : (
                    <FormattedMessage id="OppsummeringSide.GjennomsnittligUtbetaling80" />
                )
            }
            icon={<BankNoteIcon aria-hidden />}
            useHorizontalDivider
        >
            <VStack gap="4">
                <div>
                    <BodyShort>
                        <FormattedMessage id="OppsummeringSide.MånedligFørSkatt" />
                    </BodyShort>
                    <Heading size="large">{formatCurrencyWithKr(monthlyPayment)}</Heading>
                </div>
                <div>
                    <BodyShort>
                        <FormattedMessage id="OppsummeringSide.DagligFørSkatt" />
                    </BodyShort>
                    <Heading size="large">{formatCurrencyWithKr(dailyPayment)}</Heading>
                </div>
                <div>
                    <BodyShort>
                        <FormattedMessage id="OppsummeringSide.Totalt" values={{ erDekningsgrad100 }} />
                    </BodyShort>
                    <Heading size="large">{formatCurrencyWithKr(totalt)}</Heading>
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
