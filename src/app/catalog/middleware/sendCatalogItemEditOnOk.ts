import { message } from "antd";
import { pick } from "lodash";
import { createWatcherMiddleware } from "app/state/utils/factories/createWatcherMiddleware";
import { apolloClient } from "services/gateway/graphql/initGraphqlClient";
import { updateCatalogItemMutation } from "app/catalog/mutations/updateCatalogItemMutation";
import { editCatalogItemFormValidated } from "app/catalog/actions";

export const sendCatalogItemEditOnOk = createWatcherMiddleware({
  actionType: editCatalogItemFormValidated.type,
  postReducer: true,
  execute: async ({ action }) => {
    apolloClient
      .mutate({
        mutation: updateCatalogItemMutation,
        variables: {
          input: pick(action?.payload?.catalogItem, [
            "id",
            "name",
            "active",
            "order",
            "imageUrl",
            "videoUrl",
            "shortDescription",
            "price",
            "orderForms",
            "additionalDetails",
            "socialMediaLinks",
            "frontDeskForms",
            "tags",
          ]),
        },
      })
      .then(() => {
        message.success("Successfully saved");
      });
  },
});
