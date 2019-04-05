import { FormGroup } from '@angular/forms';

export class PasswordValidator {
    static validate(angForm: FormGroup) {
	
        let password = angForm.controls.password.value;
        let repeatPassword = angForm.controls.repeatPassword.value;

        if (repeatPassword.length <= 0) {
            return null;
        }

        if (repeatPassword !== password) {
            return {
                doesMatchPassword: true
            };
        }

        return null;

    }
}