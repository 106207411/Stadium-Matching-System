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
    id: '12345',
    title: '羽球愛好者Go~',
    image: "../../b1.jpg",
    location: '球場A',
    date: '2023年10月17日',
    fee: '100/人',
    rating: 3,
    peoples:3,
    max:6,
    participants: '3/6 人',
    avatar: '../../basketball.png', 
  },
  {
    id: '12346',
    title: '球球友誼賽',
    image: '../../b1.jpg', 
    location: '足球場B',
    date: '2023年11月20日',
    fee: '100/人',
    rating: 4,
    peoples:2,
    max:4,
    participants: '2/4 人',
    avatar: '../../basketball.png', 
  },
];
  
  export default mockMyActivity;
  