import { BabyWrappedIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { SøkerAnnenForelder, SøkerBarn } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';

import { formaterNavn } from 'app/utils/personUtils';

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
    return (
        <>
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
        </>
    );
};

export default RegistrertePersonalia;
