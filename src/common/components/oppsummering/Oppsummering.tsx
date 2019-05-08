import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Søknad from '../../../app/types/søknad/Søknad';
import SøkerPersonalia from 'common/components/søker-personalia/SøkerPersonalia';
import { formaterNavn } from 'app/util/domain/personUtil';
import { Søkerinfo } from '../../../app/types/søkerinfo';
import { skalSøkerLasteOppTerminbekreftelse } from '../../../app/util/validation/steg/barn';
import Block from 'common/components/block/Block';
import AnnenForelderOppsummering from 'common/components/oppsummering/oppsummeringer/AnnenForelderOppsummering';
import RelasjonTilBarnOppsummering from 'common/components/oppsummering/oppsummeringer/RelasjonTilBarnOppsummering';
import UtenlandsoppholdOppsummering from 'common/components/oppsummering/oppsummeringer/UtenlandsoppholdOppsummering';
import InntektOppsummering from 'common/components/oppsummering/oppsummeringer/InntektOppsummering';
import Oppsummeringspanel from 'common/components/oppsummeringspanel/Oppsummeringspanel';
import UttaksplanOppsummering from 'common/components/oppsummering/oppsummeringer/UttaksplanOppsummering';
import { UttaksplanValideringState } from 'app/redux/reducers/uttaksplanValideringReducer';
import VeilederInfo from 'app/components/veileder-info/VeilederInfo';
import { Søknadsinfo } from 'app/selectors/types';

import './oppsummering.less';

interface OppsummeringProps {
    søknadsinfo: Søknadsinfo;
    søkerinfo: Søkerinfo;
    søknad: Søknad;
    uttaksplanValidering: UttaksplanValideringState;
    antallUkerUttaksplan: number;
}

type Props = OppsummeringProps & InjectedIntlProps;
class Oppsummering extends React.Component<Props> {
    render() {
        const { søkerinfo, søknad, uttaksplanValidering, antallUkerUttaksplan, søknadsinfo, intl } = this.props;
        const { person } = søkerinfo;

        const harSakForEndring = søknad.ekstrainfo.sakForEndring !== undefined;
        const visBarn = harSakForEndring === false;
        const visAnnenForelder = harSakForEndring === false;
        const visUtenlandsopphold = søknad.erEndringssøknad === false;

        return (
            <Block margin="m">
                {uttaksplanValidering.erGyldig && (
                    <VeilederInfo
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'oppsummering.veileder'
                            }
                        ]}
                    />
                )}
                <div className="oppsummering">
                    <Block margin="s">
                        <SøkerPersonalia
                            navn={formaterNavn(person.fornavn, person.etternavn, person.mellomnavn)}
                            fnr={person.fnr}
                            kjønn={person.kjønn}
                        />
                    </Block>

                    {visBarn && (
                        <Oppsummeringspanel
                            tittel={getMessage(intl, 'oppsummering.relasjonTilBarn')}
                            tittelProps="undertittel">
                            <RelasjonTilBarnOppsummering
                                barn={søknad.barn}
                                annenForelder={søknad.annenForelder}
                                situasjon={søknad.situasjon}
                                skalLasteOppTerminbekreftelse={skalSøkerLasteOppTerminbekreftelse(søknad, søkerinfo)}
                            />
                        </Oppsummeringspanel>
                    )}

                    {visAnnenForelder && (
                        <Oppsummeringspanel
                            tittel={getMessage(intl, 'oppsummering.annenForelder')}
                            tittelProps="undertittel">
                            <AnnenForelderOppsummering
                                annenForelder={søknad.annenForelder}
                                erAleneOmOmsorg={søknad.søker.erAleneOmOmsorg}
                                barn={søknad.barn}
                                erFarEllerMedmor={søknadsinfo.søker.erFarEllerMedmor}
                            />
                        </Oppsummeringspanel>
                    )}

                    {visUtenlandsopphold && (
                        <>
                            <Oppsummeringspanel
                                tittel={getMessage(intl, 'oppsummering.utenlandsopphold')}
                                tittelProps="undertittel">
                                <UtenlandsoppholdOppsummering
                                    informasjonOmUtenlandsopphold={søknad.informasjonOmUtenlandsopphold}
                                    situasjon={søknad.situasjon}
                                    familiehendelsedato={søknadsinfo.søknaden.familiehendelsesdato}
                                    farEllerMedmor={søknadsinfo.søker.erFarEllerMedmor}
                                />
                            </Oppsummeringspanel>

                            <Oppsummeringspanel
                                tittel={getMessage(intl, 'oppsummering.inntekt')}
                                tittelProps="undertittel">
                                <InntektOppsummering søker={søknad.søker} arbeidsforhold={søkerinfo.arbeidsforhold} />
                            </Oppsummeringspanel>
                        </>
                    )}

                    <Oppsummeringspanel
                        tittel={getMessage(intl, 'oppsummering.uttak')}
                        tittelProps="undertittel"
                        apen={harSakForEndring}>
                        <UttaksplanOppsummering
                            perioder={søknad.uttaksplan}
                            navnPåForeldre={søknadsinfo.navn.navnPåForeldre}
                            annenForelder={søknad.annenForelder}
                            erFarEllerMedmor={søknadsinfo.søker.erFarEllerMedmor}
                            registrerteArbeidsforhold={søkerinfo.arbeidsforhold}
                            uttaksplanValidering={uttaksplanValidering}
                            dekningsgrad={søknad.dekningsgrad}
                            antallUkerUttaksplan={antallUkerUttaksplan}
                            begrunnelseForSenEndring={søknad.tilleggsopplysninger.begrunnelseForSenEndring}
                            begrunnelseForSenEndringVedlegg={søknad.vedleggForSenEndring}
                            søknadsinfo={søknadsinfo}
                        />
                    </Oppsummeringspanel>
                </div>
            </Block>
        );
    }
}
export default injectIntl(Oppsummering);
