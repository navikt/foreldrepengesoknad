import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { useIntl } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import AnnenForelder from 'app/types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';
import { formaterNavn } from 'app/util/domain/personUtil';
import Barn from '../../../../../types/søknad/Barn';
import { formatDate } from '../../../../../util/dates/dates';
import Oppsummeringsseksjon from 'app/steg/oppsummering/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import OppsummeringAvDokumentasjon from 'app/steg/oppsummering/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';

interface AnnenForelderOppsummeringProps {
    annenForelder: AnnenForelder;
    barn: Barn;
    erAleneOmOmsorg: boolean;
    erFarEllerMedmor: boolean;
}

type Props = AnnenForelderOppsummeringProps;
const AnnenForelderOppsummering: React.StatelessComponent<Props> = (props: Props) => {
    const { erFarEllerMedmor, erAleneOmOmsorg, barn } = props;
    const intl = useIntl();
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
        <Oppsummeringsseksjon>
            {kanIkkeOppgis && (
                <Element className="kanIkkeOppgis">
                    {getMessage(intl, 'oppsummering.annenForelder.kanIkkeOppgis')}
                </Element>
            )}
            {!kanIkkeOppgis &&
                navn && (
                    <Feltoppsummering
                        key="annenForelderNavn"
                        feltnavn={getMessage(intl, 'oppsummering.annenForelder.navn.label')}
                        verdi={navn}
                    />
                )}
            {(fnr || utenlandskFnr) && (
                <Feltoppsummering
                    key="annenForelderFødselsnummer"
                    feltnavn={
                        utenlandskFnr
                            ? getMessage(intl, 'oppsummering.annenForelder.utenlandskFødselsnummer.label')
                            : getMessage(intl, 'oppsummering.annenForelder.fødselsnummer.label')
                    }
                    verdi={fnr ? fnr : 'som ikke er oppgitt'}
                />
            )}
            {utenlandskFnr &&
                bostedsland && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.annenForelder.bostedsland.label')}
                        verdi={countries.getName(bostedsland, 'nb')}
                    />
                )}
            {erAleneOmOmsorg !== undefined &&
                !kanIkkeOppgis && (
                    <Feltoppsummering
                        feltnavn={erAleneOmOmsorgLabel}
                        verdi={
                            erAleneOmOmsorg
                                ? getMessage(intl, 'oppsummering.annenForelder.aleneomsorg')
                                : getMessage(intl, 'oppsummering.annenForelder.deltOmsorg')
                        }
                    />
                )}
            {datoForAleneomsorg && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.annenForelder.datoForAleneomsorg.label')}
                    verdi={formatDate(datoForAleneomsorg) || ''}
                />
            )}
            {erAleneOmOmsorg &&
                erFarEllerMedmor && (
                    <OppsummeringAvDokumentasjon
                        vedlegg={dokumentasjonAvAleneomsorg}
                        ledetekst={getMessage(intl, 'oppsummering.annenForelder.dokumentasjonAvAleneomsorg.label')}
                    />
                )}
            {harRettPåForeldrepenger !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.annenForelder.harRettPåForeldrepenger.label', { navn })}
                    verdi={harRettPåForeldrepenger ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
            )}
            {erInformertOmSøknaden !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.annenForelder.erInformertOmSøknaden.label', { navn })}
                    verdi={erInformertOmSøknaden ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
            )}
            {erForSyk !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.annenForelder.erForSyk.label', { navn })}
                    verdi={erForSyk ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
            )}
            {erUfør !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.annenForelder.erUfør.label', { navn })}
                    verdi={erUfør ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
            )}
        </Oppsummeringsseksjon>
    );
};
export default AnnenForelderOppsummering;
