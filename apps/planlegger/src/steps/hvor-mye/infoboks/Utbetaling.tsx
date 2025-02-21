import { WalletIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Satser } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';
import { capitalizeFirstLetter, formatCurrencyWithKr } from '@navikt/fp-utils';

interface Props {
    satser: Satser;
    lønnSøker: number;
    fornavn: string;
}

export const Utbetaling = ({ satser, lønnSøker, fornavn }: Props) => {
    const locale = useIntl().locale;
    const grunnbeløpet = finnSisteGrunnbeløp(satser);
    const annualMax = 6 * grunnbeløpet;
    const monthlyMax = annualMax / 12;
    const dailyMax = monthlyMax / 21.67;

    const decimal80 = 80 / 100;

    const getMonthlyPayment = (lønn: number, decimal: number) => {
        if (isNaN(lønn)) return 0;
        return Math.round(Math.min(lønn, monthlyMax) * decimal);
    };

    const getDailyPayment = (lønn: number, decimal: number) => {
        if (isNaN(lønn)) return 0;
        return Math.round(Math.min((lønn * 12) / 260, dailyMax) * decimal);
    };

    return (
        <VStack gap="4">
            <Infobox
                header={
                    lønnSøker <= monthlyMax ? (
                        <FormattedMessage
                            id="HvorMyeSteg.VilFå"
                            values={{
                                hvem: capitalizeFirstLetter(fornavn),
                                utregning100: formatCurrencyWithKr(getDailyPayment(lønnSøker, 1), locale),
                                utregning80: formatCurrencyWithKr(getDailyPayment(lønnSøker, decimal80), locale),
                            }}
                        />
                    ) : (
                        <FormattedMessage
                            id="HvorMyeSteg.KanFå"
                            values={{
                                hvem: capitalizeFirstLetter(fornavn),
                                utregning100: formatCurrencyWithKr(getDailyPayment(lønnSøker, 1), locale),
                                utregning80: formatCurrencyWithKr(getDailyPayment(lønnSøker, decimal80), locale),
                            }}
                        />
                    )
                }
                color="green"
                icon={<WalletIcon height={24} width={24} color="#7F8900" fontSize="1.5rem" aria-hidden />}
            >
                <VStack gap="2">
                    <BodyShort>
                        <FormattedMessage
                            id="HvorMyeSteg.Utregning"
                            values={{
                                utregning100: formatCurrencyWithKr(getMonthlyPayment(lønnSøker, 1), locale),
                                utregning80: formatCurrencyWithKr(getMonthlyPayment(lønnSøker, decimal80), locale),
                            }}
                        />
                    </BodyShort>
                    {lønnSøker > monthlyMax && (
                        <>
                            <BodyShort>
                                <FormattedMessage
                                    id="HvorMyeSteg.NAVDekker"
                                    values={{
                                        grunnbeløpet: formatCurrencyWithKr(grunnbeløpet * 6, locale),
                                        a: (msg: any) => (
                                            <Link
                                                href={links.grunnbeløpet}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="lenke"
                                                inlineText
                                            >
                                                {msg}
                                            </Link>
                                        ),
                                    }}
                                />
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage
                                    id="HvorMyeSteg.BasertPåInntekt"
                                    values={{
                                        hvem: fornavn,
                                    }}
                                />
                            </BodyShort>
                        </>
                    )}
                </VStack>
            </Infobox>
        </VStack>
    );
};
