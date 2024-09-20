import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { GuidePanel, Link } from '@navikt/ds-react';

import { NavnPåForeldre, Situasjon } from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';

import Block from '../../../../common/block/Block';
import { YesOrNo } from '../../../../formik-wrappers';
import { andreAugust2022ReglerGjelder } from '../../../../utils/dateUtils';
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
                    legend={intl.formatMessage(
                        { id: 'uttaksplan.samtidigUttak' },
                        { navnAnnenForelder: navnPåAnnenForelder },
                    )}
                    validate={(value: YesOrNo) => {
                        if (value === YesOrNo.UNANSWERED) {
                            return intl.formatMessage({ id: 'uttaksplan.validering.samtidigUttak' });
                        }

                        return undefined;
                    }}
                />
            </Block>
            <Block visible={samtidigUttakProsentVisible} padBottom="l">
                <GuidePanel>
                    <FormattedMessage
                        // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
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
                    label={intl.formatMessage({ id: 'uttaksplan.samtidigUttakProsent' })}
                    maxLength={5}
                    validate={prosentValideringSamtidigUttak(intl)}
                />
            </Block>
        </>
    );
};

export default SamtidigUttakSpørsmål;
