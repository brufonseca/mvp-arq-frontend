import { LitElement, html, css } from "lit";

import "@material/web/radio/radio.js";
import "@material/web/textfield/outlined-text-field.js";


const MEAL_METHOD = [
    { type: "BLW", label: "BLW" },
    { type: "PARTICIPATIVO", label: "Participativo" },
    { type: "TRADICIONAL", label: "Tradicional" },
];

const MEAL_ACCEPTANCE = [
    { type: "OTIMO", label: "Ótimo" },
    { type: "BOM", label: "Bom" },
    { type: "REGULAR", label: "Regular" },
    { type: "RECUSOU", label: "Recusou" },
];

const MEAL_RATING = [
    { type: "SUCESSO", label: "Sucesso" },
    { type: "OK", label: "Bom" },
    { type: "CAOS", label: "Caos" },
];

export class FormMealItem extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                font-family: "Roboto", sans-serif;
            }

            md-outlined-text-field {
                --md-outlined-text-field-label-text-color: var(--md-sys-color-primary);
                --md-outlined-text-field-input-text-color: var(--md-sys-color-primary);
                --md-outlined-field-content-font: var(--md-sys-color-primary);
                --md-outlined-field-focus-content-color: var(--md-sys-color-primary);
                --md-outlined-field-hover-content-color: var(--md-sys-color-primary);
                --md-outlined-field-hover-label-text-color: var(--md-sys-color-primary);
                --md-outlined-field-hover-outline-color: var(--md-sys-color-primary);
                --md-outlined-text-field-hover-input-text-color: var(--md-sys-color-primary);
                --md-filled-text-field-input-text-font: "Roboto", sans-serif;
                --md-filled-text-field-label-text-font: "Roboto", sans-serif;
                width: 380px;
            }

            .radio-container {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
        `,
    ];

    static properties = {
        meal: { type: String, attribute: "meal" },
    };

    render() {
        return html`
            <h4>Método</h4>
            <div class="radio-container">
                ${MEAL_METHOD.map(
                    (item) => html`
                        <div>
                            <md-radio id="${item.type}" name="metodo" value="${item.type}"></md-radio>
                            <label for="${item.type}">${item.label}</label>
                        </div>
                    `
                )}
            </div>

            <h4>Aceitação</h4>
            <div class="radio-container">
                ${MEAL_ACCEPTANCE.map(
                    (item) => html`
                        <div>
                            <md-radio id="${item.type}" name="aceitacao" value="${item.type}"></md-radio>
                            <label for="${item.type}">${item.label}</label>
                        </div>
                    `
                )}
            </div>

            <h4>Avaliação Geral</h4>

            <div class="radio-container">
                ${MEAL_RATING.map(
                    (item) => html`
                        <div>
                            <md-radio id="${item.type}" name="avaliacao" value="${item.type}"></md-radio>
                            <label for="${item.type}">${item.label}</label>
                        </div>
                    `
                )}
            </div>

            <h4>Comentários</h4>

            <md-outlined-text-field id="comments" value="" type="textarea" rows="5" cols="60" name="comentarios"> </md-outlined-text-field>
        `;
    }

    getData() {
        let data = {};

        const radioElements = this.shadowRoot.querySelectorAll("md-radio");
        let radioElemensList = [...radioElements];
        radioElemensList = radioElemensList.filter((element) => element.checked);
        
        const commentsElement = this.shadowRoot.querySelectorAll("md-outlined-text-field");

        const elements = [...radioElements, ...commentsElement];

        elements.forEach((element) => {
            data[element.name] = element.value;
        });

        return data;
    }

    setData(data) {
        for (const attr of Object.keys(data)) {
            const value = data[attr];


            if (attr === "comentarios") {
                const textElement = this.shadowRoot.querySelector(`md-outlined-text-field`);
                if (textElement !== null) {
                    textElement.value = value;
                }

                continue;
            }
            const element = this.shadowRoot.querySelector(`md-radio[name=${attr}][value=${value}]`);
            if (element !== null) {
                element.checked = true;
            }
        }
    }

    resetData() {
        const radioElements = this.shadowRoot.querySelectorAll("md-radio");
        const commentsElement = this.shadowRoot.querySelectorAll("md-outlined-text-field");

        for (let element of radioElements) {
            element.checked = false;
        }

        for (let element of commentsElement) {
            element.value = "";
        }
    }
}
customElements.define("form-meal-item", FormMealItem);
