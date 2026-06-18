import { FormattedMessage } from 'react-intl';

import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';

import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';

import { type AndreInntektskilder, AnnenInntektType } from '../../types/AndreInntektskilder';

interface Props {
    andreInntektskilder: AndreInntektskilder[];
}

const getTittelId = (type: AnnenInntektType) => {
    switch (type) {
        case AnnenInntektType.JOBB_I_UTLANDET:
            return 'AndreInntektskilderStep.RadioButton.Utlandet';
        case AnnenInntektType.SLUTTPAKKE:
            return 'AndreInntektskilderStep.RadioButton.Etterlønn';
        case AnnenInntektType.MILITÆRTJENESTE:
            return 'AndreInntektskilderStep.RadioButton.Førstegangstjeneste';
    }
};

export const AndreInntektskilderBox = ({ andreInntektskilder }: Props) => {
    if (andreInntektskilder.length === 0) {
        return null;
    }

    return (
        <VStack gap="space-8">
            {andreInntektskilder.map((inntekt) => (
                <Box
                    key={`${inntekt.type}-${inntekt.fom}-${'tom' in inntekt ? (inntekt.tom ?? '') : ''}`}
                    padding="space-16"
                    background="brand-blue-moderate"
                    borderRadius="4"
                >
                    <VStack gap="space-16">
                        <Heading size="xsmall">
                            <FormattedMessage id={getTittelId(inntekt.type)} />
                        </Heading>
                        {inntekt.type === AnnenInntektType.JOBB_I_UTLANDET && (
                            <>
                                <BodyShort>
                                    <FormattedMessage id="JobbIUtlandetPanel.LandDuHarJobbet" />
                                </BodyShort>
                                <BodyShort>{inntekt.land}</BodyShort>
                                <BodyShort>
                                    <FormattedMessage id="JobbIUtlandetPanel.NavnPåArbeidsgiver" />
                                </BodyShort>
                                <BodyShort>{capitalizeFirstLetterInEveryWordOnly(inntekt.arbeidsgiverNavn)}</BodyShort>
                                {!inntekt.tom && (
                                    <BodyShort>
                                        <FormattedMessage id="JobbIUtlandetPanel.JobberDuDerNå" />
                                    </BodyShort>
                                )}
                                {!inntekt.tom && (
                                    <BodyShort>
                                        <FormattedMessage id="pågående" />
                                    </BodyShort>
                                )}
                                <BodyShort>
                                    <FormattedMessage id="JobbIUtlandetPanel.Fom" />
                                </BodyShort>
                                <BodyShort>{formatDate(inntekt.fom)}</BodyShort>
                                {inntekt.tom && (
                                    <>
                                        <BodyShort>
                                            <FormattedMessage id="JobbIUtlandetPanel.Tom" />
                                        </BodyShort>
                                        <BodyShort>{formatDate(inntekt.tom)}</BodyShort>
                                    </>
                                )}
                            </>
                        )}
                        {inntekt.type === AnnenInntektType.SLUTTPAKKE && (
                            <>
                                <BodyShort>
                                    <FormattedMessage id="EtterlønnEllerSluttvederlagPanel.Fom" />
                                </BodyShort>
                                <BodyShort>{formatDate(inntekt.fom)}</BodyShort>
                                <BodyShort>
                                    <FormattedMessage id="EtterlønnEllerSluttvederlagPanel.Tom" />
                                </BodyShort>
                                <BodyShort>{formatDate(inntekt.tom)}</BodyShort>
                            </>
                        )}
                        {inntekt.type === AnnenInntektType.MILITÆRTJENESTE && (
                            <>
                                {inntekt.pågående && (
                                    <>
                                        <BodyShort>
                                            <FormattedMessage id="FørstegangstjenestePanel.IFørstegangstjenesteNå" />
                                        </BodyShort>
                                        <BodyShort>
                                            <FormattedMessage id="FørstegangstjenestePanel.RadioButton.Ja" />
                                        </BodyShort>
                                    </>
                                )}
                                <BodyShort>
                                    <FormattedMessage id="FørstegangstjenestePanel.Fom" />
                                </BodyShort>
                                <BodyShort>{formatDate(inntekt.fom)}</BodyShort>
                                {inntekt.tom && (
                                    <>
                                        <BodyShort>
                                            <FormattedMessage id="FørstegangstjenestePanel.Tom" />
                                        </BodyShort>
                                        <BodyShort>{formatDate(inntekt.tom)}</BodyShort>
                                    </>
                                )}
                            </>
                        )}
                    </VStack>
                </Box>
            ))}
        </VStack>
    );
};
