import * as React from 'react';
import { RegistrertBarn } from 'app/types/Person';
import RegistrertePersonalia from 'app/components/registrerte-personalia/RegistrertePersonalia';
import { Block } from '@navikt/fp-common';
import { dateToISOString } from '@navikt/sif-common-formik/lib';

interface Props {
    valgteBarn: RegistrertBarn[];
}

const ValgteRegistrerteBarn: React.FunctionComponent<Props> = ({ valgteBarn }: Props) => {
    return (
        <div>
            {valgteBarn.map((valgtBarn: RegistrertBarn, index: number) => (
                <Block padBottom="l" key={index}>
                    <RegistrertePersonalia
                        person={valgtBarn}
                        fødselsdatoForVisning={dateToISOString(valgtBarn.fødselsdato)}
                    />
                </Block>
            ))}
        </div>
    );
};

export default ValgteRegistrerteBarn;
