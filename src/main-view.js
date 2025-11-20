import { LitElement, html, css } from "lit";

import "@material/web/tabs/tabs.js"
import "@material/web/tabs/primary-tab.js"

import "./components/meal-journal.js";

export class MainView extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
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
            <md-tabs id="tabs" @change=${this._handleTabChange}>
                <md-primary-tab tab="summary">Resumo</md-primary-tab>
                <md-primary-tab tab="journal" active>Diário</md-primary-tab>
                <md-primary-tab tab="recipes">Receitas</md-primary-tab>
            </md-tabs>
            <div id="viewStack">
                <div id="summaryTab" class="tab" hidden>
                    <h1>Resumo</h1>
                </div>
                <div id="journalTab" class="tab">
                    <meal-journal></meal-journal>
                </div>
                <div id="recipesTab" class="tab" hidden>
                    <h1>Receitas</h1>
                </div>
                <!-- 
                <meal-dashboard></meal-dashboard>
                <recipes-list></recipes-list> -->

            </div>
        </div>
            
        `;
    }

    _handleTabChange(e){
        const selectedTabName = e.target.activeTab.getAttribute("tab");

        const viewStack = this.shadowRoot.getElementById("viewStack");
        const views = viewStack.querySelectorAll(':scope > div');

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
