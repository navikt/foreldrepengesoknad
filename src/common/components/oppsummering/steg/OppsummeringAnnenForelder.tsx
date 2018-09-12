import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Element } from 'nav-frontend-typografi';

import AnnenForelder from 'app/types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import DisplayTextWithLabel from 'common/components/display-text-with-label/DisplayTextWithLabel';

interface AnnenForelderOppsummeringProps {
    annenForelder: AnnenForelder;
    erAleneOmOmsorg: boolean;
}

type Props = AnnenForelderOppsummeringProps & InjectedIntlProps;
const AnnenForelderOppsummering: React.StatelessComponent<Props> = (props: Props) => {
    const { erAleneOmOmsorg, intl } = props;
    const {
        navn,
        fnr,
        utenlandskFnr,
        bostedsland,
        kanIkkeOppgis,
        harRettPåForeldrepenger,
        erInformertOmSøknaden,
        erForSyk,
        erUfør
    } = props.annenForelder;

    const erAleneOmOmsorgLabel = getMessage(intl, 'oppsummering.annenForelder.aleneOmOmsorg.label', {
        personligPronomen: erAleneOmOmsorg ? getMessage(intl, 'jeg') : getMessage(intl, 'vi')
    });

    return (
        <React.Fragment>
            {kanIkkeOppgis && (
                <Element className="kanIkkeOppgis">
                    {getMessage(intl, 'oppsummering.annenForelder.kanIkkeOppgis')}
                </Element>
            )}
            {!kanIkkeOppgis &&
                navn && (
                    <DisplayTextWithLabel
                        key="annenForelderNavn"
                        label={getMessage(intl, 'oppsummering.annenForelder.navn.label')}
                        text={navn}
                    />
                )}
            {(fnr || utenlandskFnr) && (
                <DisplayTextWithLabel
                    key="annenForelderFødselsnummer"
                    label={
                        utenlandskFnr
                            ? getMessage(intl, 'oppsummering.annenForelder.utenlandskFødselsnummer.label')
                            : getMessage(intl, 'oppsummering.annenForelder.fødselsnummer.label')
                    }
                    text={fnr ? fnr : 'som ikke er oppgitt'}
                />
            )}
            {utenlandskFnr &&
                bostedsland && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.annenForelder.bostedsland.label')}
                        text={countries.getName(bostedsland, 'nb')}
                    />
                )}
            {erAleneOmOmsorg !== undefined && (
                <DisplayTextWithLabel
                    label={erAleneOmOmsorgLabel}
                    text={
                        erAleneOmOmsorg
                            ? getMessage(intl, 'oppsummering.annenForelder.aleneomsorg')
                            : getMessage(intl, 'oppsummering.annenForelder.deltOmsorg')
                    }
                />
            )}
            {harRettPåForeldrepenger !== undefined && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.annenForelder.harRettPåForeldrepenger.label', { navn })}
                    text={harRettPåForeldrepenger ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
            )}
            {erInformertOmSøknaden !== undefined && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.annenForelder.erInformertOmSøknaden.label', { navn })}
                    text={erInformertOmSøknaden ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
            )}
            {erForSyk !== undefined && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.annenForelder.erForSyk.label', { navn })}
                    text={erForSyk ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
            )}
            {erUfør !== undefined && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.annenForelder.erUfør.label', { navn })}
                    text={erUfør ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
            )}
        </React.Fragment>
    );
};
export default injectIntl(AnnenForelderOppsummering);
