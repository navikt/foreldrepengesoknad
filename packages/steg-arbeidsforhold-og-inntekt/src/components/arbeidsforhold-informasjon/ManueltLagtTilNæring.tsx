import { PersonEnvelopeIcon, TrashIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, Button, HStack, Heading, Label, Tag, VStack } from '@navikt/ds-react';

import { NæringDto } from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly, formatDate, getCountryName } from '@navikt/fp-utils';

import { useScrollIntoViewWhenAdded } from './useScrollIntoViewWhenAdded';

interface Props {
    egenNæring?: NæringDto;
    onRemove?: () => void;
}

const næringstypeTekst = (næringstype: NæringDto['næringstype']) => {
    switch (næringstype) {
        case 'FISKE':
            return <FormattedMessage id="SelvstendigNæringDrivende.næringstype.fiske" />;
        case 'DAGMAMMA':
            return <FormattedMessage id="SelvstendigNæringDrivende.næringstype.dagmamma" />;
        case 'JORDBRUK_SKOGBRUK':
            return <FormattedMessage id="SelvstendigNæringDrivende.næringstype.jordbrukSkogbruk" />;
        case 'ANNEN':
            return <FormattedMessage id="SelvstendigNæringDrivende.næringstype.annen" />;
        default:
            return undefined;
    }
};

export const ManueltLagtTilNæring = ({ egenNæring, onRemove }: Props) => {
    const intl = useIntl();
    const næringRef = useScrollIntoViewWhenAdded(egenNæring && onRemove ? 1 : 0);

    if (!egenNæring) {
        return null;
    }

    const navn = egenNæring.navnPåNæringen
        ? capitalizeFirstLetterInEveryWordOnly(egenNæring.navnPåNæringen)
        : intl.formatMessage({ id: 'inntektsinformasjon.egenNæring.label' });

    const næringstype = næringstypeTekst(egenNæring.næringstype);

    return (
        <Box
            ref={næringRef}
            padding="space-16"
            className="rounded-(--ax-radius-12) border border-ax-border-info-subtle bg-ax-bg-info-soft"
        >
            <VStack gap="space-16">
                <Heading size="xsmall" level="3">
                    {navn}
                </Heading>
                <Tag
                    className="inline-flex w-max items-center gap-0.5 px-1.5 py-0.5"
                    icon={<PersonEnvelopeIcon aria-hidden />}
                    variant="info"
                >
                    <FormattedMessage id="SelvstendigNæringDrivende.Tag" />
                </Tag>
                {næringstype && (
                    <HStack gap={{ md: 'space-8' }} justify={{ xs: 'space-between', md: 'start' }}>
                        <Label>
                            <FormattedMessage id="SelvstendigNæringDrivende.Næringstype" />
                        </Label>
                        <BodyShort className="text-ax-text-neutral-subtle" size="small">
                            {næringstype}
                        </BodyShort>
                    </HStack>
                )}
                {egenNæring.registrertINorge && egenNæring.organisasjonsnummer && (
                    <HStack gap={{ md: 'space-8' }} justify={{ xs: 'space-between', md: 'start' }}>
                        <Label>
                            <FormattedMessage id="SelvstendigNæringDrivende.OrgNummer" />
                        </Label>
                        <BodyShort className="text-ax-text-neutral-subtle" size="small">
                            {egenNæring.organisasjonsnummer}
                        </BodyShort>
                    </HStack>
                )}
                {!egenNæring.registrertINorge && egenNæring.registrertILand && (
                    <HStack gap={{ md: 'space-8' }} justify={{ xs: 'space-between', md: 'start' }}>
                        <Label>
                            <FormattedMessage id="SelvstendigNæringDrivende.Land" />
                        </Label>
                        <BodyShort className="text-ax-text-neutral-subtle" size="small">
                            {getCountryName(egenNæring.registrertILand, intl.locale)}
                        </BodyShort>
                    </HStack>
                )}
                <HStack gap={{ md: 'space-8' }} justify={{ xs: 'space-between', md: 'start' }}>
                    <Label>
                        <FormattedMessage id="SelvstendigNæringDrivende.Dato" />
                    </Label>
                    <BodyShort className="text-ax-text-neutral-subtle" size="small">
                        {formatDate(egenNæring.fom)} -{' '}
                        {egenNæring.tom
                            ? formatDate(egenNæring.tom)
                            : intl.formatMessage({ id: 'HarArbeidsforhold.pågående' })}
                    </BodyShort>
                </HStack>
                {onRemove && (
                    <Button
                        type="button"
                        size="small"
                        variant="tertiary"
                        data-color="danger"
                        icon={<TrashIcon aria-hidden />}
                        className="self-start"
                        aria-label={intl.formatMessage({ id: 'ManueltLagtTilNæring.FjernAriaLabel' }, { navn })}
                        onClick={onRemove}
                    >
                        <FormattedMessage id="ManueltLagtTilNæring.Fjern" />
                    </Button>
                )}
            </VStack>
        </Box>
    );
};
