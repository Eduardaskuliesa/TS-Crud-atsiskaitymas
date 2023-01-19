export type Option = {
    text: string,
    value: string,
};

type SelectFieldProps = {
    options: Option[],
};

class SelectField {
    public htmlElement: HTMLElement;

    public options: SelectFieldProps['options'];

    public constructor({ options }: SelectFieldProps) {
        this.htmlElement = document.createElement('select');
        this.options = options;
        this.intialize();
    }

    private intialize() {
        const optionStr = this.options
        .map(({ text, value }) => `<option value="${value}">${text}</option>`)
        .join('');

        this.htmlElement.className = 'form-select';
        this.htmlElement.innerHTML = optionStr;
    }
}
export default SelectField;
