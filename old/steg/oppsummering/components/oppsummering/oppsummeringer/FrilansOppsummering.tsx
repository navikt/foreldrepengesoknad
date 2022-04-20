import * as React from 'react';
import { useIntl } from 'react-intl';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import Element from 'nav-frontend-typografi/lib/element';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';
import KompleksFeltoppsummering from 'app/steg/oppsummering/components/kompleks-feltoppsummering/KompleksFeltoppsummering';
import FrilansoppdragOppsummeringsliste from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/lister/FrilansoppdragOppsummeringsliste';
import Oppsummeringsseksjon from 'app/steg/oppsummering/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import Søker from '../../../../../types/søknad/Søker';
import { formatDate } from '../../../../../util/dates/dates';

interface FrilansOppsummeringProps {
    søker: Søker;
}

type Props = FrilansOppsummeringProps;

const FrilansOppsummering = ({ søker }: Props) => {
    const { frilansInformasjon, harJobbetSomFrilansSiste10Mnd } = søker;
    const intl = useIntl();

    if (frilansInformasjon && harJobbetSomFrilansSiste10Mnd) {
        const {
            driverFosterhjem,
            jobberFremdelesSomFrilans,
            oppstart,
            harJobbetForNærVennEllerFamilieSiste10Mnd,
            oppdragForNæreVennerEllerFamilieSiste10Mnd,
        } = frilansInformasjon;
        return (
            <Oppsummeringsseksjon tittel={getMessage(intl, 'oppsummering.frilans.tittel')}>
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.frilans.oppstartsdato')}
                    verdi={formatDate(ISOStringToDate(oppstart))!}
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
                    )}
                >
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
        <Oppsummeringsseksjon tittel={getMessage(intl, 'oppsummering.frilans.tittel')}>
            {getMessage(intl, 'oppsummering.frilans.ikkeFrilans')}
        </Oppsummeringsseksjon>
    );
};

export default FrilansOppsummering;
