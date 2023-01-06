// @flow
import React, { Component, type ComponentType } from 'react';
import { compose } from 'redux';
import { QuickSelector } from './QuickSelector/QuickSelector.component';
import { DiscardDialog } from '../Dialogs/DiscardDialog.component';
import { defaultDialogProps, savingInProgressDialogProps } from '../Dialogs/DiscardDialog.constants';
import type { Props, State } from './ScopeSelector.types';
import { withLoadingIndicator } from '../../HOC';

class ScopeSelectorClass extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            openOrgUnitWarning: false,
            openProgramWarning: null,
            openCatComboWarning: false,
            categoryIdToReset: '',
        };
    }

    shouldShowWarning = () => this.props.isUserInteractionInProgress && !this.props.isSavingInProgress;

    handleOpenOrgUnitWarning = () => {
        if (this.shouldShowWarning()) {
            this.setState({ openOrgUnitWarning: true });
            return;
        }
        this.props.onResetOrgUnitId();
    }

    handleOpenProgramWarning = (baseAction: ReduxAction<any, any>) => {
        if (this.shouldShowWarning()) {
            this.setState({ openProgramWarning: baseAction });
            return;
        }
        this.props.onResetProgramId(baseAction);
    }

    handleOpenCatComboWarning = (categoryId: string) => {
        if (this.shouldShowWarning()) {
            this.setState({ openCatComboWarning: true, categoryIdToReset: categoryId });
            return;
        }
        this.props.onResetCategoryOption && this.props.onResetCategoryOption(categoryId);
    }

    handleClose = () => {
        this.setState({
            openOrgUnitWarning: false,
            openProgramWarning: null,
            openCatComboWarning: false,
        });
    }

    handleAcceptOrgUnit = () => {
        this.props.onResetOrgUnitId();
        this.handleClose();
    }

    handleAcceptProgram = () => {
        if (this.state.openProgramWarning) {
            this.props.onResetProgramId(this.state.openProgramWarning);
        }
        this.handleClose();
    }

    handleAcceptCatCombo = () => {
        this.props.onResetCategoryOption && this.props.onResetCategoryOption(this.state.categoryIdToReset);
        this.handleClose();
    }

    render() {
        const { onSetOrgUnit, onSetProgramId, onSetCategoryOption, onResetAllCategoryOptions } = this.props;
        console.log({ props: this.props, state: this.state });
        return (
            <div data-test={'scope-selector'}>
                <QuickSelector
                    onSetOrgUnit={onSetOrgUnit}
                    onSetProgramId={onSetProgramId}
                    onSetCategoryOption={onSetCategoryOption}
                    onResetAllCategoryOptions={onResetAllCategoryOptions}
                    onResetOrgUnitId={this.handleOpenOrgUnitWarning}
                    onResetProgramId={this.handleOpenProgramWarning}
                    onResetCategoryOption={this.handleOpenCatComboWarning}
                    previousOrgUnitId={this.props.previousOrgUnitId}
                    selectedOrgUnitId={this.props.selectedOrgUnitId}
                    selectedProgramId={this.props.selectedProgramId}
                    selectedOrgUnit={this.props.selectedOrgUnit}
                    selectedCategories={this.props.selectedCategories}
                >
                    {this.props.children}
                </QuickSelector>
                <DiscardDialog
                    onDestroy={this.handleAcceptOrgUnit}
                    open={this.state.openOrgUnitWarning}
                    onCancel={this.handleClose}
                    {...defaultDialogProps}
                />
                <DiscardDialog
                    onDestroy={this.handleAcceptProgram}
                    open={!!this.state.openProgramWarning}
                    onCancel={this.handleClose}
                    {...defaultDialogProps}
                />
                <DiscardDialog
                    onDestroy={this.handleAcceptCatCombo}
                    open={this.state.openCatComboWarning}
                    onCancel={this.handleClose}
                    {...defaultDialogProps}
                />
            </div>
        );
    }
}

export const ScopeSelectorComponent: ComponentType<$Diff<Props, CssClasses>> = compose(
    withLoadingIndicator(() => ({ height: '100px' })),
)(ScopeSelectorClass);
