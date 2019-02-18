import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../app/util/dates/dates';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Søker from '../../../../app/types/søknad/Søker';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import KompleksFeltoppsummering from 'common/components/kompleks-feltoppsummering/KompleksFeltoppsummering';
import Block from 'common/components/block/Block';
import Element from 'nav-frontend-typografi/lib/element';
import FrilansoppdragOppsummeringsliste from 'common/components/oppsummering/oppsummeringer/lister/FrilansoppdragOppsummeringsliste';

interface FrilansOppsummeringProps {
    søker: Søker;
}

type Props = FrilansOppsummeringProps & InjectedIntlProps;

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
                    <Block visible={!harJobbetForNærVennEllerFamilieSiste10Mnd} margin="none">
                        <Element>
                            {getMessage(
                                intl,
                                'oppsummering.frilans.harIkkeUtførtFrilansArbeidForNæreVennerEllerFamilieSiste10Mnd'
                            )}
                        </Element>
                    </Block>
                    <Block visible={harJobbetForNærVennEllerFamilieSiste10Mnd} margin="none">
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

export default injectIntl(FrilansOppsummering);
