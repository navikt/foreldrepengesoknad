import { BabyWrappedIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { formaterNavn } from 'utils/personUtils';

import { BodyShort } from '@navikt/ds-react';

import { AnnenForelderFrontend, BarnDto_fpoversikt } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';

interface Props {
    person: AnnenForelderFrontend | BarnDto_fpoversikt;
    visEtternavn: boolean;
    fødselsnummerForVisning?: string;
    fødselsdatoForVisning?: string;
    altTekstHvisUkjentNavn?: string;
}

export const RegistrertePersonalia = ({
    person,
    fødselsnummerForVisning,
    fødselsdatoForVisning,
    altTekstHvisUkjentNavn,
    visEtternavn,
}: Props) => {
    return (
        <Infobox
            color="blue"
            header={
                <>
                    {altTekstHvisUkjentNavn ??
                        formaterNavn(person.fornavn, person.etternavn, visEtternavn, person.mellomnavn)}
                </>
            }
            icon={<BabyWrappedIcon height={24} width={24} color="#005B82" />}
        >
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
        </Infobox>
    );
};
