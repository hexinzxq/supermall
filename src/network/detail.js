import {request} from "./request"

export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}

export class Goods{

}

export class Shop{

}