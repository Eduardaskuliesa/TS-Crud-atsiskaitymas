type RowData = {
    id: string,
    [key: string]: string,
};

export type TableProps<Type> = {
    title: string,
    columns: Type,
    rowsData: Type[],
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
        const headersRowHtmlString = headersArray.map((header) => `<th>${header}</th>`).join('');

        this.thead.innerHTML = `
          <tr>
            <th colspan="${headersArray.length}" class=" thead-dark text-center h3 bg-dark text-light">${title}</th>
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

            return rowHtmlElement;
          });

        this.tbody.append(...rowsHtmlElements);
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
