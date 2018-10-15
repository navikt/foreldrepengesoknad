import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Søker from '../../../../app/types/søknad/Søker';
import Block from 'common/components/block/Block';
import DisplayTextWithLabel from 'common/components/display-text-with-label/DisplayTextWithLabel';

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

    return (
        <DisplayTextWithLabel
            label={'Frilansarbeid siste 10 måneder'}
            text={'Jeg har ikke jobbet som frilanser de siste 10 månedene'}
        />
    );
};

const SelvstendigNæringsdrivendeOppsummering = ({ søker }: Props) => {
    const { harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd } = søker;

    if (harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        return <Block>Har jobbet som selvstendig næringsdrivende siste 10 mnd</Block>;
    }

    return (
        <DisplayTextWithLabel
            label={'Arbeid som selvstendig næringsdrivende siste 10 måneder'}
            text={'Jeg har ikke jobbet som selvstendig næringsdrivende de siste 10 månedene'}
        />
    );
};

const AndreInntekterOppsummering = ({ søker }: Props) => {
    const { harHattAnnenInntektSiste10Mnd } = søker;

    if (harHattAnnenInntektSiste10Mnd) {
        return <Block>Har hatt andre inntekter siste 10 mnd</Block>;
    }

    return (
        <DisplayTextWithLabel
            label={'Andre inntektskilder siste 10 måneder'}
            text={'Jeg har ikke hatt andre inntektskilder de siste 10 månedene'}
        />
    );
};

export default injectIntl(InntektOppsummering);
