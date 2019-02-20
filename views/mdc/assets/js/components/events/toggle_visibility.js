export class VToggleVisibility  {
    constructor(options, params, event) {
        this.targetId = options.target;
        this.params = params;
        this.event = event;
    }

    call(results) {
        let targetId = this.targetId;
        let action = this.params.action;
        let delayAmt = this.event instanceof FocusEvent ? 500 : 0;
        let elem = document.getElementById(targetId);

        if (!elem) {
            const err = new Error(
                `Unable to locate node ${targetId}!`
                + ' Did you forget to attach it?'
            );

            results.push({
                action: 'toggle_visibility',
                contentType: 'v/errors',
                content: {exception: err.message},
            });

            return new Promise((_, reject) => reject(results));
        }

        let promiseObj = new Promise(function (resolve) {
            clearTimeout(elem.vTimeout);
            elem.vTimeout = setTimeout(function(){
                console.log("Toggling visibility on: " + targetId);
                if (action === 'show') {
                    elem.classList.remove("v-hidden");
                } else if (action === 'hide') {
                    elem.classList.add("v-hidden");
                } else {
                    elem.classList.toggle("v-hidden");
                }
                if(elem && elem.vComponent && elem.vComponent.show){
                    elem.classList.contains('v-hidden') ?  elem.vComponent.hide() : elem.vComponent.show();
                }
                results.push({action:'toggle_visibility', statusCode: 200});
                resolve(results);
            }, delayAmt);
        });
        return promiseObj;
    }
}
