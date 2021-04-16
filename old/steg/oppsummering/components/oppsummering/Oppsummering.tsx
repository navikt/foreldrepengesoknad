import React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Søknad from '../../../../types/søknad/Søknad';
import SøkerPersonalia from 'app/steg/oppsummering/components/søkerPersonalia/SøkerPersonalia';
import { formaterNavn } from 'app/util/domain/personUtil';
import { Søkerinfo } from '../../../../types/søkerinfo';
import { skalSøkerLasteOppTerminbekreftelse } from '../../../../util/validation/steg/barn';
import Block from 'common/components/block/Block';
import AnnenForelderOppsummering from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/AnnenForelderOppsummering';
import RelasjonTilBarnOppsummering from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/RelasjonTilBarnOppsummering';
import UtenlandsoppholdOppsummering from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/UtenlandsoppholdOppsummering';
import InntektOppsummering from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/InntektOppsummering';
import Oppsummeringspanel from 'app/steg/oppsummering/components/oppsummeringspanel/Oppsummeringspanel';
import UttaksplanOppsummering from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/UttaksplanOppsummering';
import { UttaksplanValideringState } from 'app/redux/reducers/uttaksplanValideringReducer';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';
import { Søknadsinfo } from 'app/selectors/types';

import './oppsummering.less';

interface OppsummeringProps {
    søknadsinfo: Søknadsinfo;
    søkerinfo: Søkerinfo;
    søknad: Søknad;
    uttaksplanValidering: UttaksplanValideringState;
    antallUkerUttaksplan: number;
    intl: IntlShape;
}

type Props = OppsummeringProps;
class Oppsummering extends React.Component<Props> {
    render() {
        const { søkerinfo, søknad, uttaksplanValidering, antallUkerUttaksplan, søknadsinfo, intl } = this.props;
        const { person } = søkerinfo;

        const erEnkelEndringssøknad = søknad.ekstrainfo.erEnkelEndringssøknad === true;
        const visBarn = erEnkelEndringssøknad === false;
        const visAnnenForelder = erEnkelEndringssøknad === false;
        const visUtenlandsopphold = søknad.erEndringssøknad === false;

        return (
            <Block margin="m">
                {uttaksplanValidering.erGyldig && (
                    <VeilederInfo
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'oppsummering.veileder',
                            },
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
                        <Oppsummeringspanel tittel={getMessage(intl, 'oppsummering.relasjonTilBarn')}>
                            <RelasjonTilBarnOppsummering
                                barn={søknad.barn}
                                annenForelder={søknad.annenForelder}
                                situasjon={søknad.situasjon}
                                skalLasteOppTerminbekreftelse={skalSøkerLasteOppTerminbekreftelse(
                                    søknad,
                                    søkerinfo.arbeidsforhold
                                )}
                            />
                        </Oppsummeringspanel>
                    )}

                    {visAnnenForelder && (
                        <Oppsummeringspanel tittel={getMessage(intl, 'oppsummering.annenForelder')}>
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
                            <Oppsummeringspanel tittel={getMessage(intl, 'oppsummering.utenlandsopphold')}>
                                <UtenlandsoppholdOppsummering
                                    informasjonOmUtenlandsopphold={søknad.informasjonOmUtenlandsopphold}
                                    situasjon={søknad.situasjon}
                                    familiehendelsedato={søknadsinfo.søknaden.familiehendelsesdato}
                                    farEllerMedmor={søknadsinfo.søker.erFarEllerMedmor}
                                />
                            </Oppsummeringspanel>

                            <Oppsummeringspanel tittel={getMessage(intl, 'oppsummering.inntekt')}>
                                <InntektOppsummering søker={søknad.søker} arbeidsforhold={søkerinfo.arbeidsforhold} />
                            </Oppsummeringspanel>
                        </>
                    )}

                    <Oppsummeringspanel tittel={getMessage(intl, 'oppsummering.uttak')} apen={erEnkelEndringssøknad}>
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
                            eksisterendeUttaksplan={
                                søknad.ekstrainfo.eksisterendeSak
                                    ? søknad.ekstrainfo.eksisterendeSak.uttaksplan
                                    : undefined
                            }
                        />
                    </Oppsummeringspanel>
                </div>
            </Block>
        );
    }
}
export default injectIntl(Oppsummering);
