import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import Block from 'common/components/block/Block';

interface Props {
    etternavn: string;
    fornavn: string;
    fnr: string;
}

const TerminOppsummering: FunctionComponent<Props> = ({ fornavn, etternavn, fnr }) => {
    return (
        <>
            <Block margin="xxs">
                <FormattedMessage
                    id="oppsummering.termin.personalia.navn"
                    values={{
                        navn: `${fornavn} ${etternavn}`,
                    }}
                />
            </Block>
            <Block margin="xxs">
                <FormattedMessage
                    id="oppsummering.termin.personalia.fnr"
                    values={{
                        fnr,
                    }}
                />
            </Block>
        </>
    );
};

export default TerminOppsummering;
