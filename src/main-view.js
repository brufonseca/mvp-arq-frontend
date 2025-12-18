import { LitElement, html, css } from "lit";

import "@material/web/tabs/tabs.js"
import "@material/web/tabs/primary-tab.js"

import "./components/meal-journal.js";
import "./components/recipe-finder.js";

export class MainView extends LitElement {
    static styles = [
        css`

            :root{
                --md-primary-tab-label-text-font: "Roboto", sans-serif;
            }
            :host {
                display: block;
                font-family: "Roboto", sans-serif;
            }

            #mainContainer{
                height: 100vh;
                width: 100vw;
                overflow: hidden;
            }

            #tabs{
                height: 48px;
                width: 100%
            }

            #viewStack{
                height: calc(100% - 48px);
                width: 100%
            }

            .tab{
                height: 100%;
            }

        `,
    ];

    static properties = {

    };

    render() {
        return html`
        <div id="mainContainer">
            <!-- Componente de abas -->
            <md-tabs id="tabs" @change=${this._handleTabChange}>
                <md-primary-tab tab="journal" active>Diário</md-primary-tab>
                <md-primary-tab tab="recipes">Receitas</md-primary-tab>
            </md-tabs>
            <!-- Stack de views controlada pelas abas -->
            <div id="viewStack">
                <div id="journalTab" class="tab">
                    <meal-journal></meal-journal>
                </div>
                <div id="recipesTab" class="tab" hidden>
                    <recipe-finder></recipe-finder>
                </div>

            </div>
        </div>
            
        `;
    }

    // Handler executado quando a aba ativa muda
    _handleTabChange(e){

        // Recupera o valor do atributo "tab" da aba ativa
        const selectedTabName = e.target.activeTab.getAttribute("tab");

        const viewStack = this.shadowRoot.getElementById("viewStack");

        // Seleciona apenas os filhos diretos (views)
        const views = viewStack.querySelectorAll(':scope > div');


        // Exibe apenas a view correspondente à aba ativa
        for(const view of views){

            if(view.id === `${selectedTabName}Tab`){
                view.removeAttribute("hidden");
            } else {
                view.setAttribute("hidden", null);
            }
        }
    }
}
customElements.define("main-view", MainView);
