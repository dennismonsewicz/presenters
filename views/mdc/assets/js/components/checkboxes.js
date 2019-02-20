import {MDCCheckbox} from '@material/checkbox';
import {eventHandlerMixin} from "./mixins/event-handler";
import {VBaseComponent, hookupComponents} from './base-component';

export function initCheckboxes() {
    console.log('\tCheckboxes');
    hookupComponents('.v-checkbox', VCheckbox, MDCCheckbox);
}

export class VCheckbox extends eventHandlerMixin(VBaseComponent) {
    constructor(element, mdcComponent) {
        super(element, mdcComponent);
        this.input = element.querySelector('input');
        this.mdcComponent.indeterminate = (this.input.dataset.indeterminate === 'true');
    }

    prepareSubmit(params) {
        if(this.input.checked) {
            params.push([this.name(), this.value()]);
        }
    }

    name(){
        return this.input.name;
    }

    value(){
        return this.input.value;
    }

    clear(){
        this.input.checked = false
    }

    setValue(value){
        this.input.value = value;
    }

    isDirty() {
        return String(this.input.checked) != this.dataset.originalValue;
    }
}
