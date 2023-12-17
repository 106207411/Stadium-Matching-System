/* format
{
    status: string,
    peoples: int
    time: int,
    note: string,
    max: int,
    level: int,
    fee: int 
    stadium : {
        name: string,
        bathroom: bool,
        air_condition: bool,
        vending: bool,
        water: bool

    },    
    creator: {
        id: int,
        name: string,
        picture: string
    },
    users :[
        {
            id: int,
            name: string,
            picture: string
        }, ...
    ]

}
*/



const mockMyActivity = [

    {
        id: '1',
        title: '羽球愛好者Go~',
        date:'2023.12.1',
        time: 1,
        fee: 100,
        level: 3,
        people:3,
        max:6,
        participants: '3/6 人',
        note:"say something",
        status: "joined",
        stadium: {
            name: "Taipei Arena",
            picture:'../../b1.jpg',
        },
      },
//     {
//     id: '1',
//     title: '羽球愛好者Go~',
//     date:'2023.12.1',
//     time: 1,
//     fee: 100,
//     level: 3,
//     people:3,
//     max:6,
//     participants: '3/6 人',
//     //avatar: '../../basketball.png', 
//     creator: {
//         id: 1,
//         name: "John Doe",
//         picture: '../../baseball.png', 
//     },
//     note:"say something",
//     status: "joined",
//     stadium: {
//         name: "Taipei Arena",
//         water: 1,
//         bathroom: 0,
//         air_condition: 1,
//         vending: 1,
//         picture:'../../b1.jpg',
//     },
//     users: [
//         {
//             user_id: 1,
//             Name: "John Doe",
//             picture: '../../baseball.png'
//         },
//         {
//             user_id: 2,
//             Name: "2222",
//             picture: '../../basketball.png'
//         }
//     ]
//   },
//   {
//     id: '12346', //
//     title: '球球友誼賽', //
//     date:'2023.12.1',
//     time: 1, //
//     fee: 100 ,
//     level: 4,
//     people:2,
//     max:4,
//     participants: '2/4 人',
//     //avatar: '../../basketball.png', 
//     creator: {
//         id: 1,
//         name: "John Doe",
//         picture: '../../basketball.png', 
//     },
//     note:"say something",
//     status: "joined",
//     stadium: {
//         name: "Taipei Arena",
//         water: 1,
//         bathroom: 0,
//         air_condition: 1,
//         vending: 1,
//         picture:'../../b1.jpg',
//     },
//     users: [
//         {
//             user_id: 1,
//             Name: "John Doe",
//             picture: "http://52.8.178.204/static/1701667086419-e8f03678786d6b17-zidane.jpg"
//         },
//         {
//             user_id: 2,
//             Name: "2222",
//             picture: "http://52.8.178.204/static/1701667086419-e8f03678786d6b17-zidane.jpg"
//         }
//     ]
//   }
];
  
  export default mockMyActivity;


  /*
ex.
{
    "id": 1, v
    "title": "for testing", v
    "time": 1, v
    "note": null, v
    "max": 2, v
    "level": 1, v
    "fee": 100, v
    "people": 1, v
    "status": "joinable",
    "creator": {
        "id": 1,
        "name": "John Doe",
        "picture": "http://52.8.178.204/static/1701667086419-e8f03678786d6b17-zidane.jpg"
    },
    "stadium": {
        "name": "Taipei Arena",
        "water": 1,
        "bathroom": 0,
        "air_condition": 1,
        "vending": 1
    },
    "users": [
        {
            "user_id": 1,
            "Name": "John Doe",
            "picture": "http://52.8.178.204/static/1701667086419-e8f03678786d6b17-zidane.jpg"
        }
    ]
}


  {
    status: string, //是否可加入
    peoples: int //目前人數
    time: int, //哪個時間 ??
    note: string, //活動說明
    max: int, //最大人數
    level: int, //程度
    fee: int  //價格
    
    stadium : {    //場地資訊
        name: string,
        bathroom: bool,
        air_condition: bool,
        vending: bool,
        water: bool
    },    
    creator: {
        id: int,  //創辦人id
        name: string,  創辦人名字
        picture: string  //創辦人照片
    },
    users :[
        {
            id: int,   //參與者1號id
            name: string, //參與者1號名字
            picture: string //參與者1號照片
        }, ...
    ]

}

ex.
{
    "id": 1,
    "title": "for testing",
    "time": 1,
    "note": null,
    "max": 2,
    "level": 1,
    "fee": 100,
    "people": 1,
    "status": "joinable",
    "creator": {
        "id": 1,
        "name": "John Doe",
        "picture": "http://52.8.178.204/static/1701667086419-e8f03678786d6b17-zidane.jpg"
    },
    "stadium": {
        "name": "Taipei Arena",
        "water": 1,
        "bathroom": 0,
        "air_condition": 1,
        "vending": 1
    },
    "users": [
        {
            "user_id": 1,
            "Name": "John Doe",
            "picture": "http://52.8.178.204/static/1701667086419-e8f03678786d6b17-zidane.jpg"
        }
    ]
}

  */
  