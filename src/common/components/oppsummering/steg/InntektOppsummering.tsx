import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Søker from '../../../../app/types/søknad/Søker';
import Block from 'common/components/block/Block';
import DisplayTextWithLabel from 'common/components/display-text-with-label/DisplayTextWithLabel';
import { formatDate } from '../../../../app/util/dates/dates';
import DisplayContentWithLabel from 'common/components/display-content-with-label/DisplayContentWithLabel';
import { Element } from 'nav-frontend-typografi';
import FrilansoppdragOppsummeringsliste from 'common/components/oppsummering/oppsummeringsliste/FrilansoppdragOppsummeringsliste';
import SelvstendigNæringsdrivendeOppsummeringsliste from 'common/components/oppsummering/oppsummeringsliste/SelvstendigNæringsdrivendeOppsummeringsliste';

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
    const { frilansInformasjon, harJobbetSomFrilansSiste10Mnd } = søker;

    if (frilansInformasjon && harJobbetSomFrilansSiste10Mnd) {
        const {
            driverFosterhjem,
            jobberFremdelesSomFrilans,
            oppstart,
            harJobbetForNærVennEllerFamilieSiste10Mnd,
            oppdragForNæreVennerEllerFamilieSiste10Mnd
        } = frilansInformasjon;
        return (
            <>
                <DisplayTextWithLabel label={'Oppstartsdato som frilans'} text={formatDate(oppstart)} />
                <DisplayTextWithLabel
                    label={'Jeg jobber fremdeles som frilans'}
                    text={jobberFremdelesSomFrilans ? 'Ja' : 'Nei'}
                />
                <DisplayTextWithLabel label={'Jeg driver fosterhjem'} text={driverFosterhjem ? 'Ja' : 'Nei'} />
                <DisplayContentWithLabel label={'Frilansarbeid for nære venner elle familie de siste 10 månedene'}>
                    <Block visible={!harJobbetForNærVennEllerFamilieSiste10Mnd} margin={'none'}>
                        <Element>
                            Jeg har ikke jobbet som frilans for nære venner eller familie de siste 10 månedene
                        </Element>
                    </Block>
                    <Block visible={harJobbetForNærVennEllerFamilieSiste10Mnd} margin={'none'}>
                        <FrilansoppdragOppsummeringsliste frilansoppdrag={oppdragForNæreVennerEllerFamilieSiste10Mnd} />
                    </Block>
                </DisplayContentWithLabel>
            </>
        );
    }

    return (
        <DisplayTextWithLabel
            label={'Arbeid som frilans siste 10 måneder'}
            text={'Jeg har ikke jobbet som frilanser de siste 10 månedene'}
        />
    );
};

const SelvstendigNæringsdrivendeOppsummering = ({ søker }: Props) => {
    const { selvstendigNæringsdrivendeInformasjon, harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd } = søker;

    if (selvstendigNæringsdrivendeInformasjon && harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        return (
            <DisplayContentWithLabel label={'Arbeid som selvstendig næringsdrivende siste 10 måneder'}>
                <SelvstendigNæringsdrivendeOppsummeringsliste næringer={selvstendigNæringsdrivendeInformasjon} />
            </DisplayContentWithLabel>
        );
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
