import * as React from 'react';
import { RegistrertBarn } from 'app/types/Person';
import RegistrertePersonalia from 'app/components/registrerte-personalia/RegistrertePersonalia';
import { Block } from '@navikt/fp-common';
import { dateToISOString } from '@navikt/sif-common-formik/lib';

interface Props {
    valgteBarn: RegistrertBarn[];
}

const sorterRegistrerteBarn = (b1: RegistrertBarn, b2: RegistrertBarn): number => {
    if (b1.fornavn === b2.fornavn) {
        return 0;
    }
    return b1.fornavn < b2.fornavn ? -1 : 1;
};

const ValgteRegistrerteBarn: React.FunctionComponent<Props> = ({ valgteBarn }: Props) => {
    const sorterteRegistrerteBarn = valgteBarn.sort(sorterRegistrerteBarn);
    return (
        <div>
            {sorterteRegistrerteBarn.map((valgtBarn: RegistrertBarn, index: number) => (
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
