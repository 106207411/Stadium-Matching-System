

 /*

{
    "activity": [
        {
            "id": 3,
            "picture": "http://test.com",
            "name": "Taipei Arena"
        },
        {
            "id": 1,
            "picture": "http://test.com",
            "name": "Taipei Arena"
        }
    ]
}

CREATE TABLE `Activity` (
  `reservation_id` int PRIMARY KEY AUTO_INCREMENT,
  `stadium_id` int NOT NULL,
  `title` varchar(100),
  `timeslot` int,
  `note` varchar(100),
  `host_id` int,
  `max` int NOT NULL,
  `date` date,
  `level` int
  `status` varchar(100) DEFAULT "pending",
);




 */

// {
//   id: int,   //活動id
//   picture : string //活動照片
//   name : string //場地名字
//     // 加上
//      title://活動名稱
//      time://活動時間
//      price: //int價格 /人
//      level ://活動等級
//      remaining: 1 //剩餘人數   
//  },

const mockActivities = [
    {
      id: "1", //v
      picture: "../b1.jpg", //v
      name:"球場A",
      title: "一起來打球",
      time:"2023.11.20 17-18",//none
      price: 100,
      rating:3, 
      remaining: 1,
    },
    {
      id: "2",
      picture: "../b2.jpg",
      name:"球場B",
      title:"活動2",
      time:"2023.11.20 19-20",
      price:100,
      rating:2,
      remaining: 3,
    },

    // {
    //   id: "3",
    //   title:"活動3",
    //   time:"2023.11.20 19-20",
    //   stadium:"球場C",
    //   price:"100" ,
    //   rating:1,
    //   image: "../b3.jpg",
    //   remaining: 2,
    // },
    // {
    //   id: "4",
    //   title:"活動4",
    //   time:"2023.11.20 19-20",
    //   stadium:"球場4",
    //   price:"100" ,
    //   rating:4,
    //   image: "../b4.jpg",
    //   remaining: 2,
    // },
    // {
    //   id: "5",
    //   title:"活動4",
    //   time:"2023.11.20 19-20",
    //   stadium:"球場4",
    //   price:"100" ,
    //   rating:2,
    //   image: "../b1.jpg",
    //   remaining: 2,
    // },
    // {
    //   id: "6",
    //   title:"活動6",
    //   time:"2023.11.20 13-14",
    //   stadium:"球場6",
    //   price:"100" ,
    //   rating:5,
    //   image: "../b1.jpg",
    //   remaining: 2,
    // },
    // {
    //   id: "7",
    //   title:"活動7",
    //   time:"2023.11.20 13-14",
    //   stadium:"球場7",
    //   price:"100" ,
    //   rating:5,
    //   image: "../b1.jpg",
    //   remaining: 2,
    // },
    // {
    //   id: "8",
    //   title:"活動8",
    //   time:"2023.11.20 13-14",
    //   stadium:"球場8",
    //   price:"100" ,
    //   rating: 3,
    //   image: "../b1.jpg",
    //   remaining: 2,
    // },
    // {
    //   id: "9",
    //   title:"活動9",
    //   time:"2023.11.20 13-14",
    //   stadium:"球場9",
    //   price:"100" ,
    //   rating: 3,
    //   image: "../b1.jpg",
    //   remaining: 2,
    // },
    // {
    //   id: "10",
    //   title:"活動10",
    //   time:"2023.11.20 13-14",
    //   stadium:"球場10",
    //   price:"100" ,
    //   rating: 3,
    //   image: "../b1.jpg",
    //   remaining: 2,
    // },
    // {
    //   id: "11",
    //   title:"活動11",
    //   time:"2023.11.20 13-14",
    //   stadium:"球場11",
    //   price:"100" ,
    //   rating: 3,
    //   image: "../b1.jpg",
    //   remaining: 2,
    // },
    // {
    //   id: "12",
    //   name:"活動12",
    //   time:"2023.11.20 13-14",
    //   stadium:"球場12",
    //   price:"100" ,
    //   rating: 3,
    //   image: "../b1.jpg",
    //   remaining: 2,
    // },
    // ... more activities
  ];
  
  export default mockActivities;

  /*

  activity:[
        {
            id: int,
            picture : string
            name : string
        },
        {
            id: int,
            picture : string
            name : string
        },
        ...
    ]
    */
  