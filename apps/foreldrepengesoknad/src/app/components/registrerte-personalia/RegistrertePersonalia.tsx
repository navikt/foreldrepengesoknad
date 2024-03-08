import { BabyWrappedIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Box, HStack, Label, VStack } from '@navikt/ds-react';

import { bemUtils, formaterNavn } from '@navikt/fp-common';
import { SøkerAnnenForelder, SøkerBarn } from '@navikt/fp-types';

import './registrertePersonalia.less';

interface Props {
    person: SøkerAnnenForelder | SøkerBarn;
    visEtternavn: boolean;
    fødselsnummerForVisning?: string;
    fødselsdatoForVisning?: string;
    altTekstHvisUkjentNavn?: string;
}

const RegistrertePersonalia: React.FunctionComponent<Props> = ({
    person,
    fødselsnummerForVisning,
    fødselsdatoForVisning,
    altTekstHvisUkjentNavn,
    visEtternavn,
}: Props) => {
    const bem = bemUtils('circle');
    return (
        <Box padding="4" background="surface-alt-3-subtle" borderRadius="medium">
            <HStack justify="space-between" align="start">
                <VStack gap="2" style={{ width: '85%' }}>
                    <Label>
                        {altTekstHvisUkjentNavn !== undefined
                            ? altTekstHvisUkjentNavn
                            : formaterNavn(person.fornavn, person.etternavn, visEtternavn, person.mellomnavn)}
                    </Label>
                    {fødselsnummerForVisning !== undefined && (
                        <BodyShort>
                            <FormattedMessage
                                id="registrertePersonalia.fødselsnummer"
                                values={{ fnr: fødselsnummerForVisning }}
                            />
                        </BodyShort>
                    )}
                    {!altTekstHvisUkjentNavn && fødselsdatoForVisning !== undefined && (
                        <BodyShort>
                            <FormattedMessage
                                id="registrertePersonalia.fødselsdato"
                                values={{ fødselsdato: fødselsdatoForVisning }}
                            />
                        </BodyShort>
                    )}
                </VStack>
                <div className={bem.block}>
                    <BabyWrappedIcon height={24} width={24} color="#005B82" />
                </div>
            </HStack>
        </Box>
    );
};

export default RegistrertePersonalia;
