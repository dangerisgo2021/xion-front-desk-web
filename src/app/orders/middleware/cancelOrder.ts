import { createWatcherMiddleware } from "app/state/utils/factories/createWatcherMiddleware";
import { apolloClient } from "services/gateway/graphql/initGraphqlClient";
import { cancelOrderClicked } from "app/orders/actions";
import { cancelOrderMutation } from "app/orders/mutations/cancelOrderMutation";

export const cancelOrder = createWatcherMiddleware({
  actionType: cancelOrderClicked.type,
  postReducer: true,
  execute: async ({ action }) => {
    apolloClient.mutate({
      mutation: cancelOrderMutation,
      variables: {
        input: {
          id: action?.payload?.orderId,
        },
      },
      refetchQueries: ["activeOrdersQuery", "orderQuery"],
    });
  },
});
