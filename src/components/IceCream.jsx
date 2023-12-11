import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyIceCream } from "../rtk/iceCreamSlice";

const IceCream = () => {
  const dispatch = useDispatch();

  const iceCream = useSelector((state) => state.iceCream);
  const shareFunc = useSelector((state) => state.dataPasser.dataCB);
  const pubSub = useSelector((state) => state.dataPasser.pubSub);

  useEffect(() => {
    // if (shareFunc) handleShare();
    if (pubSub) pubSub.publish("iceCream-bought", iceCream.iceCream);
  }, [iceCream.iceCream]);

  useEffect(() => {
    window.addEventListener("icecream-reset", (e) => {
      console.log(e);
    });
    if (pubSub)
      pubSub.subscribe("pending-event", (data) => {
        console.log(data);
      });
  }, [pubSub]);

  const handleShare = () => {
    shareFunc({
      name: "iceCream-bought",
      data: iceCream.iceCream,
    });
  };

  const publishBuy = () => {
    dispatch(buyIceCream());
  };

  return (
    <div>
      <h1>ICECREAM::</h1>
      {
        <div>
          <h4>Ice Cream : `${iceCream.iceCream}`</h4>
          {/*
          <button onClick={() => dispatch(buyIceCream())}>Buy Ice Cream</button>
        */}
          <button onClick={publishBuy}>Buy Ice Cream</button>
        </div>
      }
    </div>
  );
};

export default IceCream;
