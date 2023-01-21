export type RowData = {
    id: string,
    [key: string]: string,
};

export type TableProps<Type extends RowData> = {
    title: string,
    columns: Type,
    rowsData: Type[],
    onDelete: (id: string) => void,
};

class Table<Type extends RowData> {
    public htmlElement: HTMLTableElement;

    private props : TableProps<Type>;

    private tbody : HTMLTableSectionElement;

    private thead : HTMLTableSectionElement;

    constructor(props: TableProps<Type>) {
        this.props = props;
        this.htmlElement = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');

        this.initalize();
        this.renderView();
    }

    private initalize = ():void => {
      this.htmlElement.className = 'table table-striped order border p-3';
      this.htmlElement.append(
          this.thead,
          this.tbody,
      );
  };

    private renderView = (): void => {
      this.renderHeadView();
      this.renderBodyView();
    };

    private renderHeadView = (): void => {
        const { title, columns } = this.props;

        const headersArray = Object.values(columns);
        const headersRowHtmlString = `${headersArray
        .map((header) => `<th>${header}</th>`)
        .join('')}<th></th>`;

        this.thead.innerHTML = `
          <tr>
            <th colspan="${headersArray.length + 1}" class=" thead-dark text-center h3 bg-dark text-light">${title}</th>
          </tr>
          <tr class ="bg-dark text-light"> ${headersRowHtmlString}
          </tr>
        `;
      };

      private renderBodyView = (): void => {
        const { rowsData, columns } = this.props;

        this.tbody.innerHTML = '';
        const rowsHtmlElements = rowsData
          .map((rowData) => {
            const rowHtmlElement = document.createElement('tr');

            const cellsHtmlString = Object.keys(columns)
              .map((key) => `<td>${rowData[key]}</td>`)
              .join(' ');

            rowHtmlElement.innerHTML = cellsHtmlString;

            this.addActionsCell(rowHtmlElement, rowData.id);

            return rowHtmlElement;
          });

        this.tbody.append(...rowsHtmlElements);
      };

      private addActionsCell = (rowHtmlElement: HTMLTableRowElement, id: string): void => {
        const { onDelete } = this.props;

        const buttonCell = document.createElement('td');

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.innerHTML = '✕';
        deleteButton.className = 'btn btn-danger';
        deleteButton.addEventListener('click', () => onDelete(id));

        buttonCell.append(deleteButton);
        rowHtmlElement.append(buttonCell);
      };

    public updateProps = (newProps: Partial<TableProps<Type>>): void => {
      this.props = {
        ...this.props,
        ...newProps,
      };
      this.renderView();
    };
}
export default Table;
