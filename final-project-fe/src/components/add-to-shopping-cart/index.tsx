import React from "react";
import {Button, ButtonProps} from "antd";
import {EditOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
    useRouterType,
    useLink,
} from "@refinedev/core";
import {RefineButtonTestIds} from "@refinedev/ui-types";
import {RefineButtonSingleProps, RefineShowButtonProps} from "@refinedev/ui-types/src/types/button";

import {useNotification} from "@refinedev/core";


export const AddToShoppingCart: React.FC<RefineShowButtonProps> = ({
                                                                       resource: resourceNameFromProps,
                                                                       recordItemId,
                                                                       children,
                                                                       onClick,
                                                                       ...rest
                                                                   }) => {


    const {id, resource} = useResource(
        resourceNameFromProps
    );
    const {open} = useNotification();

    if (!recordItemId) {
        return null;
    }

    let price = rest?.price;

    return (

        <Button
            icon={<ShoppingCartOutlined/>}
            data-testid={RefineButtonTestIds.EditButton}
            onClick={() => {
                // Add item to shopping cart in local storage
                const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
                shoppingCart.push({
                    id: recordItemId,
                    title: resource?.name,
                    price: price
                });
                localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

                // Show notification that item was added to shopping cart
                open?.({
                    type: "success",
                    description: "Shopping cart notification",
                    message: "Item \"" + resource?.name + "\" was added to shopping cart with price " + price + "€.",
                    key: "" + recordItemId.toString(),
                });

            }}
            {...rest}
        >
            Add to shopping cart
        </Button>
    );
};
