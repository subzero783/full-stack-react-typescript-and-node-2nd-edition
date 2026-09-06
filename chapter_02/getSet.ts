class Speaker {
    #message: string = "";
    private name: string;
    constructor(name: string) {
        this.name = name;
    }

    get Message() {
        if (!this.#message.includes(this.name)) {
            throw Error("message is missing speaker's name");
        }
        return this.#message;
    }

    set Message(val: string) {
        let tmpMessage = val;
        if (!val.includes(this.name)) {
            tmpMessage = this.name + " says: " + val;
        }
        this.#message = tmpMessage;
    }
}

const speaker = new Speaker("John");
speaker.Message = "hello";
console.log(speaker.Message);