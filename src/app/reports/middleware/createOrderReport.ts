import { createWatcherMiddleware } from "app/state/utils/factories/createWatcherMiddleware";
import { apolloClient } from "app/gateway/graphql/initGraphqlClient";
import {
  createOrderReportFormValidated,
  receivedOrdersReport,
} from "../actions";
import { ordersReportQuery } from "../queries/ordersReportQuery";

const mapFormValuesToOrdersReportInput = ({ formValues }) => {
  const [start, end] = formValues?.completedAtRange ?? [];
  const completedAtRange = formValues?.completedAtRange
    ? { start, end }
    : undefined;
  return {
    completedAtRange,
  };
};

export const createOrderReport = createWatcherMiddleware({
  actionType: createOrderReportFormValidated.type,
  postReducer: true,
  execute: async ({ action, dispatch }) => {
    const input = mapFormValuesToOrdersReportInput({
      formValues: action.payload.values,
    });
    apolloClient
      .query({
        query: ordersReportQuery,
        variables: {
          input,
        },
      })
      .then(({ data }) => {
        const ordersReport = data?.reports.ordersReport;
        dispatch(receivedOrdersReport(ordersReport));
      });
  },
});