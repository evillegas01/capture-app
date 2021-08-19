// @flow
import type {
    AddTemplate,
    CancelLoadView,
    CancelUpdateList,
    Categories,
    ColumnConfigs,
    DeleteTemplate,
    LoadedContext,
    LoadView,
    SelectTemplate,
    UnloadingContext,
    UpdateList,
    UpdateTemplate,
    WorkingListTemplates,
    WorkingListTemplate,
    WorkingListsOutputProps,
} from '../workingListsBase.types';
import type {
    ChangePage,
    ChangeRowsPerPage,
    ClearFilter,
    DataSource,
    CustomRowMenuContents,
    FiltersData,
    SelectRestMenuItem,
    SelectRow,
    SetColumnOrder,
    Sort,
    StickyFilters,
    UpdateFilter,
} from '../../../ListView';

type ExtractedProps = $ReadOnly<{|
    categories?: Categories,
    columns: ColumnConfigs,
    currentPage?: number,
    currentTemplate?: WorkingListTemplate,
    currentViewHasTemplateChanges?: boolean,
    customRowMenuContents?: CustomRowMenuContents,
    customUpdateTrigger?: any,
    dataSource?: DataSource,
    filters?: FiltersData,
    forceUpdateOnMount?: boolean,
    loadedContext?: LoadedContext,
    loading: boolean,
    loadViewError?: string,
    onAddTemplate?: AddTemplate,
    onCancelLoadView?: CancelLoadView,
    onCancelUpdateList?: CancelUpdateList,
    onChangePage: ChangePage,
    onChangeRowsPerPage: ChangeRowsPerPage,
    onClearFilter: ClearFilter,
    onDeleteTemplate?: DeleteTemplate,
    onLoadView: LoadView,
    onUpdateFilter: UpdateFilter,
    onSelectListRow: SelectRow,
    onSelectRestMenuItem: SelectRestMenuItem,
    onSelectTemplate: SelectTemplate,
    onSetListColumnOrder: SetColumnOrder,
    onSortList: Sort,
    onUnloadingContext?: UnloadingContext,
    onUpdateList: UpdateList,
    onUpdateTemplate?: UpdateTemplate,
    orgUnitId: string,
    rowsPerPage?: number,
    sortByDirection?: string,
    sortById?: string,
    stickyFilters?: StickyFilters,
    updating: boolean,
    updatingWithDialog: boolean,
    templates?: WorkingListTemplates,
    viewPreloaded?: boolean,
|}>;

type OptionalExtractedProps = {|
    categories: Categories,
    currentPage: number,
    currentTemplate: WorkingListTemplate,
    currentViewHasTemplateChanges: boolean,
    customRowMenuContents: CustomRowMenuContents,
    customUpdateTrigger: any,
    dataSource: DataSource,
    filters: FiltersData,
    forceUpdateOnMount: boolean,
    loadedContext: LoadedContext,
    loadViewError: string,
    onCancelLoadView: CancelLoadView,
    onCancelUpdateList: CancelUpdateList,
    onUnloadingContext: UnloadingContext,
    rowsPerPage: number,
    sortByDirection: string,
    sortById: string,
    stickyFilters: StickyFilters,
    templates: WorkingListTemplates,
    viewPreloaded: boolean,
|};

type RestProps = $Rest<WorkingListsOutputProps & OptionalExtractedProps,
    ExtractedProps & OptionalExtractedProps>;

export type Props = $ReadOnly<{|
    ...WorkingListsOutputProps,
|}>;

export type ContextBuilderOutputProps = $ReadOnly<{|
    ...RestProps,
    dirtyTemplates: boolean,
    loadedProgramIdForTemplates?: string,
    templates?: WorkingListTemplates,
|}>;