import { LitElement, html, css } from 'lit';

export class MealJournal extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`
        <h1>Diar</h1>`;
    }
}
customElements.define('meal-journal', MealJournal);
