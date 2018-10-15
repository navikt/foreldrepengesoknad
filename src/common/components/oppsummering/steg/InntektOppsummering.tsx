import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Søker from '../../../../app/types/søknad/Søker';
import Block from 'common/components/block/Block';

interface InntektOppsummeringProps {
    søker: Søker;
}

type Props = InntektOppsummeringProps & InjectedIntlProps;

const InntektOppsummering = ({ søker, intl }: Props) => {
    return (
        <>
            <FrilansOppsummering søker={søker} intl={intl} />
            <SelvstendigNæringsdrivendeOppsummering søker={søker} intl={intl} />
            <AndreInntekterOppsummering søker={søker} intl={intl} />
        </>
    );
};

const FrilansOppsummering = ({ søker }: Props) => {
    const { harJobbetSomFrilansSiste10Mnd } = søker;

    if (harJobbetSomFrilansSiste10Mnd) {
        return <Block>Har jobbet som frilans siste 10 mnd</Block>;
    }

    return <Block>Har ikke jobbet som frilans siste 10 mnd</Block>;
};

const SelvstendigNæringsdrivendeOppsummering = ({ søker }: Props) => {
    const { harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd } = søker;

    if (harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        return <Block>Har jobbet som selvstendig næringsdrivende siste 10 mnd</Block>;
    }

    return <Block>Har ikke jobbet som selvstendig næringsdrivende siste 10 mnd</Block>;
};

const AndreInntekterOppsummering = ({ søker }: Props) => {
    const { harHattAnnenInntektSiste10Mnd } = søker;

    if (harHattAnnenInntektSiste10Mnd) {
        return <Block>Har hatt andre inntekter siste 10 mnd</Block>;
    }

    return <Block>Har ikke ikke hatt andre inntekter siste 10 mnd</Block>;
};

export default injectIntl(InntektOppsummering);
