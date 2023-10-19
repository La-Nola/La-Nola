import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../store/context";


const MyOrders = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);

  const { usersState } = useContext(DataContext);
  const orders = usersState.user.orders;

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
    return (<div className="flex flex-col">
      <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 px-4 md:px-6 2xl:px-20 text-gray-800">Meine Bestellungen</h1>
                  {orders.map((order) => (
        <div key={order.order.id} className="pb-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          
            <div className="flex justify-start item-start space-y-2 flex-col ">
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                      <div className="flex justify-between gap-x-20">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Bestellnummer: {order.order.id}</p>
                        <p className="text-base font-medium leading-6 text-gray-600">Bestellzeit: {order.order.create_time}</p>
                      </div>


                      {order.items.map((item) => (
                        <div key={item._id} className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img className="w-full hidden md:block" src={item.product.images.cloudinary} alt="dress" />
                            </div>
                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{item.product.productName}</h3>
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <div className="flex flex-col">
                                            {item.productType === "Kidsclothes" && 
                                    <span className="text-gray-300">Size: </span>
                                            }

                                    <div>
                                        {item.productType === "Kidsclothes" && item.size.map((eachSize) => (
                                            <p className="text-sm leading-none text-gray-800">
                                                {eachSize.size} - {eachSize.quantity} Stk
                                            </p>
                                        )
                                        )
                                        
                                        }
                                    </div>
                                        </div>
                                        <p className="text-sm leading-none text-gray-800 capitalize">
                                            <span className="text-gray-300">Color: </span> {item.product.colors}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                    <p className="text-base xl:text-lg leading-6">
                                         <span className="text-red-300"> €{item.product.price}</span>
                                    </p>
                                    <p className="text-base xl:text-lg leading-6 text-gray-800">{item.productType !== "Kidsclothes" ? item.quantity : item.size.reduce((acc,cur) => (cur.quantity + acc), 0)}</p>
                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">€{(item.product.price) * (item.productType !== "Kidsclothes" ? item.quantity : item.size.reduce((acc,cur) => (cur.quantity + acc), 0))}</p>
                                </div>
                            </div>
                        </div>
                      ))}
                       
                    </div>
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between  w-full">
                                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                    <p className="text-base leading-4 text-gray-600">€{(order.order.purchase_units[0].amount.value - 3.99).toFixed(2)}</p>
                                </div>
                                
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">Shipping</p>
                                    <p className="text-base leading-4 text-gray-600">€3.99</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">€{order.order.purchase_units[0].amount.value}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50    ">
                            <div className="flex justify-between items-start w-full border-b border-gray-200 space-x-4 pb-2 ">
                                <div className="flex justify-between items-center space-x-4 w-full">
                                      <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
                                    <p className="text-base font-semibold leading-4 text-left text-gray-800">{order.order.purchase_units[0].shipping.name.full_name}</p>
                                </div>
                            </div>
                                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="cursor-pointer text-sm leading-5 text-gray-800">{order.order.payer.email_address}</p>
                            </div>
                            <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col xl:mt-3">
                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800 mb-2">Shipping Address</p>

                                    {Object.keys(
                    order.order.purchase_units[0].shipping.address
                  ).map((detail, index) => (
                    <p key={index} className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm  text-gray-600">
                      {order.order.purchase_units[0].shipping.address[detail]}
                    </p>
                  ))}
                                </div>
                                
                            </div>
                          
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))}
    </div>
    );
};

export default MyOrders;

// const MyOrders = () => {
//   const [setIsDesktop] = useState(window.innerWidth >= 900);

//   const { usersState } = useContext(DataContext);
//   const orders = usersState.user.orders;

//   useEffect(() => {
//     const handleResize = () => {
//       setIsDesktop(window.innerWidth >= 900);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);
//   return (
//     <div className="p-7 basis-3/6 w-full bg-white rounded h-fit mt-7 md:mt-0 md:flex lg:flex-row flex-col justify-evenly">
//       <div className={`2xl:pr-14 xl:pr-5 lg:pr-5 lg:mr-5 2xl:mr-0`}>
//         <h2 className="md:text-3xl text-2xl text-gray-700 text-center md:text-left mb-7">
//           Meine Bestellungen
//         </h2>
//         <div>
//           {orders.map((order) => {
//             return (
//               <div className="border-4 p-4">
//                 <h3>Order ID: {order.order.id}</h3>
//                 <h3>Bestellt am: {order.order.create_time}</h3>
//                 <h3>
//                   Gesamtpreis: {order.order.purchase_units[0].amount.value} EUR
//                 </h3>
//                 <h3>Lieferadresse</h3>
//                 <p>{order.order.purchase_units[0].shipping.name.full_name}</p>
//                 <p>
//                   {Object.keys(
//                     order.order.purchase_units[0].shipping.address
//                   ).map((detail, index) => (
//                     <div key={index}>
//                       {order.order.purchase_units[0].shipping.address[detail]}
//                     </div>
//                   ))}
//                 </p>
//                 <div className="flex flex-col ">
//                   {order.items.map((item) => {
//                     return (
//                       <div className="border-2 p-2 min-w-[200px]">
//                         <h4>{item.product.productName}</h4>
//                         <img
//                           className="w-20"
//                           src={item.product.images.cloudinary}
//                           alt=""
//                         />
//                         <h5>Preis: {item.product.price}</h5>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MyOrders;
