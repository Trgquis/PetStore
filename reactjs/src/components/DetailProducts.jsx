import React, { Fragment } from "react";

function DetailProducts({ detailItem }) {
    console.log(detailItem);
    return (
        <div>s</div>
        // {detailItem?.orders
        //     .slice(0, 5)
        //     .map((order) => {
        //         return (
        //             <div
        //                 className="line-item--layout"
        //                 key={order.id}
        //             >

        //                 <div className="line-item--information">
        //         {detailItem?.productDetails.map((item) => {
        //             return (
        //                 <Fragment>
        //                     {item.id === order.id ? item.status : null}
        //                 </Fragment>
        //             );
        //         })}
        //     </div>
        //             </div>
        //         );
        //     })}
    );
}

export default DetailProducts;
