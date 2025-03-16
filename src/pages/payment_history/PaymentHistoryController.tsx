import React, { useEffect, useState } from "react";
import PaymentHistoryView from "./PaymentHistoryView";
import { useCoursesContext } from "../../App";
import { historyPayment } from "../../service/payment";

type Props = {};

const PaymentHistoryController = (props: Props) => {
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const context: any = useCoursesContext();
  useEffect(() => {
    if (Object.keys(context.state.user).length > 0) loadHistory();
  }, [context]);
  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      let data = await historyPayment({
        user_id: context.state.user && context.state.user.user_id,
      });
      console.log("AAAA data", data);
      if (data.code == 0) {
        if (data.data && data.data.length > 0) {
          setHistory(data.data.reverse());
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingHistory(false);
  };
  return (
    <PaymentHistoryView history={history} loadingHistory={loadingHistory} />
  );
};

export default PaymentHistoryController;
