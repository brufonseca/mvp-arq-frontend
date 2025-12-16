import { LitElement, html, css, svg } from "lit";

import "@material/web/iconbutton/filled-icon-button.js";
import "@material/web/iconbutton/filled-tonal-icon-button.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/switch/switch.js";

import "./form-meal-item.js";

const MEAL_TYPE = {
    morningSnack: {
        ptType: "LANCHE_MANHA",
        ptLabel: "Lanche Manhã",
    },
    lunch: {
        ptType: "ALMOCO",
        ptLabel: "Almoço",
    },
    afternoonSnack: {
        ptType: "LANCHE_TARDE",
        ptLabel: "Lanche Tarde",
    },
    dinner: {
        ptType: "JANTAR",
        ptLabel: "Jantar",
    },
};

const chevronUpSvg = svg`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-up</title><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" fill="#354479" /></svg>
`;

const chevronDownSvg = svg`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" fill="#354479"/></svg>
`;

const MEAL_LABELS = {
    morningSnack: "Lanche Manhã",
    lunch: "ALMOCO",
    afternoonSnack: "LANCHE_TARDE",
    dinner: "JANTAR",
};

const TIPO_REFEICAO = {
    LANCHE_MANHA: "morningSnack",
    ALMOCO: "lunch",
    LANCHE_TARDE: "afternoonSnack",
    JANTAR: "dinner",
};

