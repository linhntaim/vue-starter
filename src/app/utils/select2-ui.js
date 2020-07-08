import {DomSelection, JqueryDomSelection, Ui} from '@dsquare-gbu/vue-utils'

export default class Select2Ui extends Ui {
    /**
     *
     * @param {JqueryUi} ui
     */
    constructor(ui) {
        super()

        this.ui = ui
    }

    /**
     *
     * @param selector
     * @returns {JqueryDomSelection}
     */
    query(selector) {
        return this.ui.query(selector)
    }

    select2(domSelection, selectCallback = null, placeholder = '') {
        if (!(domSelection instanceof JqueryDomSelection)) {
            domSelection = this.query(domSelection instanceof DomSelection ? domSelection.get() : domSelection)
        }
        const $domSelection = domSelection.get()
        $domSelection.select2({theme: 'bootstrap4', placeholder: placeholder}).on('change', () => {
            selectCallback && selectCallback($domSelection.val())
        })
        return domSelection
    }
}
