import VeilederNormal from 'app/assets/VeilederNormal';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { Block, intlUtils } from '@navikt/fp-common';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import links from 'app/links/links';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';

interface Props {
    samtidigUttakValue: YesOrNo;
    erFlerbarnssøknad: boolean;
    navnPåForeldre: NavnPåForeldre;
}

const SamtidigUttakSpørsmål: FunctionComponent<Props> = ({ samtidigUttakValue, erFlerbarnssøknad, navnPåForeldre }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l">
                <PeriodeUttakFormComponents.YesOrNoQuestion
                    name={PeriodeUttakFormField.samtidigUttak}
                    legend="Skal dere ha samtidig uttak?"
                />
            </Block>
            <Block visible={samtidigUttakValue === YesOrNo.YES} padBottom="l">
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    <FormattedMessage
                        id={
                            erFlerbarnssøknad
                                ? 'uttaksplan.samtidigUttak.flerBarnsuker.veiledertekst'
                                : 'uttaksplan.samtidigUttak.veiledertekst'
                        }
                        values={{
                            link: (
                                <Lenke href={links.fleksibeltuttak} target="_blank">
                                    <FormattedMessage id="uttaksplan.samtidigUttak.veiledertekst.lenke" />
                                </Lenke>
                            ),
                            navnMor: navnPåForeldre.mor,
                            navnFar: navnPåForeldre.farMedmor,
                        }}
                    />
                </Veilederpanel>
            </Block>
            <Block>
                <PeriodeUttakFormComponents.NumberInput
                    name={PeriodeUttakFormField.samtidigUttakProsent}
                    label={intlUtils(intl, 'uttaksplan.samtidigUttakProsent')}
                />
            </Block>
        </>
    );
};

export default SamtidigUttakSpørsmål;
