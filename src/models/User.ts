export class User {

    private id : number;
    private firstname : any;
    private lastname : any;
    private username : any;
    private email : any;

    constructor(id : number = 0, firstname : any = "", lastname : any = "", username : any = "", email : any = "") {
        this.id = id; 
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
    }

    public getId() : number {
        return this.id;
    }

    public getFirstname() : any {
        return this.firstname;
    }

    public getLastname() : any {
        return this.lastname;
    }

    public getUsername() : any {
        return this.username;
    }

    public getEmail() : any {
        return this.email;
    }

    public setFirstname(firstname : any)
    {
        this.firstname = firstname;
    } 

    public setLastname(lastname : any)
    {
        this.lastname = lastname;
    }

    public setUsername(username : any)
    {
        this.username = username;
    }

    public setEmail(email : any)
    {
        this.email = email;
    }
}