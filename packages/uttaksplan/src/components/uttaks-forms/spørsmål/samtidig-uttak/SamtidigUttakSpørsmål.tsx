import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { GuidePanel, Link } from '@navikt/ds-react';

import { Block, NavnPåForeldre, Situasjon, andreAugust2022ReglerGjelder, intlUtils, links } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/fp-formik';

import { prosentValideringSamtidigUttak } from '../../../../utils/prosentValidering';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    erFlerbarnssøknad: boolean;
    navnPåForeldre: NavnPåForeldre;
    navnPåAnnenForelder: string | undefined;
    samtidigUttakProsentVisible: boolean;
    familiehendelsesdato: Date;
    situasjon: Situasjon;
}

const SamtidigUttakSpørsmål: FunctionComponent<Props> = ({
    erFlerbarnssøknad,
    navnPåForeldre,
    navnPåAnnenForelder,
    samtidigUttakProsentVisible,
    familiehendelsesdato,
    situasjon,
}) => {
    const intl = useIntl();
    let samtidigUttakInfoTekst;
    if (erFlerbarnssøknad) {
        samtidigUttakInfoTekst = 'uttaksplan.samtidigUttak.flerBarnsuker.veiledertekst';
    } else if (andreAugust2022ReglerGjelder(familiehendelsesdato) && situasjon === 'fødsel') {
        samtidigUttakInfoTekst = 'uttaksplan.samtidigUttak.veiledertekst.etterWLB';
    } else {
        samtidigUttakInfoTekst = 'uttaksplan.samtidigUttak.veiledertekst.førWLB';
    }

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

                        return undefined;
                    }}
                />
            </Block>
            <Block visible={samtidigUttakProsentVisible} padBottom="l">
                <GuidePanel>
                    <FormattedMessage
                        id={samtidigUttakInfoTekst}
                        values={{
                            link: (
                                <Link href={links.fleksibeltuttak} target="_blank">
                                    <FormattedMessage id="uttaksplan.samtidigUttak.veiledertekst.lenke" />
                                </Link>
                            ),
                            navnMor: navnPåForeldre.mor,
                            navnFar: navnPåForeldre.farMedmor,
                        }}
                    />
                </GuidePanel>
            </Block>
            <Block visible={samtidigUttakProsentVisible}>
                <PeriodeUttakFormComponents.NumberInput
                    name={PeriodeUttakFormField.samtidigUttakProsent}
                    label={intlUtils(intl, 'uttaksplan.samtidigUttakProsent')}
                    maxLength={5}
                    validate={prosentValideringSamtidigUttak(intl)}
                />
            </Block>
        </>
    );
};

export default SamtidigUttakSpørsmål;
