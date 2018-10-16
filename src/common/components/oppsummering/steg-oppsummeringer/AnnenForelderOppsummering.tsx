import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Element } from 'nav-frontend-typografi';

import AnnenForelder from 'app/types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import DisplayTextWithLabel from 'common/components/display-text-with-label/DisplayTextWithLabel';
import { formaterNavn } from 'app/util/domain/personUtil';
import Barn from '../../../../app/types/søknad/Barn';
import DisplayContentWithLabel from 'common/components/display-content-with-label/DisplayContentWithLabel';
import EtikettBase from 'nav-frontend-etiketter';
import { formatDate } from '../../../../app/util/dates/dates';
import { createListOfAttachmentPreviewLinks, missingAttachmentEtikettProps } from 'common/util/oppsummeringUtils';

interface AnnenForelderOppsummeringProps {
    annenForelder: AnnenForelder;
    barn: Barn;
    erAleneOmOmsorg: boolean;
}

type Props = AnnenForelderOppsummeringProps & InjectedIntlProps;
const AnnenForelderOppsummering: React.StatelessComponent<Props> = (props: Props) => {
    const { erAleneOmOmsorg, barn, intl } = props;
    const {
        fornavn,
        etternavn,
        fnr,
        utenlandskFnr,
        bostedsland,
        kanIkkeOppgis,
        harRettPåForeldrepenger,
        erInformertOmSøknaden,
        erForSyk,
        erUfør
    } = props.annenForelder;

    const { datoForAleneomsorg, dokumentasjonAvAleneomsorg } = barn;

    const erAleneOmOmsorgLabel = getMessage(intl, 'oppsummering.annenForelder.aleneOmOmsorg.label', {
        personligPronomen: erAleneOmOmsorg ? getMessage(intl, 'jeg') : getMessage(intl, 'vi')
    });

    const navn = fornavn && etternavn ? formaterNavn(fornavn, etternavn) : undefined;

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
            {erAleneOmOmsorg !== undefined &&
                !kanIkkeOppgis && (
                    <DisplayTextWithLabel
                        label={erAleneOmOmsorgLabel}
                        text={
                            erAleneOmOmsorg
                                ? getMessage(intl, 'oppsummering.annenForelder.aleneomsorg')
                                : getMessage(intl, 'oppsummering.annenForelder.deltOmsorg')
                        }
                    />
                )}
            {datoForAleneomsorg && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.annenForelder.datoForAleneomsorg.label')}
                    text={formatDate(datoForAleneomsorg) || ''}
                />
            )}
            {dokumentasjonAvAleneomsorg &&
                dokumentasjonAvAleneomsorg.length > 0 && (
                    <DisplayContentWithLabel
                        label={getMessage(intl, 'oppsummering.annenForelder.dokumentasjonAvAleneomsorg.label')}>
                        {createListOfAttachmentPreviewLinks(dokumentasjonAvAleneomsorg)}
                    </DisplayContentWithLabel>
                )}
            {dokumentasjonAvAleneomsorg === undefined ||
                (dokumentasjonAvAleneomsorg.length === 0 &&
                    erAleneOmOmsorg && (
                        <DisplayContentWithLabel
                            label={getMessage(intl, "oppsummering.annenForelder.dokumentasjonAvAleneomsorg.label'")}>
                            <EtikettBase {...missingAttachmentEtikettProps(intl)} />
                        </DisplayContentWithLabel>
                    ))}
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
