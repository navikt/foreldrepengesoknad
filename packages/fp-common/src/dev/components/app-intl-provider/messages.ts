import commonMessagesNb from 'common/i18n/common.nb.json';
import commonMessagesNn from 'common/i18n/common.nn.json';

const bokmålstekster = {
    ...commonMessagesNb,
};
const nynorsktekster = {
    ...commonMessagesNn,
};

export const appMessages = {
    nb: bokmålstekster,
    nn: nynorsktekster,
};
