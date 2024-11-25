import { WalletIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Satser } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';
import { capitalizeFirstLetter, formatCurrency } from '@navikt/fp-utils';

interface Props {
    satser: Satser;
    lønnSøker: number;
    fornavn: string;
}

export const Utbetaling = ({ satser, lønnSøker, fornavn }: Props) => {
    const grunnbeløpet = finnSisteGrunnbeløp(satser);
    const annualMax = 6 * grunnbeløpet;
    const monthlyMax = annualMax / 12;
    const dailyMax = monthlyMax / 21.67;

    const decimal80 = 80 / 100;

    const getMonthlyPayment = (lønn: number, decimal: number) => Math.round(Math.min(lønn, monthlyMax) * decimal);
    const getDailyPayment = (lønn: number, decimal: number) =>
        Math.round(Math.min((lønn * 12) / 260, dailyMax) * decimal);

    return (
        <VStack gap="4">
            <Infobox
                header={
                    lønnSøker <= monthlyMax ? (
                        <FormattedMessage
                            id="HvorMyeSteg.VilFå"
                            values={{
                                hvem: capitalizeFirstLetter(fornavn),
                                utregning100: formatCurrency(getDailyPayment(lønnSøker, 1)),
                                utregning80: formatCurrency(getDailyPayment(lønnSøker, decimal80)),
                            }}
                        />
                    ) : (
                        <FormattedMessage
                            id="HvorMyeSteg.KanFå"
                            values={{
                                hvem: capitalizeFirstLetter(fornavn),
                                utregning100: formatCurrency(getDailyPayment(lønnSøker, 1)),
                                utregning80: formatCurrency(getDailyPayment(lønnSøker, decimal80)),
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
                                utregning100: formatCurrency(getMonthlyPayment(lønnSøker, 1)),
                                utregning80: formatCurrency(getMonthlyPayment(lønnSøker, decimal80)),
                            }}
                        />
                    </BodyShort>
                    {lønnSøker > monthlyMax && (
                        <>
                            <BodyShort>
                                <FormattedMessage
                                    id="HvorMyeSteg.NAVDekker"
                                    values={{
                                        grunnbeløpet: formatCurrency(grunnbeløpet * 6),
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
