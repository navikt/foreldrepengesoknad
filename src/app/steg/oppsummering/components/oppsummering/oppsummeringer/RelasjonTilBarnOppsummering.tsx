import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, IntlShape } from 'react-intl';
import { formatDate } from '../../../../../util/dates/dates';
import Barn, {
    Adopsjonsbarn,
    ForeldreansvarBarn,
    FødtBarn,
    UfødtBarn,
    isFødtBarn,
    isAdopsjonsbarn,
    isForeldreansvarsbarn,
    isUfødtBarn,
} from '../../../../../types/søknad/Barn';
import { Søkersituasjon } from '../../../../../types/søknad/Søknad';
import AnnenForelder from '../../../../../types/søknad/AnnenForelder';
import Oppsummeringsseksjon from 'app/steg/oppsummering/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';
import OppsummeringAvDokumentasjon from 'app/steg/oppsummering/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';

interface RelasjonTilBarnOppsummeringProps {
    barn: Barn;
    annenForelder: AnnenForelder;
    situasjon: Søkersituasjon;
    skalLasteOppTerminbekreftelse: boolean;
    intl: IntlShape;
}

type Props = RelasjonTilBarnOppsummeringProps;
class RelasjonTilBarnOppsummering extends React.Component<Props> {
    getAntallBarnSummaryText(antallBarn: number): string {
        const { intl } = this.props;
        if (antallBarn === 1) {
            return getMessage(intl, 'oppsummering.ettBarn');
        } else if (antallBarn === 2) {
            return getMessage(intl, 'oppsummering.tvillinger');
        } else {
            return getMessage(intl, 'oppsummering.antallBarn.flere', {
                antall: antallBarn,
            });
        }
    }

    renderOppsummeringForeldreansvar(barn: ForeldreansvarBarn) {
        const { intl } = this.props;
        const { antallBarn, fødselsdatoer, foreldreansvarsdato, adopsjonsvedtak } = barn;

        return (
            <>
                {foreldreansvarsdato && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.foreldreansvarsdato.label')}
                        verdi={formatDate(foreldreansvarsdato) || ''}
                    />
                )}
                {antallBarn && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.antallBarn.label')}
                        verdi={this.getAntallBarnSummaryText(antallBarn)}
                    />
                )}
                {fødselsdatoer && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.fødselsdato.label')}
                        verdi={formatDate(fødselsdatoer[0]) || ''}
                    />
                )}
                <OppsummeringAvDokumentasjon
                    ledetekst={getMessage(intl, 'oppsummering.adopsjonsvedtak.label')}
                    vedlegg={adopsjonsvedtak || []}
                />
            </>
        );
    }

    renderOppsummeringAdopsjon(barn: Adopsjonsbarn) {
        const { intl } = this.props;
        const {
            antallBarn,
            fødselsdatoer,
            adopsjonsdato,
            ankomstdato,
            adopsjonAvEktefellesBarn,
            adoptertIUtlandet,
            omsorgsovertakelse,
        } = barn;

        return (
            <>
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.fødselsdato.label')}
                    verdi={formatDate(fødselsdatoer[0]) || ''}
                />
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.adopsjonAvEktefellesBarn.label')}
                    verdi={adopsjonAvEktefellesBarn ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
                {antallBarn && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.antallBarn.label')}
                        verdi={this.getAntallBarnSummaryText(antallBarn)}
                    />
                )}
                {adopsjonsdato && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.adopsjonsdato.label')}
                        verdi={formatDate(adopsjonsdato) || ''}
                    />
                )}
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.adoptertIUtlandet.label')}
                    verdi={adoptertIUtlandet ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                />
                {ankomstdato && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.ankomstdato.label')}
                        verdi={formatDate(ankomstdato) || ''}
                    />
                )}
                <OppsummeringAvDokumentasjon
                    ledetekst={getMessage(intl, 'oppsummering.omsorgsovertakelse.label')}
                    vedlegg={omsorgsovertakelse || []}
                />
            </>
        );
    }

    renderOppsummeringFødtBarn(barn: FødtBarn) {
        const { intl } = this.props;
        const { fødselsdatoer, antallBarn } = barn;

        return (
            <>
                {antallBarn && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.antallBarn.label')}
                        verdi={this.getAntallBarnSummaryText(antallBarn)}
                    />
                )}
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.fødselsdato.label')}
                    verdi={formatDate(fødselsdatoer[0]) || ''}
                />
                {/*
                    // This has been commented out as users won't have to upload birth certificate
                    // in the first version of Foreldrepengesøknad, but it will be required
                    // once we start fetching data from TPS about registered children later on.
                    // PS! Please remove this comment once this is in place.

                    {fødselsattest && (
                        <DisplayTextWithLabel
                            feltnavn={getMessage(intl, 'oppsummering.fødselsattest.label')}
                            verdi={fødselsattest.map((vedlegg) => vedlegg.filename)}
                        />
                    )}
                    {fødselsattest === undefined && (
                        <DisplayContentWithLabel feltnavn={getMessage(intl, 'oppsummering.fødselsattest.label')}>
                            <EtikettBase {...this.missingAttachmentEtikettProps()} />
                        </DisplayContentWithLabel>
                    )}
                */}
            </>
        );
    }

    renderOppsummeringUfødtBarn(barn: UfødtBarn) {
        const { skalLasteOppTerminbekreftelse, annenForelder, intl } = this.props;
        const { terminbekreftelseDato, termindato, terminbekreftelse, antallBarn } = barn;

        return (
            <>
                {antallBarn && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.antallBarn.label')}
                        verdi={this.getAntallBarnSummaryText(antallBarn)}
                    />
                )}
                {annenForelder.erForSyk !== undefined && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'annenForelder.erForSyk.label')}
                        verdi={annenForelder.erForSyk ? 'ja' : 'nei'}
                    />
                )}
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.termindato')}
                    verdi={formatDate(termindato) || ''}
                />
                {skalLasteOppTerminbekreftelse && <OppsummeringAvDokumentasjon vedlegg={terminbekreftelse || []} />}
                {terminbekreftelseDato && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.terminbekreftelseDato.label')}
                        verdi={formatDate(terminbekreftelseDato) || ''}
                    />
                )}
            </>
        );
    }

    renderPartial() {
        const { situasjon, barn } = this.props;
        if (isUfødtBarn(barn, situasjon)) {
            return this.renderOppsummeringUfødtBarn(barn);
        }
        if (isFødtBarn(barn, situasjon)) {
            return this.renderOppsummeringFødtBarn(barn);
        }
        if (isAdopsjonsbarn(barn, situasjon)) {
            return this.renderOppsummeringAdopsjon(barn);
        }
        if (isForeldreansvarsbarn(barn, situasjon)) {
            return this.renderOppsummeringForeldreansvar(barn);
        }
        return null;
    }

    render() {
        return <Oppsummeringsseksjon>{this.renderPartial()}</Oppsummeringsseksjon>;
    }
}
export default injectIntl(RelasjonTilBarnOppsummering);
