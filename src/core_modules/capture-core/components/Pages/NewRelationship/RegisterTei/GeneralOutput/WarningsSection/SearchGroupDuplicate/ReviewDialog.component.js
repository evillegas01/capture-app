// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import ReviewDialogContents from './ReviewDialogContents.container';

type Props = {
    open: boolean,
    onCancel: () => void,
    onLink: Function,
    extraActions?: ?React.Node,
};

const StyledDialogActions = withStyles({
    root: { margin: '0px 24px 24px' },
})(DialogActions);

class ReviewDialog extends React.Component<Props > {
    static paperProps = {
        style: {
            maxHeight: 'calc(100% - 100px)',
        },
    };

    render() {
        const { open, onCancel, onLink, extraActions } = this.props;

        return (
            <Dialog
                open={open}
                onClose={onCancel}
                maxWidth={false}
                style={{ width: 'auto' }}
                PaperProps={ReviewDialog.paperProps}
            >
                <ReviewDialogContents
                    onLink={onLink}
                />
                <StyledDialogActions>
                    {extraActions}
                </StyledDialogActions>
            </Dialog>
        );
    }
}

export default ReviewDialog;
