import { LookupItem } from './../../core/lookup-item';
import { PetEditModel } from './pet-edit-model';

export interface PetEditResponseModel {
    owners: Array<LookupItem>,
    pet: PetEditModel
}
