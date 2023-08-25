interface HasErrorMessage {
    message: string;
}

export abstract class UseCaseError implements HasErrorMessage {
    public readonly message: string;

    constructor(message: string) {
        this.message = message;
    }
}