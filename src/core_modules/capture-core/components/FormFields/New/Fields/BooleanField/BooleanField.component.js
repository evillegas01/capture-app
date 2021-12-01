// @flow
import { colors } from '@dhis2/ui';
import { withStyles } from '@material-ui/core/styles';
import { BooleanField as UIBooleanField } from 'capture-ui';
import * as React from 'react';

const getStyles = (theme: Theme) => ({
    iconSelected: {
        fill: theme.palette.secondary.main,
    },
    iconDeselected: {
        fill: colors.grey700,
    },
    iconDisabled: {
        fill: 'rgba(0,0,0,0.30)',
    },
    focusSelected: {
        backgroundColor: 'rgba(0, 121, 107, 0.4)',
    },
});

type Props = {
    onBlur: (value: any, event: any) => void,
};

class BooleanFieldPlain extends React.Component<Props> {
    render() {
        const { onBlur, ...passOnProps } = this.props;
        return (
            // $FlowFixMe[cannot-spread-inexact] automated comment
            <UIBooleanField
                onSelect={onBlur}
                {...passOnProps}
            />
        );
    }
}

export const BooleanField = withStyles(getStyles)(BooleanFieldPlain);
