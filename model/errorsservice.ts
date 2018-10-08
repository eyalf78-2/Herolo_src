import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
@Injectable()
export class errorService {

    constructor() { }
    getRequiredErrorMessage(ctrl: FormControl) {

        if (ctrl.hasError('minlength') || ctrl.hasError('maxlength'))
            return "must be exactly 4 digit";
        if (ctrl.hasError('required'))
            return "required";
        if (ctrl.hasError('pattern'))
            return "can only contain numbers";

    }
}
