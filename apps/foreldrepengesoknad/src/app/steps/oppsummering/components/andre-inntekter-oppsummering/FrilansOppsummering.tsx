import { Block, formatDate, intlUtils } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import InntekterTabell from './InntekterTabell';
import { BodyShort } from '@navikt/ds-react';

const FrilansOppsummering: FunctionComponent = () => {
    const intl = useIntl();
    const {
        søker: { frilansInformasjon, harJobbetSomFrilansSiste10Mnd },
    } = useSøknad();

    if (!frilansInformasjon || !harJobbetSomFrilansSiste10Mnd) {
        return (
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.frilans.tittel')}>
                <BodyShort>{intlUtils(intl, 'oppsummering.frilans.ikkeFrilans')}</BodyShort>
            </OppsummeringsPunkt>
        );
    }
    const {
        oppstart,
        jobberFremdelesSomFrilans,
        driverFosterhjem,
        harJobbetForNærVennEllerFamilieSiste10Mnd,
        oppdragForNæreVennerEllerFamilieSiste10Mnd,
    } = frilansInformasjon;

    return (
        <>
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.frilans.tittel')} />
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.frilans.oppstartsdato')}>
                <BodyShort>{formatDate(oppstart)}</BodyShort>
            </OppsummeringsPunkt>
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.frilans.fremdelesFrilans')}>
                <BodyShort>{jobberFremdelesSomFrilans ? intlUtils(intl, 'ja') : intlUtils(intl, 'nei')}</BodyShort>
            </OppsummeringsPunkt>
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.frilans.driverFosterhjem')}>
                <BodyShort>{driverFosterhjem ? intlUtils(intl, 'ja') : intlUtils(intl, 'nei')}</BodyShort>
            </OppsummeringsPunkt>
            <OppsummeringsPunkt
                title={intlUtils(intl, 'oppsummering.frilans.frilansArbeidForNæreVennerEllerFamilieSiste10Mnd')}
            >
                <Block visible={!harJobbetForNærVennEllerFamilieSiste10Mnd} margin="none">
                    <BodyShort>
                        {intlUtils(
                            intl,
                            'oppsummering.frilans.harIkkeUtførtFrilansArbeidForNæreVennerEllerFamilieSiste10Mnd'
                        )}
                    </BodyShort>
                </Block>
                <Block visible={harJobbetForNærVennEllerFamilieSiste10Mnd} margin="none">
                    <InntekterTabell
                        list={oppdragForNæreVennerEllerFamilieSiste10Mnd.map(
                            ({ navnPåArbeidsgiver, tidsperiode, pågående }) => ({
                                key: navnPåArbeidsgiver + tidsperiode,
                                headerVenstre: navnPåArbeidsgiver,
                                headerHøyre: intlUtils(intl, 'tidsintervall', {
                                    fom: formatDate(tidsperiode.fom!),
                                    tom: pågående ? 'pågående' : formatDate(tidsperiode.tom!),
                                }),
                            })
                        )}
                    />
                </Block>
            </OppsummeringsPunkt>
        </>
    );
};

export default FrilansOppsummering;