export class JournalForm extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                font-family: "Roboto", sans-serif;
            }

            .form-title {
                padding: 8px;
                background-color: var(--md-sys-color-primary-container);
                color: var(--md-sys-color-on-primary-container);
                display: flex;
                height: 64px;
                align-items: center;
                justify-content: space-between;
                flex-direction: row;
            }

            .spacer {
                width: 74px;
            }

            .center-text {
                text-align: center;
            }

            .left-container {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-end;
                align-items: center;
                gap: 12px;
            }

            #tableContainer {
                height: calc(100% - 68px - 140px);
                width: 100%;
            }

            #formContainer {
                display: flex;
                flex-direction: column;
                align-items: center;
                place-content: center space-evenly;
                gap: 8px;
                margin-top: 12px;
                height: calc(100% - 92px);
                overflow-y: auto;
                justify-content: flex-start;
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

            .switch-container {
                display: flex;
                flex-direction: row;
                align-content: center;
                align-items: center;
                justify-content: flex-start;
                gap: 24px;
                width: 380px;
            }

            md-switch {
                --md-switch-track-width: 44px;
                --md-switch-track-height: 24px;
                --md-switch-selected-handle-color: var(--md-sys-color-on-surface);
                /* --md-switch-selected-track-color  */
            }

            .meals-container {
                display: flex;
                flex-direction: column;
                align-content: center;
                justify-content: space-evenly;
                align-items: flex-start;
                gap: 12px;
            }

            *[hidden] {
                display: none !important;
            }

            .primary-scroll {
                scrollbar-color: var(--md-sys-color-primary-container) var(--md-sys-color-surface-tint);
                scrollbar-width: thin;
            }

            .primary-scroll::-webkit-scrollbar {
                width: 5px;
            }

            .primary-scroll::-webkit-scrollbar-thumb {
                background: var(--md-sys-color-surface-tint);
            }

            h4 {
                width: 380px;
            }
        `,
    ];

    static properties = {
        insertMode: {
            type: Boolean,
            value: false,
        },
        mode: {
            type: String,
        },
    };

     constructor() {
        super();
        this.insertMode = false;
        this.mode = "INSERT";
    }

    render() {
        let mealTemplates = [];

        for (const mealType of Object.keys(MEAL_TYPE)) {
            let template = html`
                <div class="switch-container">
                    <label for="${mealType}Switch">${MEAL_TYPE[mealType].ptLabel}</label>
                    <md-switch id="${mealType}Switch" meal="${mealType}" @change=${this._computeItemsVisibility}></md-switch>
                    <div id="${mealType}Btns" class="action-btn-container" hidden>
                        <md-filled-tonal-icon-button id="${mealType}HideBtn" @click=${this._toggleItem} meal="${mealType}"> ${chevronUpSvg} </md-filled-tonal-icon-button>

                        <md-filled-tonal-icon-button id="${mealType}ShowBtn" @click=${this._toggleItem} meal="${mealType}" hidden> ${chevronDownSvg} </md-filled-tonal-icon-button>

                        <md-filled-tonal-icon-button id="${mealType}ResetBtn" @click=${this._resetItem} meal="${mealType}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>eraser</title>
                                <path
                                    d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z"
                                    fill="#354479"
                                />
                            </svg>
                        </md-filled-tonal-icon-button>
                    </div>
                </div>

                <form-meal-item id="${mealType}Item" meal="${mealType}" hidden></form-meal-item>
            `;

            mealTemplates.push(template);
        }

        return html`
            <div class="form-title center-text">
                <span class="spacer"></span>
                <h3>Novo Registro</h3>
                <div class="left-container">
                    <md-filled-icon-button @click=${this._commitOperation}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>content-save</title>
                            <path
                                d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"
                                fill="#ffffff"
                            />
                        </svg>
                    </md-filled-icon-button>

                    <md-filled-icon-button @click=${this._resetForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>close</title>
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" fill="#ffffff" />
                        </svg>
                    </md-filled-icon-button>
                </div>
            </div>
            <div id="formContainer" class="form primary-scroll">
                <md-outlined-text-field id="entryDate" value="" type="date" required placeholder="Data"> </md-outlined-text-field>

                <h4 class="primary-color">Refeições Oferecidas</h4>

                <div class="meals-container">${mealTemplates}</div>
            </div>
        `;
    }

    _commitOperation(e){

        const data = this._processEntry();

        if(data === undefined){
            return;
        }


        this.dispatchEvent(
            new CustomEvent("add-entry-to-list", {
                bubbles: true,
                composed: true,
                detail: { data: data}
            })
        );

        this.postEntry(data);
        this._resetForm();

        
    }

    _processEntry() {
        const dateInput = this.shadowRoot.getElementById("entryDate");
        const dateValue = dateInput?.value;

        if (!dateValue) {
            alert("A data é obrigatória!");
            return;
        }

        let data = {};
        data["date"] = dateValue;

        let mealIdx = {};
        let hasMeal = false;

        this.shadowRoot.querySelectorAll("md-switch").forEach((element) => {
            if (element.selected) {
                hasMeal = true;

                const mealType = element.getAttribute("meal");
                const mealTypeItem = this.shadowRoot.getElementById(`${mealType}Item`);

                if (!mealTypeItem) {
                    alert("Erro ao salvar dados!");
                    return;
                }


                let meal = {
                    tipo: MEAL_TYPE[mealType].ptType,
                    ...mealTypeItem.getData(),
                };

                mealIdx[MEAL_TYPE[mealType].ptType] = meal;
            }
        });

        if (!hasMeal) {
            alert("É preciso inserir uma refeição!");
            return;
        }

        data["mealIdx"] = mealIdx;


       return data;
    }

    _resetForm() {
        const entryDateElement = this.shadowRoot.getElementById("entryDate");
        entryDateElement.value = "";
        entryDateElement.removeAttribute("disabled");

        this.shadowRoot.querySelectorAll("md-switch").forEach((element) => {
            if (element.selected) {
                element.selected = false;
                this.doToggleItemForMealElement(element.getAttribute("meal"));
                this.doComputeItemsVisibility(element.getAttribute("meal"));

                const mealTypeItem = this.shadowRoot.getElementById(`${element.getAttribute("meal")}Item`);
                mealTypeItem?.resetData();
            }
        });

        this.dispatchEvent(
            new CustomEvent("show-table", {
                bubbles: true,
                composed: true,
            })
        );
    }

    _computeItemsVisibility(e) {
        const mealType = e.target.getAttribute("meal");
        this.doComputeItemsVisibility(mealType);
    }

    doComputeItemsVisibility(mealType) {
        const mealTypeSwitch = this.shadowRoot.getElementById(`${mealType}Switch`);

        const mealTypeItem = this.shadowRoot.getElementById(`${mealType}Item`);
        const mealTypeBtns = this.shadowRoot.getElementById(`${mealType}Btns`);

        if (mealTypeSwitch?.selected) {
            mealTypeItem?.removeAttribute("hidden");
            mealTypeBtns?.removeAttribute("hidden");
        } else {
            mealTypeItem?.setAttribute("hidden", null);
            mealTypeBtns?.setAttribute("hidden", null);
        }
    }

    _resetItem(e) {
        const mealType = e.target.getAttribute("meal");

        const mealTypeItem = this.shadowRoot.getElementById(`${mealType}Item`);
        mealTypeItem?.resetData();
    }

    setFormMode(mode){
        this.mode = mode;
    }

    setFormData(entryData) {
        const entryDateInput = this.shadowRoot.getElementById("entryDate");

        if (entryDateInput) {
            entryDateInput.value = entryData.date;
            entryDateInput.setAttribute("disabled", null);
        }

        for (const meal of Object.keys(entryData.mealIdx)) {
            const mealData = entryData.mealIdx[meal];
            let mealType = TIPO_REFEICAO[meal];

            const mealTypeSwitch = this.shadowRoot.getElementById(`${mealType}Switch`);
            mealTypeSwitch.selected = true;

            const mealTypeItem = this.shadowRoot.getElementById(`${mealType}Item`);
            mealTypeItem.setData(mealData);

            this.doToggleItemForMealElement(mealType);
            this.doComputeItemsVisibility(mealType);
        }
    }

    _toggleItem(e) {
        const mealType = e.target.getAttribute("meal");
        this.doToggleItemForMealElement(mealType);
    }

    doToggleItemForMealElement(mealType) {
        const hideBtn = this.shadowRoot.getElementById(`${mealType}HideBtn`);
        const showBtn = this.shadowRoot.getElementById(`${mealType}ShowBtn`);
        const mealTypeItem = this.shadowRoot.getElementById(`${mealType}Item`);

        hideBtn?.toggleAttribute("hidden");
        showBtn?.toggleAttribute("hidden");
        mealTypeItem?.toggleAttribute("hidden");
    }

    postEntry(entry) {

        let data = {
            data_registro: entry["date"],
            refeicoes: Object.values(entry["mealIdx"]),
        };


        let method =  "post";

        let url = "http://127.0.0.1:5000/inserir_diario";

        if (this.mode === "EDIT") {
            url = "http://127.0.0.1:5000/editar_diario";
            method =  "put";
        }



        fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then((response) => response.json())
            .then((data) => console.debug(data))
            .catch((error) => {
                console.error("Error:", error);
            });
    }
}
customElements.define("journal-form", JournalForm);
