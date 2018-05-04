import {Injectable} from "@angular/core";
import { StompService } from 'ng2-stomp-service';
import { Constants } from "../utilities/Constants";

@Injectable()
export class WebSocketService {

    private subscription : any;

    constructor(private stomp : StompService) {
        
    }

    //response
    public response = (data) => {
        console.log(data)
    }
}