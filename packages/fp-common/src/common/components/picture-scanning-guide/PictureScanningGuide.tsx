import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PictureScanningExample from './PictureScanningExample';
import bemUtils from './../../utils/bemUtils';
import intlHelper from './../../utils/intlUtils';
import ScanningIkon from './../../assets/scanning-ikon/ScanningIkon';
import { Heading, Link } from '@navikt/ds-react';

import './pictureScanningGuide.less';

const PictureScanningGuide: React.FunctionComponent = () => {
    const intl = useIntl();
    const svgIconHeight = 100;
    const bem = bemUtils('pictureScanningGuide');

    return (
        <div className={bem.block}>
            <Heading level="2" size="medium">
                <FormattedMessage id="psg.innholdstittel" />
            </Heading>

            <Heading size="small" level="3" className={bem.element('title')}>
                <FormattedMessage id="psg.section1.tittel" />
            </Heading>
            <ul>
                <FormattedMessage tagName="li" id="psg.section1.liste.punkt1" />
                <FormattedMessage
                    tagName="li"
                    id="psg.section1.liste.punkt2"
                    values={{
                        i: (msg: any) => <i>{msg}</i>,
                    }}
                />
                <FormattedMessage tagName="li" id="psg.section1.liste.punkt3" />
            </ul>
            <Heading size="small" level="3" className={bem.element('title')}>
                <FormattedMessage id="psg.section2.tittel" />
            </Heading>
            <ul>
                <FormattedMessage tagName="li" id="psg.section2.liste.punkt1" />
                <FormattedMessage tagName="li" id="psg.section2.liste.punkt2" />
                <FormattedMessage tagName="li" id="psg.section2.liste.punkt3" />
            </ul>
            <div className={bem.element('examples')}>
                <Heading size="small" level="3" className={bem.element('title')}>
                    <FormattedMessage id="psg.icon.heading" />
                </Heading>
                <div className={bem.element('body')}>
                    <div className={bem.element('cell')}>
                        <PictureScanningExample
                            image={<ScanningIkon status="good" height={svgIconHeight} />}
                            status="suksess"
                            statusText={intlHelper(intl, 'psg.good')}
                            description={intlHelper(intl, 'psg.icon.label.good')}
                        />
                    </div>
                    <div className={bem.element('cell')}>
                        <PictureScanningExample
                            image={<ScanningIkon status="keystone" height={svgIconHeight} />}
                            status="feil"
                            statusText={intlHelper(intl, 'psg.bad')}
                            description={intlHelper(intl, 'psg.icon.label.keystone')}
                        />
                    </div>
                    <div className={bem.element('cell')}>
                        <PictureScanningExample
                            image={<ScanningIkon status="horizontal" height={svgIconHeight} />}
                            status="feil"
                            statusText={intlHelper(intl, 'psg.bad')}
                            description={intlHelper(intl, 'psg.icon.label.horizontal')}
                        />
                    </div>
                    <div className={bem.element('cell')}>
                        <PictureScanningExample
                            image={<ScanningIkon status="shadow" height={svgIconHeight} />}
                            status="feil"
                            statusText={intlHelper(intl, 'psg.bad')}
                            description={intlHelper(intl, 'psg.icon.label.shadow')}
                        />
                    </div>
                </div>
                <Link target="_blank" href={intlHelper(intl, 'psg.lenkepanel.url')}>
                    <FormattedMessage id="psg.lenkepanel.text" />
                </Link>
            </div>
        </div>
    );
};
export default PictureScanningGuide;
