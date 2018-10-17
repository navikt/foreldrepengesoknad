import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Søker from '../../../../app/types/søknad/Søker';
import Block from 'common/components/block/Block';
import { formatDate } from '../../../../app/util/dates/dates';
import { Element } from 'nav-frontend-typografi';
import FrilansoppdragOppsummeringsliste from 'common/components/oppsummering/steg-oppsummeringslister/FrilansoppdragOppsummeringsliste';
import SelvstendigNæringsdrivendeOppsummeringsliste from 'common/components/oppsummering/steg-oppsummeringslister/SelvstendigNæringsdrivendeOppsummeringsliste';
import AndreInntekterOppsummeringsliste from 'common/components/oppsummering/steg-oppsummeringslister/AndreInntekterOppsummeringsliste';
import getMessage from 'common/util/i18nUtils';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import KompleksFeltoppsummering from 'common/components/kompleks-feltoppsummering/KompleksFeltoppsummering';

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
            <Oppsummeringsseksjon ingress={getMessage(intl, 'oppsummering.frilans.tittel')}>
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.frilans.oppstartsdato')}
                    verdi={formatDate(oppstart)}
                />
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.frilans.fremdelesFrilans')}
                    verdi={jobberFremdelesSomFrilans ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.frilans.driverFosterhjem')}
                    verdi={driverFosterhjem ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
                <KompleksFeltoppsummering
                    ledetekst={getMessage(
                        intl,
                        'oppsummering.frilans.frilansArbeidForNæreVennerEllerFamilieSiste10Mnd'
                    )}>
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
                </KompleksFeltoppsummering>
            </Oppsummeringsseksjon>
        );
    }

    return (
        <Feltoppsummering
            feltnavn={getMessage(intl, 'oppsummering.frilans.tittel')}
            verdi={getMessage(intl, 'oppsummering.frilans.ikkeFrilans')}
        />
    );
};

const SelvstendigNæringsdrivendeOppsummering = ({ søker, intl }: Props) => {
    const { selvstendigNæringsdrivendeInformasjon, harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd } = søker;

    if (selvstendigNæringsdrivendeInformasjon && harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        return (
            <Oppsummeringsseksjon ingress={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.tittel')}>
                <SelvstendigNæringsdrivendeOppsummeringsliste næringer={selvstendigNæringsdrivendeInformasjon} />
            </Oppsummeringsseksjon>
        );
    }

    return (
        <Oppsummeringsseksjon ingress={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.tittel')}>
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.tittel')}
                verdi={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.ikkeSelvstendigNæringsdrivende')}
            />
        </Oppsummeringsseksjon>
    );
};

const AndreInntekterOppsummering = ({ søker, intl }: Props) => {
    const { harHattAnnenInntektSiste10Mnd, andreInntekterSiste10Mnd } = søker;

    if (andreInntekterSiste10Mnd && harHattAnnenInntektSiste10Mnd) {
        return (
            <Oppsummeringsseksjon ingress={getMessage(intl, 'oppsummering.andreInntekter.tittel')}>
                <AndreInntekterOppsummeringsliste andreInntekter={andreInntekterSiste10Mnd} />
            </Oppsummeringsseksjon>
        );
    }

    return (
        <Oppsummeringsseksjon ingress={getMessage(intl, 'oppsummering.andreInntekter.tittel')}>
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.andreInntekter.tittel')}
                verdi={getMessage(intl, 'oppsummering.andreInntekter.ikkeHattAndreInntekter')}
            />
        </Oppsummeringsseksjon>
    );
};

export default injectIntl(InntektOppsummering);
