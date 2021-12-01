// @flow
import i18n from '@dhis2/d2-i18n';
import Table from '@material-ui/core/Table';


import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import update from 'react-addons-update';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


import { DragDropListItem } from './DragDropListItem.component';

type Props = {
    listItems: Array<Object>,
    handleUpdateListOrder: (sortedList: Array<Object>) => void,
    handleToggle: (id: string) => () => void,
};

export class DragDropList extends Component<Props> {
    moveListItem: (dragIndex: any, hoverIndex: any) => void;
    constructor(props: Props) {
        super(props);
        this.moveListItem = this.moveListItem.bind(this);
    }

    moveListItem(dragIndex: any, hoverIndex: any) {
        const { listItems } = this.props;
        const dragListItem = listItems[dragIndex];
        let sortedList = [];
        sortedList = update(listItems, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragListItem],
            ],
        });

        this.props.handleUpdateListOrder(sortedList);
    }

    render() {
        const { listItems } = this.props;

        return (
            <DndProvider backend={HTML5Backend}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={12}>{i18n.t('Column')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listItems.map((item, i) => (
                            <DragDropListItem
                                key={item.id}
                                index={i}
                                id={item.id}
                                text={item.header}
                                moveListItem={this.moveListItem}
                                handleToggle={this.props.handleToggle}
                                visible={item.visible}
                            />
                        ))}
                    </TableBody>
                </Table>
            </DndProvider>
        );
    }
}
