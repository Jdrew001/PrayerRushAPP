export class list {
    listId : Number
    name :string;
    description: string;
    date : Date;

    constructor(name : string, description : string, date : Date) {
        this.name = name;
        this.description = description;
        this.date = date;
    }
}