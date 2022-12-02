// @flow
import React, { type ComponentType } from 'react';
import i18n from '@dhis2/d2-i18n';
import { Radio, colors, spacers, spacersNum } from '@dhis2/ui';
import { withStyles } from '@material-ui/core';
import { mainOptionTranslatedTexts, referralStatus } from '../constants';
import { DataSection } from '../../DataSection';

type Props = {|
    type: string,
    ...CssClasses
|}

const styles = () => ({
    wrapper: {
        padding: `${spacers.dp8}`,
    },
    fieldWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: `${spacers.dp8}  ${spacers.dp16}`,
    },
    fieldLabel: {
        color: colors.grey900,
        flexGrow: 0,
        flexShrink: 0,
        paddingTop: spacersNum.dp16,
        paddingRight: spacersNum.dp16,
    },
    fieldContent: {
        flexGrow: 1,
        flexShrink: 0,
    },
});

export const ReferralActionsPlain = ({ classes, type }: Props) => {
    const [selectedAction, setSelectedAction] = React.useState();
    return (<DataSection
        dataTest="referral-section"
        sectionName={i18n.t('Referral actions')}
    >
        <div className={classes.wrapper}>
            {type === referralStatus.REFERRABLE ? Object.keys(mainOptionTranslatedTexts).map(key => (
                <Radio
                    key={key}
                    name={`referral-action-${key}`}
                    checked={key === selectedAction}
                    label={mainOptionTranslatedTexts[key]}
                    onChange={(e: Object) => setSelectedAction(e.value)}
                    value={key}
                />
            )) : null}
            {type === referralStatus.AMBIGUOUS_REFERRALS ?
                <div>{i18n.t('Ambigous referrals, contact system administrator')}</div>
                : null
            }
        </div>
    </DataSection>);
};

export const ReferralActions: ComponentType<$Diff<Props, CssClasses>> = withStyles(styles)(ReferralActionsPlain);
