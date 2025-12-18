import { LitElement, html, css } from "lit";

import "@material/web/button/filled-tonal-button.js";
import "@material/web/iconbutton/outlined-icon-button.js";
import "@material/web/button/text-button.js";

import "./journal-form.js";

export class MealJournal extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                font-family: "Roboto", sans-serif;
                height: 100%;
                width: 100%;
            }

            *[hidden] {
                display: none !important;
            }

            .header-bar {
                width: 100%;
                background-color: var(--md-sys-color-on-primary-container);
                height: 20px;
            }

            .title {
                background-color: var(--md-sys-color-primary);
                color: var(--md-sys-color-on-primary);
                display: flex;
                height: 120px;
                align-items: center;
                justify-content: center;
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
            }

            #btnContainer {
                margin: 10px 10px;
                height: 48px;
                width: calc(100% - 20px);
            }

            #tableContainer {
                height: calc(100% - 68px - 140px);
                width: 100%;
            }

            #formContainer {
                height: calc(100% - 140px);
                width: 100%;
            }

            thead th {
                width: 20%;
                color: var(--md-sys-color-on-primary-container);
            }

            thead th:nth-child(n + 6) {
                width: 15%;
            }

            th,
            td {
                padding: 5px;
                color: var(--app-dark-primary-color);
            }

            td {
                text-align: center;
            }

            #form {
                height: 100%;
                width: 100%;
            }

            md-outlined-icon-button {
                --md-outlined-icon-button-outline-color: var(----md-sys-color-on-primary);
            }
        `,
    ];

    static properties = {
        // Controla se o formulário está visível
        insertMode: {
            type: Boolean,
            value: false,
        },
        // Modo atual do formulário (INSERT ou EDIT)
        mode: {
            type: String,
        },
    };

    constructor() {
        super();
        this.insertMode = false;
        this.mode = "INSERT";
    }

    // Executado quando o componente é inserido no DOM
    connectedCallback() {
        super.connectedCallback();

        // Busca os registros existentes
        this.getEntriesList();

        this.addEventListener("show-table", () => {
            this.insertMode = false;
        });

        // Evento disparado após inserir ou editar um registr
        this.addEventListener("add-entry-to-list", (e) => {
            this.addEntryToList(e.detail.data);
        });
    }

    render() {
        return html`
            <header>
                <div class="header-bar"></div>
                <div class="title">
                    <h2>Diário de Introdução Alimentar</h2>
                </div>
            </header>

            <div id="btnContainer" class="left-container" ?hidden="${this.insertMode}">
                <md-filled-tonal-button @click=${this._showForm}>
                    Adicionar Registro
                    <svg slot="icon" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                </md-filled-tonal-button>
            </div>

            <!-- Tabela de registros -->
            <div id="tableContainer" class="container" ?hidden="${this.insertMode}">
                <table id="table" class="table">
                    <thead>
                        <th>Data</th>
                        <th>Lanche Manhã</th>
                        <th>Almoço</th>
                        <th>Lanche Tarde</th>
                        <th>Jantar</th>
                        <th></th>
                        <th></th>
                    </thead>
                </table>
            </div>

            <!-- Formulário de cadastro/edição -->
            <div id="formContainer" ?hidden="${!this.insertMode}">
                <journal-form id="form"></journal-form>
            </div>
        `;
    }

     // Exibe o formulário através da flag insertMode
    _showForm() {
        this.insertMode = true;
    }

    // Busca a lista de registros no backend
    getEntriesList() {
        let url = "http://127.0.0.1:5000/listar_diarios";
        fetch(url, {
            method: "get",
        })
            .then((response) => response.json())
            .then((data) => {
                // Ordena os registros por data (mais recente primeiro)
                const entries = data["diarios"].sort((entryA, entryB) => {
                    const dateA = new Date(entryA.data_registro);
                    const dateB = new Date(entryB.data_registro);
                    return  dateB - dateA ;
                });

                // Prepara os dados para a tabela
                entries.forEach((entry) => {
                    let entryData = {};
                    let date = new Date(entry.data_registro);
                    date = date.toISOString();
                    date = date.toString().substring(0, 10);

                    entryData.date = date;
                    entryData.mealIdx = entry.refeicoes.reduce((acc, item) => {
                        acc[item.tipo] = item;
                        return acc;
                    }, {});

                    this.addEntryToList(entryData);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }


    // Adiciona ou atualiza uma linha na tabela
    addEntryToList(entryData) {
        const meals = ["LANCHE_MANHA", "ALMOCO", "LANCHE_TARDE", "JANTAR"];
        const mealIdx = entryData["mealIdx"];
        const date = entryData["date"];

        const table = this.shadowRoot.getElementById("table");

        // Remove linha existente em caso de edição
        if (this.mode === "EDIT") {
            const row = this.shadowRoot.getElementById(`${date}_Row`);
            if (row) {
                row.remove();
            }
        }

        // Cria nova linha
        const row = table.insertRow();
        row.id = `${date}_Row`;

        // Botões de ação
        this.insertRemoveButton(row.insertCell(-1), date);
        this.insertEditButton(row.insertCell(-1), date);


        // Insere as colunas da tabela
        let cell = row.insertCell(0);
        cell.textContent = date;

        for (let i = 1; i <= meals.length; i++) {
            let cell = row.insertCell(i);
            if (mealIdx[meals[i - 1]] !== undefined) {
                cell.textContent = "OK";
            } else {
                cell.textContent = "-";
            }
        }
    }

    // Cria um SVG dinamicamente
    createSVGElement(path) {
        const svgNamespace = "http://www.w3.org/2000/svg";

        const svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("viewBox", "0 0 24 24");

        const pathElement = document.createElementNS(svgNamespace, "path");
        pathElement.setAttribute("d", path);

        svg.appendChild(pathElement);

        return svg;
    }

    // Insere botão de remover
    insertRemoveButton(parent, date) {
        const removeBtn = document.createElement("md-outlined-icon-button");
        removeBtn.setAttribute("date", date);
        const svg = this.createSVGElement("M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z");

        removeBtn.appendChild(svg);
        parent.appendChild(removeBtn);

        removeBtn.onclick = () => this.removeEntryFromList(date);
    }

    // Insere botão de editar
    insertEditButton(parent, date) {
        const editBtn = document.createElement("md-outlined-icon-button");
        editBtn.setAttribute("date", date);

        const svg = this.createSVGElement(
            "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
        );

        editBtn.appendChild(svg);
        parent.appendChild(editBtn);

        editBtn.onclick = () => this.editEntryFromList(date);
    }

    // Remove registro da tabela e  faz requisição de remove para o backend
    removeEntryFromList(entryDate) {
        const row = this.shadowRoot.getElementById(`${entryDate}_Row`);

        if (!row) {
            return;
        }

        if (confirm("Deseja remover o registro?")) {
            row.remove();
            this.removeEntry(entryDate);
        }
    }

     // Busca dados do registro e abre o formulário em modo edição
    editEntryFromList(entryDate) {
        const url = `http://127.0.0.1:5000/buscar_diario?data_registro=${entryDate}`;
        fetch(url, {
            method: "get",
        })
            .then((response) => response.json())
            .then((data) => {
                let entryData = {};
                let date = new Date(data.data_registro);
                date = date.toISOString();
                date = date.toString().substring(0, 10);
                entryData.date = date;

                entryData.date = date;
                entryData.mealIdx = data.refeicoes.reduce((acc, item) => {
                    acc[item.tipo] = item;
                    return acc;
                }, {});

                this.mode = "EDIT";

                this._showForm();
                this.setFormData(entryData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    // Requisição de remoção de registro para o backend
    removeEntry(entryDate) {
        let url = `http://127.0.0.1:5000/deletar_diario?data_registro=${entryDate}`;
        fetch(url, {
            method: "delete",
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error:", error);
            });
    }

     // Envia dados e seta modo (edit/insert) do formulário
    setFormData(entryData) {
        const formElement = this.shadowRoot.getElementById("form");

        if (formElement) {
            formElement.setFormData(entryData);
            formElement.setFormMode(this.mode);
        }
    }
}
customElements.define("meal-journal", MealJournal);
