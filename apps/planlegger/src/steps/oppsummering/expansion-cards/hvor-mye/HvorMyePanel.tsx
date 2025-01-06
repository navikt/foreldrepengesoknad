import { WalletIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { erAlenesøker as erAlene } from 'utils/HvemPlanleggerUtils';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyLong, HStack, Heading, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Satser } from '@navikt/fp-types';
import { BluePanel, IconCircleWrapper } from '@navikt/fp-ui';
import { capitalizeFirstLetter, formatCurrencyWithKr } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

interface Props {
    satser: Satser;
    lønnSøker: number;
    fornavn: string;
}

export const HvorMyePanel = ({ satser, lønnSøker, fornavn }: Props) => {
    const locale = useIntl().locale;
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const erAlenesøker = erAlene(hvemPlanlegger);
    const grunnbeløpet = finnSisteGrunnbeløp(satser);
    const annualMax = 6 * grunnbeløpet;
    const monthlyMax = annualMax / 12;
    const dailyMax = monthlyMax / 21.67;

    const decimal80 = 80 / 100;

    const getMonthlyPayment = (lønn: number, decimal: number) => Math.round(Math.min(lønn, monthlyMax) * decimal);
    const getDailyPayment = (lønn: number, decimal: number) =>
        Math.round(Math.min((lønn * 12) / 260, dailyMax) * decimal);

    return (
        <VStack gap="10">
            <BluePanel>
                <VStack gap="2">
                    <HStack justify="space-between" wrap={false}>
                        <Heading size="xsmall" level="4" spacing>
                            <FormattedMessage
                                id="HvorMyeOppsummering.DuVilFå"
                                values={{
                                    hvem: capitalizeFirstLetter(fornavn),
                                    erAlenesøker,
                                    utbetaling100: formatCurrencyWithKr(getDailyPayment(lønnSøker, 1), locale),
                                    utbetaling80: formatCurrencyWithKr(getDailyPayment(lønnSøker, decimal80), locale),
                                }}
                            />
                        </Heading>
                        <IconCircleWrapper size="medium" color="blue">
                            <WalletIcon height={24} width={24} color="#236B7D" fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                    </HStack>

                    <BodyLong>
                        <FormattedMessage
                            id="HvorMyeOppsummering.DetteBlir"
                            values={{
                                utbetaling100: formatCurrencyWithKr(getMonthlyPayment(lønnSøker, 1), locale),
                                utbetaling80: formatCurrencyWithKr(getMonthlyPayment(lønnSøker, decimal80), locale),
                            }}
                        />
                    </BodyLong>
                    {lønnSøker >= monthlyMax && (
                        <>
                            <BodyLong>
                                <FormattedMessage
                                    id="HvorMyeOppsummering.NAVDekker"
                                    values={{
                                        maksInntekt: formatCurrencyWithKr(annualMax, locale),
                                        a: (msg: any) => (
                                            <a
                                                href={links.grunnbeløpet}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="lenke"
                                            >
                                                {msg}
                                            </a>
                                        ),
                                    }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <FormattedMessage
                                    id="HvorMyeOppsummering.BasertPå"
                                    values={{
                                        hvem: fornavn,
                                        erAlenesøker,
                                    }}
                                />
                            </BodyLong>
                        </>
                    )}

                    <BodyLong>
                        <FormattedMessage
                            id="HvorMyeOppsummering.DetteErBasertPå"
                            values={{
                                erAlenesøker,
                                hvem: fornavn,
                                inntekt: formatCurrencyWithKr(getMonthlyPayment(lønnSøker, 1), locale),
                            }}
                        />
                    </BodyLong>
                </VStack>
            </BluePanel>
        </VStack>
    );
};
