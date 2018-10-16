import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Søker from '../../../../app/types/søknad/Søker';
import Block from 'common/components/block/Block';
import DisplayTextWithLabel from 'common/components/display-text-with-label/DisplayTextWithLabel';
import { formatDate } from '../../../../app/util/dates/dates';
import DisplayContentWithLabel from 'common/components/display-content-with-label/DisplayContentWithLabel';
import { Element } from 'nav-frontend-typografi';
import FrilansoppdragOppsummeringsliste from 'common/components/oppsummering/steg-oppsummeringslister/FrilansoppdragOppsummeringsliste';
import SelvstendigNæringsdrivendeOppsummeringsliste from 'common/components/oppsummering/steg-oppsummeringslister/SelvstendigNæringsdrivendeOppsummeringsliste';
import AndreInntekterOppsummeringsliste from 'common/components/oppsummering/steg-oppsummeringslister/AndreInntekterOppsummeringsliste';
import getMessage from 'common/util/i18nUtils';

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

const FrilansOppsummering = ({ søker, intl }: Props) => {
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
            <DisplayContentWithLabel label={getMessage(intl, 'oppsummering.frilans.tittel')}>
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.frilans.oppstartsdato')}
                    text={formatDate(oppstart)}
                />
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.frilans.fremdelesFrilans')}
                    text={jobberFremdelesSomFrilans ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.frilans.driverFosterhjem')}
                    text={driverFosterhjem ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
                <DisplayContentWithLabel
                    label={getMessage(intl, 'oppsummering.frilans.frilansArbeidForNæreVennerEllerFamilieSiste10Mnd')}>
                    <Block visible={!harJobbetForNærVennEllerFamilieSiste10Mnd} margin={'none'}>
                        <Element>
                            {getMessage(
                                intl,
                                'oppsummering.frilans.harIkkeUtførtFrilansArbeidForNæreVennerEllerFamilieSiste10Mnd'
                            )}
                        </Element>
                    </Block>
                    <Block visible={harJobbetForNærVennEllerFamilieSiste10Mnd} margin={'none'}>
                        <FrilansoppdragOppsummeringsliste frilansoppdrag={oppdragForNæreVennerEllerFamilieSiste10Mnd} />
                    </Block>
                </DisplayContentWithLabel>
            </DisplayContentWithLabel>
        );
    }

    return (
        <DisplayTextWithLabel
            label={getMessage(intl, 'oppsummering.frilans.tittel')}
            text={getMessage(intl, 'oppsummering.frilans.ikkeFrilans')}
        />
    );
};

const SelvstendigNæringsdrivendeOppsummering = ({ søker, intl }: Props) => {
    const { selvstendigNæringsdrivendeInformasjon, harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd } = søker;

    if (selvstendigNæringsdrivendeInformasjon && harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        return (
            <DisplayContentWithLabel label={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.tittel')}>
                <SelvstendigNæringsdrivendeOppsummeringsliste næringer={selvstendigNæringsdrivendeInformasjon} />
            </DisplayContentWithLabel>
        );
    }

    return (
        <DisplayTextWithLabel
            label={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.tittel')}
            text={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.ikkeSelvstendigNæringsdrivende')}
        />
    );
};

const AndreInntekterOppsummering = ({ søker, intl }: Props) => {
    const { harHattAnnenInntektSiste10Mnd, andreInntekterSiste10Mnd } = søker;

    if (andreInntekterSiste10Mnd && harHattAnnenInntektSiste10Mnd) {
        return (
            <DisplayContentWithLabel label={getMessage(intl, 'oppsummering.andreInntekter.tittel')}>
                <AndreInntekterOppsummeringsliste andreInntekter={andreInntekterSiste10Mnd} />
            </DisplayContentWithLabel>
        );
    }

    return (
        <DisplayTextWithLabel
            label={getMessage(intl, 'oppsummering.andreInntekter.tittel')}
            text={getMessage(intl, 'oppsummering.andreInntekter.ikkeHattAndreInntekter')}
        />
    );
};

export default injectIntl(InntektOppsummering);
