import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { formatDate } from '../../../../app/util/dates/dates';
import Barn, { Adopsjonsbarn, ForeldreansvarBarn, FødtBarn, UfødtBarn } from '../../../../app/types/søknad/Barn';
import { Søkersituasjon } from '../../../../app/types/søknad/Søknad';
import AnnenForelder from '../../../../app/types/søknad/AnnenForelder';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import OppsummeringAvDokumentasjon from 'common/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';

interface RelasjonTilBarnOppsummeringProps {
    barn: Barn;
    annenForelder: AnnenForelder;
    situasjon: Søkersituasjon;
    skalLasteOppTerminbekreftelse: boolean;
}

type Props = RelasjonTilBarnOppsummeringProps & InjectedIntlProps;
class RelasjonTilBarnOppsummering extends React.Component<Props> {
    getAntallBarnSummaryText(antallBarn: number): string {
        const { intl } = this.props;
        if (antallBarn === 1) {
            return getMessage(intl, 'oppsummering.ettBarn');
        } else if (antallBarn === 2) {
            return getMessage(intl, 'oppsummering.tvillinger');
        } else {
            return getMessage(intl, 'oppsummering.antallBarn.flere', {
                antall: antallBarn
            });
        }
    }

    renderOppsummeringForeldreansvar() {
        const { barn, intl } = this.props;
        const { antallBarn, fødselsdatoer, foreldreansvarsdato, adopsjonsvedtak } = barn as ForeldreansvarBarn;

        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }

    renderOppsummeringAdopsjon() {
        const { barn, intl } = this.props;
        const {
            antallBarn,
            fødselsdatoer,
            adopsjonsdato,
            ankomstdato,
            adopsjonAvEktefellesBarn,
            adoptertIUtlandet,
            omsorgsovertakelse
        } = barn as Adopsjonsbarn;

        return (
            <React.Fragment>
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.fødselsdato.label')}
                    verdi={formatDate(fødselsdatoer[0]) || ''}
                />
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.adopsjonAvEktefellesBarn.label')}
                    verdi={adopsjonAvEktefellesBarn ? 'adopsjonAvEktefellesBarn' : 'ikkeAdopsjonAvEktefellesBarn'}
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
                    verdi={adoptertIUtlandet ? 'adoptertIUtlandet' : 'ikkeAdoptertIUtlandet'}
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
            </React.Fragment>
        );
    }

    renderOppsummeringFødsel() {
        const { barn, intl } = this.props;
        const { antallBarn } = barn;
        return (
            <React.Fragment>
                {antallBarn && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.antallBarn.label')}
                        verdi={this.getAntallBarnSummaryText(antallBarn)}
                    />
                )}
                {this.props.barn.erBarnetFødt ? this.renderOppsummeringFødtBarn() : this.renderOppsummeringUfødtBarn()}
            </React.Fragment>
        );
    }

    renderOppsummeringFødtBarn() {
        const { barn, intl } = this.props;
        const { fødselsdatoer } = barn as FødtBarn;

        return (
            <>
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

    renderOppsummeringUfødtBarn() {
        const { barn, skalLasteOppTerminbekreftelse, annenForelder, intl } = this.props;
        const { terminbekreftelseDato, termindato, terminbekreftelse } = barn as UfødtBarn;

        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }

    renderPartial() {
        switch (this.props.situasjon) {
            case Søkersituasjon.FØDSEL:
                return this.renderOppsummeringFødsel();
            case Søkersituasjon.ADOPSJON:
                return this.renderOppsummeringAdopsjon();
            case Søkersituasjon.FORELDREANSVAR:
                return this.renderOppsummeringForeldreansvar();
            default:
                return null;
        }
    }

    render() {
        return <Oppsummeringsseksjon>{this.renderPartial()}</Oppsummeringsseksjon>;
    }
}
export default injectIntl(RelasjonTilBarnOppsummering);
