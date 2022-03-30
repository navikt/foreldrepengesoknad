import VeilederNormal from 'app/assets/VeilederNormal';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { Block, intlUtils } from '@navikt/fp-common';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import links from 'app/links/links';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { prosentValideringSamtidigUttak } from 'uttaksplan/utils/prosentValidering';
import { YesOrNo } from '@navikt/sif-common-formik/lib';

interface Props {
    erFlerbarnssøknad: boolean;
    navnPåForeldre: NavnPåForeldre;
    navnPåAnnenForelder: string | undefined;
    samtidigUttakProsentVisible: boolean;
}

const SamtidigUttakSpørsmål: FunctionComponent<Props> = ({
    erFlerbarnssøknad,
    navnPåForeldre,
    navnPåAnnenForelder,
    samtidigUttakProsentVisible,
}) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom={samtidigUttakProsentVisible ? 'l' : 'none'}>
                <PeriodeUttakFormComponents.YesOrNoQuestion
                    name={PeriodeUttakFormField.samtidigUttak}
                    legend={intlUtils(intl, 'uttaksplan.samtidigUttak', { navnAnnenForelder: navnPåAnnenForelder })}
                    validate={(value: YesOrNo) => {
                        if (value === YesOrNo.UNANSWERED) {
                            return intlUtils(intl, 'uttaksplan.validering.samtidigUttak');
                        }
                    }}
                />
            </Block>
            <Block visible={samtidigUttakProsentVisible} padBottom="l">
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
            <Block visible={samtidigUttakProsentVisible}>
                <PeriodeUttakFormComponents.NumberInput
                    name={PeriodeUttakFormField.samtidigUttakProsent}
                    label={intlUtils(intl, 'uttaksplan.samtidigUttakProsent')}
                    maxLength={4}
                    validate={prosentValideringSamtidigUttak(intl)}
                />
            </Block>
        </>
    );
};

export default SamtidigUttakSpørsmål;
