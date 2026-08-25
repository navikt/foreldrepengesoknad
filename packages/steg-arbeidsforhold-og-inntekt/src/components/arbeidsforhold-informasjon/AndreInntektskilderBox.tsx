import { BankNoteIcon, TrashIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, Button, HStack, Heading, Label, Tag, VStack } from '@navikt/ds-react';

import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';

import { type AndreInntektskilder } from '../../types/AndreInntektskilder';
import { useScrollIntoViewWhenAdded } from './useScrollIntoViewWhenAdded';

interface Props {
    andreInntektskilder: AndreInntektskilder[];
    onRemove: (index: number) => void;
}

const getTittel = (intl: ReturnType<typeof useIntl>, type: AndreInntektskilder['type']) => {
    switch (type) {
        case 'JOBB_I_UTLANDET':
            return intl.formatMessage({ id: 'AndreInntektskilderStep.RadioButton.Utlandet' });
        case 'ETTERLØNN_SLUTTPAKKE':
            return intl.formatMessage({ id: 'AndreInntektskilderStep.RadioButton.Etterlønn' });
        case 'MILITÆR_ELLER_SIVILTJENESTE':
            return intl.formatMessage({ id: 'AndreInntektskilderStep.RadioButton.Førstegangstjeneste' });
    }
};

const DetaljRad = ({ label, children }: { label: React.ReactNode; children: React.ReactNode }) => (
    <HStack justify="space-between">
        <Label>{label}</Label>
        <BodyShort className="text-ax-text-neutral-subtle" size="small">
            {children}
        </BodyShort>
    </HStack>
);

const Inntektsdetaljer = ({ inntekt }: { inntekt: AndreInntektskilder }) => {
    const intl = useIntl();

    return (
        <>
            {inntekt.type === 'JOBB_I_UTLANDET' && (
                <>
                    <DetaljRad label={<FormattedMessage id="JobbIUtlandetPanel.LandDuHarJobbet" />}>
                        {inntekt.land}
                    </DetaljRad>
                    <DetaljRad label={<FormattedMessage id="JobbIUtlandetPanel.NavnPåArbeidsgiver" />}>
                        {capitalizeFirstLetterInEveryWordOnly(inntekt.arbeidsgiverNavn)}
                    </DetaljRad>
                </>
            )}
            <DetaljRad label="Dato:">
                <FormattedMessage
                    id="inntektsinformasjon.arbeidsforhold.periode"
                    values={{
                        fom: formatDate(inntekt.fom),
                        tom: inntekt.tom
                            ? formatDate(inntekt.tom)
                            : intl.formatMessage({ id: 'HarArbeidsforhold.pågående' }),
                    }}
                />
            </DetaljRad>
        </>
    );
};

export const AndreInntektskilderBox = ({ andreInntektskilder, onRemove }: Props) => {
    const intl = useIntl();
    const nyesteInntektRef = useScrollIntoViewWhenAdded(andreInntektskilder.length);

    if (andreInntektskilder.length === 0) {
        return null;
    }

    return (
        <VStack gap="space-8">
            {andreInntektskilder.map((inntekt, index) => (
                <Box
                    key={`${inntekt.type}-${inntekt.fom}-${inntekt.tom ?? ''}`}
                    ref={index === andreInntektskilder.length - 1 ? nyesteInntektRef : undefined}
                    padding="space-16"
                    className="rounded-(--ax-radius-12) border border-ax-border-info-subtle bg-ax-bg-info-soft"
                >
                    <VStack gap="space-16">
                        <Heading size="xsmall" level="3">
                            {getTittel(intl, inntekt.type)}
                        </Heading>
                        <Tag
                            className="inline-flex w-max items-center gap-0.5 px-1.5 py-0.5"
                            icon={<BankNoteIcon aria-hidden />}
                            variant="info"
                        >
                            Annen inntekt
                        </Tag>
                        <Inntektsdetaljer inntekt={inntekt} />
                        <Button
                            type="button"
                            size="small"
                            variant="tertiary"
                            data-color="danger"
                            icon={<TrashIcon aria-hidden />}
                            className="self-start"
                            aria-label={`Fjern ${getTittel(intl, inntekt.type)}`}
                            onClick={() => onRemove(index)}
                        >
                            Fjern
                        </Button>
                    </VStack>
                </Box>
            ))}
        </VStack>
    );
};
