import { LitElement, html, css } from 'lit';

import "@material/web/button/filled-tonal-button.js"

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

            .container {
                /* width: calc(100% - 20px);
                height: calc( 100% - ;
                padding: 0 10px; */
            }

            .left-container {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-end;
                align-items: center;
            }

            #btnContainer{
                margin: 10px 10px;
                height: 48px;
                width: calc(100% - 20px);
            }

            #tableContainer{
                height: calc(100% - 68px - 140px);
                width: 100%;
            }

            #formContainer{
                height: calc(100% - 140px);
                width: 100%;
            }


            thead th {
                width: 20%;
                color:var(--md-sys-color-on-primary-container);

            }

            thead th:nth-child(n+6) {
                width: 15%;
            }

            th,
            td {
                padding: 5px;
                color: var(--app-dark-primary-color)
            }

            td {
                text-align: center;
            }

            
        `
    ];

    static properties = {
        insertMode:{
            type: Boolean,
            value: false
        }

    };

    constructor(){
        super();
        this.insertMode = false;
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
                <svg slot="icon" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>
            </md-filled-tonal-button>
        
        </div>

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

        <div id="formContainer" ?hidden="${!this.insertMode}">
            <journal-form></journal-form>
        </div>
        
        
        `;
    }

    _showForm(){
       this.insertMode = true;
    }
}
customElements.define('meal-journal', MealJournal);
