import { buffaloBreedsInKerala, cattleBreedsInKerala, goatBreedsInKerala } from "./Data";

export function secondDataCompletion(value) {
    if (value === 'Cattle') {
        return cattleBreedsInKerala;
    } else if (value === 'Goat') {
        return goatBreedsInKerala;
    } else if (value === 'Buffaloes') {
        return buffaloBreedsInKerala;
    } else {
        return []
    }
}
