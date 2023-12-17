// const mockMessages = [
//     {
//       id: "1",
//       title: "你的預約即將到來！",
//       date: "2023.10.17",
//       detail: "場地：球場A",
//     },
//     {
//       id: "2",
//       title: "新場地上架！",
//       date: "2023.10.16",
//       detail: "地址：球場AA",
//     },
//     {
//       id: "3",
//       title: "特價活動開始了！",
//       date: "2023.10.15",
//       detail: "快來看看最新的活動吧！",
//     },
//     {
//         id: "4",
//         title: "阿阿阿！",
//         date: "2023.10.15",
//         detail: "快來看看最新的活動吧！",
//       },
//       {
//         id: "5",
//         title: "阿阿阿阿阿！",
//         date: "2023.10.15",
//         detail: "快來看看最新的活動吧！",
//       },
//       {
//         id: "6",
//         title: "7777788888！",
//         date: "2023.10.15",
//         detail: "快來看看最新的活動吧！",
//       },
//     // ... more mock messages
//   ];
  
//   export default mockMessages;



  const mockMessages = [
    {
      stadium_id: 1,
      stadium_name: "球場A",
      reservation_id: 1,
      title: "你的預約即將到來！",
      is_read: 0,
      message: "你的預約即將到來！"
    },
    {
      stadium_id: 2,
      stadium_name: "球場B",
      reservation_id: 2,
      title: "新場地上架！",
      is_read: 1,
      message: "預約即將到來"
    },
    // ... more mock messages
  ];
  
  export default mockMessages;

  /*
  {
   
    event: [
        {
            stadium_id: int,
            activity_id: int
            stadium_name: string,
            titile: string,
            is_read: int,
            message : string
        }, ...
    ]
}



  */
  